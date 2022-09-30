import React from 'react'
import {useState, useEffect, useLayoutEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { reset} from '../../features/users/usersSlice';

import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import {toast} from 'react-toastify';

function UserEdit() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*get users data from redux store*/
  const {
    users, 
    isLoading, 
    isError, 
    isSuccess, 
    message
  } = useSelector((state) => state.users);

  /*notify on first load*/
  const [firstLoad, setFirstLoad] = useState(true);

  /*declare form variables*/
  const initFormData = {
      role: 'member',
      firstname: '',
      lastname: '',
      email: '',
  };
  /*set form data to state*/
  const [formData, setFormData] = useState(initFormData);
  //destructure
  const {role,firstname,lastname,email} = formData;


  const onSubmit = (e) => {
        e.preventDefault();

        if(
            firstname.trim().length > 1 &&
            lastname.trim().length > 1 &&
            email.trim().length > 1 
        ){
            const userData = {
                role,
                firstname,
                lastname,
                email,
            }
            //dispatch(addUser(userData));
            setFormData(initFormData);
        }else{
            toast.error('Please complete all fields');
        }
  };

  /*form input change handler*/
  const onChange = (e) => {
        setFirstLoad(false)
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
      }));
  };

  /*monitor changes and execute code inside*/
  useEffect(() => {
    /*show error toast error status*/
    if(isError){
        toast.error(message);
    }


    if(isSuccess){
        toast.success('User succesfully added');
    }

    //dispatch(reset());
    
  }, [isSuccess, isError, message, navigate])


  /*return spinner if status is loading*/
  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <Header />
      <Breadcrumbs page='Edit user' items={['Users','Edit user']} back={() => navigate('/admin/users')} />
      <div className="container mt-4">
      <div className="mb-4">
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/users')}>Back to Users</button>
            </div>
            <div className="container mt-4">
              <div className="row">
                <div onSubmit={onSubmit} className="col-6 card p-3">
                  <form className="p-2">
                  <div className="mb-3 mt-3">
                    <label className="form-label">User role</label>
                    <select className="form-control" name="role" id="role" value={firstLoad ? users.role : role} onChange={onChange} >
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                    </select>
                    </div>
                    <div className="mb-3 mt-3">
                    <label className="form-label">First name</label>
                    <input 
                    type="text" 
                    name="firstname" 
                    className="form-control" 
                    id="firstname"
                    placeholder="Enter first name"
                    value={firstname === '' ? users.firstname : firstname}
                    onChange={onChange}
                    />
                    </div>
                    <div className="mb-3 mt-3">
                      <label className="form-label">Last name</label>
                      <input 
                      type="text" 
                      name="lastname" 
                      className="form-control" 
                      id="lastname"
                      placeholder="Enter last name"
                      onChange={onChange}
                      value={lastname === '' ? users.lastname : lastname}
                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <label className="form-label">Email address</label>
                      <input 
                      type="email" 
                      name="email" 
                      className="form-control" 
                      id="email"
                      placeholder="Please input email"
                      onChange={onChange}
                      value={email === '' ? users.email : email}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary float-end">Submit</button>
                  </form>
                </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default UserEdit