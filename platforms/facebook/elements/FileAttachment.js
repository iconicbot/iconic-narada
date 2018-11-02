import Attachment from './Attachment';

class FileAttachment extends Attachment {
  constructor(url) {
    const payload = {
      url,
    };
    super('file', payload);
  }
}

export default FileAttachment;
