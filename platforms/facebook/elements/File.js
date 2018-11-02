import Message from './Message';
import FileAttachment from './FileAttachment';

class File extends Message {
  constructor(url, quickReplies = null, metadata = null) {
    const attachment = new FileAttachment(url);
    super(null, attachment, quickReplies, metadata);
  }
}

export default File;
