import React from "react";

//make stateless component
const Header = () =>{

  return(
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a to={'/'}>Courses</a></h1>
            <nav> 
                <ul className="header--signedout">
                    <li><a to={'/signup'}>Sign Up</a></li>
                    <li><a to={'/signin'}>Sign In</a></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header;