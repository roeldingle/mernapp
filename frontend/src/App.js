import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

import Users from './pages/Users';
import UserAdd from './pages/UserAdd';

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

          <Route path="/admin/users" element={<Users />}/>
          <Route path="/admin/users/add" element={<UserAdd />}/>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
