import Attachment from './Attachment';

class TemplateAttachment extends Attachment {
  constructor(templatePayload) {
    super('template', templatePayload);
  }
}

export default TemplateAttachment;
