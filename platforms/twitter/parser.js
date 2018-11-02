class TwitterParser {
  constructor() {
    this.events = [];
  }

  parseEvents(body) {
    // check for direct message events
    if (body.direct_message_events) {
      body.direct_message_events.forEach((messageEvent) => {
        this.events.push(TwitterParser.parseMessageEvent(messageEvent, body));
      });
    } else if (body.favorite_events) {
      body.favorite_events.forEach((favoriteEvent) => {
        this.events.push(TwitterParser.parseFavoriteEvent(favoriteEvent, body));
      });
    } else if (body.tweet_create_events) {
      body.tweet_create_events.forEach((tweetCreateEvent) => {
        this.events.push(TwitterParser.parseTweetCreateEvent(tweetCreateEvent, body));
      });
    }
    return this.events;
  }

  static parseMessageEvent(messageEvent, body) {
    const senderId = messageEvent.message_create.sender_id;
    const parsedEvent = {
      type: messageEvent.type,
      id: messageEvent.id,
      senderId,
      senderName: body.users[senderId].name,
      senderUsername: body.users[senderId].screen_name,
      payload: messageEvent,
      recipientId: messageEvent.message_create.target.recipient_id,
      raw: body,
    };
    if (messageEvent.message_create.message_data.quick_reply_response) {
      parsedEvent.metadata = messageEvent.message_create.message_data.quick_reply_response.metadata;
    }
    return parsedEvent;
  }

  static parseFavoriteEvent(favoriteEvent, body) {
    const parsedEvent = {
      type: 'favorite_event',
      id: favoriteEvent.id,
      senderId: favoriteEvent.user.id_str,
      senderName: favoriteEvent.user.name,
      senderUsername: favoriteEvent.user.screen_name,
      payload: favoriteEvent,
      raw: body,
    };
    if (favoriteEvent.favorited_status) {
      parsedEvent.favoritedStatusId = favoriteEvent.favorited_status.id_str;
    }
    return parsedEvent;
  }

  static parseTweetCreateEvent(tweetCreateEvent, body) {
    const parsedEvent = {
      type: 'tweet_create_event',
      statusId: tweetCreateEvent.id_str,
      senderId: tweetCreateEvent.user.id_str,
      senderName: tweetCreateEvent.user.name,
      senderUsername: tweetCreateEvent.user.screen_name,
      payload: tweetCreateEvent,
      raw: body,
    };
    if (tweetCreateEvent.retweeted_status) {
      parsedEvent.retweetedStatusId = tweetCreateEvent.retweeted_status.id_str;
    }
    return parsedEvent;
  }
}

export default TwitterParser;
