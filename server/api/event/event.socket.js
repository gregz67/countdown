/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var EventSchema = require('./event.schema.js');

exports.register = function(socket) {
  EventSchema.post('save', function (doc) {
    onSave(socket, doc);
  });
  EventSchema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('event:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('event:remove', doc);
}