import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import NotesPage from './pages/NotesPage';
import { useSelector } from 'react-redux';

export default function App() {
  const token = useSelector(s => s.auth.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={token ? <NotesPage /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to={token ? '/notes' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
