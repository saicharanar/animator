const { createTag } = require('./createTag.js');
const { Animation } = require('./animation.js');
const fs = require('fs');

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
  const characterModel = new Animation(character);
  animate(characterModel, interval);
};

const main = (character) => {
  animator(character);
};

main(process.argv.slice(2));
