import QuickReplyOption from './QuickReplyOption';

class QuickReply extends QuickReplyOption {
  /**
   * Create a quick reply option
   * @param {string} label The text label displayed on the button face. Label text is returned as the user’s message response. String, max length of 36 characters including spaces. Values with URLs are not allowed and will return an error.
   * @param {string} description Optional description text displayed under label text. All options must have this property defined if property is present in any option. Text is auto-wrapped and will display on a max of two lines and supports n for controling line breaks. Description text is not include in the user’s message response. String, max length of 72 characters including spaces.
   * @param {string} metadata Metadata that will be sent back in the webhook request. String, max length of 1,000 characters including spaces.
   */
  constructor(label, description = null, metadata = null) {
    super(label, description, metadata);
  }
}

export default QuickReply;
