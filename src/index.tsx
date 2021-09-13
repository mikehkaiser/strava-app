import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Activities, Gear, Home } from './components';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebaseConfig';


ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
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
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
