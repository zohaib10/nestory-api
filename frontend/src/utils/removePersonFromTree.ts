import { PersonTreeNode } from "@/types";

export const removePersonFromTree = (
  treeData: PersonTreeNode[],
  userId: string
): PersonTreeNode[] => {
  return (
    treeData
      // 1. Remove the user from the tree
      .filter((person) => person.id !== userId)
      // 2. Clean up any references to the user in relationships
      .map((person) => ({
        ...person,
        parents: person.parents.filter((rel) => rel.id !== userId),
        children: person.children.filter((rel) => rel.id !== userId),
        siblings: person.siblings.filter((rel) => rel.id !== userId),
        spouses: person.spouses.filter((rel) => rel.id !== userId),
      }))
  );
};
