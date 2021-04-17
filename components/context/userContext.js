import React from "react";

export default React.createContext({
  user: null,
  login: (appUser) => {
    this.user = appUser;
  },
  logout: () => {},
  spotRequestAmount: 0,
  setSpotRequestAmount: (amount) => {
    this.spotRequestAmount = amount;
  },
  spotCategory: "none",
  setSpotCategory: (category) => {
    this.spotCategory = category;
  },
  id: null,
});
