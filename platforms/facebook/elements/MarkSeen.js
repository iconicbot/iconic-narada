import SenderAction from './SenderAction';

class MarkSeen extends SenderAction {
  /**
   * Create mark_seen Sender Action for Facebook Send API Messaging
   * @param {string} recipientId
   */
  constructor(recipientId) {
    super(recipientId, 'mark_seen');
  }
}

export default MarkSeen;
