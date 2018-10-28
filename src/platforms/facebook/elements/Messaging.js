import Logger from '../../../logger';

const logger = Logger(process.env)(module);

// https://developers.facebook.com/docs/messenger-platform/send-messages/#messaging_types
const validMessagingTypes = ['RESPONSE', 'UPDATE', 'MESSAGE_TAG'];
// https://developers.facebook.com/docs/messenger-platform/reference/send-api/#payload
const validSenderActions = ['typing_on', 'typing_off', 'mark_seen'];
const validNotificationTypes = ['REGULAR', 'SILENT_PUSH', 'NO_PUSH'];
// https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
const validTags = ['COMMUNITY_ALERT', 'CONFIRMED_EVENT_REMINDER', 'NON_PROMOTIONAL_SUBSCRIPTION', 'PAIRING_UPDATE', 'APPLICATION_UPDATE', 'ACCOUNT_UPDATE', 'PAYMENT_UPDATE', 'PERSONAL_FINANCE_UPDATE', 'SHIPPING_UPDATE', 'RESERVATION_UPDATE', 'ISSUE_RESOLUTION', 'APPOINTMENT_UPDATE', 'GAME_EVENT', 'TRANSPORTATION_UPDATE', 'FEATURE_FUNCTIONALITY_UPDATE', 'TICKET_UPDATE'];

class Messaging {
  /**
   *
   * @param {string} recipientId
   * @param {object} message
   * @param {string} messagingType (optional)
   * @param {string} notificationType (optional)
   * @param {string} tag (optional)
   */
  constructor(recipientId, message, messagingType = 'RESPONSE', notificationType = 'REGULAR', tag = null) {
    this.recipientId = recipientId;

    if (typeof (message) === 'object') {
      this.message = message;
    } else if (typeof (message) === 'string') {
      if (validSenderActions.includes(message)) {
        this.senderAction = message;
      } else {
        logger.debug('Invalid sender_action.', message);
        // throw error
      }
    } else {
      logger.debug('Invalid message.', message);
      // throw error
    }

    if (validMessagingTypes.includes(messagingType)) {
      this.messagingType = messagingType;
    } else {
      logger.debug('Invalid messaging_type.', messagingType);
      // throw error
    }

    if (validNotificationTypes.includes(notificationType)) {
      this.notificationType = notificationType;
    } else {
      logger.debug('Invalid notification_type.', notificationType);
      // throw error
    }

    if (this.messagingType === 'MESSAGE_TAG') {
      if (validTags.includes(tag)) {
        this.tag = tag;
      } else {
        logger.debug('Non-promotional message sent outside the 24-hour standard messaging window sent with messaging_type MESSAGE_TAG needs a valid tag.', tag);
        // throw error
      }
    }

    return this.toJSON();
  }

  toJSON() {
    const messaging = {
      recipient: {
        id: this.recipientId,
      },
    };

    if (this.message) {
      messaging.message = this.message;
      messaging.messaging_type = this.messagingType;
      messaging.notification_type = this.notificationType;
      if (this.tag != null) {
        messaging.tag = this.tag;
      }
    } else if (this.senderAction) {
      // When using sender_action, recipient should be the only other property set in the request.
      messaging.sender_action = this.senderAction;
    } else {
      logger.debug('Messaging should have a message or sender_action.');
    }

    return messaging;
  }
}

export default Messaging;
