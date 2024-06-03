import '../style/modal.css';

function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">선택한 지역</h2>
        <p>{content}</p>
        <button className="modal-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default Modal;