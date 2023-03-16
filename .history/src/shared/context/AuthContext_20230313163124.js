import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userInfo: {
    userId: null,
    token: null
  },
  getUser: () => {},
  login: () => {},
  logout: () => {},
});
