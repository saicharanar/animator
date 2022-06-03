const fs = require('fs');
const { actions } = require('../data/actions.json');
const { createTag } = require('./createTag.js');
const { createCharacter } = require('./character.js');
const { EventNotifier } = require('./events.js');

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

const animator = (character) => {
  const interval = 100;
  const intervalTimer = animate(character, interval);

  setTimeout(() => {
    clearInterval(intervalTimer);
  }, 10000);
};

const takeUserInput = (actionsNotifier, idle, run) => {
  const character = createCharacter(idle, run);
  fs.watchFile('./controller', (prev, curr) => {
    const fileContent = fs.readFileSync('./controller', 'utf-8');
    const action = fileContent.split('\n').slice(-1);
    actionsNotifier.notify(...action, character);
    animator(character);
  });
};

const main = () => {
  const { idle, run } = actions;
  const actionsNotifier = new EventNotifier();
  actionsNotifier.register('start', (character) => character.setIdle());
  actionsNotifier.register('run', (character) => character.setRun());
  actionsNotifier.register('stop', (character) => character.setIdle());

  takeUserInput(actionsNotifier, idle, run);
};

main();
