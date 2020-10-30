import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App';
import UserContextProvider from './context/UserContext';

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
);
