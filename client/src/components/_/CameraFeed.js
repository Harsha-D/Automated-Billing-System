import React from 'react';
import './CameraFeed.css'

const CameraFeed = () => {
  return (
    <div className='cam-center'>
      <img src="http://localhost:5000/video-feed" alt="Video"/>
    </div>
  );
};

export default CameraFeed;
