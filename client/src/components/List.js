import React, { useEffect, useState, useContext } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { like, favorite, getAll } from "../modules/actions";
import "../CSS/Table.css";

function List(props) {
  const context = useContext(UserContext);
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const type = props.dataType;

  const handleClick = (id) => {
    like(id, context.id);
    favorite(id, data, setData);
  };

  useEffect(() => {
    const regex = RegExp("playlist*", "g");
    getAll(type, (item) =>
      setData(regex.test(props.dataType) ? item.songList : item.songs)
    );
    getAll(`songs/liked/${context.id}`, setLiked);
  }, [type]);

  useEffect(() => {
    liked[0] && liked.map((item) => favorite(item.id, data, setData));
  }, [liked]);

  const query = props.match.url.split("/").slice(1);
  return (
    <div className="display">
      {data &&
        data.map((item, index) => {
          const song = item.Song ? item.Song : item;
          return (
            <div className="row" key={song.id * Math.random()}>
              {song.coverImg && (
                <img
                  className="cover_img"
                  src={song.coverImg}
                  alt={song.name}
                />
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
