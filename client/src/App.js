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
import Authenticated from './components/Authenticated';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

  const HeaderWithContext = withContext(Header);
  const CoursesWithContext = withContext(Courses);
  const CourseDetailWithContext = withContext(CourseDetail)
  const UserSignUpWithContext = withContext(UserSignUp)
  const UserSignInWithContext = withContext(UserSignIn)
  const UserSignOutWithContext = withContext(UserSignOut)
  const UpdateCourseWithContext = withContext(UpdateCourse)
  const AuthWithContext = withContext(Authenticated);
  
  function App() {
    //   const url = config.apiBaseUrl
    //   const url = 'http://localhost:5000/api'
    //   fetch(`${url}/courses`)
    //   .then(res => res.json()).then(data => {
    //     console.log(data.courses)
    //   }
    // );

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <HeaderWithContext />
        <Switch>
          <Route exact  path="/" component={ Courses } />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <Route exact path="/courses" component={ Courses } />
          <Route path="/courses/create" component={CreateCourse}/>
  
          <Route path='/courses/:id/update' component={ UpdateCourseWithContext } />
          <Route path="/courses/:id" component={ CourseDetail } />
       
          <Route path="/signin" component={ UserSignInWithContext } />
          <Route path="/signup" component={ UserSignUpWithContext } />
          <Route path="/signout" component={ UserSignOutWithContext} />
          <Route component={ NotFound } />
          <Route exact path="/error" component={ Error } />
          <Route path="/forbidden" component={ Forbidden } />
      
          <Route path="*" component={ NotFound } />
        </Switch>


      </div>
    </BrowserRouter>
  );
}

export default App;
