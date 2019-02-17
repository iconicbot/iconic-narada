import Message from './Message';
import TemplateAttachment from './TemplateAttachment';

class GenericTemplate extends Message {
  /**
   * https://developers.facebook.com/docs/messenger-platform/reference/template/generic/
   * @param {array} elements Array of GenericElement objects - An array of element objects that describe instances of the generic template to be sent. Specifying multiple elements will send a horizontally scrollable carousel of templates. A maximum of 10 elements is supported.
   * @param {object} optional_params
   */
  constructor(elements, {
    quickReplies = null, metadata = null, sharable = false, imageAspectRatio = 'horizontal',
  } = {}) {
    const payload = {
      template_type: 'generic',
      elements,
      sharable,
      image_aspect_ratio: imageAspectRatio, // horizontal|square
    };
    const attachment = new TemplateAttachment(payload);
    super(null, attachment, quickReplies, metadata);
  }
}

export default GenericTemplate;
