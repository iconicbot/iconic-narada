class QuickReplyOptions {
  /**
   * Create a quick_reply object
   * @param {array} options array of upto 20 QuickReplyOption objects
   * https://developer.twitter.com/en/docs/direct-messages/quick-replies/api-reference/options
   */
  constructor(options) {
    if (!Array.isArray(options)) {
      this.options = [options];
    } else {
      this.options = options;
    }
    return this.quickReplies;
  }

  toJSON() {
    const quickReplies = {
      type: 'options',
      options: this.options,
    };
    return quickReplies;
  }
}

export default QuickReplyOptions;
