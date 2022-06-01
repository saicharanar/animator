const assert = require('assert');
const { Character, createCharacter } = require('../src/character');

describe('Character', () => {
  it('Should validate the object is a character', () => {
    const c1 = new Character(['idle1', 'idle2'], ['run1', 'run2']);
    const c2 = new Character(['idle1', 'idle2'], ['run1', 'run2']);

    assert.ok(c1.equals(c2));
  });
});

describe('createCharacter', () => {
  it('Should give an instance of character', () => {
    const character = createCharacter([1, 2]);
    assert.ok(character instanceof Character);
  });
});
