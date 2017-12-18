import * as React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

export class Site extends React.Component {
  public render() : JSX.Element {
    return (
      <Container className="site" />
    );
  }
}
