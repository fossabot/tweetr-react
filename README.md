# tweetr-react

[![Build Status](https://travis-ci.org/michaelneu/tweetr-react.svg?branch=master)](https://travis-ci.org/michaelneu/tweetr-react)
[![GitHub license](https://img.shields.io/github/license/michaelneu/tweetr-react.svg)](https://github.com/michaelneu/tweetr-react/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/michaelneu/tweetr-react.svg)](https://github.com/michaelneu/tweetr-react)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmichaelneu%2Ftweetr-react.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmichaelneu%2Ftweetr-react?ref=badge_shield)

tweetr-react is a React frontend to the [tweetr](https://github.com/michaelneu/tweetr) api, a small Twitter-like application for the node.js webdev course at the OTH Regensburg by [Eamonn de Leastar](https://github.com/edeleastar).

Users can sign up, login and start tweeting text and images. Tweets can be viewed in a global timeline called "firehose", and in a customized feed, which displays all tweets created by people a user follows. Furthermore, admin users exist, which are able to add and remove any user and tweet.

tweetr-react is currently auto-deployed to [GitHub pages](https://michaelneu.github.io/tweetr-react/) using [Travis CI](https://travis-ci.org/michaelneu/tweetr-react) and, as mentioned, purely educational.

## Usage

tweetr-react is mainly built with TypeScript, so you'll need to install all dependencies first before you can build the page:

```bash
$ yarn install
```

After that, you can start a local dev-server or build a deployable bundle:

```bash
$ yarn start   # dev-server
$ yarn build   # bundle
```


## License

tweetr-react is released under the [MIT license](LICENSE).


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmichaelneu%2Ftweetr-react.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmichaelneu%2Ftweetr-react?ref=badge_large)