import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import Appv3 from './Appv3';
import Appv2 from './Appv2';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appv2/>
    {/* <Appv3/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
