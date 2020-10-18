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
import User from './User';
import Project from './Project';
import FormProject from './forms/FormProject';
import FormUser from './forms/FormUser';
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
        <Route path="/form-user">
          <FormUser />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
      <Footer />
      <GlobalStyles />
    </Router>
  )
}

export default App;