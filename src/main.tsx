import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import AppProviders from '@contexts/AppProvider.tsx';
import 'react-toastify/dist/ReactToastify.css';
// import { logOut } from '@hooks/auth.ts';

// let inactivityTimer: string | number | NodeJS.Timeout | undefined;

// Reset the inactivity timer on any user interaction
// function resetInactivityTimer() {
//   clearTimeout(inactivityTimer);
//   inactivityTimer = setTimeout(logOut, 5 * 60 * 1000); // 5 minutes
// }

// Add event listeners for user interactions
// document.addEventListener('mousemove', resetInactivityTimer);
// document.addEventListener('keydown', resetInactivityTimer);

// When the user logs in or interacts with the app, start the timer
// resetInactivityTimer();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
