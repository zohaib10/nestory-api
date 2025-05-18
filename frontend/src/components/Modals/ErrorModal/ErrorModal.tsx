import Link from "next/link";

type ErrorModalProps = {
  message: string;
  open?: boolean;
};

export default function ErrorModal({ message, open = true }: ErrorModalProps) {
  return (
    <>
      <input
        type="checkbox"
        id="error-modal"
        className="modal-toggle"
        checked={open}
        readOnly
      />
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border-t-4 border-red-500">
          <h3 className="font-bold text-lg text-red-600">Error</h3>
          <p className="py-4 text-gray-700">{message}</p>
          <div className="modal-action">
            <Link href="/">
              <label htmlFor="error-modal" className="btn btn-error">
                Close
              </label>
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
