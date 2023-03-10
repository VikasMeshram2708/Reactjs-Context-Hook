import React, {useState, useEffect, useCallback, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import MessageContext from '../Context/MessageContext';

const Messenger = () => {
  const {items, deleteMyMessage, updateMyMessage } = useContext(MessageContext);


  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');

  const [btnFlag, setBtnFlag] = useState(false);

  const [updatorId, setUpdatorId] = useState(0);


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
      window.location.reload();
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
        {!btnFlag ? <button className="btn btn-danger fs-3 rounded w-100">Submit</button> : 
          <button
            onClick={() => {
              updateMyMessage(updatorId,title,answer);
              alert('Your Message Was Successfully Updated...');
              window.location.reload();
            }}
            type='button'
            className="btn btn-danger fs-3 rounded w-100">Apply Update</button>
        }
      </form>

      {/* Show all the Messages in Cards */}
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          { 
            items.map((elem) => {
              return (
                <div className="col" key={elem._id + Math.random()}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{elem.title}</h5>
                      <p className="card-text">{elem.answer}</p>
                      <hr />
                      <button
                        onClick={() => {
                          deleteMyMessage(elem._id);
                          alert('Your Message was deleted...');
                          window.location.reload();
                        }}
                        type='button'
                        className="rounded btn btn-sm btn-danger fs-4">Delete</button>
                      <button
                        onClick={() => {
                          setBtnFlag(true);
                          setTitle(elem.title);
                          setAnswer(elem.answer);
                          setUpdatorId(elem._id);
                        }} 
                        type='button' 
                        className="rounded mx-3 btn btn-sm btn-info fs-4">Update</button>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
};

export default Messenger;