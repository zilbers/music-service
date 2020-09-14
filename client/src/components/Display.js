import React from "react";
import "./css/Table.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Display(props) {
  const { data, favorite } = props;
  return (
    <div className="display">
      {data.map((data) => (
        <div className="row" key={data.id}>
          <span className="title">
            {data.name}
            {data.artist && <span className="artist">{data.artist}</span>}
          </span>
          <span className="icon" onClick={() => favorite(data.id)}>
            {data.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Display;
