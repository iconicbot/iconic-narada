class Buttons {
  /**
   * Create a ctas object
   * @param {array} ctas array of upto 3 CTA buttons
   * https://developer.twitter.com/en/docs/direct-messages/buttons/api-reference/buttons
   */
  constructor(ctas) {
    if (!Array.isArray(ctas)) {
      this.ctas = [ctas];
    } else {
      this.ctas = ctas;
    }
    // check number of elements
    return this.toJSON();
  }

  toJSON() {
    return this.ctas;
  }
}

export default Buttons;
