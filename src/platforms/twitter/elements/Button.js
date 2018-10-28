class Button {
  /**
   * Create quick_reply option object
   * @param {string} type Defines the type of button to display. Currently must be set to web_url.
   * @param {string} label The text that will be displayed to the user on each button. Max string length of 36 characters.
   * @param {string} url A valid http or https target URL of the button.
   * @param {string} tcoUrl (read only) The t.co version of the URL will be returned in a POST response and on the read path (GET requests) only.
   * https://developer.twitter.com/en/docs/direct-messages/buttons/api-reference/buttons
   */
  constructor(type, label, url, tcoUrl = null) {
    this.type = type;
    this.label = label;
    this.url = url;
    if (tcoUrl) {
      this.tcoUrl = tcoUrl;
    }
    return this.toJSON();
  }

  toJSON() {
    const cta = {
      type: this.type,
      label: this.label,
      url: this.url,
    };
    if (this.tcoUrl) {
      cta.tco_url = this.tcoUrl;
    }
    return cta;
  }
}

export default Button;
