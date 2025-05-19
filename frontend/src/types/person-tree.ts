export type PersonTreeNode = {
  id: string; // unique UUID or string ID
  firstName: string;
  lastName: string;
  birthDay?: string;
  story?: string;
  gender: string;
  attributes?: Record<string, any>;
  avatarUrl?: string;
  children?: PersonTreeNode[];
  spouse?: PersonTreeNode[];
};
