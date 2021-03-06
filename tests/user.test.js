const assert = require('assert');
const firebase = require('../fire');
const { createUser, removeUser } = require('../modules/user');

describe('Tests for user module', () => {
  it('should create a user in the firebase database', () => {
    const dummyId = 'create-user-test-id';
    createUser(dummyId, 'create-user-test');
    const currUser = firebase.ref(`users/${dummyId}`);
    if (!currUser) {
      assert(null);
    }
    firebase.ref(`users/${dummyId}`).remove();
  });

  it('should remove a user in the firebase database', () => {
    const dummyId = 'remove-user-test-id';

    // Add a dummy user to remove
    firebase.ref(`users/${dummyId}`).set({
      username: 'remove-user-test',
    });

    removeUser(dummyId);

    firebase.ref(`users/${dummyId}`);
  });

  it('should fail to remove an non-existant user without error', () => {
    const dummyId = 'remove-fake-user-test-id';
    removeUser(dummyId);
  });
});
