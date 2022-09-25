import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './modules/shared/components/responsiveAppBar/responsiveAppBar';
import StickersPage from './modules/stickers/pages/stickersPage';
import LoginPage from './modules/auth/pages/login/pages/loginPage';
import Register from './modules/auth/pages/register/register';
import Reset from './modules/auth/pages/reset/reset';
import Dashboard from './modules/auth/pages/Dashboard/Dashboard';
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ResponsiveAppBar />
        <div style={{ padding: 25 }}>
          <Routes>
            <Route path="/" element={<h1>Pagina de inicio</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="stickers" element={<StickersPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
