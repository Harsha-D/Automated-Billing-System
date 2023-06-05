import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const videoRef = useRef(null);
  const [productMessage, setProductMessage] = useState('');

  useEffect(() => {
    const videoElement = videoRef.current;

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/video-feed');
        const reader = response.body.getReader();

        const processStream = async ({ done, value }) => {
          if (done) return;

          const decoder = new TextDecoder('utf-8');
          const chunk = decoder.decode(value);

          const { message, frame } = JSON.parse(chunk);
          videoElement.src = `data:image/jpeg;base64,${frame}`;

          setProductMessage(message);

          return reader.read().then(processStream);
        };

        return reader.read().then(processStream);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{"textAlign": 'center'}}>
      <video ref={videoRef} autoPlay />
      <p>Product Message: {productMessage}</p>
    </div>
  );
};

export default App;