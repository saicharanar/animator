const { Animation } = require('./animation');
const { asserter } = require('./asserter');

class Character {
  constructor(idle, run) {
    this.idle = idle;
    this.run = run;
    this.currentAction = idle;
  }

  draw() {
    return this.currentAction.draw();
  }

  equals(otherCharacter) {
    return (
      otherCharacter instanceof Character &&
      asserter(this.idle, otherCharacter.idle) &&
      asserter(this.run, otherCharacter.run)
    );
  }
}

const createCharacter = (idle) => {
  const idler = new Animation(idle);
  const character = new Character(idler);
  return character;
};

exports.Character = Character;
exports.createCharacter = createCharacter;
