// MapComponent.js
import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_koreaLow from "@amcharts/amcharts4-geodata/southKoreaLow";

const customNames = {
  "Gyeonggi": "경기도",
  "Seoul": "서울특별시",
  "Gangwon": "강원도",
  "South Chungcheong": "충청남도",
  "North Chungcheong": "충청북도",
  "Sejong": "세종특별자치시",
  "Daejeon": "대전광역시",
  "North Gyeongsang": "경상북도",
  "South Gyeongsang": "경상남도",
  "Busan": "부산광역시",
  "Gwangju": "광주광역시",
  "North Jeolla": "전라북도",
  "South Jeolla": "전라남도",
  "Jeju": "제주특별자치도",
  "Daegu": "대구광역시",
  "Ulsan": "울산광역시",
  "Incheon": "인천광역시"
};

function MapComponent({ onRegionSelect }) {
  useEffect(() => {
    const map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_koreaLow;
    map.projection = new am4maps.projections.Miller();
    map.background.fill = am4core.color("#547191");
    map.background.fillOpacity = 1;
    map.homeGeoPoint = { longitude: 127.5, latitude: 36 };
    map.homeZoomLevel = 1;
    map.chartContainer.wheelable = false;

    const polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#504b3b");
    polygonTemplate.fillOpacity = 0.6;
    polygonTemplate.states.create("active").properties.fill = am4core.color("#00FF80");
    polygonTemplate.states.create("hover").properties.fill = am4core.color("#B2FFD9");

    polygonTemplate.adapter.add("tooltipText", (text, target) => {
      return customNames[target.dataItem.dataContext.name] || text;
    });

    polygonTemplate.events.on("hit", function(ev) {
      const regionName = customNames[ev.target.dataItem.dataContext.name];
      onRegionSelect(regionName);
    });

    return () => {
      map.dispose();
    };
  }, [onRegionSelect]);

  return <div id='chartdiv' style={{ width: '100vw', height: '100vh' }} />;
}

export default MapComponent;
