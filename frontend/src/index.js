import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { FormFeedbackProvider } from './context/FormFeedbackContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <FormFeedbackProvider>
          <App />
        </FormFeedbackProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);