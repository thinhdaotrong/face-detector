import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { detectFaces, drawResults } from '../../helpers/faceApi';

import Results from '../Results/Results';
import Webcam from 'react-webcam';

import './Camera.css';

const Camera = () => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [results, setResults] = useState([]);
  console.log('🚀 ~ file: Camera.js ~ line 16 ~ Camera ~ results', results);

  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      await drawResults(camera.current.video, cameraCanvas.current, faces, 'boxLandmarks');
      setResults(faces);
    }
  };

  const clearOverlay = (canvas) => {
    canvas.current.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 80);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    }
  }, []);

  return (
    <div className='camera'>
      <div className='camera__wrapper'>
        <Webcam audio={false} ref={camera} width='100%' height='auto' />
        <canvas className={classnames('webcam-overlay')} ref={cameraCanvas} />
      </div>
      <div className='results__container'>
        <Results results={results} />
      </div>
    </div>
  );
};

export default Camera;
