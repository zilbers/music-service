import React, { useState } from "react";
import Songs from "./components/Songs";
import Albums from "./components/Albums";
import "./App.css";
import { get, deleteById, update, create } from "./modules/axios-module";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music-Service</h1>
        <div className="showCase">
          <Songs get={get} deleteById={deleteById} />
          <Albums type="albums" get={get} deleteById={deleteById} />
        </div>
      </header>
    </div>
  );
}

export default App;
