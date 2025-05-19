import { PersonTreeNode } from "./flatten-tree";

export type Person = Omit<PersonTreeNode, "children"> & {
  parentId?: string;
};
