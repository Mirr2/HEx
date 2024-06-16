import React, { useState } from 'react';
import '../style/Modal.css';

function Modal({ isOpen, onClose, problems, region, isLoading }) {
  const [flagInput, setFlagInput] = useState('');
  const [flagResult, setFlagResult] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null); // 활성화된 카테고리 인덱스
  const [activeTitleIndex, setActiveTitleIndex] = useState(null); // 활성화된 타이틀 인덱스

  if (!isOpen) return null;

  const toggleCategoryAccordion = (index) => {
    setActiveCategoryIndex(activeCategoryIndex === index ? null : index);
  };

  const toggleTitleAccordion = (index) => {
    setActiveTitleIndex(activeTitleIndex === index ? null : index);
  };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    if (activeTitleIndex === null) {
      setFlagResult('Please select a problem first.');
      setIsCorrect(false);
      return;
    }

    const problemId = problems[activeTitleIndex].id;

    try {
      const response = await fetch('http://localhost:4000/api/check-flag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemId, flag: flagInput }),
      });

      const result = await response.json();
      if (result.correct) {
        setFlagResult('Correct flag! You have dominated this region.');
        setIsCorrect(true);
      } else {
        setFlagResult('Incorrect flag.');
        setIsCorrect(false);
      }
    } catch (error) {
      console.error('Error checking flag:', error);
      setFlagResult('Error checking flag.');
      setIsCorrect(false);
    }

    setFlagInput('');
  };

  return (
    <div id="modal-backdrop" className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">Dominate {region}</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : problems.length > 0 ? (
          problems.map((problem, index) => (
            <React.Fragment key={index}>
              <div className="accordion-title" onClick={() => toggleCategoryAccordion(index)}>
                <div>{problem.category}</div>
                <div>{activeCategoryIndex === index ? '-' : '+'}</div>
              </div>
              {activeCategoryIndex === index && (
                <div className="accordion-content">
                  <p>{problem.notion || 'No notion provided.'}</p>
                </div>
              )}
              <div className="accordion-title" onClick={() => toggleTitleAccordion(index)}>
                <div>{problem.title}</div>
                <div>{activeTitleIndex === index ? '-' : '+'}</div>
              </div>
              {activeTitleIndex === index && (
                <div className="accordion-content">
                  <p>{problem.descriptions || 'No description provided.'}</p>
                  <p>Score: {problem.score}</p>
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <p>No data available for this region.</p>
        )}
        <form onSubmit={handleFlagSubmit} className="flag-form">
          <input
            type="text"
            className="flag-input"
            placeholder="Enter your flag"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {flagResult && <p className={`flag-result ${isCorrect ? 'correct' : 'incorrect'}`}>{flagResult}</p>}
      </div>
    </div>
  );
}

export default Modal;
