import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrainingPage from './TrainingPage'; // Rename App content as HomePage
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/training" element={<TrainingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);