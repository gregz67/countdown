'use strict';

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/awesomeThings', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/awesomeThings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/events', function() {

  it('should respond with a json array of events', function(done) {
    request(app)
      .get('/api/events')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(1);
        var event = new Date(res.body[0]);
        event.should.be.instanceof(Date);
        done();
      });
  });

});