import React from "react";
import {Link} from 'react-router-dom'
//make stateless component
const Header = () =>{
  const that = useContext(Context.Context)
  const authUser = that.authenticatedUser;

  return(
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a to={'/'}>Courses</a></h1>
            <nav> 
              {authUser ? (
                <React.Fragment>
                <span>Welcome, {authUser.name}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
                ) : (
                <React.Fragment>
                  <ul className="header--signedout">
                    <Link to={'/signup'}>Sign Up</Link>
                    <Link to={'/signin'}>Sign In</Link>
                </ul>
                </React.Fragment>

              ) }

              )
            }
            
            </nav>
        </div>
    </header>
  )
}

export default Header;