import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ActivityMap, Navigation, ActivityList } from './components';


ReactDOM.render(
  <React.StrictMode>
    <Navigation />
    <ActivityList />
    {/* <ActivityMap /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
