import React from 'react';
import '../style/Modal.css';

function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div id="modal-backdrop" className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">선택한 지역</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Modal;