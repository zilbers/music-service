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
      .then((data) => {
        console.log("data", data.data, props.dataType);
        setter(data.data);
      })
      .catch((err) => console.log(err));
  }

  function like(id) {
    create(`songs/like`, { songId: id, userId: context.id })
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
    const regex = RegExp("playlist*", "g");
    getAll(type, (item) =>
      setData(regex.test(props.dataType) ? item.songList : item.songs)
    );
    getAll(`songs/liked/${context.id}`, setLiked);
  }, [type]);

  useEffect(() => {
    liked[0] && liked.map((item) => favorite(item.id));
  }, [liked]);

  const query = props.match.url.split("/").slice(1);
  return (
    <div className="display">
      {data.map((item, index) => {
        const song = item.Song ? item.Song : item;
        return (
          <div className="row" key={song.id * Math.random()}>
            {song.coverImg && (
              <img className="cover_img" src={song.coverImg} alt={song.name} />
            )}
            <Link
              key={song.id + index}
              className="links"
              to={`/songs/${song.id}?from=${query[0]}&id=${query[1]}`}
            >
              <span className="title">
                {song.name}
                {song.Artist && (
                  <span className="artist">{song.Artist.name}</span>
                )}
              </span>
            </Link>
            <span className="icon" onClick={() => handleClick(song.id)}>
              {song.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default List;
