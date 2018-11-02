import Event from './Event';
import Text from './Text';

class Reply extends Event {
  constructor(recipientId, messageData) {
    let messageDataAssign = messageData;
    if (typeof (messageData) === 'string') {
      messageDataAssign = new Text(messageData);
    }
    super(recipientId, messageDataAssign);
  }
}

export default Reply;
