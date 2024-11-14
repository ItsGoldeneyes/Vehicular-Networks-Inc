import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import FullScreenMedia from './FullScreenMedia';
import './main.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/media/:id" element={<FullScreenMedia />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);