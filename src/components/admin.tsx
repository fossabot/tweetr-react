import autobind from "autobind-decorator";
import * as React from "react";

import {
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  GridColumn,
  Loader,
  Segment,
  Statistic,
} from "semantic-ui-react";

import {
  Api,
  Tweet as TweetModel,
  User as UserModel,
  UserRole,
} from "../api";

import { RoutedComponentProperties } from "./index";
import { Navbar } from "./navbar";
import { Person } from "./person";
import { SignupForm } from "./signup-form";

import {
  Tweet,
  TweetDeleteMode,
} from "./tweet";

interface SelectableTweet extends TweetModel {
  selected: boolean;
}

interface AdminState {
  people: UserModel[];
  tweets: SelectableTweet[];
  isChangingRole: boolean;
  isDeletingTweets: boolean;
  isPreparing: boolean;
  isRemovingUser: boolean;
}

export class Admin extends React.Component<RoutedComponentProperties, AdminState> {
  private readonly api: Api;

  constructor(props: RoutedComponentProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      isChangingRole: false,
      isDeletingTweets: false,
      isPreparing: true,
      isRemovingUser: false,
      people: [],
      tweets: [],
    };
  }

  public async componentWillMount() {
    const { tweets } = await this.api.firehose(),
          { users } = await this.api.allUsers();

    this.setState({
      isPreparing: false,
      people: users,
      tweets: tweets.map((t) => ({
        ...t,
        selected: false,
      })),
    });
  }

  @autobind
  private async deleteTweets() {
    this.setState({
      isDeletingTweets: true,
    });

    const tweets = this.state.tweets.filter((t) => t.selected);

    if (tweets.length > 0) {
      await this.api.deleteTweets(tweets);

      this.setState({
        tweets: this.state.tweets.filter((t) => !t.selected),
      });
    }

    this.setState({
      isDeletingTweets: false,
    });
  }

  @autobind
  private async toggleAdmin(user: UserModel) {
    this.setState({
      isChangingRole: true,
    });

    try {
      if (user.role === UserRole.User) {
        await this.api.promoteToAdmin(user);
        user.role = UserRole.Admin;
      } else {
        await this.api.degradeToUser(user);
        user.role = UserRole.User;
      }
    } catch {
      // ignore the error
    }

    this.setState({
      isChangingRole: false,
    });
  }

  @autobind
  private async userAdded(user: UserModel) {
    const people = this.state.people;

    people.push(user);

    this.setState({
      people,
    });
  }

  @autobind
  private async removeUser(user: UserModel) {
    await this.api.removeUser(user);

    this.setState({
      people: this.state.people.filter((u) => u.handle !== user.handle),
    });
  }

  public render() {
    const tweets = this.state
                       .tweets
                       .map((t) => (<Tweet tweet={t} deleteMode={TweetDeleteMode.Multiple} onSelectChanged={(selected) => t.selected = selected}/>)),
          users = this.state
                      .people
                      .map((u) => {
                        let modifiers = (<div />);

                        if (u.handle !== this.api.session.loggedInUser.handle) {
                          modifiers = (
                            <>
                              <GridColumn width="4">
                                <Checkbox disabled={this.state.isChangingRole} onChange={(event) => this.toggleAdmin(u)} toggle checked={u.role === UserRole.Admin} />
                              </GridColumn>

                              <GridColumn width="4">
                                <Button color="red" loading={this.state.isRemovingUser} onClick={() => this.removeUser(u)}>Remove</Button>
                              </GridColumn>
                            </>
                          );
                        }

                        return (
                          <Grid>
                            <GridColumn width="8">
                              <Person user={u} />
                            </GridColumn>

                            {modifiers}
                          </Grid>
                        );
                      });

    if (this.state.isPreparing) {
      return (
        <>
          <Navbar history={this.props.history} match={this.props.match} />
          <Loader active={this.state.isPreparing} content="Preparing dashboard" />
        </>
      );
    }

    return (
      <>
        <Navbar history={this.props.history} match={this.props.match} />

        <Container>
          <Grid stackable>
            <GridColumn width="1" />

            <GridColumn width="6">
              <Segment>
                <h1>Tweets <Button className="pull right" color="red" loading={this.state.isDeletingTweets} onClick={this.deleteTweets}>Delete checked tweets</Button></h1>
              </Segment>

              {tweets}
            </GridColumn>

            <GridColumn width="8">
              <Segment>
                <h1>Statistics</h1>

                <Grid stackable>
                  <GridColumn width="4">
                    <Statistic>
                      <Statistic.Value>{this.state.people.length}</Statistic.Value>
                      <Statistic.Label>Users</Statistic.Label>
                    </Statistic>
                  </GridColumn>

                  <GridColumn width="4">
                    <Statistic>
                      <Statistic.Value>{this.state.tweets.length}</Statistic.Value>
                      <Statistic.Label>Tweets</Statistic.Label>
                    </Statistic>
                  </GridColumn>

                  <GridColumn width="4">
                    <Statistic>
                      <Statistic.Value>{Math.ceil(this.state.tweets.filter((t) => t.imageUrl).length / this.state.tweets.length * 100)}%</Statistic.Value>
                      <Statistic.Label>Image tweets</Statistic.Label>
                    </Statistic>
                  </GridColumn>
                </Grid>
              </Segment>

              <Divider hidden />

              <Segment>
                <h1>Add user</h1>
                <SignupForm onSignup={this.userAdded} />
              </Segment>

              <Divider hidden />

              <Segment>
                <h1>Users</h1>

                {users}
              </Segment>
            </GridColumn>
          </Grid>
        </Container>
      </>
    );
  }
}
