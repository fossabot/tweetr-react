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
import { Tweet } from "./tweet";

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

  public render() {
    const tweets = this.state.tweets.map((t) => {
      let image = (<div />);

      if (t.imageUrl) {
        image = (<img src={t.imageUrl} />);
      }

      return (
        <Tweet user={t.user}>
          <p>{t.message}</p>

          {image}
        </Tweet>
      );
    });

    return (
      <Site history={this.props.history}>
        <Compose onTweetCreated={this.addTweet} />

        <Loader active={this.state.isLoadingTweets}>Loading tweets</Loader>
        {tweets}
      </Site>
    );
  }
}
