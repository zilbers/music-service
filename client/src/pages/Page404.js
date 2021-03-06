import React from 'react';
import * as url from '../files/Andy-Samberg-as-Jake-Peralta-in-Brooklyn-Nine-Nine-404.jpg';
import { Link } from 'react-router-dom';
import '../CSS/Page404.css';

function Page404() {
  return (
    <div className="Page404 place">
      <h1 className="pageHeader">Noice, 404</h1>
      <img className="img404" src={url.default} alt={`404`} />
      <Link className="goHome" to="/">
        <h4 className="homeLink">Go home, you're drunk</h4>
      </Link>
    </div>
  );
}

export default Page404;
