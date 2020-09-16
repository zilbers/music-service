import React, { useEffect, useState } from "react";
import { get } from "../modules/axios-module";
import { Link } from "react-router-dom";
import "./css/Home.css";

function Home() {
  const [charts, setCharts] = useState([]);
  const endpoints = ["songs", "albums", "artists", "playlists"];

  async function getAll(endpoints) {
    let topCharts = await Promise.all(
      endpoints.map(async (endpoint) => {
        return (await get(`top/${endpoint}`)).data;
      })
    );
    setCharts(topCharts);
  }

  useEffect(() => {
    getAll(endpoints);
  }, []);

  return (
    <div className="Home">
      <h1>Home</h1>
      <div className="charts">
        {charts &&
          charts.map((chart, index) => {
            return (
              <div key={index} className="chart">
                <h3 className="title"> Top {endpoints[index]}</h3>
                {chart.map((item, smallIndex) => {
                  return (
                    <Link
                      className="links"
                      to={`/${endpoints[index]}/${item.id}`}
                      key={item.name}
                    >
                      <span className="row" key={item.id}>
                        <span className="index">{smallIndex + 1}</span>{" "}
                        <span className="itemTitle">{item.name}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
