const { createTag } = require("./createTag");
const fs = require('fs');

class Image {
  constructor(src) {
    this.src = src;
  }

  toHTML() {
    return createTag([
      'img', { src: this.src, }
    ]);
  }
};

class Character {
  constructor(animation) {
    this.animation = animation;
    this.frameIndex = 0;
  }

  currentFrame() {
    return this.animation[this.frameIndex];
  }

  nextFrame() {
    this.frameIndex++;
    this.frameIndex = this.frameIndex === this.animation.length ? 0 : this.frameIndex;
  }

  draw() {
    return new Image(this.currentFrame()).toHTML();
  }
}

const createHtml = (image) => {
  const meta = '<meta http-equiv="refresh" content="0.1" />';
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
  const interval = 100;
  const characterModel = new Character(character);
  animate(characterModel, interval);
};

const main = (character) => {
  animator(character);
};

main(process.argv.slice(2));
