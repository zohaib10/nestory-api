// utils/sessionStorage.ts

const PERSON_KEY = "nestory_person";
const TREE_KEY = "nestory_tree";

export const setPerson = (person: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(PERSON_KEY, JSON.stringify(person));
  }
};

export const getPerson = (): any | null => {
  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem(PERSON_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  return null;
};

export const setTree = (tree: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TREE_KEY, JSON.stringify(tree));
  }
};

export const getTree = (): any | null => {
  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem(TREE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  return null;
};
