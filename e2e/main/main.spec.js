'use strict';

describe('Main View (logged out)', function() {
  var mainpage;

  beforeEach(function() {
    browser.get('/');
    mainpage = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(mainpage.h1El.getText()).toBe('Countdown');
    expect(mainpage.signup.isPresent()).toBe(true);
    expect(mainpage.login.isPresent()).toBe(true);
    expect(mainpage.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    expect(mainpage.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });

});

describe('Main View (logged in)', function() {
  var mainpage, loginpage;

  beforeEach(function() {
    browser.get('/login');
    loginpage = require('./../login.po.js');

    loginpage.emailInput.sendKeys('test@test.com');
    loginpage.passwordInput.sendKeys('test');
    loginpage.loginBtn.click();

    mainpage = require('./main.po');

  });

  afterEach(function() {
    mainpage.logoutEl.click();
  });

  it('should render events', function() {
    expect(mainpage.firstEventNameEl.getText()).toContain('Christmas');
  });

  it('should render a newEvent form', function() {
    expect(mainpage.newEventForm.isPresent()).toBe(true);
  });

});