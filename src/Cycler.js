const assert = require("assert");
const asserter = (list1, list2) => {
  try {
    assert.deepStrictEqual(list1, list2);
    return true;
  } catch (error) {
    return false;
  }
};

class Cycler {
  constructor(list) {
    this.list = list;
    this.index = 0;
  }

  current() {
    return this.list[this.index];
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