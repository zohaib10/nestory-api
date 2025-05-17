import Link from "next/link";

type ErrorModalProps = {
  message: string;
};

export const ErrorModal = ({ message }: ErrorModalProps) => {
  return (
    <div className="modal">
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
    </div>
  );
};
