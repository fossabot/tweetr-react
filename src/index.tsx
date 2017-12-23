import * as React from "react";
import * as ReactDOM from "react-dom";

import { Api } from "./api";
import { Tweetr } from "./components/tweetr";

const api = new Api();

(async () => {
  // ping the server so heroku has some time to boot up
  await api.ping();

  console.log("tweetr api is reachable now");
})();

ReactDOM.render((
  <Tweetr />
), document.getElementById("app"));
