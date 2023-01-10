/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
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
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    getMyMessages();
    deleteMyMessage();
  },[]);


 
  return (
    <MessageContext.Provider value={{items,deleteMyMessage}}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;