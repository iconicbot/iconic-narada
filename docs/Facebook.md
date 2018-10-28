# Facebook Platform

## Importing elements and connector

    import FacebookConnector from '../../../platforms/facebook/connector';
    import * as FacebookElements from '../../../platforms/facebook/elements';

## Creating a message

Create a plain text message.

    const message = new FacebookElements.Text(`Hello there!`);

Create a text with a single quick reply.

    const textWithQuickReply = new FacebookElements.Text(`Hello there!`, new FacebookElements.QuickReply('Hey', 'action_hey'));

Create a text with many quick replies.

    const textWithQuickReplies = new FacebookElements.Text('Would you like to buy ticket?', [
      new FacebookElements.QuickReply('Yes', 'action_buy_ticket_yes'),
      new FacebookElements.QuickReply('No', 'action_buy_ticket_no'),
    ]);

Create a message with an image.

    const imageMessage = new FacebookElements.Image('https://your-some.url/path/image-filename.jpg');

Create a message with an audio.

    const audioMessage = new FacebookElements.Audio('https://your-some.url/path/audio-filename.mp3');

Create a message with a video.

    const videoMessage = new FacebookElements.Video('https://your-some.url/path/video-filename.mp4');

Create a message with a file.

    const fileMessage = new FacebookElements.File('https://your-some.url/path/file-filename.pdf');

Create a message with image/audio/video/file and quick replies.

    const imageMessageWithQuickReplies = new FacebookElements.Image('https://your-some.url/path/image-filename.jpg', [
      new FacebookElements.QuickReply('Yes', 'action_buy_ticket_yes'),
      new FacebookElements.QuickReply('No', 'action_buy_ticket_no'),
    ]);

Create a generic template.

    const genericTemplate = new FacebookElements.GenericTemplate(
      [
        new FacebookElements.GenericElement('Awantar', 'The amazing alien story', 'https://your-some.url/path/image-filename.jpg', [
          new FacebookElements.PostbackButton('Send Link', 'action_send_link_awantar'),
          new FacebookElements.PostbackButton('Buy Ticket', 'action_buy_ticket_awantar'),
          new FacebookElements.ShareButton(),
        ]),
        new FacebookElements.GenericElement('Tictonic', 'The great ship wreck story', 'https://your-some.url/path/image-filename.jpg', [
          new FacebookElements.PostbackButton('Send Link', 'action_send_link_tictonic'),
          new FacebookElements.PostbackButton('Buy Ticket', 'action_buy_ticket_tictonic'),
          new FacebookElements.ShareButton(
            new FacebookElements.GenericTemplate([
              new FacebookElements.GenericElement('Telikeda Bolli', 'The slapstick marla story', 'https://your-some.url/path/image-filename.jpg', [
                new FacebookElements.UrlButton('Watch Trailer', 'https://your-some.url/path/watch-trailer/'),
              ]),
            ]),
          ),
        ]),
      ],
    );

Create a list template.

    const listTemplate = new FacebookElements.ListTemplate(
      [
        new FacebookElements.ListElement('Awantar', 'The amazing alien story', 'https://your-some.url/path/image-filename.jpg', [
          new FacebookElements.PostbackButton('Watch', 'action_send_link_awantar'),
        ]),
        new FacebookElements.ListElement('Tictonic', 'The great ship wreck story', 'https://your-some.url/path/image-filename.jpg', [
          new FacebookElements.PostbackButton('Watch', 'action_send_link_tictonic'),
        ]),
      ],
    );

Create a button template.

    const buttonTemplate = new FacebookElements.ButtonTemplate('Hey, my new movie is just released..!!',
      [
        new FacebookElements.PostbackButton('Send Link', 'action_send_link_awantar'),
        new FacebookElements.UrlButton('Watch Now', 'https://your-some.url/path/watch-now/'),
      ]);

## Sending a message

Set the Recipient ID.

Event object contains basic information like senderId, recipientId, etc based on the type of event received.

    const recipientId = event.senderId;

Set a message.

    const message = new FacebookElements.Text(`Hello there!`);

Set the array of replies to be sent.

Reply element method requires a recipient ID and a message. It also accepts a string in place of message object.

    const replies = [
        new FacebookElements.Reply(recipientId, message),
        new FacebookElements.Reply(recipientId, 'What\'s up?'),
    ];

Send each reply in sequence.

    const facebookConnector = new FacebookConnectorACCESS_TOKEN);

    for (const reply of replies) {
        await facebookConnector.sendMessage(botConfig.PAGE_ID, reply)
            .catch(err => logger.error(err));
    }

## Sending an action.

You can also send an action with/without/before/after a Reply element.

    const replies = [
        new FacebookElements.MarkSeen(recipientId),
        new FacebookElements.TypingOn(recipientId),
        new FacebookElements.TypingOff(recipientId),
    ];

## Getting user profile.

You can get user profile with getUserProfile method.

    const facebookConnector = new FacebookConnectorACCESS_TOKEN);
    
    const userProfile = await facebookConnector.getUserProfile(recipientId)
        .catch(err => logger.debug(err));
