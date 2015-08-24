// uses typings/angular
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var behaviors;
        (function (behaviors) {
            var stopEventPropogation;
            (function (stopEventPropogation) {
                'use strict';
                stopEventPropogation.moduleName = 'rl.utilities.behaviors.stopEventPropogation';
                stopEventPropogation.directiveName = 'rlStopEventPropagation';
                function stopEventPropagation() {
                    'use strict';
                    return {
                        restrict: 'A',
                        link: function (scope, element, attrs) {
                            element.on(attrs.rlStopEventPropagation, function (event) {
                                event.preventDefault();
                                event.stopPropagation();
                            });
                        }
                    };
                }
                angular.module(stopEventPropogation.moduleName, [])
                    .directive(stopEventPropogation.directiveName, stopEventPropagation);
            })(stopEventPropogation = behaviors.stopEventPropogation || (behaviors.stopEventPropogation = {}));
        })(behaviors = utilities.behaviors || (utilities.behaviors = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var array;
            (function (array_1) {
                'use strict';
                array_1.moduleName = 'rl.utilities.services.array';
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
            })(array = services.array || (services.array = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
/// <reference path='../array/array.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var object;
            (function (object_1) {
                'use strict';
                object_1.moduleName = 'rl.utilities.services.object';
                object_1.serviceName = 'objectUtility';
                var ObjectUtility = (function () {
                    function ObjectUtility(array) {
                        this.array = array;
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
                    ObjectUtility.prototype.areEqual = function (obj1, obj2) {
                        var _this = this;
                        var type1 = typeof obj1;
                        var type2 = typeof obj2;
                        if (obj1 == null && obj2 == null) {
                            return true;
                        }
                        else if (obj1 == null || obj2 == null) {
                            return false;
                        }
                        if (type1 !== type2) {
                            return false;
                        }
                        else if (obj1 instanceof Array) {
                            if (obj1.length !== obj2.length) {
                                return false;
                            }
                            for (var i = 0; i < obj1.length; i++) {
                                if (this.areEqual(obj1[i], obj2[i]) === false) {
                                    return false;
                                }
                            }
                        }
                        else if (type1 === 'object') {
                            //init an object with the keys from obj2
                            var keys2 = _.keys(obj2);
                            _.forIn(obj1, function (value, key) {
                                if (_.has(obj2, key)) {
                                    //compare value against the value with the same key in obj2, then remove the key
                                    if (_this.areEqual(value, obj2[key]) === false) {
                                        return false;
                                    }
                                    else {
                                        _this.array.remove(keys2, key);
                                    }
                                }
                                else {
                                    return false;
                                }
                            });
                            //if there are still keys left in keys2, we know they are not equal (obj2 has more properties)
                            if (_.any(keys2)) {
                                return false;
                            }
                        }
                        else {
                            //if types are primitive, do a simple comparison
                            return obj1 === obj2;
                        }
                        return true;
                    };
                    ObjectUtility.prototype.toString = function (object) {
                        return object + '';
                    };
                    ObjectUtility.prototype.valueOrDefault = function (value, defaultValue) {
                        if (value != null) {
                            return value;
                        }
                        else {
                            return defaultValue;
                        }
                    };
                    ObjectUtility.$inject = [services.array.serviceName];
                    return ObjectUtility;
                })();
                angular.module(object_1.moduleName, [services.array.moduleName])
                    .service(object_1.serviceName, ObjectUtility);
            })(object = services.object || (services.object = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
/// <reference path='../../services/object/object.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var isEmpty;
            (function (isEmpty_1) {
                'use strict';
                var __object = rl.utilities.services.object;
                isEmpty_1.moduleName = 'rl.utilities.filters.isEmpty';
                isEmpty_1.serviceName = 'isEmpty';
                isEmpty_1.filterName = isEmpty_1.serviceName + 'Filter';
                isEmpty.$inject = [__object.serviceName];
                function isEmpty(object) {
                    'use strict';
                    return function (input, trueWhenEmpty) {
                        var isEmpty = object.isNullOrEmpty(input);
                        if (trueWhenEmpty === false) {
                            return !isEmpty;
                        }
                        return isEmpty;
                    };
                }
                angular.module(isEmpty_1.moduleName, [__object.moduleName])
                    .filter(isEmpty_1.serviceName, isEmpty);
            })(isEmpty = filters.isEmpty || (filters.isEmpty = {}));
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
// uses typings/angularMocks
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_1) {
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
            })(test = services_1.test || (services_1.test = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='isEmpty.ts' />
/// <reference path='../../services/test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var isEmpty;
            (function (isEmpty_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('isEmpty', function () {
                    var isEmpty;
                    beforeEach(function () {
                        angular.mock.module(isEmpty_2.moduleName);
                        var services = __test.angularFixture.inject(isEmpty_2.filterName);
                        isEmpty = services[isEmpty_2.filterName];
                    });
                    it('should return true if the array is null or empty', function () {
                        expect(isEmpty(null)).to.be.true;
                        expect(isEmpty([])).to.be.true;
                    });
                    it('should return false if the array has items', function () {
                        expect(isEmpty([1, 2, 3])).to.be.false;
                        expect(isEmpty(['1', '2', '3'])).to.be.false;
                    });
                    it('should invert the result if trueIfEmpty is specified as false', function () {
                        expect(isEmpty(null, false)).to.be.false;
                        expect(isEmpty([1, 2, 3], false)).to.be.true;
                    });
                });
            })(isEmpty = filters.isEmpty || (filters.isEmpty = {}));
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
/// <reference path='../../services/object/object.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var truncate;
            (function (truncate_1) {
                'use strict';
                var __object = rl.utilities.services.object;
                truncate_1.moduleName = 'rl21.utilities.filters.truncate';
                truncate_1.serviceName = 'truncate';
                truncate_1.filterName = truncate_1.serviceName + 'Filter';
                truncate.$inject = [__object.serviceName];
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
                angular.module(truncate_1.moduleName, [__object.moduleName])
                    .filter(truncate_1.serviceName, truncate);
            })(truncate = filters.truncate || (filters.truncate = {}));
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='truncate.ts' />
/// <reference path='../../services/test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            var truncate;
            (function (truncate_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('truncate', function () {
                    var truncate;
                    beforeEach(function () {
                        angular.mock.module(truncate_2.moduleName);
                        var services = __test.angularFixture.inject(truncate_2.filterName);
                        truncate = services[truncate_2.filterName];
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
            })(truncate = filters.truncate || (filters.truncate = {}));
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='array.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_2) {
            var array;
            (function (array_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('arrayUtility', function () {
                    var arrayUtility;
                    beforeEach(function () {
                        angular.mock.module(array_2.moduleName);
                        var services = __test.angularFixture.inject(array_2.serviceName);
                        arrayUtility = services[array_2.serviceName];
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
            })(array = services_2.array || (services_2.array = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var autosaveAction;
            (function (autosaveAction) {
                'use strict';
                autosaveAction.moduleName = 'rl.utilities.services.autosaveAction';
                autosaveAction.serviceName = 'autosaveAction';
                var AutosaveActionService = (function () {
                    function AutosaveActionService($timeout) {
                        var _this = this;
                        this.$timeout = $timeout;
                        this.completeMessageDuration = 1000;
                        this.autosaveSuccessful = function (data) {
                            return _this.resolveAutosave(data, true);
                        };
                        this.autosaveFailed = function (data) {
                            return _this.resolveAutosave(data, false);
                        };
                        this.resolveAutosave = function (data, success) {
                            _this._saving = false;
                            _this._complete = true;
                            _this._successful = success;
                            _this.$timeout(function () {
                                _this._complete = false;
                            }, _this.completeMessageDuration);
                            return data;
                        };
                    }
                    Object.defineProperty(AutosaveActionService.prototype, "saving", {
                        get: function () {
                            return this._saving;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AutosaveActionService.prototype, "complete", {
                        get: function () {
                            return this._complete;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AutosaveActionService.prototype, "successful", {
                        get: function () {
                            return this._successful;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    AutosaveActionService.prototype.trigger = function (promise) {
                        this._saving = true;
                        return promise.then(this.autosaveSuccessful)
                            .catch(this.autosaveFailed);
                    };
                    AutosaveActionService.$inject = ['$timeout'];
                    return AutosaveActionService;
                })();
                angular.module(autosaveAction.moduleName, [])
                    .service(autosaveAction.serviceName, AutosaveActionService);
            })(autosaveAction = services.autosaveAction || (services.autosaveAction = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
/// <reference path='../autosaveAction/autosaveAction.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var autosave;
            (function (autosave) {
                'use strict';
                var __autosaveAction = rl.utilities.services.autosaveAction;
                autosave.moduleName = 'rl.utilities.services.autosave';
                autosave.factoryName = 'autosaveFactory';
                var AutosaveService = (function () {
                    function AutosaveService(autosaveService, save, contentForm, validate) {
                        var _this = this;
                        this.autosaveService = autosaveService;
                        this.save = save;
                        this.contentForm = contentForm;
                        this.validate = validate;
                        this.autosave = function () {
                            var data = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                data[_i - 0] = arguments[_i];
                            }
                            if (_this.contentForm.$pristine) {
                                return true;
                            }
                            var valid = true;
                            if (_this.hasValidator) {
                                valid = _this.validate();
                                if (valid === undefined) {
                                    valid = true;
                                }
                            }
                            if (valid) {
                                _this.autosaveService.trigger(_this.save.apply(_this, data).then(function () {
                                    if (_this.contentForm != null) {
                                        _this.contentForm.$setPristine();
                                    }
                                }));
                                return true;
                            }
                            else {
                                return false;
                            }
                        };
                        this.hasValidator = validate != null;
                        if (this.contentForm == null) {
                            this.contentForm = this.nullForm();
                        }
                    }
                    AutosaveService.prototype.nullForm = function () {
                        return {
                            $pristine: false,
                            $setPristine: function () {
                                return;
                            },
                        };
                    };
                    return AutosaveService;
                })();
                autosaveServiceFactory.$inject = [__autosaveAction.serviceName];
                function autosaveServiceFactory(autosaveService) {
                    'use strict';
                    return {
                        getInstance: function (save, contentForm, validate) {
                            return new AutosaveService(autosaveService, save, contentForm, validate);
                        }
                    };
                }
                angular.module(autosave.moduleName, [__autosaveAction.moduleName])
                    .factory(autosave.factoryName, autosaveServiceFactory);
            })(autosave = services.autosave || (services.autosave = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='autosave.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_3) {
            var autosave;
            (function (autosave_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('autosave', function () {
                    var autosave;
                    var autosaveFactory;
                    var saveSpy;
                    var triggerSpy;
                    var setPristineSpy;
                    var baseContentForm;
                    var $rootScope;
                    beforeEach(function () {
                        angular.mock.module(autosave_1.moduleName);
                        triggerSpy = sinon.spy(function (promise) { return promise; });
                        var autosaveActionService = { trigger: triggerSpy };
                        __test.angularFixture.mock({
                            autosaveAction: autosaveActionService,
                        });
                        setPristineSpy = sinon.spy();
                        baseContentForm = {
                            $pristine: false,
                            $setPristine: setPristineSpy,
                        };
                        var services = __test.angularFixture.inject(autosave_1.factoryName, '$q', '$rootScope');
                        autosaveFactory = services[autosave_1.factoryName];
                        var $q = services.$q;
                        $rootScope = services.$rootScope;
                        saveSpy = sinon.spy(function () { return $q.when(); });
                    });
                    it('should call save on the parent and set the form to pristine', function () {
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm);
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.calledOnce(saveSpy);
                        $rootScope.$digest();
                        sinon.assert.calledOnce(setPristineSpy);
                    });
                    it('should not save if the form is pristine', function () {
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm);
                        baseContentForm.$pristine = true;
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.notCalled(saveSpy);
                    });
                    it('should validate using the validator if one exists', function () {
                        var validateSpy = sinon.spy(function () { return true; });
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm, validateSpy);
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.calledOnce(validateSpy);
                        sinon.assert.calledOnce(saveSpy);
                    });
                    it('should return false without saving if validation fails', function () {
                        var validateSpy = sinon.spy(function () { return false; });
                        autosave = autosaveFactory.getInstance(saveSpy, baseContentForm, validateSpy);
                        var close = autosave.autosave();
                        expect(close).to.be.false;
                        sinon.assert.calledOnce(validateSpy);
                        sinon.assert.notCalled(saveSpy);
                    });
                    it('should always save if no form is specified', function () {
                        autosave = autosaveFactory.getInstance(saveSpy);
                        var close = autosave.autosave();
                        expect(close).to.be.true;
                        sinon.assert.calledOnce(saveSpy);
                    });
                });
            })(autosave = services_3.autosave || (services_3.autosave = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='autosaveAction.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_4) {
            var autosaveAction;
            (function (autosaveAction_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('autosaveAction', function () {
                    var autosaveAction;
                    var $timeout;
                    var $q;
                    var $rootScope;
                    var deferred;
                    beforeEach(function () {
                        angular.mock.module(autosaveAction_1.moduleName);
                        var services = __test.angularFixture.inject(autosaveAction_1.serviceName, '$timeout', '$q', '$rootScope');
                        autosaveAction = services[autosaveAction_1.serviceName];
                        $timeout = services.$timeout;
                        $q = services.$q;
                        $rootScope = services.$rootScope;
                        deferred = $q.defer();
                        autosaveAction.trigger(deferred.promise);
                        expect(autosaveAction.saving).to.be.true;
                    });
                    it('should set successful to true if the promise resolves successfully', function () {
                        deferred.resolve();
                        $rootScope.$digest();
                        expect(autosaveAction.saving).to.be.false;
                        expect(autosaveAction.complete).to.be.true;
                        expect(autosaveAction.successful).to.be.true;
                    });
                    it('should set successful to false if the promise fails', function () {
                        deferred.reject();
                        $rootScope.$digest();
                        expect(autosaveAction.saving).to.be.false;
                        expect(autosaveAction.complete).to.be.true;
                        expect(autosaveAction.successful).to.be.false;
                    });
                    it('should set complete to false after 1 second', function () {
                        deferred.resolve();
                        $rootScope.$digest();
                        expect(autosaveAction.complete).to.be.true;
                        $timeout.flush(1000);
                        expect(autosaveAction.complete).to.be.false;
                    });
                });
            })(autosaveAction = services_4.autosaveAction || (services_4.autosaveAction = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var boolean;
            (function (boolean) {
                'use strict';
                boolean.moduleName = 'rl.utilities.services.boolean';
                boolean.serviceName = 'booleanUtility';
                var BooleanUtility = (function () {
                    function BooleanUtility() {
                    }
                    BooleanUtility.prototype.toBool = function (object) {
                        return !!object;
                    };
                    return BooleanUtility;
                })();
                angular.module(boolean.moduleName, [])
                    .service(boolean.serviceName, BooleanUtility);
            })(boolean = services.boolean || (services.boolean = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='boolean.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_5) {
            var boolean;
            (function (boolean) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('booleanUtility', function () {
                    var booleanUtility;
                    beforeEach(function () {
                        angular.mock.module(boolean.moduleName);
                        var services = __test.angularFixture.inject(boolean.serviceName);
                        booleanUtility = services[boolean.serviceName];
                    });
                    describe('toBool', function () {
                        it('should convert null and undefined to false', function () {
                            expect(booleanUtility.toBool(null)).to.be.false;
                            expect(booleanUtility.toBool(undefined)).to.be.false;
                        });
                        it('should leave bool values unchanged', function () {
                            expect(booleanUtility.toBool(false)).to.be.false;
                            expect(booleanUtility.toBool(true)).to.be.true;
                        });
                    });
                });
            })(boolean = services_5.boolean || (services_5.boolean = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var breakpoints;
            (function (breakpoints) {
                'use strict';
                breakpoints.lg = 'lg';
                breakpoints.md = 'md';
                breakpoints.sm = 'sm';
                breakpoints.xs = 'xs';
            })(breakpoints = services.breakpoints || (services.breakpoints = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/*
 * Implementation also requires the following elements to be inserted on the page:
 *   <div class="device-xs visible-xs"></div>
 *   <div class="device-sm visible-sm"></div>
 *   <div class="device-md visible-md"></div>
 *   <div class="device-lg visible-lg"></div>
 */
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var breakpoints;
            (function (breakpoints) {
                'use strict';
                breakpoints.visibleBreakpointsServiceName = 'visibleBreakpoint';
                var VisibleBreakpointService = (function () {
                    function VisibleBreakpointService() {
                    }
                    VisibleBreakpointService.prototype.isVisible = function (breakpoint) {
                        // jquery gets the breakpoint trigger directives listed above on line 3
                        return $('.device-' + breakpoint).is(':visible');
                    };
                    return VisibleBreakpointService;
                })();
                breakpoints.VisibleBreakpointService = VisibleBreakpointService;
            })(breakpoints = services.breakpoints || (services.breakpoints = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var observable;
            (function (observable) {
                'use strict';
                observable.moduleName = 'rl.utilities.services.observable';
                observable.factoryName = 'observableFactory';
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
                        return _(this.watchers).filter(function (watcher) {
                            return watcher != null && watcher.event === event;
                        })
                            .map(function (watcher) {
                            return watcher.action.apply(_this, params);
                        }).value();
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
                    .factory(observable.factoryName, observableServiceFactory);
            })(observable = services.observable || (services.observable = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
// uses typings/jquery
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var window;
            (function (window) {
                'use strict';
                window.moduleName = 'rl.utilities.services.window';
                window.serviceName = 'windowControl';
                var WindowService = (function () {
                    function WindowService() {
                        this.windowControl = $(window);
                    }
                    WindowService.prototype.resize = function (callback) {
                        this.windowControl.resize(callback);
                    };
                    return WindowService;
                })();
                angular.module(window.moduleName, [])
                    .service(window.serviceName, WindowService);
            })(window = services.window || (services.window = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angular
/// <reference path='breakpoints.ts' />
/// <reference path='visibleBreakpoints.service.ts' />
/// <reference path='../observable/observable.service.ts' />
/// <reference path='../window/window.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var breakpoints;
            (function (breakpoints) {
                'use strict';
                var __window = rl.utilities.services.window;
                var __observable = rl.utilities.services.observable;
                breakpoints.moduleName = 'rl.utilities.services.breakpoints';
                breakpoints.serviceName = 'breakpoints';
                var BreakpointService = (function () {
                    function BreakpointService(visibleBreakpoints, resizeDebounceMilliseconds, windowService, observableFactory) {
                        var _this = this;
                        this.visibleBreakpoints = visibleBreakpoints;
                        this.updateBreakpoint = function () {
                            var newBreakPoint = _this.getBreakpoint();
                            if (newBreakPoint !== _this.currentBreakpoint) {
                                _this.currentBreakpoint = newBreakPoint;
                                _this.observable.fire('window.breakpointChanged', _this.currentBreakpoint);
                            }
                        };
                        this.currentBreakpoint = this.getBreakpoint();
                        this.observable = observableFactory.getInstance();
                        var efficientResize = _.debounce(this.updateBreakpoint, resizeDebounceMilliseconds, {
                            leading: true,
                            trailing: true,
                            maxWait: resizeDebounceMilliseconds,
                        });
                        windowService.resize(efficientResize);
                    }
                    BreakpointService.prototype.getBreakpoint = function () {
                        if (this.visibleBreakpoints.isVisible(breakpoints.lg)) {
                            return breakpoints.lg;
                        }
                        else if (this.visibleBreakpoints.isVisible(breakpoints.md)) {
                            return breakpoints.md;
                        }
                        else if (this.visibleBreakpoints.isVisible(breakpoints.sm)) {
                            return breakpoints.sm;
                        }
                        else {
                            return breakpoints.xs;
                        }
                    };
                    BreakpointService.prototype.isBreakpoint = function (breakpoint) {
                        return this.currentBreakpoint === breakpoint;
                    };
                    BreakpointService.prototype.register = function (action) {
                        return this.observable.register(action, 'window.breakpointChanged');
                    };
                    BreakpointService.$inject = [breakpoints.visibleBreakpointsServiceName, 'resizeDebounceMilliseconds', __window.serviceName, __observable.factoryName];
                    return BreakpointService;
                })();
                breakpoints.BreakpointService = BreakpointService;
                angular.module(breakpoints.moduleName, [__window.moduleName, __observable.moduleName])
                    .constant('resizeDebounceMilliseconds', 500)
                    .service(breakpoints.visibleBreakpointsServiceName, breakpoints.VisibleBreakpointService)
                    .service(breakpoints.serviceName, BreakpointService);
            })(breakpoints = services.breakpoints || (services.breakpoints = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='breakpoints.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_6) {
            var breakpoints;
            (function (breakpoints_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('breakpoints', function () {
                    var breakpoints;
                    var visibleBreakpoint;
                    var triggerResize;
                    beforeEach(function () {
                        angular.mock.module(breakpoints_1.moduleName);
                    });
                    it('should have visible breakpoint marked as current', function () {
                        visibleBreakpoint = breakpoints_1.md;
                        buildService();
                        expect(breakpoints.currentBreakpoint).to.equal(breakpoints_1.md);
                        expect(breakpoints.isBreakpoint(breakpoints_1.md)).to.be.true;
                        expect(breakpoints.isBreakpoint(breakpoints_1.lg)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.sm)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.xs)).to.be.false;
                    });
                    it('should signal registered listeners when the breakpoint changes', function () {
                        var breakpointChangeSpy = sinon.spy();
                        visibleBreakpoint = breakpoints_1.sm;
                        buildService();
                        breakpoints.register(breakpointChangeSpy);
                        visibleBreakpoint = breakpoints_1.md;
                        triggerResize();
                        expect(breakpoints.currentBreakpoint).to.equal(breakpoints_1.md);
                        expect(breakpoints.isBreakpoint(breakpoints_1.md)).to.be.true;
                        expect(breakpoints.isBreakpoint(breakpoints_1.lg)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.sm)).to.be.false;
                        expect(breakpoints.isBreakpoint(breakpoints_1.xs)).to.be.false;
                        sinon.assert.calledOnce(breakpointChangeSpy);
                    });
                    function buildService() {
                        var mockVisibleBreakpointService = {
                            isVisible: function (breakpoint) {
                                return breakpoint === visibleBreakpoint;
                            },
                        };
                        var mockWindowControl = {
                            resize: function (callback) {
                                triggerResize = callback;
                            },
                        };
                        __test.angularFixture.mock({
                            visibleBreakpoint: mockVisibleBreakpointService,
                            windowControl: mockWindowControl,
                        });
                        var services = __test.angularFixture.inject(breakpoints_1.serviceName);
                        breakpoints = services[breakpoints_1.serviceName];
                    }
                });
            })(breakpoints = services_6.breakpoints || (services_6.breakpoints = {}));
        })(services = utilities.services || (utilities.services = {}));
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
        var services;
        (function (services) {
            var contentProvider;
            (function (contentProvider) {
                'use strict';
                contentProvider.moduleName = 'rl.utilities.services.contentProvider';
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
                contentProviderServiceFactory.$inject = [services.observable.factoryName];
                function contentProviderServiceFactory(observableFactory) {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new ContentProviderService(observableFactory);
                        }
                    };
                }
                angular.module(contentProvider.moduleName, [services.observable.moduleName])
                    .factory(contentProvider.serviceName, contentProviderServiceFactory);
            })(contentProvider = services.contentProvider || (services.contentProvider = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='contentProvider.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_7) {
            var contentProvider;
            (function (contentProvider_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('contentProvider', function () {
                    var contentProvider;
                    var transcludeSpy;
                    var filterSpy;
                    var jqueryClone;
                    beforeEach(function () {
                        angular.mock.module(contentProvider_1.moduleName);
                        var services = __test.angularFixture.inject(contentProvider_1.serviceName);
                        var contentProviderFactory = services[contentProvider_1.serviceName];
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
            })(contentProvider = services_7.contentProvider || (services_7.contentProvider = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date) {
                'use strict';
                date.dateServiceName = 'dateUtility';
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
            })(date = services.date || (services.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date) {
                date.dateTimeFormatServiceName = 'dateTimeFormatStrings';
                date.defaultFormats = {
                    dateTimeFormat: 'M/D/YYYY h:mm A',
                    dateFormat: 'M/D/YYYY',
                    timeFormat: 'h:mmA',
                };
            })(date = services.date || (services.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='date.service.ts' />
/// <reference path='dateTimeFormatStrings.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date) {
                date.moduleName = 'rl.utilities.services.date';
                angular.module(date.moduleName, [])
                    .service(date.dateServiceName, date.DateUtility)
                    .value(date.dateTimeFormatServiceName, date.defaultFormats);
            })(date = services.date || (services.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='date.module.ts' />
/// <reference path='date.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_8) {
            var date;
            (function (date) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('dateUtility', function () {
                    var dateUtility;
                    beforeEach(function () {
                        angular.mock.module(date.moduleName);
                        var services = __test.angularFixture.inject(date.dateServiceName);
                        dateUtility = services[date.dateServiceName];
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
            })(date = services_8.date || (services_8.date = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var number;
            (function (number) {
                'use strict';
                number.moduleName = 'rl.utilities.services.number';
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
                    NumberUtility.prototype.integerDivide = function (dividend, divisor) {
                        return Math.floor(dividend / divisor);
                    };
                    return NumberUtility;
                })();
                angular.module(number.moduleName, [])
                    .service(number.serviceName, NumberUtility);
            })(number = services.number || (services.number = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../number/number.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var fileSize;
            (function (fileSize) {
                fileSize.factoryName = 'fileSizeFactory';
                var FileSizeService = (function () {
                    function FileSizeService(numberUtility, bytes) {
                        this.BYTES_PER_GB = 1073741824;
                        this.BYTES_PER_MB = 1048576;
                        this.BYTES_PER_KB = 1024;
                        this.bytes = bytes;
                        if (bytes >= this.BYTES_PER_GB) {
                            this.isGB = true;
                            this.GB = bytes / this.BYTES_PER_GB;
                            this.GB = numberUtility.preciseRound(this.GB, 1);
                        }
                        else {
                            this.isGB = false;
                            if (bytes >= this.BYTES_PER_MB) {
                                this.isMB = true;
                                this.MB = bytes / this.BYTES_PER_MB;
                                this.MB = numberUtility.preciseRound(this.MB, 1);
                            }
                            else {
                                this.isMB = false;
                                if (bytes >= this.BYTES_PER_KB) {
                                    this.isKB = true;
                                    this.KB = bytes / this.BYTES_PER_KB;
                                    this.KB = numberUtility.preciseRound(this.KB, 1);
                                }
                                else {
                                    this.isKB = false;
                                }
                            }
                        }
                        this.bytes = Math.round(this.bytes);
                    }
                    FileSizeService.prototype.display = function () {
                        if (this.isGB) {
                            return this.GB + ' GB';
                        }
                        else if (this.isMB) {
                            return this.MB + ' MB';
                        }
                        else if (this.isKB) {
                            return this.KB + ' KB';
                        }
                        else {
                            return this.bytes + ' bytes';
                        }
                    };
                    return FileSizeService;
                })();
                fileSizeFactory.$inject = [services.number.serviceName];
                function fileSizeFactory(numberUtility) {
                    'use strict';
                    return {
                        getInstance: function (bytes) {
                            return new FileSizeService(numberUtility, bytes);
                        },
                    };
                }
                fileSize.fileSizeFactory = fileSizeFactory;
            })(fileSize = services.fileSize || (services.fileSize = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// Formats and optionally truncates and ellipsimogrifies a string for display in a card header
/// <reference path='fileSize.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var fileSize;
            (function (fileSize_1) {
                'use strict';
                fileSize_1.simpleFilterName = 'fileSize';
                fileSize_1.filterName = fileSize_1.simpleFilterName + 'Filter';
                fileSizeFilter.$inject = [fileSize_1.factoryName];
                function fileSizeFilter(fileSizeFactory) {
                    'use strict';
                    return function (bytes) {
                        var fileSize = fileSizeFactory.getInstance(bytes);
                        return fileSize.display();
                    };
                }
                fileSize_1.fileSizeFilter = fileSizeFilter;
            })(fileSize = services.fileSize || (services.fileSize = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
/// <reference path='../number/number.service.ts' />
/// <reference path='fileSize.service.ts' />
/// <reference path='fileSizeFilter.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var fileSize;
            (function (fileSize) {
                'use strict';
                fileSize.moduleName = 'rl21.utilities.services.fileSize';
                angular.module(fileSize.moduleName, [services.number.moduleName])
                    .factory(fileSize.factoryName, fileSize.fileSizeFactory)
                    .filter(fileSize.simpleFilterName, fileSize.fileSizeFilter);
            })(fileSize = services.fileSize || (services.fileSize = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='fileSize.module.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_9) {
            var fileSize;
            (function (fileSize) {
                describe('fileSize', function () {
                    var fileSizeFactory;
                    beforeEach(function () {
                        angular.mock.module(fileSize.moduleName);
                        var services = services_9.test.angularFixture.inject(fileSize.factoryName);
                        fileSizeFactory = services[fileSize.factoryName];
                    });
                    it('should determine bytes', function () {
                        expect(fileSizeFactory.getInstance(1).display()).to.equal('1 bytes');
                        expect(fileSizeFactory.getInstance(1023).display()).to.equal('1023 bytes');
                    });
                    it('should determine kilo bytes', function () {
                        expect(fileSizeFactory.getInstance(1024).display()).to.equal('1 KB');
                        expect(fileSizeFactory.getInstance(1048575).display()).to.equal('1024 KB');
                    });
                    it('should determine mega bytes', function () {
                        expect(fileSizeFactory.getInstance(1048576).display()).to.equal('1 MB');
                        expect(fileSizeFactory.getInstance(1073741823).display()).to.equal('1024 MB');
                    });
                    it('should determine giga bytes', function () {
                        expect(fileSizeFactory.getInstance(1073741824).display()).to.equal('1 GB');
                        expect(fileSizeFactory.getInstance(1073741825).display()).to.equal('1 GB');
                    });
                });
            })(fileSize = services_9.fileSize || (services_9.fileSize = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var string;
            (function (string_1) {
                'use strict';
                string_1.moduleName = 'rl.utilities.services.string';
                string_1.serviceName = 'stringUtilityService';
                var StringUtilityService = (function () {
                    function StringUtilityService() {
                    }
                    StringUtilityService.prototype.toNumber = function (string) {
                        return +string;
                    };
                    StringUtilityService.prototype.contains = function (str, substring) {
                        if (substring) {
                            return str.indexOf(substring) !== -1;
                        }
                        return true;
                    };
                    StringUtilityService.prototype.substitute = function (formatString) {
                        var _this = this;
                        var params = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            params[_i - 1] = arguments[_i];
                        }
                        _.each(params, function (param, index) {
                            formatString = _this.replaceAll(formatString, '\\{' + index + '\\}', param);
                        });
                        return formatString;
                    };
                    StringUtilityService.prototype.replaceAll = function (str, patternToFind, replacementString) {
                        return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
                    };
                    return StringUtilityService;
                })();
                string_1.StringUtilityService = StringUtilityService;
                angular.module(string_1.moduleName, [])
                    .service(string_1.serviceName, StringUtilityService);
            })(string = services.string || (services.string = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filter;
        (function (filter) {
            'use strict';
            filter.moduleName = 'rl.utilities.filter';
        })(filter = utilities.filter || (utilities.filter = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../object/object.service.ts' />
/// <reference path='../string/string.service.ts' />
/// <reference path='../../filters/filter.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var genericSearchFilter;
            (function (genericSearchFilter) {
                'use strict';
                genericSearchFilter.moduleName = 'rl.utilities.services.genericSearchFilter';
                genericSearchFilter.factoryName = 'genericSearchFilterFactory';
                genericSearchFilter.filterName = 'search';
                var GenericSearchFilter = (function () {
                    function GenericSearchFilter(object, string) {
                        this.object = object;
                        this.string = string;
                        this.type = genericSearchFilter.filterName;
                        this.caseSensitive = false;
                    }
                    GenericSearchFilter.prototype.filter = function (item) {
                        if (this.object.isNullOrEmpty(this.searchText)) {
                            return true;
                        }
                        return this.searchObject(item, this.searchText, this.caseSensitive);
                    };
                    GenericSearchFilter.prototype.searchObject = function (item, search, caseSensitive) {
                        var _this = this;
                        if (_.isObject(item)) {
                            var values = _.values(item);
                            return _.any(values, function (value) { return _this.searchObject(value, search, caseSensitive); });
                        }
                        else {
                            var dataString = this.object.toString(item);
                            if (!caseSensitive) {
                                search = search.toLowerCase();
                                dataString = dataString.toLowerCase();
                            }
                            return this.string.contains(dataString, search);
                        }
                    };
                    return GenericSearchFilter;
                })();
                genericSearchFilter.GenericSearchFilter = GenericSearchFilter;
                genericSearchFilterFactory.$inject = [services.object.serviceName, services.string.serviceName];
                function genericSearchFilterFactory(object, stringUtility) {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new GenericSearchFilter(object, stringUtility);
                        }
                    };
                }
                angular.module(genericSearchFilter.moduleName, [services.object.moduleName, services.string.moduleName])
                    .factory(genericSearchFilter.factoryName, genericSearchFilterFactory);
            })(genericSearchFilter = services.genericSearchFilter || (services.genericSearchFilter = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='genericSearchFilter.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_10) {
            var genericSearchFilter;
            (function (genericSearchFilter_1) {
                'use strict';
                describe('genericSearchFilter', function () {
                    var genericSearchFilter;
                    beforeEach(function () {
                        angular.mock.module(genericSearchFilter_1.moduleName);
                        var services = services_10.test.angularFixture.inject(genericSearchFilter_1.factoryName);
                        var genericSearchFilterFactory = services[genericSearchFilter_1.factoryName];
                        genericSearchFilter = genericSearchFilterFactory.getInstance();
                    });
                    it('should include all items if query is null or empty', function () {
                        genericSearchFilter.searchText = null;
                        var object1 = {
                            prop: 'some string',
                        };
                        var object2 = {
                            prop: 'another value',
                        };
                        expect(genericSearchFilter.filter(object1)).to.be.true;
                        expect(genericSearchFilter.filter(object2)).to.be.true;
                        genericSearchFilter.searchText = '';
                        expect(genericSearchFilter.filter(object1)).to.be.true;
                        expect(genericSearchFilter.filter(object2)).to.be.true;
                    });
                    it('should search the actual data values if they arent objects', function () {
                        genericSearchFilter.searchText = '2';
                        expect(genericSearchFilter.filter(1)).to.be.false;
                        expect(genericSearchFilter.filter(2)).to.be.true;
                        expect(genericSearchFilter.filter(3)).to.be.false;
                        expect(genericSearchFilter.filter(4)).to.be.false;
                        expect(genericSearchFilter.filter(5)).to.be.false;
                    });
                    it('should include items that contain the search string', function () {
                        genericSearchFilter.searchText = 'my';
                        genericSearchFilter.caseSensitive = true;
                        var matchingObject1 = {
                            prop2: 'my string',
                        };
                        var matchingObject2 = {
                            prop1: 5,
                            prop2: 'some string with my',
                        };
                        var objectWithoutSearchString = {
                            prop1: 2,
                        };
                        var objectWithDifferentCase = {
                            prop1: 5,
                            prop2: 'MY string',
                        };
                        expect(genericSearchFilter.filter(matchingObject1)).to.be.true;
                        expect(genericSearchFilter.filter(objectWithoutSearchString)).to.be.false;
                        expect(genericSearchFilter.filter(matchingObject2)).to.be.true;
                        expect(genericSearchFilter.filter(objectWithDifferentCase)).to.be.false;
                    });
                    it('should include items that contain the search string, case insensitive', function () {
                        genericSearchFilter.searchText = 'my';
                        genericSearchFilter.caseSensitive = false;
                        var lowercaseMatch = {
                            prop2: 'my string',
                        };
                        var uppercaseMatch = {
                            prop1: 2.2,
                            prop2: 'MY string',
                        };
                        expect(genericSearchFilter.filter(lowercaseMatch)).to.be.true;
                        expect(genericSearchFilter.filter(uppercaseMatch)).to.be.true;
                    });
                    it('should recursively search the properties of an object', function () {
                        genericSearchFilter.searchText = 'my';
                        genericSearchFilter.caseSensitive = false;
                        var objectWithNestedObject = {
                            nestedObject: {
                                prop2: 'my string',
                            },
                        };
                        expect(genericSearchFilter.filter(objectWithNestedObject)).to.be.true;
                    });
                });
            })(genericSearchFilter = services_10.genericSearchFilter || (services_10.genericSearchFilter = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/jquery
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var jquery;
            (function (jquery) {
                'use strict';
                jquery.moduleName = 'rl.utilities.services.jquery';
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
            })(jquery = services.jquery || (services.jquery = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='jquery.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_11) {
            var jquery;
            (function (jquery) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('jqueryUtility', function () {
                    var jqueryUtility;
                    var emptySpy;
                    var appendSpy;
                    beforeEach(function () {
                        angular.mock.module(jquery.moduleName);
                        var services = __test.angularFixture.inject(jquery.serviceName);
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
            })(jquery = services_11.jquery || (services_11.jquery = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='object.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_12) {
            var object;
            (function (object_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('objectUtility', function () {
                    var objectUtility;
                    beforeEach(function () {
                        angular.mock.module(object_2.moduleName);
                        var services = __test.angularFixture.inject(object_2.serviceName);
                        objectUtility = services[object_2.serviceName];
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
                    describe('areEqual', function () {
                        it('should return true if two primitives are equal', function () {
                            var string1 = 'abc';
                            var string2 = 'abc';
                            var num1 = 1;
                            var num2 = 1;
                            expect(objectUtility.areEqual(string1, string2)).to.be.true;
                            expect(objectUtility.areEqual(num1, num2)).to.be.true;
                        });
                        it('should return false if two objects are not of the same type', function () {
                            var string = 'abc';
                            var num = 1;
                            var obj = {};
                            var array = [];
                            expect(objectUtility.areEqual(string, num)).to.be.false;
                            expect(objectUtility.areEqual(string, obj)).to.be.false;
                            expect(objectUtility.areEqual(string, array)).to.be.false;
                            expect(objectUtility.areEqual(num, obj)).to.be.false;
                            expect(objectUtility.areEqual(num, array)).to.be.false;
                            //obj and array are considered the same type
                        });
                        it('should return false if one object is valid and the other is null', function () {
                            var obj = { '1': 1, '2': 2 };
                            expect(objectUtility.areEqual(obj, null)).to.be.false;
                        });
                        it('should return false if arrays have different lengths', function () {
                            var array1 = [1, 2, 3, 4, 5];
                            var array2 = [1, 2, 3];
                            expect(objectUtility.areEqual(array1, array2)).to.be.false;
                        });
                        it('should compare arrays by element if they are the same length', function () {
                            var array = [1, 2, 3, 4, 5];
                            var similarArray = [1, 2, 3, 4, 5];
                            var differentArray = [5, 4, 3, 2, 1];
                            expect(objectUtility.areEqual(array, similarArray)).to.be.true;
                            expect(objectUtility.areEqual(array, differentArray)).to.be.false;
                        });
                        it('should use the keys from the first object to compare properties', function () {
                            var object = {
                                '1': 1,
                                '2': 2,
                                '3': 3,
                            };
                            var similarObject = {
                                '2': 2,
                                '3': 3,
                                '1': 1,
                            };
                            var differentObject = {
                                '1': 1,
                                'two': 2,
                                '3': 3,
                            };
                            expect(objectUtility.areEqual(object, similarObject)).to.be.true;
                            expect(objectUtility.areEqual(object, differentObject)).to.be.false;
                        });
                        it('should return false if object 2 has the properties of object 1 with additional properties', function () {
                            var object1 = {
                                '1': 1,
                                '2': 2,
                                '3': 3,
                            };
                            var object2 = {
                                '1': 1,
                                '2': 2,
                                '3': 3,
                                '4': 4,
                                '5': 5,
                            };
                            expect(objectUtility.areEqual(object1, object2)).to.be.false;
                        });
                        it('should recursively compare nested objects', function () {
                            var object = {
                                nestedObj: {
                                    '1': 1,
                                    '2': 2,
                                },
                                nestedArray: [1, 2, 3],
                                '3': 3,
                            };
                            var similarObject = {
                                nestedObj: {
                                    '1': 1,
                                    '2': 2,
                                },
                                nestedArray: [1, 2, 3],
                                '3': 3,
                            };
                            var differentObject1 = {
                                nestedObj: {
                                    'one': 1,
                                    'two': 2,
                                },
                                nestedArray: [1, 2, 3],
                                '3': 3,
                            };
                            var differentObject2 = {
                                nestedObj: {
                                    '1': 1,
                                    '2': 2,
                                },
                                nestedArray: [1, 2, 3, 4, 5],
                                '3': 3,
                            };
                            expect(objectUtility.areEqual(object, similarObject)).to.be.true;
                            expect(objectUtility.areEqual(object, differentObject1)).to.be.false;
                            expect(objectUtility.areEqual(object, differentObject2)).to.be.false;
                        });
                    });
                    describe('toString', function () {
                        it('should turn numbers into strings', function () {
                            expect(objectUtility.toString(5)).to.equal('5');
                            expect(objectUtility.toString(2.5)).to.equal('2.5');
                        });
                        it('should turn booleans into strings', function () {
                            expect(objectUtility.toString(false)).to.equal('false');
                            expect(objectUtility.toString(true)).to.equal('true');
                        });
                        it('should turn undefined and null into strings', function () {
                            expect(objectUtility.toString(undefined)).to.equal('undefined');
                            expect(objectUtility.toString(null)).to.equal('null');
                        });
                    });
                    describe('valueOrDefault', function () {
                        it('should return the value if it is defined', function () {
                            var someObject = { existingProperty: 'value' };
                            expect(objectUtility.valueOrDefault(someObject.existingProperty, 'default')).to.equal('value');
                        });
                        it('should return the default if the value is not defined', function () {
                            var someObject = { nullProperty: null };
                            expect(objectUtility.valueOrDefault(someObject.nullProperty, 'default')).to.equal('default');
                            expect(objectUtility.valueOrDefault(someObject.missingProperty, 'default')).to.equal('default');
                        });
                    });
                });
            })(object = services_12.object || (services_12.object = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='number.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_13) {
            var number;
            (function (number) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('numberUtility', function () {
                    var numberUtility;
                    beforeEach(function () {
                        angular.mock.module(number.moduleName);
                        var services = __test.angularFixture.inject(number.serviceName);
                        numberUtility = services[number.serviceName];
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
            })(number = services_13.number || (services_13.number = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='observable.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_14) {
            var observable;
            (function (observable_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('observable', function () {
                    var observable;
                    beforeEach(function () {
                        angular.mock.module(observable_1.moduleName);
                        var services = __test.angularFixture.inject(observable_1.factoryName);
                        var observableFactory = services[observable_1.factoryName];
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
            })(observable = services_14.observable || (services_14.observable = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var parentChildBehavior;
            (function (parentChildBehavior) {
                'use strict';
                parentChildBehavior.moduleName = 'rl21.utilities.services.parentChildBehavior';
                parentChildBehavior.serviceName = 'parentChildBehavior';
                var ParentChildBehaviorService = (function () {
                    function ParentChildBehaviorService() {
                    }
                    ParentChildBehaviorService.prototype.getChildBehavior = function (child) {
                        return child && child.viewData != null
                            ? child.viewData.behavior
                            : null;
                    };
                    ParentChildBehaviorService.prototype.triggerChildBehavior = function (child, action) {
                        var behavior = this.getChildBehavior(child);
                        if (behavior == null) {
                            return null;
                        }
                        else {
                            return action(behavior);
                        }
                    };
                    ParentChildBehaviorService.prototype.triggerAllChildBehaviors = function (childList, action) {
                        var behaviors = this.getAllChildBehaviors(childList);
                        return _.map(behaviors, function (behavior) {
                            return action(behavior);
                        });
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
            })(parentChildBehavior = services.parentChildBehavior || (services.parentChildBehavior = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='parentChildBehavior.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_15) {
            var parentChildBehavior;
            (function (parentChildBehavior_1) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('parentChildBehavior', function () {
                    var parentChildBehavior;
                    beforeEach(function () {
                        angular.mock.module(parentChildBehavior_1.moduleName);
                        var services = __test.angularFixture.inject(parentChildBehavior_1.serviceName);
                        parentChildBehavior = services[parentChildBehavior_1.serviceName];
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
                    describe('triggerChildBehavior', function () {
                        it('should trigger the specified child action and return the result', function () {
                            var behavior1 = { action: function () { return 3; } };
                            var child = { viewData: { behavior: behavior1 } };
                            var behaviorResult = parentChildBehavior.triggerChildBehavior(child, function (behavior) {
                                return behavior.action();
                            });
                            expect(behaviorResult).to.equal(3);
                        });
                        it('should return null if the behavior does not exist', function () {
                            var child = {};
                            var behaviorResult = parentChildBehavior.triggerChildBehavior(child, function (behavior) {
                                return behavior.action();
                            });
                            expect(behaviorResult).to.be.null;
                        });
                    });
                    describe('triggerAllChildBehaviors', function () {
                        it('should trigger the specified child actions and return the results', function () {
                            var behavior1 = { action: function () { return 1; } };
                            var child1 = { viewData: { behavior: behavior1 } };
                            var behavior2 = { action: function () { return 2; } };
                            var child2 = { viewData: { behavior: behavior2 } };
                            var behavior3 = { action: function () { return 3; } };
                            var child3 = { viewData: { behavior: behavior3 } };
                            var childWithoutBehavior = {};
                            var behaviorResult = parentChildBehavior.triggerAllChildBehaviors([child1, child2, child3, childWithoutBehavior], function (behavior) {
                                return behavior.action();
                            });
                            expect(behaviorResult).to.have.length(3);
                            expect(behaviorResult[0]).to.equal(1);
                            expect(behaviorResult[1]).to.equal(2);
                            expect(behaviorResult[2]).to.equal(3);
                        });
                    });
                });
            })(parentChildBehavior = services_15.parentChildBehavior || (services_15.parentChildBehavior = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
// uses typings/lodash
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var promise;
            (function (promise_1) {
                'use strict';
                promise_1.moduleName = 'rl.utilities.services.promise';
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
            })(promise = services.promise || (services.promise = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='promise.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_16) {
            var promise;
            (function (promise_2) {
                'use strict';
                var __test = rl.utilities.services.test;
                describe('promiseUtility', function () {
                    var promiseUtility;
                    beforeEach(function () {
                        angular.mock.module(promise_2.moduleName);
                        var services = __test.angularFixture.inject(promise_2.serviceName);
                        promiseUtility = services[promise_2.serviceName];
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
            })(promise = services_16.promise || (services_16.promise = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='string.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_17) {
            var string;
            (function (string) {
                var __test = rl.utilities.services.test;
                describe('stringUtility', function () {
                    var stringUtility;
                    beforeEach(function () {
                        angular.mock.module(string.moduleName);
                        var services = __test.angularFixture.inject(string.serviceName);
                        stringUtility = services[string.serviceName];
                    });
                    describe('toNumber', function () {
                        it('should convert a string to a number', function () {
                            expect(stringUtility.toNumber('5')).to.equal(5);
                            expect(stringUtility.toNumber('3')).to.equal(3);
                            expect(stringUtility.toNumber('1.25')).to.equal(1.25);
                        });
                    });
                    describe('contains', function () {
                        it('should return true if the substring is contained within the string', function () {
                            expect(stringUtility.contains('my string', 'my')).to.be.true;
                            expect(stringUtility.contains('123', '1')).to.be.true;
                            expect(stringUtility.contains('', null)).to.be.true;
                            expect(stringUtility.contains('my string', '')).to.be.true;
                        });
                        it('should return false if the substring is not contained within the string', function () {
                            expect(stringUtility.contains('my string', 'my val')).to.be.false;
                            expect(stringUtility.contains('123', '4')).to.be.false;
                            expect(stringUtility.contains('my string', 'my string 1')).to.be.false;
                        });
                    });
                    describe('replaceAll', function () {
                        it('should replace all occurances of some given text with another inside a string', function () {
                            expect(stringUtility.replaceAll('hello world', 'foo', 'bar')).to.equal('hello world');
                            expect(stringUtility.replaceAll('fooHellofooWorldfoo', 'foo', 'bar')).to.equal('barHellobarWorldbar');
                        });
                    });
                    describe('substitute', function () {
                        it('should substitute strings with their positional placeholder value in other strings', function () {
                            expect(stringUtility.substitute('hello world', 'foo')).to.equal('hello world');
                            expect(stringUtility.substitute('hello {0} world {1}', 'foo', 'bar')).to.equal('hello foo world bar');
                        });
                    });
                });
            })(string = services_17.string || (services_17.string = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var time;
            (function (time) {
                'use strict';
                time.moduleName = 'rl.utilities.services.time';
                time.serviceName = 'timeUtility';
                var TimeUtility = (function () {
                    function TimeUtility() {
                    }
                    TimeUtility.prototype.millisecondsToSeconds = function (milliseconds) {
                        return Math.floor(milliseconds / 1000);
                    };
                    TimeUtility.prototype.millisecondsToMinutes = function (milliseconds) {
                        return Math.floor(this.millisecondsToSeconds(milliseconds) / 60);
                    };
                    TimeUtility.prototype.millisecondsToHours = function (milliseconds) {
                        return Math.floor(this.millisecondsToMinutes(milliseconds) / 60);
                    };
                    TimeUtility.prototype.millisecondsToDays = function (milliseconds) {
                        return Math.floor(this.millisecondsToHours(milliseconds) / 24);
                    };
                    return TimeUtility;
                })();
                time.TimeUtility = TimeUtility;
                angular.module(time.moduleName, [])
                    .service(time.serviceName, TimeUtility);
            })(time = services.time || (services.time = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='time.service.ts' />
/// <reference path='../test/angularFixture.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services_18) {
            var time;
            (function (time) {
                var __test = rl.utilities.services.test;
                describe('timeUtility', function () {
                    var timeUtility;
                    beforeEach(function () {
                        angular.mock.module(time.moduleName);
                        var services = __test.angularFixture.inject(time.serviceName);
                        timeUtility = services[time.serviceName];
                    });
                    it('should return expected number of seconds for milliseconds', function () {
                        expect(timeUtility.millisecondsToSeconds(4000)).to.equal(4);
                        expect(timeUtility.millisecondsToSeconds(4600)).to.equal(4);
                    });
                    it('should return expected number of minutes for milliseconds', function () {
                        var seconds1 = 120;
                        var seconds2 = 59;
                        seconds1 *= 1000;
                        seconds2 *= 1000;
                        expect(timeUtility.millisecondsToMinutes(seconds1)).to.equal(2);
                        expect(timeUtility.millisecondsToMinutes(seconds2)).to.equal(0);
                    });
                    it('should return expected number of hours for milliseconds', function () {
                        var minutes1 = 59;
                        var minutes2 = 60;
                        minutes1 *= 60 * 1000;
                        minutes2 *= 60 * 1000;
                        expect(timeUtility.millisecondsToHours(minutes1)).to.equal(0);
                        expect(timeUtility.millisecondsToHours(minutes2)).to.equal(1);
                    });
                    it('should return expected number of days for milliseconds', function () {
                        var hours1 = 23;
                        var hours2 = 24;
                        hours1 *= 60 * 60 * 1000;
                        hours2 *= 60 * 60 * 1000;
                        expect(timeUtility.millisecondsToDays(hours1)).to.equal(0);
                        expect(timeUtility.millisecondsToDays(hours2)).to.equal(1);
                    });
                });
            })(time = services_18.time || (services_18.time = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/lodash
// uses typings/sinon
// uses typings/jquery
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
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
            })(test = services.test || (services.test = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='stopEventPropagation/stopEventPropagation.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var behaviors;
        (function (behaviors) {
            behaviors.moduleName = 'rl.utilities.behaviors';
            angular.module(behaviors.moduleName, [
                behaviors.stopEventPropogation.moduleName,
            ]);
        })(behaviors = utilities.behaviors || (utilities.behaviors = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='isEmpty/isEmpty.ts' />
/// <reference path='truncate/truncate.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var filters;
        (function (filters) {
            filters.moduleName = 'rl.utilities.filters';
            angular.module(filters.moduleName, [
                filters.isEmpty.moduleName,
                filters.truncate.moduleName,
            ]);
        })(filters = utilities.filters || (utilities.filters = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='array/array.service.ts' />
/// <reference path='autosave/autosave.service.ts' />
/// <reference path='autosaveAction/autosaveAction.service.ts' />
/// <reference path='boolean/boolean.service.ts' />
/// <reference path='contentProvider/contentProvider.service.ts' />
/// <reference path='date/date.service.ts' />
/// <reference path='jquery/jquery.service.ts' />
/// <reference path='number/number.service.ts' />
/// <reference path='object/object.service.ts' />
/// <reference path='observable/observable.service.ts' />
/// <reference path='parentChildBehavior/parentChildBehavior.service.ts' />
/// <reference path='promise/promise.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            services.moduleName = 'rl.utilities.services';
            angular.module(services.moduleName, [
                services.array.moduleName,
                services.autosave.moduleName,
                services.autosaveAction.moduleName,
                services.boolean.moduleName,
                services.contentProvider.moduleName,
                services.date.moduleName,
                services.jquery.moduleName,
                services.number.moduleName,
                services.object.moduleName,
                services.observable.moduleName,
                services.parentChildBehavior.moduleName,
                services.promise.moduleName,
            ]);
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses angularjs
/// <reference path='behaviors/behaviors.module.ts' />
/// <reference path='filters/filters.module.ts' />
/// <reference path='services/services.module.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        utilities.moduleName = 'rl.utilities';
        angular.module(name, [
            utilities.behaviors.moduleName,
            utilities.filters.moduleName,
            utilities.services.moduleName,
        ]);
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cyIsInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50cyIsInNlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50ZXN0cy50cyIsImZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHMiLCJmaWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRlc3RzLnRzIiwic2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMudHMiLCJzZXJ2aWNlcy9icmVha3BvaW50cy92aXNpYmxlQnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL2JyZWFrcG9pbnRzL2JyZWFrcG9pbnRzLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50cyIsImZpbHRlcnMvZmlsdGVyLnRzIiwic2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsInNlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvdGVzdC9tb2NrLnRzIiwiYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMiLCJmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIiwic2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbInJsIiwicmwudXRpbGl0aWVzIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24iLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uLnN0b3BFdmVudFByb3BhZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdCIsInJsLnV0aWxpdGllcy5maWx0ZXJzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb250cm9sbGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZS50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zYXZpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbXBsZXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zdWNjZXNzZnVsIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS50cmlnZ2VyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLm51bGxGb3JtIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybS4kc2V0UHJpc3RpbmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5hdXRvc2F2ZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkudG9Cb29sIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLlZpc2libGVCcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5WaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlLmlzVmlzaWJsZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLnJlc2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5nZXRCcmVha3BvaW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLkJyZWFrcG9pbnRTZXJ2aWNlLmlzQnJlYWtwb2ludCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5idWlsZFNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuaXNMZWFwWWVhciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuU2lnbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsInJsLnV0aWxpdGllcy5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaE9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LnJlcGxhY2VDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5pc1Byb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0hvdXJzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmZsdXNoIl0sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFFdkIsSUFBTyxFQUFFLENBMkJSO0FBM0JELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQTJCbEJBO0lBM0JTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxTQUFTQSxDQTJCNUJBO1FBM0JtQkEsV0FBQUEsU0FBU0E7WUFBQ0MsSUFBQUEsb0JBQW9CQSxDQTJCakRBO1lBM0I2QkEsV0FBQUEsb0JBQW9CQSxFQUFDQSxDQUFDQTtnQkFDbkRDLFlBQVlBLENBQUNBO2dCQUVGQSwrQkFBVUEsR0FBV0EsNkNBQTZDQSxDQUFDQTtnQkFDbkVBLGtDQUFhQSxHQUFXQSx3QkFBd0JBLENBQUNBO2dCQU01REE7b0JBQ0NDLFlBQVlBLENBQUNBO29CQUNiQSxNQUFNQSxDQUFDQTt3QkFDTkEsUUFBUUEsRUFBRUEsR0FBR0E7d0JBQ2JBLElBQUlBLFlBQUNBLEtBQWdCQSxFQUNsQkEsT0FBNEJBLEVBQzVCQSxLQUFpQ0E7NEJBQ25DQyxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxzQkFBc0JBLEVBQUVBLFVBQUNBLEtBQXdCQTtnQ0FDakVBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO2dDQUN2QkEsS0FBS0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7NEJBQ3pCQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDSkEsQ0FBQ0E7cUJBQ0RELENBQUNBO2dCQUNIQSxDQUFDQTtnQkFFREQsT0FBT0EsQ0FB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Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2xDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDYkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUN6Q0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ2RBLENBQUNBO3dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDckJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO3dCQUNkQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2xDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxLQUFLQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDakNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBOzRCQUNkQSxDQUFDQTs0QkFFREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0NBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtvQ0FDL0NBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2dDQUNkQSxDQUFDQTs0QkFDRkEsQ0FBQ0E7d0JBQ0ZBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDL0JBLHdDQUF3Q0E7NEJBQ3hDQSxJQUFJQSxLQUFLQSxHQUFhQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDbkNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLFVBQUNBLEtBQVVBLEVBQUVBLEdBQVdBO2dDQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0NBQ3RCQSxnRkFBZ0ZBO29DQUNoRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0NBQy9DQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtvQ0FDZEEsQ0FBQ0E7b0NBQUNBLElBQUlBLENBQUNBLENBQUNBO3dDQUNQQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtvQ0FDL0JBLENBQUNBO2dDQUNGQSxDQUFDQTtnQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0NBQ1BBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2dDQUNkQSxDQUFDQTs0QkFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ0hBLDhGQUE4RkE7NEJBQzlGQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDbEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBOzRCQUNkQSxDQUFDQTt3QkFDRkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNB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QTtvQkFFSEEsUUFBUUEsQ0FBQ0EsUUFBUUEsRUFBRUE7d0JBQ2xCQSxFQUFFQSxDQUFDQSxxRUFBcUVBLEVBQUVBOzRCQUN6RUEsSUFBSUEsS0FBS0EsR0FBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBRXRDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbERBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNqQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ3JEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsbUVBQW1FQSxFQUFFQTs0QkFDdkVBLElBQUlBLEtBQUtBLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUV0Q0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBQ0EsSUFBWUEsSUFBZ0JBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsR0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFB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QUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFFOUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMxQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDMUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMxQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzNDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLEVBNUc0QkQsS0FBS0EsR0FBTEEsZ0JBQUtBLEtBQUxBLGdCQUFLQSxRQTRHakNBO1FBQURBLENBQUNBLEVBNUdtQkwsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQTRHM0JBO0lBQURBLENBQUNBLEVBNUdTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQTRHbEJBO0FBQURBLENBQUNBLEVBNUdNLEVBQUUsS0FBRixFQUFFLFFBNEdSO0FDbkhE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QWtEQSxFQUFFQTt3QkFDdERBLGlCQUFpQkEsR0FBR0EsZ0JBQUVBLENBQUNBO3dCQUV2QkEsWUFBWUEsRUFBRUEsQ0FBQ0E7d0JBRWZBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBO3dCQUNuREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO3dCQUNoREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUNqREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUNqREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO29CQUNsREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLGdFQUFnRUEsRUFBRUE7d0JBQ3BFQSxJQUFJQSxtQkFBbUJBLEdBQW1CQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFFdERBLGlCQUFpQkEsR0FBR0EsZ0JBQUVBLENBQUNBO3dCQUV2QkEsWUFBWUEsRUFBRUEsQ0FBQ0E7d0JBRWZBLFdBQVdBLENBQUNBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7d0JBRTFDQSxpQkFBaUJBLEdBQUdBLGdCQUFFQSxDQUFDQTt3QkFDdkJBLGFBQWFBLEVBQUVBLENBQUNBO3dCQUVoQkEsTUFBTUEsQ0FBQ0EsV0FB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Q0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQzFEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTs0QkFDdkRBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBOzRCQUN2REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTs0QkFDdERBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBOzRCQUN0REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7NEJBQ3hEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTs0QkFDM0RBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBOzRCQUN6REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQzNEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFDNURBLENBQUNBLENBQUNBLENBQUNBO29CQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsUUFBUUEsQ0FBQ0EsU0FBU0EsRUFBRUE7d0JBQ25CQSxFQUFFQSxDQUFDQSw0Q0FBNENBLEVBQUVBOzRCQUNoREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzdDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTt3QkFDOUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSwrQkFBK0JBLEVBQUVBOzRCQUNuQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQ2xEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFD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LE1BQU1BLENBQUNBLG1CQUFVQSxDQUFDQSxDQUFDQTt3QkFFaENBLElBQUlBLFFBQVFBLEdBQVFBLGVBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLG9CQUFXQSxDQUFDQSxDQUFDQTt3QkFDNURBLGVBQWVBLEdBQUdBLFFBQVFBLENBQUNBLG9CQUFXQSxDQUFDQSxDQUFDQTtvQkFDekNBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSx3QkFBd0JBLEVBQUVBO3dCQUM1QkEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3JFQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtvQkFDNUVBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSw2QkFBNkJBLEVBQUVBO3dCQUNqQ0EsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3JFQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtvQkFDNUVBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSw2QkFBNkJBLEVBQUVBO3dCQUNqQ0EsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FB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LEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUMxREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3JEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTs0QkFDdkRBLDRDQUE0Q0E7d0JBQzdDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0Esa0VBQWtFQSxFQUFFQTs0QkFDdEVBLElBQUlBLEdBQUdBLEdBQVFBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBOzRCQUNsQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ3ZEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0Esc0RBQXNEQSxFQUFFQTs0QkFDMURBLElBQUlBLE1BQU1BLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUN2Q0EsSUFBSUEsTUFBTUEsR0FBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2pDQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxD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R0FBR0EsRUFBRUEsQ0FBQ0E7b0NBQ05BLEdBQUdBLEVBQUVBLENBQUNBO2lDQUNOQTtnQ0FDREEsV0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0NBQ3RCQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLElBQUlBLGFBQWFBLEdBQVFBO2dDQUN4QkEsU0FBU0EsRUFBRUE7b0NBQ1ZBLEdBQUdBLEVBQUVBLENBQUNBO29DQUNOQSxHQUFHQSxFQUFFQSxDQUFDQTtpQ0FDTkE7Z0NBQ0RBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dDQUN0QkEsR0FBR0EsRUFBRUEsQ0FBQ0E7NkJBQ05BLENBQUNBOzRCQUNGQSxJQUFJQSxnQkFBZ0JBLEdBQVFBO2dDQUMzQkEsU0FBU0EsRUFBRUE7b0NBQ1ZBLEtBQUtBLEVBQUVBLENBQUNBO29DQUNSQSxLQUFLQSxFQUFFQSxDQUFDQTtpQ0FDUkE7Z0NBQ0RBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dDQUN0QkEsR0FBR0EsRUFBRUEsQ0FBQ0E7NkJBQ05BLENBQUNBOzRCQUNGQSxJQUFJQSxnQkFBZ0JBLEdBQVFBO2dDQUMzQkEsU0FBU0EsRUFBRUE7b0NBQ1ZBLEdBQUdBLEVBQUVBLENBQUNBO29DQUNOQSxHQUFHQSxFQUFFQSxDQUFDQTtpQ0FDTkE7Z0NBQ0RBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dDQUM1QkEsR0FBR0EsRUFBRUEsQ0FBQ0E7NkJBQ05BLENBQUNBOzRCQUNGQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTs0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LElBQUlBLElBQUlBLEdBQWFBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBO3dCQUN6Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzVCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDNUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUM1QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzVCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDN0JBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSx3REFBd0RBLEVBQUVBO3dCQUM1REEsSUFBSUEsV0FBV0EsR0FBK0JBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBO3dCQUMxREEsSUFBSUEsTUFBTUEsR0FBbUJBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUN6Q0EsT0FBT0EsQ0FBQ0EsR0FBR0EsR0FBR0EsTUFBTUEsQ0FBQ0E7d0JBRXJCQSxJQUFJQSxNQUFNQSxHQUFlQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFFbkRBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO3dCQUNoQ0EsS0FBS0Es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QSxFQWpCbUJMLFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUFpQjNCQTtJQUFEQSxDQUFDQSxFQWpCU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFpQmxCQTtBQUFEQSxDQUFDQSxFQWpCTSxFQUFFLEtBQUYsRUFBRSxRQWlCUjtBQ2hDRCxpQkFBaUI7QUFFakIsc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCxvREFBb0Q7QUFFcEQsSUFBTyxFQUFFLENBUVI7QUFSRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FRbEJBO0lBUlNBLFdBQUFBLFNBQVNBLEVBQUNBLENBQUNBO1FBQ1RDLG9CQUFVQSxHQUFXQSxjQUFjQSxDQUFDQTtRQUUvQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUE7WUFDcEJBLG1CQUFTQSxDQUFDQSxVQUFVQTtZQUNwQkEsaUJBQU9BLENBQUNBLFVBQVVBO1lBQ2xCQSxrQkFBUUEsQ0FBQ0EsVUFBVUE7U0FDbkJBLENBQUNBLENBQUNBO0lBQ0pBLENBQUNBLEVBUlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBUWxCQTtBQUFEQSxDQUFDQSxFQVJNLEVBQUUsS0FBRixFQUFFLFFBUVIiLCJmaWxlIjoidXRpbGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuXHRleHBvcnQgdmFyIGRpcmVjdGl2ZU5hbWU6IHN0cmluZyA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyBleHRlbmRzIG5nLklBdHRyaWJ1dGVzIHtcclxuXHRcdHJsU3RvcEV2ZW50UHJvcGFnYXRpb246IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKCk6IG5nLklEaXJlY3RpdmUge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdFx0bGluayhzY29wZTogbmcuSVNjb3BlXHJcblx0XHRcdFx0LCBlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5XHJcblx0XHRcdFx0LCBhdHRyczogSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMpOiB2b2lkIHtcclxuXHRcdFx0XHRlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBzdG9wRXZlbnRQcm9wYWdhdGlvbik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXI7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGU7XHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQ7XHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0XHRzdW0oYXJyYXk6IG51bWJlcltdKTogbnVtYmVyO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmd9KTogVERhdGFUeXBlW107XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IG51bWJlcn0pOiBURGF0YVR5cGVbXTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFycmF5VXRpbGl0eSBpbXBsZW1lbnRzIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHRhcmdldEluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRfLmVhY2goYXJyYXksIChpdGVtOiBURGF0YVR5cGUsIGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0XHR0YXJnZXRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0SW5kZXggIT0gbnVsbCA/IHRhcmdldEluZGV4IDogLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUgfCB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZSB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgPHsob2JqOiBURGF0YVR5cGUpOiBib29sZWFufT5pdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZCB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtPzogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0XHRpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRsaXN0ID0gXy5tYXAoYXJyYXksIChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgPT4geyByZXR1cm4gdHJhbnNmb3JtKGl0ZW0pOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaXN0ID0gPGFueVtdPmFycmF5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsgKGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZyB8IG51bWJlciB9KTogVERhdGFUeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UoYXJyYXksIChkaWN0aW9uYXJ5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlW10gPT4ge1xyXG5cdFx0XHRcdGRpY3Rpb25hcnlbPGFueT5rZXlTZWxlY3RvcihpdGVtKV0gPSBpdGVtO1xyXG5cdFx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0XHR9LCBbXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBcnJheVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuO1xyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0XHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHQgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW2FycmF5LnNlcnZpY2VOYW1lXTtcclxuXHRcdCBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBhcnJheS5JQXJyYXlVdGlsaXR5KSB7XHJcblx0XHQgfVxyXG5cclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0XHR2YXIgdHlwZTI6IHN0cmluZyA9IHR5cGVvZiBvYmoyO1xyXG5cclxuXHRcdFx0aWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdFx0dmFyIGtleXMyOiBzdHJpbmdbXSA9IF8ua2V5cyhvYmoyKTtcclxuXHRcdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdFx0Ly9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRcdGlmIChfLmFueShrZXlzMikpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcblx0XHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIG9iamVjdCArICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnaXNFbXB0eSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElJc0VtcHR5RmlsdGVyIHtcclxuXHRcdChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRpc0VtcHR5LiRpbmplY3QgPSBbX19vYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0OiBfX29iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElJc0VtcHR5RmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0dmFyIGlzRW1wdHk6IGJvb2xlYW4gPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcblxyXG5cdFx0XHRpZiAodHJ1ZVdoZW5FbXB0eSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gIWlzRW1wdHk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlzRW1wdHk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fb2JqZWN0Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgaXNFbXB0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcbi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyTW9ja3NcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCB7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdGNvbnRyb2xsZXI6IFRDb250cm9sbGVyVHlwZTtcclxuXHRcdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZVJlc3VsdCB7XHJcblx0XHRkaXJlY3RpdmU6IGFuZ3VsYXIuSURpcmVjdGl2ZTtcclxuXHRcdHNjb3BlOiBhbmd1bGFyLklTY29wZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdDogKC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pID0+IGFueTtcclxuXHRcdG1vY2s6IChtb2NrczogYW55KSA9PiB2b2lkO1xyXG5cdFx0Y29udHJvbGxlcjxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIHNjb3BlPzogYW55LCBsb2NhbHM/OiBhbnkpOiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+O1xyXG5cdFx0ZGlyZWN0aXZlOiAoZG9tOiBzdHJpbmcpID0+IElEaXJlY3RpdmVSZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBbmd1bGFyRml4dHVyZSBpbXBsZW1lbnRzIElBbmd1bGFyRml4dHVyZSB7XHJcblx0XHRpbmplY3QoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSk6IE9iamVjdCB7XHJcblx0XHRcdC8vIG9iamVjdCB0aGF0IHdpbGwgY29udGFpbiBhbGwgb2YgdGhlIHNlcnZpY2VzIHJlcXVlc3RlZFxyXG5cdFx0XHR2YXIgc2VydmljZXM6IE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdFx0Ly8gY2xvbmUgdGhlIGFycmF5IGFuZCBhZGQgYSBmdW5jdGlvbiB0aGF0IGl0ZXJhdGVzIG92ZXIgdGhlIG9yaWdpbmFsIGFycmF5XHJcblx0XHRcdC8vIHRoaXMgYXZvaWRzIGl0ZXJhdGluZyBvdmVyIHRoZSBmdW5jdGlvbiBpdHNlbGZcclxuXHRcdFx0dmFyIGluamVjdFBhcmFtZXRlcnM6IGFueVtdID0gXy5jbG9uZShzZXJ2aWNlTmFtZXMpO1xyXG5cdFx0XHRpbmplY3RQYXJhbWV0ZXJzLnB1c2goKC4uLmluamVjdGVkU2VydmljZXM6IGFueVtdKSA9PiB7XHJcblx0XHRcdFx0Ly8gc2hvdWxkIGdldCBjYWxsZWQgd2l0aCB0aGUgc2VydmljZXMgaW5qZWN0ZWQgYnkgYW5ndWxhclxyXG5cdFx0XHRcdC8vIHdlJ2xsIGFkZCB0aGVzZSB0byBzZXJ2aWNlcyB1c2luZyB0aGUgc2VydmljZU5hbWUgYXMgdGhlIGtleVxyXG5cdFx0XHRcdF8uZWFjaChzZXJ2aWNlTmFtZXMsIChzZXJ2aWNlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRcdHNlcnZpY2VzW3NlcnZpY2VdID0gaW5qZWN0ZWRTZXJ2aWNlc1tpbmRleF07XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLmluamVjdChpbmplY3RQYXJhbWV0ZXJzKTtcclxuXHJcblx0XHRcdHJldHVybiBzZXJ2aWNlcztcclxuXHRcdH1cclxuXHJcblx0XHRtb2NrKG1vY2tzOiBhbnkpOiB2b2lkIHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgoJHByb3ZpZGU6IGFuZ3VsYXIuYXV0by5JUHJvdmlkZVNlcnZpY2UpID0+IHtcclxuXHRcdFx0XHRfLmVhY2gobW9ja3MsICh2YWx1ZTogYW55LCBrZXk6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0JHByb3ZpZGUudmFsdWUoa2V5LnRvU3RyaW5nKCksIHZhbHVlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udHJvbGxlcjxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIHNjb3BlPzogYW55LCBsb2NhbHM/OiBhbnkpOiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29udHJvbGxlcicpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbnRyb2xsZXI6IGFueSA9IHNlcnZpY2VzLiRjb250cm9sbGVyO1xyXG5cclxuXHRcdFx0c2NvcGUgPSBfLmV4dGVuZCgkcm9vdFNjb3BlLiRuZXcoKSwgc2NvcGUpO1xyXG5cclxuXHRcdFx0aWYgKGxvY2FscyA9PSBudWxsKSB7XHJcblx0XHRcdFx0bG9jYWxzID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxvY2Fscy4kc2NvcGUgPSBzY29wZTtcclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2NvcGU6IHNjb3BlLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXI6IDxUQ29udHJvbGxlclR5cGU+JGNvbnRyb2xsZXIoY29udHJvbGxlck5hbWUsIGxvY2FscyksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZGlyZWN0aXZlKGRvbTogc3RyaW5nKTogSURpcmVjdGl2ZVJlc3VsdCB7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnKTtcclxuXHRcdFx0dmFyICRyb290U2NvcGU6IGFuZ3VsYXIuSVNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb21waWxlOiBhbnkgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuXHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoJ3Jlbm92b1RlbXBsYXRlcycpO1xyXG5cclxuXHRcdFx0dmFyIGNvbXBvbmVudDogYW55ID0gJGNvbXBpbGUoZG9tKSgkcm9vdFNjb3BlKTtcclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0ZGlyZWN0aXZlOiBjb21wb25lbnQsXHJcblx0XHRcdFx0c2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgYW5ndWxhckZpeHR1cmU6IElBbmd1bGFyRml4dHVyZSA9IG5ldyBBbmd1bGFyRml4dHVyZSgpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0naXNFbXB0eS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2lzRW1wdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgaXNFbXB0eTogSUlzRW1wdHlGaWx0ZXI7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmlsdGVyTmFtZSk7XHJcblx0XHRcdGlzRW1wdHkgPSBzZXJ2aWNlc1tmaWx0ZXJOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIGFycmF5IGlzIG51bGwgb3IgZW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KG51bGwpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoaXNFbXB0eShbXSkpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgYXJyYXkgaGFzIGl0ZW1zJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QoaXNFbXB0eShbMSwgMiwgM10pKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkoWycxJywgJzInLCAnMyddKSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGludmVydCB0aGUgcmVzdWx0IGlmIHRydWVJZkVtcHR5IGlzIHNwZWNpZmllZCBhcyBmYWxzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkobnVsbCwgZmFsc2UpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkoWzEsIDIsIDNdLCBmYWxzZSkpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdFx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0dHJ1bmNhdGUuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eTogX19vYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRcdGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcblxyXG5cdFx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG5cdFx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdFx0b3V0ICs9ICcuLi4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gb3V0O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ3RydW5jYXRlJywgKCkgPT4ge1xyXG5cdFx0dmFyIHRydW5jYXRlOiBJVHJ1bmNhdGVGaWx0ZXI7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmlsdGVyTmFtZSk7XHJcblx0XHRcdHRydW5jYXRlID0gc2VydmljZXNbZmlsdGVyTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgd2hlbiBubyBzdHJpbmcgaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoKSkudG8uZXF1YWwoJycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gYW4gZW1wdHkgc3RyaW5nIGlzIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCcnKSkudG8uZXF1YWwoJycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gYSBzdHJpbmcgd2hlbiBhIG51bWJlciBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgzNC41KSkudG8uZXF1YWwoJzM0LjUnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgbm90IHRydW5jYXRlIGEgc3RyaW5nIHdoZW4gbm8gcGFyYW1ldGVycyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJykpLnRvLmVxdWFsKCdUZXN0IHN0cmluZycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gdHJ1bmNhdGVUbyBpcyAwJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgMCkpLnRvLmVxdWFsKCcnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgdHJ1bmNhdGUgYnV0IG5vdCBlbGxpcHNpbW9ncmlmeSBhIHN0cmluZyB3aGVuIG9ubHkgdHJ1bmNhdGVUbyBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCA2KSkudG8uZXF1YWwoJ1Rlc3QgcycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBub3QgdHJ1bmNhdGUgYSBzdHJpbmcgd2hlbiB0cnVuY2F0ZVRvIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc3RyaW5nIGxlbmd0aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDI1KSkudG8uZXF1YWwoJ1Rlc3Qgc3RyaW5nJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHRydW5jYXRlIGJ1dCBub3QgZWxsaXBzaW1vZ3JpZnkgYSBzdHJpbmcgd2hlbiBib3RoIHRydW5jYXRlVG8gYW5kIGluY2x1ZGVFbGxpcHNlcyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgNiwgZmFsc2UpKS50by5lcXVhbCgnVGVzdCBzJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHRydW5jYXRlIGFuZCBlbGxpcHNpbW9ncmlmeSBhIHN0cmluZyB3aGVuIGJvdGggdHJ1bmNhdGVUbyBhbmQgaW5jbHVkZUVsbGlwc2VzIGFyZSBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCA2LCB0cnVlKSkudG8uZXF1YWwoJ1Rlc3Qgcy4uLicpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGludGVyZmFjZSBJVGVzdE9iaiB7XHJcblx0XHRwcm9wOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSUtleU9iaiB7XHJcblx0XHRrZXk6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGRlc2NyaWJlKCdhcnJheVV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgYXJyYXlVdGlsaXR5OiBJQXJyYXlVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0YXJyYXlVdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2ZpbmRJbmRleE9mJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGluIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgcHJlZGljYXRlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkuZmluZEluZGV4T2Y8bnVtYmVyPihhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gJSAyKSA9PT0gMDsgfSkpLnRvLmVxdWFsKDEpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkuZmluZEluZGV4T2Y8bnVtYmVyPihhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gPiAxMCk7IH0pKS50by5lcXVhbCgtMSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3JlbW92ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZW1vdmUgdGhlIHNwZWNpZmllZCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCByZXR1cm4gdGhlIGl0ZW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGFycmF5OiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5yZW1vdmUoYXJyYXksIDMpKS50by5lcXVhbCgzKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXkubGVuZ3RoKS50by5lcXVhbCg0KTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnJlbW92ZShhcnJheSwgMTApKS50by5ub3QuZXhpc3Q7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZW1vdmUgdGhlIGZpcnN0IGl0ZW0gbWF0Y2hpbmcgdGhlIHByZWRpY2F0ZSBhbmQgcmV0dXJuIGl0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAoaXRlbTogbnVtYmVyKTogYm9vbGVhbiA9PiB7IHJldHVybiAoaXRlbSA+IDMpOyB9KSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5Lmxlbmd0aCkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5yZW1vdmUoYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtID4gMTApOyB9KSkudG8ubm90LmV4aXN0O1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZXBsYWNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJlcGxhY2UgYW4gaXRlbSBpbiB0aGUgYXJyYXkgd2l0aCBhbm90aGVyIGl0ZW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGFycmF5V2l0aEl0ZW1zOiBudW1iZXJbXSA9IFszLCA1LCA3XTtcclxuXHRcdFx0XHRhcnJheVV0aWxpdHkucmVwbGFjZShhcnJheVdpdGhJdGVtcywgNSwgMTApO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMF0pLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1sxXSkudG8uZXF1YWwoMTApO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1syXSkudG8uZXF1YWwoNyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBkbyBub3RoaW5nIGlmIHRoZSBpdGVtIHRvIHJlcGxhY2UgaXMgbm90IGZvdW5kJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheVdpdGhJdGVtczogbnVtYmVyW10gPSBbNCwgNiwgOF07XHJcblx0XHRcdFx0YXJyYXlVdGlsaXR5LnJlcGxhY2UoYXJyYXlXaXRoSXRlbXMsIDUsIDEwKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzBdKS50by5lcXVhbCg0KTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMV0pLnRvLmVxdWFsKDYpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1syXSkudG8uZXF1YWwoOCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3N1bScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBzdW0gdGhlIHZhbHVlcyBpbiBhbiBhcnJheScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgdmFsdWVzOiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnN1bSh2YWx1ZXMpKS50by5lcXVhbCgxNSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBhcHBseSBhIHRyYW5zZm9ybSB0byB0aGUgdmFsdWVzIGJlZm9yZSBzdW1taW5nIHRoZW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogSVRlc3RPYmpbXSA9IFt7IHByb3A6IDEgfSwgeyBwcm9wOiA0IH0sIHsgcHJvcDogNyB9XTtcclxuXHRcdFx0XHR2YXIgdHJhbnNmb3JtOiB7IChpdGVtOiBJVGVzdE9iaik6IG51bWJlciB9ID0gKGl0ZW06IElUZXN0T2JqKTogbnVtYmVyID0+IHsgcmV0dXJuIGl0ZW0ucHJvcDsgfTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnN1bSh2YWx1ZXMsIHRyYW5zZm9ybSkpLnRvLmVxdWFsKDEyKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiAwIGlmIHRoZXJlIGFyZSBubyBpdGVtcyB0byBzdW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogbnVtYmVyW10gPSBbXTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnN1bSh2YWx1ZXMpKS50by5lcXVhbCgwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgndG9EaWN0aW9uYXJ5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkaWN0aW9uYXJ5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTogSUtleU9ialtdID0gW1xyXG5cdFx0XHRcdFx0eyBrZXk6IDExIH0sXHJcblx0XHRcdFx0XHR7IGtleTogMTIgfSxcclxuXHRcdFx0XHRcdHsga2V5OiAxMyB9LFxyXG5cdFx0XHRcdFx0eyBrZXk6IDE0IH0sXHJcblx0XHRcdFx0XHR7IGtleTogMTUgfSxcclxuXHRcdFx0XHRdO1xyXG5cclxuXHRcdFx0XHR2YXIgZGljdGlvbmFyeTogSUtleU9ialtdID0gYXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeShhcnJheSwgKGl0ZW06IElLZXlPYmopOiBudW1iZXIgPT4geyByZXR1cm4gaXRlbS5rZXk7IH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxMV0pLnRvLmVxdWFsKGFycmF5WzBdKTtcclxuXHRcdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxMl0pLnRvLmVxdWFsKGFycmF5WzFdKTtcclxuXHRcdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxM10pLnRvLmVxdWFsKGFycmF5WzJdKTtcclxuXHRcdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxNF0pLnRvLmVxdWFsKGFycmF5WzNdKTtcclxuXHRcdFx0XHRleHBlY3QoZGljdGlvbmFyeVsxNV0pLnRvLmVxdWFsKGFycmF5WzRdKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24nO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUFjdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiB2b2lkO1xyXG5cdFx0c2F2aW5nOiBib29sZWFuO1xyXG5cdFx0Y29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyR0aW1lb3V0J107XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UpIHt9XHJcblxyXG5cdFx0cHJpdmF0ZSBjb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbjogbnVtYmVyID0gMTAwMDtcclxuXHJcblx0XHRwcml2YXRlIF9zYXZpbmc6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9jb21wbGV0ZTogYm9vbGVhbjtcclxuXHRcdHByaXZhdGUgX3N1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblxyXG5cdFx0Z2V0IHNhdmluZygpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3NhdmluZztcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgY29tcGxldGUoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wbGV0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgc3VjY2Vzc2Z1bCgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N1Y2Nlc3NmdWw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYW55IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2UudGhlbih0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bClcclxuXHRcdFx0XHRcdFx0LmNhdGNoKHRoaXMuYXV0b3NhdmVGYWlsZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVTdWNjZXNzZnVsOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgdHJ1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBhdXRvc2F2ZUZhaWxlZDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHJlc29sdmVBdXRvc2F2ZTogeyAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55IH0gPSAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55ID0+IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX2NvbXBsZXRlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5fc3VjY2Vzc2Z1bCA9IHN1Y2Nlc3M7XHJcblxyXG5cdFx0XHR0aGlzLiR0aW1lb3V0KCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLl9jb21wbGV0ZSA9IGZhbHNlO1xyXG5cdFx0XHR9LCB0aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uKTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fYXV0b3NhdmVBY3Rpb24gPSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb247XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2F1dG9zYXZlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRhdXRvc2F2ZSguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRjb250ZW50Rm9ybTogbmcuSUZvcm1Db250cm9sbGVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVTZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIGhhc1ZhbGlkYXRvcjogYm9vbGVhbjtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlXHJcblx0XHRcdFx0LCBwcml2YXRlIHNhdmU6IHsoLi4uZGF0YTogYW55W10pOiBuZy5JUHJvbWlzZTx2b2lkPn1cclxuXHRcdFx0XHQsIHB1YmxpYyBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlclxyXG5cdFx0XHRcdCwgcHJpdmF0ZSB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pIHtcclxuXHRcdFx0dGhpcy5oYXNWYWxpZGF0b3IgPSB2YWxpZGF0ZSAhPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuY29udGVudEZvcm0gPSB0aGlzLm51bGxGb3JtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhdXRvc2F2ZTogeyAoLi4uZGF0YTogYW55W10pOiBib29sZWFuIH0gPSAoLi4uZGF0YTogYW55W10pOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0uJHByaXN0aW5lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmhhc1ZhbGlkYXRvcikge1xyXG5cdFx0XHRcdHZhbGlkID0gdGhpcy52YWxpZGF0ZSgpO1xyXG5cdFx0XHRcdGlmICh2YWxpZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmFsaWQpIHtcclxuXHRcdFx0XHR0aGlzLmF1dG9zYXZlU2VydmljZS50cmlnZ2VyKHRoaXMuc2F2ZSguLi5kYXRhKS50aGVuKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZW50Rm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBudWxsRm9ybSgpOiBuZy5JRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0XHRyZXR1cm4gPGFueT57XHJcblx0XHRcdFx0JHByaXN0aW5lOiBmYWxzZSxcclxuXHRcdFx0XHQkc2V0UHJpc3RpbmUoKTogdm9pZCB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeygpOiBuZy5JUHJvbWlzZTx2b2lkPn0sIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyLCB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pOiBJQXV0b3NhdmVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0YXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW19fYXV0b3NhdmVBY3Rpb24uc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGF1dG9zYXZlU2VydmljZUZhY3RvcnkoYXV0b3NhdmVTZXJ2aWNlOiBfX2F1dG9zYXZlQWN0aW9uLklBdXRvc2F2ZUFjdGlvblNlcnZpY2UpOiBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZShzYXZlOiB7ICgpOiBuZy5JUHJvbWlzZTx2b2lkPiB9LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7ICgpOiBib29sZWFuIH0pOiBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEF1dG9zYXZlU2VydmljZShhdXRvc2F2ZVNlcnZpY2UsIHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19hdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0aW50ZXJmYWNlIElBdXRvc2F2ZUFjdGlvbk1vY2sge1xyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTx2b2lkPik6IG5nLklQcm9taXNlPHZvaWQ+O1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElNb2NrRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0JHByaXN0aW5lOiBib29sZWFuO1xyXG5cdFx0JHNldFByaXN0aW5lOiBTaW5vbi5TaW5vblNweTtcclxuXHR9XHJcblxyXG5cdGRlc2NyaWJlKCdhdXRvc2F2ZScsICgpID0+IHtcclxuXHRcdHZhciBhdXRvc2F2ZTogSUF1dG9zYXZlU2VydmljZTtcclxuXHRcdHZhciBhdXRvc2F2ZUZhY3Rvcnk6IElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5O1xyXG5cdFx0dmFyIHNhdmVTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIHRyaWdnZXJTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIHNldFByaXN0aW5lU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciBiYXNlQ29udGVudEZvcm06IElNb2NrRm9ybUNvbnRyb2xsZXI7XHJcblx0XHR2YXIgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR0cmlnZ2VyU3B5ID0gc2lub24uc3B5KChwcm9taXNlOiBuZy5JUHJvbWlzZTx2b2lkPik6IG5nLklQcm9taXNlPHZvaWQ+ID0+IHsgcmV0dXJuIHByb21pc2U7IH0pO1xyXG5cdFx0XHR2YXIgYXV0b3NhdmVBY3Rpb25TZXJ2aWNlOiBJQXV0b3NhdmVBY3Rpb25Nb2NrID0geyB0cmlnZ2VyOiB0cmlnZ2VyU3B5IH07XHJcblxyXG5cdFx0XHRfX3Rlc3QuYW5ndWxhckZpeHR1cmUubW9jayh7XHJcblx0XHRcdFx0YXV0b3NhdmVBY3Rpb246IGF1dG9zYXZlQWN0aW9uU2VydmljZSxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzZXRQcmlzdGluZVNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdFx0YmFzZUNvbnRlbnRGb3JtID0ge1xyXG5cdFx0XHRcdCRwcmlzdGluZTogZmFsc2UsXHJcblx0XHRcdFx0JHNldFByaXN0aW5lOiBzZXRQcmlzdGluZVNweSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChmYWN0b3J5TmFtZSwgJyRxJywgJyRyb290U2NvcGUnKTtcclxuXHRcdFx0YXV0b3NhdmVGYWN0b3J5ID0gc2VydmljZXNbZmFjdG9yeU5hbWVdO1xyXG5cdFx0XHR2YXIgJHE6IG5nLklRU2VydmljZSA9IHNlcnZpY2VzLiRxO1xyXG5cdFx0XHQkcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHJcblx0XHRcdHNhdmVTcHkgPSBzaW5vbi5zcHkoKCk6IG5nLklQcm9taXNlPHZvaWQ+ID0+IHsgcmV0dXJuICRxLndoZW4oKTsgfSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGNhbGwgc2F2ZSBvbiB0aGUgcGFyZW50IGFuZCBzZXQgdGhlIGZvcm0gdG8gcHJpc3RpbmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGF1dG9zYXZlID0gYXV0b3NhdmVGYWN0b3J5LmdldEluc3RhbmNlKHNhdmVTcHksIDxhbnk+YmFzZUNvbnRlbnRGb3JtKTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzYXZlU3B5KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uoc2V0UHJpc3RpbmVTcHkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBub3Qgc2F2ZSBpZiB0aGUgZm9ybSBpcyBwcmlzdGluZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0YXV0b3NhdmUgPSBhdXRvc2F2ZUZhY3RvcnkuZ2V0SW5zdGFuY2Uoc2F2ZVNweSwgPGFueT5iYXNlQ29udGVudEZvcm0pO1xyXG5cclxuXHRcdFx0YmFzZUNvbnRlbnRGb3JtLiRwcmlzdGluZSA9IHRydWU7XHJcblxyXG5cdFx0XHR2YXIgY2xvc2U6IGJvb2xlYW4gPSBhdXRvc2F2ZS5hdXRvc2F2ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNsb3NlKS50by5iZS50cnVlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChzYXZlU3B5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgdmFsaWRhdGUgdXNpbmcgdGhlIHZhbGlkYXRvciBpZiBvbmUgZXhpc3RzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgdmFsaWRhdGVTcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCgpOiBib29sZWFuID0+IHsgcmV0dXJuIHRydWU7IH0pO1xyXG5cclxuXHRcdFx0YXV0b3NhdmUgPSBhdXRvc2F2ZUZhY3RvcnkuZ2V0SW5zdGFuY2Uoc2F2ZVNweSwgPGFueT5iYXNlQ29udGVudEZvcm0sIHZhbGlkYXRlU3B5KTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh2YWxpZGF0ZVNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHNhdmVTcHkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2l0aG91dCBzYXZpbmcgaWYgdmFsaWRhdGlvbiBmYWlscycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHZhbGlkYXRlU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgoKTogYm9vbGVhbiA9PiB7IHJldHVybiBmYWxzZTsgfSk7XHJcblxyXG5cdFx0XHRhdXRvc2F2ZSA9IGF1dG9zYXZlRmFjdG9yeS5nZXRJbnN0YW5jZShzYXZlU3B5LCA8YW55PmJhc2VDb250ZW50Rm9ybSwgdmFsaWRhdGVTcHkpO1xyXG5cclxuXHRcdFx0dmFyIGNsb3NlOiBib29sZWFuID0gYXV0b3NhdmUuYXV0b3NhdmUoKTtcclxuXHJcblx0XHRcdGV4cGVjdChjbG9zZSkudG8uYmUuZmFsc2U7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh2YWxpZGF0ZVNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoc2F2ZVNweSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGFsd2F5cyBzYXZlIGlmIG5vIGZvcm0gaXMgc3BlY2lmaWVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRhdXRvc2F2ZSA9IGF1dG9zYXZlRmFjdG9yeS5nZXRJbnN0YW5jZShzYXZlU3B5KTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzYXZlU3B5KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnYXV0b3NhdmVBY3Rpb24nLCAoKSA9PiB7XHJcblx0XHR2YXIgYXV0b3NhdmVBY3Rpb246IElBdXRvc2F2ZUFjdGlvblNlcnZpY2U7XHJcblx0XHR2YXIgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZTtcclxuXHRcdHZhciAkcTogbmcuSVFTZXJ2aWNlO1xyXG5cdFx0dmFyICRyb290U2NvcGU6IG5nLklTY29wZTtcclxuXHRcdHZhciBkZWZlcnJlZDogbmcuSURlZmVycmVkPHZvaWQ+O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lLCAnJHRpbWVvdXQnLCAnJHEnLCAnJHJvb3RTY29wZScpO1xyXG5cdFx0XHRhdXRvc2F2ZUFjdGlvbiA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdFx0JHRpbWVvdXQgPSBzZXJ2aWNlcy4kdGltZW91dDtcclxuXHRcdFx0JHEgPSBzZXJ2aWNlcy4kcTtcclxuXHRcdFx0JHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblxyXG5cdFx0XHRkZWZlcnJlZCA9ICRxLmRlZmVyPHZvaWQ+KCk7XHJcblxyXG5cdFx0XHRhdXRvc2F2ZUFjdGlvbi50cmlnZ2VyKGRlZmVycmVkLnByb21pc2UpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLnNhdmluZykudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgc2V0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlcyBzdWNjZXNzZnVsbHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGRlZmVycmVkLnJlc29sdmUoKTtcclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uc2F2aW5nKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLmNvbXBsZXRlKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uc3VjY2Vzc2Z1bCkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgc2V0IHN1Y2Nlc3NmdWwgdG8gZmFsc2UgaWYgdGhlIHByb21pc2UgZmFpbHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5zYXZpbmcpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uY29tcGxldGUpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5zdWNjZXNzZnVsKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgc2V0IGNvbXBsZXRlIHRvIGZhbHNlIGFmdGVyIDEgc2Vjb25kJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlKCk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLmNvbXBsZXRlKS50by5iZS50cnVlO1xyXG5cclxuXHRcdFx0JHRpbWVvdXQuZmx1c2goMTAwMCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uY29tcGxldGUpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jvb2xlYW5VdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEJvb2xlYW5VdGlsaXR5IGltcGxlbWVudHMgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHRcdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gISFvYmplY3Q7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCb29sZWFuVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdib29sZWFuLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnYm9vbGVhblV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgYm9vbGVhblV0aWxpdHk6IElCb29sZWFuVXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdGJvb2xlYW5VdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RvQm9vbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBjb252ZXJ0IG51bGwgYW5kIHVuZGVmaW5lZCB0byBmYWxzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3QoYm9vbGVhblV0aWxpdHkudG9Cb29sKG51bGwpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3QoYm9vbGVhblV0aWxpdHkudG9Cb29sKHVuZGVmaW5lZCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgbGVhdmUgYm9vbCB2YWx1ZXMgdW5jaGFuZ2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChib29sZWFuVXRpbGl0eS50b0Jvb2woZmFsc2UpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3QoYm9vbGVhblV0aWxpdHkudG9Cb29sKHRydWUpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBsZzogc3RyaW5nID0gJ2xnJztcclxuXHRleHBvcnQgdmFyIG1kOiBzdHJpbmcgPSAnbWQnO1xyXG5cdGV4cG9ydCB2YXIgc206IHN0cmluZyA9ICdzbSc7XHJcblx0ZXhwb3J0IHZhciB4czogc3RyaW5nID0gJ3hzJztcclxufVxyXG4iLCIvKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBhbHNvIHJlcXVpcmVzIHRoZSBmb2xsb3dpbmcgZWxlbWVudHMgdG8gYmUgaW5zZXJ0ZWQgb24gdGhlIHBhZ2U6XHJcbiAqICAgPGRpdiBjbGFzcz1cImRldmljZS14cyB2aXNpYmxlLXhzXCI+PC9kaXY+XHJcbiAqICAgPGRpdiBjbGFzcz1cImRldmljZS1zbSB2aXNpYmxlLXNtXCI+PC9kaXY+XHJcbiAqICAgPGRpdiBjbGFzcz1cImRldmljZS1tZCB2aXNpYmxlLW1kXCI+PC9kaXY+XHJcbiAqICAgPGRpdiBjbGFzcz1cImRldmljZS1sZyB2aXNpYmxlLWxnXCI+PC9kaXY+XHJcbiAqL1xyXG5cclxuIG1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciB2aXNpYmxlQnJlYWtwb2ludHNTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Zpc2libGVCcmVha3BvaW50JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlIHtcclxuXHRcdGlzVmlzaWJsZShicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFZpc2libGVCcmVha3BvaW50U2VydmljZSBpbXBsZW1lbnRzIElWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2Uge1xyXG5cdFx0aXNWaXNpYmxlKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHQvLyBqcXVlcnkgZ2V0cyB0aGUgYnJlYWtwb2ludCB0cmlnZ2VyIGRpcmVjdGl2ZXMgbGlzdGVkIGFib3ZlIG9uIGxpbmUgM1xyXG5cdFx0XHRyZXR1cm4gJCgnLmRldmljZS0nICsgYnJlYWtwb2ludCkuaXMoJzp2aXNpYmxlJyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElXYXRjaGVyPFRSZXR1cm5UeXBlPiB7XHJcblx0XHRhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+O1xyXG5cdFx0ZXZlbnQ/OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBY3Rpb248VFJldHVyblR5cGU+IHtcclxuXHRcdCguLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0KCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiBJQWN0aW9uPHZvaWQ+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW107XHJcblx0XHRmaXJlKGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlU2VydmljZSBpbXBsZW1lbnRzIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIHdhdGNoZXJzOiBJV2F0Y2hlcjxhbnk+W10gPSBbXTtcclxuXHRcdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0XHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0aWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdFx0dGhpcy5uZXh0S2V5Kys7XHJcblx0XHRcdHRoaXMud2F0Y2hlcnNbY3VycmVudEtleV0gPSB7XHJcblx0XHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdFx0cmV0dXJuIF8odGhpcy53YXRjaGVycykuZmlsdGVyKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQubWFwKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHRcdH0pLnZhbHVlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRcdHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgT2JzZXJ2YWJsZVNlcnZpY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy53aW5kb3cnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd3aW5kb3dDb250cm9sJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJV2luZG93U2VydmljZSB7XHJcblx0XHRyZXNpemUoY2FsbGJhY2s6IHsgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IGFueSB9KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIFdpbmRvd1NlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSB3aW5kb3dDb250cm9sOiBKUXVlcnkgPSAkKHdpbmRvdyk7XHJcblxyXG5cdFx0cmVzaXplKGNhbGxiYWNrOiB7IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiBhbnkgfSk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLndpbmRvd0NvbnRyb2wucmVzaXplKGNhbGxiYWNrKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFdpbmRvd1NlcnZpY2UpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdicmVha3BvaW50cy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndmlzaWJsZUJyZWFrcG9pbnRzLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi93aW5kb3cvd2luZG93LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3dpbmRvdyA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy53aW5kb3c7XHJcblx0aW1wb3J0IF9fb2JzZXJ2YWJsZSA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdicmVha3BvaW50cyc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUJyZWFrcG9pbnRTZXJ2aWNlIHtcclxuXHRcdGN1cnJlbnRCcmVha3BvaW50OiBzdHJpbmc7XHJcblx0XHRpc0JyZWFrcG9pbnQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhicmVha3BvaW50OiBzdHJpbmcpOiB2b2lkfSk6IF9fb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEJyZWFrcG9pbnRTZXJ2aWNlIGltcGxlbWVudHMgSUJyZWFrcG9pbnRTZXJ2aWNlIHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFt2aXNpYmxlQnJlYWtwb2ludHNTZXJ2aWNlTmFtZSwgJ3Jlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzJywgX193aW5kb3cuc2VydmljZU5hbWUsIF9fb2JzZXJ2YWJsZS5mYWN0b3J5TmFtZV1cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgdmlzaWJsZUJyZWFrcG9pbnRzOiBJVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlXHJcblx0XHRcdFx0LCByZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kczogbnVtYmVyXHJcblx0XHRcdFx0LCB3aW5kb3dTZXJ2aWNlOiBfX3dpbmRvdy5JV2luZG93U2VydmljZVxyXG5cdFx0XHRcdCwgb2JzZXJ2YWJsZUZhY3Rvcnk6IF9fb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KSB7XHJcblx0XHRcdHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSB0aGlzLmdldEJyZWFrcG9pbnQoKTtcclxuXHJcblx0XHRcdHRoaXMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGVGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblxyXG5cdFx0XHR2YXIgZWZmaWNpZW50UmVzaXplOiB7KCk6IHZvaWR9ID0gXy5kZWJvdW5jZSh0aGlzLnVwZGF0ZUJyZWFrcG9pbnQsIHJlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzLCB7XHJcblx0XHRcdFx0bGVhZGluZzogdHJ1ZSxcclxuXHRcdFx0XHR0cmFpbGluZzogdHJ1ZSxcclxuXHRcdFx0XHRtYXhXYWl0OiByZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcyxcclxuXHRcdFx0fSk7XHJcblx0XHRcdHdpbmRvd1NlcnZpY2UucmVzaXplKGVmZmljaWVudFJlc2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBvYnNlcnZhYmxlOiBfX29ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdFx0Y3VycmVudEJyZWFrcG9pbnQ6IHN0cmluZztcclxuXHJcblx0XHRwcml2YXRlIGdldEJyZWFrcG9pbnQoKTogc3RyaW5nIHtcclxuXHRcdFx0aWYgKHRoaXMudmlzaWJsZUJyZWFrcG9pbnRzLmlzVmlzaWJsZShsZykpIHtcclxuXHRcdFx0XHRyZXR1cm4gbGc7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy52aXNpYmxlQnJlYWtwb2ludHMuaXNWaXNpYmxlKG1kKSkge1xyXG5cdFx0XHRcdHJldHVybiBtZDtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnZpc2libGVCcmVha3BvaW50cy5pc1Zpc2libGUoc20pKSB7XHJcblx0XHRcdFx0cmV0dXJuIHNtO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB4cztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlzQnJlYWtwb2ludChicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPT09IGJyZWFrcG9pbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7IChicmVha3BvaW50OiBzdHJpbmcpOiB2b2lkIH0pOiBfX29ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmFibGUucmVnaXN0ZXIoYWN0aW9uLCAnd2luZG93LmJyZWFrcG9pbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSB1cGRhdGVCcmVha3BvaW50OiB7KCk6IHZvaWR9ID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgbmV3QnJlYWtQb2ludDogc3RyaW5nID0gdGhpcy5nZXRCcmVha3BvaW50KCk7XHJcblxyXG5cdFx0XHRpZiAobmV3QnJlYWtQb2ludCAhPT0gdGhpcy5jdXJyZW50QnJlYWtwb2ludCkge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBuZXdCcmVha1BvaW50O1xyXG5cdFx0XHRcdHRoaXMub2JzZXJ2YWJsZS5maXJlKCd3aW5kb3cuYnJlYWtwb2ludENoYW5nZWQnLCB0aGlzLmN1cnJlbnRCcmVha3BvaW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fd2luZG93Lm1vZHVsZU5hbWUsIF9fb2JzZXJ2YWJsZS5tb2R1bGVOYW1lXSlcclxuXHRcdC5jb25zdGFudCgncmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHMnLCA1MDApXHJcblx0XHQuc2VydmljZSh2aXNpYmxlQnJlYWtwb2ludHNTZXJ2aWNlTmFtZSwgVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJyZWFrcG9pbnRTZXJ2aWNlKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2JyZWFrcG9pbnRzLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0aW50ZXJmYWNlIElWaXNpYmxlQnJlYWtwb2ludHNNb2NrIHtcclxuXHRcdGlzVmlzaWJsZShicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElXaW5kb3dTZXJ2aWNlTW9jayB7XHJcblx0XHRyZXNpemUoY2FsbGJhY2s6IHsoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogYW55fSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRkZXNjcmliZSgnYnJlYWtwb2ludHMnLCAoKSA9PiB7XHJcblx0XHR2YXIgYnJlYWtwb2ludHM6IElCcmVha3BvaW50U2VydmljZTtcclxuXHJcblx0XHR2YXIgdmlzaWJsZUJyZWFrcG9pbnQ6IHN0cmluZztcclxuXHRcdHZhciB0cmlnZ2VyUmVzaXplOiB7ICgpOiB2b2lkIH07XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKTogdm9pZCA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGhhdmUgdmlzaWJsZSBicmVha3BvaW50IG1hcmtlZCBhcyBjdXJyZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2aXNpYmxlQnJlYWtwb2ludCA9IG1kO1xyXG5cclxuXHRcdFx0YnVpbGRTZXJ2aWNlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuY3VycmVudEJyZWFrcG9pbnQpLnRvLmVxdWFsKG1kKTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludChtZCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQobGcpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludChzbSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KHhzKSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHNpZ25hbCByZWdpc3RlcmVkIGxpc3RlbmVycyB3aGVuIHRoZSBicmVha3BvaW50IGNoYW5nZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBicmVha3BvaW50Q2hhbmdlU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdFx0dmlzaWJsZUJyZWFrcG9pbnQgPSBzbTtcclxuXHJcblx0XHRcdGJ1aWxkU2VydmljZSgpO1xyXG5cclxuXHRcdFx0YnJlYWtwb2ludHMucmVnaXN0ZXIoYnJlYWtwb2ludENoYW5nZVNweSk7XHJcblxyXG5cdFx0XHR2aXNpYmxlQnJlYWtwb2ludCA9IG1kO1xyXG5cdFx0XHR0cmlnZ2VyUmVzaXplKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuY3VycmVudEJyZWFrcG9pbnQpLnRvLmVxdWFsKG1kKTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludChtZCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQobGcpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludChzbSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KHhzKSkudG8uYmUuZmFsc2U7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShicmVha3BvaW50Q2hhbmdlU3B5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGJ1aWxkU2VydmljZSgpOiB2b2lkIHtcclxuXHRcdFx0dmFyIG1vY2tWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2U6IElWaXNpYmxlQnJlYWtwb2ludHNNb2NrID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJyZWFrcG9pbnQgPT09IHZpc2libGVCcmVha3BvaW50O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgbW9ja1dpbmRvd0NvbnRyb2w6IElXaW5kb3dTZXJ2aWNlTW9jayA9IHtcclxuXHRcdFx0XHRyZXNpemU6IChjYWxsYmFjazogeyAoKTogdm9pZCB9KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHR0cmlnZ2VyUmVzaXplID0gY2FsbGJhY2s7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdF9fdGVzdC5hbmd1bGFyRml4dHVyZS5tb2NrKHtcclxuXHRcdFx0XHR2aXNpYmxlQnJlYWtwb2ludDogbW9ja1Zpc2libGVCcmVha3BvaW50U2VydmljZSxcclxuXHRcdFx0XHR3aW5kb3dDb250cm9sOiBtb2NrV2luZG93Q29udHJvbCxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRicmVha3BvaW50cyA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnY29udGVudFByb3ZpZGVyRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkO1xyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeTtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdUZXh0OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0fVxyXG5cclxuXHRjbGFzcyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlIGltcGxlbWVudHMgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3Iob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0XHRwcml2YXRlIGNvbnRlbnQ6IEpRdWVyeTtcclxuXHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudDogeyh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWR9ID0gKHRyYW5zY2x1ZGVGdW5jdGlvbjogbmcuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKHRyYW5zY2x1ZGVGdW5jdGlvbikpIHtcclxuXHRcdFx0XHR0cmFuc2NsdWRlRnVuY3Rpb24oKGNsb25lOiBKUXVlcnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2V0Q29udGVudChjbG9uZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRDb250ZW50KG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YWJsZS5yZWdpc3RlcigoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9LCAnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5IHtcclxuXHRcdFx0aWYgKHNlbGVjdG9yICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50LmZpbHRlcihzZWxlY3Rvcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbb2JzZXJ2YWJsZS5mYWN0b3J5TmFtZV07XHJcblx0ZnVuY3Rpb24gY29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQ29udGVudFByb3ZpZGVyU2VydmljZShvYnNlcnZhYmxlRmFjdG9yeSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JzZXJ2YWJsZS5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnY29udGVudFByb3ZpZGVyJywgKCkgPT4ge1xyXG5cdFx0dmFyIGNvbnRlbnRQcm92aWRlcjogSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0XHR2YXIgdHJhbnNjbHVkZVNweTogU2lub24uU2lub25TcHk7XHJcblx0XHR2YXIgZmlsdGVyU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciBqcXVlcnlDbG9uZTogYW55O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0dmFyIGNvbnRlbnRQcm92aWRlckZhY3Rvcnk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeVxyXG5cdFx0XHRcdD0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIgPSBjb250ZW50UHJvdmlkZXJGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblxyXG5cdFx0XHRqcXVlcnlDbG9uZSA9IHt9O1xyXG5cdFx0XHRmaWx0ZXJTcHkgPSBzaW5vbi5zcHkoKG9iamVjdDogYW55KTogYW55ID0+IHsgcmV0dXJuIG9iamVjdDsgfSk7XHJcblx0XHRcdGpxdWVyeUNsb25lLmZpbHRlciA9IGZpbHRlclNweTtcclxuXHJcblx0XHRcdHRyYW5zY2x1ZGVTcHkgPSBzaW5vbi5zcHkoKGZ1bmM6IEZ1bmN0aW9uKSA9PiBmdW5jKGpxdWVyeUNsb25lKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGdldCB0aGUgY29udGVudCB0aGF0IHdhcyBzZXQgYnkgc2V0Q29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cdFx0XHRleHBlY3QoY29udGVudFByb3ZpZGVyLmdldENvbnRlbnQoKSkudG8uZXF1YWwoanF1ZXJ5Q2xvbmUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgdGhlIGNvbnRlbnQgdG8gdGhlIGNvbnRlbnQgcHJvdmlkZWQgYnkgdGhlIHRyYW5zY2x1ZGUgZnVuY3Rpb24nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRUcmFuc2NsdWRlQ29udGVudCh0cmFuc2NsdWRlU3B5KTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHRyYW5zY2x1ZGVTcHkpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCkpLnRvLmVxdWFsKGpxdWVyeUNsb25lKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZmlsdGVyIHRoZSBqcXVlcnkgb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBzZWxlY3RvcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLmdldENvbnRlbnQoJ3NlbGVjdG9yJyk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmaWx0ZXJTcHkpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChmaWx0ZXJTcHksICdzZWxlY3RvcicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBjYWxsIHRoZSBhY3Rpb24gd2l0aCB0aGUgbmV3IGNvbnRlbnQgd2hlbiB0aGUgY29udGVudCBjaGFuZ2VzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYWN0aW9uU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnJlZ2lzdGVyKGFjdGlvblNweSk7XHJcblxyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIuc2V0Q29udGVudChqcXVlcnlDbG9uZSk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShhY3Rpb25TcHkpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChhY3Rpb25TcHksIGpxdWVyeUNsb25lKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgY2FsbCB0aGUgYWN0aW9uIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGlzIGFscmVhZHkgY29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFjdGlvblNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRDb250ZW50KGpxdWVyeUNsb25lKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5yZWdpc3RlcihhY3Rpb25TcHkpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYWN0aW9uU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYWN0aW9uU3B5LCBqcXVlcnlDbG9uZSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBkYXRlU2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vbnRoIHtcclxuXHRcdG5hbWU6IHN0cmluZztcclxuXHRcdGRheXMoeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVVdGlsaXR5IHtcclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZztcclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBEYXRlVXRpbGl0eSB7XHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdFx0dGhpcy5tb250aCA9IFtcclxuXHRcdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWFyY2gnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bmUnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdF07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9udGg6IElNb250aFtdO1xyXG5cclxuXHRcdHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSB7XHJcblx0ZXhwb3J0IHZhciBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZUZvcm1hdFN0cmluZ3Mge1xyXG5cdFx0ZGF0ZVRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHRcdGRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHRcdHRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgZGVmYXVsdEZvcm1hdHM6IElEYXRlRm9ybWF0U3RyaW5ncyA9IHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiAnTS9EL1lZWVkgaDptbSBBJyxcclxuXHRcdGRhdGVGb3JtYXQ6ICdNL0QvWVlZWScsXHJcblx0XHR0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG5cdH07XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlVGltZUZvcm1hdFN0cmluZ3MudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShkYXRlU2VydmljZU5hbWUsIERhdGVVdGlsaXR5KVxyXG5cdFx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnZGF0ZVV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgZGF0ZVV0aWxpdHk6IElEYXRlVXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChkYXRlU2VydmljZU5hbWUpO1xyXG5cdFx0XHRkYXRlVXRpbGl0eSA9IHNlcnZpY2VzW2RhdGVTZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnZ2V0RnVsbFN0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIG1vbnRoIG5hbWUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMCkpLnRvLmVxdWFsKCdKYW51YXJ5Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMSkpLnRvLmVxdWFsKCdGZWJydWFyeScpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDIpKS50by5lcXVhbCgnTWFyY2gnKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygzKSkudG8uZXF1YWwoJ0FwcmlsJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNCkpLnRvLmVxdWFsKCdNYXknKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg1KSkudG8uZXF1YWwoJ0p1bmUnKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg2KSkudG8uZXF1YWwoJ0p1bHknKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg3KSkudG8uZXF1YWwoJ0F1Z3VzdCcpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDgpKS50by5lcXVhbCgnU2VwdGVtYmVyJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoOSkpLnRvLmVxdWFsKCdPY3RvYmVyJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMTApKS50by5lcXVhbCgnTm92ZW1iZXInKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygxMSkpLnRvLmVxdWFsKCdEZWNlbWJlcicpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdnZXREYXlzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGdldCB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDApKS50by5lcXVhbCgzMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMikpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygzKSkudG8uZXF1YWwoMzApO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDQpKS50by5lcXVhbCgzMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNSkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg2KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDcpKS50by5lcXVhbCgzMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoOCkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg5KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDEwKSkudG8uZXF1YWwoMzApO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDExKSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgYWNjb3VudCBmb3IgbGVhcCB5ZWFycycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxLCAyMDE1KSkudG8uZXF1YWwoMjgpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDEsIDIwMTYpKS50by5lcXVhbCgyOSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuXHRlbnVtIFNpZ24ge1xyXG5cdFx0cG9zaXRpdmUgPSAxLFxyXG5cdFx0bmVnYXRpdmUgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBOdW1iZXJVdGlsaXR5IGltcGxlbWVudHMgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0XHRyZXR1cm4gKE1hdGgucm91bmQoKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgKDxudW1iZXI+c2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxufVxyXG4iLCJcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRcdEJZVEVTX1BFUl9HQjogbnVtYmVyID0gMTA3Mzc0MTgyNDtcclxuXHRcdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRcdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0XHRieXRlczogbnVtYmVyO1xyXG5cclxuXHRcdEdCOiBudW1iZXI7XHJcblx0XHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRcdE1COiBudW1iZXI7XHJcblx0XHRpc01COiBib29sZWFuO1xyXG5cclxuXHRcdEtCOiBudW1iZXI7XHJcblx0XHRpc0tCOiBib29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSwgYnl0ZXM6IG51bWJlcikge1xyXG5cdFx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzTUIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5HQiArICcgR0InO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc0tCKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5ieXRlcyArICcgYnl0ZXMnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxuXHR9XHJcblxyXG5cdGZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlci5zZXJ2aWNlTmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBudW1iZXIuSU51bWJlclV0aWxpdHkpOiBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemUge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdFx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0XHRyZXR1cm4gZmlsZVNpemUuZGlzcGxheSgpO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZUZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHRcdC5maWx0ZXIoc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXIpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0ZGVzY3JpYmUoJ2ZpbGVTaXplJywgKCkgPT4ge1xyXG5cdFx0dmFyIGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmFjdG9yeU5hbWUpO1xyXG5cdFx0XHRmaWxlU2l6ZUZhY3RvcnkgPSBzZXJ2aWNlc1tmYWN0b3J5TmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGRldGVybWluZSBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxKS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIGJ5dGVzJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTAyMykuZGlzcGxheSgpKS50by5lcXVhbCgnMTAyMyBieXRlcycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUga2lsbyBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxMDI0KS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIEtCJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA0ODU3NSkuZGlzcGxheSgpKS50by5lcXVhbCgnMTAyNCBLQicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUgbWVnYSBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxMDQ4NTc2KS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIE1CJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA3Mzc0MTgyMykuZGlzcGxheSgpKS50by5lcXVhbCgnMTAyNCBNQicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUgZ2lnYSBieXRlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSgxMDczNzQxODI0KS5kaXNwbGF5KCkpLnRvLmVxdWFsKCcxIEdCJyk7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA3Mzc0MTgyNSkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBHQicpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXI7XHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gK3N0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChzdWJzdHJpbmcpIHtcclxuXHRcdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG5cdFx0XHRfLmVhY2gocGFyYW1zLCAocGFyYW06IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcldpdGhDb3VudHMgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHRcdHVwZGF0ZU9wdGlvbkNvdW50czxUSXRlbVR5cGU+KGRhdGE6IFRJdGVtVHlwZVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3N0cmluZy9zdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vZmlsdGVycy9maWx0ZXIudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlciBleHRlbmRzIGZpbHRlci5JRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmcgPSBmaWx0ZXJOYW1lO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgb2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzZWFyY2hPYmplY3Q8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUsIHNlYXJjaDogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KHZhbHVlcywgKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHsgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZGF0YVN0cmluZzogc3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcblxyXG5cdFx0XHRcdGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Quc2VydmljZU5hbWUsIHN0cmluZy5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksXHJcblx0XHRzdHJpbmdVdGlsaXR5OiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdC5tb2R1bGVOYW1lLCBzdHJpbmcubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGludGVyZmFjZSBJVGVzdE9iamVjdCB7XHJcblx0XHRwcm9wOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RPYmplY3QyIHtcclxuXHRcdHByb3AxPzogbnVtYmVyO1xyXG5cdFx0cHJvcDI/OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSU5lc3RlZFRlc3RPYmplY3Qge1xyXG5cdFx0bmVzdGVkT2JqZWN0OiBJVGVzdE9iamVjdDI7XHJcblx0fVxyXG5cclxuXHRkZXNjcmliZSgnZ2VuZXJpY1NlYXJjaEZpbHRlcicsICgpID0+IHtcclxuXHRcdHZhciBnZW5lcmljU2VhcmNoRmlsdGVyOiBJR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChmYWN0b3J5TmFtZSk7XHJcblx0XHRcdHZhciBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5ID0gc2VydmljZXNbZmFjdG9yeU5hbWVdO1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyID0gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgaW5jbHVkZSBhbGwgaXRlbXMgaWYgcXVlcnkgaXMgbnVsbCBvciBlbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gbnVsbDtcclxuXHJcblx0XHRcdHZhciBvYmplY3QxOiBJVGVzdE9iamVjdCA9IHtcclxuXHRcdFx0XHRwcm9wOiAnc29tZSBzdHJpbmcnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG9iamVjdDI6IElUZXN0T2JqZWN0ID0ge1xyXG5cdFx0XHRcdHByb3A6ICdhbm90aGVyIHZhbHVlJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihvYmplY3QxKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdDIpKS50by5iZS50cnVlO1xyXG5cclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gJyc7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihvYmplY3QxKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdDIpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZWFyY2ggdGhlIGFjdHVhbCBkYXRhIHZhbHVlcyBpZiB0aGV5IGFyZW50IG9iamVjdHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoVGV4dCA9ICcyJztcclxuXHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcigxKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcigyKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKDMpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKDQpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKDUpKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgaW5jbHVkZSBpdGVtcyB0aGF0IGNvbnRhaW4gdGhlIHNlYXJjaCBzdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoVGV4dCA9ICdteSc7XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIuY2FzZVNlbnNpdGl2ZSA9IHRydWU7XHJcblx0XHRcdHZhciBtYXRjaGluZ09iamVjdDE6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMjogJ215IHN0cmluZycsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgbWF0Y2hpbmdPYmplY3QyOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDE6IDUsXHJcblx0XHRcdFx0cHJvcDI6ICdzb21lIHN0cmluZyB3aXRoIG15JyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBvYmplY3RXaXRob3V0U2VhcmNoU3RyaW5nOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDE6IDIsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgb2JqZWN0V2l0aERpZmZlcmVudENhc2U6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMTogNSxcclxuXHRcdFx0XHRwcm9wMjogJ01ZIHN0cmluZycsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIobWF0Y2hpbmdPYmplY3QxKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdFdpdGhvdXRTZWFyY2hTdHJpbmcpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG1hdGNoaW5nT2JqZWN0MikpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihvYmplY3RXaXRoRGlmZmVyZW50Q2FzZSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBpbmNsdWRlIGl0ZW1zIHRoYXQgY29udGFpbiB0aGUgc2VhcmNoIHN0cmluZywgY2FzZSBpbnNlbnNpdGl2ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gJ215JztcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5jYXNlU2Vuc2l0aXZlID0gZmFsc2U7XHJcblx0XHRcdHZhciBsb3dlcmNhc2VNYXRjaDogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AyOiAnbXkgc3RyaW5nJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciB1cHBlcmNhc2VNYXRjaDogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AxOiAyLjIsXHJcblx0XHRcdFx0cHJvcDI6ICdNWSBzdHJpbmcnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKGxvd2VyY2FzZU1hdGNoKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKHVwcGVyY2FzZU1hdGNoKSkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmVjdXJzaXZlbHkgc2VhcmNoIHRoZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gJ215JztcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5jYXNlU2Vuc2l0aXZlID0gZmFsc2U7XHJcblx0XHRcdHZhciBvYmplY3RXaXRoTmVzdGVkT2JqZWN0OiBJTmVzdGVkVGVzdE9iamVjdCA9IHtcclxuXHRcdFx0XHRuZXN0ZWRPYmplY3Q6IHtcclxuXHRcdFx0XHRcdHByb3AyOiAnbXkgc3RyaW5nJyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdFdpdGhOZXN0ZWRPYmplY3QpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnanF1ZXJ5VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUpRdWVyeVV0aWxpdHkge1xyXG5cdFx0cmVwbGFjZUNvbnRlbnQoY29udGVudEFyZWE6IEpRdWVyeSwgbmV3Q29udGVudHM6IEpRdWVyeSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBKUXVlcnlVdGlsaXR5IGltcGxlbWVudHMgSUpRdWVyeVV0aWxpdHkge1xyXG5cdFx0cmVwbGFjZUNvbnRlbnQoY29udGVudEFyZWE6IEpRdWVyeSwgbmV3Q29udGVudDogSlF1ZXJ5KTogdm9pZCB7XHJcblx0XHRcdGNvbnRlbnRBcmVhLmVtcHR5KCk7XHJcblx0XHRcdGNvbnRlbnRBcmVhLmFwcGVuZChuZXdDb250ZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEpRdWVyeVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdqcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2pxdWVyeVV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIganF1ZXJ5VXRpbGl0eTogSUpRdWVyeVV0aWxpdHk7XHJcblx0XHR2YXIgZW1wdHlTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIGFwcGVuZFNweTogU2lub24uU2lub25TcHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRqcXVlcnlVdGlsaXR5ID0gc2VydmljZXMuanF1ZXJ5VXRpbGl0eTtcclxuXHJcblx0XHRcdGVtcHR5U3B5ID0gc2lub24uc3B5KCk7XHJcblx0XHRcdGFwcGVuZFNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBlbXB0eSB0aGUgZXhpc3RpbmcgY29udGVudCBhbmQgYXBwZW5kIHRoZSBuZXcgY29udGVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGV4aXN0aW5nRWxlbWVudDogYW55ID0ge1xyXG5cdFx0XHRcdGVtcHR5OiBlbXB0eVNweSxcclxuXHRcdFx0XHRhcHBlbmQ6IGFwcGVuZFNweSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBuZXdDb250ZW50OiBhbnkgPSB7fTtcclxuXHJcblx0XHRcdGpxdWVyeVV0aWxpdHkucmVwbGFjZUNvbnRlbnQoZXhpc3RpbmdFbGVtZW50LCBuZXdDb250ZW50KTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGVtcHR5U3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYXBwZW5kU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYXBwZW5kU3B5LCBuZXdDb250ZW50KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdvYmplY3RVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIG9iamVjdFV0aWxpdHk6IElPYmplY3RVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0b2JqZWN0VXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdpc051bGxPckVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gbnVsbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KG51bGwpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBlbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KCcnKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHN0cmluZyBoYXMgY29udGVudHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgncmFuZG9tIHN0cmluZycpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBudWxsIG9yIGVtcHR5IGFycmF5cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KG51bGwpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoW10pKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoWzEsIDIsIDNdKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBudW1iZXIgdHlwZSBpcyBub3QgYSBudW1iZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShOdW1iZXIuTmFOKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KDUpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnaXNOdWxsT3JXaGl0ZXNwYWNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBlbXB0eSB3aGl0ZXNwYWNlIHN0cmluZ3MnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKCcgICAnKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIGhhbmRsZSBudWxsIGFuZCBlbXB0eSBvYmplY3RzIGxpa2UgaXNOdWxsT3JFbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UobnVsbCkpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShudWxsKSk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKFtdKSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFtdKSk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKHt9KSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KHt9KSk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKCcnKSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KCcnKSk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKCdyYW5kb20gc3RyaW5nJykpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgncmFuZG9tIHN0cmluZycpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnYXJlRXF1YWwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdHdvIHByaW1pdGl2ZXMgYXJlIGVxdWFsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBzdHJpbmcxOiBzdHJpbmcgPSAnYWJjJztcclxuXHRcdFx0XHR2YXIgc3RyaW5nMjogc3RyaW5nID0gJ2FiYyc7XHJcblx0XHRcdFx0dmFyIG51bTE6IG51bWJlciA9IDE7XHJcblx0XHRcdFx0dmFyIG51bTI6IG51bWJlciA9IDE7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoc3RyaW5nMSwgc3RyaW5nMikpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwobnVtMSwgbnVtMikpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdHdvIG9iamVjdHMgYXJlIG5vdCBvZiB0aGUgc2FtZSB0eXBlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBzdHJpbmc6IHN0cmluZyA9ICdhYmMnO1xyXG5cdFx0XHRcdHZhciBudW06IG51bWJlciA9IDE7XHJcblx0XHRcdFx0dmFyIG9iajogYW55ID0ge307XHJcblx0XHRcdFx0dmFyIGFycmF5OiBhbnlbXSA9IFtdO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKHN0cmluZywgbnVtKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoc3RyaW5nLCBvYmopKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChzdHJpbmcsIGFycmF5KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwobnVtLCBvYmopKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChudW0sIGFycmF5KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0Ly9vYmogYW5kIGFycmF5IGFyZSBjb25zaWRlcmVkIHRoZSBzYW1lIHR5cGVcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBvbmUgb2JqZWN0IGlzIHZhbGlkIGFuZCB0aGUgb3RoZXIgaXMgbnVsbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgb2JqOiBhbnkgPSB7ICcxJzogMSwgJzInOiAyIH07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqLCBudWxsKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgYXJyYXlzIGhhdmUgZGlmZmVyZW50IGxlbmd0aHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGFycmF5MTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblx0XHRcdFx0dmFyIGFycmF5MjogbnVtYmVyW10gPSBbMSwgMiwgM107XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoYXJyYXkxLCBhcnJheTIpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIGNvbXBhcmUgYXJyYXlzIGJ5IGVsZW1lbnQgaWYgdGhleSBhcmUgdGhlIHNhbWUgbGVuZ3RoJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblx0XHRcdFx0dmFyIHNpbWlsYXJBcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVudEFycmF5OiBudW1iZXJbXSA9IFs1LCA0LCAzLCAyLCAxXTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChhcnJheSwgc2ltaWxhckFycmF5KSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChhcnJheSwgZGlmZmVyZW50QXJyYXkpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHVzZSB0aGUga2V5cyBmcm9tIHRoZSBmaXJzdCBvYmplY3QgdG8gY29tcGFyZSBwcm9wZXJ0aWVzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBvYmplY3Q6IGFueSA9IHtcclxuXHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdCcyJzogMixcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBzaW1pbGFyT2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgZGlmZmVyZW50T2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHQndHdvJzogMixcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgc2ltaWxhck9iamVjdCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqZWN0LCBkaWZmZXJlbnRPYmplY3QpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBvYmplY3QgMiBoYXMgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IDEgd2l0aCBhZGRpdGlvbmFsIHByb3BlcnRpZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIG9iamVjdDE6IGFueSA9IHtcclxuXHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdCcyJzogMixcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBvYmplY3QyOiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0XHQnNCc6IDQsXHJcblx0XHRcdFx0XHQnNSc6IDUsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QxLCBvYmplY3QyKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZWN1cnNpdmVseSBjb21wYXJlIG5lc3RlZCBvYmplY3RzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBvYmplY3Q6IGFueSA9IHtcclxuXHRcdFx0XHRcdG5lc3RlZE9iajoge1xyXG5cdFx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHRcdCcyJzogMixcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRuZXN0ZWRBcnJheTogWzEsIDIsIDNdLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIHNpbWlsYXJPYmplY3Q6IGFueSA9IHtcclxuXHRcdFx0XHRcdG5lc3RlZE9iajoge1xyXG5cdFx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHRcdCcyJzogMixcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRuZXN0ZWRBcnJheTogWzEsIDIsIDNdLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVudE9iamVjdDE6IGFueSA9IHtcclxuXHRcdFx0XHRcdG5lc3RlZE9iajoge1xyXG5cdFx0XHRcdFx0XHQnb25lJzogMSxcclxuXHRcdFx0XHRcdFx0J3R3byc6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bmVzdGVkQXJyYXk6IFsxLCAyLCAzXSxcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBkaWZmZXJlbnRPYmplY3QyOiBhbnkgPSB7XHJcblx0XHRcdFx0XHRuZXN0ZWRPYmo6IHtcclxuXHRcdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bmVzdGVkQXJyYXk6IFsxLCAyLCAzLCA0LCA1XSxcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgc2ltaWxhck9iamVjdCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqZWN0LCBkaWZmZXJlbnRPYmplY3QxKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqZWN0LCBkaWZmZXJlbnRPYmplY3QyKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RvU3RyaW5nJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHR1cm4gbnVtYmVycyBpbnRvIHN0cmluZ3MnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcoNSkpLnRvLmVxdWFsKCc1Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcoMi41KSkudG8uZXF1YWwoJzIuNScpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgdHVybiBib29sZWFucyBpbnRvIHN0cmluZ3MnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcoZmFsc2UpKS50by5lcXVhbCgnZmFsc2UnKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS50b1N0cmluZyh0cnVlKSkudG8uZXF1YWwoJ3RydWUnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHR1cm4gdW5kZWZpbmVkIGFuZCBudWxsIGludG8gc3RyaW5ncycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS50b1N0cmluZyh1bmRlZmluZWQpKS50by5lcXVhbCgndW5kZWZpbmVkJyk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcobnVsbCkpLnRvLmVxdWFsKCdudWxsJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3ZhbHVlT3JEZWZhdWx0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0aGUgdmFsdWUgaWYgaXQgaXMgZGVmaW5lZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc29tZU9iamVjdDogYW55ID0geyBleGlzdGluZ1Byb3BlcnR5OiAndmFsdWUnIH07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQoc29tZU9iamVjdC5leGlzdGluZ1Byb3BlcnR5LCAnZGVmYXVsdCcpKS50by5lcXVhbCgndmFsdWUnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbm90IGRlZmluZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHNvbWVPYmplY3Q6IGFueSA9IHsgbnVsbFByb3BlcnR5OiBudWxsIH07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQoc29tZU9iamVjdC5udWxsUHJvcGVydHksICdkZWZhdWx0JykpLnRvLmVxdWFsKCdkZWZhdWx0Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQoc29tZU9iamVjdC5taXNzaW5nUHJvcGVydHksICdkZWZhdWx0JykpLnRvLmVxdWFsKCdkZWZhdWx0Jyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdudW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ251bWJlclV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgbnVtYmVyVXRpbGl0eTogSU51bWJlclV0aWxpdHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRudW1iZXJVdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3ByZWNpc2VSb3VuZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByb3VuZCA2IHRvIDYnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDYsIDIpO1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCg2KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuMjc1IHRvIDEuMjgnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuMjc1LCAyKTtcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS4yOCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjI3NCB0byAxLjI3JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjI3NCwgMik7XHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuMjcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcm91bmQgMS41NTU1NTU1NTU1NTU1NTU1NTU1NSB0byAxLjU1NTU1NTU1NTU1NTU1NTU1NTYnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0Ly8gMjAgNSdzLiBUaGlzIGlzIHRoZSBtYXggcHJlY2lzaW9uIHByZWNpc2Vfcm91bmQgaXMgdmFsaWQgZm9yXHJcblx0XHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuNTU1NTU1NTU1NTU1NTU1NTU1NTUsIDE5KTtcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS41NTU1NTU1NTU1NTU1NTU1NTU2KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuOTk5OTk5OTk5OTk5OTk5OTk5OTk5IHRvIDInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuOTk5OTk5OTk5OTk5OTk5OTk5OTk5LCAyMCk7IC8vIDIxIDknc1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgyKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIG5vdCByb3VuZCAxLjExMTExMTExMTExMTExMTExMTExMScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS4xMTExMTExMTExMTExMTExMTExMTEsIDIwKTsgLy8gMjEgMSdzXHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuMTExMTExMTExMTExMTExMTExMTEpO1x0Ly8gdHJpbW1lZCAxIGZyb20gdGhlIGVuZFxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnb2JzZXJ2YWJsZScsICgpID0+IHtcclxuXHRcdHZhciBvYnNlcnZhYmxlOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmFjdG9yeU5hbWUpO1xyXG5cdFx0XHR2YXIgb2JzZXJ2YWJsZUZhY3Rvcnk6IElPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkgPSBzZXJ2aWNlc1tmYWN0b3J5TmFtZV07XHJcblx0XHRcdG9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZWdpc3RlciBhIHdhdGNoZXIgYW5kIGNhbGwgdGhlIGFjdGlvbiB3aGVuIGZpcmUgaXMgY2FsbGVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYyk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZnVuYyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHVucmVnaXN0ZXIgb25seSB0aGUgaW5kaWNhdGVkIHdhdGNoZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciByZWdpc3RlcmVkRnVuYzE6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblx0XHRcdHZhciB1bnJlZ2lzdGVyZWRGdW5jOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHR2YXIgcmVnaXN0ZXJlZEZ1bmMyOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihyZWdpc3RlcmVkRnVuYzEpO1xyXG5cdFx0XHR2YXIgY2FuY2VsOiAoKSA9PiB2b2lkID0gb2JzZXJ2YWJsZS5yZWdpc3Rlcih1bnJlZ2lzdGVyZWRGdW5jKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihyZWdpc3RlcmVkRnVuYzIpO1xyXG5cclxuXHRcdFx0Y2FuY2VsKCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLmZpcmUoKTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHJlZ2lzdGVyZWRGdW5jMSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5ub3RDYWxsZWQodW5yZWdpc3RlcmVkRnVuYyk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHJlZ2lzdGVyZWRGdW5jMik7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG9ubHkgY2FsbCB3YXRjaGVyIHJlZ2lzdGVyZWQgd2l0aCB0aGUgc3BlY2lmaWVkIGV2ZW50IGlmIGZpcmUgaXMgY2FsbGVkIHdpdGggYW4gZXZlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBmdW5jV2l0aEV2ZW50OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHR2YXIgZnVuY1dpdGhvdXRFdmVudDogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuY1dpdGhFdmVudCwgJ215RXZlbnQnKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5yZWdpc3RlcihmdW5jV2l0aG91dEV2ZW50KTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCdteUV2ZW50Jyk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZ1bmNXaXRob3V0RXZlbnQpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmdW5jV2l0aEV2ZW50KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgbm90IGNhbGwgd2F0Y2hlcnMgcmVnaXN0ZXJlZCB3aXRoIGEgZGlmZmVyZW50IGV2ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYywgJ215RXZlbnQnKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCdvdGhlckV2ZW50Jyk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZ1bmMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBjYWxsIHRoZSByZWdpc3RlcmVkIHdhdGNoZXJzIHdpdGggdGhlIGFkZGl0aW9uYWwgcGFyYW1zIHBhc3NlZCBpbnRvIHRoZSBmaXJlIGZ1bmN0aW9uJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuYywgJ215RXZlbnQnKTtcclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCdteUV2ZW50JywgMSwgMiwgMywgNCwgNSk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmdW5jKTtcclxuXHJcblx0XHRcdHZhciBhcmdzOiBudW1iZXJbXSA9IGZ1bmMuZmlyc3RDYWxsLmFyZ3M7XHJcblx0XHRcdGV4cGVjdChhcmdzWzBdKS50by5lcXVhbCgxKTtcclxuXHRcdFx0ZXhwZWN0KGFyZ3NbMV0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRleHBlY3QoYXJnc1syXSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdGV4cGVjdChhcmdzWzNdKS50by5lcXVhbCg0KTtcclxuXHRcdFx0ZXhwZWN0KGFyZ3NbNF0pLnRvLmVxdWFsKDUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gd2l0aCBhbiBlcnJvciBpZiBubyBmdW5jdGlvbiBpcyBwcm92aWRlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG9yaWdpbmFsTG9nOiAobWVzc2FnZT86IHN0cmluZykgPT4gdm9pZCA9IGNvbnNvbGUubG9nO1xyXG5cdFx0XHR2YXIgbG9nU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyA9IGxvZ1NweTtcclxuXHJcblx0XHRcdHZhciBjYW5jZWw6ICgpID0+IHZvaWQgPSBvYnNlcnZhYmxlLnJlZ2lzdGVyKG51bGwpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UobG9nU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgobG9nU3B5LCAnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2FuY2VsKS50by5iZS5udWxsO1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2cgPSBvcmlnaW5hbExvZztcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpZXdEYXRhPFRCZWhhdmlvcj4ge1xyXG5cdFx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNoaWxkPFRCZWhhdmlvcj4ge1xyXG5cdFx0dmlld0RhdGE/OiBJVmlld0RhdGE8VEJlaGF2aW9yPjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3I7XHJcblx0XHR0cmlnZ2VyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZDogSUNoaWxkPGFueT5cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGU7XHJcblx0XHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW107XHJcblx0XHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdO1xyXG5cdFx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0XHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdFx0cmV0dXJuIGNoaWxkICYmIGNoaWxkLnZpZXdEYXRhICE9IG51bGxcclxuXHRcdFx0XHQ/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcblx0XHRcdFx0OiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcjogVEJlaGF2aW9yID0gdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTtcclxuXHJcblx0XHRcdGlmIChiZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3JzOiBUQmVoYXZpb3JbXSA9IHRoaXMuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMoY2hpbGRMaXN0KTtcclxuXHJcblx0XHRcdHJldHVybiBfLm1hcChiZWhhdmlvcnMsIChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdIHtcclxuXHRcdFx0cmV0dXJuIF8oY2hpbGRMaXN0KS5tYXAoKGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciA9PiB7IHJldHVybiB0aGlzLmdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZCk7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQuZmlsdGVyKChiZWhhdmlvcjogVEJlaGF2aW9yKTogYm9vbGVhbiA9PiB7IHJldHVybiBiZWhhdmlvciAhPSBudWxsOyB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LnZhbHVlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZCB7XHJcblx0XHRcdGlmIChjaGlsZCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhID0geyBiZWhhdmlvcjogbnVsbCB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEJlaGF2aW9yOiBUQmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50QmVoYXZpb3IgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSA8VEJlaGF2aW9yPl8uZXh0ZW5kKGN1cnJlbnRCZWhhdmlvciwgYmVoYXZpb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3Ige1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RCZWhhdmlvciB7XHJcblx0XHRhY3Rpb246IEZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0ZGVzY3JpYmUoJ3BhcmVudENoaWxkQmVoYXZpb3InLCAoKSA9PiB7XHJcblx0XHR2YXIgcGFyZW50Q2hpbGRCZWhhdmlvcjogSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvciA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZWdpc3RlcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZWdpc3RlciBhIGNoaWxkIGJlaGF2aW9yIGJ5IHB1dHRpbmcgaXQgb24gdGhlIHZpZXcgZGF0YSBvZiB0aGUgY2hpbGQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGNoaWxkOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiBudWxsIH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cclxuXHRcdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoY2hpbGQudmlld0RhdGEuYmVoYXZpb3IpLnRvLmVxdWFsKGJlaGF2aW9yKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHVzZSB0aGUgZXhpc3Rpbmcgdmlld0RhdGEgb2JqZWN0IGlmIG9uZSBleGlzdHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGNoaWxkV2l0aFZpZXdEYXRhOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSA8YW55Pnsgdmlld0RhdGE6IHsgcmFuZG9tVmFsdWU6IDUgfSB9O1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDU7IH0gfTtcclxuXHJcblx0XHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5yZWdpc3RlckNoaWxkQmVoYXZpb3IoY2hpbGRXaXRoVmlld0RhdGEsIGJlaGF2aW9yKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGNoaWxkV2l0aFZpZXdEYXRhLnZpZXdEYXRhLmJlaGF2aW9yKS50by5lcXVhbChiZWhhdmlvcik7XHJcblx0XHRcdFx0ZXhwZWN0KCg8YW55PmNoaWxkV2l0aFZpZXdEYXRhLnZpZXdEYXRhKS5yYW5kb21WYWx1ZSkudG8uZXF1YWwoNSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBub3QgcmVnaXN0ZXIgY2hpbGQgYmVoYXZpb3IgaWYgY2hpbGQgb2JqZWN0IGlzIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0gbnVsbDtcclxuXHRcdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cdFx0XHRcdGV4cGVjdChwYXJlbnRDaGlsZEJlaGF2aW9yLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpKS50by5iZS5udWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdnZXRDaGlsZEJlaGF2aW9yJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGdldCB0aGUgYmVoYXZpb3Igb2YgYW4gaW5kaXZpZHVhbCBjaGlsZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IxOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KHBhcmVudENoaWxkQmVoYXZpb3IuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCkpLnRvLmVxdWFsKGJlaGF2aW9yMSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgZXhpc3RpbmcgYmVoYXZpb3JzIGZvciBhIGxpc3Qgb2YgY2hpbGRyZW4nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMTogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IyOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gNzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZExpc3Q6IElDaGlsZDxJVGVzdEJlaGF2aW9yPltdID0gW1xyXG5cdFx0XHRcdFx0eyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfSxcclxuXHRcdFx0XHRcdHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IG51bGwgfSB9LFxyXG5cdFx0XHRcdFx0eyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IyIH0gfSxcclxuXHRcdFx0XHRdO1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JzOiBJVGVzdEJlaGF2aW9yW10gPSBwYXJlbnRDaGlsZEJlaGF2aW9yLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvcnMubGVuZ3RoKS50by5lcXVhbCgyKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JzWzBdKS50by5lcXVhbChiZWhhdmlvcjEpO1xyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvcnNbMV0pLnRvLmVxdWFsKGJlaGF2aW9yMik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RyaWdnZXJDaGlsZEJlaGF2aW9yJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHRyaWdnZXIgdGhlIHNwZWNpZmllZCBjaGlsZCBhY3Rpb24gYW5kIHJldHVybiB0aGUgcmVzdWx0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjE6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAzOyB9IH07XHJcblx0XHRcdFx0dmFyIGNoaWxkOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjEgfSB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlciA9IHBhcmVudENoaWxkQmVoYXZpb3IudHJpZ2dlckNoaWxkQmVoYXZpb3IoY2hpbGQsXHJcblx0XHRcdFx0XHQoYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJlaGF2aW9yLmFjdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHQpLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgdGhlIGJlaGF2aW9yIGRvZXMgbm90IGV4aXN0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlciA9IHBhcmVudENoaWxkQmVoYXZpb3IudHJpZ2dlckNoaWxkQmVoYXZpb3IoY2hpbGQsXHJcblx0XHRcdFx0XHQoYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJlaGF2aW9yLmFjdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHQpLnRvLmJlLm51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCB0cmlnZ2VyIHRoZSBzcGVjaWZpZWQgY2hpbGQgYWN0aW9ucyBhbmQgcmV0dXJuIHRoZSByZXN1bHRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjE6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAxOyB9IH07XHJcblx0XHRcdFx0dmFyIGNoaWxkMTogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfTtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IyOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMjsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDI6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMiB9IH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMzogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGQzOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjMgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZFdpdGhvdXRCZWhhdmlvcjogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlcltdID0gcGFyZW50Q2hpbGRCZWhhdmlvci50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMoW2NoaWxkMSwgY2hpbGQyLCBjaGlsZDMsIGNoaWxkV2l0aG91dEJlaGF2aW9yXSxcclxuXHRcdFx0XHRcdChiZWhhdmlvcjogSVRlc3RCZWhhdmlvcik6IG51bWJlciA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYmVoYXZpb3IuYWN0aW9uKCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvclJlc3VsdCkudG8uaGF2ZS5sZW5ndGgoMyk7XHJcblx0XHRcdFx0ZXhwZWN0KGJlaGF2aW9yUmVzdWx0WzBdKS50by5lcXVhbCgxKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHRbMV0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvclJlc3VsdFsyXSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2Uge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwcm9taXNlVXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVByb21pc2VVdGlsaXR5IHtcclxuXHRcdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgUHJvbWlzZVV0aWxpdHkgaW1wbGVtZW50cyBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gXy5pc09iamVjdChwcm9taXNlKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS50aGVuKSAmJiBfLmlzRnVuY3Rpb24ocHJvbWlzZS5jYXRjaCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQcm9taXNlVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Byb21pc2Uuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdwcm9taXNlVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBwcm9taXNlVXRpbGl0eTogSVByb21pc2VVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0cHJvbWlzZVV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnaXNQcm9taXNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBvYmplY3QgaXMgYSBwcm9taXNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBwcm9taXNlOiBPYmplY3QgPSB7XHJcblx0XHRcdFx0XHR0aGVuOiBzaW5vbi5zcHkoKSxcclxuXHRcdFx0XHRcdGNhdGNoOiBzaW5vbi5zcHkoKSxcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRleHBlY3QocHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlKHByb21pc2UpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBvYmplY3QgaXMgbm90IGEgcHJvbWlzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc3RyOiBzdHJpbmcgPSAncHJvbWlzZSc7XHJcblx0XHRcdFx0dmFyIG9iajogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHRcdGV4cGVjdChwcm9taXNlVXRpbGl0eS5pc1Byb21pc2Uoc3RyKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KHByb21pc2VVdGlsaXR5LmlzUHJvbWlzZShvYmopKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0cmluZy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcge1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdzdHJpbmdVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIHN0cmluZ1V0aWxpdHk6IElTdHJpbmdVdGlsaXR5U2VydmljZTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHN0cmluZ1V0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgndG9OdW1iZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgY29udmVydCBhIHN0cmluZyB0byBhIG51bWJlcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS50b051bWJlcignNScpKS50by5lcXVhbCg1KTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS50b051bWJlcignMycpKS50by5lcXVhbCgzKTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS50b051bWJlcignMS4yNScpKS50by5lcXVhbCgxLjI1KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnY29udGFpbnMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIHN1YnN0cmluZyBpcyBjb250YWluZWQgd2l0aGluIHRoZSBzdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJ215IHN0cmluZycsICdteScpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCcxMjMnLCAnMScpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCcnLCBudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnbXkgc3RyaW5nJywgJycpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBzdWJzdHJpbmcgaXMgbm90IGNvbnRhaW5lZCB3aXRoaW4gdGhlIHN0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnbXkgc3RyaW5nJywgJ215IHZhbCcpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnMTIzJywgJzQnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJ215IHN0cmluZycsICdteSBzdHJpbmcgMScpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgncmVwbGFjZUFsbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXBsYWNlIGFsbCBvY2N1cmFuY2VzIG9mIHNvbWUgZ2l2ZW4gdGV4dCB3aXRoIGFub3RoZXIgaW5zaWRlIGEgc3RyaW5nJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnJlcGxhY2VBbGwoJ2hlbGxvIHdvcmxkJywgJ2ZvbycsICdiYXInKSkudG8uZXF1YWwoJ2hlbGxvIHdvcmxkJyk7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkucmVwbGFjZUFsbCgnZm9vSGVsbG9mb29Xb3JsZGZvbycsICdmb28nLCAnYmFyJykpLnRvLmVxdWFsKCdiYXJIZWxsb2JhcldvcmxkYmFyJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3N1YnN0aXR1dGUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgc3Vic3RpdHV0ZSBzdHJpbmdzIHdpdGggdGhlaXIgcG9zaXRpb25hbCBwbGFjZWhvbGRlciB2YWx1ZSBpbiBvdGhlciBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnN1YnN0aXR1dGUoJ2hlbGxvIHdvcmxkJywgJ2ZvbycpKS50by5lcXVhbCgnaGVsbG8gd29ybGQnKTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5zdWJzdGl0dXRlKCdoZWxsbyB7MH0gd29ybGQgezF9JywgJ2ZvbycsICdiYXInKSkudG8uZXF1YWwoJ2hlbGxvIGZvbyB3b3JsZCBiYXInKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFRpbWVVdGlsaXR5IHtcclxuXHRcdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0aW1lLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUge1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCd0aW1lVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciB0aW1lVXRpbGl0eTogSVRpbWVVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0dGltZVV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBleHBlY3RlZCBudW1iZXIgb2Ygc2Vjb25kcyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzKDQwMDApKS50by5lcXVhbCg0KTtcclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvU2Vjb25kcyg0NjAwKSkudG8uZXF1YWwoNCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBleHBlY3RlZCBudW1iZXIgb2YgbWludXRlcyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgc2Vjb25kczE6IG51bWJlciA9IDEyMDtcclxuXHRcdFx0dmFyIHNlY29uZHMyOiBudW1iZXIgPSA1OTtcclxuXHJcblx0XHRcdHNlY29uZHMxICo9IDEwMDA7XHJcblx0XHRcdHNlY29uZHMyICo9IDEwMDA7XHJcblxyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzKHNlY29uZHMxKSkudG8uZXF1YWwoMik7XHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMoc2Vjb25kczIpKS50by5lcXVhbCgwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGV4cGVjdGVkIG51bWJlciBvZiBob3VycyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgbWludXRlczE6IG51bWJlciA9IDU5O1xyXG5cdFx0XHR2YXIgbWludXRlczI6IG51bWJlciA9IDYwO1xyXG5cclxuXHRcdFx0bWludXRlczEgKj0gNjAgKiAxMDAwO1xyXG5cdFx0XHRtaW51dGVzMiAqPSA2MCAqIDEwMDA7XHJcblxyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyhtaW51dGVzMSkpLnRvLmVxdWFsKDApO1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyhtaW51dGVzMikpLnRvLmVxdWFsKDEpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZXhwZWN0ZWQgbnVtYmVyIG9mIGRheXMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGhvdXJzMTogbnVtYmVyID0gMjM7XHJcblx0XHRcdHZhciBob3VyczI6IG51bWJlciA9IDI0O1xyXG5cclxuXHRcdFx0aG91cnMxICo9IDYwICogNjAgKiAxMDAwO1xyXG5cdFx0XHRob3VyczIgKj0gNjAgKiA2MCAqIDEwMDA7XHJcblxyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzKGhvdXJzMSkpLnRvLmVxdWFsKDApO1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzKGhvdXJzMikpLnRvLmVxdWFsKDEpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL3Npbm9uXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4ge1xyXG5cdFx0cHJvbWlzZTogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRcdGRhdGE6IFREYXRhVHlwZTtcclxuXHRcdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChzZXJ2aWNlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKCk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBjYWxsYmFjay5hcHBseSh0aGlzLCBwYXJhbXMpLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIHNjb3BlPzogbmcuSVNjb3BlKTogdm9pZCB7XHJcblx0XHRcdC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuXHRcdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcblx0XHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3QgXHJcblx0XHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRcdF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCAocmVxdWVzdDogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4pOiB2b2lkID0+IHtcclxuXHRcdFx0XHRpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9jazogSU1vY2sgPSBuZXcgTW9jaygpO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuYmVoYXZpb3JzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0c3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0naXNFbXB0eS9pc0VtcHR5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cnVuY2F0ZS90cnVuY2F0ZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRpc0VtcHR5Lm1vZHVsZU5hbWUsXHJcblx0XHR0cnVuY2F0ZS5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcnJheS9hcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udGVudFByb3ZpZGVyL2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlL2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdudW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwcm9taXNlL3Byb21pc2Uuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGFycmF5Lm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZS5tb2R1bGVOYW1lLFxyXG5cdFx0YXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZSxcclxuXHRcdGJvb2xlYW4ubW9kdWxlTmFtZSxcclxuXHRcdGNvbnRlbnRQcm92aWRlci5tb2R1bGVOYW1lLFxyXG5cdFx0ZGF0ZS5tb2R1bGVOYW1lLFxyXG5cdFx0anF1ZXJ5Lm1vZHVsZU5hbWUsXHJcblx0XHRudW1iZXIubW9kdWxlTmFtZSxcclxuXHRcdG9iamVjdC5tb2R1bGVOYW1lLFxyXG5cdFx0b2JzZXJ2YWJsZS5tb2R1bGVOYW1lLFxyXG5cdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdFx0cHJvbWlzZS5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdiZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobmFtZSwgW1xyXG5cdFx0YmVoYXZpb3JzLm1vZHVsZU5hbWUsXHJcblx0XHRmaWx0ZXJzLm1vZHVsZU5hbWUsXHJcblx0XHRzZXJ2aWNlcy5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==