// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>

      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default AppRoutes;
