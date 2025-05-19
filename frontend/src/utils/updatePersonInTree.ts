import { PersonTreeNode } from "@/types";

type PersonUpdate = {
  id: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  birthDay?: string;
};

export const updatePersonById = (
  tree: PersonTreeNode[],
  update: PersonUpdate
): PersonTreeNode[] => {
  return tree.map((person) => {
    if (person.id === update.id) {
      return {
        ...person,
        ...update,
      };
    }

    // Recursively update in children (if any)
    const updatedChildren = person.children
      ? updatePersonById(person.children, update)
      : undefined;

    return {
      ...person,
      children: updatedChildren,
    };
  });
};
