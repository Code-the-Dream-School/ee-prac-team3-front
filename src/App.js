import React, { useState, useEffect } from 'react';
import QuizContent from './QuizContent';
import { getAllData } from './util/index';
import RegisterForm from './RegisterForm';
import './App.css';

const URL = 'http://localhost:8000/api/v1/';

function App() {

const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <>
      {message ? <h1>{message}</h1> : <h1></h1>} 
      <QuizContent/>
      {/*<RegisterForm/>*/}
    </>
  );
}

export default App;
