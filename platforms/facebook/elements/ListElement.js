import Logger from '../../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);

class ListElement {
  /**
   * https://developers.facebook.com/docs/messenger-platform/reference/template/list/
   * @param {string} title String to display as the title of the list item. 80 character limit. May be truncated if the title spans too many lines. Element must also have one or both of image_url or subtitle set.
   * @param {string} subtitle Optional. String to display as the subtitle of the list item. 80 character limit. May be truncated if the subtitle spans too many lines. Element must have one or both of image_url or subtitle set.
   * @param {string} imageUrl Optional. URL of the image to display in the list item. Element must have one or both of image_url or subtitle set.
   * @param {array} buttons Optional. Button to display on the list item. Maximum of 1 button is supported.
   * @param {object} defaultAction Optional. URL button that specifies the default action to execute when the list item is tapped. Only allowed when messenger_extensions property is set to true.
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

    if ((subtitle == null || subtitle === '') && imageUrl == null) {
      logger.debug('List Element must have one or both of image_url or subtitle set.');
      // throw
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

export default ListElement;
