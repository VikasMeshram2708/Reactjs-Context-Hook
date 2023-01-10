import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import SignUp from './Forms/SignUp';
import SignIn from './Forms/SignIn';
import Messenger from './components/Messenger';
import NoteState from './Context/MessageState';

const App = () => {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/messenger' element={<Messenger />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
        </Routes>      
      </Router>
    </NoteState>
  );
};

export default App;