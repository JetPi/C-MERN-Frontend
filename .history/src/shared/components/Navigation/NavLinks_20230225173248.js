import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/AuthContext";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const isAuth = auth.isLoggedIn;

  function CustomLink({to, validator=true, children}){
    return (
      <li>
        {validator && 
        <NavLink to={to} exact> 
          {children}
        </NavLink>
        }
      </li>
    )
  }

  return (
    <ul className="nav-links">
      
        <CustomLink to="/">
          ALL USERS
        </CustomLink>
      
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      {!isAuth && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
