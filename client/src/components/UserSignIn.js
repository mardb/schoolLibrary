import React, {Component} from "react";
import {Link, useHistory} from 'react-router-dom'
import Data from '../Data'


const UserSignIn = () =>{
  
  submit = () => {
    // const history = useHistory()
    const {context} = this.props;
    const {username, password} = this.state;
    context.actions.signIn(username, password).then(user => {
      if(user === null){
        this.setState(() => {
          return {errors:  [ 'Sign-in was unsuccessful']};
        });
      } else {
        this.props.history.push('/authenticated')
        console.log(`SUCCESS! ${username} is now signed in!`);
      }
    }).catch(err => {
      console.log(err);
      this.props.history.push('/error')
    })
  }

  cancel = () =>{
    this.props.history.push('/')
  }

  return(
    <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value=""/>
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick="event.preventDefault()" to={'/'}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a to={'/signup'}>sign up</a>!</p>
                
            </div>
  )
}

export default UserSignIn;