import React, { useState } from "react";
import "./css/Table.css";

function Albums(props) {
  const [data, setData] = useState();

  async function getAll() {
    await props
      .get(`lists/${props.type}`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  async function deleteById(album_id) {
    if (window.confirm(`Delete the ${props.type}?`)) {
      await props
        .deleteById(`${props.type}/${album_id}`)
        .then((res) => {
          getAll();
          alert(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="mainWrapper">
      {!data && <button onClick={getAll}>albums</button>}
      {data && (
        <div className="display">
          <button className="type" onClick={() => setData()}>albums</button>
          {data.map((data) => (
            <div className="row" key={data.album_id}>
              <span>{data.name}</span>
              <button onClick={() => deleteById(data.album_id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Albums;
