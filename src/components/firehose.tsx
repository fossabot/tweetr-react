import autobind from "autobind-decorator";
import * as React from "react";
import { Loader } from "semantic-ui-react";

import {
  Api,
  Tweet as TweetModel,
} from "../api";

import { Compose } from "./compose";
import { RoutedComponentProperties } from "./index";
import { Site } from "./site";

import {
  Tweet,
  TweetDeleteMode,
} from "./tweet";

interface FirehoseState {
  isLoadingTweets: boolean;
  tweets: TweetModel[];
}

export class Firehose extends React.Component<RoutedComponentProperties, FirehoseState> {
  private api: Api;

  constructor(props: RoutedComponentProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      isLoadingTweets: false,
      tweets: [],
    };
  }

  public async componentWillMount() {
    this.setState({
      isLoadingTweets: true,
    });

    const response = await this.api.firehose();

    this.setState({
      isLoadingTweets: false,
      tweets: response.tweets,
    });
  }

  public render() {
    const tweets = this.state.tweets.map((t) => (
      <Tweet
        tweet={t}
        deleteMode={TweetDeleteMode.None}
      />
    ));

    return (
      <Site history={this.props.history}>
        <Loader active={this.state.isLoadingTweets}>Loading tweets</Loader>
        {tweets}
      </Site>
    );
  }
}
