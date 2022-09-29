  import React from 'react'
  import {useState, useEffect} from 'react';
  import {useNavigate} from 'react-router-dom';
  import {useSelector, useDispatch} from 'react-redux';
  import {getall, reset} from '../features/users/usersSlice';

  import Spinner from '../components/Spinner';
  import Header from '../components/Header';
  import Breadcrumbs from '../components/Breadcrumbs';
  import UserTableList from '../components/UserTableList';

  import {toast} from 'react-toastify';

  function Users() {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    /*get users data from redux store*/
    const {
      users, 
      isLoading, 
      isError, 
      isSuccess, 
      message
    } = useSelector((state) => state.users);

    /*monitor changes and execute code inside*/
    useEffect(() => {


      /*show error toast error status*/
      if(isError){
          toast.error(message);
      }
      /*init users data*/
      dispatch(getall());
      /*prevent loop || trigger once*/
      //dispatch(reset());
      return () => {
        dispatch(reset());
      }
    }, [isError, message, navigate, dispatch])


    /*return spinner if status is loading*/
    if(isLoading){
      return <Spinner />
    }
  
    return (
      <>
        <Header />
        <Breadcrumbs items={[]} page='Users' />
        <div className="container mt-4">
          <div className="mb-4">
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/users/add')}>Add User</button>
          </div>
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
        </div>
      </>
    )
  }

  export default Users