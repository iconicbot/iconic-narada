class Event {
  /**
   *
   * @param {string} recipientId
   * @param {json} messageData
   * https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event
   */
  constructor(recipientId, messageData) {
    if (recipientId) {
      this.recipientId = recipientId;
    }
    if (messageData) {
      this.messageData = messageData;
    }
    return this.toJSON();
  }

  toJSON() {
    const event = {
      event: {
        type: 'message_create',
        message_create: {
          target: {
            recipient_id: this.recipientId,
          },
          message_data: this.messageData,
        },
      },
    };
    return event;
  }
}

export default Event;
