import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ActivityMap, Navigation } from './components';


ReactDOM.render(
  <React.StrictMode>
    <Navigation />
    <ActivityMap />
  </React.StrictMode>,
  document.getElementById('root')
);
