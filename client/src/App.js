import React, { useContext, useEffect } from "react";
import Display from "./pages/Display";
import Home from "./pages/Home";
import DisplaySingle from "./pages/DisplaySingle";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import AppBar from "./components/AppBar";
import ReactGa from "react-ga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import "./CSS/App.css";

function App() {
  const context = useContext(UserContext);

  useEffect(() => {
    ReactGa.initialize("G-9C2R1E9HQ3");
    ReactGa.pageview("/");
  }, []);

  return (
    <>
      {!context.success ? (
        <Router>
          <Route path="/">
            <Login />
          </Route>
        </Router>
      ) : (
        <div className="App">
          <Router>
            <div className="AppBar">
              <AppBar className="AppBar" />
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/lists/:display" component={Display} />
              <Route path="/songs/:id" component={DisplaySingle} />
              <Route path="/albums/:id" component={DisplaySingle} />
              <Route path="/artists/:id" component={DisplaySingle} />
              <Route path="/playlists/:id" component={DisplaySingle} />
              <Route component={Page404} />
            </Switch>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
