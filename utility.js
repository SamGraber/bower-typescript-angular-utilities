// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var array;
        (function (array_1) {
            'use strict';
            array_1.moduleName = 'rl.utilities.array';
            array_1.serviceName = 'arrayUtility';
            var ArrayUtility = (function () {
                function ArrayUtility() {
                }
                ArrayUtility.prototype.findIndexOf = function (array, predicate) {
                    var targetIndex;
                    _.each(array, function (item, index) {
                        if (predicate(item)) {
                            targetIndex = index;
                            return false;
                        }
                    });
                    return targetIndex != null ? targetIndex : -1;
                };
                ArrayUtility.prototype.remove = function (array, item) {
                    var index;
                    if (_.isFunction(item)) {
                        index = this.findIndexOf(array, item);
                    }
                    else {
                        index = _.indexOf(array, item);
                    }
                    if (index >= 0) {
                        return array.splice(index, 1)[0];
                    }
                    else {
                        return null;
                    }
                };
                ArrayUtility.prototype.replace = function (array, oldItem, newItem) {
                    var index = _.indexOf(array, oldItem);
                    if (index >= 0) {
                        array.splice(index, 1, newItem);
                    }
                };
                ArrayUtility.prototype.sum = function (array, transform) {
                    var list;
                    if (transform != null) {
                        list = _.map(array, function (item) { return transform(item); });
                    }
                    else {
                        list = array;
                    }
                    return _.reduce(list, function (sum, num) { return sum + num; }, 0);
                };
                ArrayUtility.prototype.toDictionary = function (array, keySelector) {
                    return _.reduce(array, function (dictionary, item) {
                        dictionary[keySelector(item)] = item;
                        return dictionary;
                    }, []);
                };
                return ArrayUtility;
            })();
            angular.module(array_1.moduleName, [])
                .service(array_1.serviceName, ArrayUtility);
        })(array = utilities.array || (utilities.array = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var observable;
        (function (observable) {
            'use strict';
            observable.moduleName = 'rl.utilities.observable';
            observable.serviceName = 'observableFactory';
            var ObservableService = (function () {
                function ObservableService() {
                    this.watchers = [];
                    this.nextKey = 0;
                }
                ObservableService.prototype.register = function (action, event) {
                    var _this = this;
                    if (!_.isFunction(action)) {
                        console.log('Error: watcher must be a function');
                        return null;
                    }
                    var currentKey = this.nextKey;
                    this.nextKey++;
                    this.watchers[currentKey] = {
                        action: action,
                        event: event,
                    };
                    return function () {
                        _this.unregister(currentKey);
                    };
                };
                ObservableService.prototype.fire = function (event) {
                    var _this = this;
                    var params = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        params[_i - 1] = arguments[_i];
                    }
                    _.each(this.watchers, function (watcher) {
                        if (watcher != null && watcher.event === event) {
                            watcher.action.apply(_this, params);
                        }
                    });
                };
                ObservableService.prototype.unregister = function (key) {
                    this.watchers[key] = null;
                };
                return ObservableService;
            })();
            function observableServiceFactory() {
                'use strict';
                return {
                    getInstance: function () {
                        return new ObservableService();
                    }
                };
            }
            angular.module(observable.moduleName, [])
                .factory(observable.serviceName, observableServiceFactory);
        })(observable = utilities.observable || (utilities.observable = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/jquery
// uses typings/lodash
/// <reference path='../observable/observable.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var contentProvider;
        (function (contentProvider) {
            'use strict';
            contentProvider.moduleName = 'rl21.services.contentProvider';
            contentProvider.serviceName = 'contentProviderFactory';
            var ContentProviderService = (function () {
                function ContentProviderService(observableFactory) {
                    var _this = this;
                    this.setTranscludeContent = function (transcludeFunction) {
                        if (_.isFunction(transcludeFunction)) {
                            transcludeFunction(function (clone) {
                                _this.setContent(clone);
                            });
                        }
                        else {
                            _this.setContent(null);
                        }
                    };
                    this.observable = observableFactory.getInstance();
                }
                ContentProviderService.prototype.setContent = function (content) {
                    this.content = content;
                    this.observable.fire('contentChanged');
                };
                ContentProviderService.prototype.register = function (action, selector) {
                    var _this = this;
                    if (this.content != null) {
                        action(this.getContent(selector));
                    }
                    return this.observable.register(function () {
                        action(_this.getContent(selector));
                    }, 'contentChanged');
                };
                ContentProviderService.prototype.getContent = function (selector) {
                    if (selector != null) {
                        return this.content.filter(selector);
                    }
                    return this.content;
                };
                return ContentProviderService;
            })();
            contentProviderServiceFactory.$inject = [utilities.observable.serviceName];
            function contentProviderServiceFactory(observableFactory) {
                'use strict';
                return {
                    getInstance: function () {
                        return new ContentProviderService(observableFactory);
                    }
                };
            }
            angular.module(contentProvider.moduleName, [utilities.observable.moduleName])
                .factory(contentProvider.serviceName, contentProviderServiceFactory);
        })(contentProvider = utilities.contentProvider || (utilities.contentProvider = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var date;
        (function (date) {
            'use strict';
            date.moduleName = 'rl.utilities.date';
            date.serviceName = 'dateUtility';
            var DateUtility = (function () {
                function DateUtility() {
                    var _this = this;
                    this.month = [
                        { name: 'January', days: function () { return 31; } },
                        { name: 'February', days: function (year) { return _this.isLeapYear(year) ? 29 : 28; } },
                        { name: 'March', days: function () { return 31; } },
                        { name: 'April', days: function () { return 30; } },
                        { name: 'May', days: function () { return 31; } },
                        { name: 'June', days: function () { return 30; } },
                        { name: 'July', days: function () { return 31; } },
                        { name: 'August', days: function () { return 31; } },
                        { name: 'September', days: function () { return 30; } },
                        { name: 'October', days: function () { return 31; } },
                        { name: 'November', days: function () { return 30; } },
                        { name: 'December', days: function () { return 31; } },
                    ];
                }
                DateUtility.prototype.isLeapYear = function (year) {
                    return new Date(year, 1, 29).getMonth() === 1;
                };
                DateUtility.prototype.getFullString = function (month) {
                    return this.month[month].name;
                };
                DateUtility.prototype.getDays = function (month, year) {
                    return this.month[month].days(year);
                };
                return DateUtility;
            })();
            angular.module(date.moduleName, [])
                .service(date.serviceName, DateUtility);
        })(date = utilities.date || (utilities.date = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/jquery
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var jquery;
        (function (jquery) {
            'use strict';
            jquery.moduleName = 'rl.utilities.jquery';
            jquery.serviceName = 'jqueryUtility';
            var JQueryUtility = (function () {
                function JQueryUtility() {
                }
                JQueryUtility.prototype.replaceContent = function (contentArea, newContent) {
                    contentArea.empty();
                    contentArea.append(newContent);
                };
                return JQueryUtility;
            })();
            angular.module(jquery.moduleName, [])
                .service(jquery.serviceName, JQueryUtility);
        })(jquery = utilities.jquery || (utilities.jquery = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var number;
        (function (number) {
            'use strict';
            number.moduleName = 'rl.utilities.number';
            number.serviceName = 'numberUtility';
            var Sign;
            (function (Sign) {
                Sign[Sign["positive"] = 1] = "positive";
                Sign[Sign["negative"] = -1] = "negative";
            })(Sign || (Sign = {}));
            var NumberUtility = (function () {
                function NumberUtility() {
                }
                NumberUtility.prototype.preciseRound = function (num, decimals) {
                    var sign = num >= 0 ? Sign.positive : Sign.negative;
                    return (Math.round((num * Math.pow(10, decimals)) + (sign * 0.001)) / Math.pow(10, decimals));
                };
                return NumberUtility;
            })();
            angular.module(number.moduleName, [])
                .service(number.serviceName, NumberUtility);
        })(number = utilities.number || (utilities.number = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var object;
        (function (object_1) {
            'use strict';
            object_1.moduleName = 'rl.utilities.object';
            object_1.serviceName = 'objectUtility';
            var ObjectUtility = (function () {
                function ObjectUtility() {
                }
                ObjectUtility.prototype.isNullOrEmpty = function (object) {
                    if (object == null) {
                        return true;
                    }
                    else if (_.isArray(object)) {
                        return _.any(object) === false;
                    }
                    else if (_.isNumber(object)) {
                        return _.isNaN(object);
                    }
                    else {
                        return object === '';
                    }
                };
                ObjectUtility.prototype.isNullOrWhitespace = function (object) {
                    if (_.isString(object)) {
                        object = object.trim();
                    }
                    return this.isNullOrEmpty(object);
                };
                return ObjectUtility;
            })();
            angular.module(object_1.moduleName, [])
                .service(object_1.serviceName, ObjectUtility);
        })(object = utilities.object || (utilities.object = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var parentChildBehavior;
        (function (parentChildBehavior) {
            'use strict';
            parentChildBehavior.moduleName = 'rl21.services.parentChildBehavior';
            parentChildBehavior.serviceName = 'parentChildBehavior';
            var ParentChildBehaviorService = (function () {
                function ParentChildBehaviorService() {
                }
                ParentChildBehaviorService.prototype.getChildBehavior = function (child) {
                    return child && child.viewData != null
                        ? child.viewData.behavior
                        : null;
                };
                ParentChildBehaviorService.prototype.getAllChildBehaviors = function (childList) {
                    var _this = this;
                    return _(childList).map(function (child) { return _this.getChildBehavior(child); })
                        .filter(function (behavior) { return behavior != null; })
                        .value();
                };
                ParentChildBehaviorService.prototype.registerChildBehavior = function (child, behavior) {
                    if (child == null) {
                        return;
                    }
                    if (child.viewData == null) {
                        child.viewData = { behavior: null };
                    }
                    var currentBehavior = child.viewData.behavior;
                    if (currentBehavior == null) {
                        child.viewData.behavior = behavior;
                    }
                    else {
                        child.viewData.behavior = _.extend(currentBehavior, behavior);
                    }
                };
                return ParentChildBehaviorService;
            })();
            angular.module(parentChildBehavior.moduleName, [])
                .service(parentChildBehavior.serviceName, ParentChildBehaviorService);
        })(parentChildBehavior = utilities.parentChildBehavior || (utilities.parentChildBehavior = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var promise;
        (function (promise_1) {
            'use strict';
            promise_1.moduleName = 'rl.utilities.promise';
            promise_1.serviceName = 'promiseUtility';
            var PromiseUtility = (function () {
                function PromiseUtility() {
                }
                PromiseUtility.prototype.isPromise = function (promise) {
                    return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
                };
                return PromiseUtility;
            })();
            angular.module(promise_1.moduleName, [])
                .service(promise_1.serviceName, PromiseUtility);
        })(promise = utilities.promise || (utilities.promise = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
/// <reference path='../object/object.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var truncate;
        (function (truncate_1) {
            'use strict';
            truncate_1.moduleName = 'rl21.components.truncate';
            truncate_1.serviceName = 'truncate';
            truncate_1.filterName = truncate_1.serviceName + 'Filter';
            truncate.$inject = [utilities.object.serviceName];
            function truncate(objectUtility) {
                'use strict';
                return function (input, truncateTo, includeEllipses) {
                    includeEllipses = includeEllipses == null ? false : includeEllipses;
                    var out = objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
                    if (out.length) {
                        if (truncateTo != null && out.length > truncateTo) {
                            out = out.substring(0, truncateTo);
                            if (includeEllipses) {
                                out += '...';
                            }
                        }
                    }
                    return out;
                };
            }
            angular.module(truncate_1.moduleName, [utilities.object.moduleName])
                .filter(truncate_1.serviceName, truncate);
        })(truncate = utilities.truncate || (utilities.truncate = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='array/array.service.ts' />
/// <reference path='contentProvider/contentProvider.service.ts' />
/// <reference path='date/date.service.ts' />
/// <reference path='jquery/jquery.service.ts' />
/// <reference path='number/number.service.ts' />
/// <reference path='object/object.service.ts' />
/// <reference path='observable/observable.service.ts' />
/// <reference path='parentChildBehavior/parentChildBehavior.service.ts' />
/// <reference path='promise/promise.service.ts' />
/// <reference path='truncate/truncate.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        utilities.moduleName = 'rl.utilities';
        angular.module(name, [
            utilities.array.moduleName,
            utilities.contentProvider.moduleName,
            utilities.date.moduleName,
            utilities.jquery.moduleName,
            utilities.number.moduleName,
            utilities.object.moduleName,
            utilities.observable.moduleName,
            utilities.parentChildBehavior.moduleName,
            utilities.promise.moduleName,
            utilities.truncate.moduleName,
        ]);
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
// uses typings/angularMocks
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var test;
        (function (test) {
            var AngularFixture = (function () {
                function AngularFixture() {
                }
                AngularFixture.prototype.inject = function () {
                    var serviceNames = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        serviceNames[_i - 0] = arguments[_i];
                    }
                    // object that will contain all of the services requested
                    var services = {};
                    // clone the array and add a function that iterates over the original array
                    // this avoids iterating over the function itself
                    var injectParameters = _.clone(serviceNames);
                    injectParameters.push(function () {
                        var injectedServices = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            injectedServices[_i - 0] = arguments[_i];
                        }
                        // should get called with the services injected by angular
                        // we'll add these to services using the serviceName as the key
                        _.each(serviceNames, function (service, index) {
                            services[service] = injectedServices[index];
                        });
                    });
                    angular.mock.inject(injectParameters);
                    return services;
                };
                AngularFixture.prototype.mock = function (mocks) {
                    angular.mock.module(function ($provide) {
                        _.each(mocks, function (value, key) {
                            $provide.value(key.toString(), value);
                        });
                    });
                };
                AngularFixture.prototype.controller = function (controllerName, scope, locals) {
                    var services = this.inject('$rootScope', '$controller');
                    var $rootScope = services.$rootScope;
                    var $controller = services.$controller;
                    scope = _.extend($rootScope.$new(), scope);
                    if (locals == null) {
                        locals = {};
                    }
                    locals.$scope = scope;
                    return {
                        scope: scope,
                        controller: $controller(controllerName, locals),
                    };
                };
                AngularFixture.prototype.directive = function (dom) {
                    var services = this.inject('$rootScope', '$compile');
                    var $rootScope = services.$rootScope;
                    var $compile = services.$compile;
                    angular.mock.module('renovoTemplates');
                    var component = $compile(dom)($rootScope);
                    $rootScope.$digest();
                    return {
                        directive: component,
                        scope: component.isolateScope(),
                    };
                };
                return AngularFixture;
            })();
            test.angularFixture = new AngularFixture();
        })(test = utilities.test || (utilities.test = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='array.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('arrayUtility', function () {
    var arrayUtility;
    beforeEach(function () {
        angular.mock.module(rl.utilities.array.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.array.serviceName);
        arrayUtility = services[rl.utilities.array.serviceName];
    });
    describe('findIndexOf', function () {
        it('should find the index of the first item in array that matches the predicate', function () {
            var array = [1, 2, 3, 4, 5];
            expect(arrayUtility.findIndexOf(array, function (item) { return (item % 2) === 0; })).to.equal(1);
            expect(arrayUtility.findIndexOf(array, function (item) { return (item > 10); })).to.equal(-1);
        });
    });
    describe('remove', function () {
        it('should remove the specified item from the array and return the item', function () {
            var array = [1, 2, 3, 4, 5];
            expect(arrayUtility.remove(array, 3)).to.equal(3);
            expect(array.length).to.equal(4);
            expect(arrayUtility.remove(array, 10)).to.not.exist;
        });
        it('should remove the first item matching the predicate and return it', function () {
            var array = [1, 2, 3, 4, 5];
            expect(arrayUtility.remove(array, function (item) { return (item > 3); })).to.equal(4);
            expect(array.length).to.equal(4);
            expect(arrayUtility.remove(array, function (item) { return (item > 10); })).to.not.exist;
        });
    });
    describe('replace', function () {
        it('should replace an item in the array with another item', function () {
            var arrayWithItems = [3, 5, 7];
            arrayUtility.replace(arrayWithItems, 5, 10);
            expect(arrayWithItems[0]).to.equal(3);
            expect(arrayWithItems[1]).to.equal(10);
            expect(arrayWithItems[2]).to.equal(7);
        });
        it('should do nothing if the item to replace is not found', function () {
            var arrayWithItems = [4, 6, 8];
            arrayUtility.replace(arrayWithItems, 5, 10);
            expect(arrayWithItems[0]).to.equal(4);
            expect(arrayWithItems[1]).to.equal(6);
            expect(arrayWithItems[2]).to.equal(8);
        });
    });
    describe('sum', function () {
        it('should sum the values in an array', function () {
            var values = [1, 2, 3, 4, 5];
            expect(arrayUtility.sum(values)).to.equal(15);
        });
        it('should apply a transform to the values before summing them', function () {
            var values = [{ prop: 1 }, { prop: 4 }, { prop: 7 }];
            var transform = function (item) { return item.prop; };
            expect(arrayUtility.sum(values, transform)).to.equal(12);
        });
        it('should return 0 if there are no items to sum', function () {
            var values = [];
            expect(arrayUtility.sum(values)).to.equal(0);
        });
    });
    describe('toDictionary', function () {
        it('should convert an array to a dictionary', function () {
            var array = [
                { key: 11 },
                { key: 12 },
                { key: 13 },
                { key: 14 },
                { key: 15 },
            ];
            var dictionary = arrayUtility.toDictionary(array, function (item) { return item.key; });
            expect(dictionary[11]).to.equal(array[0]);
            expect(dictionary[12]).to.equal(array[1]);
            expect(dictionary[13]).to.equal(array[2]);
            expect(dictionary[14]).to.equal(array[3]);
            expect(dictionary[15]).to.equal(array[4]);
        });
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='contentProvider.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('contentProvider', function () {
    var contentProvider;
    var transcludeSpy;
    var filterSpy;
    var jqueryClone;
    beforeEach(function () {
        angular.mock.module(rl.utilities.contentProvider.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.contentProvider.serviceName);
        var contentProviderFactory = services[rl.utilities.contentProvider.serviceName];
        contentProvider = contentProviderFactory.getInstance();
        jqueryClone = {};
        filterSpy = sinon.spy(function (object) { return object; });
        jqueryClone.filter = filterSpy;
        transcludeSpy = sinon.spy(function (func) { return func(jqueryClone); });
    });
    it('should get the content that was set by setContent', function () {
        contentProvider.setContent(jqueryClone);
        expect(contentProvider.getContent()).to.equal(jqueryClone);
    });
    it('should set the content to the content provided by the transclude function', function () {
        contentProvider.setTranscludeContent(transcludeSpy);
        sinon.assert.calledOnce(transcludeSpy);
        expect(contentProvider.getContent()).to.equal(jqueryClone);
    });
    it('should filter the jquery object with the specified selector', function () {
        contentProvider.setContent(jqueryClone);
        contentProvider.getContent('selector');
        sinon.assert.calledOnce(filterSpy);
        sinon.assert.calledWith(filterSpy, 'selector');
    });
    it('should call the action with the new content when the content changes', function () {
        var actionSpy = sinon.spy();
        contentProvider.register(actionSpy);
        contentProvider.setContent(jqueryClone);
        sinon.assert.calledOnce(actionSpy);
        sinon.assert.calledWith(actionSpy, jqueryClone);
    });
    it('should call the action immediately if there is already content', function () {
        var actionSpy = sinon.spy();
        contentProvider.setContent(jqueryClone);
        contentProvider.register(actionSpy);
        sinon.assert.calledOnce(actionSpy);
        sinon.assert.calledWith(actionSpy, jqueryClone);
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='date.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('dateUtility', function () {
    var dateUtility;
    beforeEach(function () {
        angular.mock.module(rl.utilities.date.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.date.serviceName);
        dateUtility = services[rl.utilities.date.serviceName];
    });
    describe('getFullString', function () {
        it('should get the month name', function () {
            expect(dateUtility.getFullString(0)).to.equal('January');
            expect(dateUtility.getFullString(1)).to.equal('February');
            expect(dateUtility.getFullString(2)).to.equal('March');
            expect(dateUtility.getFullString(3)).to.equal('April');
            expect(dateUtility.getFullString(4)).to.equal('May');
            expect(dateUtility.getFullString(5)).to.equal('June');
            expect(dateUtility.getFullString(6)).to.equal('July');
            expect(dateUtility.getFullString(7)).to.equal('August');
            expect(dateUtility.getFullString(8)).to.equal('September');
            expect(dateUtility.getFullString(9)).to.equal('October');
            expect(dateUtility.getFullString(10)).to.equal('November');
            expect(dateUtility.getFullString(11)).to.equal('December');
        });
    });
    describe('getDays', function () {
        it('should get the number of days in the month', function () {
            expect(dateUtility.getDays(0)).to.equal(31);
            expect(dateUtility.getDays(2)).to.equal(31);
            expect(dateUtility.getDays(3)).to.equal(30);
            expect(dateUtility.getDays(4)).to.equal(31);
            expect(dateUtility.getDays(5)).to.equal(30);
            expect(dateUtility.getDays(6)).to.equal(31);
            expect(dateUtility.getDays(7)).to.equal(31);
            expect(dateUtility.getDays(8)).to.equal(30);
            expect(dateUtility.getDays(9)).to.equal(31);
            expect(dateUtility.getDays(10)).to.equal(30);
            expect(dateUtility.getDays(11)).to.equal(31);
        });
        it('should account for leap years', function () {
            expect(dateUtility.getDays(1, 2015)).to.equal(28);
            expect(dateUtility.getDays(1, 2016)).to.equal(29);
        });
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='jquery.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('jqueryUtility', function () {
    var jqueryUtility;
    var emptySpy;
    var appendSpy;
    beforeEach(function () {
        angular.mock.module(rl.utilities.jquery.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.jquery.serviceName);
        jqueryUtility = services.jqueryUtility;
        emptySpy = sinon.spy();
        appendSpy = sinon.spy();
    });
    it('should empty the existing content and append the new content', function () {
        var existingElement = {
            empty: emptySpy,
            append: appendSpy,
        };
        var newContent = {};
        jqueryUtility.replaceContent(existingElement, newContent);
        sinon.assert.calledOnce(emptySpy);
        sinon.assert.calledOnce(appendSpy);
        sinon.assert.calledWith(appendSpy, newContent);
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='number.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('numberUtility', function () {
    var numberUtility;
    beforeEach(function () {
        angular.mock.module(rl.utilities.number.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.number.serviceName);
        numberUtility = services[rl.utilities.number.serviceName];
    });
    describe('preciseRound', function () {
        it('should round 6 to 6', function () {
            var roundedNum = numberUtility.preciseRound(6, 2);
            expect(roundedNum).to.equal(6);
        });
        it('should round 1.275 to 1.28', function () {
            var roundedNum = numberUtility.preciseRound(1.275, 2);
            expect(roundedNum).to.equal(1.28);
        });
        it('should round 1.274 to 1.27', function () {
            var roundedNum = numberUtility.preciseRound(1.274, 2);
            expect(roundedNum).to.equal(1.27);
        });
        it('should round 1.55555555555555555555 to 1.5555555555555555556', function () {
            // 20 5's. This is the max precision precise_round is valid for
            var roundedNum = numberUtility.preciseRound(1.55555555555555555555, 19);
            expect(roundedNum).to.equal(1.5555555555555555556);
        });
        it('should round 1.999999999999999999999 to 2', function () {
            var roundedNum = numberUtility.preciseRound(1.999999999999999999999, 20); // 21 9's
            expect(roundedNum).to.equal(2);
        });
        it('should not round 1.111111111111111111111', function () {
            var roundedNum = numberUtility.preciseRound(1.111111111111111111111, 20); // 21 1's
            expect(roundedNum).to.equal(1.11111111111111111111); // trimmed 1 from the end
        });
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='object.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('objectUtility', function () {
    var objectUtility;
    beforeEach(function () {
        angular.mock.module(rl.utilities.object.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.object.serviceName);
        objectUtility = services[rl.utilities.object.serviceName];
    });
    describe('isNullOrEmpty', function () {
        it('should return true when null', function () {
            expect(objectUtility.isNullOrEmpty(null)).to.be.true;
        });
        it('should return true when empty', function () {
            expect(objectUtility.isNullOrEmpty('')).to.be.true;
        });
        it('should return false when string has contents', function () {
            expect(objectUtility.isNullOrEmpty('random string')).to.be.false;
        });
        it('should return true for null or empty arrays', function () {
            expect(objectUtility.isNullOrEmpty(null)).to.be.true;
            expect(objectUtility.isNullOrEmpty([])).to.be.true;
            expect(objectUtility.isNullOrEmpty([1, 2, 3])).to.be.false;
        });
        it('should return true if number type is not a number', function () {
            expect(objectUtility.isNullOrEmpty(Number.NaN)).to.be.true;
            expect(objectUtility.isNullOrEmpty(5)).to.be.false;
        });
    });
    describe('isNullOrWhitespace', function () {
        it('should return true for empty whitespace strings', function () {
            expect(objectUtility.isNullOrWhitespace('   ')).to.be.true;
        });
        it('should handle null and empty objects like isNullOrEmpty', function () {
            expect(objectUtility.isNullOrWhitespace(null)).to.equal(objectUtility.isNullOrEmpty(null));
            expect(objectUtility.isNullOrWhitespace([])).to.equal(objectUtility.isNullOrEmpty([]));
            expect(objectUtility.isNullOrWhitespace({})).to.equal(objectUtility.isNullOrEmpty({}));
            expect(objectUtility.isNullOrWhitespace('')).to.equal(objectUtility.isNullOrEmpty(''));
            expect(objectUtility.isNullOrWhitespace('random string')).to.equal(objectUtility.isNullOrEmpty('random string'));
        });
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='observable.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('observable', function () {
    var observable;
    beforeEach(function () {
        angular.mock.module(rl.utilities.observable.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.observable.serviceName);
        var observableFactory = services[rl.utilities.observable.serviceName];
        observable = observableFactory.getInstance();
    });
    it('should register a watcher and call the action when fire is called', function () {
        var func = sinon.spy();
        observable.register(func);
        observable.fire();
        sinon.assert.calledOnce(func);
    });
    it('should unregister only the indicated watcher', function () {
        var registeredFunc1 = sinon.spy();
        var unregisteredFunc = sinon.spy();
        var registeredFunc2 = sinon.spy();
        observable.register(registeredFunc1);
        var cancel = observable.register(unregisteredFunc);
        observable.register(registeredFunc2);
        cancel();
        observable.fire();
        sinon.assert.calledOnce(registeredFunc1);
        sinon.assert.notCalled(unregisteredFunc);
        sinon.assert.calledOnce(registeredFunc2);
    });
    it('should only call watcher registered with the specified event if fire is called with an event', function () {
        var funcWithEvent = sinon.spy();
        var funcWithoutEvent = sinon.spy();
        observable.register(funcWithEvent, 'myEvent');
        observable.register(funcWithoutEvent);
        observable.fire('myEvent');
        sinon.assert.notCalled(funcWithoutEvent);
        sinon.assert.calledOnce(funcWithEvent);
    });
    it('should not call watchers registered with a different event', function () {
        var func = sinon.spy();
        observable.register(func, 'myEvent');
        observable.fire('otherEvent');
        sinon.assert.notCalled(func);
    });
    it('should call the registered watchers with the additional params passed into the fire function', function () {
        var func = sinon.spy();
        observable.register(func, 'myEvent');
        observable.fire('myEvent', 1, 2, 3, 4, 5);
        sinon.assert.calledOnce(func);
        var args = func.firstCall.args;
        expect(args[0]).to.equal(1);
        expect(args[1]).to.equal(2);
        expect(args[2]).to.equal(3);
        expect(args[3]).to.equal(4);
        expect(args[4]).to.equal(5);
    });
    it('should return with an error if no function is provided', function () {
        var originalLog = console.log;
        var logSpy = sinon.spy();
        console.log = logSpy;
        var cancel = observable.register(null);
        sinon.assert.calledOnce(logSpy);
        sinon.assert.calledWith(logSpy, 'Error: watcher must be a function');
        expect(cancel).to.be.null;
        console.log = originalLog;
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='parentChildBehavior.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('parentChildBehavior', function () {
    var parentChildBehavior;
    beforeEach(function () {
        angular.mock.module(rl.utilities.parentChildBehavior.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.parentChildBehavior.serviceName);
        parentChildBehavior = services[rl.utilities.parentChildBehavior.serviceName];
    });
    describe('register', function () {
        it('should register a child behavior by putting it on the view data of the child', function () {
            var child = { viewData: null };
            var behavior = { action: function () { return 3; } };
            parentChildBehavior.registerChildBehavior(child, behavior);
            expect(child.viewData.behavior).to.equal(behavior);
        });
        it('should use the existing viewData object if one exists', function () {
            var childWithViewData = { viewData: { randomValue: 5 } };
            var behavior = { action: function () { return 5; } };
            parentChildBehavior.registerChildBehavior(childWithViewData, behavior);
            expect(childWithViewData.viewData.behavior).to.equal(behavior);
            expect(childWithViewData.viewData.randomValue).to.equal(5);
        });
        it('should not register child behavior if child object is null', function () {
            var behavior = { action: function () { return 3; } };
            var child = null;
            parentChildBehavior.registerChildBehavior(child, behavior);
            expect(parentChildBehavior.getChildBehavior(child)).to.be.null;
        });
    });
    describe('getChildBehavior', function () {
        it('should get the behavior of an individual child', function () {
            var behavior1 = { action: function () { return 3; } };
            var child = { viewData: { behavior: behavior1 } };
            expect(parentChildBehavior.getChildBehavior(child)).to.equal(behavior1);
        });
        it('should get existing behaviors for a list of children', function () {
            var behavior1 = { action: function () { return 3; } };
            var behavior2 = { action: function () { return 7; } };
            var childList = [
                { viewData: { behavior: behavior1 } },
                { viewData: { behavior: null } },
                { viewData: { behavior: behavior2 } },
            ];
            var behaviors = parentChildBehavior.getAllChildBehaviors(childList);
            expect(behaviors.length).to.equal(2);
            expect(behaviors[0]).to.equal(behavior1);
            expect(behaviors[1]).to.equal(behavior2);
        });
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/sinon/sinon.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='promise.service.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('promiseUtility', function () {
    var promiseUtility;
    beforeEach(function () {
        angular.mock.module(rl.utilities.promise.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.promise.serviceName);
        promiseUtility = services[rl.utilities.promise.serviceName];
    });
    describe('isPromise', function () {
        it('should return true if the object is a promise', function () {
            var promise = {
                then: sinon.spy(),
                catch: sinon.spy(),
            };
            expect(promiseUtility.isPromise(promise)).to.be.true;
        });
        it('should return false if the object is not a promise', function () {
            var str = 'promise';
            var obj = {};
            expect(promiseUtility.isPromise(str)).to.be.false;
            expect(promiseUtility.isPromise(obj)).to.be.false;
        });
    });
});
/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />
/// <reference path='truncate.ts' />
/// <reference path='../test/angularFixture.ts' />
describe('truncate', function () {
    var truncate;
    beforeEach(function () {
        angular.mock.module(rl.utilities.truncate.moduleName);
        var services = rl.utilities.test.angularFixture.inject(rl.utilities.truncate.filterName);
        truncate = services[rl.utilities.truncate.filterName];
    });
    it('should return an empty string when no string is passed', function () {
        expect(truncate()).to.equal('');
    });
    it('should return an empty string when an empty string is passed', function () {
        expect(truncate('')).to.equal('');
    });
    it('should return a string when a number is passed', function () {
        expect(truncate(34.5)).to.equal('34.5');
    });
    it('should not truncate a string when no parameters are passed', function () {
        expect(truncate('Test string')).to.equal('Test string');
    });
    it('should return an empty string when truncateTo is 0', function () {
        expect(truncate('Test string', 0)).to.equal('');
    });
    it('should truncate but not ellipsimogrify a string when only truncateTo is passed', function () {
        expect(truncate('Test string', 6)).to.equal('Test s');
    });
    it('should not truncate a string when truncateTo is greater than the string length', function () {
        expect(truncate('Test string', 25)).to.equal('Test string');
    });
    it('should truncate but not ellipsimogrify a string when both truncateTo and includeEllipses are passed', function () {
        expect(truncate('Test string', 6, false)).to.equal('Test s');
    });
    it('should truncate and ellipsimogrify a string when both truncateTo and includeEllipses are passed', function () {
        expect(truncate('Test string', 6, true)).to.equal('Test s...');
    });
});
// uses typings/lodash
// uses typings/sinon
// uses typings/jquery
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var test;
        (function (test) {
            'use strict';
            var Mock = (function () {
                function Mock() {
                }
                Mock.prototype.service = function (service) {
                    if (angular.isDefined(service) === false) {
                        service = {};
                    }
                    service._mock_requestList_ = [];
                    return service;
                };
                Mock.prototype.promise = function (service, methodName, data, successful) {
                    // Default successful to true
                    if (_.isUndefined(successful)) {
                        successful = true;
                    }
                    service[methodName] = sinon.spy(function () {
                        var deferred = jQuery.Deferred();
                        service._mock_requestList_.push({
                            promise: deferred,
                            data: data,
                            successful: successful,
                        });
                        return deferred.promise();
                    });
                };
                Mock.prototype.promiseWithCallback = function (service, methodName, callback, successful) {
                    var _this = this;
                    // Default successful to true
                    if (_.isUndefined(successful)) {
                        successful = true;
                    }
                    service[methodName] = sinon.spy(function () {
                        var params = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            params[_i - 0] = arguments[_i];
                        }
                        var deferred = jQuery.Deferred();
                        service._mock_requestList_.push({
                            promise: deferred,
                            data: callback.apply(_this, params),
                            successful: successful,
                        });
                        return deferred.promise();
                    });
                };
                Mock.prototype.flush = function (service, scope) {
                    // Save local reference to the request list and then clear
                    var currentPendingRequests = service._mock_requestList_;
                    service._mock_requestList_ = [];
                    // Process the saved list.
                    // This way if any additional requests are generated while processing the current / local list 
                    //  these requests will be queued until the next call to flush().
                    _.each(currentPendingRequests, function (request) {
                        if (request.successful) {
                            request.promise.resolve(request.data);
                        }
                        else {
                            request.promise.reject(request.data);
                        }
                        if (_.isUndefined(scope) === false) {
                            scope.$digest();
                        }
                    });
                };
                return Mock;
            })();
            test.mock = new Mock();
        })(test = utilities.test || (utilities.test = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFycmF5L2FycmF5LnNlcnZpY2UudHMiLCJvYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cyIsImNvbnRlbnRQcm92aWRlci9jb250ZW50UHJvdmlkZXIuc2VydmljZS50cyIsImRhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwianF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzIiwibnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwib2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzIiwicGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMiLCJwcm9taXNlL3Byb21pc2Uuc2VydmljZS50cyIsInRydW5jYXRlL3RydW5jYXRlLnRzIiwidXRpbGl0aWVzLnRzIiwidGVzdC9hbmd1bGFyRml4dHVyZS50cyIsImFycmF5L2FycmF5LnNlcnZpY2UudGVzdHMudHMiLCJjb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudGVzdHMudHMiLCJkYXRlL2RhdGUuc2VydmljZS50ZXN0cy50cyIsImpxdWVyeS9qcXVlcnkuc2VydmljZS50ZXN0cy50cyIsIm51bWJlci9udW1iZXIuc2VydmljZS50ZXN0cy50cyIsIm9iamVjdC9vYmplY3Quc2VydmljZS50ZXN0cy50cyIsIm9ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRlc3RzLnRzIiwicGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudGVzdHMudHMiLCJwcm9taXNlL3Byb21pc2VVdGlsaXR5LnNlcnZpY2UudGVzdHMudHMiLCJ0cnVuY2F0ZS90cnVuY2F0ZS50ZXN0cy50cyIsInRlc3QvbW9jay50cyJdLCJuYW1lcyI6WyJybCIsInJsLnV0aWxpdGllcyIsInJsLnV0aWxpdGllcy5hcnJheSIsInJsLnV0aWxpdGllcy5hcnJheS5BcnJheVV0aWxpdHkiLCJybC51dGlsaXRpZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLmFycmF5LkFycmF5VXRpbGl0eS5maW5kSW5kZXhPZiIsInJsLnV0aWxpdGllcy5hcnJheS5BcnJheVV0aWxpdHkucmVtb3ZlIiwicmwudXRpbGl0aWVzLmFycmF5LkFycmF5VXRpbGl0eS5yZXBsYWNlIiwicmwudXRpbGl0aWVzLmFycmF5LkFycmF5VXRpbGl0eS5zdW0iLCJybC51dGlsaXRpZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeSIsInJsLnV0aWxpdGllcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLmRhdGUiLCJybC51dGlsaXRpZXMuZGF0ZS5EYXRlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5kYXRlLkRhdGVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLmRhdGUuRGF0ZVV0aWxpdHkuaXNMZWFwWWVhciIsInJsLnV0aWxpdGllcy5kYXRlLkRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmciLCJybC51dGlsaXRpZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXlzIiwicmwudXRpbGl0aWVzLmpxdWVyeSIsInJsLnV0aWxpdGllcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5yZXBsYWNlQ29udGVudCIsInJsLnV0aWxpdGllcy5udW1iZXIiLCJybC51dGlsaXRpZXMubnVtYmVyLlNpZ24iLCJybC51dGlsaXRpZXMubnVtYmVyLk51bWJlclV0aWxpdHkiLCJybC51dGlsaXRpZXMubnVtYmVyLk51bWJlclV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMubnVtYmVyLk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwicmwudXRpbGl0aWVzLm9iamVjdCIsInJsLnV0aWxpdGllcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UiLCJybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5wcm9taXNlIiwicmwudXRpbGl0aWVzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkiLCJybC51dGlsaXRpZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsInJsLnV0aWxpdGllcy50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy50cnVuY2F0ZS50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy50ZXN0IiwicmwudXRpbGl0aWVzLnRlc3QuQW5ndWxhckZpeHR1cmUiLCJybC51dGlsaXRpZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsInJsLnV0aWxpdGllcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJybC51dGlsaXRpZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb250cm9sbGVyIiwicmwudXRpbGl0aWVzLnRlc3QuQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwicmwudXRpbGl0aWVzLnRlc3QuTW9jayIsInJsLnV0aWxpdGllcy50ZXN0Lk1vY2suY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLnNlcnZpY2UiLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLnByb21pc2UiLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLmZsdXNoIl0sIm1hcHBpbmdzIjoiQUFBQSx5QkFBeUI7QUFDekIsc0JBQXNCO0FBRXRCLElBQU8sRUFBRSxDQTZFUjtBQTdFRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0E2RWxCQTtJQTdFU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsS0FBS0EsQ0E2RXhCQTtRQTdFbUJBLFdBQUFBLE9BQUtBLEVBQUNBLENBQUNBO1lBQzFCQyxZQUFZQSxDQUFDQTtZQUVGQSxrQkFBVUEsR0FBV0Esb0JBQW9CQSxDQUFDQTtZQUMxQ0EsbUJBQVdBLEdBQVdBLGNBQWNBLENBQUNBO1lBYWhEQTtnQkFBQUM7Z0JBd0RBQyxDQUFDQTtnQkF2REFELGtDQUFXQSxHQUFYQSxVQUF1QkEsS0FBa0JBLEVBQUVBLFNBQXlDQTtvQkFDbkZFLElBQUlBLFdBQW1CQSxDQUFDQTtvQkFFeEJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLElBQWVBLEVBQUVBLEtBQWFBO3dCQUM1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTs0QkFDcEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO3dCQUNkQSxDQUFDQTtvQkFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLE1BQU1BLENB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O1lBWS9DQTtnQkFDQ0M7b0JBRERDLGlCQStCQ0E7b0JBN0JDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQTt3QkFDWkEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO3dCQUN2REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBQ0EsSUFBWUEsSUFBZUEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ2pHQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ25EQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0Es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Q0FBQztZQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMs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eEZTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQXdGbEJBO0FBQURBLENBQUNBLEVBeEZNLEVBQUUsS0FBRixFQUFFLFFBd0ZSIiwiZmlsZSI6InV0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuYXJyYXkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmFycmF5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXJyYXlVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXJyYXlVdGlsaXR5IHtcclxuXHRcdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGU7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSk6IFREYXRhVHlwZTtcclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtOiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlcjtcclxuXHRcdHN1bShhcnJheTogbnVtYmVyW10pOiBudW1iZXI7XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZ30pOiBURGF0YVR5cGVbXTtcclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyfSk6IFREYXRhVHlwZVtdO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgdGFyZ2V0SW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuXHRcdFx0XHRcdHRhcmdldEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSB8IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcblx0XHRcdFx0aW5kZXggPSB0aGlzLmZpbmRJbmRleE9mKGFycmF5LCA8eyhvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW59Pml0ZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCA8VERhdGFUeXBlPml0ZW0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXIgPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciBsaXN0OiBudW1iZXJbXTtcclxuXHJcblx0XHRcdGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxpc3QgPSA8YW55W10+YXJyYXk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShsaXN0LCAoc3VtOiBudW1iZXIsIG51bTogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIHwgbnVtYmVyIH0pOiBURGF0YVR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShhcnJheSwgKGRpY3Rpb25hcnk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGVbXSA9PiB7XHJcblx0XHRcdFx0ZGljdGlvbmFyeVs8YW55PmtleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHRcdH0sIFtdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLm9ic2VydmFibGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdhdGNoZXIge1xyXG5cdFx0YWN0aW9uKC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdFx0ZXZlbnQ/OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElSZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdChhY3Rpb246IHsoLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWR9LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb25cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHQoKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHJlZ2lzdGVyOiBJUmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSB3YXRjaGVyczogSVdhdGNoZXJbXSA9IFtdO1xyXG5cdFx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyguLi5wYXJhbXM6IGFueVtdKTogdm9pZH0sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICghXy5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG5cdFx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHRcdFx0Xy5lYWNoKHRoaXMud2F0Y2hlcnMsICh3YXRjaGVyOiBJV2F0Y2hlcikgPT4ge1xyXG5cdFx0XHRcdGlmICh3YXRjaGVyICE9IG51bGwgJiYgd2F0Y2hlci5ldmVudCA9PT0gZXZlbnQpIHtcclxuXHRcdFx0XHRcdHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGVTZXJ2aWNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEuc2VydmljZXMuY29udGVudFByb3ZpZGVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnY29udGVudFByb3ZpZGVyRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkO1xyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeTtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdUZXh0OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0fVxyXG5cclxuXHRjbGFzcyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlIGltcGxlbWVudHMgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3Iob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0XHRwcml2YXRlIGNvbnRlbnQ6IEpRdWVyeTtcclxuXHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudDogeyh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWR9ID0gKHRyYW5zY2x1ZGVGdW5jdGlvbjogbmcuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKHRyYW5zY2x1ZGVGdW5jdGlvbikpIHtcclxuXHRcdFx0XHR0cmFuc2NsdWRlRnVuY3Rpb24oKGNsb25lOiBKUXVlcnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2V0Q29udGVudChjbG9uZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRDb250ZW50KG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YWJsZS5yZWdpc3RlcigoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9LCAnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5IHtcclxuXHRcdFx0aWYgKHNlbGVjdG9yICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50LmZpbHRlcihzZWxlY3Rvcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbb2JzZXJ2YWJsZS5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gY29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQ29udGVudFByb3ZpZGVyU2VydmljZShvYnNlcnZhYmxlRmFjdG9yeSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JzZXJ2YWJsZS5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5kYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0XHRuYW1lOiBzdHJpbmc7XHJcblx0XHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBEYXRlVXRpbGl0eSB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdFx0dGhpcy5tb250aCA9IFtcclxuXHRcdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWFyY2gnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bmUnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdF07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9udGg6IElNb250aFtdO1xyXG5cclxuXHRcdHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIERhdGVVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuanF1ZXJ5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5qcXVlcnknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdqcXVlcnlVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJSlF1ZXJ5VXRpbGl0eSB7XHJcblx0XHRyZXBsYWNlQ29udGVudChjb250ZW50QXJlYTogSlF1ZXJ5LCBuZXdDb250ZW50czogSlF1ZXJ5KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEpRdWVyeVV0aWxpdHkgaW1wbGVtZW50cyBJSlF1ZXJ5VXRpbGl0eSB7XHJcblx0XHRyZXBsYWNlQ29udGVudChjb250ZW50QXJlYTogSlF1ZXJ5LCBuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0Y29udGVudEFyZWEuZW1wdHkoKTtcclxuXHRcdFx0Y29udGVudEFyZWEuYXBwZW5kKG5ld0NvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgSlF1ZXJ5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLm51bWJlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuXHRlbnVtIFNpZ24ge1xyXG5cdFx0cG9zaXRpdmUgPSAxLFxyXG5cdFx0bmVnYXRpdmUgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgTnVtYmVyVXRpbGl0eSBpbXBsZW1lbnRzIElOdW1iZXJVdGlsaXR5IHtcclxuXHRcdHByZWNpc2VSb3VuZChudW06IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHZhciBzaWduOiBTaWduID0gbnVtID49IDAgPyBTaWduLnBvc2l0aXZlIDogU2lnbi5uZWdhdGl2ZTtcclxuXHRcdFx0cmV0dXJuIChNYXRoLnJvdW5kKChudW0gKiBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKSArICg8bnVtYmVyPnNpZ24gKiAwLjAwMSkpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMub2JqZWN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5vYmplY3QnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgT2JqZWN0VXRpbGl0eSBpbXBsZW1lbnRzIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0XHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0XHR2aWV3RGF0YTogSVZpZXdEYXRhPFRCZWhhdmlvcj47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0XHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yO1xyXG5cdFx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXTtcclxuXHRcdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0XHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdFx0cmV0dXJuIGNoaWxkICYmIGNoaWxkLnZpZXdEYXRhICE9IG51bGxcclxuXHRcdFx0XHQ/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcblx0XHRcdFx0OiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMudHJ1bmNhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS5jb21wb25lbnRzLnRydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdFx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0dHJ1bmNhdGUuJGluamVjdCA9IFtvYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIHRydW5jYXRlKG9iamVjdFV0aWxpdHk6IG9iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGlucHV0PzogYW55LCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuXHRcdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHRcdHZhciBvdXQ6IHN0cmluZyA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuXHRcdFx0aWYgKG91dC5sZW5ndGgpIHtcclxuXHRcdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0XHRvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG5cdFx0XHRcdFx0aWYgKGluY2x1ZGVFbGxpcHNlcykge1xyXG5cdFx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBvdXQ7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udGVudFByb3ZpZGVyL2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlL2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdudW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwcm9taXNlL3Byb21pc2Uuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHJ1bmNhdGUvdHJ1bmNhdGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0XHRhcnJheS5tb2R1bGVOYW1lLFxyXG5cdFx0Y29udGVudFByb3ZpZGVyLm1vZHVsZU5hbWUsXHJcblx0XHRkYXRlLm1vZHVsZU5hbWUsXHJcblx0XHRqcXVlcnkubW9kdWxlTmFtZSxcclxuXHRcdG51bWJlci5tb2R1bGVOYW1lLFxyXG5cdFx0b2JqZWN0Lm1vZHVsZU5hbWUsXHJcblx0XHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0XHRwcm9taXNlLm1vZHVsZU5hbWUsXHJcblx0XHR0cnVuY2F0ZS5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhck1vY2tzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnRlc3Qge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcblx0XHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVSZXN1bHQge1xyXG5cdFx0ZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmU7XHJcblx0XHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBbmd1bGFyRml4dHVyZSB7XHJcblx0XHRpbmplY3Q6ICguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKSA9PiBhbnk7XHJcblx0XHRtb2NrOiAobW9ja3M6IGFueSkgPT4gdm9pZDtcclxuXHRcdGNvbnRyb2xsZXI8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBzY29wZT86IGFueSwgbG9jYWxzPzogYW55KTogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPjtcclxuXHRcdGRpcmVjdGl2ZTogKGRvbTogc3RyaW5nKSA9PiBJRGlyZWN0aXZlUmVzdWx0O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQW5ndWxhckZpeHR1cmUgaW1wbGVtZW50cyBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0XHQvLyBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIG9mIHRoZSBzZXJ2aWNlcyByZXF1ZXN0ZWRcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0XHQvLyB0aGlzIGF2b2lkcyBpdGVyYXRpbmcgb3ZlciB0aGUgZnVuY3Rpb24gaXRzZWxmXHJcblx0XHRcdHZhciBpbmplY3RQYXJhbWV0ZXJzOiBhbnlbXSA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuXHRcdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHRcdC8vIHNob3VsZCBnZXQgY2FsbGVkIHdpdGggdGhlIHNlcnZpY2VzIGluamVjdGVkIGJ5IGFuZ3VsYXJcclxuXHRcdFx0XHQvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuXHRcdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHRzZXJ2aWNlc1tzZXJ2aWNlXSA9IGluamVjdGVkU2VydmljZXNbaW5kZXhdO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGFuZ3VsYXIubW9jay5pbmplY3QoaW5qZWN0UGFyYW1ldGVycyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9jayhtb2NrczogYW55KTogdm9pZCB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoKCRwcm92aWRlOiBhbmd1bGFyLmF1dG8uSVByb3ZpZGVTZXJ2aWNlKSA9PiB7XHJcblx0XHRcdFx0Xy5lYWNoKG1vY2tzLCAodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRcdCRwcm92aWRlLnZhbHVlKGtleS50b1N0cmluZygpLCB2YWx1ZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRyb2xsZXI8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBzY29wZT86IGFueSwgbG9jYWxzPzogYW55KTogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdFx0dmFyICRyb290U2NvcGU6IGFuZ3VsYXIuSVNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb250cm9sbGVyOiBhbnkgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRcdHNjb3BlID0gXy5leHRlbmQoJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuXHJcblx0XHRcdGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNjb3BlOiBzY29wZSxcclxuXHRcdFx0XHRjb250cm9sbGVyOiA8VENvbnRyb2xsZXJUeXBlPiRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpcmVjdGl2ZShkb206IHN0cmluZyk6IElEaXJlY3RpdmVSZXN1bHQge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb21waWxlJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29tcGlsZTogYW55ID0gc2VydmljZXMuJGNvbXBpbGU7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCdyZW5vdm9UZW1wbGF0ZXMnKTtcclxuXHJcblx0XHRcdHZhciBjb21wb25lbnQ6IGFueSA9ICRjb21waWxlKGRvbSkoJHJvb3RTY29wZSk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGRpcmVjdGl2ZTogY29tcG9uZW50LFxyXG5cdFx0XHRcdHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGFuZ3VsYXJGaXh0dXJlOiBJQW5ndWxhckZpeHR1cmUgPSBuZXcgQW5ndWxhckZpeHR1cmUoKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FycmF5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5pbnRlcmZhY2UgSVRlc3RPYmoge1xyXG5cdHByb3A6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElLZXlPYmoge1xyXG5cdGtleTogbnVtYmVyO1xyXG59XHJcblxyXG5kZXNjcmliZSgnYXJyYXlVdGlsaXR5JywgKCkgPT4ge1xyXG5cdHZhciBhcnJheVV0aWxpdHk6IHJsLnV0aWxpdGllcy5hcnJheS5JQXJyYXlVdGlsaXR5O1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLmFycmF5Lm1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gcmwudXRpbGl0aWVzLnRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHJsLnV0aWxpdGllcy5hcnJheS5zZXJ2aWNlTmFtZSk7XHJcblx0XHRhcnJheVV0aWxpdHkgPSBzZXJ2aWNlc1tybC51dGlsaXRpZXMuYXJyYXkuc2VydmljZU5hbWVdO1xyXG5cdH0pO1xyXG5cclxuXHRkZXNjcmliZSgnZmluZEluZGV4T2YnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGluIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgcHJlZGljYXRlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5maW5kSW5kZXhPZjxudW1iZXI+KGFycmF5LCAoaXRlbTogbnVtYmVyKTogYm9vbGVhbiA9PiB7IHJldHVybiAoaXRlbSAlIDIpID09PSAwOyB9KSkudG8uZXF1YWwoMSk7XHJcblx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkuZmluZEluZGV4T2Y8bnVtYmVyPihhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gPiAxMCk7IH0pKS50by5lcXVhbCgtMSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ3JlbW92ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBzcGVjaWZpZWQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgcmV0dXJuIHRoZSBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5yZW1vdmUoYXJyYXksIDMpKS50by5lcXVhbCgzKTtcclxuXHRcdFx0ZXhwZWN0KGFycmF5Lmxlbmd0aCkudG8uZXF1YWwoNCk7XHJcblx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAxMCkpLnRvLm5vdC5leGlzdDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBmaXJzdCBpdGVtIG1hdGNoaW5nIHRoZSBwcmVkaWNhdGUgYW5kIHJldHVybiBpdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFycmF5OiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHJcblx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAoaXRlbTogbnVtYmVyKTogYm9vbGVhbiA9PiB7IHJldHVybiAoaXRlbSA+IDMpOyB9KSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdGV4cGVjdChhcnJheS5sZW5ndGgpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnJlbW92ZShhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gPiAxMCk7IH0pKS50by5ub3QuZXhpc3Q7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ3JlcGxhY2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIHJlcGxhY2UgYW4gaXRlbSBpbiB0aGUgYXJyYXkgd2l0aCBhbm90aGVyIGl0ZW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBhcnJheVdpdGhJdGVtczogbnVtYmVyW10gPSBbMywgNSwgN107XHJcblx0XHRcdGFycmF5VXRpbGl0eS5yZXBsYWNlKGFycmF5V2l0aEl0ZW1zLCA1LCAxMCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMF0pLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMV0pLnRvLmVxdWFsKDEwKTtcclxuXHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzJdKS50by5lcXVhbCg3KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZG8gbm90aGluZyBpZiB0aGUgaXRlbSB0byByZXBsYWNlIGlzIG5vdCBmb3VuZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFycmF5V2l0aEl0ZW1zOiBudW1iZXJbXSA9IFs0LCA2LCA4XTtcclxuXHRcdFx0YXJyYXlVdGlsaXR5LnJlcGxhY2UoYXJyYXlXaXRoSXRlbXMsIDUsIDEwKTtcclxuXHJcblx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1swXSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1sxXSkudG8uZXF1YWwoNik7XHJcblx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1syXSkudG8uZXF1YWwoOCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ3N1bScsICgpOiB2b2lkID0+IHtcclxuXHRcdGl0KCdzaG91bGQgc3VtIHRoZSB2YWx1ZXMgaW4gYW4gYXJyYXknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciB2YWx1ZXM6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnN1bSh2YWx1ZXMpKS50by5lcXVhbCgxNSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGFwcGx5IGEgdHJhbnNmb3JtIHRvIHRoZSB2YWx1ZXMgYmVmb3JlIHN1bW1pbmcgdGhlbScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHZhbHVlczogSVRlc3RPYmpbXSA9IFt7IHByb3A6IDEgfSwgeyBwcm9wOiA0IH0sIHsgcHJvcDogNyB9XTtcclxuXHRcdFx0dmFyIHRyYW5zZm9ybTogeyAoaXRlbTogSVRlc3RPYmopOiBudW1iZXIgfSA9IChpdGVtOiBJVGVzdE9iaik6IG51bWJlciA9PiB7IHJldHVybiBpdGVtLnByb3A7IH07XHJcblx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkuc3VtKHZhbHVlcywgdHJhbnNmb3JtKSkudG8uZXF1YWwoMTIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gMCBpZiB0aGVyZSBhcmUgbm8gaXRlbXMgdG8gc3VtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgdmFsdWVzOiBudW1iZXJbXSA9IFtdO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnN1bSh2YWx1ZXMpKS50by5lcXVhbCgwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRkZXNjcmliZSgndG9EaWN0aW9uYXJ5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCBjb252ZXJ0IGFuIGFycmF5IHRvIGEgZGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFycmF5OiBJS2V5T2JqW10gPSBbXHJcblx0XHRcdFx0eyBrZXk6IDExIH0sXHJcblx0XHRcdFx0eyBrZXk6IDEyIH0sXHJcblx0XHRcdFx0eyBrZXk6IDEzIH0sXHJcblx0XHRcdFx0eyBrZXk6IDE0IH0sXHJcblx0XHRcdFx0eyBrZXk6IDE1IH0sXHJcblx0XHRcdF07XHJcblxyXG5cdFx0XHR2YXIgZGljdGlvbmFyeTogSUtleU9ialtdID0gYXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeShhcnJheSwgKGl0ZW06IElLZXlPYmopOiBudW1iZXIgPT4geyByZXR1cm4gaXRlbS5rZXk7IH0pO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTFdKS50by5lcXVhbChhcnJheVswXSk7XHJcblx0XHRcdGV4cGVjdChkaWN0aW9uYXJ5WzEyXSkudG8uZXF1YWwoYXJyYXlbMV0pO1xyXG5cdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxM10pLnRvLmVxdWFsKGFycmF5WzJdKTtcclxuXHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTRdKS50by5lcXVhbChhcnJheVszXSk7XHJcblx0XHRcdGV4cGVjdChkaWN0aW9uYXJ5WzE1XSkudG8uZXF1YWwoYXJyYXlbNF0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5kZXNjcmliZSgnY29udGVudFByb3ZpZGVyJywgKCkgPT4ge1xyXG5cdHZhciBjb250ZW50UHJvdmlkZXI6IHJsLnV0aWxpdGllcy5jb250ZW50UHJvdmlkZXIuSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0dmFyIHRyYW5zY2x1ZGVTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdHZhciBmaWx0ZXJTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdHZhciBqcXVlcnlDbG9uZTogYW55O1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLnNlcnZpY2VOYW1lKTtcclxuXHRcdHZhciBjb250ZW50UHJvdmlkZXJGYWN0b3J5OiBybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLklDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeVxyXG5cdFx0XHQ9IHNlcnZpY2VzW3JsLnV0aWxpdGllcy5jb250ZW50UHJvdmlkZXIuc2VydmljZU5hbWVdO1xyXG5cdFx0Y29udGVudFByb3ZpZGVyID0gY29udGVudFByb3ZpZGVyRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdGpxdWVyeUNsb25lID0ge307XHJcblx0XHRmaWx0ZXJTcHkgPSBzaW5vbi5zcHkoKG9iamVjdDogYW55KTogYW55ID0+IHsgcmV0dXJuIG9iamVjdDsgfSk7XHJcblx0XHRqcXVlcnlDbG9uZS5maWx0ZXIgPSBmaWx0ZXJTcHk7XHJcblxyXG5cdFx0dHJhbnNjbHVkZVNweSA9IHNpbm9uLnNweSgoZnVuYzogRnVuY3Rpb24pID0+IGZ1bmMoanF1ZXJ5Q2xvbmUpKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBnZXQgdGhlIGNvbnRlbnQgdGhhdCB3YXMgc2V0IGJ5IHNldENvbnRlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRjb250ZW50UHJvdmlkZXIuc2V0Q29udGVudChqcXVlcnlDbG9uZSk7XHJcblx0XHRleHBlY3QoY29udGVudFByb3ZpZGVyLmdldENvbnRlbnQoKSkudG8uZXF1YWwoanF1ZXJ5Q2xvbmUpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIHNldCB0aGUgY29udGVudCB0byB0aGUgY29udGVudCBwcm92aWRlZCBieSB0aGUgdHJhbnNjbHVkZSBmdW5jdGlvbicsICgpOiB2b2lkID0+IHtcclxuXHRcdGNvbnRlbnRQcm92aWRlci5zZXRUcmFuc2NsdWRlQ29udGVudCh0cmFuc2NsdWRlU3B5KTtcclxuXHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh0cmFuc2NsdWRlU3B5KTtcclxuXHJcblx0XHRleHBlY3QoY29udGVudFByb3ZpZGVyLmdldENvbnRlbnQoKSkudG8uZXF1YWwoanF1ZXJ5Q2xvbmUpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIGZpbHRlciB0aGUganF1ZXJ5IG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKTogdm9pZCA9PiB7XHJcblx0XHRjb250ZW50UHJvdmlkZXIuc2V0Q29udGVudChqcXVlcnlDbG9uZSk7XHJcblxyXG5cdFx0Y29udGVudFByb3ZpZGVyLmdldENvbnRlbnQoJ3NlbGVjdG9yJyk7XHJcblxyXG5cdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZmlsdGVyU3B5KTtcclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGZpbHRlclNweSwgJ3NlbGVjdG9yJyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgY2FsbCB0aGUgYWN0aW9uIHdpdGggdGhlIG5ldyBjb250ZW50IHdoZW4gdGhlIGNvbnRlbnQgY2hhbmdlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdHZhciBhY3Rpb25TcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0Y29udGVudFByb3ZpZGVyLnJlZ2lzdGVyKGFjdGlvblNweSk7XHJcblxyXG5cdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGFjdGlvblNweSk7XHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChhY3Rpb25TcHksIGpxdWVyeUNsb25lKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBjYWxsIHRoZSBhY3Rpb24gaW1tZWRpYXRlbHkgaWYgdGhlcmUgaXMgYWxyZWFkeSBjb250ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0dmFyIGFjdGlvblNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRjb250ZW50UHJvdmlkZXIuc2V0Q29udGVudChqcXVlcnlDbG9uZSk7XHJcblxyXG5cdFx0Y29udGVudFByb3ZpZGVyLnJlZ2lzdGVyKGFjdGlvblNweSk7XHJcblxyXG5cdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYWN0aW9uU3B5KTtcclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGFjdGlvblNweSwganF1ZXJ5Q2xvbmUpO1xyXG5cdH0pO1xyXG59KTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5kZXNjcmliZSgnZGF0ZVV0aWxpdHknLCAoKSA9PiB7XHJcblx0dmFyIGRhdGVVdGlsaXR5OiBybC51dGlsaXRpZXMuZGF0ZS5JRGF0ZVV0aWxpdHk7XHJcblxyXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZShybC51dGlsaXRpZXMuZGF0ZS5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMuZGF0ZS5zZXJ2aWNlTmFtZSk7XHJcblx0XHRkYXRlVXRpbGl0eSA9IHNlcnZpY2VzW3JsLnV0aWxpdGllcy5kYXRlLnNlcnZpY2VOYW1lXTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ2dldEZ1bGxTdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIGdldCB0aGUgbW9udGggbmFtZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMCkpLnRvLmVxdWFsKCdKYW51YXJ5Jyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEpKS50by5lcXVhbCgnRmVicnVhcnknKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMikpLnRvLmVxdWFsKCdNYXJjaCcpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygzKSkudG8uZXF1YWwoJ0FwcmlsJyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDQpKS50by5lcXVhbCgnTWF5Jyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDUpKS50by5lcXVhbCgnSnVuZScpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg2KSkudG8uZXF1YWwoJ0p1bHknKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNykpLnRvLmVxdWFsKCdBdWd1c3QnKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoOCkpLnRvLmVxdWFsKCdTZXB0ZW1iZXInKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoOSkpLnRvLmVxdWFsKCdPY3RvYmVyJyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEwKSkudG8uZXF1YWwoJ05vdmVtYmVyJyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDExKSkudG8uZXF1YWwoJ0RlY2VtYmVyJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ2dldERheXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIGdldCB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygwKSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygyKSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygzKSkudG8uZXF1YWwoMzApO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg0KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg1KSkudG8uZXF1YWwoMzApO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg2KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg3KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg4KSkudG8uZXF1YWwoMzApO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg5KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxMCkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMTEpKS50by5lcXVhbCgzMSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGFjY291bnQgZm9yIGxlYXAgeWVhcnMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDEsIDIwMTUpKS50by5lcXVhbCgyOCk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDEsIDIwMTYpKS50by5lcXVhbCgyOSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdqcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbmRlc2NyaWJlKCdqcXVlcnlVdGlsaXR5JywgKCkgPT4ge1xyXG5cdHZhciBqcXVlcnlVdGlsaXR5OiBybC51dGlsaXRpZXMuanF1ZXJ5LklKUXVlcnlVdGlsaXR5O1xyXG5cdHZhciBlbXB0eVNweTogU2lub24uU2lub25TcHk7XHJcblx0dmFyIGFwcGVuZFNweTogU2lub24uU2lub25TcHk7XHJcblxyXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZShybC51dGlsaXRpZXMuanF1ZXJ5Lm1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gcmwudXRpbGl0aWVzLnRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHJsLnV0aWxpdGllcy5qcXVlcnkuc2VydmljZU5hbWUpO1xyXG5cdFx0anF1ZXJ5VXRpbGl0eSA9IHNlcnZpY2VzLmpxdWVyeVV0aWxpdHk7XHJcblxyXG5cdFx0ZW1wdHlTcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdGFwcGVuZFNweSA9IHNpbm9uLnNweSgpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIGVtcHR5IHRoZSBleGlzdGluZyBjb250ZW50IGFuZCBhcHBlbmQgdGhlIG5ldyBjb250ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0dmFyIGV4aXN0aW5nRWxlbWVudDogYW55ID0ge1xyXG5cdFx0XHRlbXB0eTogZW1wdHlTcHksXHJcblx0XHRcdGFwcGVuZDogYXBwZW5kU3B5LFxyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgbmV3Q29udGVudDogYW55ID0ge307XHJcblxyXG5cdFx0anF1ZXJ5VXRpbGl0eS5yZXBsYWNlQ29udGVudChleGlzdGluZ0VsZW1lbnQsIG5ld0NvbnRlbnQpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGVtcHR5U3B5KTtcclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGFwcGVuZFNweSk7XHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChhcHBlbmRTcHksIG5ld0NvbnRlbnQpO1xyXG5cdH0pO1xyXG59KTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdudW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbmRlc2NyaWJlKCdudW1iZXJVdGlsaXR5JywgKCkgPT4ge1xyXG5cdHZhciBudW1iZXJVdGlsaXR5OiBybC51dGlsaXRpZXMubnVtYmVyLklOdW1iZXJVdGlsaXR5O1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLm51bWJlci5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMubnVtYmVyLnNlcnZpY2VOYW1lKTtcclxuXHRcdG51bWJlclV0aWxpdHkgPSBzZXJ2aWNlc1tybC51dGlsaXRpZXMubnVtYmVyLnNlcnZpY2VOYW1lXTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ3ByZWNpc2VSb3VuZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdGl0KCdzaG91bGQgcm91bmQgNiB0byA2JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoNiwgMik7XHJcblx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCg2KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcm91bmQgMS4yNzUgdG8gMS4yOCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuMjc1LCAyKTtcclxuXHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuMjgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjI3NCB0byAxLjI3JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS4yNzQsIDIpO1xyXG5cdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS4yNyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuNTU1NTU1NTU1NTU1NTU1NTU1NTUgdG8gMS41NTU1NTU1NTU1NTU1NTU1NTU2JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHQvLyAyMCA1J3MuIFRoaXMgaXMgdGhlIG1heCBwcmVjaXNpb24gcHJlY2lzZV9yb3VuZCBpcyB2YWxpZCBmb3JcclxuXHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuNTU1NTU1NTU1NTU1NTU1NTU1NTUsIDE5KTtcclxuXHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuNTU1NTU1NTU1NTU1NTU1NTU1Nik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuOTk5OTk5OTk5OTk5OTk5OTk5OTk5IHRvIDInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjk5OTk5OTk5OTk5OTk5OTk5OTk5OSwgMjApOyAvLyAyMSA5J3NcclxuXHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBub3Qgcm91bmQgMS4xMTExMTExMTExMTExMTExMTExMTEnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjExMTExMTExMTExMTExMTExMTExMSwgMjApOyAvLyAyMSAxJ3NcclxuXHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuMTExMTExMTExMTExMTExMTExMTEpO1x0Ly8gdHJpbW1lZCAxIGZyb20gdGhlIGVuZFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuZGVzY3JpYmUoJ29iamVjdFV0aWxpdHknLCAoKSA9PiB7XHJcblx0dmFyIG9iamVjdFV0aWxpdHk6IHJsLnV0aWxpdGllcy5vYmplY3QuSU9iamVjdFV0aWxpdHk7XHJcblxyXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZShybC51dGlsaXRpZXMub2JqZWN0Lm1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gcmwudXRpbGl0aWVzLnRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHJsLnV0aWxpdGllcy5vYmplY3Quc2VydmljZU5hbWUpO1xyXG5cdFx0b2JqZWN0VXRpbGl0eSA9IHNlcnZpY2VzW3JsLnV0aWxpdGllcy5vYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdH0pO1xyXG5cclxuXHRkZXNjcmliZSgnaXNOdWxsT3JFbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBudWxsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KG51bGwpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIGVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KCcnKSkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gc3RyaW5nIGhhcyBjb250ZW50cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgncmFuZG9tIHN0cmluZycpKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIG51bGwgb3IgZW1wdHkgYXJyYXlzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KG51bGwpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFtdKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShbMSwgMiwgM10pKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgbnVtYmVyIHR5cGUgaXMgbm90IGEgbnVtYmVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KE51bWJlci5OYU4pKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KDUpKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRkZXNjcmliZSgnaXNOdWxsT3JXaGl0ZXNwYWNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgZW1wdHkgd2hpdGVzcGFjZSBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoJyAgICcpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBoYW5kbGUgbnVsbCBhbmQgZW1wdHkgb2JqZWN0cyBsaWtlIGlzTnVsbE9yRW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShudWxsKSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KG51bGwpKTtcclxuXHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKFtdKSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFtdKSk7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSh7fSkpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSh7fSkpO1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoJycpKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJycpKTtcclxuXHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKCdyYW5kb20gc3RyaW5nJykpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgncmFuZG9tIHN0cmluZycpKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59KTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbmRlc2NyaWJlKCdvYnNlcnZhYmxlJywgKCkgPT4ge1xyXG5cdHZhciBvYnNlcnZhYmxlOiBybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblxyXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZShybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5zZXJ2aWNlTmFtZSk7XHJcblx0XHR2YXIgb2JzZXJ2YWJsZUZhY3Rvcnk6IHJsLnV0aWxpdGllcy5vYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnlcclxuXHRcdFx0PSBzZXJ2aWNlc1tybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5zZXJ2aWNlTmFtZV07XHJcblx0XHRvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCByZWdpc3RlciBhIHdhdGNoZXIgYW5kIGNhbGwgdGhlIGFjdGlvbiB3aGVuIGZpcmUgaXMgY2FsbGVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0dmFyIGZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihmdW5jKTtcclxuXHRcdG9ic2VydmFibGUuZmlyZSgpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZ1bmMpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIHVucmVnaXN0ZXIgb25seSB0aGUgaW5kaWNhdGVkIHdhdGNoZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHR2YXIgcmVnaXN0ZXJlZEZ1bmMxOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0dmFyIHVucmVnaXN0ZXJlZEZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblx0XHR2YXIgcmVnaXN0ZXJlZEZ1bmMyOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdG9ic2VydmFibGUucmVnaXN0ZXIocmVnaXN0ZXJlZEZ1bmMxKTtcclxuXHRcdHZhciBjYW5jZWw6ICgpID0+IHZvaWQgPSBvYnNlcnZhYmxlLnJlZ2lzdGVyKHVucmVnaXN0ZXJlZEZ1bmMpO1xyXG5cdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihyZWdpc3RlcmVkRnVuYzIpO1xyXG5cclxuXHRcdGNhbmNlbCgpO1xyXG5cclxuXHRcdG9ic2VydmFibGUuZmlyZSgpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHJlZ2lzdGVyZWRGdW5jMSk7XHJcblx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHVucmVnaXN0ZXJlZEZ1bmMpO1xyXG5cdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UocmVnaXN0ZXJlZEZ1bmMyKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBvbmx5IGNhbGwgd2F0Y2hlciByZWdpc3RlcmVkIHdpdGggdGhlIHNwZWNpZmllZCBldmVudCBpZiBmaXJlIGlzIGNhbGxlZCB3aXRoIGFuIGV2ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0dmFyIGZ1bmNXaXRoRXZlbnQ6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblx0XHR2YXIgZnVuY1dpdGhvdXRFdmVudDogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmNXaXRoRXZlbnQsICdteUV2ZW50Jyk7XHJcblx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmNXaXRob3V0RXZlbnQpO1xyXG5cdFx0b2JzZXJ2YWJsZS5maXJlKCdteUV2ZW50Jyk7XHJcblxyXG5cdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChmdW5jV2l0aG91dEV2ZW50KTtcclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZ1bmNXaXRoRXZlbnQpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIG5vdCBjYWxsIHdhdGNoZXJzIHJlZ2lzdGVyZWQgd2l0aCBhIGRpZmZlcmVudCBldmVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdHZhciBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYywgJ215RXZlbnQnKTtcclxuXHRcdG9ic2VydmFibGUuZmlyZSgnb3RoZXJFdmVudCcpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZnVuYyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgY2FsbCB0aGUgcmVnaXN0ZXJlZCB3YXRjaGVycyB3aXRoIHRoZSBhZGRpdGlvbmFsIHBhcmFtcyBwYXNzZWQgaW50byB0aGUgZmlyZSBmdW5jdGlvbicsICgpOiB2b2lkID0+IHtcclxuXHRcdHZhciBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYywgJ215RXZlbnQnKTtcclxuXHRcdG9ic2VydmFibGUuZmlyZSgnbXlFdmVudCcsIDEsIDIsIDMsIDQsIDUpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZ1bmMpO1xyXG5cclxuXHRcdHZhciBhcmdzOiBudW1iZXJbXSA9IGZ1bmMuZmlyc3RDYWxsLmFyZ3M7XHJcblx0XHRleHBlY3QoYXJnc1swXSkudG8uZXF1YWwoMSk7XHJcblx0XHRleHBlY3QoYXJnc1sxXSkudG8uZXF1YWwoMik7XHJcblx0XHRleHBlY3QoYXJnc1syXSkudG8uZXF1YWwoMyk7XHJcblx0XHRleHBlY3QoYXJnc1szXSkudG8uZXF1YWwoNCk7XHJcblx0XHRleHBlY3QoYXJnc1s0XSkudG8uZXF1YWwoNSk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgcmV0dXJuIHdpdGggYW4gZXJyb3IgaWYgbm8gZnVuY3Rpb24gaXMgcHJvdmlkZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHR2YXIgb3JpZ2luYWxMb2c6IChtZXNzYWdlPzogc3RyaW5nKSA9PiB2b2lkID0gY29uc29sZS5sb2c7XHJcblx0XHR2YXIgbG9nU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0Y29uc29sZS5sb2cgPSBsb2dTcHk7XHJcblxyXG5cdFx0dmFyIGNhbmNlbDogKCkgPT4gdm9pZCA9IG9ic2VydmFibGUucmVnaXN0ZXIobnVsbCk7XHJcblxyXG5cdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UobG9nU3B5KTtcclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGxvZ1NweSwgJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cclxuXHRcdGV4cGVjdChjYW5jZWwpLnRvLmJlLm51bGw7XHJcblxyXG5cdFx0Y29uc29sZS5sb2cgPSBvcmlnaW5hbExvZztcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuaW50ZXJmYWNlIElUZXN0QmVoYXZpb3Ige1xyXG5cdGFjdGlvbjogRnVuY3Rpb247XHJcbn1cclxuXHJcbmRlc2NyaWJlKCdwYXJlbnRDaGlsZEJlaGF2aW9yJywgKCkgPT4ge1xyXG5cdHZhciBwYXJlbnRDaGlsZEJlaGF2aW9yOiBybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5JUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2U7XHJcblxyXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZShybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlTmFtZSk7XHJcblx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yID0gc2VydmljZXNbcmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZU5hbWVdO1xyXG5cdH0pO1xyXG5cclxuXHRkZXNjcmliZSgncmVnaXN0ZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIHJlZ2lzdGVyIGEgY2hpbGQgYmVoYXZpb3IgYnkgcHV0dGluZyBpdCBvbiB0aGUgdmlldyBkYXRhIG9mIHRoZSBjaGlsZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGNoaWxkOiBybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5JQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiBudWxsIH07XHJcblx0XHRcdHZhciBiZWhhdmlvcjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHJcblx0XHRcdHBhcmVudENoaWxkQmVoYXZpb3IucmVnaXN0ZXJDaGlsZEJlaGF2aW9yKGNoaWxkLCBiZWhhdmlvcik7XHJcblxyXG5cdFx0XHRleHBlY3QoY2hpbGQudmlld0RhdGEuYmVoYXZpb3IpLnRvLmVxdWFsKGJlaGF2aW9yKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgdXNlIHRoZSBleGlzdGluZyB2aWV3RGF0YSBvYmplY3QgaWYgb25lIGV4aXN0cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGNoaWxkV2l0aFZpZXdEYXRhOiBybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5JQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSA8YW55Pnsgdmlld0RhdGE6IHsgcmFuZG9tVmFsdWU6IDUgfSB9O1xyXG5cdFx0XHR2YXIgYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiA1OyB9IH07XHJcblxyXG5cdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZFdpdGhWaWV3RGF0YSwgYmVoYXZpb3IpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNoaWxkV2l0aFZpZXdEYXRhLnZpZXdEYXRhLmJlaGF2aW9yKS50by5lcXVhbChiZWhhdmlvcik7XHJcblx0XHRcdGV4cGVjdCgoPGFueT5jaGlsZFdpdGhWaWV3RGF0YS52aWV3RGF0YSkucmFuZG9tVmFsdWUpLnRvLmVxdWFsKDUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBub3QgcmVnaXN0ZXIgY2hpbGQgYmVoYXZpb3IgaWYgY2hpbGQgb2JqZWN0IGlzIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBiZWhhdmlvcjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0dmFyIGNoaWxkOiBybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5JQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSBudWxsO1xyXG5cdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cdFx0XHRleHBlY3QocGFyZW50Q2hpbGRCZWhhdmlvci5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKSkudG8uYmUubnVsbDtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRkZXNjcmliZSgnZ2V0Q2hpbGRCZWhhdmlvcicsICgpOiB2b2lkID0+IHtcclxuXHRcdGl0KCdzaG91bGQgZ2V0IHRoZSBiZWhhdmlvciBvZiBhbiBpbmRpdmlkdWFsIGNoaWxkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3IxOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHR2YXIgY2hpbGQ6IHJsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yLklDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMSB9IH07XHJcblxyXG5cdFx0XHRleHBlY3QocGFyZW50Q2hpbGRCZWhhdmlvci5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKSkudG8uZXF1YWwoYmVoYXZpb3IxKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZ2V0IGV4aXN0aW5nIGJlaGF2aW9ycyBmb3IgYSBsaXN0IG9mIGNoaWxkcmVuJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3IxOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHR2YXIgYmVoYXZpb3IyOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gNzsgfSB9O1xyXG5cdFx0XHR2YXIgY2hpbGRMaXN0OiBybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5JQ2hpbGQ8SVRlc3RCZWhhdmlvcj5bXSA9IFtcclxuXHRcdFx0XHR7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjEgfSB9LFxyXG5cdFx0XHRcdHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IG51bGwgfSB9LFxyXG5cdFx0XHRcdHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMiB9IH0sXHJcblx0XHRcdF07XHJcblxyXG5cdFx0XHR2YXIgYmVoYXZpb3JzOiBJVGVzdEJlaGF2aW9yW10gPSBwYXJlbnRDaGlsZEJlaGF2aW9yLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYmVoYXZpb3JzLmxlbmd0aCkudG8uZXF1YWwoMik7XHJcblx0XHRcdGV4cGVjdChiZWhhdmlvcnNbMF0pLnRvLmVxdWFsKGJlaGF2aW9yMSk7XHJcblx0XHRcdGV4cGVjdChiZWhhdmlvcnNbMV0pLnRvLmVxdWFsKGJlaGF2aW9yMik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5kZXNjcmliZSgncHJvbWlzZVV0aWxpdHknLCAoKSA9PiB7XHJcblx0dmFyIHByb21pc2VVdGlsaXR5OiBybC51dGlsaXRpZXMucHJvbWlzZS5JUHJvbWlzZVV0aWxpdHk7XHJcblxyXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZShybC51dGlsaXRpZXMucHJvbWlzZS5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMucHJvbWlzZS5zZXJ2aWNlTmFtZSk7XHJcblx0XHRwcm9taXNlVXRpbGl0eSA9IHNlcnZpY2VzW3JsLnV0aWxpdGllcy5wcm9taXNlLnNlcnZpY2VOYW1lXTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ2lzUHJvbWlzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIG9iamVjdCBpcyBhIHByb21pc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBwcm9taXNlOiBPYmplY3QgPSB7XHJcblx0XHRcdFx0dGhlbjogc2lub24uc3B5KCksXHJcblx0XHRcdFx0Y2F0Y2g6IHNpbm9uLnNweSgpLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZXhwZWN0KHByb21pc2VVdGlsaXR5LmlzUHJvbWlzZShwcm9taXNlKSkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBvYmplY3QgaXMgbm90IGEgcHJvbWlzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHN0cjogc3RyaW5nID0gJ3Byb21pc2UnO1xyXG5cdFx0XHR2YXIgb2JqOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHRcdGV4cGVjdChwcm9taXNlVXRpbGl0eS5pc1Byb21pc2Uoc3RyKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChwcm9taXNlVXRpbGl0eS5pc1Byb21pc2Uob2JqKSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHJ1bmNhdGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5kZXNjcmliZSgndHJ1bmNhdGUnLCAoKSA9PiB7XHJcblx0dmFyIHRydW5jYXRlOiBybC51dGlsaXRpZXMudHJ1bmNhdGUuSVRydW5jYXRlRmlsdGVyO1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLnRydW5jYXRlLm1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gcmwudXRpbGl0aWVzLnRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHJsLnV0aWxpdGllcy50cnVuY2F0ZS5maWx0ZXJOYW1lKTtcclxuXHRcdHRydW5jYXRlID0gc2VydmljZXNbcmwudXRpbGl0aWVzLnRydW5jYXRlLmZpbHRlck5hbWVdO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgd2hlbiBubyBzdHJpbmcgaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZXhwZWN0KHRydW5jYXRlKCkpLnRvLmVxdWFsKCcnKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gYW4gZW1wdHkgc3RyaW5nIGlzIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdGV4cGVjdCh0cnVuY2F0ZSgnJykpLnRvLmVxdWFsKCcnKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCByZXR1cm4gYSBzdHJpbmcgd2hlbiBhIG51bWJlciBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRleHBlY3QodHJ1bmNhdGUoMzQuNSkpLnRvLmVxdWFsKCczNC41Jyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgbm90IHRydW5jYXRlIGEgc3RyaW5nIHdoZW4gbm8gcGFyYW1ldGVycyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycpKS50by5lcXVhbCgnVGVzdCBzdHJpbmcnKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gdHJ1bmNhdGVUbyBpcyAwJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDApKS50by5lcXVhbCgnJyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgdHJ1bmNhdGUgYnV0IG5vdCBlbGxpcHNpbW9ncmlmeSBhIHN0cmluZyB3aGVuIG9ubHkgdHJ1bmNhdGVUbyBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgNikpLnRvLmVxdWFsKCdUZXN0IHMnKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBub3QgdHJ1bmNhdGUgYSBzdHJpbmcgd2hlbiB0cnVuY2F0ZVRvIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc3RyaW5nIGxlbmd0aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCAyNSkpLnRvLmVxdWFsKCdUZXN0IHN0cmluZycpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIHRydW5jYXRlIGJ1dCBub3QgZWxsaXBzaW1vZ3JpZnkgYSBzdHJpbmcgd2hlbiBib3RoIHRydW5jYXRlVG8gYW5kIGluY2x1ZGVFbGxpcHNlcyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDYsIGZhbHNlKSkudG8uZXF1YWwoJ1Rlc3QgcycpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIHRydW5jYXRlIGFuZCBlbGxpcHNpbW9ncmlmeSBhIHN0cmluZyB3aGVuIGJvdGggdHJ1bmNhdGVUbyBhbmQgaW5jbHVkZUVsbGlwc2VzIGFyZSBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgNiwgdHJ1ZSkpLnRvLmVxdWFsKCdUZXN0IHMuLi4nKTtcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL3Npbm9uXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy50ZXN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4ge1xyXG5cdFx0cHJvbWlzZTogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRcdGRhdGE6IFREYXRhVHlwZTtcclxuXHRcdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChzZXJ2aWNlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKCk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBjYWxsYmFjay5hcHBseSh0aGlzLCBwYXJhbXMpLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIHNjb3BlPzogbmcuSVNjb3BlKTogdm9pZCB7XHJcblx0XHRcdC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuXHRcdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcblx0XHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3QgXHJcblx0XHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRcdF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCAocmVxdWVzdDogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4pOiB2b2lkID0+IHtcclxuXHRcdFx0XHRpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9jazogSU1vY2sgPSBuZXcgTW9jaygpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==