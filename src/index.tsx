import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Activities, Gear, Home } from './components';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>

        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/activities'>
          <Activities />
        </Route>

        <Route path='/gear'>
          <Gear />
        </Route>


      </Switch>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);
