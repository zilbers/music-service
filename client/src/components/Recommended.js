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
        if (data.data.songs) {
          setData(data.data.songs);
        } else if (data.data.songList) {
          setData(data.data.songList);
        } else {
          setData(data.data);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAll(url);
  }, [url]);
  return (
    <div className="recommendedDisplay">
      {data.map((data, index) => {
        const item = data.Song ? data.Song : data;
        if (item.id !== props.item_id) {
          return (
            <div className="row" key={item.id * Math.random()}>
              <Link
                key={item.id + index}
                className="links"
                to={`/songs/${item.id}`}
              >
                <span className="title">
                  {item.name}
                  {item.Artist && (
                    <span className="artist">{item.Artist.name}</span>
                  )}
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
