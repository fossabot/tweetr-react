import autobind from "autobind-decorator";
import * as React from "react";

import {
  Button,
  Container,
  Divider,
  Form,
  Input,
  Segment,
} from "semantic-ui-react";

import { Api } from "../api";
import { RoutedComponentProperties } from "./index";
import { MessageBox } from "./messagebox";

interface LoginState {
  errorMessage?: string;
  signupMessage?: string;
  isAuthenticating?: boolean;
  handle: string;
  password: string;
}

export class Login extends React.Component<RoutedComponentProperties, LoginState> {
  private readonly api: Api;

  constructor(props: RoutedComponentProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      handle: "",
      password: "",
    };
  }

  public async componentWillMount() {
    if (this.api.session.isLoggedIn) {
      this.props
          .history
          .push("/tweets");
    }
  }

  @autobind
  private inputHandle(event: any) {
    this.setState({
      handle: event.target.value,
    });
  }

  @autobind
  private inputPassword(event: any) {
    this.setState({
      password: event.target.value,
    });
  }

  @autobind
  private async login(event: any) {
    if (!this.state.isAuthenticating) {
      this.setState({
        isAuthenticating: true,
      });

      try {
        await this.api.login(this.state.handle, this.state.password);

        this.props
            .history
            .push("/tweets");
      } catch (error) {
        this.setState({
          errorMessage: error.message,
        });
      }

      this.setState({
        isAuthenticating: false,
      });
    }
  }

  public render() {
    return (
      <Container className="login">
        <Segment>
          <h1>Login</h1>
          <MessageBox error message={this.state.errorMessage} />
          <MessageBox success message={this.state.signupMessage} />

          <Form onSubmit={this.login}>
            <Form.Field>
              <label>Handle</label>
              <Input label="@" placeholder="e.g. realFirstAndLastName" onChange={this.inputHandle} />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <div className="ui fluid labeled input">
                <div className="ui icon label">
                  <i className="ui lock icon" />
                </div>

                <input type="password" placeholder="********************************" onChange={this.inputPassword} />
              </div>
            </Form.Field>

            <Divider hidden />

            <Button fluid color="green" loading={this.state.isAuthenticating}>
              Login to tweetr
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}
