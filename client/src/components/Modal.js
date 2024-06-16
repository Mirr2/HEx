import React from 'react';
import '../style/Modal.css';

function Modal({ isOpen, onClose, problems, region, isLoading }) {
  if (!isOpen) return null;

  return (
    <div id="modal-backdrop" className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">{region}</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : problems.length > 0 ? (
          problems.map((problem, index) => (
            <div key={index} className="problem-details">
              <h3>{problem.title}</h3>
              <p>{problem.descriptions || '설명이 제공되지 않았습니다.'}</p>
              <p>Category: {problem.category}</p>
              <p>Score: {problem.score}</p>
              <p>Flag: {problem.flag}</p>
            </div>
          ))
        ) : (
          <p>No data available for this region.</p>
        )}
      </div>
    </div>
  );
}

export default Modal;
