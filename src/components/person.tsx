import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "../api";

interface PersonProperties {
  user: User;
}

export class Person extends React.Component<PersonProperties, any> {
  public render() {
    return (
      <Link to={"/users/" + this.props.user.handle}>
        <div className="person">
          <img src={this.props.user.imageUrl} />

          <h3>{this.props.user.name}</h3>
          <div className="muted text">@{this.props.user.handle}</div>
        </div>
      </Link>
    );
  }
}
