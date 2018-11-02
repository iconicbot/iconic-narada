import QuickReplyFactory from './QuickReplyFactory';

class QuickReply extends QuickReplyFactory {
  /**
   * Create text Quick Reply for Facebook Send API Messaging
   * @param {string} title 20
   * @param {string} payload 1000
   * @param {string} imageUrl
   */
  constructor(title = null, payload = null, imageUrl = null) {
    super('text', title, payload, imageUrl);
  }
}

export default QuickReply;
