import React, { Component } from 'react';
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    //TODO: add new user fields fn ln email pswd
    this.state = {
      authenticatedUser: null
    }
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
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
    const user = await this.data.getUser(username, password)
    if(user !== null){
      this.setState(() => {
        return {
          authenticatedUser: user
        }
      })
    } else {
      console.log('invalid username');
    } 
    return user;
    
  }

  signOut = () => {
    this.setState({authenticatedUser : null})
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

