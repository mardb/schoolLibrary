import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

//make stateless component later
const Header = (props) => {
  // const that = useContext(Context.Context)
  const { data, actions, authenticatedUser, createUser, context } = useContext(Context);
  console.log(useContext(Context));
  const authUser = data.authenticatedUser;
  console.log(useContext(Context));
  console.log(authUser);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to={'/'}>Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {authUser ? (
              <React.Fragment>
                {/* <span> Welcome, {authUser.firstName}!</span> */}
                <li>
                  <Link to={'/signout'}>Sign Out</Link>
                </li>
              </React.Fragment>
        ) : (
              <React.Fragment>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="header--signedin">
                  <Link to="/signin">Sign In</Link>
                </li>
              </React.Fragment>
          )} 
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

   