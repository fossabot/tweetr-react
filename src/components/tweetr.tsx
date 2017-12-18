import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Landing } from "./landing";
import { Login } from "./login";

export class Tweetr extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
