const assert = require('assert');

describe('null', () => {
  it('ensure testing file is connected correctly', () => {
      assert.equal('test', 'test');
  })
});

describe('null', () => {
  it('THIS SHOULD FAIL', () => {
      assert.equal('test', 'nottest');
  })
});
