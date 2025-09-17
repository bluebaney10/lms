type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
};

const ConfirmPopup = ({ isOpen, onConfirm, onCancel, message }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p className="mb-4">{message || "Are you sure?"}</p>
        <div className="flex justify-end gap-3">
          <button className="bt-tertiary" onClick={onCancel}>
            Cancel
          </button>
          <button className="bt-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
