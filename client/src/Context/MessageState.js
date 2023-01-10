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
    console.log(json.message);
    setItems(json.message);
  };

  useEffect(() => {
    getMyMessages();
  },[]);


 
  return (
    <MessageContext.Provider value={items}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;