import Attachment from './Attachment';

class VideoAttachment extends Attachment {
  constructor(url) {
    const payload = {
      url,
    };
    super('video', payload);
  }
}

export default VideoAttachment;
