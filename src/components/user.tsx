import autobind from "autobind-decorator";
import * as React from "react";

import {
  Accordion,
  AccordionTitleProps,
  Divider,
  Grid,
  GridColumn,
  Icon,
  Input,
  Loader,
  Segment,
} from "semantic-ui-react";

import {
  Api,
  Tweet as TweetModel,
  User as UserModel,
} from "../api";

import { FollowButton } from "./follow-button";
import { RoutedComponentProperties } from "./index";
import { Person } from "./person";
import { Site } from "./site";

import {
  Tweet,
  TweetDeleteMode,
} from "./tweet";

import {
  SocialGraph,
  SocialGraphDescription,
} from "./social-graph";

interface UsersRouteMatch {
  handle?: string;
}

type UserProperties = RoutedComponentProperties<UsersRouteMatch>;

interface UserState {
  profileSectionIndex: number;
  user?: UserModel;
  graph?: SocialGraphDescription;
  tweets?: TweetModel[];
}

export class User extends React.Component<UserProperties, UserState> {
  private readonly api: Api;

  constructor(props: UserProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      profileSectionIndex: 0,
      user: undefined,
    };
  }

  public async componentWillMount() {
    const response = await this.api.viewUser(this.props.match.params.handle as string);

    this.setState({
      graph: response.socialGraph,
      tweets: response.tweets,
      user: response.user,
    });
  }

  @autobind
  private clickProfileSection(event: any, titleProperties: AccordionTitleProps) {
    const index = titleProperties.index as number;

    if (index === this.state.profileSectionIndex) {
      this.setState({
        profileSectionIndex: -1,
      });
    } else {
      this.setState({
        profileSectionIndex: index,
      });
    }
  }

  @autobind
  private async updateGraph() {
    const response = await this.api.viewUser(this.props.match.params.handle as string);

    this.setState({
      graph: response.socialGraph,
    });
  }

  public render() {
    let user = (<></>);

    if (this.state.user) {
      const follows = this.state
                          .user
                          .follows
                          .map((u) => (<Person user={u} />));

      const tweets = (this.state
                          .tweets as TweetModel[])
                          .map((t) => (<Tweet tweet={t} deleteMode={TweetDeleteMode.None} />));

      user = (
        <>
          <Segment className="user">
            <div className="header">
              <img src={this.state.user.imageUrl} />
            </div>

            <Grid>
              <GridColumn width="12">
                <h1>{this.state.user.name}</h1>
                <div className="muted text">@{this.state.user.handle}</div>
              </GridColumn>
              <GridColumn width="4">
                <FollowButton user={this.api.session.loggedInUser} target={this.state.user} onFollowingChanged={this.updateGraph} />
              </GridColumn>
            </Grid>

            <Accordion>
              <Accordion.Title active={this.state.profileSectionIndex === 0} index={0} onClick={this.clickProfileSection} className="ui horizontal divider">
                <Icon name="dropdown" />
                Social graph
              </Accordion.Title>
              <Accordion.Content active={this.state.profileSectionIndex === 0}>
                <SocialGraph graph={this.state.graph as SocialGraphDescription} />
              </Accordion.Content>

              <Accordion.Title active={this.state.profileSectionIndex === 1} index={1} onClick={this.clickProfileSection} className="ui horizontal divider">
                <Icon name="dropdown" />
                Follows
              </Accordion.Title>
              <Accordion.Content active={this.state.profileSectionIndex === 1}>
                {follows}
              </Accordion.Content>
            </Accordion>
          </Segment>

          <Divider hidden />

          {tweets}
        </>
      );
    }

    return (
      <Site history={this.props.history} match={this.props.match}>
        {user}

        <Loader active={!this.state.user}>Loading user</Loader>
      </Site>
    );
  }
}
