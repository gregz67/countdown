'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  date: Date
});

module.exports = mongoose.model('Event', EventSchema);

/**
 * Validations
 */
EventSchema.path('name').validate(function(name) {
  return name.length;
});
EventSchema.path('date').validate(function(date) {
  var now = new Date();
  return (date - now) > 0;
}, 'Date cannot be in the past');