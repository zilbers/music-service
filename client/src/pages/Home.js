import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-elastic-carousel';
import { get } from '../modules/axios-module';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../CSS/Home.css';

function Home() {
  const context = useContext(UserContext);
  const [charts, setCharts] = useState([]);
  const endpoints = [
    `songs/liked/${context.id}`,
    'songs/top',
    'albums/top',
    'artists/top',
    'playlists/top',
  ];

  async function getAll(endpoints) {
    let topCharts = await Promise.all(
      endpoints.map(async (endpoint) => {
        return (await get(`${endpoint}`)).data;
      })
    );
    setCharts(topCharts);
  }

  useEffect(() => {
    getAll(endpoints);
  }, []);
  return (
    <div className="Home place">
      <h1>Home</h1>
      <div className="charts">
        {charts &&
          charts.map((chart, index) => {
            return (
              <div key={index} className="chart">
                <h3 className="title">
                  {' '}
                  {endpoints[index].split('/')[1] === 'liked'
                    ? 'Your liked songs'
                    : `Top ${endpoints[index].split('/')[0]}`}
                </h3>
                <Carousel itemsToShow={3} itemsToScroll={3}>
                  {chart.map((item, smallIndex) => {
                    const rawType = endpoints[index].split('/')[0];
                    const type =
                      rawType.charAt(0).toUpperCase() + rawType.slice(1, -1);
                    return (
                      <Link
                        className="carouselLinks carouselItem"
                        to={`/${rawType}/${item[type].id}`}
                        key={item[type].id + smallIndex + item[type].name}
                      >
                        {item[type].cover_img && (
                          <img
                            className="cover_img"
                            src={item[type].cover_img}
                            alt={`${item[type].name}`}
                          />
                        )}
                        {item[type].youtube_link && (
                          <img
                            className="cover_img"
                            src={`https://img.youtube.com/vi/${item[type].youtube_link}/0.jpg`}
                            alt={`${item[type].name}`}
                          />
                        )}
                        <span className="itemTitle" key={item[type].id}>
                          {item[type].name}
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
