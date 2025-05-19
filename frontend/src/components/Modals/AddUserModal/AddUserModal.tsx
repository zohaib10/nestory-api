"use client";
import { UpdateUserForm } from "@/components/User";
import { Person } from "@/types";
import Image from "next/image";

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: Person;
  updateUser: (u: Person) => void;
};

export const AddUserModal = ({
  isOpen,
  onClose,
  user,
  updateUser,
}: AddUserModalProps) => {
  // useEffect(() => {
  //   const modal = document.getElementById("tab_modal") as HTMLDialogElement;
  //   if (isOpen) {
  //     modal.showModal();
  //   } else {
  //     modal.close();
  //   }
  // }, [isOpen]);
  console.log("HERE");
  return (
    <>
      <input
        type="checkbox"
        id="tab_modal"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Manage Info</h3>
          <button className="btn btn-circle" onClick={onClose}>
            <Image src="/close.png" alt="close" width={14} height={10} />
          </button>

          <div className="tabs tabs-box">
            <input
              type="radio"
              name="person_tabs"
              className="tab"
              aria-label="Info"
              defaultChecked
            />
            <div className="tab-content bg-base-100 p-4">
              <UpdateUserForm user={user} updateUser={updateUser} />
            </div>

            <input
              type="radio"
              name="person_tabs"
              className="tab"
              aria-label="Relationships"
            />
            <div className="tab-content bg-base-100 p-4">
              <select className="select select-bordered w-full">
                <option disabled value="">
                  Relationship Type
                </option>
                <option>Parent</option>
                <option>Child</option>
                <option>Spouse</option>
                <option>Sibling</option>
              </select>
              <button className="btn btn-outline mt-3">
                + Add Relationship
              </button>
            </div>

            <input
              type="radio"
              name="person_tabs"
              className="tab"
              aria-label={`${user?.firstName}'s tales`}
            />
            {/* ability to add multiple stories by person and attach pictures to each... can the user pick who to share with? */}
            <div className="tab-content bg-base-100 p-4">
              <textarea
                className="textarea textarea-bordered w-full"
                rows={6}
                placeholder="Write Ismail's story here..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
