import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    //TODO: add new user fields fn ln email pswd
    this.state={}
  }

  render() {
    const value = {
      // authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //similar to exercise - re-watch
  signIn = async (username, password) => {

  }

  signOut = () => {

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

