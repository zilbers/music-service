import React, { useEffect, useState } from "react";
import { get } from "../modules/axios-module";
import Display from "./Display";

function DisplaySingle(props) {
  const [item, setItem] = useState({});
  let type =
    props.match.path === "/playlists/:id" || props.match.path === "/albums/:id";

  function getAll(type) {
    get(type)
      .then((data) => setItem(data.data[0]))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAll(`${props.match.url}`);
  }, []);

  console.log(props.match);

  return (
    <div className="DisplaySingle">
      <h2>{item.name}</h2>
      {item.artist && <h4>By {item.artist}</h4>}
      {item.youtube_link && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${item.youtube_link}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      {type && <Display dataType={`playlists/${props.match.params.id}/list`} />}
      {item.created_at && (
        <h5>Created at: {item.created_at.slice(0, 11).replace("T", " ")}</h5>
      )}
    </div>
  );
}

export default DisplaySingle;
