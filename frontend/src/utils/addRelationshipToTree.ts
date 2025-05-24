import { PersonTreeNode, Relationship, RelationshipType } from "@/types";

export function normalizeTreeAfterInsert(
  tree: PersonTreeNode[],
  targetId: string,
  newPerson: PersonTreeNode,
  relationshipType: RelationshipType
): PersonTreeNode[] {
  const link = (arr: Relationship[], id: string, type = "biological") =>
    arr.some((r) => r.id === id) ? arr : [...arr, { id, type }];

  const updateNode = (person: PersonTreeNode) =>
    treeMap.set(person.id, { ...treeMap.get(person.id), ...person });

  const treeMap = new Map<string, PersonTreeNode>(
    tree.map((p) => [p.id, { ...p }])
  );
  const target = treeMap.get(targetId);
  const added = { ...newPerson };

  if (!target) return tree;

  switch (relationshipType) {
    case "spouse": {
      // Link each other as spouses
      target.spouses = link(target.spouses, added.id, "married");
      added.spouses = link(added.spouses, target.id, "married");

      // Share all children
      for (const childRel of target.children) {
        const child = treeMap.get(childRel.id);
        if (!child) continue;

        added.children = link(added.children, child.id);
        child.parents = link(child.parents, added.id);

        updateNode(child);
      }

      break;
    }

    case "sibling": {
      // Link mutual siblings
      target.siblings = link(target.siblings, added.id);
      added.siblings = link(added.siblings, target.id);

      for (const sibRel of target.siblings) {
        const sibling = treeMap.get(sibRel.id);
        if (!sibling) continue;

        sibling.siblings = link(sibling.siblings, added.id);
        added.siblings = link(added.siblings, sibling.id);
        updateNode(sibling);
      }

      // Share parents
      for (const parentRel of target.parents) {
        const parent = treeMap.get(parentRel.id);
        if (!parent) continue;

        added.parents = link(added.parents, parent.id);
        parent.children = link(parent.children, added.id);
        updateNode(parent);
      }

      break;
    }

    case "parent": {
      // Make new person a parent of target
      target.parents = link(target.parents, added.id);
      added.children = link(added.children, target.id);

      // Add target's siblings as children of new parent
      for (const sibRel of target.siblings) {
        const sibling = treeMap.get(sibRel.id);
        if (!sibling) continue;

        sibling.parents = link(sibling.parents, added.id);
        added.children = link(added.children, sibling.id);
        updateNode(sibling);
      }

      // If target has one other parent, make them spouses
      if (target.parents.length === 2) {
        const otherParentId = target.parents.find((p) => p.id !== added.id)?.id;
        const otherParent = otherParentId ? treeMap.get(otherParentId) : null;

        if (otherParent) {
          added.spouses = link(added.spouses, otherParent.id, "married");
          otherParent.spouses = link(otherParent.spouses, added.id, "married");
          updateNode(otherParent);
        }
      }

      break;
    }

    case "child": {
      // Make new person a child of target
      added.parents = link(added.parents, target.id);
      target.children = link(target.children, added.id);

      // Add to all spouses of target too
      for (const spouseRel of target.spouses) {
        const spouse = treeMap.get(spouseRel.id);
        if (!spouse) continue;

        spouse.children = link(spouse.children, added.id);
        added.parents = link(added.parents, spouse.id);
        updateNode(spouse);
      }

      // Link with target’s other children as siblings
      for (const childRel of target.children) {
        if (childRel.id === added.id) continue;
        const sibling = treeMap.get(childRel.id);
        if (!sibling) continue;

        sibling.siblings = link(sibling.siblings, added.id);
        added.siblings = link(added.siblings, sibling.id);
        updateNode(sibling);
      }

      break;
    }
  }

  updateNode(target);
  updateNode(added);

  // Rebuild tree
  const updatedTree = Array.from(treeMap.values());
  const idsToAdd = new Set([target.id, added.id]);
  return updatedTree.filter((n) => treeMap.has(n.id) || idsToAdd.has(n.id));
}

export const addRelationshipToTree = (
  tree: PersonTreeNode[],
  newPerson: PersonTreeNode,
  targetId: string,
  relationShipType: RelationshipType
) => {
  const treeWithNewPerson = [...tree, newPerson];
  const normalizedTree = normalizeTreeAfterInsert(
    treeWithNewPerson,
    targetId,
    newPerson,
    relationShipType
  );
  return normalizedTree;
};
