import React, { useState } from "react";
import Display from "./components/Display";
import Menu from "./components/Menu";
import CreateNewData from "./components/CreateNewData";
import Home from "./components/Home";
import DisplaySingle from "./components/DisplaySingle";
import Page404 from "./components/Page404";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

  return (
    <div className="App">
      <Router>
        <section className="solid">
          <h1>Music-Service</h1>
          <div className="showCase">
            <Menu />
            <CreateNewData />
          </div>
        </section>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/lists/:display" component={Display} />
          <Route path="/songs/:id" component={DisplaySingle} />
          <Route path="/albums/:id" component={DisplaySingle} />
          <Route path="/artists/:id" component={DisplaySingle} />
          <Route path="/playlists/:id" component={DisplaySingle} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
