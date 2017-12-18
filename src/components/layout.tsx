import * as React from "react";
import { Navbar } from "./navbar";
import { Site } from "./site";

export class Layout extends React.Component {
  public render() {
    return (
      <>
        <Navbar />

        <Site />
      </>
    );
  }
}
