import Link from "next/link";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next"); // Ensures screen readers are handled correctly

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, message }) => {
  if (!isOpen) return null;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Authentication Required"
      className="bg-white p-4 max-w-md mx-auto rounded-lg shadow-lg "
      overlayClassName="fixed z-20 inset-0 bg-gray-500 bg-opacity-85 p-6 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-between">
        <button
          onClick={onRequestClose}
          className="bg-purple-700 text-white py-2 px-4 rounded"
        >
          Close
        </button>
        <Link
          onClick={onRequestClose}
          href="/register"
          className="bg-purple-700 text-white py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    </ReactModal>
  );
};

export default Modal;
