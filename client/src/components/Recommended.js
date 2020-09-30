import React, { useEffect, useState } from "react";
import "./css/Recommended.css";
import { get } from "../modules/axios-module";
import { Link } from "react-router-dom";

function Recommended(props) {
  const [data, setData] = useState([]);
  const url = props.url;

  function getAll(type) {
    get(type)
      .then((data) => {
        console.log(data);
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAll(url);
  }, [url]);
  return (
    <div className="recommendedDisplay">
      {data.map((data, index) => {
        if (data.Song.id !== props.item_id) {
          return (
            <div className="row" key={(data.Song.id * index) - index}>
              <Link
                key={data.Song.id + index}
                className="links"
                to={`/songs/song_${data.Song.id}`}
              >
                <span className="title">
                  {data.Song.name}
                  {data.Song.Artist.name && <span className="artist">{data.Song.Artist.name}</span>}
                </span>
              </Link>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Recommended;
