import * as React from "react";

import {
  Container,
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
          <SignupForm onSignup={() => this.props.history.push("/login")} />
        </Segment>
      </Container>
    );
  }
}
