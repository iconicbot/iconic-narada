import { post, get } from 'request';
import Logger from '../../logger';

require('dotenv').config();

const logger = Logger(process.env)(module);

const BASE_URL = 'https://graph.facebook.com/v3.0';

class InstagramConnector {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  /**
   *
   * @param {string} pageId
   * @param {json} responseBody
   */
  sendMessage(pageId, responseBody) {
    const requestOptions = {
      url: `${BASE_URL}/${pageId}/messages?access_token=${this.accessToken}`,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      body: responseBody,
    };
    return new Promise(((resolve, reject) => {
      post(requestOptions, (error, response, body) => {
        if (body.message_id || body.recipient_id) {
          resolve(body);
          logger.silly(body);
        } else {
          reject(body);
        }
      });
    }));
  }

  /**
   *
   * @param {string} objectId
   * @param {json} responseBody
   */
  addComment(objectId, responseBody) {
    const requestOptions = {
      url: `${BASE_URL}/${objectId}/comments?access_token=${this.accessToken}`,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      body: responseBody,
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

  getUserProfile(userId) {
    const requestOptions = {
      url: `${BASE_URL}/${userId}?access_token=${this.accessToken}`,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
    };
    return new Promise(((resolve, reject) => {
      get(requestOptions, (error, response, body) => {
        if (body.id) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    }));
  }

  // getComment();
  // getMedia();
}

export default InstagramConnector;
