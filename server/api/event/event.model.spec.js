'use strict';

var expect = require('chai').expect;
var Event = require('./event.model');

var event;

describe('Event Model', function() {

  before(function(done) {
    event = new Event({
      name: 'Now',
      date: Date.now()
    });

    Event.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function() {
    Event.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no events', function(done) {
    Event.find({}, function(err, events) {
      expect(events).to.have.length(0);
      done();
    });
  });

  it('should contain a date field', function(done) {
    event.save(function(err, event) {
      expect(err).to.not.exist;
      expect(event).to.have.property('date');
      expect(event.date).to.be.an.instanceof(Date);
      done();
    });
  });
});