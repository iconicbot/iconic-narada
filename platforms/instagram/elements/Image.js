import Message from './Message';
import ImageAttachment from './ImageAttachment';

class Image extends Message {
  constructor(url, quickReplies = null, metadata = null) {
    const attachment = new ImageAttachment(url);
    super(null, attachment, quickReplies, metadata);
  }
}

export default Image;
