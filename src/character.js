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

  setRun() {
    this.currentAction = this.run;
  }

  equals(otherCharacter) {
    return (
      otherCharacter instanceof Character &&
      asserter(this.idle, otherCharacter.idle) &&
      asserter(this.run, otherCharacter.run)
    );
  }
}

const createCharacter = (idle, run) => {
  const idler = new Animation(idle);
  const running = new Animation(run);
  const character = new Character(idler, running);
  return character;
};

exports.Character = Character;
exports.createCharacter = createCharacter;
