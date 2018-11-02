import Message from './Message';
import AudioAttachment from './AudioAttachment';

class Audio extends Message {
  constructor(url, quickReplies = null, metadata = null) {
    const attachment = new AudioAttachment(url);
    super(null, attachment, quickReplies, metadata);
  }
}

export default Audio;
