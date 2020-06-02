import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [myUser, setMyUser] = useState("");

  return (
    <UserContext.Provider value={[myUser, setMyUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
