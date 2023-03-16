import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/AuthContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: null,
    token: null
  });

  
  const getUser = useCallback((value) =>{
    setUserInfo(value)
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)
    localStorage.setItem('userData', JSON.stringify({
      userId: value.userId,
      token: value.token,
      expiration: tokenExpirationDate.toISOString()
    }))
  }, [])
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('userData')
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token){
      getUser({
        userId: storedData.userId,
        token: storedData.token
      })
    }
  }, [getUser])
  
  let routes = userInfo.token ? (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlaces />
      </Route>
      <Route path="/places/new" exact>
        <NewPlace />
      </Route>
      <Route path="/places/:placeId">
        <UpdatePlace />
      </Route>
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlaces />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!userInfo.token, login: login, logout: logout, userInfo: userInfo , getUser: getUser}}
    >
      <Router>
        <MainNavigation />
        <main>
            {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
