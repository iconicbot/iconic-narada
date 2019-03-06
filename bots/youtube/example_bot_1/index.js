/* eslint no-await-in-loop: 0, no-restricted-syntax: 0 */
import Logger from '../../../logger';
import * as botConfig from './config.json';
import YoutubeConnector from '../../../platforms/youtube/connector';

require('dotenv').config();

const logger = Logger(process.env)(module);

class Bot {
  constructor() {
    this.ytConnector = new YoutubeConnector(botConfig);
  }

  /*
* * Process Events method receives the event from youtube controller.
* @param {json} event
* Event object has videoId, commentId, comment and type.
*/
  async processEvents(event) {
    // take action based on event type
    switch (event.type) {
      case 'list_comment':
        this.processListComment(event);
        break;
      case 'add_comment':
        this.processAddComment(event);
        break;
      case 'reply_comment':
        this.processReplyComment(event);
        break;
      case 'delete_comment':
        this.processDeleteComment(event);
        break;
      default:
        logger.debug(`No action specified for event type: ${event.type}`);
    }
  }

  // fetches the list of comments
  async processListComment(event) {
    this.ytConnector.commentsList(event.videoId).then((data) => {
      data.data.items.forEach((element) => {
        console.log(element.snippet);
      });
    });
  }

  // Inserts a new toplevel comment
  async processAddComment(event) {
    this.ytConnector.commentInsert(event.videoId, event.comment).catch(err => logger.error(err));
  }

  // Adds a reply to an existing comment
  async processReplyComment(event) {
    this.ytConnector.commentReply(event.commentId, event.comment).catch(err => logger.error(err));
  }

  // removes a comment
  async processDeleteComment(event) {
    this.ytConnector.commentDelete(event.commentId).catch(err => logger.error(err));
  }

 
}

export default Bot;
