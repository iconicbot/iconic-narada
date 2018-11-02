import Attachment from './Attachment';

class AudioAttachment extends Attachment {
  constructor(url) {
    const payload = {
      url,
    };
    super('audio', payload);
  }
}

export default AudioAttachment;
