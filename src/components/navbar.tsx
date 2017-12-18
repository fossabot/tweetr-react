import autobind from "autobind-decorator";
import * as React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Divider,
  Dropdown,
  Item,
  Menu,
} from "semantic-ui-react";

import { Api } from "../api";
import { RoutedComponentProperties } from "./index";

export class Navbar extends React.Component<RoutedComponentProperties, any> {
  private readonly api: Api;

  constructor(props: RoutedComponentProperties) {
    super(props);

    this.api = new Api();
  }

  @autobind
  private logout() {
    this.api.logout();
    this.props.history.push("/");
  }

  public render() {
    const user = this.api.session.loggedInUser;
    let adminLink = (<div />);

    if (user.role === "admin") {
      adminLink = (
        <>
          <Link to="/administration">
            <Menu.Item>Administration</Menu.Item>
          </Link>

          <Divider />
        </>
      );
    }

    return (
      <nav className="ui fixed menu">
        <Container>
          <Menu.Item className="header">
            <img src="https://tweetr-us-west-1.herokuapp.com/logo.png" />
          </Menu.Item>

          <Link to="/tweets">
            <Menu.Item>Feed</Menu.Item>
          </Link>
          <Link to="/firehose">
            <Menu.Item>Firehose</Menu.Item>
          </Link>
          <Link to="/users">
            <Menu.Item>Users</Menu.Item>
          </Link>

          <Menu.Menu position="right">
              <Dropdown item inline pointing icon="dropdown" className="top right" text={<img src={user.imageUrl} /> as any}>
                <Dropdown.Menu>
                  {adminLink}

                  <Link to={"/users/" + user.handle}>
                    <Dropdown.Item>Your profile</Dropdown.Item>
                  </Link>
                  <Link to="/account">
                    <Dropdown.Item>Account settings</Dropdown.Item>
                  </Link>

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </Menu.Menu>
        </Container>
      </nav>
    );
  }
}
