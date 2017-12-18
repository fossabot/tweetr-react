import * as React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { RoutedComponentProperties } from "./index";
import { Navbar } from "./navbar";

export class Site extends React.Component<RoutedComponentProperties, any> {
  public render() : JSX.Element {
    return (
      <>
        <Navbar history={this.props.history} match={this.props.match} />

        <Container className="site">
          {this.props.children}
        </Container>
      </>
    );
  }
}
