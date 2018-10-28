import MessageData from './MessageData';

class Image extends MessageData {
  /**
   * Create an image message with quick replies and buttons
   * @param {string} mediaId
   * @param {array} quickReplies
   * @param {array} buttons
   */
  constructor(mediaId, quickReplies = null, buttons = null) {
    super(null, quickReplies, buttons, mediaId);
  }
}

export default Image;
