'use strict';

var should = require('chai').should();
var expect = require('chai').expect;

var User = require('./user.model');
var app = require('../../app');
var request = require('supertest');

var user;

describe('User Model', function() {

  beforeEach(function(done) {
    request(app);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    user = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password',
      events: [
        {
          name: 'Tomorrow',
          date: tomorrow
        }
      ]
    });

    // Clear users before testing
    User.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function(err) {
      var userDup = new User(user);
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it("should authenticate user if password is valid", function() {
    user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    user.authenticate('blah').should.not.be.true;
  });

  it("should include event embedded documents", function(done) {
    user.save(function(err) {
      should.not.exist(err);
      expect(user.events).to.be.an.instanceof(Array);
      done();
    });
  });

});
