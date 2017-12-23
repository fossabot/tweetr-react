import * as React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Divider,
  Segment,
} from "semantic-ui-react";

import { RoutedComponentProperties } from "./index";
import { Navbar } from "./navbar";
import { SignupForm } from "./signup-form";

export class Signup extends React.Component<RoutedComponentProperties, any> {
  public render() {
    return (
      <Container className="signup">
        <Segment>
          <h1>New here? <span className="muted text">Register</span></h1>
          <p>Before you can start telling the world what you're thinking about, we need some basic information from you.</p>

          <SignupForm onSignup={() => this.props.history.push("/login")} />
        </Segment>

        <Divider horizontal>Already have an account?</Divider>
        <Link to="/login">
          <Button fluid color="grey">Login to tweetr</Button>
        </Link>
      </Container>
    );
  }
}
