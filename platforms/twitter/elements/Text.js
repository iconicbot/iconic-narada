import MessageData from './MessageData';

class Text extends MessageData {
  /**
   * Create a text message with quick replies and buttons
   * @param {string} text
   * @param {array} quickReplies
   * @param {array} buttons
   */
  constructor(text, quickReplies = null, buttons = null) {
    super(text, quickReplies, buttons);
  }
}

export default Text;
