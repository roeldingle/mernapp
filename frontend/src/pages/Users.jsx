import React from 'react'
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getall, reset} from '../features/users/usersSlice';

import Spinner from '../components/Spinner';
import Header from '../components/Header';
import UserTableList from '../components/UserTableList';

function Users() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {users, isLoading, isError, isSuccess, message} = useSelector((state) => state.users);
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
      dispatch(getall())
      return () => {
        dispatch(reset());
      }

    }, [isError, message, navigate, dispatch])

    const showFormHandler = () => {
      setShowForm(!showForm)
    }



  if(isLoading){
    return <Spinner />
  }
  return (
    <>
    <Header />
    <div className="container mt-4">

      { showForm ? 
      (
        <h2 className="mb-4">
          Add User &nbsp;
          <button className="btn btn-primary btn-sm" onClick={showFormHandler}>Back to Users</button>
        </h2>
      ) : 
      (
        <>
        <h2 className="mb-4">
          Users &nbsp;
          <button className="btn btn-primary btn-sm" onClick={showFormHandler}>Add User</button>
        </h2>
          <div className="row">
            
            <div className="col-12">
              <table className="table">
                  <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                  </tr>
                  </thead>
                  <tbody>
                      <UserTableList items={users}/>
                  </tbody>
              </table>
            </div>
          </div>
        </>
      )
    }
      
    </div>
    </>
  )
}

export default Users