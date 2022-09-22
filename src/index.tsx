import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/flag-icons/css/flag-icons.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './modules/shared/components/responsiveAppBar/responsiveAppBar';
import StickersPage from './modules/stickers/pages/stickersPage';
import LoginPage from './modules/auth/login/pages/loginPage';
import Register from './modules/auth/register/register';
import Reset from './modules/auth/reset/reset';
import Dashboard from './modules/auth/Dashboard/Dashboard';
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <ResponsiveAppBar />
    <div style={{ padding: 25 }}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="stickers" element={<StickersPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// export { }