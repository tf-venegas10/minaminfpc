import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import Home from "../imports/ui/Home/Home";
import Teams from "../imports/ui/Teams/Teams";
import Schedule from "../imports/ui/Schedule/Schedule";
import H2H from "../imports/ui/H2H/H2H";
import Login from "../imports/ui/Login";
import About from "../imports/ui/About";
import NotFound from "../imports/ui/NotFound";
import Navb from "../imports/ui/Navbar";
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

Meteor.startup(() => {
  const browserHistory = createBrowserHistory();

  render(<div>
    <Navb />
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/teams" component={Teams} />
        <Route exact path="/h2h" component={H2H} />
        <Route exact path="/login" component={Login}/>
        <Route exact path='/schedule' component={Schedule} />
        <Route exact path='/about' component={About} />
        <Route exact path='*' component={NotFound} />
      </Switch>
    </Router>
  </div>
    , document.getElementById("render-target"));
});