import React, { useEffect, useState, useContext } from "react";
import "./css/Display.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { get, create } from "../modules/axios-module";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Display(props) {
  const context = useContext(UserContext);
  const [data, setData] = useState([]);
  const type = props.match.params.display;

  function getAll(type) {
    get(type)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  function like(id) {
    create(`${type}/like`, { song_id: id, user_id: context.user_id })
      .then(() => {})
      .catch((err) => console.log(err));
  }

  function favorite(id) {
    const currentDataId = data.slice();
    like(id);
    let index = currentDataId.findIndex((item) => item.id === id);
    currentDataId[index].favorite
      ? delete currentDataId[index].favorite
      : (currentDataId[index].favorite = true);
    setData(currentDataId);
  }

  useEffect(() => {
    getAll(type);
  }, [type]);

  return (
    <div className="display">
      <h2 className="header">{type}</h2>
      {data.map((item) => (
        <div className="linksDisplay" key={item.id}>
          <Link key={item.id} className="row links" to={`/${type}/${item.id}`}>
            {item.cover_img && (
              <img
                className="cover_img"
                src={item.cover_img}
                alt={`${item.name}`}
              />
            )}
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
          <span className="icon" onClick={() => favorite(item.id)}>
            {item.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Display;
