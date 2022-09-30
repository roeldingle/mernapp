import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

import Users from './pages/users/Users';
import UserAdd from './pages/users/UserAdd';
import UserEdit from './pages/users/UserEdit';

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
          <Route path="/admin/users/edit" element={<UserEdit />}/>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
