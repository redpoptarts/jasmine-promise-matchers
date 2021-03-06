'use strict';

describe('Promise Matcher tests', function () {

  var deferred;

  beforeEach(inject(function($q) {
    deferred = $q.defer();
  }));

  afterEach(inject(function($injector) {
  }));

  it('should recognized already-resolved promises as being resolved', function() {
    deferred.resolve();

    expect(deferred.promise).toBeResolved();
  });

  it('should recognized already-resolved promises as being resolved with expected arguments', function() {
    deferred.resolve('foobar');

    expect(deferred.promise).toBeResolvedWith('foobar');
  });

  it('should not accept rejected promises as resolved', function() {
    deferred.reject();

    expect(deferred.promise).not.toBeResolved();
  });

  it('should not accept promises resolved with unexpected arguments', function() {
    deferred.resolve('foo');

    expect(deferred.promise).not.toBeResolvedWith('bar');
  });

  it('should allow usage of matchers in expectations in already-resolved', function() {
    deferred.resolve({someProperty: 'someValue', somethingElse: 'dontCare'});

    expect(deferred.promise).toBeResolvedWith(jasmine.objectContaining({someProperty: 'someValue'}));
  });

  it('should recognized already-rejected promises as being rejected', function() {
    deferred.reject();

    expect(deferred.promise).toBeRejected();
  });

  it('should recognized already-rejected promises as being rejected with expected arguments', function() {
    deferred.reject('foobar');

    expect(deferred.promise).toBeRejectedWith('foobar');
  });

  it('should allow usage of matchers in expectations in already-rejected', function() {
    deferred.reject({someProperty: 'someValue', somethingElse: 'dontCare'});

    expect(deferred.promise).toBeRejectedWith(jasmine.objectContaining({someProperty: 'someValue'}));
  });

  it('should not accept resolved promises as rejected', function() {
    deferred.resolve();

    expect(deferred.promise).not.toBeRejected();
  });

  it('should not accept promises rejected with unexpected arguments', function() {
    deferred.reject('foo');

    expect(deferred.promise).not.toBeRejectedWith('bar');
  });
});
