import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/AuthContext";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const isAuth = auth.isLoggedIn;

  function CustomLink({ to, validator = true, children, exact }) {
    return (
      <li>
        {validator && (
          <NavLink to={to} exact={exact}>
            {children}
          </NavLink>
        )}
      </li>
    );
  }

  return (
    <ul className="nav-links">
      <CustomLink to="/" exact>
        ALL USERS
      </CustomLink>
      <CustomLink to="/u1/places" validator={isAuth}>
        MY PLACES
      </CustomLink>
      <CustomLink to="/places/new" validator={isAuth}>
        ADD PLACE
      </CustomLink>
      <CustomLink to="/auth" validator={!isAuth}>
        AUTHENTICATE
      </CustomLink>
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
    </ul>
  );
};

export default NavLinks;
