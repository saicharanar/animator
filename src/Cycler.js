const { asserter } = require("./asserter");

class Cycler {
  constructor(list) {
    this.list = list;
    this.index = 0;
  }

  current() {
    const currentItem = this.list[this.index];
    this.next();
    return currentItem;
  }

  next() {
    this.index++
    this.index = this.index % this.list.length;
  }

  equals(otherCycler) {
    return (
      otherCycler instanceof Cycler &&
      asserter(this.list, otherCycler.list)
    );
  }
};

exports.Cycler = Cycler;