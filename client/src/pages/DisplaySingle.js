import React, { useEffect, useState } from 'react';
import { get } from '../modules/axios-module';
import { Link } from 'react-router-dom';
import List from '../components/List';
import Recommended from '../components/Recommended';
import '../CSS/DisplaySingle.css';

function DisplaySingle({ match, history, location }) {
  const [item, setItem] = useState({});
  const urlParams = match.url.split('/');
  const dataUrl = `${urlParams[1]}/${urlParams[1].slice(0, -1)}_${
    urlParams[2]
  }`;

  let type = !(match.path === '/songs/:id');

  useEffect(() => {
    get(dataUrl)
      .then((data) => {
        setItem(data.data[0]);
      })
      .catch((err) => console.log(err));
  }, [dataUrl]);

  const query = urlParams.slice(1);
  const url = `/${query[0]}/${query[1]}/list`;
  const qParams = new URLSearchParams(location.search);
  const qParamsObj = { from: qParams.get('from'), id: qParams.get('id') };

  return (
    <div className="DisplaySingle place">
      <h2 className="header">{item.name}</h2>
      {item.Artist && (
        <Link className="links" to={`/artists/${item.Artist.id}`}>
          <h4>By {item.Artist.name}</h4>
        </Link>
      )}
      <div className="mainSec">
        {item.coverImg && (
          <img className="cover_img" src={item.coverImg} alt={`${item.name}`} />
        )}
        {item.youtubeLink && (
          <iframe
            width="560"
            height="315"
            title={item.name}
            src={`https://www.youtube.com/embed/${item.youtubeLink}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {item.youtubeLink &&
          (qParamsObj.from ? (
            <div className="recommended">
              From same {qParamsObj.from}
              <Recommended
                url={`${qParamsObj.from}/${qParamsObj.id}/list`}
                item_id={item.id}
              />
            </div>
          ) : (
            <div className="recommended">
              More from charts
              <Recommended url={`songs/top`} itemId={item.id} />
            </div>
          ))}
      </div>
      {type && item && (
        <List
          dataType={url}
          match={match}
          history={history}
          location={location}
        />
      )}
      {item.createdAt && (
        <h5>Created at: {item.createdAt.slice(0, 11).replace('T', ' ')}</h5>
      )}
    </div>
  );
}

export default DisplaySingle;
