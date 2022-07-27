// import './App.css';
// import apiBaseUrl from './config'
import './styles/global.css'
import './styles/reset.css'

import React from 'react';
// import {
  // BrowserRouter as Router,
  // Route,
  // Switch
// } from 'react-router-dom';
import Header from './components/Header';//
import UserSignUp from './components/UserSignUp';//
import UserSignIn from './components/UserSignIn'//
import UserSignOut from './components/UserSignOut';//
import Courses from './components/Courses';//
import CreateCourse from './components/CreateCourse';//
import UpdateCourse from './components/UpdateCourse';//
import CourseDetail from './components/CourseDetail';//
import NotFound from './components/NotFound'//
import Forbidden from './components/Forbidden';//
import Error from './components/Error';//
import PrivateRoute from './components/PrivateRoute'; //

function App () {
  // const url = config.apiBaseUrl 
  const url = 'http://localhost:5000/api'
  fetch(`${url}/courses`)
  .then(res => res.json()).then(data => {
    console.log(data.courses)
  }
);

  return(
    <div className="App">
       <ul>
       </ul>
     </div>

  )
 
}; 

export default App;


