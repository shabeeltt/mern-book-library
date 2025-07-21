import "./ConfirmPopup.scss";

const ConfirmPopup = ({
  message = "Are you sure?",
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <div className="confirm-popup__overlay">
      <div className="confirm-popup__box">
        <p className="confirm-popup__message">{message}</p>
        <div className="confirm-popup__actions">
          <button
            className="confirm-popup__button confirm-popup__button--cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="confirm-popup__button confirm-popup__button--confirm"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
