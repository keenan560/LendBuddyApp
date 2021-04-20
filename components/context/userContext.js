import React from "react";

export default React.createContext({
  user: null,
  login: (appUser) => {
    this.user = appUser;
  },
  logout: () => {},
  userData: null,
  id: null,
});
