import autobind from "autobind-decorator";
import * as React from "react";

import {
  Button,
  Divider,
  Form,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";

import { Api } from "../api";
import { RoutedComponentProperties } from "./index";
import { MessageBox } from "./messagebox";
import { Site } from "./site";

interface AccountState {
  error: string;
  image?: File;
  name: string;
  handle: string;
  password1: string;
  password2: string;

  didPurge: boolean;
  isPurging: boolean;
  isUpdatingAccount: boolean;
}

export class Account extends React.Component<RoutedComponentProperties, AccountState> {
  private readonly api: Api;

  constructor(props: RoutedComponentProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      error: "",
      handle: this.api.session.loggedInUser.handle,
      name: this.api.session.loggedInUser.name,
      password1: "",
      password2: "",

      didPurge: false,
      isPurging: false,
      isUpdatingAccount: false,
    };
  }

  @autobind
  private inputHandle(event: any) {
    this.setState({
      handle: event.target.value,
    });
  }

  @autobind
  private inputName(event: any) {
    this.setState({
      name: event.target.value,
    });
  }

  @autobind
  private uploadFile(event: any) {
    const files: FileList = event.target.files,
          image = files.item(0);

    this.setState({
      image,
    });
  }

  @autobind
  private inputPassword1(event: any) {
    this.setState({
      password1: event.target.value,
    });
  }

  @autobind
  private inputPassword2(event: any) {
    this.setState({
      password2: event.target.value,
    });
  }

  @autobind
  private async updateAccount() {
    this.setState({
      isUpdatingAccount: true,
    });

    try {
      if ((this.state.password1 || this.state.password2) && this.state.password1 !== this.state.password2) {
        throw new Error("passwords don't match");
      }

      await this.api.updateAccount(this.state.handle, this.state.name, this.state.image, this.state.password1);

      const loggedInUser = this.api.session.loggedInUser;

      if (loggedInUser.handle !== this.state.handle) {
        loggedInUser.handle = this.state.handle;
        this.api.session.user = loggedInUser;
      }

      const updatedUserInfo = await this.api.viewUser(loggedInUser.handle);
      this.api.session.user = updatedUserInfo.user;

      this.setState({
        error: "",
        password1: "",
        password2: "",
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }

    this.setState({
      isUpdatingAccount: false,
    });
  }

  @autobind
  private async purgeTweets() {
    this.setState({
      isPurging: true,
    });

    await this.api.purgeTweets();

    this.setState({
      didPurge: true,
      isPurging: false,
    });
  }

  public render() {
    return (
      <Site history={this.props.history} match={this.props.match}>
        <Segment>
          <h1>Account <span className="muted text">@{this.api.session.loggedInUser.handle}</span></h1>

          <MessageBox error message={this.state.error} />

          <Form onSubmit={this.updateAccount} enctype="multipart/form-data">
            <Form.Field>
              <label>Change your handle</label>
              <div className="ui fluid labeled input">
                <div className="ui label">@</div>
                <input type="text" onChange={this.inputHandle} value={this.state.handle} />
              </div>
            </Form.Field>

            <Form.Field>
              <label>Change your name</label>
              <div className="ui fluid labeled input">
                <div className="ui icon label">
                  <i className="user icon" />
                </div>
                <input type="text" onChange={this.inputName} value={this.state.name} />
              </div>
            </Form.Field>

            <Form.Field>
              <label>Update your profile picture</label>
              <div className="ui fluid labeled input">
                <div className="ui icon label">
                  <i className="photo icon" />
                </div>
                <input type="file" onChange={this.uploadFile} />
              </div>
            </Form.Field>

            <Divider hidden />

            <Form.Field>
              <label>New password</label>
              <div className="ui fluid labeled input">
                <div className="ui icon label">
                  <i className="lock icon" />
                </div>
                <input type="password" onChange={this.inputPassword1} value={this.state.password1} />
              </div>
            </Form.Field>

            <Form.Field>
              <label>Confirm your new password</label>
              <div className="ui fluid labeled input">
                <div className="ui icon label">
                  <i className="lock icon" />
                </div>
                <input type="password" onChange={this.inputPassword2} value={this.state.password2} />
              </div>
            </Form.Field>

            <Divider hidden />

            <Button fluid loading={this.state.isUpdatingAccount} color="green">Update account information</Button>
          </Form>
        </Segment>

        <Divider hidden />

        <Segment>
          <h2>Purge timeline</h2>

          <Message warning>
            <b>Warning:</b>
            This will permanentely remove your tweets. Proceed with caution!
          </Message>

          <Button fluid loading={this.state.isPurging} disabled={this.state.didPurge} color="grey" onClick={this.purgeTweets}>Delete all my tweets</Button>
        </Segment>
      </Site>
    );
  }
}
