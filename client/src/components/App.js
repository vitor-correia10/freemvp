import React from 'react';
import GlobalStyles from './style/GlobalStyles';
import Logo from '../components/Logo';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Logo />
        </Route>
      </Switch>
      <GlobalStyles />
    </Router>
  )
}


export default App;