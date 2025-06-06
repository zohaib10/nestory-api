"use client";

import { AddUserModal } from "@/components/Modals";
import { PersonTreeNode, RelationshipFormData } from "@/types";
import {
  addRelationshipToTree,
  calculateAge,
  getRelations,
  getTree,
  getTreeData,
  removePersonFromTree,
  setTreeData,
  updatePersonById,
} from "@/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
//     firstName: "Suhaib",
//     gender: "male",
//     lastName: "Ahmad",
//     birthDay: "1995-04-04",
//     id: "b8f7e75c-f75e-4fc8-b467-aeb77a5249a7",
//     age: "30 years",
//     spouses: [{ id: "170c7de3-2c45-4f5c-9c3a-269876906e28", type: "married" }],
//     children: [
//       { id: "d2b2c950-91e9-4495-99c2-c0dd3f6ce66d", type: "biological" },
//     ],
//     parents: [],
//     siblings: [],
//   },
//   {
//     id: "d2b2c950-91e9-4495-99c2-c0dd3f6ce66d",
//     firstName: "Ismail",
//     lastName: "Awan",
//     gender: "male",
//     age: "2 months",
//     birthDay: "2025-03-04",
//     spouses: [],
//     siblings: [],
//     children: [],
//     parents: [
//       { id: "b8f7e75c-f75e-4fc8-b467-aeb77a5249a7", type: "biological" },
//     ],
//   },

//   {
//     firstName: "Samirah",
//     gender: "female",
//     lastName: "Ahmad",
//     birthDay: "1995-04-04",
//     id: "170c7de3-2c45-4f5c-9c3a-269876906e28",
//     age: "30 years",
//     spouses: [{ id: "b8f7e75c-f75e-4fc8-b467-aeb77a5249a7", type: "married" }],
//     children: [
//       { id: "d2b2c950-91e9-4495-99c2-c0dd3f6ce66d", type: "biological" },
//     ],
//     parents: [],
//     siblings: [],
//   },
// ];

export default function SampleTree() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [user, setUser] = useState<PersonTreeNode | undefined>();
  const tree = getTree();
  const [treeData, saveTreeData] = useState(getTreeData());

  const router = useRouter();

  useEffect(() => {
    if (treeData && userId) {
      handleUserFind();
    }
  }, [userId]);

  if (!tree || !treeData) {
    return (
      <ErrorModal title="Tree Not Found" onClose={() => router.push("/")}>
        <p>
          No tree or tree data found. Please re-add your data from the Tree
          Sampling page.
        </p>
      </ErrorModal>
    );
  }

  const handleUserFind = () => {
    const users = getTreeData() as PersonTreeNode[];
    const user = users.find((user) => user.id === userId);
    setUser(user);
  };

  const handleUpdateUser = (data: PersonTreeNode) => {
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
        age: data.birthDay ? calculateAge(data.birthDay) : undefined,
        spouses: [],
        children: [],
        parents: [],
        siblings: [],
      };
      const newTreeData = addRelationshipToTree(
        treeData,
        person,
        userId,
        data.relationshipType
      );

      setTreeData(newTreeData);
      saveTreeData(newTreeData);
      setShowAddModal(false);
    }
  };

  const handleRemoveRelationship = (id: string) => {
    const newTreeData = removePersonFromTree(treeData, id);
    setTreeData(newTreeData);
    saveTreeData(newTreeData);
    setShowAddModal(false);
  };

  return (
    <>
      {userId && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          user={user}
          relations={getRelations(treeData, userId)}
          updateUser={handleUpdateUser}
          onAddRelation={handleRelationshipUpdate}
          removeRelationship={handleRemoveRelationship}
        />
      )}
      <Tree
        nodes={treeData as any}
        editPerson={(id: string) => {
          setShowAddModal(true);
          setUserId(id);
        }}
      />
    </>
  );
}
