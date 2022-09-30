import React from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

import Header from '../components/Header';

function Dashboard() {
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
      if(!user || user == null){
          navigate('/admin/login');
      }
  }, [user, navigate]);

  return (
    <>
    {
      user ? 
      (
        <>
        <Header user={user}/>
          <div>Dashboard</div>
        </>

      ) : (
        <>
          <div>No user set</div>
        </>
      )
    }
    </>
  )
}

export default Dashboard