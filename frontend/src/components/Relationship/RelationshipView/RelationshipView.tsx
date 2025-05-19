import { RelationshipFormData } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { AddRelationshipForm } from "../AddRelationship";

type RelationshipViewProps = {
  onAddRelation: (d: RelationshipFormData) => void;
};

export const RelationshipView = ({ onAddRelation }: RelationshipViewProps) => {
  const [view, setView] = useState<"default" | "add">("default");

  return (
    <>
      {view === "add" && (
        <div>
          <button
            onClick={() => setView("default")}
            className="btn btn-circle w-8 h-8 border-0 mb-4"
          >
            <Image src="/back.png" alt="cancel" width={20} height={10} />
          </button>
          <AddRelationshipForm
            onSubmit={(data) => {
              onAddRelation(data);
            }}
          />
        </div>
      )}
      {view === "default" && (
        <button onClick={() => setView("add")} className="btn btn-outline mt-3">
          + Add Relationship
        </button>
      )}
    </>
  );
};
