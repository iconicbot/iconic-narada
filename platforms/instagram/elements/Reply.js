import Messaging from './Messaging';
import Text from './Text';

class Reply extends Messaging {
  /**
   * Create Message for Facebook Send API Messaging
   * @param {string} recipientId
   * @param {object} message
   * @param {string} messagingType (optional)
   * @param {string} notificationType (optional)
   * @param {string} tag (optional)
   */
  constructor(recipientId, message, messagingType = 'RESPONSE', notificationType = 'REGULAR', tag = null) {
    let messageAssign = message;
    if (typeof (message) === 'string') {
      messageAssign = new Text(message);
    }
    super(recipientId, messageAssign, messagingType, notificationType, tag);
  }
}

export default Reply;
