import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

const UserSignUp = (props) => {
  const history = useHistory();
  const { data, actions } = useContext(Context);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    console.log(e.target.name);
    setUser({...user, [name]: value });
    console.log(setUser)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    data.createUser(user).then((errors) => {
      if (errors.length) {
        setErrors(errors);
      } else {
        
          actions.signIn(user.emailAddress, user.password)
          .then(() => history.push('/'));
      }
    })
    .catch((err) => {
      console.log(err);
      history.push('/error');
    })
  };

  

  const cancel = () => {
    history.push('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {errors.length !== 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form 
      onSubmit={handleSubmit}
      >
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={user.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={user.lastName}
          onChange={handleChange}
        />
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={user.emailAddress}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <button className="button" 
        onSubmit={handleSubmit}
        >
          Sign Up
        </button>
        <button className="button button-secondary" onClick={cancel} to={'/'}>
          Cancel
        </button>
      </form>
      <p>
        {' '}
        Already have a user account? Click here to
        <Link to={'/signin'}>sign in</Link>!
      </p>
    </div>
  );
};

export default UserSignUp;
