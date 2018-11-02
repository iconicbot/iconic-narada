import Message from './Message';

class Text extends Message {
  /**
   * Create a text message with quick replies
   * @param {string} text 2000
   * @param {array} quickReplies
   * @param {string} metadata
   */
  constructor(text, quickReplies = null, metadata = null) {
    super(text, null, quickReplies, metadata);
  }
}

export default Text;
