import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {register, resetRegister} from '../features/auth/authSlice';

import Spinner from '../components/Spinner';
import {toast} from 'react-toastify';
import {FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom'

function Register() {

  const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
  });

  const {
    firstname,
    lastname,
    email, 
    password,
    password2
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

  useEffect(() => {
      if(isError){
          toast.error(message);
      }

      if(isSuccess){
        toast.success('Registered successfully!\r\n Admin will notify you as soon as account is activated.');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          password2: '',
        })
      }

     dispatch(resetRegister());

  }, [ user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
      }));
  };

  const onSubmit = (e) => {
      e.preventDefault();

      if(password !== password2){
        toast.error('Passwords do not match');
      }else{
        const userData = {
            firstname,
            lastname,
            email,
            password,
        }
        dispatch(register(userData));
      }
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
    <div className="container mt-4">

      <div className="row">
      <div className="col-6"></div>
        <div className="col-6 card p-3 mt-3">
          <h2><FaUser /> Register</h2>
          <form onSubmit={onSubmit} className="p-2">
            <div className="mb-3 mt-3">
            <label className="form-label">First name</label>
            <input 
            type="text" 
            name="firstname" 
            className="form-control" 
            id="firstname"
            placeholder="Enter first name"
            value={firstname}
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
              value={lastname}
              />
            </div>
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
              <label className="form-label">Confirm Password</label>
              <input 
              type="password" 
              name="password2" 
              className="form-control" 
              id="password2"
              placeholder="Confirm your password"
              onChange={onChange}
              value={password2}
              />
            </div>
            <Link to='/admin/login' className="nav-link">Already have an account?</Link>
            <button type="submit" className="btn btn-primary float-end">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
};

export default Register;