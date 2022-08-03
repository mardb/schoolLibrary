import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

const Header = () => {
  // extracts authenticatedUser data 
  const { authenticatedUser } = useContext(Context);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to={'/'}>Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {/* if auth renders personalized content, else renders no name on header.  */}
            {authenticatedUser ? (
              <React.Fragment>
                <span> Welcome, {authenticatedUser.firstName}!</span>
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
