import React from 'react';
import GlobalStyles from './style/GlobalStyles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//Components
import Header from './Header/Header';
import Home from './Home';
import Developer from './Developer';
import Project from './Project';
import FormProject from './forms/FormProject';
import FormDeveloper from './forms/FormDeveloper';
import Footer from './Footer';

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
        <Route path="/project">
          <Project />
        </Route>
        <Route path="/form-developer">
          <FormDeveloper />
        </Route>
        <Route path="/developer">
          <Developer />
        </Route>
      </Switch>
      <Footer />
      <GlobalStyles />
    </Router>
  )
}

export default App;