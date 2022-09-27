import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
      <div className="container-fluid">
        <Routes>
        <Route path="/" element={<Dashboard />}/>
          <Route path="/admin" element={<Dashboard />}/>
          <Route path="/admin/login" element={<Login />}/>
          <Route path="/admin/register" element={<Register />}/>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
