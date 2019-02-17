import Logger from '../../../logger';
import Messaging from './Messaging';

require('dotenv').config();

const logger = Logger(process.env)(module);

class SenderAction extends Messaging {
  /**
   * Create Sender Action for Facebook Send API Messaging
   * @param {string} recipientId
   * @param {string} senderAction
   */
  constructor(recipientId, senderAction) {
    if (typeof (senderAction) !== 'string') {
      logger.debug('Invalid sender_action', senderAction);
      // throw error
    }
    super(recipientId, senderAction);
  }
}

export default SenderAction;
