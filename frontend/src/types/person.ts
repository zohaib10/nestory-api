import { PersonTreeNode } from "./person-tree";

export type Person = Omit<PersonTreeNode, "children"> & {
  parentId?: string;
};
