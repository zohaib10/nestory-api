import { PersonRelationShip, RelationshipFormData } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { AddRelationshipForm } from "../AddRelationship";

type RelationshipViewProps = {
  onAddRelation: (d: RelationshipFormData) => void;
  relations: PersonRelationShip[];
};

export const RelationshipView = ({
  onAddRelation,
  relations,
}: RelationshipViewProps) => {
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
              setView("default");
              onAddRelation(data);
            }}
          />
        </div>
      )}
      {view === "default" && (
        <>
          {
            <div className="overflow-x-auto h-[210px] mb-[10px]">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Relation</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {relations.map((relation, idx) => (
                    <tr key={idx}>
                      <td>
                        {relation.firstName} {relation.lastName}
                      </td>
                      <td>{relation.type}</td>
                      <td>
                        <button className="w-8 h-8 btn btn-circle btn-error">
                          <Image
                            src="/remove.png"
                            alt="delete"
                            width={20}
                            height={8}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

          <button
            onClick={() => setView("add")}
            className="btn btn-outline mt-3"
          >
            + Add Relationship
          </button>
        </>
      )}
    </>
  );
};
