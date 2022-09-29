import React from 'react'
import {FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';


function UsersForm() {

    const [formData, setFormData] = useState({
        role: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
  
    const {
        role,
      firstname,
      lastname,
      email, 
      password,
    } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    };

  return (
    <>
    <div className="container mt-4">

      <div className="row">
        <div className="col-6 card p-3">
          <form className="p-2">
          <div className="mb-3 mt-3">
            <label className="form-label">User role</label>
            <select className="form-control" name="role" id="role" onChange={onChange} >
                <option value="admin" selected={role === 'admin' ? true : false}>Admin</option>
                <option value="member" selected={role === 'member' ? true : false}>Member</option>
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
            <button type="submit" className="btn btn-primary float-end">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default UsersForm