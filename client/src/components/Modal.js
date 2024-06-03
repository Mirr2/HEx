function Modal({ isOpen, onClose, content }) {
    if (!isOpen) return null;
  
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)', // 어두운 배경
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          background: '#333', // 어두운 배경색
          color: '#fff', // 텍스트 색상
          padding: '20px', borderRadius: '10px',
          width: '80%', maxWidth: '600px', // 모달 최대 폭 조정
          boxSizing: 'border-box', border: '1px solid #555' // 테두리 스타일
        }}>
          <h2 style={{ borderBottom: '1px solid #555' }}>선택한 지역</h2> // 제목 스타일
          <p>{content}</p>
          <button style={{
            background: '#007BFF', color: '#fff', // 버튼 스타일
            border: 'none', padding: '10px 20px',
            cursor: 'pointer', borderRadius: '5px',
            marginTop: '10px'
          }} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    );
  }