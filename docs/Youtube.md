# Youtube Platform

## Importing connector

    import YoutubeConnector from '../../../platforms/youtube/connector';

## Fetch list of comments

You can fetch the list of comments for a specific video using the commentsList method.

    const youtubeConnector = new YoutubeConnector(ACCESS_TOKEN);

    youtubeConnector.commentsList(videoId).then((data) => {
      data.data.items.forEach((element) => {
        //process the element it contains the comment, commentId, and authorDetails
      });
    });

## Add a new comment

You can add a new comment for a video using the commentInsert method.

    const youtubeConnector = new YoutubeConnector(ACCESS_TOKEN);

    youtubeConnector.commentInsert(videoId, comment).catch(err => logger.error(err));

## Add a reply to a comment

You can add a reply to an existing comment using the commentReply method.

    const youtubeConnector = new YoutubeConnector(ACCESS_TOKEN);

    youtubeConnector.commentReply(commentId, comment).catch(err => logger.error(err));

## Delete a comment

You can remove a comment using the commentDelete method.
    
    const youtubeConnector = new YoutubeConnector(ACCESS_TOKEN);

    youtubeConnector.commentDelete(commentId).catch(err => logger.error(err));

