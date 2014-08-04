'use strict';

var _ = require('lodash');
var Event = require('./event.schema.js');
var User = require('../user/user.model.js');

// Get list of events
exports.index = function(req, res) {
  return res.json(200, req.user.events);
};

// Get a single event
// TODO need test
exports.show = function(req, res) {
  var event = req.user.events.id(req.params.id);
  if (event === null) {
    return res.send(404);
  } else {
    return res.json(200, event);
  }
};

// Creates a new event on the user.
exports.create = function(req, res) {
  var event = req.body;
  req.user.events.push(event);
  req.user.save(function(err) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, event);
  });
};

// Updates an existing event on the user.
// TODO: need test
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  var event = req.user.events.id(req.params.id);
  if (event === null) {
    return res.send(404);
  } else {
    var updated = _.merge(event, req.body);
    req.user.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, event);
    });
  }
};

// Deletes a event from the user.
// TODO need test
exports.destroy = function(req, res) {
  var event = req.user.events.id(req.params.id);

  if (event === null) {
    return res.send(404);
  } else {
    event.remove();
    req.user.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    })
  }
};

function handleError(res, err) {
  return res.send(500, err);
}