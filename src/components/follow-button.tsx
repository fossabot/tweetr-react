import autobind from "autobind-decorator";
import * as React from "react";
import { Button } from "semantic-ui-react";

import {
  Api,
  User,
} from "../api";

interface FollowButtonProperties {
  user: User;
  target: User;
  onFollowingChanged?() : void;
}

interface FollowButtonState {
  isExecuting: boolean;
}

export class FollowButton extends React.Component<FollowButtonProperties, FollowButtonState> {
  private readonly api: Api;

  private get followsTarget() : boolean {
    for (const follow of this.props.user.follows) {
      if (follow.handle === this.props.target.handle) {
        return true;
      }
    }

    return false;
  }

  constructor(props: FollowButtonProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      isExecuting: false,
    };
  }

  private beginApiCall() {
    this.setState({
      isExecuting: true,
    });
  }

  private endApiCall() {
    this.setState({
      isExecuting: false,
    });

    if (this.props.onFollowingChanged) {
      this.props.onFollowingChanged();
    }
  }

  @autobind
  private async follow() {
    this.beginApiCall();

    try {
      await this.api.followUser(this.props.target);

      const information = await this.api.viewUser(this.props.target.handle);

      this.props.user.follows.push(information.user);
      this.api.session.user = this.props.user;
    } catch {
      // ignore this as we tried following an invalid handle
    }

    this.endApiCall();
  }

  @autobind
  private async unfollow() {
    this.beginApiCall();

    try {
      await this.api.unfollowUser(this.props.target);

      this.props.user.follows = this.props.user.follows.filter((u) => u.handle !== this.props.target.handle);
      this.api.session.user = this.props.user;
    } catch {
      // ignore this as we tried unfollowing an invalid handle
    }

    this.endApiCall();
  }

  public render() {
    if (this.props.user.handle === this.props.target.handle) {
      return (
        <div />
      );
    } else if (this.followsTarget) {
      return (
        <Button fluid color="grey" loading={this.state.isExecuting} onClick={this.unfollow}>Unfollow</Button>
      );
    } else {
      return (
        <Button fluid color="green" loading={this.state.isExecuting} onClick={this.follow}>Follow</Button>
      );
    }
  }
}
