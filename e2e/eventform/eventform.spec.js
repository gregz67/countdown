'use strict';

describe('Event Form', function() {
  var loginpage, mainpage, startCount;

  beforeEach(function() {
    browser.get('/login');
    loginpage = require('./../login.po.js');

    loginpage.emailInput.sendKeys('test@test.com');
    loginpage.passwordInput.sendKeys('test');
    loginpage.loginBtn.click();

    mainpage = require('./eventform.po.js');

    mainpage.eventsList.count().then(function(count) {
      startCount = count;
    });
  });

  afterEach(function() {
    mainpage.logoutEl.click();
  })

  it('should render a name/date field with datepicker button', function() {
    expect(mainpage.newEventNameInput.isPresent()).toBeTruthy();
    expect(mainpage.newEventDateInput.isPresent()).toBeTruthy();
    expect(mainpage.newEventDatePickerButton.isPresent()).toBeTruthy();
  });

  it('should display datepicker when datepicker is clicked', function() {
    expect(mainpage.newEventDatePicker.isDisplayed()).toBeFalsy();
    mainpage.newEventDatePickerButton.click();
    expect(mainpage.newEventDatePicker.isDisplayed()).toBeTruthy();
  });

  it('should not add event when name is empty', function() {
    mainpage.newEventDateInput.sendKeys('May 3, 2015');
    mainpage.newEventSubmitButton.click();
    mainpage.eventsList.count().then(function(count) {
      expect(count).toEqual(startCount);
    });
  });

  it('should not add event when date is empty', function() {
    mainpage.newEventNameInput.sendKeys('Birthday!');
    mainpage.newEventDateInput.sendKeys('');
    mainpage.newEventSubmitButton.click();
    mainpage.eventsList.count().then(function(count) {
      expect(count).toEqual(startCount);
    });
  });

  it('should add an event when submit is clicked', function() {
    mainpage.newEventNameInput.sendKeys('Birthday!');
    mainpage.newEventDateInput.sendKeys('May 3, 2015');
    mainpage.newEventSubmitButton.click().then(function() {
      // get new count of events
      mainpage.eventsList.count().then(function(count) {
        expect(count).toEqual(startCount + 1);
      });
    });
  });
});
