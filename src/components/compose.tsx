import autobind from "autobind-decorator";
import * as React from "react";

import {
  Button,
  Form,
  Grid,
  GridColumn,
  Label,
  Segment,
  TextArea,
} from "semantic-ui-react";

import {
  Api,
  Tweet,
  User,
} from "../api";

import { MessageBox } from "./messagebox";
import { Person } from "./person";

interface ComposeProperties {
  onTweetCreated(tweet: Tweet) : void;
}

interface ComposeState {
  error: string;
  isCreating: boolean;
  message: string;
  image?: File;
}

export class Compose extends React.Component<ComposeProperties, ComposeState> {
  private readonly api: Api;
  private imageInput: HTMLInputElement;

  constructor(props: ComposeProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      error: "",
      isCreating: false,
      message: "",
    };
  }

  private beginApiCall() {
    this.setState({
      isCreating: true,
    });
  }

  private resetForm() {
    this.setState({
      image: undefined,
      message: "",
    });

    this.imageInput.value = "";
  }

  private endApiCall() {
    this.resetForm();
    this.setState({
      isCreating: false,
    });
  }

  @autobind
  private async createTweet() {
    this.beginApiCall();

    const response = await this.api.createTweet(this.state.message, this.state.image);

    if (response.message) {
      this.setState({
        error: response.message,
      });
    } else {
      this.props.onTweetCreated(response.tweet);
    }

    this.endApiCall();
  }

  @autobind
  private inputMessage(event: any) {
    this.setState({
      message: event.target.value,
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

  public render() {
    return (
      <Segment className="tweet">
        <MessageBox error message={this.state.error} />
        <Person user={this.api.session.loggedInUser} />

        <Form onSubmit={this.createTweet} enctype="multipart/form-data">
          <Form.Field>
            <TextArea attached rows={3} placeholder="What's new?" onChange={this.inputMessage} value={this.state.message} />
            <Label attached="bottom right" basic>{this.state.message.length} / 140</Label>
          </Form.Field>

          <Grid>
            <GridColumn width="12">
              <input type="file" onChange={this.uploadFile} ref={(element: HTMLInputElement) => this.imageInput = element} />
            </GridColumn>
            <GridColumn width="4">
              <Button fluid color="green" loading={this.state.isCreating}>
                Tweet
              </Button>
            </GridColumn>
          </Grid>
        </Form>
      </Segment>
    );
  }
}
