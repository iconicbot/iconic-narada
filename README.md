# Iconic Narada | Social Media/Messaging Webhooks Boilerplate

[![npm version](https://img.shields.io/badge/npm-v6.4.1-blue.svg?style=flat)](https://opensource.org/licenses/MIT) [![node version](https://img.shields.io/badge/node-v8.12.0-blue.svg?style=flat)](https://opensource.org/licenses/MIT) [![build status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/iconicbot/iconic-narada) [![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT) [![join slack channel](https://img.shields.io/badge/slack-join%20channel-brightgreen.svg?style=flat)](https://join.slack.com/t/iconicnarada/shared_invite/enQtNDY0NTQ5OTY4NjQ2LTI1YTgwNGE4NTE2NTcyMmE0NmJlNWZjNmY2NzI5YjRmMTY2NDFiMDVmZjIxNGRmOTRjMzJiNDM2ZmMyYzFiOTQ)

**Iconic Narada**, developer friendly boilerplate to help you connect Social Media/Messaging platforms via Webhooks.

**Supported Platforms:**
* Facebook
* Facebook Messenger
* Twitter
* Twitter Direct
* Youtube

**Why Iconic-Narada?:**
* Developer friendly
* Raw social media request/response objects
* Code from the future (ECMAScript 6 compatible)
* Database of your choice
* Server of your choice (Not specific to AWS lambda)
* Not only for messaging platforms, supports social media too
* Multiple platforms/channels in 1 boilerplate
* Better error handling
* Very low learning curve


![overall-structure](https://user-images.githubusercontent.com/473947/47423594-0d71c100-d7a3-11e8-8562-b41da5707f67.png)

## Installation

Choose one of the following options:

* Install with npm: `npm install iconic-narada`
* To install Iconic Narada from source, first clone the repository and then run: `npm install`.

### Edit config

In app root directory, rename `.sample-env` to `.env`. You can set app wide environment constants here and access them in your code with `dotenv` module and `process.env`.

In each example bot directory, you will find `config.json`. You can set bot specific constants here and access them by importing this file into your bot code. You may also instead retrieve this information from database for additional security.

### Enable/Disable a Platform

Each platform has it's own router, controller, parser, elements and connector. The main router in `routes.js` hands over new received event to the router of specific platform.

![data-and-logic-flow](https://user-images.githubusercontent.com/473947/47423631-2bd7bc80-d7a3-11e8-9631-cbaf3aaef58c.png)

To enable a new platform, import the platform from platforms folder and create a new route for that platform in the main router(routes.js). E.g.: The below code will create a route like - https://your.domain/webhook/facebook

    import facebookRouter from './platforms/facebook/router';

    app.use('/facebook', facebookRouter);

### Run

To start the app without [babel](https://babeljs.io/), run `node app.js`.

To start the app with [babel](https://babeljs.io/), run `node start.js`

## Basic Usage

The business logic of bot is handled in `bots`. Each platform can have it's own configuration which may also be retrieved from database or environment file.

Once a platform is enabled by adding it to routes, the platform specific Controller in `platforms/<platform>/controller.js` parses every new event and hands over the parsed event to `bots/<platform>/index.js`. You can either process the parsed event here or create multiple bots for that platform and redirect the parsed event to respective bot. 

Bots can use Elements from `platforms/<platform>/elements.js` to create JSON objects to form a reply or action and, use Connector from `platforms/<platform>/connector.js` to send the reply or action to platform APIs.

Here are some examples of typical usage:

### Facebook Elements and Connector

#### Importing elements and connector

    import FacebookConnector from '../../../platforms/facebook/connector';
    import * as FacebookElements from '../../../platforms/facebook/elements';

#### Creating a message

Create a plain text message.

    const message = new FacebookElements.Text(`Hello there!`);

For more detailed samples of Facebook Elements, check out [this doc](https://github.com/iconicbot/iconic-narada/docs/Facebook.md).

#### Sending a message

Set the Recipient ID.

Event object contains basic information like senderId, recipientId, etc based on the type of event received.

    const recipientId = event.senderId;

Set a message.

    const message = new FacebookElements.Text(`Hello there!`);

Set the array of replies to be sent.

Reply element method requires a recipient ID and a message. It also accepts a string in place of message object.

    const replies = [
        new FacebookElements.Reply(recipientId, message),
        new FacebookElements.Reply(recipientId, 'What\'s up?'),
    ];

Send each reply in sequence.

    const facebookConnector = new FacebookConnectorACCESS_TOKEN);

    for (const reply of replies) {
        await facebookConnector.sendMessage(botConfig.PAGE_ID, reply)
            .catch(err => logger.error(err));
    }

#### Sending an action.

You can also send an action with/without/before/after a Reply element.

    const replies = [
        new FacebookElements.MarkSeen(recipientId),
        new FacebookElements.TypingOn(recipientId),
        new FacebookElements.TypingOff(recipientId),
    ];

#### Getting user profile.

You can get user profile with getUserProfile method.

    const facebookConnector = new FacebookConnector(ACCESS_TOKEN);
    
    const userProfile = await facebookConnector.getUserProfile(recipientId)
        .catch(err => logger.debug(err));

### Twitter Elements and Connector

#### Importing elements and connector

    import TwitterConnector from '../../../platforms/twitter/connector';
    import * as TwitterElements from '../../../platforms/twitter/elements';

#### Creating a message

Create a plain text message.

    const message = new TwitterElements.Text(`Hi there!`);

For more detailed samples of Twitter Elements, check out [this doc](https://github.com/iconicbot/iconic-narada/docs/Twitter.md).

#### Sending a message.

Set the Recipient ID.

Event object contains basic information like senderId, recipientId, etc based on the type of event received.

    const recipientId = event.senderId;

Set a message.

    const message = new TwitterElements.Text(`Hello there!`);

Create an array of replies to be sent.

Reply element method requires a recipient ID and a message. It also accepts a string in place of message object.

    const replies = [
        new TwitterElements.Reply(recipientId, message),
        new TwitterElements.Reply(recipientId, 'What\'s up?'),
    ];

Send each reply in sequence.

    const twitterConnector = new TwitterConnectorOAUTH);

    for (const reply of replies) {
        await twitterConnector.sendMessage(reply)
          .catch(err => logger.error(err));
    }


### Youtube Connector

#### Importing  connector

    import YoutubeConnector from '../../../platforms/youtube/connector';

#### Generating Access token
    
Follow the instruction [here](https://help.aolonnetwork.com/hc/en-us/articles/218079623-How-to-Create-Your-YouTube-API-Credentials).

#### Fetch list of comments

You can fetch the list of comments for a specific video using the commentsList method.

    const youtubeConnector = new YoutubeConnector(ACCESS_TOKEN);

    youtubeConnector.commentsList(videoId).then((data) => {
      //Process the data
    });

#### Add a new comment

You can add a new comment for a video using the commentInsert method.

    youtubeConnector.commentInsert(videoId, comment).catch(err => logger.error(err));

### Add a reply to a comment

You can add a reply to an existing comment using the commentReply method.

    youtubeConnector.commentReply(commentId, comment).catch(err => logger.error(err));

### Delete a comment

You can remove a comment using the commentDelete method.

     youtubeConnector.commentDelete(commentId).catch(err => logger.error(err));



## Contributing

Contributions are generally appreciated. But we are exclusively looking for contributers to help us extend our support to Slack, Telegram, Instagram, WhatsApp, Skype, Youtube, Viber, Amazon Alexa, Line, Kik & make it a all-in-one open source webhooks boilerplate. 

See the [Contributors' guide](https://github.com/iconicbot/iconic-narada/blob/master/CONTRIBUTING.md) for more information.

## Authors

* [Iconic.wtf](https://iconic.wtf)

## License

The source code of Iconic Narada boilerplate is licensed under [MIT](https://opensource.org/licenses/MIT). 