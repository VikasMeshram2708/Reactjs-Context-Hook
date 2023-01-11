/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import MessageContext from './MessageContext';

const MessageState = (props) => {

  // state to hold the messages
  const [items, setItems] = useState([]);

  // Make an API call to get all the messages of the user.

  const getMyMessages = async () => {
    const response = await fetch('/api/message/getMyMessages',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        authToken:localStorage.getItem('authToken')
      }
    });
    const json = await response.json();
    // console.log(json.message);
    setItems(json.message);
  };

  //   Make an API call to Delete the Message
  const deleteMyMessage = async  (id) => {
    const response = await fetch(`api/message/deleteMyMessage/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        authToken:localStorage.getItem('authToken')
      }
    });
    await response.json();
    // console.log(json);
  };

  useEffect(() => {
    if(localStorage.getItem('authToken')) {
      getMyMessages();
    }
  },[]);


  //   Make an API call to Update the Message
  const updateMyMessage = async  (id, title, answer) => {
    const response = await fetch(`/api/message/updateMyMessage/${id}`,{
      method:'PUT',
      body:JSON.stringify({title, answer}),
      headers:{
        'Content-Type':'application/json',
        authToken:localStorage.getItem('authToken')
      }
    });
    const json = await response.json();
    console.log(json);
  };


 
  return (
    <MessageContext.Provider value={{ items, deleteMyMessage, updateMyMessage}}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;