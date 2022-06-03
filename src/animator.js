const fs = require('fs');
const { actions } = require('../data/actions.json');
const { createTag } = require('./createTag.js');
const { createCharacter } = require('./character.js');
const { EventNotifier } = require('./events.js');

const createHtml = (image) => {
  const meta = '<meta http-equiv="refresh" content="0.15" />';
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
  const interval = 150;
  animate(character, interval);
};

const getLatestAction = (file) => {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const action = fileContent.trim().split('\n').slice(-1);

  return action;
};

const takeUserInput = (actionsNotifier, character) => {
  const file = './controller';
  fs.watchFile(file, (prev, curr) => {
    const action = getLatestAction(file);
    actionsNotifier.notify(...action, character);
    animator(character);
  });
};

const main = () => {
  const { idle, run, attack, walk } = actions;
  const character = createCharacter(idle, run, attack, walk);
  const actionsNotifier = new EventNotifier();
  actionsNotifier.register('start', (character) => character.setIdle());
  actionsNotifier.register('run', (character) => character.setRun());
  actionsNotifier.register('attack', (character) => character.setAttack());
  actionsNotifier.register('walk', (character) => character.setWalk());
  actionsNotifier.register('stop', (character) => character.setIdle());

  animator(character);
  takeUserInput(actionsNotifier, character);
};

main();
