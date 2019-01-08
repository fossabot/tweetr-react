import autobind from "autobind-decorator";
import * as React from "react";

import {
  Button,
  Divider,
  Form,
} from "semantic-ui-react";

import {
  Api,
  User,
} from "../api";
import { MessageBox } from "./messagebox";

interface SignupFormProperties {
  onSignup(user: User) : void;
}

interface SignupFormState {
  error: "";
  handle: string;
  image: File;
  isSigningUp: boolean;
  name: string;
  password: string;
}

export class SignupForm extends React.Component<SignupFormProperties, SignupFormState> {
  private readonly api: Api;
  private imageInput?: HTMLInputElement;

  constructor(props: SignupFormProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      error: "",
      handle: "",
      image: null as any,
      isSigningUp: false,
      name: "",
      password: "",
    };
  }

  @autobind
  private inputName(event: any) {
    this.setState({
      name: event.target.value,
    });
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
  private uploadFile(event: any) {
    const files: FileList = event.target.files,
          image = files.item(0)!;

    this.setState({
      image,
    });
  }

  @autobind
  private async signup() {
    this.setState({
      isSigningUp: true,
    });

    try {
      const response = await this.api.signup(this.state.handle, this.state.name, this.state.password, this.state.image);

      this.imageInput!.value = "";
      this.setState({
        handle: "",
        isSigningUp: false,
        name: "",
        password: "",
      });

      this.props.onSignup(response.user);
    } catch (error) {
      this.setState({
        error: error.message,
        isSigningUp: false,
      });
    }
  }

  public render() {
    return (
      <>
        <MessageBox error message={this.state.error} />

        <Form onSubmit={this.signup}>
          <Form.Field>
            <label>Full name</label>
            <div className="ui fluid labeled input">
              <div className="ui icon label">
                <i className="user icon" />
              </div>

              <input type="text" placeholder="First and Lastname" value={this.state.name} onChange={this.inputName} />
            </div>
          </Form.Field>

          <Form.Field>
            <label>Handle</label>
            <div className="ui fluid labeled input">
              <div className="ui label">@</div>
              <input type="text" placeholder="e.g. realFirstAndLastName" value={this.state.handle} onChange={this.inputHandle} />
            </div>
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <div className="ui fluid labeled input">
              <div className="ui icon label">
                <i className="lock icon" />
              </div>

              <input type="password" placeholder="Something hard to guess" value={this.state.password} onChange={this.inputPassword} />
            </div>
          </Form.Field>

          <Form.Field>
            <label>Profile picture</label>
            <div className="ui fluid labeled file input">
              <div className="ui icon label">
                <i className="photo icon" />
              </div>

              <input type="file" onChange={this.uploadFile} ref={(element: HTMLInputElement) => this.imageInput = element} />
            </div>
          </Form.Field>

          <Divider hidden />

          <Button fluid color="green" onClick={this.signup} loading={this.state.isSigningUp} disabled={this.state.isSigningUp}>Sign up for tweetr</Button>
        </Form>
      </>
    );
  }
}
