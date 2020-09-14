import React, { useState, useEffect } from "react";
import "./css/Table.css";
import { get, deleteById } from "../modules/axios-module";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

function ListDisplay(props) {
  const [data, setData] = useState();
  const { type, Icon } = props;

  async function getAll() {
    await get(`${type}`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  async function deletItem(id) {
    if (window.confirm(`Delete the ${type.slice(0, -1)}?`)) {
      await deleteById(`${type}/${id}`)
        .then((res) => {
          getAll();
          alert(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  function mark(id) {
    const currentDataId = data.slice();
    let index = currentDataId.findIndex((item) => item.id === id);
    currentDataId[index].mark
      ? delete currentDataId[index].mark
      : (currentDataId[index].mark = true);
    console.log(currentDataId);
    setData(currentDataId);
  }

  return (
    <div className="mainWrapper">
      {Icon && <Icon />}
      {!data && <button onClick={getAll}>{type}</button>}
      {data && (
        <div className="display">
          <button className="type" onClick={() => setData()}>
            {type}
          </button>
          {data.map((data, index) => (
            <div className="row" key={data.id}>
              <span>{data.name}</span>
              {data.artist && <span className="artist">{data.artist}</span>}
              {data.mark ? (
                <CheckBoxIcon onClick={() => mark(data.id)} />
              ) : (
                <CheckBoxOutlineBlankIcon onClick={() => mark(data.id)} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListDisplay;
