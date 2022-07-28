import React from "react";

//make stateless component
const Header = () =>{

  return(
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a to="index.html">Courses</a></h1>
            <nav>
                <ul className="header--signedout">
                    <li><a to="sign-up.html">Sign Up</a></li>
                    <li><a to="sign-in.html">Sign In</a></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header;