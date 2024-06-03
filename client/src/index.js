import React from 'react';
import { createRoot } from 'react-dom/client';
import WorldMap from './components/worldmap';
import KoreaMap from './components/koreamap';
import './style/index.css';  

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <KoreaMap />
  </React.StrictMode>
);