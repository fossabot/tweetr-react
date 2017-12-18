import * as React from "react";

import {
  Grid,
  GridColumn,
  Icon,
  Segment,
} from "semantic-ui-react";

import { Tweet as TweetModel } from "../api";
import { Person } from "./person";

export enum TweetDeleteMode {
  Single,
  Multiple,
  None,
}

interface TweetProperties {
  tweet: TweetModel;
  deleteMode: TweetDeleteMode;
  onDelete?() : void;
  onSelectChanged?(selected: boolean) : void;
}

export class Tweet extends React.Component<TweetProperties, any> {
  public render() {
    let image = (<div />),
        deleteInteraction = (<div />);

    if (this.props.tweet.imageUrl) {
      image = (<img src={this.props.tweet.imageUrl} />);
    }

    if (this.props.deleteMode === TweetDeleteMode.Single) {
      deleteInteraction = (
        <div className="delete" onClick={this.props.onDelete}>
          <Icon name="remove" />
        </div>
      );
    } else if (this.props.deleteMode === TweetDeleteMode.Multiple) {
      const changeHandler = (event: any) => {
        if (this.props.onSelectChanged) {
          this.props.onSelectChanged(event.target.value);
        }
      };

      deleteInteraction = (
        <input type="checkbox" onChange={changeHandler} />
      );
    }

    return (
      <Segment className="tweet">
        <Grid>
          <GridColumn width="14">
            <Person user={this.props.tweet.user} />
          </GridColumn>

          <GridColumn width="2">
            {deleteInteraction}
          </GridColumn>
        </Grid>

        <p>{this.props.tweet.message}</p>

        {image}
      </Segment>
    );
  }
}
