class FacebookParser {
  constructor() {
    this.events = [];
  }

  parseEvents(body) {
    if (body.object === 'page') {
      // this.events = [];
      this.parsePageObject(body);
      return this.events;
    }
    return null;
  }

  parsePageObject(body) {
    body.entry.forEach((entry) => {
      this.parsePageEntry(entry);
    });
  }

  parsePageEntry(entry) {
    if (entry.messaging) {
      entry.messaging.forEach((messaging) => {
        this.events.push(FacebookParser.parsePageMessaging(messaging, entry.id));
      });
    } else if (entry.changes) {
      entry.changes.forEach((change) => {
        this.events.push(FacebookParser.parsePageChange(change, entry.id));
      });
    }
  }

  static parsePageMessaging(messaging, pageId) {
    const parsedEvent = {
      recipientId: pageId,
      senderId: messaging.sender.id,
      type: undefined,
      payload: messaging,
    };
    if (messaging.message) {
      if (messaging.message.is_echo) {
        parsedEvent.type = 'message_echo';
      } else {
        parsedEvent.type = 'message';
      }
    } else if (messaging.delivery) {
      parsedEvent.type = 'message_delivery';
    } else if (messaging.read) {
      parsedEvent.type = 'message_read';
    } else if (messaging.postback) {
      parsedEvent.type = 'messaging_postback';
    } else if (messaging.referral) {
      parsedEvent.type = 'messaging_referral';
    } else if (messaging.optin) {
      parsedEvent.type = 'messaging_optin';
    } else if (messaging.account_linking) {
      parsedEvent.type = 'messaging_account_linking';
    } else if (messaging.payment) {
      parsedEvent.type = 'messaging_payment';
    } else if (messaging.account_linking) {
      parsedEvent.type = 'messaging_checkout_update';
    } else if (messaging.pre_checkout) {
      parsedEvent.type = 'messaging_pre_checkout';
    }
    return parsedEvent;
  }

  static parsePageChange(change, pageId) {
    const parsedEvent = {
      recipientId: pageId,
      senderId: change.value.sender_id,
      type: `${change.field}_${change.value.item}_${change.value.verb}`,
      payload: change.value,
    };
    return parsedEvent;
  }
}

export default FacebookParser;
