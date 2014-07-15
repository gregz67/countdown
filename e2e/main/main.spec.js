'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('\'Allo, \'Allo!');
    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });

  it('should render awesomeThings', function() {
    expect(page.firstAwesomeThingNameEl.getText()).toContain('Development Tools');
    page.awesomeThingsCount.then(function(count) {
      expect(count).toBe(6);
    });
  });

  it('should render a newThing form', function() {
    expect(page.newThing.isPresent()).toBe(true);
    expect(page.newThing.getAttribute('placeholder')).toContain('new thing');
  });

  it('should render events', function() {
    expect(page.firstEventNameEl.getText()).toContain('Christmas');
    page.eventsCount.then(function(count) {
      expect(count).toBe(2);
    });
  });

  it('should render a newEvent form with a datepicker', function() {
    expect(page.newEventNameInput.isPresent()).toBe(true);
    expect(page.newEventDateInput.isPresent()).toBe(true);
    expect(page.newEventDatePickerButton.isPresent()).toBe(true);
  });

  

});
