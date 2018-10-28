import MessageData from './MessageData';

class Video extends MessageData {
  /**
   * Create a video message with quick replies and buttons
   * @param {string} mediaId
   * @param {array} quickReplies
   * @param {array} buttons
   */
  constructor(mediaId, quickReplies = null, buttons = null) {
    super(null, quickReplies, buttons, mediaId);
  }
}

export default Video;
