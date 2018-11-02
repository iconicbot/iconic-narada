import Button from './Button';

class UrlButton extends Button {
  constructor(title, url, webviewHeightRatio = 'full', messengerExtensions = false, fallbackUrl = null, webviewShareButton = null) {
    super('web_url');
    this.title = title; // 20
    this.url = url;
    this.webviewHeightRatio = webviewHeightRatio; // compact|tall|full, default full
    this.messengerExtensions = messengerExtensions; // "true|false"
    this.fallbackUrl = fallbackUrl; // optional and valid only if messengerExtensions is true
    this.webviewShareButton = webviewShareButton; // "HIDE" // default SHOW
    // if messengerExtensions == true, then url must be HTTPS
    return this.toJSON();
  }

  toJSON() {
    const url = {
      type: this.type,
      title: this.title,
      url: this.url,
      webview_height_ratio: this.webviewHeightRatio,
    };
    if (this.messengerExtensions) {
      url.messenger_extensions = this.messengerExtensions;
    }
    if (this.fallbackUrl) {
      url.fallback_url = this.fallbackUrl;
    }
    if (this.webviewShareButton) {
      url.webview_share_button = this.webviewShareButton;
    }
    return url;
  }
}

export default UrlButton;
