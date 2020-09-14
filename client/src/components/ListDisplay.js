import React, { useState } from "react";
import "./css/Table.css";

function ListDisplay(props) {
  const [data, setData] = useState();
  const type = props.type;

  async function getAll() {
    await props
      .get(`${type}`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  async function deletItem(id) {
    if (window.confirm(`Delete the ${type.slice(0,-1)}?`)) {
      await props
        .deleteById(`${type}/${id}`)
        .then((res) => {
          getAll();
          alert(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="mainWrapper">
      {!data && <button onClick={getAll}>{type}</button>}
      {data && (
        <div className="display">
          <button className="type" onClick={() => setData()}>
            {type}
          </button>
          {data.map((data) => (
            <div className="row" key={data.id}>
              <span>{data.name}</span>
              <button onClick={() => deletItem(data.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListDisplay;
