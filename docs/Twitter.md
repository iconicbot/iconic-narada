# Twitter Platform

## Importing elements and connector

    import TwitterConnector from '../../../platforms/twitter/connector';
    import * as TwitterElements from '../../../platforms/twitter/elements';

## Creating a message

Create a plain text message.

    const message = new TwitterElements.Text(`Hi there!`);

Create a text with a single quick reply.
    
    const textWithQuickReply = new TwitterElements.Text('Hi there!', new TwitterElements.QuickReply('Hey', "This returns metadata 'utter_bye'", 'utter_bye'));

Create a text with many quick replies.
    
    const textWithQuickReplies = new TwitterElements.Text('Would you like to buy ticket?', [
        new TwitterElements.QuickReply('Yes', "This returns metadata 'action_buy_ticket_yes'", 'action_buy_ticket_yes'),
        new TwitterElements.QuickReply('No', "This returns metadata 'action_buy_ticket_no'", 'action_buy_ticket_no'),
    ]);

Upload an image and create a message.

    const twitterConnector = new TwitterConnectorOAUTH);

    const imageMediaId = await twitterConnector.uploadMedia('test.jpg', 'dm_image')
        .catch(err => logger.debug(err));

    const imageMessage = new TwitterElements.Image(imageMediaId);

Create a message with an already uploaded image.

    const alreadyUploadedImageMediaId = '1050692798884667132398';

    const alreadyUploadedimageMessage = new TwitterElements.Image(alreadyUploadedImageMediaId);

Upload a video and create a message.

    const twitterConnector = new TwitterConnectorOAUTH);

    const videoMediaId = await twitterConnector.uploadMedia("test.mp4", "dm_video");

    const videoMessage = new TwitterElements.Video(videoMediaId);

Create a message with an already uploaded video.

    const videoMediaId = '1050692798884667132398';

    const videoMessage = new TwitterElements.Video(videoMediaId);

Create a message with image/video and quick replies.

    const imageMessageWithQuickReplies = new TwitterElements.Image('1050692798884667132398', [
        new TwitterElements.QuickReply('Yes', "This returns metadata 'action_buy_ticket_yes'", 'action_buy_ticket_yes'),
        new TwitterElements.QuickReply('No', "This returns metadata 'action_buy_ticket_no'", 'action_buy_ticket_no'),
    ]);

Create a button template.

    const buttonTemplate = new TwitterElements.Text('Hey, my new movie is just released..!!', null, [
        new TwitterElements.UrlButton('Watch Now', 'https://your-some.url/'),
        new TwitterElements.UrlButton('See More', 'https://your-some.url/'),
    ]);

## Sending a message.

Set the Recipient ID.

Event object contains basic information like senderId, recipientId, etc based on the type of event received.

    const recipientId = event.senderId;

Set a message.

    const message = new TwitterElements.Text(`Hello there!`);

Create an array of replies to be sent.

Reply element method requires a recipient ID and a message. It also accepts a string in place of message object.

    const replies = [
        new TwitterElements.Reply(recipientId, message),
        new TwitterElements.Reply(recipientId, 'What\'s up?'),
    ];

Send each reply in sequence.

    const twitterConnector = new TwitterConnectorOAUTH);

    for (const reply of replies) {
        await twitterConnector.sendMessage(reply)
          .catch(err => logger.error(err));
    }
