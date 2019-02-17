import Message from './Message';
import VideoAttachment from './VideoAttachment';

class Video extends Message {
  constructor(url, quickReplies = null, metadata = null) {
    const attachment = new VideoAttachment(url);
    super(null, attachment, quickReplies, metadata);
  }
}

export default Video;
