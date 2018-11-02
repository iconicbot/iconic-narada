import exampleBot1 from './example_bot_1';

const Bots = {
  1589576064684131: exampleBot1,
};

class Bot {
  constructor(pageId) {
    this.pageId = pageId;
  }

  handover(event) {
    const bot = new Bots[this.pageId]();
    bot.processEvents(event);
  }
}

export default Bot;
