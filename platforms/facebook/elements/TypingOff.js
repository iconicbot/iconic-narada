import SenderAction from './SenderAction';

class TypingOff extends SenderAction {
  /**
   * Create typing_off Sender Action for Facebook Send API Messaging
   * @param {string} recipientId
   */
  constructor(recipientId) {
    super(recipientId, 'typing_off');
  }
}

export default TypingOff;
