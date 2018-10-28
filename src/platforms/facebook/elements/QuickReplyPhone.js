import QuickReplyFactory from './QuickReplyFactory';

class QuickReplyPhone extends QuickReplyFactory {
  /**
   * Create user_phone_number Quick Reply for Facebook Send API Messaging
   */
  constructor() {
    super('user_phone_number');
  }
}

export default QuickReplyPhone;
