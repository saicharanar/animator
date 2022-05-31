const assert = require("assert");

const asserter = (list1, list2) => {
  try {
    assert.deepStrictEqual(list1, list2);
    return true;
  } catch (error) {
    return false;
  }
};
exports.asserter = asserter;
