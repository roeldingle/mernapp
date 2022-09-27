import React from 'react'
import {useSelector, useDispatch} from 'react-redux';

import Header from '../components/Header';

function Dashboard() {
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

  return (
    <>
    <Header user={user}/>
    <div>Dashboard</div>
    </>
  )
}

export default Dashboard