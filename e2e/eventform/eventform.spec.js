'use strict';

describe('Event Form', function() {
  var page, startCount;

  beforeEach(function() {
    browser.get('/');
    page = require('./eventform.po.js');

    page.eventsList.count().then(function(count) {
      startCount = count;
    });
  });

  it('should render a name/date field with datepicker button', function() {
    expect(page.newEventNameInput.isPresent()).toBeTruthy();
    expect(page.newEventDateInput.isPresent()).toBeTruthy();
    expect(page.newEventDatePickerButton.isPresent()).toBeTruthy();
  });

  it('should display datepicker when datepicker is clicked', function() {
    expect(page.newEventDatePicker.isDisplayed()).toBeFalsy();
    page.newEventDatePickerButton.click();
    expect(page.newEventDatePicker.isDisplayed()).toBeTruthy();
  });

  it('should not add event when name is empty', function() {
    page.newEventDateInput.sendKeys('May 3, 2015');
    page.newEventSubmitButton.click();
    page.eventsList.count().then(function(count) {
      expect(count).toEqual(startCount);
    });
  });

  it('should not add event when date is empty', function() {
    page.newEventNameInput.sendKeys('Birthday!');
    page.newEventDateInput.sendKeys('');
    page.newEventSubmitButton.click();
    page.eventsList.count().then(function(count) {
      expect(count).toEqual(startCount);
    });
  });

  it('should add an event when submit is clicked', function() {
    page.newEventNameInput.sendKeys('Birthday!');
    page.newEventDateInput.sendKeys('May 3, 2015');
    page.newEventSubmitButton.click().then(function() {
      // get new count of events
      page.eventsList.count().then(function(count) {
        expect(count).toEqual(startCount + 1);
      });
    });
  });
});
