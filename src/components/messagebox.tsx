import * as React from "react";
import { Message } from "semantic-ui-react";

interface ErrorMessageProperties {
  message?: string;
  error?: boolean;
  success?: boolean;
}

export class MessageBox extends React.Component<ErrorMessageProperties, any> {
  public render() {
    if (this.props.message) {
      return (
        <Message error={this.props.error} info={this.props.success}>
          {this.props.message}
        </Message>
      );
    }

    return (
      <div />
    );
  }
}
