import React, { Component } from "react";

export const UserContext = React.createContext();

// export default function UserContextProvider({ children }) {
//   let value = { hey: 1 };
//   function logUserIn(user) {
//     console.log(user);
//     value = { ...user };
//   }
//   return (
//     <UserContext.Provider value={{ ...value, logUserIn }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

class UserContextProvider extends Component {
  state = { logged: false };
  logUserIn = (user) => {
    this.setState({ ...user, logged: true });
  };
  logUserOut = () => {
    this.setState({ logged: false });
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logUserIn: this.logUserIn,
          logUserOut: this.logUserOut,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
