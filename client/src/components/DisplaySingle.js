import React, { useEffect, useState } from "react";
import { get } from "../modules/axios-module";
import { Link } from "react-router-dom";
import List from "./List";
import Recommended from "./Recommended";
import "./css/DisplaySingle.css";

function DisplaySingle(props) {
  const [item, setItem] = useState({});
  let type =
    props.match.path === "/playlists/:id" ||
    props.match.path === "/albums/:id" ||
    props.match.path === "/artists/:id";

  function getAll(type) {
    get(type)
      .then((data) => setItem(data.data[0]))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAll(`${props.match.url}`);
  }, [props.match.url]);

  const query = props.match.url.split("/").slice(1);
  const url = `/${query[0]}/${query[1]}/list`;
  const qParams = new URLSearchParams(props.location.search);
  const qParamsObj = { from: qParams.get("from"), id: qParams.get("id") };

  return (
    <div className="DisplaySingle">
      <h2 className="header">{item.name}</h2>
      {item.artist && (
        <Link className="links" to={`/artists/${item.artist_id}`}>
          <h4>By {item.artist}</h4>
        </Link>
      )}
      <div className="mainSec">
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
        {item.youtube_link &&
          (qParamsObj.from ? (
            <div className="recommended">
              From same {qParamsObj.from}
              <Recommended url={`${qParamsObj.from}/${qParamsObj.id}/list`} />
            </div>
          ) : (
            <div className="recommended">
              More from charts
              <Recommended url={`top/songs`} />
            </div>
          ))}
      </div>
      {type && (
        <List
          dataType={url}
          match={props.match}
          history={props.history}
          location={props.location}
        />
      )}
      {item.created_at && (
        <h5>Created at: {item.created_at.slice(0, 11).replace("T", " ")}</h5>
      )}
    </div>
  );
}

export default DisplaySingle;
