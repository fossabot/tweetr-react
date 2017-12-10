import * as React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Grid,
  GridColumn,
} from "semantic-ui-react";

export class Landing extends React.Component {
  public render() {
    return (
      <div className="landing">
        <div className="jumbotron">
          <div className="content">
            <img src="//tweetr-us-west-1.herokuapp.com/logo.png" />
            connects
            <br />
            the universe

            <div className="join">
              Enter the revolution.

              <Link to="/login">
                <Button color="green">Join now</Button>
              </Link>
            </div>
          </div>
        </div>

        <Container>
          <Grid stackable>
            <GridColumn width="4">
              <h1>What is <img src="//tweetr-us-west-1.herokuapp.com/logo.png" /> ?</h1>
              <p>tweetr is the final assessment of the node.js course at OTH Regensburg by Eamonn de Leastar. You can read about the requirements in <a href="https://wit-oth-regensburg-2017-dmas.github.io/topic-00-intro/talk-1-assessment/assignment-1.pdf" target="_blank">this pdf</a>.</p>
              <p>The project should allow users to tweet text or image messages and follow other users, similar to Twitter.</p>
            </GridColumn>

            <GridColumn width="2" />

            <GridColumn width="4">
              <h1>Technologies</h1>
              <p>tweetr was mainly built using <a href="https://github.com/hapijs" target="_blank">hapi</a>, <a href="https://cloudinary.com" target="_blank">Cloudinary</a>, <a href="https://mlab.com" target="_blank">mLab's hosted MongoDB servers</a> and <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a>.</p>
              <p>You can check out tweetr's source code on <a href="https://github.com/michaelneu/tweetr" target="_blank">GitHub</a>, as it's released under the <a href="https://github.com/michaelneu/tweetr/blob/master/LICENSE" target="_blank">MIT license</a>.</p>
            </GridColumn>

            <GridColumn width="2" />

            <GridColumn width="4">
              <h1>Credits</h1>
              <p>Most images, logos, designs and technical effects are open source resources from other people. Please see the README on <a href="https://github.com/michaelneu/tweetr" target="_blank">GitHub</a> for further information.</p>
              <p>The title image was provided by Max McKinnon on <a href="https://unsplash.com/photos/c9OCWLka764" target="_blank">Unsplash</a>.</p>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }
}
