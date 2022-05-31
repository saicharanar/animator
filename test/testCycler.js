const assert = require("assert");
const { Cycler } = require("../src/Cycler");

describe('Cycler', () => {
  it('Should validate the object is a Cycler', () => {
    const c1 = new Cycler(['a', 'b']);
    const c2 = new Cycler(['a', 'b']);
    assert.ok(c1.equals(c2));
  });

  describe('Cycler current element', () => {
    it('Should give current item of the list', () => {
      const list = new Cycler(['a', 'b']);
      assert.equal(list.current(), 'a');
    });
  });

  describe('Cycler next element', () => {
    it('Should give next item of the list', () => {
      const list = new Cycler(['a', 'b']);
      list.next();
      assert.equal(list.current(), 'b');
    });
  });
});