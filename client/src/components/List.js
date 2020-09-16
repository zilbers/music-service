import React, { useEffect, useState } from "react";
import "./css/Table.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { get } from "../modules/axios-module";
import { Link } from "react-router-dom";

function List(props) {
  const [data, setData] = useState([]);
  const type = props.dataType;

  function getAll(type) {
    get(type)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  function favorite(id) {
    const currentDataId = data.slice();
    let index = currentDataId.findIndex((item) => item.id === id);
    currentDataId[index].favorite
      ? delete currentDataId[index].favorite
      : (currentDataId[index].favorite = true);
    console.log(currentDataId);
    setData(currentDataId);
  }

  useEffect(() => {
    getAll(type);
  }, [type]);

  const query = props.match.url.split("/").slice(1);
  return (
    <div className="display">
      {data.map((data, index) => (
        <div className="row" key={data.id + index + data.name}>
          <Link
            key={data.id + index}
            className="links"
            to={`/songs/${data.id}?from=${query[0]}&id=${query[1]}`}
          >
            <span className="title">
              {data.name}
              {data.artist && <span className="artist">{data.artist}</span>}
            </span>
          </Link>
          <span className="icon" onClick={() => favorite(data.id)}>
            {data.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </span>
        </div>
      ))}
    </div>
  );
}

export default List;
