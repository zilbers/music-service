import React, { useState } from 'react';
import Songs from './components/Songs'
import './App.css';
import { get, deleteById, update, create } from './modules/axios-module';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Songs get={get} deleteById={deleteById}/>
      </header>
    </div>
  );
}

export default App;
