import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Api } from "../api";
import { Landing } from "./landing";
import { Login } from "./login";
import { Navbar } from "./navbar";
import { Site } from "./site";

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
