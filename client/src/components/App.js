import React from 'react';
import GlobalStyles from './style/GlobalStyles';

import Header from './Header';
import Home from './Home';
import FormProject from './forms/FormProject';
import FormDeveloper from './forms/FormDeveloper';

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
        <Route path="/form-project">
          <FormProject />
        </Route>
        <Route path="/form-developer">
          <FormDeveloper />
        </Route>
      </Switch>
      <GlobalStyles />
    </Router>
  )
}


export default App;