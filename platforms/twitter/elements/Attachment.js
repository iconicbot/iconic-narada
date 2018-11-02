class Attachment {
  constructor(mediaId = null) {
    this.type = 'media';
    this.mediaId = mediaId;
  }

  toJSON() {
    const attachment = {
      type: this.type,
      media: {
        id: this.mediaId,
      },
    };
    return attachment;
  }
}

module.exports = Attachment;
