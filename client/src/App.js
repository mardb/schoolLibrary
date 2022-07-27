import logo from './logo.svg';
// import './App.css';
import './styles/global.css'
import './styles/reset.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';//
import SignUpUser from './components/SignUpUser';//
import SignIn from './components/SignIn'//
import SignOut from './components/SignOut';//
import Courses from './components/Courses';//
import CreateCourse from './components/CreateCourse';//
import UpdateCourse from './components/UpdateCourse';//
import CourseDetail from './components/CourseDetail';//
import NotFound from './components/NotFound'//
import Forbidden from './components/Forbidden';//
import Error from './components/Error';//
import PrivateRoute from './components/PrivateRoute'; //


export default () => (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );


