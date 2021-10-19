import React, { useState } from 'react';

import { loadModels } from './helpers/faceApi';
import { createFaLibrary } from './helpers/icons';

import Camera from './components/Camera/Camera';

import './App.css';
createFaLibrary();
loadModels();
function App() {
  return (
    <div className='App'>
      <header>
        <div className='App__header'>
          <h1>
            <span>Face Detector</span>
          </h1>
        </div>
      </header>
      <Camera />
    </div>
  );
}

export default App;
