import React, { useEffect, useState, useContext } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { like, favorite, getAll } from "../modules/actions";
import "../CSS/List.css";

function List({ dataType, match }) {
  const context = useContext(UserContext);
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const type = dataType;

  const handleClick = (id) => {
    like(id, context.id);
    favorite(id, data, setData);
  };

  const onRender = async () => {
    const regex = RegExp("playlist*", "g");
    await getAll(type, (item) => {
      const newData = regex.test(dataType)
        ? item.songList
        : item.Songs
        ? item.Songs
        : item.songs;
      setData(newData);
    });
    await getAll(`songs/liked/${context.id}`, setLiked);
  };

  useEffect(() => {
    onRender();
  }, [type]);

  useEffect(() => {
    liked[0] && liked.map((item) => favorite(item.id, data, setData));
  }, [liked]);

  const query = match.url.split("/").slice(1);
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
