import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
const service = google.youtube('v3');

class YoutubeConnector {
    constructor(clientSecret) {
        this.auth = new OAuth2(clientSecret.installed.client_id, clientSecret.installed.client_secret, clientSecret.installed.redirect_uris[0]);
        this.auth.credentials = clientSecret.token;
    }

    /**
     * @param {string} videoId
     */
    commentsList(videoId) {
        const parameters = {
            part: 'snippet,replies',
            videoId: videoId,
            auth: this.auth
        };

        return new Promise((resolve, reject) => {
            service.commentThreads.list(parameters, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    /**
     * @param {string} videoId
     * @param {string} comment
     */
    commentInsert(videoId, comment) {
        const parameters = {
            part: 'snippet',
            resource: {
                snippet: {
                    videoId: videoId,
                    topLevelComment: {
                        snippet: {
                            textOriginal: comment
                        }
                    }
                }
            },
            auth: this.auth
        };

        return new Promise((resolve, reject) => {
            service.commentThreads.insert(parameters, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    /**
     * @param {string} commentId
     * @param {string} comment
     */
    commentReply(commentId, comment) {
        const parameters = {
            part: 'snippet',
            resource: {
                snippet: {
                    parentId: commentId,
                    textOriginal: comment
                }
            },
            auth: this.auth
        };

        return new Promise((resolve, reject) => {
            service.comments.insert(parameters, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });

    }

    /**
     * @param {string} commentId
     */
    commentDelete(commentId) {
        const parameters = {
            id: commentId,
            auth: this.auth
        };

        return new Promise((resolve, reject) => {
            service.comments.delete(parameters, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

}

export default YoutubeConnector;