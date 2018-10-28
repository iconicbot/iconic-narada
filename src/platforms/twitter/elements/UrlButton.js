import Button from './Button';

class UrlButton extends Button {
  constructor(label, url, tco_url = null) {
    super('web_url', label, url, tco_url);
  }
}

export default UrlButton;
