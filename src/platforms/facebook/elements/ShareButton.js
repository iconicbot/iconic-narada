import Button from './Button';

class ShareButton extends Button {
  /**
   * https://developers.facebook.com/docs/messenger-platform/reference/buttons/share
   * @param {object} shareContents Optional. The message that you wish the recipient of the share to see, if it is different from the one this button is attached to. The format follows that used in Send API. share_contents only supports the following: Template used must be generic template.Maximum of one URL button on the template. If no buttons are specified, the buttons property on the generic template must be set to an empty array.
   */
  constructor(shareContents) {
    super('element_share');
    this.shareContents = shareContents;
    return this.toJSON();
  }

  toJSON() {
    const Share = {
      type: this.type,
      share_contents: this.shareContents, // must be generic template with max 1 button or empty array.
    };
    return Share;
  }
}

export default ShareButton;
