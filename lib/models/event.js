'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
  name: String,
  date: String
});

/**
 * Validations
 */
EventSchema.path('date').validate(function (date) {
  return !isNaN(Date.parse(date));
}, 'Events must have a valid date');

mongoose.model('Event', EventSchema);
