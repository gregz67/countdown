/**
 * This file uses the Page Object pattern to define the login page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var LoginPage = function() {
  this.emailInput = element(by.model('user.email'));
  this.passwordInput = element(by.model('user.password'));
  this.loginBtn = element(by.css('button[type="submit"]'));

};

module.exports = new LoginPage();

