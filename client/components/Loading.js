const Loading = ({ isOpen, onClose, onUpload }) => {
  return (
    <div
      className={`modal ${isOpen ? "is-active" : ""}`}
      onClick={() => onClose()}
    >
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
