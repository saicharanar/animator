const { createTag } = require("./createTag");
const fs = require('fs');

class Animation {
  constructor(action) {
    this.action = action;
    this.frameIndex = 0;
  }

  draw() {
    const frame = this.action[this.frameIndex];
    this.frameIndex++;

    return
  }
}

const createImgTag = (image) => createTag([img, { src: image }]);

const createHtml = (image) => {
  const meta = '<meta http-equiv="refresh" content="0.3" />';
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

const animator = (actions) => {
  const interval = 300;
  const running = ne
  const characterModel = new Character(character);
  animate(characterModel, interval);
};

const main = (character) => {
  animator(character);
};

main(process.argv.slice(2));
