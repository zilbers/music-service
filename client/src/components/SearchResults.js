import React from "react";
import { Link } from "react-router-dom";
import "../CSS/SearchResults.css";

export default function SearchResults(props) {
  const handleClick = () => {
    props.setData([]);
    props.setSearch("");
  };
  return (
    <div className="results">
      {props.data.map((item) => (
        <div key={item.id}>
          {" "}
          <Link
            key={item.id}
            className="row links"
            to={`/songs/${item.id}`}
            onClick={handleClick}
          >
            {item.youtube_link && (
              <img
                className="cover_img"
                src={`https://img.youtube.com/vi/${item.youtube_link}/0.jpg`}
                alt={`${item.name}`}
              />
            )}
            <span className="title">
              {item.name}
              {item.artist && <span className="artist">{item.artist}</span>}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
