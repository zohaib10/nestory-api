type ErrorModalProps = {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  title?: string;
};

export default function ErrorModal({
  children,
  open = true,
  onClose,
  title = "Error",
}: ErrorModalProps) {
  return (
    <>
      <input
        type="checkbox"
        id="error-modal"
        className="modal-toggle"
        checked={open}
        readOnly
      />
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle bg-amber-50"
      >
        <div className="modal-box border-t-4 border-red-300 px-6">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          {children}
          <div className="modal-action">
            <button onClick={onClose} className="btn btn-error text-white">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
