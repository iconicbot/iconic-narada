import SenderAction from './SenderAction';

class TypingOn extends SenderAction {
  /**
   * Create typing_on Sender Action for Facebook Send API Messaging
   * @param {string} recipientId
   */
  constructor(recipientId) {
    super(recipientId, 'typing_on');
  }
}

export default TypingOn;
