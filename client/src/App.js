import React from "react";
import ListDisplay from "./components/ListDisplay";
import "./App.css";
import { get, deleteById, update, create } from "./modules/axios-module";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import PersonIcon from '@material-ui/icons/Person';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music-Service</h1>
        <div className="showCase">
          <ListDisplay type="songs" Icon={MusicNoteIcon} />
          <ListDisplay type="albums" Icon={AlbumIcon} />
          <ListDisplay type="artists" Icon={PersonIcon}/>
          <ListDisplay type="playlists" Icon={QueueMusicIcon} />
        </div>
      </header>
    </div>
  );
}

export default App;
