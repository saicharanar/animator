const assert = require("assert");
const { Animation } = require("../src/animation");

describe('Animation', () => {
  it('Should validate the object is an animation', () => {
    const a1 = new Animation(['a', 'b']);
    const a2 = new Animation(['a', 'b']);
    assert.ok(a1.equals(a2));
  });

  describe('Animation draw', () => {
    const frames = new Animation([1, 2]);

    it('Should give the current frame of the frames', () => {
      const expected = '<img src="1"></img>'
      assert.strictEqual(frames.draw(), expected);
    });

    it('Should give the next frame of the frames', () => {
      const expected = '<img src="2"></img>'
      assert.strictEqual(frames.draw(), expected);
    });
  });
});