'use strict';

var mongoose = require('mongoose');
var expect = require('chai').expect;

var EventSchema = require('./event.schema.js');
var Event = mongoose.model('Event', EventSchema);
var app = require('../../app');
var request = require('supertest');

var event;

describe('Event Schema', function() {

  before(function(done) {
    request(app);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    event = new Event({
      name: 'Tomorrow',
      date: tomorrow
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

  it('should contain a date field', function(done) {
    event.save(function(err, event) {
      expect(err).to.not.exist;
      expect(event).to.have.property('date');
      expect(event.date).to.be.an.instanceof(Date);
      done();
    });
  });

  it('should fail when saving with a blank name', function(done) {
    event.name = '';
    event.save(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('should fail when saving when a date in the past', function(done) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    event = new Event({
      name: 'Yesterday',
      date: yesterday
    });
    event.save(function(err) {
      expect(err).to.exist;
      done();
    });
  });

});
