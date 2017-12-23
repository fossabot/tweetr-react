import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Api } from "../api";
import { Account } from "./account";
import { Admin } from "./admin";
import { Firehose } from "./firehose";
import { Landing } from "./landing";
import { Login } from "./login";
import { Navbar } from "./navbar";
import { Signup } from "./signup";
import { Site } from "./site";
import { Tweets } from "./tweets";
import { User } from "./user";
import { Users } from "./users";

export class Tweetr extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/tweets" component={Tweets} />
          <Route path="/firehose" component={Firehose} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/:handle" component={User} />
          <Route path="/account" component={Account} />
          <Route path="/administration" component={Admin} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}
