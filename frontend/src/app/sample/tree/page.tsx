"use client";

import { AddUserModal } from "@/components/Modals";
import { Person, PersonTreeNode, RelationshipFormData } from "@/types";
import {
  addRelationshipToTree,
  flattenTree,
  getTree,
  getTreeData,
  setTreeData,
  updatePersonById,
} from "@/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Tree = dynamic(() => import("@/components/Tree/FamilyTree"), {
  ssr: false,
});

const ErrorModal = dynamic(
  () => import("@/components/Modals/ErrorModal/ErrorModal"),
  {
    ssr: false,
  }
);

// const nodes = [
//   {
//     id: "goku",
//     age: 10,
//     firstName: "Goku",
//     lastName: "Son",
//     gender: "male" as any,
//     parents: [{ id: "bardock", type: "biological" }],
//     children: [
//       { id: "gohan", type: "biological" },
//       { id: "goten", type: "biological" },
//     ],
//     siblings: [{ id: "raditz", type: "biological" }],
//     spouses: [{ id: "chi-chi", type: "married" }],
//   },
//   {
//     id: "chi-chi",
//     gender: "female" as any,
//     parents: [{ id: "ox-king", type: "biological" }],
//     children: [
//       { id: "gohan", type: "biological" },
//       { id: "goten", type: "biological" },
//     ],
//     siblings: [],
//     spouses: [{ id: "goku", type: "married" }],
//   },
//   {
//     id: "gohan",
//     gender: "male" as any,
//     parents: [
//       { id: "goku", type: "biological" },
//       { id: "chi-chi", type: "biological" },
//     ],
//     children: [{ id: "pan", type: "biological" }],
//     siblings: [{ id: "goten", type: "biological" }],
//     spouses: [{ id: "videl", type: "married" }],
//   },
//   {
//     id: "goten",
//     gender: "male" as any,
//     parents: [
//       { id: "goku", type: "biological" },
//       { id: "chi-chi", type: "biological" },
//     ],
//     children: [],
//     siblings: [{ id: "gohan", type: "biological" }],
//     spouses: [],
//   },
//   {
//     id: "videl",
//     gender: "female" as any,
//     parents: [],
//     children: [{ id: "pan", type: "biological" }],
//     siblings: [],
//     spouses: [{ id: "gohan", type: "married" }],
//   },
//   {
//     id: "pan",
//     gender: "female" as any,
//     parents: [
//       { id: "gohan", type: "biological" },
//       { id: "videl", type: "biological" },
//     ],
//     children: [],
//     siblings: [],
//     spouses: [],
//   },
//   {
//     id: "raditz",
//     gender: "male" as any,
//     parents: [{ id: "bardock", type: "biological" }],
//     children: [],
//     siblings: [{ id: "goku", type: "biological" }],
//     spouses: [],
//   },
//   {
//     id: "bardock",
//     gender: "male" as any,
//     parents: [],
//     children: [
//       { id: "goku", type: "biological" },
//       { id: "raditz", type: "biological" },
//     ],
//     siblings: [],
//     spouses: [],
//   },
//   {
//     id: "ox-king",
//     gender: "male" as any,
//     parents: [],
//     children: [{ id: "chi-chi", type: "biological" }],
//     siblings: [],
//     spouses: [],
//   },
// ];

export default function SampleTree() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [user, setUser] = useState<Person | undefined>();
  const tree = getTree();
  const [treeData, saveTreeData] = useState(getTreeData());

  useEffect(() => {
    if (treeData && userId) {
      handleUserFind();
    }
  }, [userId]);

  if (!tree || !treeData) {
    return (
      <ErrorModal message="No tree or tree data found. Please re-add your data from the Tree Sampling page." />
    );
  }

  const handleUserFind = () => {
    const users = flattenTree(getTreeData());
    const user = users.find((user) => user.id === userId);
    setUser(user);
  };

  const handleUpdateUser = (data: Person) => {
    const newTreeData = updatePersonById(treeData, data);
    setTreeData(newTreeData);
    saveTreeData(newTreeData);
    handleUserFind();
  };

  const handleRelationshipUpdate = (data: RelationshipFormData) => {
    if (userId) {
      const person: PersonTreeNode = {
        firstName: data.firstName,
        gender: data.gender,
        lastName: data.lastName,
        birthDay: data.birthDay,
        id: crypto.randomUUID(),
      };
      const newTreeData = addRelationshipToTree(
        treeData,
        userId,
        person,
        data.relationshipType
      );

      setTreeData(newTreeData);
      saveTreeData(newTreeData);
    }
  };
  console.log("userId ", userId, showAddModal);
  return (
    <>
      {userId && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          user={user}
          updateUser={handleUpdateUser}
          onAddRelation={handleRelationshipUpdate}
        />
      )}
      <Tree
        nodes={treeData as any}
        editPerson={(id: string) => {
          setShowAddModal(true);
          setUserId(id);
        }}
      />
      {/* <TreeCanvas
        treeData={treeData}
        treeName={tree.name}
        editPerson={(id: string) => {
          setShowAddModal(true);
          setUserId(id);
        }}
      /> */}
    </>
  );
}
