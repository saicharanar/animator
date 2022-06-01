const assert = require('assert');
const { Animation } = require('../src/animation');
const { Character, createCharacter } = require('../src/character');

describe.only('Character', () => {
  it('Should validate the object is a character', () => {
    const c1 = new Character(['idle1', 'idle2'], ['run1', 'run2']);
    const c2 = new Character(['idle1', 'idle2'], ['run1', 'run2']);
    assert.ok(c1.equals(c2));
  });

  const idle = new Animation(['idle1', 'idle2']);
  const run = new Animation(['run1', 'run2']);
  const character = new Character(idle, run);

  it('Should draw frame of current action ', () => {
    const actual = character.draw();
    const expected = '<img src="idle1"></img>';
    assert.equal(actual, expected);
  });

  it('Should draw next frame of current action ', () => {
    const actual = character.draw();
    const expected = '<img src="idle2"></img>';
    assert.equal(actual, expected);
  });

  it('Should set the action to run ', () => {
    character.setRun();
    const actual = character.draw();
    const expected = '<img src="run1"></img>';
    assert.equal(actual, expected);
  });
});

describe('createCharacter', () => {
  it('Should give an instance of character', () => {
    const character = createCharacter([1, 2]);
    assert.ok(character instanceof Character);
  });
});
