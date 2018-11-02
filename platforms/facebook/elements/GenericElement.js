class GenericElement {
  /**
   * https://developers.facebook.com/docs/messenger-platform/reference/template/generic/
   * @param {string} title The title to display in the template. 80 character limit.
   * @param {string} subtitle Optional. The subtitle to display in the template. 80 character limit.
   * @param {string} imageUrl Optional. The URL of the image to display in the template.
   * @param {array} buttons Optional. An array of buttons to append to the template. A maximum of 3 buttons per element is supported.
   * @param {object} defaultAction Optional. The default action executed when the template is tapped. Accepts the same properties as URL button, except title.
   */
  constructor(title, subtitle = null, imageUrl = null, buttons = null, defaultAction = null) {
    this.title = title;
    if (subtitle) {
      this.subtitle = subtitle;
    }
    if (imageUrl) {
      this.imageUrl = imageUrl;
    }
    if (defaultAction) {
      this.defaultAction = defaultAction;
    }
    if (buttons) {
      this.buttons = buttons;
    }
    return this.toJSON();
  }

  toJSON() {
    const element = {
      title: this.title,
    };
    if (this.subtitle) {
      element.subtitle = this.subtitle;
    }
    if (this.imageUrl) {
      element.image_url = this.imageUrl;
    }
    if (this.defaultAction) {
      element.default_action = this.defaultAction;
    }
    if (this.buttons) {
      element.buttons = this.buttons;
    }
    return element;
  }
}

export default GenericElement;
