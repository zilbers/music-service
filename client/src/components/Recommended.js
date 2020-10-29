import React, { useEffect, useState } from "react";
import { get } from "../modules/axios-module";
import { Link } from "react-router-dom";
import "../CSS/Recommended.css";

function Recommended({ url, itemId }) {
  const [data, setData] = useState([]);

  function getAll(type) {
    get(type)
      .then(({ data }) => {
        const validData = data.songs
          ? data.songs
          : data.songList
          ? data.songList
          : data;
        setData(validData);
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
        if (item.id !== itemId) {
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
