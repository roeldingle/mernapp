import React from 'react'
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login, reset} from '../features/auth/authSlice';

import Spinner from '../components/Spinner';
import {toast} from 'react-toastify';
import {FaSignInAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Login() {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  })

  const {
    email, 
    password,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, isRegister, message} = useSelector((state) => state.auth);

  useEffect(() => {
      if(isError){
          toast.error(message);
      }

      if(isSuccess || user){
          navigate('/admin/');
      }

     dispatch(reset());

  }, [ user, isError, isSuccess, isRegister, message, navigate, dispatch])



  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
      }));
  }

  const onSubmit = (e) => {
      e.preventDefault();
      const userData = {
          email,
          password,
      }
      dispatch(login(userData));
  }

  if(isLoading){
    return <Spinner />
  }


  return (
    <>
    <div className="container mt-4">

      <div className="row">
      <div className="col-6">
        {
          isRegister ? 
          (
            <>
            <h1>Your registration has been received</h1>
            <p>Please wait for admin notification</p>
            </>
          )
          : ''
        }
      </div>
        <div className="col-6 card p-3 mt-3">
          <h2><FaSignInAlt /> Login</h2>
          <form onSubmit={onSubmit} className="p-2">
            <div className="mb-3 mt-3">
              <label className="form-label">Email address</label>
              <input 
              type="email" 
              name="email" 
              className="form-control" 
              id="email"
              placeholder="Enter email"
              onChange={onChange}
              value={email}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
              type="password" 
              name="password" 
              className="form-control" 
              id="password"
              placeholder="Enter password"
              onChange={onChange}
              value={password}
              />
            </div>
            <div className="mb-3">
            <Link to='/admin/register' className="nav-link">Don't have an account yet?</Link>
            </div>
            <button type="submit" className="btn btn-primary float-end">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login