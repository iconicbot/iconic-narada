import Logger from '../../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);
const validQuickReplyContentTypes = ['text', 'location', 'user_phone_number', 'user_email'];

class QuickReplyFactory {
  /**
   * https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies
   * https://developers.facebook.com/docs/messenger-platform/reference/send-api/quick-replies/
   * @param {string} contentType
   * @param {string} title 20
   * @param {string, number} payload 1000
   * @param {string} imageUrl
   */
  constructor(contentType, title = null, payload = null, imageUrl = null) {
    this.contentType = contentType;

    if (validQuickReplyContentTypes.includes(contentType)) {
      this.contentType = contentType;
    } else {
      logger.debug('Invalid content_type.', contentType);
      // throw error
    }

    if (title != null) {
      this.title = title;
    }

    if (payload != null) {
      this.payload = payload;
    }

    if (imageUrl != null) {
      this.imageUrl = imageUrl;
    }

    if (contentType === 'text') {
      if (title == null) {
        logger.debug('Quick Reply title is required for this content_type.', contentType);
      }

      if (payload == null) {
        // May be set to an empty string if image_url is set.
        logger.debug('Quick Reply payload is required for this content_type.', contentType);
      }

      if (title === '' && imageUrl == null) {
        logger.debug('Quick Reply title or image_url is required for this content_type.', contentType, title, imageUrl);
      }

      // Theoretically payload is required if content type is set to text. It can be empty if image url is set. But it is working with empty string even when imageurl is not set.
      // if (payload == "" && imageUrl == null) {
      //   logger.debug("Quick Reply payload or image_url is required for this content_type.", contentType, payload, imageUrl);
      // }
    }

    return this.toJSON();
  }

  toJSON() {
    const quickReply = {
      content_type: this.contentType,
    };
    // if (typeof(this.title) == "string") {
    // Theoretically empty title is allowed if imageurl is set. But facebook isn't showing it as per docs.
    if (this.title) {
      quickReply.title = this.title;
    }
    if (typeof (this.payload) === 'string') {
      quickReply.payload = this.payload;
    }
    if (this.imageUrl) {
      quickReply.image_url = this.imageUrl;
    }
    return quickReply;
  }
}

export default QuickReplyFactory;
