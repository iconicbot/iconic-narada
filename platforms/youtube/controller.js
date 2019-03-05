import Logger from '../../logger';
import youtubeBot from '../../bots/youtube/index';

require('dotenv').config();

const logger = Logger(process.env)(module);

class YoutubeController{
    static handleYoutubeGet(req,res){
        res.send("ok");
    }

    static handleYoutubePost(req,res){
        // acknowledge the server
        res.status(200).send('EVENT_RECEIVED');
        logger.debug(`Webhook post event processed`);
        const bot = new youtubeBot();
        bot.handover(req.body);
    }
}

export default YoutubeController;