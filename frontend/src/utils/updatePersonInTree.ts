import { PersonTreeNode } from "@/types";

export const updatePersonById = (
  tree: PersonTreeNode[],
  update: PersonTreeNode
): PersonTreeNode[] => {
  return tree.map((person) =>
    person.id === update.id ? { ...person, ...update } : person
  );
};
