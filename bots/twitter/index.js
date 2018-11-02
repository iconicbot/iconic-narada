import Logger from '../../logger';
import exampleBot1 from './example_bot_1';

const logger = Logger(process.env)(module);

const Bots = {
  '898027383889862657': exampleBot1
};

class Bot {
  constructor(pageId) {
    this.pageId = pageId;
  }

  handover(event) {
    try {
      const bot = new Bots[this.pageId]();
      bot.processEvents(event);
    } catch (err) {
      logger.error(err);
    }
  }
}

export default Bot;
