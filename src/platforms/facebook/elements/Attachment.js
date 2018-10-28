import Logger from '../../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);

const validAttachmentTypes = ['image', 'audio', 'video', 'file', 'template'];

class Attachment {
  /**
   * Attachment
   * @param {string} type (image, audio, video, file, template)
   * @param {object} payload 25MB
   * https://developers.facebook.com/docs/messenger-platform/reference/send-api/#attachment
   */
  constructor(type, payload) {
    if (validAttachmentTypes.includes(type)) {
      this.type = type;
    } else {
      logger.debug('Invalid attachment type.', type);
      // throw error
    }

    if (typeof (payload) === 'object') {
      this.payload = payload;
    } else {
      logger.debug('Invalid payload.', payload);
      // throw error
    }

    return this.toJSON();
  }

  toJSON() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export default Attachment;
