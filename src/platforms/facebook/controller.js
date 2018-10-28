import Logger from '../../logger';
import FacebookParser from './parser';
import FacebookBot from '../../bots/facebook/index';

require('dotenv').config();

const logger = Logger(process.env)(module);

class facebookController {
  static handleFacebookGet(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.FB_VERIFY_TOKEN) {
        logger.debug('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(500);
    }
  }

  static handleFacebookPost(req, res) {
    // acknowledge the server
    res.status(200).send('EVENT_RECEIVED');
    // process the event
    const facebookParser = new FacebookParser();
    const parsedEvents = facebookParser.parseEvents(req.body);
    parsedEvents.forEach(async (parsedEvent) => {
      const pageId = parsedEvent.recipientId;
      logger.debug(`Webhook sent to page ID: ${pageId}`);
      logger.silly(parsedEvent);
      // pass on event handling to processEvents method of bot
      const bot = new FacebookBot(pageId);
      bot.handover(parsedEvent);
    });
  }
}

export default facebookController;
