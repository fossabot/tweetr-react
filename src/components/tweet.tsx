import * as React from "react";
import { Segment } from "semantic-ui-react";
import { User } from "../api";
import { Person } from "./person";

interface TweetProperties {
  user: User;
}

export class Tweet extends React.Component<TweetProperties, any> {
  public render() {
    return (
      <Segment className="tweet">
        <Person user={this.props.user} />

        {this.props.children}
      </Segment>
    );
  }
}
