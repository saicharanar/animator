const { asserter } = require('./asserter.js');
const { createTag } = require('./createTag.js');
const { Cycler } = require('./Cycler.js');

const createImgTag = (image) => createTag(['img', { src: image }]);

class Animation {
  constructor(frames) {
    this.frames = new Cycler(frames);
  }

  draw() {
    return createImgTag(this.frames.current());
  }

  equals(otherAnimation) {
    return (
      otherAnimation instanceof Animation &&
      asserter(this.frames, otherAnimation.frames)
    );
  }
}

exports.Animation = Animation;
