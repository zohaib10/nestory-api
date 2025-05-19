"use client";

import { AddUserModal } from "@/components/Modals";
import { Person } from "@/types";
import {
  flattenTree,
  getTree,
  getTreeData,
  setTreeData,
  updatePersonById,
} from "@/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TreeCanvas = dynamic(() => import("@/components/Tree/Tree"), {
  ssr: false,
});

const ErrorModal = dynamic(
  () => import("@/components/Modals/ErrorModal/ErrorModal"),
  {
    ssr: false,
  }
);

export default function SampleTree() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [user, setUser] = useState<Person | undefined>();
  const [tree, saveTree] = useState(getTree());
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

  return (
    <>
      {userId && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          user={user}
          updateUser={handleUpdateUser}
        />
      )}
      <TreeCanvas
        treeData={treeData}
        treeName={tree.name}
        editPerson={(id: string) => {
          setShowAddModal(true);
          setUserId(id);
        }}
      />
    </>
  );
}
