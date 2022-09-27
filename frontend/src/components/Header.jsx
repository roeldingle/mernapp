import React from 'react'
import {FaSignInAlt, FaSignOutAlt } from'react-icons/fa';

import {Link} from 'react-router-dom'


function Header(props) {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link to='/admin' className="navbar-brand">MERN Stack CMS</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to='/admin/' className="nav-link active">Dashboard</Link>
                </li>
                <li className="nav-item">
                <Link to='/admin/users' className="nav-link">Users</Link>
                </li>
                <li className="nav-item dropdown d-lg-none">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                        <Link to='/admin/me' className="dropdown-item"> View Profile</Link>
                    </li>
                    <li>
                    <Link to='/admin/changepassword' className="dropdown-item"> Change Password</Link>
                    </li>
                    <li>
                        <button className="btn dropdown-item">
                            Logout
                        </button>
                    </li>
                </ul>
                </li>
            </ul>
            </div>
            <div className="nav-item dropdown d-none d-lg-block">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {props.user.firstname +' '+ props.user.lastname }
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                        <Link to='/admin/me' className="dropdown-item"> View Profile</Link>
                    </li>
                    <li>
                    <Link to='/admin/changepassword' className="dropdown-item"> Change Password</Link>
                    </li>
                    <li>
                        <button className="btn dropdown-item">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Header