import QuickReplyOptions from './QuickReplyOptions';
import Buttons from './Buttons';
import Attachment from './Attachment';

class MessageData {
  /**
   *
   * @param {string} text
   * @param {array} quickReplies
   * @param {array} buttons
   * @param {string} attachment
   */
  constructor(text = null, quickReplies = null, buttons = null, attachment = null) {
    if (text) {
      this.text = text;
    }
    if (quickReplies) {
      this.quickReplies = new QuickReplyOptions(quickReplies);
    }
    if (buttons) {
      this.buttons = new Buttons(buttons);
    }
    if (attachment) {
      this.attachment = new Attachment(attachment);
    }
    return this.toJSON();
  }

  toJSON() {
    const message = {};
    if (this.text) {
      message.text = this.text;
    }
    if (this.quickReplies) {
      message.quick_reply = this.quickReplies;
    }
    if (this.buttons) {
      message.ctas = this.buttons;
    }
    if (this.attachment) {
      message.attachment = this.attachment;
    }
    return message;
  }
}

export default MessageData;
