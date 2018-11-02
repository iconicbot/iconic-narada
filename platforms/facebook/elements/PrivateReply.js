class PrivateReply {
  /**
   *
   * @param {string} message 2000
   */
  constructor(message = null) {
    if (message) {
      this.message = message;
    }
    return this.toJSON();
  }

  toJSON() {
    const privateReplyText = {};
    if (this.message) {
      privateReplyText.message = this.message;
    }

    return privateReplyText;
  }
}

export default PrivateReply;
