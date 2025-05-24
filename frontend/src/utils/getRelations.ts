import { PersonRelationShip, PersonTreeNode, Relationship } from "@/types";

export const getRelations = (tree: PersonTreeNode[], id: string) => {
  const person = tree.find((p) => p.id === id);

  const get = (persons: Relationship[], type: PersonRelationShip["type"]) =>
    persons.reduce((acc, temp) => {
      const tempPerson = tree.find((p) => p.id === temp.id);
      return tempPerson ? [...acc, { ...tempPerson, type }] : acc;
    }, [] as PersonRelationShip[]);

  if (!person) {
    return [];
  }

  return [
    ...get(person.spouses, "spouse"),
    ...get(person.children, "child"),
    ...get(person.siblings, "sibling"),
    ...get(person.parents, "parent"),
  ];
};
