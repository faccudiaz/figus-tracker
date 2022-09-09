import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "../node_modules/flag-icons/css/flag-icons.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Stickers from './routes/expenses';
import Invoices from './routes/invoices';
import ResponsiveAppBar from './modules/shared/responsiveAppBar/responsiveAppBar';
import StickersPage from './modules/stickers/pages/stickersPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ResponsiveAppBar />
    <div style={{ padding: 50 }}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="stickers" element={<StickersPage />} />
        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </div>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
