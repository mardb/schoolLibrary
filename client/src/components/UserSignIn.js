import React, { Component, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Data from '../Data';
import { Context } from '../Context';

const UserSignIn = () => {
  const history = useHistory();
  const { 
 actions, 
    // data, authenticatedUser, createUser, context 
  } = useContext(Context);

  const [user, setUser] = useState({
    emailAddress: '',
    password: '',
    errors:[]
  });
  // const [isLoading, setIsLoading] = useState(true);

  const submit = () => {
    e.preventDefault()
    // const { context } = this.props;
    const { emailAddress, password } = user;
    actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful'] };
          });
        } else {
          history.push('/');
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  };

  const handleChange = (e) => {

    const { name, value }  = e.target
    console.log(e.target.value);
    console.log(e.target.name);
    setUser({...user, [name]: value})

}

  const cancel = (e) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form cancel="">
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={user.emailAddress}
          onChange={(e) => {
            setUser({
              ...user,
              emailAddress: e.target.value,
            });
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
        />
        <button className="button" type="submit" onClick={submit}>
          Sign In
        </button>
        <button className="button button-secondary" onClick={cancel} to={'/'}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{' '}
        <Link to={'/signup'}>sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
