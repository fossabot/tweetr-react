import autobind from "autobind-decorator";
import fuzzysearch = require("fuzzysearch");
import * as React from "react";

import {
  Grid,
  GridColumn,
  Input,
  Loader,
  Segment,
} from "semantic-ui-react";

import {
  Api,
  User,
} from "../api";

import { RoutedComponentProperties } from "./index";
import { Person } from "./person";
import { Site } from "./site";

interface UsersState {
  isLoadingUsers: boolean;
  searchQuery: string;
  users: User[];
}

export class Users extends React.Component<RoutedComponentProperties, UsersState> {
  private readonly api: Api;

  constructor(props: RoutedComponentProperties) {
    super(props);

    this.api = new Api();
    this.state = {
      isLoadingUsers: false,
      searchQuery: "",
      users: [],
    };
  }

  public async componentWillMount() {
    this.setState({
      isLoadingUsers: true,
    });

    const response = await this.api.allUsers();

    this.setState({
      isLoadingUsers: false,
      users: response.users,
    });
  }

  @autobind
  private inputSearchQuery(event: any) {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  public render() {
    const users = this.state
                      .users
                      .filter((u) => {
                        const matchesName = fuzzysearch(this.state.searchQuery, u.name),
                              matchesHandle = fuzzysearch(this.state.searchQuery, u.handle);

                        return matchesName || matchesHandle;
                      })
                      .map((u) => (
                        <>
                          <GridColumn width="12">
                            <Person user={u} />
                          </GridColumn>

                          <GridColumn width="4">
                          </GridColumn>
                        </>
                      ));

    return (
      <Site history={this.props.history} match={this.props.match}>
        <Segment>
          <Grid>
            <GridColumn width="6">
              <h1>All users</h1>
            </GridColumn>

            <GridColumn width="10">
              <Input fluid type="text" onChange={this.inputSearchQuery} value={this.state.searchQuery} placeholder="Search user..." />
            </GridColumn>
          </Grid>

          <Grid>{users}</Grid>
        </Segment>

        <Loader active={this.state.isLoadingUsers}>Loading users</Loader>
      </Site>
    );
  }
}
