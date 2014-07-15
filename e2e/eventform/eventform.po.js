/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var EventForm = function() {

  this.eventsList = element.all(by.repeater('event in events'));

  this.newEventForm = element(by.css('.event-form'));

  this.newEventNameInput = this.newEventForm.element(by.model('newEvent.name'));
  this.newEventDateInput = this.newEventForm.element(by.model('newEvent.date'));
  this.newEventDatePickerButton = this.newEventForm.element(by.css('[ng-click="datepicker.open($event)"]'));

  this.newEventDatePicker = this.newEventForm.element(by.css('.dropdown-menu'));

  this.newEventSubmitButton = this.newEventForm.element(by.css('[ng-click="addEvent()"]'));
};

module.exports = new EventForm();

