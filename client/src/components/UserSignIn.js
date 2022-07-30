import React, {Component} from "react";
import {Link, useHistory} from 'react-router-dom'
import Data from '../Data'


const UserSignIn = () =>{
  const history = useHistory()
  const submit = () => {
   
    const {context} = this.props;
    const {username, password} = this.state;
    context.actions.signIn(username, password).then(user => {
      if(user === null){
        this.setState(() => {
          return {errors:  [ 'Sign-in was unsuccessful']};
        });
      } else {
        history.push('/authenticated')
        console.log(`SUCCESS! ${username} is now signed in!`);
      }
    }).catch(err => {
      console.log(err);
      history.push('/error')
    })
  }

  const cancel = (e) =>{
  e.preventDefault()
    history.push('/')
  }

  return(
    <div className="form--centered">
                <h2>Sign In</h2>
                
                <form cancel=''  > 
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value=""/>
                    <button className="button" type="submit" onClick={submit}>Sign In</button>
                    <button className="button button-secondary" onClick={cancel} to={'/'}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a to={'/signup'}>sign up</a>!</p>
                
            </div>
  )
}

export default UserSignIn;