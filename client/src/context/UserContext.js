import React from "react";

export const UserContext = React.createContext();

export default function UserContextProvider({ children }) {
  const value = { user_id: 1 };
  return (
    <UserContext.Provider value={{...value}}>{children}</UserContext.Provider>
  );
}
