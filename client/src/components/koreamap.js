import React, { useState } from 'react';
import MapComponent from './MapComponent';
import Modal from './Modal';
import axios from 'axios';

function KoreaMap() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [problems, setProblems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleRegionSelect = async (region) => {
    setSelectedRegion(region);
    setModalOpen(true);
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:4000/api/problems?region=${encodeURIComponent(region)}`);
      console.log("Response from server:", response.data);  // 콘솔에 응답 데이터 출력
      setProblems(response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
      setProblems([]);  // 에러가 발생했을 때 문제 목록 초기화
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MapComponent onRegionSelect={handleRegionSelect} />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} problems={problems} isLoading={isLoading} region={selectedRegion} />
    </>
  );
}

export default KoreaMap;
