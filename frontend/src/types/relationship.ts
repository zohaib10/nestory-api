export type RelationshipFormData = {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  relationshipType: "parent" | "child" | "spouse";
  birthDay?: string;
};
