import Logger from '../../logger';
import exampleBot1 from './example_bot_1';

const logger = Logger(process.env)(module);

const Bots = exampleBot1;

class Bot {

  handover(event) {
    try {
      const bot = new Bots();
      bot.processEvents(event);
    } catch (err) {
      logger.error(err);
    }
  }
}

export default Bot;
