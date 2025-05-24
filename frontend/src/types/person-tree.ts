export type RelationshipType = "parent" | "child" | "spouse" | "sibling";

export type Relationship = {
  id: string;
  type: string;
};

export type PersonTreeNode = {
  id: string; // unique UUID or string ID
  firstName: string;
  lastName: string;
  birthDay?: string;
  story?: string;
  gender: string;
  attributes?: Record<string, any>;
  avatarUrl?: string;
  children: Relationship[];
  spouses: Relationship[];
  parents: Relationship[];
  siblings: Relationship[];
  age?: string;
};
