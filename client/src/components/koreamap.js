import React, { useState, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_koreaLow from "@amcharts/amcharts4-geodata/southKoreaLow";

function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 5, width: '80%', maxWidth: 500 }}>
        <h2>선택한 지역</h2>
        <p>{content}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

function KoreaMap() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_koreaLow;
    map.projection = new am4maps.projections.Miller();
    map.background.fill = am4core.color("#547191");  // 바다 색상 변경
    map.background.fillOpacity = 1;
    map.homeGeoPoint = { longitude: 127.5, latitude: 36 };
    map.homeZoomLevel = 1;
    map.chartContainer.wheelable = false;

    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#504b3b");  // 지도 폴리곤 기본 색상
    polygonTemplate.fillOpacity = 0.6;

    let activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = am4core.color("#00FF80");  // 선택 지역 하이라이트 색상

    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#B2FFD9");

    let lastSelected; // 마지막 선택 지역 저장
    polygonTemplate.events.on("hit", function(ev) {
        if (lastSelected) {
            lastSelected.isActive = false;
        }
        lastSelected = ev.target;
        ev.target.isActive = true; // 현재 지역 활성화
        setSelectedRegion(ev.target.dataItem.dataContext.name);
        setModalOpen(true);
    });

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <>
      <div id='chartdiv' style={{ width: '100vw', height: '100vh' }} />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} content={selectedRegion} />
    </>
  );
}

export default KoreaMap;