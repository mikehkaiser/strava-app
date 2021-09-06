import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation, Activities } from './components';


ReactDOM.render(
  <React.StrictMode>
    <Navigation />
    <Activities />
  </React.StrictMode>,
  document.getElementById('root')
);
