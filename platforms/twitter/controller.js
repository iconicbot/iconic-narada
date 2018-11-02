import { createHmac } from 'crypto';
import Logger from '../../logger';
import TwitterParser from './parser';
import TwitterBot from '../../bots/twitter/index';

require('dotenv').config();

const logger = Logger(process.env)(module);

class twitterController {
  static handleTwitterGet(req, res) {
    const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
    const crcToken = req.query.crc_token;
    if (crcToken) {
      const hash = createHmac('sha256', consumerSecret).update(crcToken).digest('base64');
      res.status(200).send({
        response_token: `sha256=${hash}`,
      });
    } else {
      res.status(400).send('Error: crc_token missing from request.');
    }
  }

  static handleTwitterPost(req, res) {
    // acknowledge the server
    res.status(200).send('EVENT_RECEIVED');
    // process the event
    const pageId = req.body.for_user_id;
    logger.debug(`Webhook sent to page ID: ${pageId}`);
    const twitterParser = new TwitterParser();
    const parsedEvents = twitterParser.parseEvents(req.body);
    parsedEvents.forEach(async (parsedEvent) => {
      logger.silly(parsedEvent);
      // pass on event handling to processEvents method of bot
      const bot = new TwitterBot(pageId);
      bot.handover(parsedEvent);
    });
  }
}

export default twitterController;
