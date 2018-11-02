import Logger from '../../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);

class Message {
  /**
   * Message
   * @param {string} text 2000
   * @param {object} attachment
   * @param {array} quickReplies
   * @param {string} metadata 1000
   */
  constructor(text = null, attachment = null, quickReplies = null, metadata = null) {
    if (text) {
      this.text = text;
    } else if (attachment) {
      this.attachment = attachment;
    } else {
      logger.debug('Text or attachment is required.', text, attachment);
      // throw error
    }

    if (quickReplies) {
      // if only one quick reply is sent convert it to array
      if (!Array.isArray(quickReplies)) {
        this.quickReplies = [quickReplies];
      } else {
        // validate number of elements in quickReplies
        this.quickReplies = quickReplies;
      }
    }
    if (metadata) {
      this.metadata = metadata;
    }
    return this.toJSON();
  }

  toJSON() {
    const message = {};
    if (this.text) {
      message.text = this.text;
    }
    if (this.attachment) {
      message.attachment = this.attachment;
    }
    if (this.quickReplies) {
      message.quick_replies = this.quickReplies;
    }
    if (this.metadata) {
      message.metadata = this.metadata;
    }

    return message;
  }
}

export default Message;
