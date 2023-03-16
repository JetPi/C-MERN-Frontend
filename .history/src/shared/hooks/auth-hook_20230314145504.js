import React, {useState, useEffect, useCallback} from "react"

let logoutTimer;

export function useAuth(){
    const [userId, setUserId] = useState(false);
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    
    const login = useCallback(({ token, userId, expirationDate }) => {
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setUserId(userId);
      setToken(token);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userId,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    }, []);
    const logout = useCallback(() => {
      setUserId(null);
      setToken(null);
      setTokenExpirationDate(null);
      localStorage.removeItem("userData");
    }, []);
    
    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate]);
    
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login({
          userId: storedData.userId,
          token: storedData.token,
          expiration: storedData.expiration,
        });
      }
    }, [login]);

    return {token, login, logout}
}


