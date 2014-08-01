/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.signup = this.heroEl.element(by.css('a[href="/signup"]'));
  this.login = this.heroEl.element(by.css('a[href="/login"]'));
  this.imgEl = this.heroEl.element(by.css('img'));
  this.logoutEl = element(by.css('[ng-click="logout()"]'));

  this.eventRepeater = by.repeater('event in events');
  this.firstEventNameEl = element(this.eventRepeater.row(0).column('{{event.name}}'));

  this.newEventForm = element(by.css('.event-form'));

};

module.exports = new MainPage();

