import React, { Component } from 'react';
import Data from './Data';

export const Context = React.createContext(); 

const initialState = {
  authenticatedUser: null,
  courses: null,
  course: null,
};

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    //TODO: add new user fields fn ln email pswd
    this.state = initialState;
    // this.state = {
    //   authenticatedUser: null
    // }
  }

  render() {
    const { authenticatedUser, course, courses } = this.state;
    const value = {
      authenticatedUser,
      course,
      courses,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        getCourses: this.getCourses,
        courseDetail: this.courseDetail,
        createCourse: this.createCourse,
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
  getCourses = async () => {
    const courses = await this.data.getCourses();
    this.setState({courses});
    // return courses;
}
courseDetail = async (id) => {
  const course = await this.data.getCourse(id);
  this.setState({ course });
  // return course;
}
createCourse =async (course) => {
  const {authenticatedUser} =this.state;

try{
  await this.data.createCourse(course, authenticatedUser);
  await  this.getCourses();
} catch(error){
  throw error;
}
}
  //similar to exercise - re-watch
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password)
    if(user !== null){
      this.setState({ authenticatedUser: user });
      // // this.setState(() => {
      //   return {
      //     //return user;
      //     authenticatedUser: user
      //   }
      // })
    } else {
      console.log('invalid username');
    } 
    return user;
    
  }

  signOut = () => {
    this.setState(initialState)
  }
}

export const Consumer = Context.Consumer;

//A higher-order component that wraps the provided component in a Context Consumer component.

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

