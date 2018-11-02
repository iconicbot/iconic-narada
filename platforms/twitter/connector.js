import { post, get } from 'request';
import { statSync, open, readSync } from 'fs';
import { lookup } from 'mime-types';
import Logger from '../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);

const BASE_URL = 'https://api.twitter.com/1.1';
const UPLOAD_URL = 'https://upload.twitter.com/1.1/media/upload.json';

class Twitter {
  constructor(oauth) {
    this.oauth = oauth;
  }

  sendMessage(reply) {
    const requestOptions = {
      url: `${BASE_URL}/direct_messages/events/new.json`,
      oauth: this.oauth,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      body: reply,
    };
    return new Promise(((resolve, reject) => {
      post(requestOptions, (error, response, body) => {
        try {
          if (body.event.message_create) {
            resolve(body);
          } else {
            reject(body);
          }
        } catch (e) {
          reject(body);
        }
      });
    }));
  }

  sendAction(recipientId) {
    const requestOptions = {
      url: `${BASE_URL}/direct_messages/indicate_typing.json`,
      oauth: this.oauth,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      qs: {
        recipient_id: recipientId,
      },
    };
    post(requestOptions, (error, response, body) => {
      logger.info(body);
    });
  }

  markRead(lastReadEventId, recipientId) {
    const requestOptions = {
      url: `${BASE_URL}/direct_messages/mark_read.json`,
      oauth: this.oauth,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      qs: {
        recipient_id: recipientId,
        last_read_event_id: lastReadEventId,
      },
    };
    post(requestOptions, (error, response, body) => {
      logger.info(body);
    });
  }

  postTweet(reply) {
    const requestOptions = {
      url: `${BASE_URL}/statuses/update.json`,
      oauth: this.oauth,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      qs: reply,
    };
    return new Promise(((resolve, reject) => {
      post(requestOptions, (error, response, body) => {
        if (body.id) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    }));
  }

  /**
   * Upload media to use in Twitter Direct Message
   * @param {string} fileName
   * @param {string} mediaCategory dm_image, dm_gif, dm_video
   * @param {boolean} shared true / false
   */
  async uploadMedia(fileName, mediaCategory, shared = false) {
    logger.debug('Media upload started.');
    const filePath = `./../media/${fileName}`;
    const stats = statSync(filePath);
    let requestOptions = {};
    requestOptions = {
      url: UPLOAD_URL,
      oauth: this.oauth,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      form: {
        command: 'INIT',
        total_bytes: stats.size,
        media_type: lookup(filePath),
        media_category: mediaCategory,
        shared,
      },
    };
    const mediaId = await new Promise((resolve, reject) => {
      post(requestOptions, (error, response, body) => {
        if (response.statusCode === 202) {
          logger.debug('Media INIT sent.');
          resolve(JSON.parse(body).media_id_string);
        } else {
          logger.debug('HTTP response code:', response.statusCode);
          logger.debug('Error uploading media.');
          logger.debug(body);
          reject(response);
        }
      });
    });
    logger.debug(mediaId);
    if (mediaId) {
      let finished = 0;
      let segmentIndex = 0;
      let bytesRead; let
        data;
      let offset = 0;
      const bufferLength = 1000000;
      const theBuffer = Buffer.alloc(bufferLength);
      await new Promise((resolve) => {
        open(filePath, 'r', async (err, fd) => {
          while (offset < stats.size) {
            bytesRead = readSync(fd, theBuffer, 0, bufferLength, null);
            data = bytesRead < bufferLength ? theBuffer.slice(0, bytesRead) : theBuffer;
            const mediaData = data.toString('base64');
            /* eslint-disable-next-line no-await-in-loop */
            finished = await this.postMediaAppend(mediaId, mediaData, finished, segmentIndex);
            offset += bufferLength;
            segmentIndex += 1;
          }
          resolve(mediaId);
        });
      });
    }
    requestOptions = {
      url: UPLOAD_URL,
      oauth: this.oauth,
      headers: {
        'Content-type': 'multipart/form-data',
      },
      form: {
        command: 'FINALIZE',
        media_id: mediaId,
      },
    };
    await new Promise((resolve) => {
      post(requestOptions, (err, response) => {
        logger.debug('Media FINALIZE sent.');
        if (response.statusCode === 201) {
          resolve(mediaId);
        }
      });
    });
    requestOptions = {
      url: UPLOAD_URL,
      oauth: this.oauth,
      headers: {
        'content-type': 'application/json',
      },
      qs: {
        command: 'STATUS',
        media_id: mediaId,
      },
    };
    return new Promise((resolve, reject) => {
      get(requestOptions, (err, response, body) => {
        logger.debug(`STATUS: ${response.statusCode} ${body}`);
        if (response) {
          resolve(mediaId);
        } else {
          reject(mediaId);
        }
      });
    });
  }

  postMediaAppend(mediaId, mediaData, finished, segmentIndex) {
    const requestOptions = {
      url: UPLOAD_URL,
      oauth: this.oauth,
      headers: {
        'Content-type': 'multipart/form-data',
      },
      form: {
        command: 'APPEND',
        media_id: mediaId,
        segment_index: segmentIndex,
        media_data: mediaData,
      },
    };
    return new Promise((resolve) => {
      post(requestOptions, (err, response) => {
        logger.debug('Media APPEND sent.');
        logger.debug(`finished: ${finished}`);
        logger.debug(`segmentIndex: ${segmentIndex}`);
        if (finished === segmentIndex) {
          logger.debug('Media APPEND finished.');
          logger.debug(response.statusCode);
        }
        resolve(finished + 1);
      });
    });
  }
}

export default Twitter;
