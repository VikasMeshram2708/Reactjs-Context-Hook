import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmitted = useCallback( async (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password
    };
    // console.log(data);
    const response = await fetch('/api/auth/createUser',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });
  
    const json = await response.json();
    console.log(json);

    if(response.status === 403) {
      alert('Email is already in use...');
    }
    if(response.status === 201) {
      alert('User Registerd Successfully!');
      navigate('/signIn');
    }
  },[name,email,password]);
    
  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="p-4 p-md-5 border rounded-3 bg-light container mt-5"
      >
        <h3 className="form-label">Sign Up</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            minLength="2"
            maxLength="30"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="name"
            required
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
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
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            minLength="5"
            maxLength="150"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link to="/signIn">Already a User</Link>
          </label>
        </div>
        <button className="w-100 btn rounded fs-5 btn-primary" type="submit">
          Sign up
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignUp;