import Message from './Message';
import TemplateAttachment from './TemplateAttachment';

class ButtonTemplate extends Message {
  /**
   * https://developers.facebook.com/docs/messenger-platform/reference/template/button
   * @param {string} text UTF-8-encoded text of up to 640 characters. Text will appear above the buttons.
   * @param {array} buttons Array of Button objects - Set of 1-3 buttons that appear as call-to-actions. Cannot use ShareButton in ButtonTemplate
   * @param {object} optional_params
   */
  constructor(text, buttons, { quickReplies = null, metadata = null, sharable = false } = {}) {
    const payload = {
      template_type: 'button',
      text, // 640
      buttons,
      sharable,
    };
    const attachment = new TemplateAttachment(payload);
    super(null, attachment, quickReplies, metadata);
  }
}

export default ButtonTemplate;
