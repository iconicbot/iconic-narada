import Attachment from './Attachment';

class ImageAttachment extends Attachment {
  constructor(url) {
    const payload = {
      url,
    };
    super('image', payload);
  }
}

export default ImageAttachment;
