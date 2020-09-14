import React from "react";
import ListDisplay from "./components/ListDisplay";
import "./App.css";
import { get, deleteById, update, create } from "./modules/axios-module";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music-Service</h1>
        <div className="showCase">
          <ListDisplay get={get} deleteById={deleteById} type="songs" />
          <ListDisplay get={get} deleteById={deleteById} type="albums"/>
          <ListDisplay get={get} deleteById={deleteById} type="playlists"/>
        </div>
      </header>
    </div>
  );
}

export default App;
