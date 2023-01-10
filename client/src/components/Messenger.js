import React, {useState, useEffect, useCallback, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import MessageContext from '../Context/MessageContext';

const Messenger = () => {
  const d = useContext(MessageContext);

  console.log(d);

  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');


  const formHandler = useCallback( async (event) => {
    event.preventDefault();
    if(title.length === 0) return;
    if(answer.length === 0) return;
    const data = {
      title,
      answer
    };
    // console.log(data);
    const response = await fetch('/api/message/createMessage',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json',
        authToken:localStorage.getItem('authToken')
      }
    });

    const json = await response.json();
    console.log(json);
    if(response.status === 201) {
      alert('Your Message Was Successfully Sent...');
      setTitle('');
      setAnswer('');
    }
  },[title, answer]);

  useEffect( () => {
    if(!localStorage.getItem('authToken')) {
      navigate('/');
    }
  },[]);

  return (
    <>
      <form onSubmit={formHandler} className='container mt-5'>
        <div className="mb-3">
          <label className='form-lable'>
            <h1>Title</h1>
          </label>
          <input type="text" className="fs-3 form-control" value={title} minLength="2" maxLength="150" onChange={(event) => {
            setTitle(event.target.value);
          }} placeholder='enter title...' />
        </div>
        <div className="mb-3">
          <label className='form-lable'>
            <h1>Answer</h1>
          </label>
          <input type="text" className="fs-3 form-control" value={answer}  minLength="2" maxLength="300" onChange={(event) => {
            setAnswer(event.target.value);
          }} placeholder='enter answer...' />
        </div>
        <button className="btn btn-danger fs-3 rounded w-100">Submit</button>
      </form>
    </>
  );
};

export default Messenger;