import { Person, PersonTreeNode } from "@/types";

export const flattenTree = (
  tree: PersonTreeNode | PersonTreeNode[],
  parentId?: string
): Person[] => {
  const nodes = Array.isArray(tree) ? tree : [tree];
  let result: Person[] = [] as any as Person[];
  for (const node of nodes) {
    const { children, ...rest } = node;
    result.push({ ...rest, parentId });

    if (children && children.length > 0) {
      result = result.concat(flattenTree(children, node.id));
    }
  }

  return result;
};
