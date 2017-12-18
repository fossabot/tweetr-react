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

interface TweetsState {
  isLoadingTweets: boolean;
  tweets: TweetModel[];
}

export class Tweets extends React.Component<RoutedComponentProperties, TweetsState> {
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

    const response = await this.api.allTweets();

    this.setState({
      isLoadingTweets: false,
      tweets: response.tweets,
    });
  }

  @autobind
  private addTweet(tweet: TweetModel) {
    const tweets = this.state.tweets;

    tweets.unshift(tweet);

    this.setState({
      tweets,
    });
  }

  @autobind
  private async deleteTweet(tweet: TweetModel) {
    await this.api.deleteTweet(tweet);

    this.setState({
      tweets: this.state
                  .tweets
                  .filter((t) => t._id !== tweet._id),
    });
  }

  public render() {
    const tweets = this.state.tweets.map((t) => (
      <Tweet
        tweet={t}
        deleteMode={TweetDeleteMode.Single}
        onDelete={() => this.deleteTweet(t)}
      />
    ));

    return (
      <Site history={this.props.history}>
        <Compose onTweetCreated={this.addTweet} />

        <Loader active={this.state.isLoadingTweets}>Loading tweets</Loader>
        {tweets}
      </Site>
    );
  }
}
