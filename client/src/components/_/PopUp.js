import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from 'react';

const PopUp = () => {
   var products = [];
   
   useEffect(() => {
    fetch('http://localhost:5000/video-feed')
       .then((res) => res.json())
       .then((data) => {
          console.log(data);
          products.concat(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
   }, []);

   const renderList = products.map((item, index) => <div key={index}>{item}</div>);

   return (
      <div>
         {renderList}
      </div>
   )
   
};

export default PopUp;