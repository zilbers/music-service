import React, { useEffect, useState, useContext } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { like, favorite, getAll } from "../modules/actions";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../CSS/Display.css";

function Display({ match }) {
  const context = useContext(UserContext);
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const type = match.params.display;

  const handleClick = (id) => {
    like(id, context.id);
    favorite(id, data, setData);
  };

  useEffect(() => {
    const onRender = async () => {
      await getAll(type, setData);
      await getAll(`${type}/liked/${context.id}`, setLiked);
    };
    onRender();
  }, [type]);

  useEffect(() => {
    liked[0] && liked.map((item) => favorite(item.id, data, setData));
  }, [liked]);

  return (
    <div className="display place">
      <h2 className="header">{type}</h2>
      {data.map((item) => (
        <div className="linksDisplay" key={item.id * Math.random()}>
          <Link className="row links" to={`/${type}/${item.id}`}>
            {item.coverImg && (
              <img
                className="cover_img"
                src={item.coverImg}
                alt={`${item.name}`}
              />
            )}
            {item.youtubeLink && (
              <img
                className="cover_img"
                src={`https://img.youtube.com/vi/${item.youtubeLink}/0.jpg`}
                alt={`${item.name}`}
              />
            )}
            <span className="title">
              {item.name}
              {item.Artist && (
                <span className="artist">{item.Artist.name}</span>
              )}
            </span>
          </Link>
          <span className="icon" onClick={() => handleClick(item.id)}>
            {item.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Display;
