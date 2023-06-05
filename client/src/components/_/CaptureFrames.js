import React, { useRef, useEffect } from 'react';

const VideoCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data from the canvas
      const frameData = canvas.toDataURL('image/jpeg');

      // Send the image data to the Flask server using an HTTP request
      fetch('http://localhost:5000/process-frames', {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: frameData,
      })
      .then((data) => {
        // Handle the server response
        console.log("Ok")
        displayAnnotatedFrame(data.annotated_frame);
      })
      .catch((error) => {
        console.error('Error sending frame to server:', error);
      });
    }
  };

  const displayAnnotatedFrame = (annotatedFrameData) => {
    // Update the UI with the annotated frame data (e.g., render it on a canvas)
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the annotated frame on the canvas
    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = annotatedFrameData;
  };
  
  return (
    <div>
        <video ref={videoRef} autoPlay playsInline />
        <canvas ref={canvasRef} />
        <button onClick={captureFrame}>Capture Frame</button>
    </div>
  );
};

export default VideoCapture;