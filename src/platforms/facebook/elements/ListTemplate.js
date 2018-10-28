import Message from './Message';
import TemplateAttachment from './TemplateAttachment';

class ListTemplate extends Message {
  /**
   * https://developers.facebook.com/docs/messenger-platform/reference/template/list
   * @param {array} elements Array of ListElement objects that describe items in the list. Minimum of 2 elements required. Maximum of 4 elements is supported.
   * @param {object} optional_params top_element_style Optional. Sets the format of the first list items. Messenger web client currently only renders compact. compact: Renders a plain list item. large: Renders the first list item as a cover item. || buttons Optional. Button to display at the bottom of the list. Maximum of 1 button is supported. || sharable Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
   */
  constructor(elements, {
    quickReplies = null, metadata = null, top_element_style = 'compact', buttons = null, sharable = false,
  } = {}) {
    const payload = {
      template_type: 'list',
      elements,
      top_element_style, // compact|large
      sharable,
    };
    if (buttons) {
      payload.buttons = buttons;
    }

    const attachment = new TemplateAttachment(payload);
    super(null, attachment, quickReplies, metadata);
  }
}

export default ListTemplate;
