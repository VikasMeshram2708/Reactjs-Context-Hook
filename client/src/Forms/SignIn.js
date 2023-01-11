import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmitted = useCallback( async (event) => {
    event.preventDefault();
    const data = {
      email,
      password
    };
    // console.log(data);
    const response = await fetch('/api/auth/userLogin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });
    
    const json = await response.json();
    console.log(json);
    if(response.status === 422) {
      alert('Try, to login with Valid Credentials');
    }
    if(response.status === 201) {
      localStorage.setItem('authToken',json.token);
      alert('User Logged In Successfully!');
      navigate('/messenger');
    }    
  },[email,password]);

  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="p-4 p-md-5 border rounded-3 bg-light container mt-5"
      >
        <h3 className="form-label">Sign In</h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link to="/signUp">New User</Link>
          </label>
        </div>
        <button className="w-100 rounded fs-5 btn btn-primary" type="submit">
          Sign In
        </button>
        <hr className="my-4" />
      </form>
    </>
  );
};

export default SignIn;