import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Landing } from "./landing";
import { Layout } from "./layout";
import { Login } from "./login";

export class Tweetr extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />

          <Layout />
        </div>
      </Router>
    );
  }
}
