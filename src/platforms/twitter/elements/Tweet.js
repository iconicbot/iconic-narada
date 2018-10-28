import Logger from '../../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);

class Tweet {
  /**
   * Create a tweet
   * @param {string} status 280
   * @param {string} inReplyToStatusId
   */
  constructor(status, inReplyToStatusId = null) {
    if (status) {
      this.status = status;
    } else {
      logger.debug('Status is required.', status);
      // throw error
    }
    if (inReplyToStatusId) {
      this.inReplyToStatusId = inReplyToStatusId;
    }

    return this.toJSON();
  }

  toJSON() {
    const tweet = {};
    if (this.status) {
      tweet.status = this.status;
    }
    if (this.inReplyToStatusId) {
      tweet.in_reply_to_status_id = this.inReplyToStatusId;
    }
    return tweet;
  }
}

export default Tweet;
