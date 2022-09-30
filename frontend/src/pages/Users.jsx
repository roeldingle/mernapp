  import React from 'react'
  import {useEffect} from 'react';
  import {useNavigate} from 'react-router-dom';
  import {useSelector, useDispatch} from 'react-redux';
  import {getAll, deleteUser, reset} from '../features/users/usersSlice';

  import Spinner from '../components/Spinner';
  import Header from '../components/Header';
  import Breadcrumbs from '../components/Breadcrumbs';
  import {FaPenAlt, FaTrashAlt } from'react-icons/fa';

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

    /*get auth data*/
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        /*show error toast error status*/
        if(isError){
            toast.error(message);
        }

        if(isSuccess){
          toast.success("Delete user succesfully");
      }

        if(!user || user == null){
            navigate('/admin/login');
        }

      /*init users data*/
      dispatch(getAll());
      /*prevent loop || trigger once*/
       return () => {
        dispatch(reset());
       }

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    /*return spinner if status is loading*/
    if(isLoading){
      return <Spinner />
    }
  
    return (
      <>
    {
      user ? 
      (
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
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                      users.length > 0 ?
                      (
                        users.map((item, index) => (
                              <tr key={item._id}>
                                  <th scope="row">{index+1}</th>
                                  <td>{item.firstname +' '+ item.lastname}</td>
                                  <td>{item.email}</td>
                                  <td>{item.role}</td>
                                  <td>{item.active ? 'Active' : 'Inactive'}</td>
                                  <td>
                                    <button className="btn btn-warning btn-sm" title="Edit"><FaPenAlt /></button>&nbsp;
                                    <button disabled={user._id === item._id ? true : false} className="btn btn-danger btn-sm" title="Delete" onClick={() => dispatch(deleteUser(item._id))}><FaTrashAlt /></button>
                                  </td>
                              </tr>
                          ))

                      ) 
                      : (<><tr><td colSpan="6" className="text-center"><strong>No item(s) to show</strong></td></tr></>)
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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

  export default Users