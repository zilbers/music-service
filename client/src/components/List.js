import React, { useEffect, useState, useContext } from "react";
import "./css/Table.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { get, create } from "../modules/axios-module";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function List(props) {
  const context = useContext(UserContext);
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const type = props.dataType;

  function getAll(type, setter) {
    get(type)
      .then((data) => setter(data.data))
      .catch((err) => console.log(err));
  }

  function like(id) {
    create(`songs/like`, { song_id: id, user_id: context.user_id })
      .then(() => {
        return;
      })
      .catch((err) => console.log(err));
  }

  function favorite(id) {
    const currentDataId = data.slice();
    let index = currentDataId.findIndex((item) => item.id === id);
    currentDataId[index] &&
      (currentDataId[index].favorite
        ? delete currentDataId[index].favorite
        : (currentDataId[index].favorite = true));
    setData(currentDataId);
  }

  const handleClick = (id) => {
    like(id);
    favorite(id);
  };

  useEffect(() => {
    getAll(type, setData);
    getAll(`songs/liked/${context.user_id}`, setLiked);
  }, [type]);

  useEffect(() => {
    liked[0] && liked.map((item) => favorite(item.id));
  }, [liked]);

  const query = props.match.url.split("/").slice(1);
  return (
    <div className="display">
      {data.map((item, index) => (
        <div className="row" key={item.id + index + item.name}>
          {item.cover_img && (
            <img className="cover_img" src={item.cover_img} alt={item.name} />
          )}
          <Link
            key={item.id + index}
            className="links"
            to={`/songs/song_${item.id}?from=${query[0]}&id=${query[1]}`}
          >
            <span className="title">
              {item.name}
              {item.artist && <span className="artist">{item.artist}</span>}
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

export default List;
