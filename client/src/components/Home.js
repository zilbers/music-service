import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
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
                <Carousel itemsToShow={3}>
                  {chart.map((item, smallIndex) => {
                    return (
                      <Link
                        className="carouselLinks carouselItem"
                        to={`/${endpoints[index]}/${item.id}`}
                        key={item.name}
                      >
                        {item.cover_img && (
                          <img
                            className="cover_img"
                            src={item.cover_img}
                            alt={`${item.name} image`}
                          />
                        )}
                        <span className="itemTitle" key={item.id}>
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </Carousel>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
