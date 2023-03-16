import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/AuthContext";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const isAuth = auth.isLoggedIn;

  function CustomLink({to, validator=true, children, exact}){
    return (
      <li>
        {validator && 
        <NavLink to={to} exact={exact}> 
          {children}
        </NavLink>
        }
      </li>
    )
  }

  return (
    <ul className="nav-links">
      
        <CustomLink to="/" exact>
          ALL USERS
        </CustomLink>
      
      <li>
        <CustomLink to="/u1/places">MY PLACES</CustomLink>
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
