import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Message Board
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarColor01'
            aria-controls='navbarColor01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav me-auto'>
              {localStorage.getItem('authToken') ?  <li className='nav-item'>
                <Link className='nav-link' to='/messenger'>
                  Messenger
                </Link>
              </li> : ''}
              <li className='nav-item'>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/contact'>
                  Contact
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('authToken') ? <form className='d-flex'>
              <button onClick={()=>{
                navigate('/signUp');
              }} className='btn btn-info fs-4 rounded my-2 my-sm-0' type='button'>
                Sign Up
              </button>
              <button onClick={()=>{
                navigate('/signIn');
              }} className='mx-2 btn btn-danger fs-4 rounded my-2 my-sm-0' type='button'>
                Sign In
              </button>
            </form>: 
              <button onClick={()=>{
                localStorage.clear();
                window.location.reload();
              }} className='mx-2 btn btn-danger fs-4 rounded my-2 my-sm-0' type='button'>
              Logout
              </button>
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
