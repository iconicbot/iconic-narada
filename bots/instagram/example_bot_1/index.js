/* eslint no-await-in-loop: 0, no-restricted-syntax: 0 */
import Logger from '../../../logger';
import * as botConfig from './config.json';
import InstagramConnector from '../../../platforms/instagram/connector';
import * as InstagramElements from '../../../platforms/instagram/elements';

require('dotenv').config();

const logger = Logger(process.env)(module);

class Bot {
  constructor() {
    this.instagramConnector = new InstagramConnector(botConfig.ACCESS_TOKEN);
  }

  /**
   * Process Events method receives the event from instagram controller.
   * @param {json} event
   * Event object has recipientId, senderId, type and payload.
   * recipientId is the ID of page which received the event.
   * senderId is the ID of user who sent the event.
   * type is a label assigned by parser.
   * payload is the original raw event with all properties.
   */
  async processEvents(event) {
    // take action based on event type
    switch (event.type) {
      case 'message':
      case 'messaging_postback':
        this.processMessage(event);
        break;
      case 'feed_comment_add':
        this.processComment(event);
        break;
      default:
        logger.debug(`No action specified for event type: ${event.type}`);
    }
  }

  async processMessage(event) {
    // get user profile to use name in the message.
    const recipientId = event.senderId;
    const userProfile = await this.getUserProfile(recipientId);

    // create a plain text message
    const message = new InstagramElements.Text(`Hello ${userProfile.first_name}!`);

    // set the array of messages to be sent
    const replies = [
      // new InstagramElements.MarkSeen(recipientId),
      // new InstagramElements.TypingOn(recipientId),
      new InstagramElements.Reply(recipientId, message),
      new InstagramElements.Reply(recipientId, 'What\'s up?'),
      // new InstagramElements.TypingOff(recipientId),
    ];
    // send each reply in sequence
    for (const reply of replies) {
      await this.instagramConnector.sendMessage(botConfig.PAGE_ID, reply)
        .catch(err => logger.error(err));
    }
  }

  async processComment(event) {
    // get user profile to use name in the message.
    const userProfile = await this.getUserProfile(event.senderId);

    const commentId = event.payload.comment_id;
    if (event.senderId.toString() !== botConfig.PAGE_ID) {
      // send private reply
      const reply = new InstagramElements.PrivateReply(`Hello ${userProfile.name}!`);
      await this.instagramConnector.sendPrivateReply(commentId, reply)
        .catch(err => logger.error(err));

      // OR add comment
      const commentReply = new InstagramElements.Comment(`Hello ${userProfile.name}!`);
      await this.instagramConnector.addComment(commentId, commentReply)
        .catch(err => logger.error(err));
    }
  }

  /**
   * Get User profile from User ID
   * @param {string} userId
   */
  getUserProfile(userId) {
    return new Promise(async (resolve) => {
      const userProfile = await this.instagramConnector.getUserProfile(userId)
        .catch(err => logger.debug(err));
      resolve(userProfile);
    });
  }
}

export default Bot;
