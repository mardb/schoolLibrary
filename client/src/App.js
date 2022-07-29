import './App.css';
// import apiBaseUrl from './config'
// import './styles/global.css'
import './styles/reset.css';

import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Header from './components/Header'; //
import UserSignUp from './components/UserSignUp'; //
import UserSignIn from './components/UserSignIn'; //
import UserSignOut from './components/UserSignOut'; //
import Courses from './components/Courses'; //
import CreateCourse from './components/CreateCourse'; //
import UpdateCourse from './components/UpdateCourse'; //
import CourseDetail from './components/CourseDetail'; //
import NotFound from './components/NotFound'; //
import Forbidden from './components/Forbidden'; //
import Error from './components/Error'; //
import PrivateRoute from './PrivateRoute'; //

import withContext from './Context';

function App() {
  //   const url = config.apiBaseUrl
  //   const url = 'http://localhost:5000/api'
  //   fetch(`${url}/courses`)
  //   .then(res => res.json()).then(data => {
  //     console.log(data.courses)
  //   }
  // );

  const HeaderWithContext = withContext(Header);
  const CoursesWithContext = withContext(Courses);
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <HeaderWithContext />
        <Switch>
          <Route exact  path="/" component={ Courses } />
          <Route exact path="/courses" component={ Courses } />
          <Route path="/courses/:id" component={ CourseDetail } />
          <Route path='/courses' component={ CreateCourse } />
          <Route path='/courses/:id' component={ UpdateCourse } />
          <Route exact path="/error" component={ Error } />
          <Route path="/forbidden" component={ Forbidden } />
          <Route exact  path="/notfound" component={ NotFound } />
          <Route path="*" component={ NotFound } />
        </Switch>


      </div>
    </BrowserRouter>
  );
}

export default App;
