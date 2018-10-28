class Comment {
  /**
   *
   * @param {string} message
   */
  constructor(message = null) {
    if (message) {
      this.message = message;
    }
    return this.toJSON();
  }

  toJSON() {
    const comment = {};
    if (this.message) {
      comment.message = this.message;
    }
    return comment;
  }
}

export default Comment;
