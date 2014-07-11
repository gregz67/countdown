/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.imgEl = this.heroEl.element(by.css('img'));
  this.anchorEl = this.heroEl.element(by.css('a'));

  this.repeater = by.repeater('thing in awesomeThings');
  this.firstAwesomeThingNameEl = element(this.repeater.row(0).column('{{thing.name}}'));
  this.awesomeThingsCount = element.all(this.repeater).count();

  this.newThing = element(by.model('newThing'));

  this.eventRepeater = by.repeater('event in events');
  this.firstEventNameEl = element(this.eventRepeater.row(0).column('{{event.name}}'));
  this.eventsCount = element.all(this.eventRepeater).count();

  this.newEventNameInput = element(by.model('newEvent.name'));
  this.newEventDateInput = element(by.model('newEvent.date'));
  this.newEventDatePickerButton = element(by.css('.glyphicon-calendar'));

};

module.exports = new MainPage();

