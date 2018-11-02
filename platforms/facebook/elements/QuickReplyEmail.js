import QuickReplyFactory from './QuickReplyFactory';

class QuickReplyEmail extends QuickReplyFactory {
  /**
   * Create user_email Quick Reply for Facebook Send API Messaging
   */
  constructor() {
    super('user_email');
  }
}

export default QuickReplyEmail;
