import React, { Profiler } from 'react';
import GlobalStyles from './style/GlobalStyles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//Components
import Header from './Header/Header';
import Home from './Home';
import Users from './User/Users';
import Profile from './User/Profile';
import NotLoggedProfile from './User/NotLoggedProfile'
import Project from './Project/Project';
import Projects from './Project/Projects';
import FormProject1 from './forms/FormProject1';
import FormProject2 from './forms/FormProject2';
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
        <Route path="/form-project-1">
          <FormProject1 />
        </Route>
        <Route path="/form-project-2">
          <FormProject2 />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/project/:name">
          <Project />
        </Route>
        <Route path="/form-user">
          <FormUser />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route exact path="/user">
          <Profile />
        </Route>
        <Route path="/user/:email">
          <NotLoggedProfile />
        </Route>
      </Switch>
      <Footer />
      <GlobalStyles />
    </Router>
  )
}

export default App;