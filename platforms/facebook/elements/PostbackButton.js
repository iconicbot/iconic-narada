import Logger from '../../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);
const Button = require('./Button').default;

class PostbackButton extends Button {
  constructor(title, payload) {
    super('postback');
    this.title = title; // 20
    if (payload && payload !== '') {
      this.payload = payload; // 1000
    } else {
      logger.debug('Payload cannot be empty for postback type button', payload);
    }
    return this.toJSON();
  }

  toJSON() {
    const Postback = {
      type: this.type,
      title: this.title,
      payload: this.payload,
    };
    return Postback;
  }
}

export default PostbackButton;
