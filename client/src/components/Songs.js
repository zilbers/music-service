import React, { useState } from "react";
import "./css/Table.css";

function Songs(props) {
  const [data, setData] = useState();

  async function getAllSongs() {
    await props
      .get(`lists/songs`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  async function deleteSong(song_id) {
    if (window.confirm("Delete the song?")) {
      await props
        .deleteById(`songs/${song_id}`)
        .then((res) => {
          getAllSongs();
          alert(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="mainWrapper">
      {!data && <button onClick={getAllSongs}>songs</button>}
      {data && (
        <div className="display">
          <button className="type" onClick={() => setData()}>Songs</button>
          {data.map((data) => (
            <div className="row" key={data.song_id}>
              <span>{data.title}</span>
              <button onClick={() => deleteSong(data.song_id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Songs;
