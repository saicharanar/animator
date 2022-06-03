const { Animation } = require('./animation');
const { asserter } = require('./asserter');

class Character {
  constructor(idle, run, attack, walk) {
    this.idle = idle;
    this.run = run;
    this.attack = attack;
    this.walk = walk;
    this.currentAction = idle;
  }

  draw() {
    return this.currentAction.draw();
  }

  setRun() {
    this.currentAction = this.run;
  }

  setIdle() {
    this.currentAction = this.idle;
  }

  setAttack() {
    this.currentAction = this.attack;
  }

  setWalk() {
    this.currentAction = this.walk;
  }

  equals(otherCharacter) {
    return (
      otherCharacter instanceof Character &&
      asserter(this.idle, otherCharacter.idle) &&
      asserter(this.run, otherCharacter.run)
    );
  }
}

const createCharacter = (idle, run, attack, walk) => {
  const idler = new Animation(idle);
  const running = new Animation(run);
  const attacking = new Animation(attack);
  const walking = new Animation(walk);
  const character = new Character(idler, running, attacking, walking);
  return character;
};

exports.Character = Character;
exports.createCharacter = createCharacter;
