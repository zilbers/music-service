import React, { useState } from "react";
import Display from "./components/Display";
import Menu from "./components/Menu";
import CreateNewData from "./components/CreateNewData";
import "./App.css";
import { get, deleteById, update, create } from "./modules/axios-module";

function App() {
  const [data, setData] = useState();

  function getAll(type) {
    get(type)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  async function deletItem(type, id) {
    if (window.confirm(`Delete the ${type.slice(0, -1)}?`)) {
      await deleteById(`${type}/${id}`)
        .then((res) => {
          getAll();
          alert(res.data);
        })
        .catch((err) => console.log(err));
    }
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

  return (
    <div className="App">
      <h1>Music-Service</h1>
      <div className="showCase">
        <Menu getAll={getAll} />
        <CreateNewData />
      </div>
      {data && <Display data={data} favorite={favorite} />}
    </div>
  );
}

export default App;
