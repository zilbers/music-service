import React, { useEffect, useState } from "react";
import "./css/Recommended.css";
import { get } from "../modules/axios-module";
import { Link } from "react-router-dom";

function Recommended(props) {
  const [data, setData] = useState([]);
  const url = props.url;

  function getAll(type) {
    get(type)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAll(url);
  }, [url]);
  return (
    <div className="recommendedDisplay">
      {data.map((data, index) => {
        if (data.id !== props.item_id) {
          return (
            <div className="row" key={(data.id + index) * index}>
              <Link
                key={data.id + index}
                className="links"
                to={`/songs/song_${data.id}`}
              >
                <span className="title">
                  {data.name}
                  {data.artist && <span className="artist">{data.artist}</span>}
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
