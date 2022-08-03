import './App.css';
import './styles/reset.css';
//import components
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import Error from './components/Error';
import Authenticated from './components/Authenticated';
//imports Hook withContext
import withContext from './Context';
//imports private routes
import PrivateRoute from './PrivateRoute';
//allows to use hooks to render pages
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);
const AuthWithContext = withContext(Authenticated);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <Route exact path="/courses" component={Courses} />
          <PrivateRoute path="/courses/create" component={CreateCourse} />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route component={NotFound} />
          <Route exact path="/error" component={Error} />
          <Route path="/forbidden" component={Forbidden} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
