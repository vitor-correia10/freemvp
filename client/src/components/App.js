import React from 'react';
import GlobalStyles from './style/GlobalStyles';

import Header from './Header';
import Home from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <GlobalStyles />
    </Router>
  )
}


export default App;