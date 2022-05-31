const { createTag } = require('./createTag.js');
const fs = require('fs');

class Character {
  constructor(action) {
    this.action = action;
    this.frameIndex = 0;
  }

  reset() {
    this.frameIndex = 0;
  }

  currentFrame() {
    return this.action[this.frameIndex];
  }

  nextFrame() {
    this.frameIndex++
    this.frameIndex === this.action.length ? this.reset() : this.frameIndex;
  }

  draw() {
    return createImgTag(this.currentFrame());
  }
}

const createImgTag = (image) => createTag(['img', { src: image }]);

const createHtml = (image) => {
  const meta = '<meta http-equiv="refresh" content="0.2" />';
  const head = createTag(['head', {}, meta]);
  const body = createTag(['body', {}, image]);
  return createTag(['html', {}, head + body]);
};

const animate = (characterModel, interval) => {
  setInterval(() => {
    const currentFrame = createHtml(characterModel.draw());
    fs.writeFileSync('./index.html', currentFrame, 'utf8');
    characterModel.nextFrame();
  }, interval);

};

const animator = (character) => {
  const interval = 200;
  const characterModel = new Character(character);
  animate(characterModel, interval);
};

const main = (character) => {
  animator(character);
};

main(process.argv.slice(2));
