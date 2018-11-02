import QuickReplyFactory from './QuickReplyFactory';

class QuickReplyLocation extends QuickReplyFactory {
  /**
   * Create location Quick Reply for Facebook Send API Messaging
   */
  constructor() {
    super('location');
  }
}

export default QuickReplyLocation;
