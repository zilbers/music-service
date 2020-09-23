import React, { useContext } from "react";
import Display from "./components/Display";
import Home from "./components/Home";
import DisplaySingle from "./components/DisplaySingle";
import Page404 from "./components/Page404";
import Login from "./components/Login";
import AppBar from "./components/AppBar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function App() {
  // async function deletItem(type, id) {
  //   if (window.confirm(`Delete the ${type.slice(0, -1)}?`)) {
  //     await deleteById(`${type}/${id}`)
  //       .then((res) => {
  //         getAll();
  //         alert(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }
  // const [logged, setLogged] = useState(false);
  const context = useContext(UserContext);

  return (
    <>
      {!context.logged ? (
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
