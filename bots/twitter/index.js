import exampleBot1 from './example_bot_1';

const Bots = {
  '898027383889862657': exampleBot1,
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
