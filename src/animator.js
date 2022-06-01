const fs = require('fs');
const { actions } = require('../data/actions.json');
const { createTag } = require('./createTag.js');
const { createCharacter } = require('./character.js');

const createHtml = (image) => {
  const meta = '<meta http-equiv="refresh" content="0.1" />';
  const head = createTag(['head', {}, meta]);
  const body = createTag(['body', {}, image]);
  return createTag(['html', {}, head + body]);
};

const animate = (character, interval) => {
  return setInterval(() => {
    const currentFrame = createHtml(character.draw());
    fs.writeFileSync('./index.html', currentFrame, 'utf8');
  }, interval);
};

const animator = (idle, run) => {
  const interval = 100;
  const character = createCharacter(idle, run);
  const intervalTimer = animate(character, interval);

  setTimeout(() => {
    clearInterval(intervalTimer);
    character.setRun();
    animate(character, interval);
  }, 10000);
};

const main = () => {
  const { idle, run } = actions;
  animator(idle, run);
};

main();
