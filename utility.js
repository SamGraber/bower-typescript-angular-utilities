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
            array_1.ArrayUtility = ArrayUtility;
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
            observable.ObservableService = ObservableService;
            function observableServiceFactory() {
                'use strict';
                return {
                    getInstance: function () {
                        return new ObservableService();
                    }
                };
            }
            observable.observableServiceFactory = observableServiceFactory;
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
            contentProvider.ContentProviderService = ContentProviderService;
            contentProviderServiceFactory.$inject = [utilities.observable.serviceName];
            function contentProviderServiceFactory(observableFactory) {
                'use strict';
                return {
                    getInstance: function () {
                        return new ContentProviderService(observableFactory);
                    }
                };
            }
            contentProvider.contentProviderServiceFactory = contentProviderServiceFactory;
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
            date.DateUtility = DateUtility;
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
            jquery.JQueryUtility = JQueryUtility;
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
            number.NumberUtility = NumberUtility;
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
            parentChildBehavior.ParentChildBehaviorService = ParentChildBehaviorService;
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
            promise_1.PromiseUtility = PromiseUtility;
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
            truncate_1.truncate = truncate;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFycmF5L2FycmF5LnNlcnZpY2UudHMiLCJvYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cyIsImNvbnRlbnRQcm92aWRlci9jb250ZW50UHJvdmlkZXIuc2VydmljZS50cyIsImRhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwianF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzIiwibnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwib2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzIiwicGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMiLCJwcm9taXNlL3Byb21pc2Uuc2VydmljZS50cyIsInRydW5jYXRlL3RydW5jYXRlLnRzIiwidXRpbGl0aWVzLnRzIiwidGVzdC9hbmd1bGFyRml4dHVyZS50cyIsImFycmF5L2FycmF5LnNlcnZpY2UudGVzdHMudHMiLCJjb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudGVzdHMudHMiLCJkYXRlL2RhdGUuc2VydmljZS50ZXN0cy50cyIsIm51bWJlci9udW1iZXIuc2VydmljZS50ZXN0cy50cyIsIm9iamVjdC9vYmplY3Quc2VydmljZS50ZXN0cy50cyIsImpxdWVyeS9qcXVlcnkuc2VydmljZS50ZXN0cy50cyIsIm9ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRlc3RzLnRzIiwicGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudGVzdHMudHMiLCJwcm9taXNlL3Byb21pc2VVdGlsaXR5LnNlcnZpY2UudGVzdHMudHMiLCJ0ZXN0L21vY2sudHMiLCJ0cnVuY2F0ZS90cnVuY2F0ZS50ZXN0cy50cyJdLCJuYW1lcyI6WyJybCIsInJsLnV0aWxpdGllcyIsInJsLnV0aWxpdGllcy5hcnJheSIsInJsLnV0aWxpdGllcy5hcnJheS5BcnJheVV0aWxpdHkiLCJybC51dGlsaXRpZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLmFycmF5LkFycmF5VXRpbGl0eS5maW5kSW5kZXhPZiIsInJsLnV0aWxpdGllcy5hcnJheS5BcnJheVV0aWxpdHkucmVtb3ZlIiwicmwudXRpbGl0aWVzLmFycmF5LkFycmF5VXRpbGl0eS5yZXBsYWNlIiwicmwudXRpbGl0aWVzLmFycmF5LkFycmF5VXRpbGl0eS5zdW0iLCJybC51dGlsaXRpZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeSIsInJsLnV0aWxpdGllcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLmRhdGUiLCJybC51dGlsaXRpZXMuZGF0ZS5EYXRlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5kYXRlLkRhdGVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLmRhdGUuRGF0ZVV0aWxpdHkuaXNMZWFwWWVhciIsInJsLnV0aWxpdGllcy5kYXRlLkRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmciLCJybC51dGlsaXRpZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXlzIiwicmwudXRpbGl0aWVzLmpxdWVyeSIsInJsLnV0aWxpdGllcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5yZXBsYWNlQ29udGVudCIsInJsLnV0aWxpdGllcy5udW1iZXIiLCJybC51dGlsaXRpZXMubnVtYmVyLlNpZ24iLCJybC51dGlsaXRpZXMubnVtYmVyLk51bWJlclV0aWxpdHkiLCJybC51dGlsaXRpZXMubnVtYmVyLk51bWJlclV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMubnVtYmVyLk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwicmwudXRpbGl0aWVzLm9iamVjdCIsInJsLnV0aWxpdGllcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UiLCJybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5wcm9taXNlIiwicmwudXRpbGl0aWVzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkiLCJybC51dGlsaXRpZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsInJsLnV0aWxpdGllcy50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy50cnVuY2F0ZS50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy50ZXN0IiwicmwudXRpbGl0aWVzLnRlc3QuQW5ndWxhckZpeHR1cmUiLCJybC51dGlsaXRpZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsInJsLnV0aWxpdGllcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJybC51dGlsaXRpZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb250cm9sbGVyIiwicmwudXRpbGl0aWVzLnRlc3QuQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwicmwudXRpbGl0aWVzLnRlc3QuTW9jayIsInJsLnV0aWxpdGllcy50ZXN0Lk1vY2suY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLnNlcnZpY2UiLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLnByb21pc2UiLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJybC51dGlsaXRpZXMudGVzdC5Nb2NrLmZsdXNoIl0sIm1hcHBpbmdzIjoiQUFBQSx5QkFBeUI7QUFDekIsc0JBQXNCO0FBRXRCLElBQU8sRUFBRSxDQTZFUjtBQTdFRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0E2RWxCQTtJQTdFU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsS0FBS0EsQ0E2RXhCQTtRQTdFbUJBLFdBQUFBLE9BQUtBLEVBQUNBLENBQUNBO1lBQzFCQyxZQUFZQSxDQUFDQTtZQUVGQSxrQkFBVUEsR0FBV0Esb0JBQW9CQSxDQUFDQTtZQUMxQ0EsbUJBQVdBLEdBQVdBLGNBQWNBLENBQUNBO1lBYWhEQTtnQkFBQUM7Z0JBd0RBQyxDQUFDQTtnQkF2REFELGtDQUFXQSxHQUFYQSxVQUF1QkEsS0FBa0JBLEVBQUVBLFNBQXlDQTtvQkFDbkZFLElBQUlBLFdBQW1CQSxDQUFDQTtvQkFFeEJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLElBQWVBLEVBQUVBLEtBQWFBO3dCQUM1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTs0QkFDcEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO3dCQUNkQSxDQUFDQTtvQkFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLE1BQU1BLENBQUNBLFdBQVdBLElBQUlBLElBQUlBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUMvQ0EsQ0FBQ0E7Z0JBRURGLDZCQUFNQSxHQUFOQSxVQUFrQkEsS0FBa0JBLEVBQUVBLElBQStDQTtvQkFDcEZHLElBQUlBLEtBQWFBLENBQUNBO29CQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3hCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxFQUErQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3BFQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ1BBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQWFBLElBQUlBLENBQUNBLENBQUNBO29CQUMzQ0EsQ0FBQ0E7b0JBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNoQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ1BBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO29CQUNiQSxDQUFDQTtnQkFDRkEsQ0FBQ0E7Z0JBRURILDhCQUFPQSxHQUFQQSxVQUFtQkEsS0FBa0JBLEVBQUVBLE9BQWtCQSxFQUFFQSxPQUFrQkE7b0JBQzVFSSxJQUFJQSxLQUFLQSxHQUFXQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtvQkFFOUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNoQkEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pDQSxDQUFDQTtnQkFDRkEsQ0FBQ0E7Z0JBRURKLDBCQUFHQSxHQUFIQSxVQUFlQSxLQUFrQkEsRUFBRUEsU0FBeUNBO29CQUMzRUssSUFBSUEsSUFBY0EsQ0FBQ0E7b0JBRW5CQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDdkJBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLElBQWVBLElBQWVBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUMvRUEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxJQUFJQSxHQUFVQSxLQUFLQSxDQUFDQTtvQkFDckJBLENBQUNBO29CQUVEQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxVQUFDQSxHQUFXQSxFQUFFQSxHQUFXQSxJQUFlQSxNQUFNQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkZBLENBQUNBO2dCQUVETCxtQ0FBWUEsR0FBWkEsVUFBd0JBLEtBQWtCQSxFQUFFQSxXQUFtREE7b0JBQzlGTSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxVQUF1QkEsRUFBRUEsSUFBZUE7d0JBQy9EQSxVQUFVQSxDQUFNQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDMUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO29CQUNuQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1JBLENBQUNBO2dCQUNGTixtQkFBQ0E7WUFBREEsQ0F4REFELEFBd0RDQyxJQUFBRDtZQXhEWUEsb0JBQVlBLGVBd0R4QkEsQ0FBQUE7WUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esa0JBQVVBLEVBQUVBLEVBQUVBLENBQUNBO2lCQUM1QkEsT0FBT0EsQ0FBQ0EsbUJBQVdBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO1FBQ3RDQSxDQUFDQSxFQTdFbUJELEtBQUtBLEdBQUxBLGVBQUtBLEtBQUxBLGVBQUtBLFFBNkV4QkE7SUFBREEsQ0FBQ0EsRUE3RVNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBNkVsQkE7QUFBREEsQ0FBQ0EsRUE3RU0sRUFBRSxLQUFGLEVBQUUsUUE2RVI7QUNoRkQseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0EyRVI7QUEzRUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBMkVsQkE7SUEzRVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFVBQVVBLENBMkU3QkE7UUEzRW1CQSxXQUFBQSxVQUFVQSxFQUFDQSxDQUFDQTtZQUMvQlMsWUFBWUEsQ0FBQ0E7WUFFRkEscUJBQVVBLEdBQVdBLHlCQUF5QkEsQ0FBQ0E7WUFDL0NBLHNCQUFXQSxHQUFXQSxtQkFBbUJBLENBQUNBO1lBb0JyREE7Z0JBQUFDO29CQUNTQyxhQUFRQSxHQUFlQSxFQUFFQSxDQUFDQTtvQkFDMUJBLFlBQU9BLEdBQVdBLENBQUNBLENBQUNBO2dCQStCN0JBLENBQUNBO2dCQTdCQUQsb0NBQVFBLEdBQVJBLFVBQVNBLE1BQWtDQSxFQUFFQSxLQUFjQTtvQkFBM0RFLGlCQWdCQ0E7b0JBZkFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUMzQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbUNBQW1DQSxDQUFDQSxDQUFDQTt3QkFDakRBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO29CQUNiQSxDQUFDQTtvQkFFREEsSUFBSUEsVUFBVUEsR0FBV0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7b0JBQ3RDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtvQkFDZkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0E7d0JBQzNCQSxNQUFNQSxFQUFFQSxNQUFNQTt3QkFDZEEsS0FBS0EsRUFBRUEsS0FBS0E7cUJBQ1pBLENBQUNBO29CQUVGQSxNQUFNQSxDQUFDQTt3QkFDTkEsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7b0JBQzdCQSxDQUFDQSxDQUFDQTtnQkFDSEEsQ0FBQ0E7Z0JBRURGLGdDQUFJQSxHQUFKQSxVQUFLQSxLQUFjQTtvQkFBbkJHLGlCQU1DQTtvQkFOb0JBLGdCQUFnQkE7eUJBQWhCQSxXQUFnQkEsQ0FBaEJBLHNCQUFnQkEsQ0FBaEJBLElBQWdCQTt3QkFBaEJBLCtCQUFnQkE7O29CQUNwQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsVUFBQ0EsT0FBaUJBO3dCQUN2Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsSUFBSUEsT0FBT0EsQ0FBQ0EsS0FBS0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2hEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTt3QkFDcENBLENBQUNBO29CQUNGQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDSkEsQ0FBQ0E7Z0JBRU9ILHNDQUFVQSxHQUFsQkEsVUFBbUJBLEdBQVdBO29CQUM3QkksSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQzNCQSxDQUFDQTtnQkFDRkosd0JBQUNBO1lBQURBLENBakNBRCxBQWlDQ0MsSUFBQUQ7WUFqQ1lBLDRCQUFpQkEsb0JBaUM3QkEsQ0FBQUE7WUFNREE7Z0JBQ0NNLFlBQVlBLENBQUNBO2dCQUViQSxNQUFNQSxDQUFDQTtvQkFDTkEsV0FBV0E7d0JBQ1ZDLE1BQU1BLENBQUNBLElBQUlBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7b0JBQ2hDQSxDQUFDQTtpQkFDREQsQ0FBQ0E7WUFDSEEsQ0FBQ0E7WUFSZU4sbUNBQXdCQSwyQkFRdkNBLENBQUFBO1lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLHFCQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtpQkFDNUJBLE9BQU9BLENBQUNBLHNCQUFXQSxFQUFFQSx3QkFBd0JBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQSxFQTNFbUJULFVBQVVBLEdBQVZBLG9CQUFVQSxLQUFWQSxvQkFBVUEsUUEyRTdCQTtJQUFEQSxDQUFDQSxFQTNFU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUEyRWxCQTtBQUFEQSxDQUFDQSxFQTNFTSxFQUFFLEtBQUYsRUFBRSxRQTJFUjtBQzlFRCx5QkFBeUI7QUFDekIsc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUV0Qiw0REFBNEQ7QUFFNUQsSUFBTyxFQUFFLENBd0VSO0FBeEVELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQXdFbEJBO0lBeEVTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxlQUFlQSxDQXdFbENBO1FBeEVtQkEsV0FBQUEsZUFBZUEsRUFBQ0EsQ0FBQ0E7WUFDcENpQixZQUFZQSxDQUFDQTtZQUVGQSwwQkFBVUEsR0FBV0EsK0JBQStCQSxDQUFDQTtZQUNyREEsMkJBQVdBLEdBQVdBLHdCQUF3QkEsQ0FBQ0E7WUFTMURBO2dCQUNDQyxnQ0FBWUEsaUJBQXVEQTtvQkFEcEVDLGlCQXdDQ0E7b0JBM0JBQSx5QkFBb0JBLEdBQThEQSxVQUFDQSxrQkFBMENBO3dCQUM1SEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdENBLGtCQUFrQkEsQ0FBQ0EsVUFBQ0EsS0FBYUE7Z0NBQ2hDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTs0QkFDeEJBLENBQUNBLENBQUNBLENBQUNBO3dCQUNKQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLEtBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUN2QkEsQ0FBQ0E7b0JBQ0ZBLENBQUNBLENBQUFBO29CQW5CQUEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtnQkFDbkRBLENBQUNBO2dCQUtERCwyQ0FBVUEsR0FBVkEsVUFBV0EsT0FBZUE7b0JBQ3pCRSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtvQkFDdkJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hDQSxDQUFDQTtnQkFZREYseUNBQVFBLEdBQVJBLFVBQVNBLE1BQW9DQSxFQUFFQSxRQUFpQkE7b0JBQWhFRyxpQkFRQ0E7b0JBUEFBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO3dCQUMxQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25DQSxDQUFDQTtvQkFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7d0JBQy9CQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbkNBLENBQUNBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxDQUFDQTtnQkFFREgsMkNBQVVBLEdBQVZBLFVBQVdBLFFBQWlCQTtvQkFDM0JJLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO3dCQUN0QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3RDQSxDQUFDQTtvQkFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ3JCQSxDQUFDQTtnQkFDRkosNkJBQUNBO1lBQURBLENBeENBRCxBQXdDQ0MsSUFBQUQ7WUF4Q1lBLHNDQUFzQkEseUJBd0NsQ0EsQ0FBQUE7WUFNREEsNkJBQTZCQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxvQkFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDakVBLHVDQUE4Q0EsaUJBQXVEQTtnQkFDcEdNLFlBQVlBLENBQUNBO2dCQUViQSxNQUFNQSxDQUFDQTtvQkFDTkEsV0FBV0E7d0JBQ1ZDLE1BQU1BLENBQUNBLElBQUlBLHNCQUFzQkEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtvQkFDdERBLENBQUNBO2lCQUNERCxDQUFDQTtZQUNIQSxDQUFDQTtZQVJlTiw2Q0FBNkJBLGdDQVE1Q0EsQ0FBQUE7WUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsMEJBQVVBLEVBQUVBLENBQUNBLG9CQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtpQkFDakRBLE9BQU9BLENBQUNBLDJCQUFXQSxFQUFFQSw2QkFBNkJBLENBQUNBLENBQUNBO1FBQ3ZEQSxDQUFDQSxFQXhFbUJqQixlQUFlQSxHQUFmQSx5QkFBZUEsS0FBZkEseUJBQWVBLFFBd0VsQ0E7SUFBREEsQ0FBQ0EsRUF4RVNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBd0VsQkE7QUFBREEsQ0FBQ0EsRUF4RU0sRUFBRSxLQUFGLEVBQUUsUUF3RVI7QUM5RUQseUJBQXlCO0FBRXpCLElBQU8sRUFBRSxDQW1EUjtBQW5ERCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FtRGxCQTtJQW5EU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsSUFBSUEsQ0FtRHZCQTtRQW5EbUJBLFdBQUFBLElBQUlBLEVBQUNBLENBQUNBO1lBQ3pCeUIsWUFBWUEsQ0FBQ0E7WUFFRkEsZUFBVUEsR0FBV0EsbUJBQW1CQSxDQUFDQTtZQUN6Q0EsZ0JBQVdBLEdBQVdBLGFBQWFBLENBQUNBO1lBWS9DQTtnQkFDQ0M7b0JBRERDLGlCQStCQ0E7b0JBN0JDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQTt3QkFDWkEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO3dCQUN2REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBQ0EsSUFBWUEsSUFBZUEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ2pHQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3JEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ25EQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3BEQSxFQUFFQSxJQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3REQSxFQUFFQSxJQUFJQSxFQUFFQSxXQUFXQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3pEQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3ZEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7d0JBQ3hEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7cUJBQ3hEQSxDQUFDQTtnQkFDSEEsQ0FBQ0E7Z0JBSU9ELGdDQUFVQSxHQUFsQkEsVUFBbUJBLElBQWFBO29CQUMvQkUsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxDQUFDQTtnQkFFREYsbUNBQWFBLEdBQWJBLFVBQWNBLEtBQWFBO29CQUMxQkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQy9CQSxDQUFDQTtnQkFFREgsNkJBQU9BLEdBQVBBLFVBQVFBLEtBQWFBLEVBQUVBLElBQWFBO29CQUNuQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JDQSxDQUFDQTtnQkFDRkosa0JBQUNBO1lBQURBLENBL0JBRCxBQStCQ0MsSUFBQUQ7WUEvQllBLGdCQUFXQSxjQStCdkJBLENBQUFBO1lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGVBQVVBLEVBQUVBLEVBQUVBLENBQUNBO2lCQUM1QkEsT0FBT0EsQ0FBQ0EsZ0JBQVdBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO1FBQ3JDQSxDQUFDQSxFQW5EbUJ6QixJQUFJQSxHQUFKQSxjQUFJQSxLQUFKQSxjQUFJQSxRQW1EdkJBO0lBQURBLENBQUNBLEVBbkRTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQW1EbEJBO0FBQURBLENBQUNBLEVBbkRNLEVBQUUsS0FBRixFQUFFLFFBbURSO0FDckRELHlCQUF5QjtBQUN6QixzQkFBc0I7QUFFdEIsSUFBTyxFQUFFLENBbUJSO0FBbkJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQW1CbEJBO0lBbkJTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxNQUFNQSxDQW1CekJBO1FBbkJtQkEsV0FBQUEsTUFBTUEsRUFBQ0EsQ0FBQ0E7WUFDM0IrQixZQUFZQSxDQUFDQTtZQUVGQSxpQkFBVUEsR0FBV0EscUJBQXFCQSxDQUFDQTtZQUMzQ0Esa0JBQVdBLEdBQVdBLGVBQWVBLENBQUNBO1lBTWpEQTtnQkFBQUM7Z0JBS0FDLENBQUNBO2dCQUpBRCxzQ0FBY0EsR0FBZEEsVUFBZUEsV0FBbUJBLEVBQUVBLFVBQWtCQTtvQkFDckRFLFdBQVdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO29CQUNwQkEsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxDQUFDQTtnQkFDRkYsb0JBQUNBO1lBQURBLENBTEFELEFBS0NDLElBQUFEO1lBTFlBLG9CQUFhQSxnQkFLekJBLENBQUFBO1lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtpQkFDNUJBLE9BQU9BLENBQUNBLGtCQUFXQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUN2Q0EsQ0FBQ0EsRUFuQm1CL0IsTUFBTUEsR0FBTkEsZ0JBQU1BLEtBQU5BLGdCQUFNQSxRQW1CekJBO0lBQURBLENBQUNBLEVBbkJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQW1CbEJBO0FBQURBLENBQUNBLEVBbkJNLEVBQUUsS0FBRixFQUFFLFFBbUJSO0FDdEJELHlCQUF5QjtBQUV6QixJQUFPLEVBQUUsQ0F3QlI7QUF4QkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBd0JsQkE7SUF4QlNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLE1BQU1BLENBd0J6QkE7UUF4Qm1CQSxXQUFBQSxNQUFNQSxFQUFDQSxDQUFDQTtZQUMzQm1DLFlBQVlBLENBQUNBO1lBRUZBLGlCQUFVQSxHQUFXQSxxQkFBcUJBLENBQUNBO1lBQzNDQSxrQkFBV0EsR0FBV0EsZUFBZUEsQ0FBQ0E7WUFFakRBLElBQUtBLElBR0pBO1lBSERBLFdBQUtBLElBQUlBO2dCQUNSQyx1Q0FBWUEsQ0FBQUE7Z0JBQ1pBLHdDQUFhQSxDQUFBQTtZQUNkQSxDQUFDQSxFQUhJRCxJQUFJQSxLQUFKQSxJQUFJQSxRQUdSQTtZQU1EQTtnQkFBQUU7Z0JBS0FDLENBQUNBO2dCQUpBRCxvQ0FBWUEsR0FBWkEsVUFBYUEsR0FBV0EsRUFBRUEsUUFBZ0JBO29CQUN6Q0UsSUFBSUEsSUFBSUEsR0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7b0JBQzFEQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFTQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkdBLENBQUNBO2dCQUNGRixvQkFBQ0E7WUFBREEsQ0FMQUYsQUFLQ0UsSUFBQUY7WUFMWUEsb0JBQWFBLGdCQUt6QkEsQ0FBQUE7WUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQVVBLEVBQUVBLEVBQUVBLENBQUNBO2lCQUM1QkEsT0FBT0EsQ0FBQ0Esa0JBQVdBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO1FBQ3ZDQSxDQUFDQSxFQXhCbUJuQyxNQUFNQSxHQUFOQSxnQkFBTUEsS0FBTkEsZ0JBQU1BLFFBd0J6QkE7SUFBREEsQ0FBQ0EsRUF4QlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBd0JsQkE7QUFBREEsQ0FBQ0EsRUF4Qk0sRUFBRSxLQUFGLEVBQUUsUUF3QlI7QUMxQkQseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0F5Q1I7QUF6Q0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBeUNsQkE7SUF6Q1NBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLE1BQU1BLENBeUN6QkE7UUF6Q21CQSxXQUFBQSxRQUFNQSxFQUFDQSxDQUFDQTtZQUMzQndDLFlBQVlBLENBQUNBO1lBRUZBLG1CQUFVQSxHQUFXQSxxQkFBcUJBLENBQUNBO1lBQzNDQSxvQkFBV0EsR0FBV0EsZUFBZUEsQ0FBQ0E7WUFhakRBO2dCQUFBQztnQkFvQkFDLENBQUNBO2dCQW5CQUQscUNBQWFBLEdBQWJBLFVBQWNBLE1BQVdBO29CQUN4QkUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFDYkEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUM5QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0E7b0JBQ2hDQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQy9CQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtvQkFDeEJBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsTUFBTUEsQ0FBQ0EsTUFBTUEsS0FBS0EsRUFBRUEsQ0FBQ0E7b0JBQ3RCQSxDQUFDQTtnQkFDRkEsQ0FBQ0E7Z0JBRURGLDBDQUFrQkEsR0FBbEJBLFVBQW1CQSxNQUFXQTtvQkFDN0JHLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUN4QkEsTUFBTUEsR0FBWUEsTUFBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7b0JBQ2xDQSxDQUFDQTtvQkFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ25DQSxDQUFDQTtnQkFDRkgsb0JBQUNBO1lBQURBLENBcEJBRCxBQW9CQ0MsSUFBQUQ7WUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQVVBLEVBQUVBLEVBQUVBLENBQUNBO2lCQUM1QkEsT0FBT0EsQ0FBQ0Esb0JBQVdBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO1FBQ3ZDQSxDQUFDQSxFQXpDbUJ4QyxNQUFNQSxHQUFOQSxnQkFBTUEsS0FBTkEsZ0JBQU1BLFFBeUN6QkE7SUFBREEsQ0FBQ0EsRUF6Q1NELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBeUNsQkE7QUFBREEsQ0FBQ0EsRUF6Q00sRUFBRSxLQUFGLEVBQUUsUUF5Q1I7QUM1Q0QseUJBQXlCO0FBRXpCLElBQU8sRUFBRSxDQXNEUjtBQXRERCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FzRGxCQTtJQXREU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsbUJBQW1CQSxDQXNEdENBO1FBdERtQkEsV0FBQUEsbUJBQW1CQSxFQUFDQSxDQUFDQTtZQUN4QzZDLFlBQVlBLENBQUNBO1lBRUZBLDhCQUFVQSxHQUFXQSxtQ0FBbUNBLENBQUNBO1lBQ3pEQSwrQkFBV0EsR0FBV0EscUJBQXFCQSxDQUFDQTtZQWdCdkRBO2dCQUFBQztnQkE4QkFDLENBQUNBO2dCQTdCQUQscURBQWdCQSxHQUFoQkEsVUFBNEJBLEtBQXdCQTtvQkFDbkRFLE1BQU1BLENBQUNBLEtBQUtBLElBQUlBLEtBQUtBLENBQUNBLFFBQVFBLElBQUlBLElBQUlBOzBCQUNuQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUE7MEJBQ3ZCQSxJQUFJQSxDQUFDQTtnQkFDVEEsQ0FBQ0E7Z0JBRURGLHlEQUFvQkEsR0FBcEJBLFVBQWdDQSxTQUE4QkE7b0JBQTlERyxpQkFJQ0E7b0JBSEFBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFVBQUNBLEtBQXdCQSxJQUFrQkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFZQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt5QkFDL0dBLE1BQU1BLENBQUNBLFVBQUNBLFFBQW1CQSxJQUFnQkEsTUFBTUEsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7eUJBQ3RFQSxLQUFLQSxFQUFFQSxDQUFDQTtnQkFDZkEsQ0FBQ0E7Z0JBRURILDBEQUFxQkEsR0FBckJBLFVBQWlDQSxLQUF3QkEsRUFBRUEsUUFBbUJBO29CQUM3RUksRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ25CQSxNQUFNQSxDQUFDQTtvQkFDUkEsQ0FBQ0E7b0JBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO3dCQUM1QkEsS0FBS0EsQ0FBQ0EsUUFBUUEsR0FBR0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0E7b0JBQ3JDQSxDQUFDQTtvQkFFREEsSUFBSUEsZUFBZUEsR0FBY0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7b0JBRXpEQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDN0JBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO29CQUNwQ0EsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxHQUFjQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtvQkFDMUVBLENBQUNBO2dCQUNGQSxDQUFDQTtnQkFDRkosaUNBQUNBO1lBQURBLENBOUJBRCxBQThCQ0MsSUFBQUQ7WUE5QllBLDhDQUEwQkEsNkJBOEJ0Q0EsQ0FBQUE7WUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsOEJBQVVBLEVBQUVBLEVBQUVBLENBQUNBO2lCQUM1QkEsT0FBT0EsQ0FBQ0EsK0JBQVdBLEVBQUVBLDBCQUEwQkEsQ0FBQ0EsQ0FBQ0E7UUFDcERBLENBQUNBLEVBdERtQjdDLG1CQUFtQkEsR0FBbkJBLDZCQUFtQkEsS0FBbkJBLDZCQUFtQkEsUUFzRHRDQTtJQUFEQSxDQUFDQSxFQXREU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFzRGxCQTtBQUFEQSxDQUFDQSxFQXRETSxFQUFFLEtBQUYsRUFBRSxRQXNEUjtBQ3hERCx5QkFBeUI7QUFDekIsc0JBQXNCO0FBRXRCLElBQU8sRUFBRSxDQW1CUjtBQW5CRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FtQmxCQTtJQW5CU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsT0FBT0EsQ0FtQjFCQTtRQW5CbUJBLFdBQUFBLFNBQU9BLEVBQUNBLENBQUNBO1lBQzVCbUQsWUFBWUEsQ0FBQ0E7WUFFRkEsb0JBQVVBLEdBQVdBLHNCQUFzQkEsQ0FBQ0E7WUFDNUNBLHFCQUFXQSxHQUFXQSxnQkFBZ0JBLENBQUNBO1lBT2xEQTtnQkFBQUM7Z0JBSUFDLENBQUNBO2dCQUhBRCxrQ0FBU0EsR0FBVEEsVUFBVUEsT0FBWUE7b0JBQ3JCRSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDekZBLENBQUNBO2dCQUNGRixxQkFBQ0E7WUFBREEsQ0FKQUQsQUFJQ0MsSUFBQUQ7WUFKWUEsd0JBQWNBLGlCQUkxQkEsQ0FBQUE7WUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQVVBLEVBQUVBLEVBQUVBLENBQUNBO2lCQUM1QkEsT0FBT0EsQ0FBQ0EscUJBQVdBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO1FBQ3hDQSxDQUFDQSxFQW5CbUJuRCxPQUFPQSxHQUFQQSxpQkFBT0EsS0FBUEEsaUJBQU9BLFFBbUIxQkE7SUFBREEsQ0FBQ0EsRUFuQlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBbUJsQkE7QUFBREEsQ0FBQ0EsRUFuQk0sRUFBRSxLQUFGLEVBQUUsUUFtQlI7QUN0QkQseUJBQXlCO0FBQ3pCLDhGQUE4RjtBQUU5RixvREFBb0Q7QUFFcEQsSUFBTyxFQUFFLENBaUNSO0FBakNELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQWlDbEJBO0lBakNTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxRQUFRQSxDQWlDM0JBO1FBakNtQkEsV0FBQUEsVUFBUUEsRUFBQ0EsQ0FBQ0E7WUFDN0J1RCxZQUFZQSxDQUFDQTtZQUVGQSxxQkFBVUEsR0FBV0EsMEJBQTBCQSxDQUFDQTtZQUNoREEsc0JBQVdBLEdBQVdBLFVBQVVBLENBQUNBO1lBQ2pDQSxxQkFBVUEsR0FBV0Esc0JBQVdBLEdBQUdBLFFBQVFBLENBQUNBO1lBT3ZEQSxRQUFRQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxnQkFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLGtCQUF5QkEsYUFBb0NBO2dCQUM1REMsWUFBWUEsQ0FBQ0E7Z0JBQ2JBLE1BQU1BLENBQUNBLFVBQUNBLEtBQVdBLEVBQUVBLFVBQW1CQSxFQUFFQSxlQUF5QkE7b0JBQ2xFQSxlQUFlQSxHQUFHQSxlQUFlQSxJQUFJQSxJQUFJQSxHQUFHQSxLQUFLQSxHQUFHQSxlQUFlQSxDQUFDQTtvQkFFcEVBLElBQUlBLEdBQUdBLEdBQVdBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsS0FBS0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7b0JBQ2xGQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDaEJBLEVBQUVBLENBQUNBLENBQUNBLFVBQVVBLElBQUlBLElBQUlBLElBQUlBLEdBQUdBLENBQUNBLE1BQU1BLEdBQUdBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBOzRCQUNuREEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQ25DQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDckJBLEdBQUdBLElBQUlBLEtBQUtBLENBQUNBOzRCQUNkQSxDQUFDQTt3QkFDRkEsQ0FBQ0E7b0JBQ0ZBLENBQUNBO29CQUNEQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtnQkFDWkEsQ0FBQ0EsQ0FBQ0E7WUFDSEEsQ0FBQ0E7WUFoQmVELG1CQUFRQSxXQWdCdkJBLENBQUFBO1lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLHFCQUFVQSxFQUFFQSxDQUFDQSxnQkFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7aUJBQzdDQSxNQUFNQSxDQUFDQSxzQkFBV0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDakNBLENBQUNBLEVBakNtQnZELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUFpQzNCQTtJQUFEQSxDQUFDQSxFQWpDU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFpQ2xCQTtBQUFEQSxDQUFDQSxFQWpDTSxFQUFFLEtBQUYsRUFBRSxRQWlDUjtBQ3RDRCxpQkFBaUI7QUFFakIsK0NBQStDO0FBQy9DLG1FQUFtRTtBQUNuRSw2Q0FBNkM7QUFDN0MsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUNqRCxpREFBaUQ7QUFDakQseURBQXlEO0FBQ3pELDJFQUEyRTtBQUMzRSxtREFBbUQ7QUFDbkQsNkNBQTZDO0FBRTdDLElBQU8sRUFBRSxDQWVSO0FBZkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBZWxCQTtJQWZTQSxXQUFBQSxTQUFTQSxFQUFDQSxDQUFDQTtRQUNUQyxvQkFBVUEsR0FBV0EsY0FBY0EsQ0FBQ0E7UUFFL0NBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBO1lBQ3BCQSxlQUFLQSxDQUFDQSxVQUFVQTtZQUNoQkEseUJBQWVBLENBQUNBLFVBQVVBO1lBQzFCQSxjQUFJQSxDQUFDQSxVQUFVQTtZQUNmQSxnQkFBTUEsQ0FBQ0EsVUFBVUE7WUFDakJBLGdCQUFNQSxDQUFDQSxVQUFVQTtZQUNqQkEsZ0JBQU1BLENBQUNBLFVBQVVBO1lBQ2pCQSxvQkFBVUEsQ0FBQ0EsVUFBVUE7WUFDckJBLDZCQUFtQkEsQ0FBQ0EsVUFBVUE7WUFDOUJBLGlCQUFPQSxDQUFDQSxVQUFVQTtZQUNsQkEsa0JBQVFBLENBQUNBLFVBQVVBO1NBQ25CQSxDQUFDQSxDQUFDQTtJQUNKQSxDQUFDQSxFQWZTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQWVsQkE7QUFBREEsQ0FBQ0EsRUFmTSxFQUFFLEtBQUYsRUFBRSxRQWVSO0FDNUJELHlCQUF5QjtBQUN6QixzQkFBc0I7QUFDdEIsNEJBQTRCO0FBRTVCLElBQU8sRUFBRSxDQW1GUjtBQW5GRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FtRmxCQTtJQW5GU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsSUFBSUEsQ0FtRnZCQTtRQW5GbUJBLFdBQUFBLElBQUlBLEVBQUNBLENBQUNBO1lBa0J6QnlEO2dCQUFBQztnQkE4REFDLENBQUNBO2dCQTdEQUQsK0JBQU1BLEdBQU5BO29CQUFPRSxzQkFBeUJBO3lCQUF6QkEsV0FBeUJBLENBQXpCQSxzQkFBeUJBLENBQXpCQSxJQUF5QkE7d0JBQXpCQSxxQ0FBeUJBOztvQkFDL0JBLHlEQUF5REE7b0JBQ3pEQSxJQUFJQSxRQUFRQSxHQUFXQSxFQUFFQSxDQUFDQTtvQkFFMUJBLDJFQUEyRUE7b0JBQzNFQSxpREFBaURBO29CQUNqREEsSUFBSUEsZ0JBQWdCQSxHQUFVQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtvQkFDcERBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQUNBLDBCQUEwQkE7NkJBQTFCQSxXQUEwQkEsQ0FBMUJBLHNCQUEwQkEsQ0FBMUJBLElBQTBCQTs0QkFBMUJBLHlDQUEwQkE7O3dCQUNoREEsMERBQTBEQTt3QkFDMURBLCtEQUErREE7d0JBQy9EQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxVQUFDQSxPQUFlQSxFQUFFQSxLQUFhQTs0QkFDbkRBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLGdCQUFnQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7d0JBQzdDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7b0JBRXRDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtnQkFDakJBLENBQUNBO2dCQUVERiw2QkFBSUEsR0FBSkEsVUFBS0EsS0FBVUE7b0JBQ2RHLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQUNBLFFBQXNDQTt3QkFDMURBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLEtBQVVBLEVBQUVBLEdBQVdBOzRCQUNyQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsUUFBUUEsRUFBRUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLENBQUNBO2dCQUVESCxtQ0FBVUEsR0FBVkEsVUFBNEJBLGNBQXNCQSxFQUFFQSxLQUFXQSxFQUFFQSxNQUFZQTtvQkFDNUVJLElBQUlBLFFBQVFBLEdBQVFBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFlBQVlBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO29CQUM3REEsSUFBSUEsVUFBVUEsR0FBbUJBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBO29CQUNyREEsSUFBSUEsV0FBV0EsR0FBUUEsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7b0JBRTVDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxFQUFFQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtvQkFFM0NBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO3dCQUNwQkEsTUFBTUEsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ2JBLENBQUNBO29CQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFFdEJBLE1BQU1BLENBQUNBO3dCQUNOQSxLQUFLQSxFQUFFQSxLQUFLQTt3QkFDWkEsVUFBVUEsRUFBbUJBLFdBQVdBLENBQUNBLGNBQWNBLEVBQUVBLE1BQU1BLENBQUNBO3FCQUNoRUEsQ0FBQ0E7Z0JBQ0hBLENBQUNBO2dCQUVESixrQ0FBU0EsR0FBVEEsVUFBVUEsR0FBV0E7b0JBQ3BCSyxJQUFJQSxRQUFRQSxHQUFRQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxZQUFZQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtvQkFDMURBLElBQUlBLFVBQVVBLEdBQW1CQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQTtvQkFDckRBLElBQUlBLFFBQVFBLEdBQVFBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBO29CQUV0Q0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtvQkFFdkNBLElBQUlBLFNBQVNBLEdBQVFBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO29CQUMvQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7b0JBQ3JCQSxNQUFNQSxDQUFDQTt3QkFDTkEsU0FBU0EsRUFBRUEsU0FBU0E7d0JBQ3BCQSxLQUFLQSxFQUFFQSxTQUFTQSxDQUFDQSxZQUFZQSxFQUFFQTtxQkFDL0JBLENBQUNBO2dCQUNIQSxDQUFDQTtnQkFDRkwscUJBQUNBO1lBQURBLENBOURBRCxBQThEQ0MsSUFBQUQ7WUFFVUEsbUJBQWNBLEdBQW9CQSxJQUFJQSxjQUFjQSxFQUFFQSxDQUFDQTtRQUNuRUEsQ0FBQ0EsRUFuRm1CekQsSUFBSUEsR0FBSkEsY0FBSUEsS0FBSkEsY0FBSUEsUUFtRnZCQTtJQUFEQSxDQUFDQSxFQW5GU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFtRmxCQTtBQUFEQSxDQUFDQSxFQW5GTSxFQUFFLEtBQUYsRUFBRSxRQW1GUjtBQ3ZGRCxxREFBcUQ7QUFDckQsdURBQXVEO0FBQ3ZELHdEQUF3RDtBQUN4RCwwREFBMEQ7QUFFMUQsQUFHQSx5Q0FIeUM7QUFDekMsa0RBQWtEO0FBVWxELFFBQVEsQ0FBQyxjQUFjLEVBQUU7SUFDeEIsSUFBSSxZQUE4QyxDQUFDO0lBRW5ELFVBQVUsQ0FBQztRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRW5ELElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUYsWUFBWSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdkIsRUFBRSxDQUFDLDZFQUE2RSxFQUFFO1lBQ2pGLElBQUksS0FBSyxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFTLEtBQUssRUFBRSxVQUFDLElBQVksSUFBZ0IsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNySCxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBUyxLQUFLLEVBQUUsVUFBQyxJQUFZLElBQWdCLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xILENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2xCLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtZQUN6RSxJQUFJLEtBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV0QyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxtRUFBbUUsRUFBRTtZQUN2RSxJQUFJLEtBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV0QyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFZLElBQWdCLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRyxNQUFNLENBQUMsS0FB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Q0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFELE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNuQixFQUFFLENBQUMsNENBQTRDLEVBQUU7WUFDaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENB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Q0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU5QixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4RkFBOEYsRUFBRTtRQUNsRyxJQUFJLElBQUksR0FBbUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXZDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QixJQUFJLElBQUksR0FBYSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtRQUM1RCxJQUFJLFdBQVcsR0FBK0IsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMxRCxJQUFJLE1BQU0sR0FBbUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUksTUFBTSxHQUFlLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLG1DQUFtQyxDQUFDLENBQUM7UUFFckUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUNuR0gscURBQXFEO0FBQ3JELHVEQUF1RDtBQUN2RCx3REFBd0Q7QUFDeEQsMERBQTBEO0FBRTFELEFBR0EsdURBSHVEO0FBQ3ZELGtEQUFrRDtBQU1sRCxRQUFRLENBQUMscUJBQXFCLEVBQUU7SUFDL0IsSUFBSSxtQkFBaUYsQ0FBQztJQUV0RixVQUFVLENBQUM7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxRyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RSxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDcEIsRUFBRSxDQUFDLDhFQUE4RSxFQUFFO1lBQ2xGLElBQUksS0FBSyxHQUEyRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN2RixJQUFJLFFBQVEsR0FBa0IsRUFBRSxNQUFNLEVBQUUsY0FBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRXRFLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUzRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO1lBQzNELElBQUksaUJBQWlCLEdBQWdFLEVBQUUsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEgsSUFBSSxRQUFRLEdBQWtCLEVBQUUsTUFBTSxFQUFFLGNBQWdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUV0RSxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUV2RSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFPLGlCQUFpQixDQUFDLFFBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDREQUE0RCxFQUFFO1lBQ2hFLElBQUksUUFBUSxHQUFrQixFQUFFLE1BQU0sRUFBRSxjQUFnQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdEUsSUFBSSxLQUFLLEdBQTJELElBQUksQ0FBQztZQUN6RSxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUM1QixFQUFFLENBQUMsZ0RBQWdELEVBQUU7WUFDcEQsSUFBSSxTQUFTLEdBQWtCLEVBQUUsTUFBTSxFQUFFLGNBQWdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBMkQsRUFBRSxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQztZQUUxRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHNEQUFzRCxFQUFFO1lBQzFELElBQUksU0FBUyxHQUFrQixFQUFFLE1BQU0sRUFBRSxjQUFnQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdkUsSUFBSSxTQUFTLEdBQWtCLEVBQUUsTUFBTSxFQUFFLGNBQWdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2RSxJQUFJLFNBQVMsR0FBNkQ7Z0JBQ3pFLEVBQUUsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFO2dCQUNyQyxFQUFFLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDaEMsRUFBRSxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUU7YUFDckMsQ0FBQztZQUVGLElBQUksU0FBUyxHQUFvQixtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyRixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FDMUVILHFEQUFxRDtBQUNyRCx1REFBdUQ7QUFDdkQsdURBQXVEO0FBQ3ZELHdEQUF3RDtBQUN4RCwwREFBMEQ7QUFFMUQsMkNBQTJDO0FBQzNDLGtEQUFrRDtBQUVsRCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDMUIsSUFBSSxjQUFvRCxDQUFDO0lBRXpELFVBQVUsQ0FBQztRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXJELElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUYsY0FBYyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDckIsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1lBQ25ELElBQUksT0FBTyxHQUFXO2dCQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUU7YUFDbEIsQ0FBQztZQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7WUFDeEQsSUFBSSxHQUFHLEdBQVcsU0FBUyxDQUFDO1lBQzVCLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQztZQUVyQixNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FDckNILHNCQUFzQjtBQUN0QixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLHlCQUF5QjtBQUV6QixJQUFPLEVBQUUsQ0F3RlI7QUF4RkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBd0ZsQkE7SUF4RlNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLElBQUlBLENBd0Z2QkE7UUF4Rm1CQSxXQUFBQSxJQUFJQSxFQUFDQSxDQUFDQTtZQUN6QnlELFlBQVlBLENBQUNBO1lBZWJBO2dCQUFBTztnQkFxRUFDLENBQUNBO2dCQXBFQUQsc0JBQU9BLEdBQVBBLFVBQVFBLE9BQWFBO29CQUNwQkUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzFDQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDZEEsQ0FBQ0E7b0JBRURBLE9BQU9BLENBQUNBLGtCQUFrQkEsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBRWhDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQTtnQkFDaEJBLENBQUNBO2dCQUVERixzQkFBT0EsR0FBUEEsVUFBbUJBLE9BQVlBLEVBQUVBLFVBQWtCQSxFQUFFQSxJQUFnQkEsRUFBRUEsVUFBb0JBO29CQUMxRkcsNkJBQTZCQTtvQkFDN0JBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFdBQVdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUMvQkEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7b0JBQ25CQSxDQUFDQTtvQkFFREEsT0FBT0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7d0JBQy9CQSxJQUFJQSxRQUFRQSxHQUE4QkEsTUFBTUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7d0JBRTVEQSxPQUFPQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBOzRCQUMvQkEsT0FBT0EsRUFBRUEsUUFBUUE7NEJBQ2pCQSxJQUFJQSxFQUFFQSxJQUFJQTs0QkFDVkEsVUFBVUEsRUFBRUEsVUFBVUE7eUJBQ3RCQSxDQUFDQSxDQUFDQTt3QkFFSEEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7b0JBQzNCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDSkEsQ0FBQ0E7Z0JBRURILGtDQUFtQkEsR0FBbkJBLFVBQStCQSxPQUFZQSxFQUFFQSxVQUFrQkEsRUFBRUEsUUFBeUNBLEVBQUVBLFVBQW9CQTtvQkFBaElJLGlCQWlCQ0E7b0JBaEJBQSw2QkFBNkJBO29CQUM3QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQy9CQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDbkJBLENBQUNBO29CQUVEQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQTt3QkFBQ0EsZ0JBQWdCQTs2QkFBaEJBLFdBQWdCQSxDQUFoQkEsc0JBQWdCQSxDQUFoQkEsSUFBZ0JBOzRCQUFoQkEsK0JBQWdCQTs7d0JBQ2hEQSxJQUFJQSxRQUFRQSxHQUE4QkEsTUFBTUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7d0JBRTVEQSxPQUFPQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBOzRCQUMvQkEsT0FBT0EsRUFBRUEsUUFBUUE7NEJBQ2pCQSxJQUFJQSxFQUFFQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFJQSxFQUFFQSxNQUFNQSxDQUFDQTs0QkFDbENBLFVBQVVBLEVBQUVBLFVBQVVBO3lCQUN0QkEsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO29CQUMzQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLENBQUNBO2dCQUVESixvQkFBS0EsR0FBTEEsVUFBaUJBLE9BQVlBLEVBQUVBLEtBQWlCQTtvQkFDL0NLLDBEQUEwREE7b0JBQzFEQSxJQUFJQSxzQkFBc0JBLEdBQThCQSxPQUFPQSxDQUFDQSxrQkFBa0JBLENBQUNBO29CQUNuRkEsT0FBT0EsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFFaENBLDBCQUEwQkE7b0JBQzFCQSwrRkFBK0ZBO29CQUMvRkEsaUVBQWlFQTtvQkFDakVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsVUFBQ0EsT0FBZ0NBO3dCQUMvREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3hCQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDdkNBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDUEEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3RDQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3BDQSxLQUFLQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTt3QkFDakJBLENBQUNBO29CQUNGQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDSkEsQ0FBQ0E7Z0JBQ0ZMLFdBQUNBO1lBQURBLENBckVBUCxBQXFFQ08sSUFBQVA7WUFFVUEsU0FBSUEsR0FBVUEsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDckNBLENBQUNBLEVBeEZtQnpELElBQUlBLEdBQUpBLGNBQUlBLEtBQUpBLGNBQUlBLFFBd0Z2QkE7SUFBREEsQ0FBQ0EsRUF4RlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBd0ZsQkE7QUFBREEsQ0FBQ0EsRUF4Rk0sRUFBRSxLQUFGLEVBQUUsUUF3RlI7QUM3RkQscURBQXFEO0FBQ3JELHVEQUF1RDtBQUN2RCx3REFBd0Q7QUFDeEQsMERBQTBEO0FBRTFELG9DQUFvQztBQUNwQyxrREFBa0Q7QUFFbEQsUUFBUSxDQUFDLFVBQVUsRUFBRTtJQUNwQixJQUFJLFFBQStDLENBQUM7SUFFcEQsVUFBVSxDQUFDO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdEQsSUFBSSxRQUFRLEdBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RixRQUFRLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO1FBQzVELE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOERBQThELEVBQUU7UUFDbEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0RBQWdELEVBQUU7UUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUU7UUFDaEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFDeEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdGQUFnRixFQUFFO1FBQ3BGLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnRkFBZ0YsRUFBRTtRQUNwRixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUdBQXFHLEVBQUU7UUFDekcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpR0FBaUcsRUFBRTtRQUNyRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidXRpbGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5hcnJheSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYXJyYXknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhcnJheVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZTtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkO1xyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm06IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyO1xyXG5cdFx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IFREYXRhVHlwZVtdO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBudW1iZXJ9KTogVERhdGFUeXBlW107XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgdGFyZ2V0SW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuXHRcdFx0XHRcdHRhcmdldEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSB8IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcblx0XHRcdFx0aW5kZXggPSB0aGlzLmZpbmRJbmRleE9mKGFycmF5LCA8eyhvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW59Pml0ZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCA8VERhdGFUeXBlPml0ZW0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXIgPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciBsaXN0OiBudW1iZXJbXTtcclxuXHJcblx0XHRcdGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxpc3QgPSA8YW55W10+YXJyYXk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShsaXN0LCAoc3VtOiBudW1iZXIsIG51bTogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIHwgbnVtYmVyIH0pOiBURGF0YVR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShhcnJheSwgKGRpY3Rpb25hcnk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGVbXSA9PiB7XHJcblx0XHRcdFx0ZGljdGlvbmFyeVs8YW55PmtleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHRcdH0sIFtdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLm9ic2VydmFibGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdhdGNoZXIge1xyXG5cdFx0YWN0aW9uKC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdFx0ZXZlbnQ/OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElSZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdChhY3Rpb246IHsoLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWR9LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb25cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHQoKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHJlZ2lzdGVyOiBJUmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXJ2aWNlIGltcGxlbWVudHMgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyW10gPSBbXTtcclxuXHRcdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsoLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWR9LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmaXJlKGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblx0XHRcdF8uZWFjaCh0aGlzLndhdGNoZXJzLCAod2F0Y2hlcjogSVdhdGNoZXIpID0+IHtcclxuXHRcdFx0XHRpZiAod2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50KSB7XHJcblx0XHRcdFx0XHR3YXRjaGVyLmFjdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRcdHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgT2JzZXJ2YWJsZVNlcnZpY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdjb250ZW50UHJvdmlkZXJGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQ7XHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudCh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQ7XHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5O1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld1RleHQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlIGltcGxlbWVudHMgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3Iob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0XHRwcml2YXRlIGNvbnRlbnQ6IEpRdWVyeTtcclxuXHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudDogeyh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWR9ID0gKHRyYW5zY2x1ZGVGdW5jdGlvbjogbmcuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKHRyYW5zY2x1ZGVGdW5jdGlvbikpIHtcclxuXHRcdFx0XHR0cmFuc2NsdWRlRnVuY3Rpb24oKGNsb25lOiBKUXVlcnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2V0Q29udGVudChjbG9uZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRDb250ZW50KG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YWJsZS5yZWdpc3RlcigoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9LCAnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5IHtcclxuXHRcdFx0aWYgKHNlbGVjdG9yICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50LmZpbHRlcihzZWxlY3Rvcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbb2JzZXJ2YWJsZS5zZXJ2aWNlTmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRQcm92aWRlclNlcnZpY2Uob2JzZXJ2YWJsZUZhY3RvcnkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZGF0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZGF0ZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9udGgge1xyXG5cdFx0bmFtZTogc3RyaW5nO1xyXG5cdFx0ZGF5cyh5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZVV0aWxpdHkge1xyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nO1xyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIERhdGVVdGlsaXR5IHtcclxuXHRcdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0XHR0aGlzLm1vbnRoID0gW1xyXG5cdFx0XHRcdHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRmVicnVhcnknLCBkYXlzOiAoeWVhcjogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHRoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjg7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdNYXJjaCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBcHJpbCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdNYXknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVuZScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdWx5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0F1Z3VzdCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnT2N0b2JlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdOb3ZlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XTtcclxuXHRcdH1cclxuXHJcblx0XHRtb250aDogSU1vbnRoW107XHJcblxyXG5cdFx0cHJpdmF0ZSBpc0xlYXBZZWFyKHllYXI/OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKHllYXIsIDEsIDI5KS5nZXRNb250aCgpID09PSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5uYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5kYXlzKHllYXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgRGF0ZVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEpRdWVyeVV0aWxpdHkgaW1wbGVtZW50cyBJSlF1ZXJ5VXRpbGl0eSB7XHJcblx0XHRyZXBsYWNlQ29udGVudChjb250ZW50QXJlYTogSlF1ZXJ5LCBuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0Y29udGVudEFyZWEuZW1wdHkoKTtcclxuXHRcdFx0Y29udGVudEFyZWEuYXBwZW5kKG5ld0NvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgSlF1ZXJ5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLm51bWJlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuXHRlbnVtIFNpZ24ge1xyXG5cdFx0cG9zaXRpdmUgPSAxLFxyXG5cdFx0bmVnYXRpdmUgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgc2lnbjogU2lnbiA9IG51bSA+PSAwID8gU2lnbi5wb3NpdGl2ZSA6IFNpZ24ubmVnYXRpdmU7XHJcblx0XHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgTnVtYmVyVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLm9iamVjdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMub2JqZWN0JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnb2JqZWN0VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9iamVjdFV0aWxpdHkge1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKF8uaXNBcnJheShvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSkge1xyXG5cdFx0XHRcdHJldHVybiBfLmlzTmFOKG9iamVjdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIG9iamVjdCA9PT0gJyc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG5cdFx0XHRcdG9iamVjdCA9ICg8c3RyaW5nPm9iamVjdCkudHJpbSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBPYmplY3RVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3Ige1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpZXdEYXRhPFRCZWhhdmlvcj4ge1xyXG5cdFx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNoaWxkPFRCZWhhdmlvcj4ge1xyXG5cdFx0dmlld0RhdGE6IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0XHQ6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXSB7XHJcblx0XHRcdHJldHVybiBfKGNoaWxkTGlzdCkubWFwKChjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3IgPT4geyByZXR1cm4gdGhpcy5nZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LmZpbHRlcigoYmVoYXZpb3I6IFRCZWhhdmlvcik6IGJvb2xlYW4gPT4geyByZXR1cm4gYmVoYXZpb3IgIT0gbnVsbDsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC52YWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQge1xyXG5cdFx0XHRpZiAoY2hpbGQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNoaWxkLnZpZXdEYXRhID09IG51bGwpIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGN1cnJlbnRCZWhhdmlvcjogVEJlaGF2aW9yID0gY2hpbGQudmlld0RhdGEuYmVoYXZpb3I7XHJcblxyXG5cdFx0XHRpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gPFRCZWhhdmlvcj5fLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5wcm9taXNlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5wcm9taXNlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncHJvbWlzZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbjtcclxuXHRcdGlzUHJvbWlzZShwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMudHJ1bmNhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS5jb21wb25lbnRzLnRydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdFx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0dHJ1bmNhdGUuJGluamVjdCA9IFtvYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBvYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRcdGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcblxyXG5cdFx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG5cdFx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdFx0b3V0ICs9ICcuLi4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gb3V0O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRlbnRQcm92aWRlci9jb250ZW50UHJvdmlkZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS9kYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2pxdWVyeS9qcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlL3RydW5jYXRlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdFx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRcdGNvbnRlbnRQcm92aWRlci5tb2R1bGVOYW1lLFxyXG5cdFx0ZGF0ZS5tb2R1bGVOYW1lLFxyXG5cdFx0anF1ZXJ5Lm1vZHVsZU5hbWUsXHJcblx0XHRudW1iZXIubW9kdWxlTmFtZSxcclxuXHRcdG9iamVjdC5tb2R1bGVOYW1lLFxyXG5cdFx0b2JzZXJ2YWJsZS5tb2R1bGVOYW1lLFxyXG5cdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdFx0cHJvbWlzZS5tb2R1bGVOYW1lLFxyXG5cdFx0dHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJNb2Nrc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0XHRkaXJlY3RpdmU6IChkb206IHN0cmluZykgPT4gSURpcmVjdGl2ZVJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogYW5ndWxhci5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29udHJvbGxlcjogYW55ID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0XHRpZiAobG9jYWxzID09IG51bGwpIHtcclxuXHRcdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogPFRDb250cm9sbGVyVHlwZT4kY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXJlY3RpdmUoZG9tOiBzdHJpbmcpOiBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbXBpbGU6IGFueSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcblxyXG5cdFx0XHR2YXIgY29tcG9uZW50OiBhbnkgPSAkY29tcGlsZShkb20pKCRyb290U2NvcGUpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0XHRzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuaW50ZXJmYWNlIElUZXN0T2JqIHtcclxuXHRwcm9wOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJS2V5T2JqIHtcclxuXHRrZXk6IG51bWJlcjtcclxufVxyXG5cclxuZGVzY3JpYmUoJ2FycmF5VXRpbGl0eScsICgpID0+IHtcclxuXHR2YXIgYXJyYXlVdGlsaXR5OiBybC51dGlsaXRpZXMuYXJyYXkuSUFycmF5VXRpbGl0eTtcclxuXHJcblx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRhbmd1bGFyLm1vY2subW9kdWxlKHJsLnV0aWxpdGllcy5hcnJheS5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMuYXJyYXkuc2VydmljZU5hbWUpO1xyXG5cdFx0YXJyYXlVdGlsaXR5ID0gc2VydmljZXNbcmwudXRpbGl0aWVzLmFycmF5LnNlcnZpY2VOYW1lXTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ2ZpbmRJbmRleE9mJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCBmaW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBpbiBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHByZWRpY2F0ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFycmF5OiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHJcblx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkuZmluZEluZGV4T2Y8bnVtYmVyPihhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gJSAyKSA9PT0gMDsgfSkpLnRvLmVxdWFsKDEpO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mPG51bWJlcj4oYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtID4gMTApOyB9KSkudG8uZXF1YWwoLTEpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdyZW1vdmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIHJlbW92ZSB0aGUgc3BlY2lmaWVkIGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIHJldHVybiB0aGUgaXRlbScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFycmF5OiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHJcblx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAzKSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdGV4cGVjdChhcnJheS5sZW5ndGgpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnJlbW92ZShhcnJheSwgMTApKS50by5ub3QuZXhpc3Q7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJlbW92ZSB0aGUgZmlyc3QgaXRlbSBtYXRjaGluZyB0aGUgcHJlZGljYXRlIGFuZCByZXR1cm4gaXQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBhcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblxyXG5cdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnJlbW92ZShhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gPiAzKTsgfSkpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRleHBlY3QoYXJyYXkubGVuZ3RoKS50by5lcXVhbCg0KTtcclxuXHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5yZW1vdmUoYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtID4gMTApOyB9KSkudG8ubm90LmV4aXN0O1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdyZXBsYWNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCByZXBsYWNlIGFuIGl0ZW0gaW4gdGhlIGFycmF5IHdpdGggYW5vdGhlciBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYXJyYXlXaXRoSXRlbXM6IG51bWJlcltdID0gWzMsIDUsIDddO1xyXG5cdFx0XHRhcnJheVV0aWxpdHkucmVwbGFjZShhcnJheVdpdGhJdGVtcywgNSwgMTApO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzBdKS50by5lcXVhbCgzKTtcclxuXHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzFdKS50by5lcXVhbCgxMCk7XHJcblx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1syXSkudG8uZXF1YWwoNyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGRvIG5vdGhpbmcgaWYgdGhlIGl0ZW0gdG8gcmVwbGFjZSBpcyBub3QgZm91bmQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBhcnJheVdpdGhJdGVtczogbnVtYmVyW10gPSBbNCwgNiwgOF07XHJcblx0XHRcdGFycmF5VXRpbGl0eS5yZXBsYWNlKGFycmF5V2l0aEl0ZW1zLCA1LCAxMCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMF0pLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMV0pLnRvLmVxdWFsKDYpO1xyXG5cdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMl0pLnRvLmVxdWFsKDgpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdzdW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIHN1bSB0aGUgdmFsdWVzIGluIGFuIGFycmF5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgdmFsdWVzOiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMTUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBhcHBseSBhIHRyYW5zZm9ybSB0byB0aGUgdmFsdWVzIGJlZm9yZSBzdW1taW5nIHRoZW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciB2YWx1ZXM6IElUZXN0T2JqW10gPSBbeyBwcm9wOiAxIH0sIHsgcHJvcDogNCB9LCB7IHByb3A6IDcgfV07XHJcblx0XHRcdHZhciB0cmFuc2Zvcm06IHsgKGl0ZW06IElUZXN0T2JqKTogbnVtYmVyIH0gPSAoaXRlbTogSVRlc3RPYmopOiBudW1iZXIgPT4geyByZXR1cm4gaXRlbS5wcm9wOyB9O1xyXG5cdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnN1bSh2YWx1ZXMsIHRyYW5zZm9ybSkpLnRvLmVxdWFsKDEyKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIDAgaWYgdGhlcmUgYXJlIG5vIGl0ZW1zIHRvIHN1bScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHZhbHVlczogbnVtYmVyW10gPSBbXTtcclxuXHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ3RvRGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdGl0KCdzaG91bGQgY29udmVydCBhbiBhcnJheSB0byBhIGRpY3Rpb25hcnknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBhcnJheTogSUtleU9ialtdID0gW1xyXG5cdFx0XHRcdHsga2V5OiAxMSB9LFxyXG5cdFx0XHRcdHsga2V5OiAxMiB9LFxyXG5cdFx0XHRcdHsga2V5OiAxMyB9LFxyXG5cdFx0XHRcdHsga2V5OiAxNCB9LFxyXG5cdFx0XHRcdHsga2V5OiAxNSB9LFxyXG5cdFx0XHRdO1xyXG5cclxuXHRcdFx0dmFyIGRpY3Rpb25hcnk6IElLZXlPYmpbXSA9IGFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkoYXJyYXksIChpdGVtOiBJS2V5T2JqKTogbnVtYmVyID0+IHsgcmV0dXJuIGl0ZW0ua2V5OyB9KTtcclxuXHJcblx0XHRcdGV4cGVjdChkaWN0aW9uYXJ5WzExXSkudG8uZXF1YWwoYXJyYXlbMF0pO1xyXG5cdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxMl0pLnRvLmVxdWFsKGFycmF5WzFdKTtcclxuXHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTNdKS50by5lcXVhbChhcnJheVsyXSk7XHJcblx0XHRcdGV4cGVjdChkaWN0aW9uYXJ5WzE0XSkudG8uZXF1YWwoYXJyYXlbM10pO1xyXG5cdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxNV0pLnRvLmVxdWFsKGFycmF5WzRdKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59KTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuZGVzY3JpYmUoJ2NvbnRlbnRQcm92aWRlcicsICgpID0+IHtcclxuXHR2YXIgY29udGVudFByb3ZpZGVyOiBybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLklDb250ZW50UHJvdmlkZXJTZXJ2aWNlO1xyXG5cdHZhciB0cmFuc2NsdWRlU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHR2YXIgZmlsdGVyU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHR2YXIganF1ZXJ5Q2xvbmU6IGFueTtcclxuXHJcblx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRhbmd1bGFyLm1vY2subW9kdWxlKHJsLnV0aWxpdGllcy5jb250ZW50UHJvdmlkZXIubW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBybC51dGlsaXRpZXMudGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QocmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5zZXJ2aWNlTmFtZSk7XHJcblx0XHR2YXIgY29udGVudFByb3ZpZGVyRmFjdG9yeTogcmwudXRpbGl0aWVzLmNvbnRlbnRQcm92aWRlci5JQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnlcclxuXHRcdFx0PSBzZXJ2aWNlc1tybC51dGlsaXRpZXMuY29udGVudFByb3ZpZGVyLnNlcnZpY2VOYW1lXTtcclxuXHRcdGNvbnRlbnRQcm92aWRlciA9IGNvbnRlbnRQcm92aWRlckZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHJcblx0XHRqcXVlcnlDbG9uZSA9IHt9O1xyXG5cdFx0ZmlsdGVyU3B5ID0gc2lub24uc3B5KChvYmplY3Q6IGFueSk6IGFueSA9PiB7IHJldHVybiBvYmplY3Q7IH0pO1xyXG5cdFx0anF1ZXJ5Q2xvbmUuZmlsdGVyID0gZmlsdGVyU3B5O1xyXG5cclxuXHRcdHRyYW5zY2x1ZGVTcHkgPSBzaW5vbi5zcHkoKGZ1bmM6IEZ1bmN0aW9uKSA9PiBmdW5jKGpxdWVyeUNsb25lKSk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgZ2V0IHRoZSBjb250ZW50IHRoYXQgd2FzIHNldCBieSBzZXRDb250ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cdFx0ZXhwZWN0KGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCkpLnRvLmVxdWFsKGpxdWVyeUNsb25lKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBzZXQgdGhlIGNvbnRlbnQgdG8gdGhlIGNvbnRlbnQgcHJvdmlkZWQgYnkgdGhlIHRyYW5zY2x1ZGUgZnVuY3Rpb24nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRjb250ZW50UHJvdmlkZXIuc2V0VHJhbnNjbHVkZUNvbnRlbnQodHJhbnNjbHVkZVNweSk7XHJcblxyXG5cdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodHJhbnNjbHVkZVNweSk7XHJcblxyXG5cdFx0ZXhwZWN0KGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCkpLnRvLmVxdWFsKGpxdWVyeUNsb25lKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBmaWx0ZXIgdGhlIGpxdWVyeSBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cclxuXHRcdGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCdzZWxlY3RvcicpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZpbHRlclNweSk7XHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChmaWx0ZXJTcHksICdzZWxlY3RvcicpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIGNhbGwgdGhlIGFjdGlvbiB3aXRoIHRoZSBuZXcgY29udGVudCB3aGVuIHRoZSBjb250ZW50IGNoYW5nZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHR2YXIgYWN0aW9uU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdGNvbnRlbnRQcm92aWRlci5yZWdpc3RlcihhY3Rpb25TcHkpO1xyXG5cclxuXHRcdGNvbnRlbnRQcm92aWRlci5zZXRDb250ZW50KGpxdWVyeUNsb25lKTtcclxuXHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShhY3Rpb25TcHkpO1xyXG5cdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYWN0aW9uU3B5LCBqcXVlcnlDbG9uZSk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgY2FsbCB0aGUgYWN0aW9uIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGlzIGFscmVhZHkgY29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdHZhciBhY3Rpb25TcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cclxuXHRcdGNvbnRlbnRQcm92aWRlci5yZWdpc3RlcihhY3Rpb25TcHkpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGFjdGlvblNweSk7XHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChhY3Rpb25TcHksIGpxdWVyeUNsb25lKTtcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuZGVzY3JpYmUoJ2RhdGVVdGlsaXR5JywgKCkgPT4ge1xyXG5cdHZhciBkYXRlVXRpbGl0eTogcmwudXRpbGl0aWVzLmRhdGUuSURhdGVVdGlsaXR5O1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLmRhdGUubW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBybC51dGlsaXRpZXMudGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QocmwudXRpbGl0aWVzLmRhdGUuc2VydmljZU5hbWUpO1xyXG5cdFx0ZGF0ZVV0aWxpdHkgPSBzZXJ2aWNlc1tybC51dGlsaXRpZXMuZGF0ZS5zZXJ2aWNlTmFtZV07XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdnZXRGdWxsU3RyaW5nJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIG1vbnRoIG5hbWUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDApKS50by5lcXVhbCgnSmFudWFyeScpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygxKSkudG8uZXF1YWwoJ0ZlYnJ1YXJ5Jyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDIpKS50by5lcXVhbCgnTWFyY2gnKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMykpLnRvLmVxdWFsKCdBcHJpbCcpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg0KSkudG8uZXF1YWwoJ01heScpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg1KSkudG8uZXF1YWwoJ0p1bmUnKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNikpLnRvLmVxdWFsKCdKdWx5Jyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDcpKS50by5lcXVhbCgnQXVndXN0Jyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDgpKS50by5lcXVhbCgnU2VwdGVtYmVyJyk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDkpKS50by5lcXVhbCgnT2N0b2JlcicpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygxMCkpLnRvLmVxdWFsKCdOb3ZlbWJlcicpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygxMSkpLnRvLmVxdWFsKCdEZWNlbWJlcicpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdnZXREYXlzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMCkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMikpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMykpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNCkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNSkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNikpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNykpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoOCkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoOSkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMTApKS50by5lcXVhbCgzMCk7XHJcblx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDExKSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBhY2NvdW50IGZvciBsZWFwIHllYXJzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxLCAyMDE1KSkudG8uZXF1YWwoMjgpO1xyXG5cdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxLCAyMDE2KSkudG8uZXF1YWwoMjkpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuZGVzY3JpYmUoJ251bWJlclV0aWxpdHknLCAoKSA9PiB7XHJcblx0dmFyIG51bWJlclV0aWxpdHk6IHJsLnV0aWxpdGllcy5udW1iZXIuSU51bWJlclV0aWxpdHk7XHJcblxyXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0YW5ndWxhci5tb2NrLm1vZHVsZShybC51dGlsaXRpZXMubnVtYmVyLm1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdHZhciBzZXJ2aWNlczogYW55ID0gcmwudXRpbGl0aWVzLnRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHJsLnV0aWxpdGllcy5udW1iZXIuc2VydmljZU5hbWUpO1xyXG5cdFx0bnVtYmVyVXRpbGl0eSA9IHNlcnZpY2VzW3JsLnV0aWxpdGllcy5udW1iZXIuc2VydmljZU5hbWVdO1xyXG5cdH0pO1xyXG5cclxuXHRkZXNjcmliZSgncHJlY2lzZVJvdW5kJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCByb3VuZCA2IHRvIDYnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCg2LCAyKTtcclxuXHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDYpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjI3NSB0byAxLjI4JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS4yNzUsIDIpO1xyXG5cdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS4yOCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuMjc0IHRvIDEuMjcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjI3NCwgMik7XHJcblx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgxLjI3KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcm91bmQgMS41NTU1NTU1NTU1NTU1NTU1NTU1NSB0byAxLjU1NTU1NTU1NTU1NTU1NTU1NTYnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdC8vIDIwIDUncy4gVGhpcyBpcyB0aGUgbWF4IHByZWNpc2lvbiBwcmVjaXNlX3JvdW5kIGlzIHZhbGlkIGZvclxyXG5cdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS41NTU1NTU1NTU1NTU1NTU1NTU1NSwgMTkpO1xyXG5cdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS41NTU1NTU1NTU1NTU1NTU1NTU2KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcm91bmQgMS45OTk5OTk5OTk5OTk5OTk5OTk5OTkgdG8gMicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuOTk5OTk5OTk5OTk5OTk5OTk5OTk5LCAyMCk7IC8vIDIxIDknc1xyXG5cdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG5vdCByb3VuZCAxLjExMTExMTExMTExMTExMTExMTExMScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuMTExMTExMTExMTExMTExMTExMTExLCAyMCk7IC8vIDIxIDEnc1xyXG5cdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS4xMTExMTExMTExMTExMTExMTExMSk7XHQvLyB0cmltbWVkIDEgZnJvbSB0aGUgZW5kXHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5kZXNjcmliZSgnb2JqZWN0VXRpbGl0eScsICgpID0+IHtcclxuXHR2YXIgb2JqZWN0VXRpbGl0eTogcmwudXRpbGl0aWVzLm9iamVjdC5JT2JqZWN0VXRpbGl0eTtcclxuXHJcblx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRhbmd1bGFyLm1vY2subW9kdWxlKHJsLnV0aWxpdGllcy5vYmplY3QubW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBybC51dGlsaXRpZXMudGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QocmwudXRpbGl0aWVzLm9iamVjdC5zZXJ2aWNlTmFtZSk7XHJcblx0XHRvYmplY3RVdGlsaXR5ID0gc2VydmljZXNbcmwudXRpbGl0aWVzLm9iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdpc051bGxPckVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkobnVsbCkpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gZW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJycpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBzdHJpbmcgaGFzIGNvbnRlbnRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KCdyYW5kb20gc3RyaW5nJykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgbnVsbCBvciBlbXB0eSBhcnJheXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkobnVsbCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoW10pKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFsxLCAyLCAzXSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBudW1iZXIgdHlwZSBpcyBub3QgYSBudW1iZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoTnVtYmVyLk5hTikpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoNSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdpc051bGxPcldoaXRlc3BhY2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBlbXB0eSB3aGl0ZXNwYWNlIHN0cmluZ3MnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgnICAgJykpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGhhbmRsZSBudWxsIGFuZCBlbXB0eSBvYmplY3RzIGxpa2UgaXNOdWxsT3JFbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKG51bGwpKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkobnVsbCkpO1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoW10pKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoW10pKTtcclxuXHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKHt9KSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KHt9KSk7XHJcblx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgnJykpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgnJykpO1xyXG5cdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoJ3JhbmRvbSBzdHJpbmcnKSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KCdyYW5kb20gc3RyaW5nJykpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nanF1ZXJ5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5kZXNjcmliZSgnanF1ZXJ5VXRpbGl0eScsICgpID0+IHtcclxuXHR2YXIganF1ZXJ5VXRpbGl0eTogcmwudXRpbGl0aWVzLmpxdWVyeS5JSlF1ZXJ5VXRpbGl0eTtcclxuXHR2YXIgZW1wdHlTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdHZhciBhcHBlbmRTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLmpxdWVyeS5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMuanF1ZXJ5LnNlcnZpY2VOYW1lKTtcclxuXHRcdGpxdWVyeVV0aWxpdHkgPSBzZXJ2aWNlcy5qcXVlcnlVdGlsaXR5O1xyXG5cclxuXHRcdGVtcHR5U3B5ID0gc2lub24uc3B5KCk7XHJcblx0XHRhcHBlbmRTcHkgPSBzaW5vbi5zcHkoKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBlbXB0eSB0aGUgZXhpc3RpbmcgY29udGVudCBhbmQgYXBwZW5kIHRoZSBuZXcgY29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdHZhciBleGlzdGluZ0VsZW1lbnQ6IGFueSA9IHtcclxuXHRcdFx0ZW1wdHk6IGVtcHR5U3B5LFxyXG5cdFx0XHRhcHBlbmQ6IGFwcGVuZFNweSxcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIG5ld0NvbnRlbnQ6IGFueSA9IHt9O1xyXG5cclxuXHRcdGpxdWVyeVV0aWxpdHkucmVwbGFjZUNvbnRlbnQoZXhpc3RpbmdFbGVtZW50LCBuZXdDb250ZW50KTtcclxuXHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShlbXB0eVNweSk7XHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShhcHBlbmRTcHkpO1xyXG5cdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYXBwZW5kU3B5LCBuZXdDb250ZW50KTtcclxuXHR9KTtcclxufSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5kZXNjcmliZSgnb2JzZXJ2YWJsZScsICgpID0+IHtcclxuXHR2YXIgb2JzZXJ2YWJsZTogcmwudXRpbGl0aWVzLm9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLm9ic2VydmFibGUubW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBybC51dGlsaXRpZXMudGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QocmwudXRpbGl0aWVzLm9ic2VydmFibGUuc2VydmljZU5hbWUpO1xyXG5cdFx0dmFyIG9ic2VydmFibGVGYWN0b3J5OiBybC51dGlsaXRpZXMub2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5XHJcblx0XHRcdD0gc2VydmljZXNbcmwudXRpbGl0aWVzLm9ic2VydmFibGUuc2VydmljZU5hbWVdO1xyXG5cdFx0b2JzZXJ2YWJsZSA9IG9ic2VydmFibGVGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgcmVnaXN0ZXIgYSB3YXRjaGVyIGFuZCBjYWxsIHRoZSBhY3Rpb24gd2hlbiBmaXJlIGlzIGNhbGxlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdHZhciBmdW5jOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYyk7XHJcblx0XHRvYnNlcnZhYmxlLmZpcmUoKTtcclxuXHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmdW5jKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCB1bnJlZ2lzdGVyIG9ubHkgdGhlIGluZGljYXRlZCB3YXRjaGVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0dmFyIHJlZ2lzdGVyZWRGdW5jMTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdHZhciB1bnJlZ2lzdGVyZWRGdW5jOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0dmFyIHJlZ2lzdGVyZWRGdW5jMjogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKHJlZ2lzdGVyZWRGdW5jMSk7XHJcblx0XHR2YXIgY2FuY2VsOiAoKSA9PiB2b2lkID0gb2JzZXJ2YWJsZS5yZWdpc3Rlcih1bnJlZ2lzdGVyZWRGdW5jKTtcclxuXHRcdG9ic2VydmFibGUucmVnaXN0ZXIocmVnaXN0ZXJlZEZ1bmMyKTtcclxuXHJcblx0XHRjYW5jZWwoKTtcclxuXHJcblx0XHRvYnNlcnZhYmxlLmZpcmUoKTtcclxuXHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShyZWdpc3RlcmVkRnVuYzEpO1xyXG5cdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZCh1bnJlZ2lzdGVyZWRGdW5jKTtcclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHJlZ2lzdGVyZWRGdW5jMik7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgb25seSBjYWxsIHdhdGNoZXIgcmVnaXN0ZXJlZCB3aXRoIHRoZSBzcGVjaWZpZWQgZXZlbnQgaWYgZmlyZSBpcyBjYWxsZWQgd2l0aCBhbiBldmVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdHZhciBmdW5jV2l0aEV2ZW50OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0dmFyIGZ1bmNXaXRob3V0RXZlbnQ6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihmdW5jV2l0aEV2ZW50LCAnbXlFdmVudCcpO1xyXG5cdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihmdW5jV2l0aG91dEV2ZW50KTtcclxuXHRcdG9ic2VydmFibGUuZmlyZSgnbXlFdmVudCcpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZnVuY1dpdGhvdXRFdmVudCk7XHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmdW5jV2l0aEV2ZW50KTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCBub3QgY2FsbCB3YXRjaGVycyByZWdpc3RlcmVkIHdpdGggYSBkaWZmZXJlbnQgZXZlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMsICdteUV2ZW50Jyk7XHJcblx0XHRvYnNlcnZhYmxlLmZpcmUoJ290aGVyRXZlbnQnKTtcclxuXHJcblx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZ1bmMpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIGNhbGwgdGhlIHJlZ2lzdGVyZWQgd2F0Y2hlcnMgd2l0aCB0aGUgYWRkaXRpb25hbCBwYXJhbXMgcGFzc2VkIGludG8gdGhlIGZpcmUgZnVuY3Rpb24nLCAoKTogdm9pZCA9PiB7XHJcblx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMsICdteUV2ZW50Jyk7XHJcblx0XHRvYnNlcnZhYmxlLmZpcmUoJ215RXZlbnQnLCAxLCAyLCAzLCA0LCA1KTtcclxuXHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmdW5jKTtcclxuXHJcblx0XHR2YXIgYXJnczogbnVtYmVyW10gPSBmdW5jLmZpcnN0Q2FsbC5hcmdzO1xyXG5cdFx0ZXhwZWN0KGFyZ3NbMF0pLnRvLmVxdWFsKDEpO1xyXG5cdFx0ZXhwZWN0KGFyZ3NbMV0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0ZXhwZWN0KGFyZ3NbMl0pLnRvLmVxdWFsKDMpO1xyXG5cdFx0ZXhwZWN0KGFyZ3NbM10pLnRvLmVxdWFsKDQpO1xyXG5cdFx0ZXhwZWN0KGFyZ3NbNF0pLnRvLmVxdWFsKDUpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIHJldHVybiB3aXRoIGFuIGVycm9yIGlmIG5vIGZ1bmN0aW9uIGlzIHByb3ZpZGVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0dmFyIG9yaWdpbmFsTG9nOiAobWVzc2FnZT86IHN0cmluZykgPT4gdm9pZCA9IGNvbnNvbGUubG9nO1xyXG5cdFx0dmFyIGxvZ1NweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdGNvbnNvbGUubG9nID0gbG9nU3B5O1xyXG5cclxuXHRcdHZhciBjYW5jZWw6ICgpID0+IHZvaWQgPSBvYnNlcnZhYmxlLnJlZ2lzdGVyKG51bGwpO1xyXG5cclxuXHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGxvZ1NweSk7XHJcblx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChsb2dTcHksICdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHJcblx0XHRleHBlY3QoY2FuY2VsKS50by5iZS5udWxsO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nID0gb3JpZ2luYWxMb2c7XHJcblx0fSk7XHJcbn0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbmludGVyZmFjZSBJVGVzdEJlaGF2aW9yIHtcclxuXHRhY3Rpb246IEZ1bmN0aW9uO1xyXG59XHJcblxyXG5kZXNjcmliZSgncGFyZW50Q2hpbGRCZWhhdmlvcicsICgpID0+IHtcclxuXHR2YXIgcGFyZW50Q2hpbGRCZWhhdmlvcjogcmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IuSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBybC51dGlsaXRpZXMudGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QocmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZU5hbWUpO1xyXG5cdFx0cGFyZW50Q2hpbGRCZWhhdmlvciA9IHNlcnZpY2VzW3JsLnV0aWxpdGllcy5wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2VOYW1lXTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ3JlZ2lzdGVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0aXQoJ3Nob3VsZCByZWdpc3RlciBhIGNoaWxkIGJlaGF2aW9yIGJ5IHB1dHRpbmcgaXQgb24gdGhlIHZpZXcgZGF0YSBvZiB0aGUgY2hpbGQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBjaGlsZDogcmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IuSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogbnVsbCB9O1xyXG5cdFx0XHR2YXIgYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAzOyB9IH07XHJcblxyXG5cdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yKS50by5lcXVhbChiZWhhdmlvcik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHVzZSB0aGUgZXhpc3Rpbmcgdmlld0RhdGEgb2JqZWN0IGlmIG9uZSBleGlzdHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBjaGlsZFdpdGhWaWV3RGF0YTogcmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IuSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0gPGFueT57IHZpZXdEYXRhOiB7IHJhbmRvbVZhbHVlOiA1IH0gfTtcclxuXHRcdFx0dmFyIGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gNTsgfSB9O1xyXG5cclxuXHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5yZWdpc3RlckNoaWxkQmVoYXZpb3IoY2hpbGRXaXRoVmlld0RhdGEsIGJlaGF2aW9yKTtcclxuXHJcblx0XHRcdGV4cGVjdChjaGlsZFdpdGhWaWV3RGF0YS52aWV3RGF0YS5iZWhhdmlvcikudG8uZXF1YWwoYmVoYXZpb3IpO1xyXG5cdFx0XHRleHBlY3QoKDxhbnk+Y2hpbGRXaXRoVmlld0RhdGEudmlld0RhdGEpLnJhbmRvbVZhbHVlKS50by5lcXVhbCg1KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgbm90IHJlZ2lzdGVyIGNoaWxkIGJlaGF2aW9yIGlmIGNoaWxkIG9iamVjdCBpcyBudWxsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAzOyB9IH07XHJcblx0XHRcdHZhciBjaGlsZDogcmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IuSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0gbnVsbDtcclxuXHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5yZWdpc3RlckNoaWxkQmVoYXZpb3IoY2hpbGQsIGJlaGF2aW9yKTtcclxuXHRcdFx0ZXhwZWN0KHBhcmVudENoaWxkQmVoYXZpb3IuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCkpLnRvLmJlLm51bGw7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ZGVzY3JpYmUoJ2dldENoaWxkQmVoYXZpb3InLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIGdldCB0aGUgYmVoYXZpb3Igb2YgYW4gaW5kaXZpZHVhbCBjaGlsZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yMTogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0dmFyIGNoaWxkOiBybC51dGlsaXRpZXMucGFyZW50Q2hpbGRCZWhhdmlvci5JQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjEgfSB9O1xyXG5cclxuXHRcdFx0ZXhwZWN0KHBhcmVudENoaWxkQmVoYXZpb3IuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCkpLnRvLmVxdWFsKGJlaGF2aW9yMSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGdldCBleGlzdGluZyBiZWhhdmlvcnMgZm9yIGEgbGlzdCBvZiBjaGlsZHJlbicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yMTogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0dmFyIGJlaGF2aW9yMjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDc7IH0gfTtcclxuXHRcdFx0dmFyIGNoaWxkTGlzdDogcmwudXRpbGl0aWVzLnBhcmVudENoaWxkQmVoYXZpb3IuSUNoaWxkPElUZXN0QmVoYXZpb3I+W10gPSBbXHJcblx0XHRcdFx0eyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfSxcclxuXHRcdFx0XHR7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBudWxsIH0gfSxcclxuXHRcdFx0XHR7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjIgfSB9LFxyXG5cdFx0XHRdO1xyXG5cclxuXHRcdFx0dmFyIGJlaGF2aW9yczogSVRlc3RCZWhhdmlvcltdID0gcGFyZW50Q2hpbGRCZWhhdmlvci5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGJlaGF2aW9ycy5sZW5ndGgpLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRleHBlY3QoYmVoYXZpb3JzWzBdKS50by5lcXVhbChiZWhhdmlvcjEpO1xyXG5cdFx0XHRleHBlY3QoYmVoYXZpb3JzWzFdKS50by5lcXVhbChiZWhhdmlvcjIpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuZGVzY3JpYmUoJ3Byb21pc2VVdGlsaXR5JywgKCkgPT4ge1xyXG5cdHZhciBwcm9taXNlVXRpbGl0eTogcmwudXRpbGl0aWVzLnByb21pc2UuSVByb21pc2VVdGlsaXR5O1xyXG5cclxuXHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdGFuZ3VsYXIubW9jay5tb2R1bGUocmwudXRpbGl0aWVzLnByb21pc2UubW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBybC51dGlsaXRpZXMudGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QocmwudXRpbGl0aWVzLnByb21pc2Uuc2VydmljZU5hbWUpO1xyXG5cdFx0cHJvbWlzZVV0aWxpdHkgPSBzZXJ2aWNlc1tybC51dGlsaXRpZXMucHJvbWlzZS5zZXJ2aWNlTmFtZV07XHJcblx0fSk7XHJcblxyXG5cdGRlc2NyaWJlKCdpc1Byb21pc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBvYmplY3QgaXMgYSBwcm9taXNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgcHJvbWlzZTogT2JqZWN0ID0ge1xyXG5cdFx0XHRcdHRoZW46IHNpbm9uLnNweSgpLFxyXG5cdFx0XHRcdGNhdGNoOiBzaW5vbi5zcHkoKSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGV4cGVjdChwcm9taXNlVXRpbGl0eS5pc1Byb21pc2UocHJvbWlzZSkpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgb2JqZWN0IGlzIG5vdCBhIHByb21pc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBzdHI6IHN0cmluZyA9ICdwcm9taXNlJztcclxuXHRcdFx0dmFyIG9iajogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHRleHBlY3QocHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlKHN0cikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QocHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlKG9iaikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG4iLCIvLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcbi8vIHVzZXMgdHlwaW5ncy9zaW5vblxyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMudGVzdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueTtcclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElNb2NrUmVxdWVzdDxURGF0YVR5cGU+IHtcclxuXHRcdHByb21pc2U6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT47XHJcblx0XHRkYXRhOiBURGF0YVR5cGU7XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnkge1xyXG5cdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoc2VydmljZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0c2VydmljZSA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHRcdHZhciBkZWZlcnJlZDogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPiA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuXHRcdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKC4uLnBhcmFtczogYW55W10pOiBhbnkgPT4ge1xyXG5cdFx0XHRcdHZhciBkZWZlcnJlZDogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPiA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuXHRcdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdFx0ZGF0YTogY2FsbGJhY2suYXBwbHkodGhpcywgcGFyYW1zKSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBzY29wZT86IG5nLklTY29wZSk6IHZvaWQge1xyXG5cdFx0XHQvLyBTYXZlIGxvY2FsIHJlZmVyZW5jZSB0byB0aGUgcmVxdWVzdCBsaXN0IGFuZCB0aGVuIGNsZWFyXHJcblx0XHRcdHZhciBjdXJyZW50UGVuZGluZ1JlcXVlc3RzOiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPltdID0gc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF87XHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHQvLyBQcm9jZXNzIHRoZSBzYXZlZCBsaXN0LlxyXG5cdFx0XHQvLyBUaGlzIHdheSBpZiBhbnkgYWRkaXRpb25hbCByZXF1ZXN0cyBhcmUgZ2VuZXJhdGVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlIGN1cnJlbnQgLyBsb2NhbCBsaXN0IFxyXG5cdFx0XHQvLyAgdGhlc2UgcmVxdWVzdHMgd2lsbCBiZSBxdWV1ZWQgdW50aWwgdGhlIG5leHQgY2FsbCB0byBmbHVzaCgpLlxyXG5cdFx0XHRfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgKHJlcXVlc3Q6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0aWYgKHJlcXVlc3Quc3VjY2Vzc2Z1bCkge1xyXG5cdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlc29sdmUocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlamVjdChyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0c2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIG1vY2s6IElNb2NrID0gbmV3IE1vY2soKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxuZGVzY3JpYmUoJ3RydW5jYXRlJywgKCkgPT4ge1xyXG5cdHZhciB0cnVuY2F0ZTogcmwudXRpbGl0aWVzLnRydW5jYXRlLklUcnVuY2F0ZUZpbHRlcjtcclxuXHJcblx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRhbmd1bGFyLm1vY2subW9kdWxlKHJsLnV0aWxpdGllcy50cnVuY2F0ZS5tb2R1bGVOYW1lKTtcclxuXHJcblx0XHR2YXIgc2VydmljZXM6IGFueSA9IHJsLnV0aWxpdGllcy50ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChybC51dGlsaXRpZXMudHJ1bmNhdGUuZmlsdGVyTmFtZSk7XHJcblx0XHR0cnVuY2F0ZSA9IHNlcnZpY2VzW3JsLnV0aWxpdGllcy50cnVuY2F0ZS5maWx0ZXJOYW1lXTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gbm8gc3RyaW5nIGlzIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdGV4cGVjdCh0cnVuY2F0ZSgpKS50by5lcXVhbCgnJyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyB3aGVuIGFuIGVtcHR5IHN0cmluZyBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRleHBlY3QodHJ1bmNhdGUoJycpKS50by5lcXVhbCgnJyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgcmV0dXJuIGEgc3RyaW5nIHdoZW4gYSBudW1iZXIgaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZXhwZWN0KHRydW5jYXRlKDM0LjUpKS50by5lcXVhbCgnMzQuNScpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIG5vdCB0cnVuY2F0ZSBhIHN0cmluZyB3aGVuIG5vIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnKSkudG8uZXF1YWwoJ1Rlc3Qgc3RyaW5nJyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyB3aGVuIHRydW5jYXRlVG8gaXMgMCcsICgpOiB2b2lkID0+IHtcclxuXHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCAwKSkudG8uZXF1YWwoJycpO1xyXG5cdH0pO1xyXG5cclxuXHRpdCgnc2hvdWxkIHRydW5jYXRlIGJ1dCBub3QgZWxsaXBzaW1vZ3JpZnkgYSBzdHJpbmcgd2hlbiBvbmx5IHRydW5jYXRlVG8gaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDYpKS50by5lcXVhbCgnVGVzdCBzJyk7XHJcblx0fSk7XHJcblxyXG5cdGl0KCdzaG91bGQgbm90IHRydW5jYXRlIGEgc3RyaW5nIHdoZW4gdHJ1bmNhdGVUbyBpcyBncmVhdGVyIHRoYW4gdGhlIHN0cmluZyBsZW5ndGgnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgMjUpKS50by5lcXVhbCgnVGVzdCBzdHJpbmcnKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCB0cnVuY2F0ZSBidXQgbm90IGVsbGlwc2ltb2dyaWZ5IGEgc3RyaW5nIHdoZW4gYm90aCB0cnVuY2F0ZVRvIGFuZCBpbmNsdWRlRWxsaXBzZXMgYXJlIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCA2LCBmYWxzZSkpLnRvLmVxdWFsKCdUZXN0IHMnKTtcclxuXHR9KTtcclxuXHJcblx0aXQoJ3Nob3VsZCB0cnVuY2F0ZSBhbmQgZWxsaXBzaW1vZ3JpZnkgYSBzdHJpbmcgd2hlbiBib3RoIHRydW5jYXRlVG8gYW5kIGluY2x1ZGVFbGxpcHNlcyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDYsIHRydWUpKS50by5lcXVhbCgnVGVzdCBzLi4uJyk7XHJcblx0fSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=