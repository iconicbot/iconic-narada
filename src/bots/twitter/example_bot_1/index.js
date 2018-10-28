/* eslint no-await-in-loop: 0, no-restricted-syntax: 0 */
import Logger from '../../../logger';
import * as botConfig from './config.json';
import TwitterConnector from '../../../platforms/twitter/connector';
import * as TwitterElements from '../../../platforms/twitter/elements';

require('dotenv').config();

const logger = Logger(process.env)(module);

class Bot {
  constructor() {
    botConfig.OAUTH.consumer_key = process.env.TWITTER_CONSUMER_KEY;
    botConfig.OAUTH.consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
    this.twitterConnector = new TwitterConnector(botConfig.OAUTH);
  }

  /**
   * Process Events method receives the event from twitter controller.
   * @param {json} event
   */
  async processEvents(event) {
    // take action based on event type
    switch (event.type) {
      case 'message_create':
        this.handleTwitterMessage(event);
        break;
      case 'favorite_event':
        this.handleTwitterFavorite(event);
        break;
      case 'tweet_create_event':
        this.handleTwitterTweet(event);
        break;
      default:
        logger.debug(`No action specified for event type: ${event.type}`);
    }
  }

  async handleTwitterMessage(event) {
    if (event.senderId.toString() !== botConfig.PAGE_ID) {
      const recipientId = event.senderId;

      // send a plain text
      const message = new TwitterElements.Text(`Hello ${event.senderName}!`);

      // set the array of messages to be sent
      const replies = [
        new TwitterElements.Reply(recipientId, message),
        new TwitterElements.Reply(recipientId, 'What\'s up?'),
      ];

      // send each reply in sequence
      for (const reply of replies) {
        await this.twitterConnector.sendMessage(reply)
          .catch(err => logger.error(err));
      }
    }
  }

  async handleTwitterFavorite(event) {
    if (event.senderId.toString() !== botConfig.PAGE_ID) {
      const designatedTweetId = botConfig.TWITTER_DESIGNATED_TWEET_ID;
      if (event.favoritedStatusId === designatedTweetId) {
        const replyText = `@${event.senderUsername}, Thanks!`;
        const tweet = new TwitterElements.Tweet(replyText, event.favoritedStatusId);
        await this.twitterConnector.postTweet(tweet)
          .catch(err => logger.error(err));
      }
    }
  }

  async handleTwitterTweet(event) {
    if (event.retweetedStatusId) {
      this.handleTwitterRetweet(event);
    }
  }

  async handleTwitterRetweet(event) {
    if (event.senderId.toString() !== botConfig.PAGE_ID) {
      const designatedTweetId = botConfig.TWITTER_DESIGNATED_TWEET_ID;
      if (event.retweetedStatusId === designatedTweetId) {
        const replyText = `@${event.senderUsername}, Thanks!`;
        const tweet = new TwitterElements.Tweet(replyText, event.retweetedStatusId);
        await this.twitterConnector.postTweet(tweet)
          .catch(err => logger.error(err));
      }
    }
  }
}

export default Bot;
