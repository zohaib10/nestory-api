import { PersonTreeNode } from "@/types";

export function addRelationshipToTree(
  tree: PersonTreeNode[],
  targetId: string,
  newPerson: PersonTreeNode,
  relationshipType: "parent" | "child" | "spouse"
): PersonTreeNode[] {
  const updatedTree = tree.map((node) =>
    updateNodeRecursive(node, targetId, newPerson, relationshipType)
  );

  // Special case: if adding a parent to a root node
  if (relationshipType === "parent") {
    const targetIsRoot = tree.find((n) => n.id === targetId);
    if (targetIsRoot) {
      return [
        ...tree.filter((n) => n.id !== targetId),
        {
          ...newPerson,
          children: [targetIsRoot],
        },
      ];
    }
  }

  return updatedTree;
}

function updateNodeRecursive(
  node: PersonTreeNode,
  targetId: string,
  newPerson: PersonTreeNode,
  relationshipType: "parent" | "child" | "spouse"
): PersonTreeNode {
  if (node.id === targetId) {
    if (relationshipType === "child") {
      return {
        ...node,
        children: [...(node.children || []), newPerson],
      };
    }

    if (relationshipType === "spouse") {
      return {
        ...node,
        spouse: [...(node.spouse || []), newPerson],
      };
    }

    // Parent handled separately at root level
    return node;
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) =>
        updateNodeRecursive(child, targetId, newPerson, relationshipType)
      ),
    };
  }

  return node;
}
