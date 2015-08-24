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
        (function (services_10) {
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
            })(number = services_10.number || (services_10.number = {}));
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
        (function (services_11) {
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
            })(object = services_11.object || (services_11.object = {}));
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
        (function (services_12) {
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
            })(jquery = services_12.jquery || (services_12.jquery = {}));
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
        (function (services_13) {
            var genericSearchFilter;
            (function (genericSearchFilter_1) {
                'use strict';
                describe('genericSearchFilter', function () {
                    var genericSearchFilter;
                    beforeEach(function () {
                        angular.mock.module(genericSearchFilter_1.moduleName);
                        var services = services_13.test.angularFixture.inject(genericSearchFilter_1.factoryName);
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
            })(genericSearchFilter = services_13.genericSearchFilter || (services_13.genericSearchFilter = {}));
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
        (function (services_15) {
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
            })(promise = services_15.promise || (services_15.promise = {}));
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
        (function (services_16) {
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
            })(parentChildBehavior = services_16.parentChildBehavior || (services_16.parentChildBehavior = {}));
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
        (function (services_17) {
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
            })(time = services_17.time || (services_17.time = {}));
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
        (function (services_18) {
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
            })(string = services_18.string || (services_18.string = {}));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50cyIsInNlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50ZXN0cy50cyIsImZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHMiLCJmaWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRlc3RzLnRzIiwiYmVoYXZpb3JzL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzIiwic2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMudHMiLCJzZXJ2aWNlcy9icmVha3BvaW50cy92aXNpYmxlQnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL2JyZWFrcG9pbnRzL2JyZWFrcG9pbnRzLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50cyIsImZpbHRlcnMvZmlsdGVyLnRzIiwic2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9wcm9taXNlL3Byb21pc2Uuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzIiwic2VydmljZXMvcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy90ZXN0L21vY2sudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsInNlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRlc3RzLnRzIiwiYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMiLCJmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIiwic2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbInJsIiwicmwudXRpbGl0aWVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdCIsInJsLnV0aWxpdGllcy5maWx0ZXJzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb250cm9sbGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZS50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbiIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24uc3RvcEV2ZW50UHJvcGFnYXRpb24ubGluayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zYXZpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbXBsZXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zdWNjZXNzZnVsIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS50cmlnZ2VyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLm51bGxGb3JtIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybS4kc2V0UHJpc3RpbmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5hdXRvc2F2ZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkudG9Cb29sIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLlZpc2libGVCcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5WaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlLmlzVmlzaWJsZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLnJlc2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5nZXRCcmVha3BvaW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLkJyZWFrcG9pbnRTZXJ2aWNlLmlzQnJlYWtwb2ludCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5idWlsZFNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuaXNMZWFwWWVhciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuU2lnbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LnJlcGxhY2VDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS50b051bWJlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29udGFpbnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnN1YnN0aXR1dGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnJlcGxhY2VBbGwiLCJybC51dGlsaXRpZXMuZmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hPYmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suc2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2sucHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2sucHJvbWlzZVdpdGhDYWxsYmFjayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suZmx1c2giLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0hvdXJzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzIl0sIm1hcHBpbmdzIjoiQUFBQSx5QkFBeUI7QUFDekIsc0JBQXNCO0FBRXRCLElBQU8sRUFBRSxDQTZFUjtBQTdFRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0E2RWxCQTtJQTdFU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsUUFBUUEsQ0E2RTNCQTtRQTdFbUJBLFdBQUFBLFFBQVFBO1lBQUNDLElBQUFBLEtBQUtBLENBNkVqQ0E7WUE3RTRCQSxXQUFBQSxPQUFLQSxFQUFDQSxDQUFDQTtnQkFDbkNDLFlBQVlBLENBQUNBO2dCQUVGQSxrQkFBVUEsR0FBV0EsNkJBQTZCQSxDQUFDQTtnQkFDbkRBLG1CQUFXQSxHQUFXQSxjQUFjQSxDQUFDQTtnQkFhaERBO29CQUFBQztvQkF3REFDLENBQUNBO29CQXZEQUQsa0NBQVdBLEdBQVhBLFVBQXVCQSxLQUFrQkEsRUFBRUEsU0FBeUNBO3dCQUNuRkUsSUFBSUEsV0FBbUJBLENBQUNBO3dCQUV4QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBQ0EsSUFBZUEsRUFBRUEsS0FBYUE7NEJBQzVDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDckJBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO2dDQUNwQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ2RBLENBQUNBO3dCQUNGQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFF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LENBQUNBLENBQUNBLENBQUNBOzRCQUNsQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQ2JBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDekNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO3dCQUNkQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDZEEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLFlBQVlBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsS0FBS0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ2pDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTs0QkFDZEEsQ0FBQ0E7NEJBRURBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dDQUM5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0NBQy9DQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtnQ0FDZEEsQ0FBQ0E7NEJBQ0ZBLENBQUNBO3dCQUNGQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsUUFB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QUNBO29CQUVIQSxRQUFRQSxDQUFDQSxRQUFRQSxFQUFFQTt3QkFDbEJBLEVBQUVBLENBQUNBLHFFQUFxRUEsRUFBRUE7NEJBQ3pFQSxJQUFJQSxLQUFLQSxHQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFFdENBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsREEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2pDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDckRBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSxtRUFBbUVBLEVBQUVBOzRCQUN2RUEsSUFBSUEsS0FBS0EsR0FBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBRXRDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxJQUFZQSxJQUFnQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2xHQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxF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ckRBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDekRBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdkRBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDeERBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTt5QkFDeERBLENBQUNBO29CQUNIQSxDQUFDQTtvQkFJT0QsZ0NBQVVBLEdBQWxCQSxVQUFtQkEsSUFBYUE7d0JBQy9CRSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxD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QUFDQSxVQUFVQSxDQUFDQSxDQUFDQTs0QkFDMURBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBOzRCQUN2REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3ZEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTs0QkFDckRBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBOzRCQUN0REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7NEJBQ3REQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTs0QkFDeERBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBOzRCQUMzREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3pEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTs0QkFDM0RBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3dCQUM1REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxRQUFRQSxDQUFDQSxTQUFTQSxFQUFFQTt3QkFDbkJBLEVBQUVBLENBQUNBLDRDQUE0Q0EsRUFBRUE7NEJBQ2hEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDN0NBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO3dCQUM5Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLCtCQUErQkEsRUFBRUE7NEJBQ25DQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDbERBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENB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Q0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2xEQSxDQUFDQTs0QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0NBQ1BBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO2dDQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0NBQ2hDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtvQ0FDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO29DQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ2xEQSxDQUFDQTtnQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0NBQ1BBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO2dDQUNuQkEsQ0FBQ0E7NEJBQ0ZBLENBQUNBO3dCQUNGQSxDQUFDQTt3QkFFREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JDQSxDQUFDQTtvQkFFREQsaUNBQU9BLEdBQVBBO3dCQUNDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDZkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsQ0FBQ0E7d0JBQ3hCQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3RCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxDQUFDQTt3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QSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTs0QkFDNURBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO3dCQUN2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLDZEQUE2REEsRUFBRUE7NEJBQ2pFQSxJQUFJQSxNQUFNQSxHQUFXQSxLQUFLQSxDQUFDQTs0QkFDM0JBLElBQUlBLEdBQUdBLEdBQVdBLENBQUNBLENBQUNBOzRCQUNwQkEsSUFBSUEsR0FBR0EsR0FBUUEsRUFBRUEsQ0FBQ0E7NEJBQ2xCQSxJQUFJQSxLQUFLQSxHQUFVQSxFQUFFQSxDQUFDQTs0QkFDdEJBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUN4REEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3hEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTs0QkFDMURBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUNyREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3ZEQSw0Q0FBNENBO3dCQUM3Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLGtFQUFrRUEsRUFBRUE7NEJBQ3RFQSxJQUFJQSxHQUFHQSxHQUFRQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUN2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLHNEQUFzREEsRUFBRUE7NEJBQzFEQSxJQUFJQSxNQUFNQSxHQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkNBLElBQUlBLE1BQU1BLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUNqQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQzVEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsOERBQThEQSxFQUFFQTs0QkFDbEVBLElBQUlBLEtBQUtBLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUN0Q0EsSUFBSUEsWUFBWUEsR0FBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEs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LENBQUNBLENBQUNBLENBQUNBO29CQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsUUFBUUEsQ0FBQ0EsVUFBVUEsRUFBRUE7d0JBQ3BCQSxFQUFFQSxDQUFDQSxrQ0FBa0NBLEVBQUVBOzRCQUN0Q0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2hEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTt3QkFDckRBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSxtQ0FBbUNBLEVBQUVBOzRCQUN2Q0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3hEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTt3QkFDdkRBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSw2Q0FBNkNBLEVBQUVBOzRCQUNqREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2hFQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTt3QkFDdkRBLENBQUNB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QSxFQUFFQSxDQUFDQSxvRUFBb0VBLEVBQUVBOzRCQUN4RUEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7NEJBQzdEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTs0QkFDdERBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEVBQUVBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBOzRCQUNwREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQzVEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EseUVBQXlFQSxFQUFFQTs0QkFDN0VBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUNsRUEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3ZEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxXQUFXQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTt3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Q0FBQ0EsRUFqQm1CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBaUIzQkE7SUFBREEsQ0FBQ0EsRUFqQlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBaUJsQkE7QUFBREEsQ0FBQ0EsRUFqQk0sRUFBRSxLQUFGLEVBQUUsUUFpQlI7QUNoQ0QsaUJBQWlCO0FBRWpCLHNEQUFzRDtBQUN0RCxrREFBa0Q7QUFDbEQsb0RBQW9EO0FBRXBELElBQU8sRUFBRSxDQVFSO0FBUkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBUWxCQTtJQVJTQSxXQUFBQSxTQUFTQSxFQUFDQSxDQUFDQTtRQUNUQyxvQkFBVUEsR0FBV0EsY0FBY0EsQ0FBQ0E7UUFFL0NBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBO1lBQ3BCQSxtQkFBU0EsQ0FBQ0EsVUFBVUE7WUFDcEJBLGlCQUFPQSxDQUFDQSxVQUFVQTtZQUNsQkEsa0JBQVFBLENBQUNBLFVBQVVBO1NBQ25CQSxDQUFDQSxDQUFDQTtJQUNKQSxDQUFDQSxFQVJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQVFsQkE7QUFBREEsQ0FBQ0EsRUFSTSxFQUFFLEtBQUYsRUFBRSxRQVFSIiwiZmlsZSI6InV0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXJyYXlVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXJyYXlVdGlsaXR5IHtcclxuXHRcdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGU7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSk6IFREYXRhVHlwZTtcclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtOiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlcjtcclxuXHRcdHN1bShhcnJheTogbnVtYmVyW10pOiBudW1iZXI7XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZ30pOiBURGF0YVR5cGVbXTtcclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyfSk6IFREYXRhVHlwZVtdO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgdGFyZ2V0SW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuXHRcdFx0XHRcdHRhcmdldEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSB8IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcblx0XHRcdFx0aW5kZXggPSB0aGlzLmZpbmRJbmRleE9mKGFycmF5LCA8eyhvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW59Pml0ZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCA8VERhdGFUeXBlPml0ZW0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXIgPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciBsaXN0OiBudW1iZXJbXTtcclxuXHJcblx0XHRcdGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxpc3QgPSA8YW55W10+YXJyYXk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShsaXN0LCAoc3VtOiBudW1iZXIsIG51bTogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIHwgbnVtYmVyIH0pOiBURGF0YVR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShhcnJheSwgKGRpY3Rpb25hcnk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGVbXSA9PiB7XHJcblx0XHRcdFx0ZGljdGlvbmFyeVs8YW55PmtleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHRcdH0sIFtdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9hcnJheS9hcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ29iamVjdFV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0XHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZztcclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgT2JqZWN0VXRpbGl0eSBpbXBsZW1lbnRzIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdCBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXkuc2VydmljZU5hbWVdO1xyXG5cdFx0IGNvbnN0cnVjdG9yKHByaXZhdGUgYXJyYXk6IGFycmF5LklBcnJheVV0aWxpdHkpIHtcclxuXHRcdCB9XHJcblxyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAob2JqZWN0ID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzQXJyYXkob2JqZWN0KSkge1xyXG5cdFx0XHRcdHJldHVybiBfLmFueShvYmplY3QpID09PSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5pc05hTihvYmplY3QpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBvYmplY3QgPT09ICcnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzU3RyaW5nKG9iamVjdCkpIHtcclxuXHRcdFx0XHRvYmplY3QgPSAoPHN0cmluZz5vYmplY3QpLnRyaW0oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNOdWxsT3JFbXB0eShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciB0eXBlMTogc3RyaW5nID0gdHlwZW9mIG9iajE7XHJcblx0XHRcdHZhciB0eXBlMjogc3RyaW5nID0gdHlwZW9mIG9iajI7XHJcblxyXG5cdFx0XHRpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlMSAhPT0gdHlwZTIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdC8vaW5pdCBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyBmcm9tIG9iajJcclxuXHRcdFx0XHR2YXIga2V5czI6IHN0cmluZ1tdID0gXy5rZXlzKG9iajIpO1xyXG5cdFx0XHRcdF8uZm9ySW4ob2JqMSwgKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAoXy5oYXMob2JqMiwga2V5KSkge1xyXG5cdFx0XHRcdFx0XHQvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcblx0XHRcdFx0aWYgKF8uYW55KGtleXMyKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0XHRyZXR1cm4gb2JqMSA9PT0gb2JqMjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG5cdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXkubW9kdWxlTmFtZV0pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgT2JqZWN0VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJNb2Nrc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0XHRkaXJlY3RpdmU6IChkb206IHN0cmluZykgPT4gSURpcmVjdGl2ZVJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogYW5ndWxhci5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29udHJvbGxlcjogYW55ID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0XHRpZiAobG9jYWxzID09IG51bGwpIHtcclxuXHRcdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogPFRDb250cm9sbGVyVHlwZT4kY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXJlY3RpdmUoZG9tOiBzdHJpbmcpOiBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbXBpbGU6IGFueSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcblxyXG5cdFx0XHR2YXIgY29tcG9uZW50OiBhbnkgPSAkY29tcGlsZShkb20pKCRyb290U2NvcGUpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0XHRzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpc0VtcHR5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnaXNFbXB0eScsICgpID0+IHtcclxuXHRcdHZhciBpc0VtcHR5OiBJSXNFbXB0eUZpbHRlcjtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChmaWx0ZXJOYW1lKTtcclxuXHRcdFx0aXNFbXB0eSA9IHNlcnZpY2VzW2ZpbHRlck5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgbnVsbCBvciBlbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkobnVsbCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KFtdKSkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBhcnJheSBoYXMgaXRlbXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KFsxLCAyLCAzXSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoaXNFbXB0eShbJzEnLCAnMicsICczJ10pKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgaW52ZXJ0IHRoZSByZXN1bHQgaWYgdHJ1ZUlmRW1wdHkgaXMgc3BlY2lmaWVkIGFzIGZhbHNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QoaXNFbXB0eShudWxsLCBmYWxzZSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoaXNFbXB0eShbMSwgMiwgM10sIGZhbHNlKSkudG8uYmUudHJ1ZTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0cnVuY2F0ZSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQoaW5wdXQ/OiBzdHJpbmcsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0XHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHR0cnVuY2F0ZS4kaW5qZWN0ID0gW19fb2JqZWN0LnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBfX29iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGlucHV0PzogYW55LCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuXHRcdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHRcdHZhciBvdXQ6IHN0cmluZyA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuXHRcdFx0aWYgKG91dC5sZW5ndGgpIHtcclxuXHRcdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0XHRvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG5cdFx0XHRcdFx0aWYgKGluY2x1ZGVFbGxpcHNlcykge1xyXG5cdFx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBvdXQ7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fb2JqZWN0Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgdHJ1bmNhdGUpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHJ1bmNhdGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgndHJ1bmNhdGUnLCAoKSA9PiB7XHJcblx0XHR2YXIgdHJ1bmNhdGU6IElUcnVuY2F0ZUZpbHRlcjtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChmaWx0ZXJOYW1lKTtcclxuXHRcdFx0dHJ1bmNhdGUgPSBzZXJ2aWNlc1tmaWx0ZXJOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyB3aGVuIG5vIHN0cmluZyBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgpKS50by5lcXVhbCgnJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgd2hlbiBhbiBlbXB0eSBzdHJpbmcgaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJycpKS50by5lcXVhbCgnJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBhIHN0cmluZyB3aGVuIGEgbnVtYmVyIGlzIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKDM0LjUpKS50by5lcXVhbCgnMzQuNScpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBub3QgdHJ1bmNhdGUgYSBzdHJpbmcgd2hlbiBubyBwYXJhbWV0ZXJzIGFyZSBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnKSkudG8uZXF1YWwoJ1Rlc3Qgc3RyaW5nJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgd2hlbiB0cnVuY2F0ZVRvIGlzIDAnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCAwKSkudG8uZXF1YWwoJycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCB0cnVuY2F0ZSBidXQgbm90IGVsbGlwc2ltb2dyaWZ5IGEgc3RyaW5nIHdoZW4gb25seSB0cnVuY2F0ZVRvIGlzIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDYpKS50by5lcXVhbCgnVGVzdCBzJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG5vdCB0cnVuY2F0ZSBhIHN0cmluZyB3aGVuIHRydW5jYXRlVG8gaXMgZ3JlYXRlciB0aGFuIHRoZSBzdHJpbmcgbGVuZ3RoJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgMjUpKS50by5lcXVhbCgnVGVzdCBzdHJpbmcnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgdHJ1bmNhdGUgYnV0IG5vdCBlbGxpcHNpbW9ncmlmeSBhIHN0cmluZyB3aGVuIGJvdGggdHJ1bmNhdGVUbyBhbmQgaW5jbHVkZUVsbGlwc2VzIGFyZSBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCA2LCBmYWxzZSkpLnRvLmVxdWFsKCdUZXN0IHMnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgdHJ1bmNhdGUgYW5kIGVsbGlwc2ltb2dyaWZ5IGEgc3RyaW5nIHdoZW4gYm90aCB0cnVuY2F0ZVRvIGFuZCBpbmNsdWRlRWxsaXBzZXMgYXJlIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDYsIHRydWUpKS50by5lcXVhbCgnVGVzdCBzLi4uJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcblx0ZXhwb3J0IHZhciBkaXJlY3RpdmVOYW1lOiBzdHJpbmcgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMgZXh0ZW5kcyBuZy5JQXR0cmlidXRlcyB7XHJcblx0XHRybFN0b3BFdmVudFByb3BhZ2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpOiBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZVxyXG5cdFx0XHRcdCwgZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeVxyXG5cdFx0XHRcdCwgYXR0cnM6IElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzKTogdm9pZCB7XHJcblx0XHRcdFx0ZWxlbWVudC5vbihhdHRycy5ybFN0b3BFdmVudFByb3BhZ2F0aW9uLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXJyYXkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RPYmoge1xyXG5cdFx0cHJvcDogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElLZXlPYmoge1xyXG5cdFx0a2V5OiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRkZXNjcmliZSgnYXJyYXlVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGFycmF5VXRpbGl0eTogSUFycmF5VXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdGFycmF5VXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdmaW5kSW5kZXhPZicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBmaW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBpbiBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHByZWRpY2F0ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mPG51bWJlcj4oYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtICUgMikgPT09IDA7IH0pKS50by5lcXVhbCgxKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mPG51bWJlcj4oYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtID4gMTApOyB9KSkudG8uZXF1YWwoLTEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZW1vdmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBzcGVjaWZpZWQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgcmV0dXJuIHRoZSBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAzKSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5Lmxlbmd0aCkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5yZW1vdmUoYXJyYXksIDEwKSkudG8ubm90LmV4aXN0O1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBmaXJzdCBpdGVtIG1hdGNoaW5nIHRoZSBwcmVkaWNhdGUgYW5kIHJldHVybiBpdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnJlbW92ZShhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gPiAzKTsgfSkpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheS5sZW5ndGgpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAoaXRlbTogbnVtYmVyKTogYm9vbGVhbiA9PiB7IHJldHVybiAoaXRlbSA+IDEwKTsgfSkpLnRvLm5vdC5leGlzdDtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgncmVwbGFjZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXBsYWNlIGFuIGl0ZW0gaW4gdGhlIGFycmF5IHdpdGggYW5vdGhlciBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheVdpdGhJdGVtczogbnVtYmVyW10gPSBbMywgNSwgN107XHJcblx0XHRcdFx0YXJyYXlVdGlsaXR5LnJlcGxhY2UoYXJyYXlXaXRoSXRlbXMsIDUsIDEwKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzBdKS50by5lcXVhbCgzKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMV0pLnRvLmVxdWFsKDEwKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMl0pLnRvLmVxdWFsKDcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgZG8gbm90aGluZyBpZiB0aGUgaXRlbSB0byByZXBsYWNlIGlzIG5vdCBmb3VuZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXlXaXRoSXRlbXM6IG51bWJlcltdID0gWzQsIDYsIDhdO1xyXG5cdFx0XHRcdGFycmF5VXRpbGl0eS5yZXBsYWNlKGFycmF5V2l0aEl0ZW1zLCA1LCAxMCk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1swXSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzFdKS50by5lcXVhbCg2KTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMl0pLnRvLmVxdWFsKDgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdzdW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgc3VtIHRoZSB2YWx1ZXMgaW4gYW4gYXJyYXknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMTUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgYXBwbHkgYSB0cmFuc2Zvcm0gdG8gdGhlIHZhbHVlcyBiZWZvcmUgc3VtbWluZyB0aGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IElUZXN0T2JqW10gPSBbeyBwcm9wOiAxIH0sIHsgcHJvcDogNCB9LCB7IHByb3A6IDcgfV07XHJcblx0XHRcdFx0dmFyIHRyYW5zZm9ybTogeyAoaXRlbTogSVRlc3RPYmopOiBudW1iZXIgfSA9IChpdGVtOiBJVGVzdE9iaik6IG51bWJlciA9PiB7IHJldHVybiBpdGVtLnByb3A7IH07XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzLCB0cmFuc2Zvcm0pKS50by5lcXVhbCgxMik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gMCBpZiB0aGVyZSBhcmUgbm8gaXRlbXMgdG8gc3VtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IG51bWJlcltdID0gW107XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RvRGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBjb252ZXJ0IGFuIGFycmF5IHRvIGEgZGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IElLZXlPYmpbXSA9IFtcclxuXHRcdFx0XHRcdHsga2V5OiAxMSB9LFxyXG5cdFx0XHRcdFx0eyBrZXk6IDEyIH0sXHJcblx0XHRcdFx0XHR7IGtleTogMTMgfSxcclxuXHRcdFx0XHRcdHsga2V5OiAxNCB9LFxyXG5cdFx0XHRcdFx0eyBrZXk6IDE1IH0sXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0dmFyIGRpY3Rpb25hcnk6IElLZXlPYmpbXSA9IGFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkoYXJyYXksIChpdGVtOiBJS2V5T2JqKTogbnVtYmVyID0+IHsgcmV0dXJuIGl0ZW0ua2V5OyB9KTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTFdKS50by5lcXVhbChhcnJheVswXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTJdKS50by5lcXVhbChhcnJheVsxXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTNdKS50by5lcXVhbChhcnJheVsyXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTRdKS50by5lcXVhbChhcnJheVszXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTVdKS50by5lcXVhbChhcnJheVs0XSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXV0b3NhdmVBY3Rpb24nO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogdm9pZDtcclxuXHRcdHNhdmluZzogYm9vbGVhbjtcclxuXHRcdGNvbXBsZXRlOiBib29sZWFuO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlQWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckdGltZW91dCddO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdHByaXZhdGUgY29tcGxldGVNZXNzYWdlRHVyYXRpb246IG51bWJlciA9IDEwMDA7XHJcblxyXG5cdFx0cHJpdmF0ZSBfc2F2aW5nOiBib29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBfY29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9zdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cclxuXHRcdGdldCBzYXZpbmcoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zYXZpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IGNvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29tcGxldGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IHN1Y2Nlc3NmdWwoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zdWNjZXNzZnVsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXIocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGFueSB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IHRydWU7XHJcblx0XHRcdHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5hdXRvc2F2ZVN1Y2Nlc3NmdWwpXHJcblx0XHRcdFx0XHRcdC5jYXRjaCh0aGlzLmF1dG9zYXZlRmFpbGVkKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGF1dG9zYXZlU3VjY2Vzc2Z1bDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVGYWlsZWQ6IHsgKGRhdGE6IGFueSk6IGFueSB9ID0gKGRhdGE6IGFueSk6IGFueSA9PiB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSByZXNvbHZlQXV0b3NhdmU6IHsgKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSB9ID0gKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSA9PiB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9jb21wbGV0ZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuX3N1Y2Nlc3NmdWwgPSBzdWNjZXNzO1xyXG5cclxuXHRcdFx0dGhpcy4kdGltZW91dCgoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy5fY29tcGxldGUgPSBmYWxzZTtcclxuXHRcdFx0fSwgdGhpcy5jb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbik7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEF1dG9zYXZlQWN0aW9uU2VydmljZSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX2F1dG9zYXZlQWN0aW9uID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0YXV0b3NhdmUoLi4uZGF0YTogYW55W10pOiBib29sZWFuO1xyXG5cdFx0Y29udGVudEZvcm06IG5nLklGb3JtQ29udHJvbGxlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSBoYXNWYWxpZGF0b3I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBhdXRvc2F2ZVNlcnZpY2U6IF9fYXV0b3NhdmVBY3Rpb24uSUF1dG9zYXZlQWN0aW9uU2VydmljZVxyXG5cdFx0XHRcdCwgcHJpdmF0ZSBzYXZlOiB7KC4uLmRhdGE6IGFueVtdKTogbmcuSVByb21pc2U8dm9pZD59XHJcblx0XHRcdFx0LCBwdWJsaWMgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXJcclxuXHRcdFx0XHQsIHByaXZhdGUgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KSB7XHJcblx0XHRcdHRoaXMuaGFzVmFsaWRhdG9yID0gdmFsaWRhdGUgIT0gbnVsbDtcclxuXHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtID09IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRGb3JtID0gdGhpcy5udWxsRm9ybSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YXV0b3NhdmU6IHsgKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiB9ID0gKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtLiRwcmlzdGluZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cdFx0XHRpZiAodGhpcy5oYXNWYWxpZGF0b3IpIHtcclxuXHRcdFx0XHR2YWxpZCA9IHRoaXMudmFsaWRhdGUoKTtcclxuXHRcdFx0XHRpZiAodmFsaWQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHZhbGlkKSB7XHJcblx0XHRcdFx0dGhpcy5hdXRvc2F2ZVNlcnZpY2UudHJpZ2dlcih0aGlzLnNhdmUoLi4uZGF0YSkudGhlbigoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY29udGVudEZvcm0uJHNldFByaXN0aW5lKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgbnVsbEZvcm0oKTogbmcuSUZvcm1Db250cm9sbGVyIHtcclxuXHRcdFx0cmV0dXJuIDxhbnk+e1xyXG5cdFx0XHRcdCRwcmlzdGluZTogZmFsc2UsXHJcblx0XHRcdFx0JHNldFByaXN0aW5lKCk6IHZvaWQge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKHNhdmU6IHsoKTogbmcuSVByb21pc2U8dm9pZD59LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KTogSUF1dG9zYXZlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGF1dG9zYXZlU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtfX2F1dG9zYXZlQWN0aW9uLnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTogSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeyAoKTogbmcuSVByb21pc2U8dm9pZD4gfSwgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXIsIHZhbGlkYXRlPzogeyAoKTogYm9vbGVhbiB9KTogSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBBdXRvc2F2ZVNlcnZpY2UoYXV0b3NhdmVTZXJ2aWNlLCBzYXZlLCBjb250ZW50Rm9ybSwgdmFsaWRhdGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fYXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGludGVyZmFjZSBJQXV0b3NhdmVBY3Rpb25Nb2NrIHtcclxuXHRcdHRyaWdnZXIocHJvbWlzZTogbmcuSVByb21pc2U8dm9pZD4pOiBuZy5JUHJvbWlzZTx2b2lkPjtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTW9ja0Zvcm1Db250cm9sbGVyIHtcclxuXHRcdCRwcmlzdGluZTogYm9vbGVhbjtcclxuXHRcdCRzZXRQcmlzdGluZTogU2lub24uU2lub25TcHk7XHJcblx0fVxyXG5cclxuXHRkZXNjcmliZSgnYXV0b3NhdmUnLCAoKSA9PiB7XHJcblx0XHR2YXIgYXV0b3NhdmU6IElBdXRvc2F2ZVNlcnZpY2U7XHJcblx0XHR2YXIgYXV0b3NhdmVGYWN0b3J5OiBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeTtcclxuXHRcdHZhciBzYXZlU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciB0cmlnZ2VyU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciBzZXRQcmlzdGluZVNweTogU2lub24uU2lub25TcHk7XHJcblx0XHR2YXIgYmFzZUNvbnRlbnRGb3JtOiBJTW9ja0Zvcm1Db250cm9sbGVyO1xyXG5cdFx0dmFyICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dHJpZ2dlclNweSA9IHNpbm9uLnNweSgocHJvbWlzZTogbmcuSVByb21pc2U8dm9pZD4pOiBuZy5JUHJvbWlzZTx2b2lkPiA9PiB7IHJldHVybiBwcm9taXNlOyB9KTtcclxuXHRcdFx0dmFyIGF1dG9zYXZlQWN0aW9uU2VydmljZTogSUF1dG9zYXZlQWN0aW9uTW9jayA9IHsgdHJpZ2dlcjogdHJpZ2dlclNweSB9O1xyXG5cclxuXHRcdFx0X190ZXN0LmFuZ3VsYXJGaXh0dXJlLm1vY2soe1xyXG5cdFx0XHRcdGF1dG9zYXZlQWN0aW9uOiBhdXRvc2F2ZUFjdGlvblNlcnZpY2UsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2V0UHJpc3RpbmVTcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdGJhc2VDb250ZW50Rm9ybSA9IHtcclxuXHRcdFx0XHQkcHJpc3RpbmU6IGZhbHNlLFxyXG5cdFx0XHRcdCRzZXRQcmlzdGluZTogc2V0UHJpc3RpbmVTcHksXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmFjdG9yeU5hbWUsICckcScsICckcm9vdFNjb3BlJyk7XHJcblx0XHRcdGF1dG9zYXZlRmFjdG9yeSA9IHNlcnZpY2VzW2ZhY3RvcnlOYW1lXTtcclxuXHRcdFx0dmFyICRxOiBuZy5JUVNlcnZpY2UgPSBzZXJ2aWNlcy4kcTtcclxuXHRcdFx0JHJvb3RTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblxyXG5cdFx0XHRzYXZlU3B5ID0gc2lub24uc3B5KCgpOiBuZy5JUHJvbWlzZTx2b2lkPiA9PiB7IHJldHVybiAkcS53aGVuKCk7IH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBjYWxsIHNhdmUgb24gdGhlIHBhcmVudCBhbmQgc2V0IHRoZSBmb3JtIHRvIHByaXN0aW5lJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRhdXRvc2F2ZSA9IGF1dG9zYXZlRmFjdG9yeS5nZXRJbnN0YW5jZShzYXZlU3B5LCA8YW55PmJhc2VDb250ZW50Rm9ybSk7XHJcblxyXG5cdFx0XHR2YXIgY2xvc2U6IGJvb2xlYW4gPSBhdXRvc2F2ZS5hdXRvc2F2ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNsb3NlKS50by5iZS50cnVlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uoc2F2ZVNweSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHNldFByaXN0aW5lU3B5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgbm90IHNhdmUgaWYgdGhlIGZvcm0gaXMgcHJpc3RpbmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGF1dG9zYXZlID0gYXV0b3NhdmVGYWN0b3J5LmdldEluc3RhbmNlKHNhdmVTcHksIDxhbnk+YmFzZUNvbnRlbnRGb3JtKTtcclxuXHJcblx0XHRcdGJhc2VDb250ZW50Rm9ybS4kcHJpc3RpbmUgPSB0cnVlO1xyXG5cclxuXHRcdFx0dmFyIGNsb3NlOiBib29sZWFuID0gYXV0b3NhdmUuYXV0b3NhdmUoKTtcclxuXHJcblx0XHRcdGV4cGVjdChjbG9zZSkudG8uYmUudHJ1ZTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoc2F2ZVNweSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHZhbGlkYXRlIHVzaW5nIHRoZSB2YWxpZGF0b3IgaWYgb25lIGV4aXN0cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHZhbGlkYXRlU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgoKTogYm9vbGVhbiA9PiB7IHJldHVybiB0cnVlOyB9KTtcclxuXHJcblx0XHRcdGF1dG9zYXZlID0gYXV0b3NhdmVGYWN0b3J5LmdldEluc3RhbmNlKHNhdmVTcHksIDxhbnk+YmFzZUNvbnRlbnRGb3JtLCB2YWxpZGF0ZVNweSk7XHJcblxyXG5cdFx0XHR2YXIgY2xvc2U6IGJvb2xlYW4gPSBhdXRvc2F2ZS5hdXRvc2F2ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNsb3NlKS50by5iZS50cnVlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodmFsaWRhdGVTcHkpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzYXZlU3B5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdpdGhvdXQgc2F2aW5nIGlmIHZhbGlkYXRpb24gZmFpbHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciB2YWxpZGF0ZVNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKCk6IGJvb2xlYW4gPT4geyByZXR1cm4gZmFsc2U7IH0pO1xyXG5cclxuXHRcdFx0YXV0b3NhdmUgPSBhdXRvc2F2ZUZhY3RvcnkuZ2V0SW5zdGFuY2Uoc2F2ZVNweSwgPGFueT5iYXNlQ29udGVudEZvcm0sIHZhbGlkYXRlU3B5KTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLmZhbHNlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodmFsaWRhdGVTcHkpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHNhdmVTcHkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBhbHdheXMgc2F2ZSBpZiBubyBmb3JtIGlzIHNwZWNpZmllZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0YXV0b3NhdmUgPSBhdXRvc2F2ZUZhY3RvcnkuZ2V0SW5zdGFuY2Uoc2F2ZVNweSk7XHJcblxyXG5cdFx0XHR2YXIgY2xvc2U6IGJvb2xlYW4gPSBhdXRvc2F2ZS5hdXRvc2F2ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNsb3NlKS50by5iZS50cnVlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uoc2F2ZVNweSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2F1dG9zYXZlQWN0aW9uJywgKCkgPT4ge1xyXG5cdFx0dmFyIGF1dG9zYXZlQWN0aW9uOiBJQXV0b3NhdmVBY3Rpb25TZXJ2aWNlO1xyXG5cdFx0dmFyICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2U7XHJcblx0XHR2YXIgJHE6IG5nLklRU2VydmljZTtcclxuXHRcdHZhciAkcm9vdFNjb3BlOiBuZy5JU2NvcGU7XHJcblx0XHR2YXIgZGVmZXJyZWQ6IG5nLklEZWZlcnJlZDx2b2lkPjtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSwgJyR0aW1lb3V0JywgJyRxJywgJyRyb290U2NvcGUnKTtcclxuXHRcdFx0YXV0b3NhdmVBY3Rpb24gPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHRcdCR0aW1lb3V0ID0gc2VydmljZXMuJHRpbWVvdXQ7XHJcblx0XHRcdCRxID0gc2VydmljZXMuJHE7XHJcblx0XHRcdCRyb290U2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cclxuXHRcdFx0ZGVmZXJyZWQgPSAkcS5kZWZlcjx2b2lkPigpO1xyXG5cclxuXHRcdFx0YXV0b3NhdmVBY3Rpb24udHJpZ2dlcihkZWZlcnJlZC5wcm9taXNlKTtcclxuXHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5zYXZpbmcpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHNldCBzdWNjZXNzZnVsIHRvIHRydWUgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlKCk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLnNhdmluZykudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5jb21wbGV0ZSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLnN1Y2Nlc3NmdWwpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHNldCBzdWNjZXNzZnVsIHRvIGZhbHNlIGlmIHRoZSBwcm9taXNlIGZhaWxzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uc2F2aW5nKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLmNvbXBsZXRlKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uc3VjY2Vzc2Z1bCkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHNldCBjb21wbGV0ZSB0byBmYWxzZSBhZnRlciAxIHNlY29uZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5jb21wbGV0ZSkudG8uYmUudHJ1ZTtcclxuXHJcblx0XHRcdCR0aW1lb3V0LmZsdXNoKDEwMDApO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLmNvbXBsZXRlKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4nO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdib29sZWFuVXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHRcdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBCb29sZWFuVXRpbGl0eSBpbXBsZW1lbnRzIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuICEhb2JqZWN0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQm9vbGVhblV0aWxpdHkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYm9vbGVhbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2Jvb2xlYW5VdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGJvb2xlYW5VdGlsaXR5OiBJQm9vbGVhblV0aWxpdHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRib29sZWFuVXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd0b0Jvb2wnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgY29udmVydCBudWxsIGFuZCB1bmRlZmluZWQgdG8gZmFsc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KGJvb2xlYW5VdGlsaXR5LnRvQm9vbChudWxsKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KGJvb2xlYW5VdGlsaXR5LnRvQm9vbCh1bmRlZmluZWQpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIGxlYXZlIGJvb2wgdmFsdWVzIHVuY2hhbmdlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3QoYm9vbGVhblV0aWxpdHkudG9Cb29sKGZhbHNlKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KGJvb2xlYW5VdGlsaXR5LnRvQm9vbCh0cnVlKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbGc6IHN0cmluZyA9ICdsZyc7XHJcblx0ZXhwb3J0IHZhciBtZDogc3RyaW5nID0gJ21kJztcclxuXHRleHBvcnQgdmFyIHNtOiBzdHJpbmcgPSAnc20nO1xyXG5cdGV4cG9ydCB2YXIgeHM6IHN0cmluZyA9ICd4cyc7XHJcbn1cclxuIiwiLypcclxuICogSW1wbGVtZW50YXRpb24gYWxzbyByZXF1aXJlcyB0aGUgZm9sbG93aW5nIGVsZW1lbnRzIHRvIGJlIGluc2VydGVkIG9uIHRoZSBwYWdlOlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UteHMgdmlzaWJsZS14c1wiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2Utc20gdmlzaWJsZS1zbVwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbWQgdmlzaWJsZS1tZFwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbGcgdmlzaWJsZS1sZ1wiPjwvZGl2PlxyXG4gKi9cclxuXHJcbiBtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWU6IHN0cmluZyA9ICd2aXNpYmxlQnJlYWtwb2ludCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpc2libGVCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRpc1Zpc2libGUoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UgaW1wbGVtZW50cyBJVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlIHtcclxuXHRcdGlzVmlzaWJsZShicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0Ly8ganF1ZXJ5IGdldHMgdGhlIGJyZWFrcG9pbnQgdHJpZ2dlciBkaXJlY3RpdmVzIGxpc3RlZCBhYm92ZSBvbiBsaW5lIDNcclxuXHRcdFx0cmV0dXJuICQoJy5kZXZpY2UtJyArIGJyZWFrcG9pbnQpLmlzKCc6dmlzaWJsZScpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ29ic2VydmFibGVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRcdGV2ZW50Pzogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0XHQoLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdCgpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogSUFjdGlvbjx2b2lkPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdFx0ZmlyZShldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSB3YXRjaGVyczogSVdhdGNoZXI8YW55PltdID0gW107XHJcblx0XHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICghXy5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG5cdFx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfKHRoaXMud2F0Y2hlcnMpLmZpbHRlcigod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm1hcCgod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xyXG5cdFx0XHR9KS52YWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGVTZXJ2aWNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnd2luZG93Q29udHJvbCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdpbmRvd1NlcnZpY2Uge1xyXG5cdFx0cmVzaXplKGNhbGxiYWNrOiB7IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiBhbnkgfSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBXaW5kb3dTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2luZG93Q29udHJvbDogSlF1ZXJ5ID0gJCh3aW5kb3cpO1xyXG5cclxuXHRcdHJlc2l6ZShjYWxsYmFjazogeyAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogYW55IH0pOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53aW5kb3dDb250cm9sLnJlc2l6ZShjYWxsYmFjayk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBXaW5kb3dTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYnJlYWtwb2ludHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Zpc2libGVCcmVha3BvaW50cy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX193aW5kb3cgPSBybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93O1xyXG5cdGltcG9ydCBfX29ic2VydmFibGUgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZTtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYnJlYWtwb2ludHMnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRjdXJyZW50QnJlYWtwb2ludDogc3RyaW5nO1xyXG5cdFx0aXNCcmVha3BvaW50KGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZH0pOiBfX29ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBCcmVha3BvaW50U2VydmljZSBpbXBsZW1lbnRzIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsICdyZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcycsIF9fd2luZG93LnNlcnZpY2VOYW1lLCBfX29ic2VydmFibGUuZmFjdG9yeU5hbWVdXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIHZpc2libGVCcmVha3BvaW50czogSVZpc2libGVCcmVha3BvaW50U2VydmljZVxyXG5cdFx0XHRcdCwgcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHM6IG51bWJlclxyXG5cdFx0XHRcdCwgd2luZG93U2VydmljZTogX193aW5kb3cuSVdpbmRvd1NlcnZpY2VcclxuXHRcdFx0XHQsIG9ic2VydmFibGVGYWN0b3J5OiBfX29ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gdGhpcy5nZXRCcmVha3BvaW50KCk7XHJcblxyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdFx0dmFyIGVmZmljaWVudFJlc2l6ZTogeygpOiB2b2lkfSA9IF8uZGVib3VuY2UodGhpcy51cGRhdGVCcmVha3BvaW50LCByZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcywge1xyXG5cdFx0XHRcdGxlYWRpbmc6IHRydWUsXHJcblx0XHRcdFx0dHJhaWxpbmc6IHRydWUsXHJcblx0XHRcdFx0bWF4V2FpdDogcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHMsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR3aW5kb3dTZXJ2aWNlLnJlc2l6ZShlZmZpY2llbnRSZXNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogX19vYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZTtcclxuXHRcdGN1cnJlbnRCcmVha3BvaW50OiBzdHJpbmc7XHJcblxyXG5cdFx0cHJpdmF0ZSBnZXRCcmVha3BvaW50KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLnZpc2libGVCcmVha3BvaW50cy5pc1Zpc2libGUobGcpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGxnO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudmlzaWJsZUJyZWFrcG9pbnRzLmlzVmlzaWJsZShtZCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbWQ7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy52aXNpYmxlQnJlYWtwb2ludHMuaXNWaXNpYmxlKHNtKSkge1xyXG5cdFx0XHRcdHJldHVybiBzbTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4geHM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpc0JyZWFrcG9pbnQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnRCcmVha3BvaW50ID09PSBicmVha3BvaW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyAoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZCB9KTogX19vYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vYnNlcnZhYmxlLnJlZ2lzdGVyKGFjdGlvbiwgJ3dpbmRvdy5icmVha3BvaW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdXBkYXRlQnJlYWtwb2ludDogeygpOiB2b2lkfSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG5ld0JyZWFrUG9pbnQ6IHN0cmluZyA9IHRoaXMuZ2V0QnJlYWtwb2ludCgpO1xyXG5cclxuXHRcdFx0aWYgKG5ld0JyZWFrUG9pbnQgIT09IHRoaXMuY3VycmVudEJyZWFrcG9pbnQpIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gbmV3QnJlYWtQb2ludDtcclxuXHRcdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnd2luZG93LmJyZWFrcG9pbnRDaGFuZ2VkJywgdGhpcy5jdXJyZW50QnJlYWtwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX3dpbmRvdy5tb2R1bGVOYW1lLCBfX29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuY29uc3RhbnQoJ3Jlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzJywgNTAwKVxyXG5cdFx0LnNlcnZpY2UodmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsIFZpc2libGVCcmVha3BvaW50U2VydmljZSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCcmVha3BvaW50U2VydmljZSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdicmVha3BvaW50cy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGludGVyZmFjZSBJVmlzaWJsZUJyZWFrcG9pbnRzTW9jayB7XHJcblx0XHRpc1Zpc2libGUoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJV2luZG93U2VydmljZU1vY2sge1xyXG5cdFx0cmVzaXplKGNhbGxiYWNrOiB7KGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IGFueX0pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZGVzY3JpYmUoJ2JyZWFrcG9pbnRzJywgKCkgPT4ge1xyXG5cdFx0dmFyIGJyZWFrcG9pbnRzOiBJQnJlYWtwb2ludFNlcnZpY2U7XHJcblxyXG5cdFx0dmFyIHZpc2libGVCcmVha3BvaW50OiBzdHJpbmc7XHJcblx0XHR2YXIgdHJpZ2dlclJlc2l6ZTogeyAoKTogdm9pZCB9O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBoYXZlIHZpc2libGUgYnJlYWtwb2ludCBtYXJrZWQgYXMgY3VycmVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmlzaWJsZUJyZWFrcG9pbnQgPSBtZDtcclxuXHJcblx0XHRcdGJ1aWxkU2VydmljZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmN1cnJlbnRCcmVha3BvaW50KS50by5lcXVhbChtZCk7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQobWQpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KGxnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQoc20pKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludCh4cykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzaWduYWwgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMgd2hlbiB0aGUgYnJlYWtwb2ludCBjaGFuZ2VzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgYnJlYWtwb2ludENoYW5nZVNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdHZpc2libGVCcmVha3BvaW50ID0gc207XHJcblxyXG5cdFx0XHRidWlsZFNlcnZpY2UoKTtcclxuXHJcblx0XHRcdGJyZWFrcG9pbnRzLnJlZ2lzdGVyKGJyZWFrcG9pbnRDaGFuZ2VTcHkpO1xyXG5cclxuXHRcdFx0dmlzaWJsZUJyZWFrcG9pbnQgPSBtZDtcclxuXHRcdFx0dHJpZ2dlclJlc2l6ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmN1cnJlbnRCcmVha3BvaW50KS50by5lcXVhbChtZCk7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQobWQpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KGxnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQoc20pKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludCh4cykpLnRvLmJlLmZhbHNlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYnJlYWtwb2ludENoYW5nZVNweSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRmdW5jdGlvbiBidWlsZFNlcnZpY2UoKTogdm9pZCB7XHJcblx0XHRcdHZhciBtb2NrVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlOiBJVmlzaWJsZUJyZWFrcG9pbnRzTW9jayA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IChicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBicmVha3BvaW50ID09PSB2aXNpYmxlQnJlYWtwb2ludDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG1vY2tXaW5kb3dDb250cm9sOiBJV2luZG93U2VydmljZU1vY2sgPSB7XHJcblx0XHRcdFx0cmVzaXplOiAoY2FsbGJhY2s6IHsgKCk6IHZvaWQgfSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclJlc2l6ZSA9IGNhbGxiYWNrO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRfX3Rlc3QuYW5ndWxhckZpeHR1cmUubW9jayh7XHJcblx0XHRcdFx0dmlzaWJsZUJyZWFrcG9pbnQ6IG1vY2tWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UsXHJcblx0XHRcdFx0d2luZG93Q29udHJvbDogbW9ja1dpbmRvd0NvbnRyb2wsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0YnJlYWtwb2ludHMgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2NvbnRlbnRQcm92aWRlckZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZDtcclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnk7XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3VGV4dDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQ29udGVudFByb3ZpZGVyU2VydmljZSBpbXBsZW1lbnRzIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdGNvbnN0cnVjdG9yKG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpIHtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG9ic2VydmFibGU6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdFx0cHJpdmF0ZSBjb250ZW50OiBKUXVlcnk7XHJcblxyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlLmZpcmUoJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQ6IHsodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkfSA9ICh0cmFuc2NsdWRlRnVuY3Rpb246IG5nLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih0cmFuc2NsdWRlRnVuY3Rpb24pKSB7XHJcblx0XHRcdFx0dHJhbnNjbHVkZUZ1bmN0aW9uKChjbG9uZTogSlF1ZXJ5KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNldENvbnRlbnQoY2xvbmUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0Q29udGVudChudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50ICE9IG51bGwpIHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmFibGUucmVnaXN0ZXIoKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fSwgJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeSB7XHJcblx0XHRcdGlmIChzZWxlY3RvciAhPSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29udGVudC5maWx0ZXIoc2VsZWN0b3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW29ic2VydmFibGUuZmFjdG9yeU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRQcm92aWRlclNlcnZpY2Uob2JzZXJ2YWJsZUZhY3RvcnkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250ZW50UHJvdmlkZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2NvbnRlbnRQcm92aWRlcicsICgpID0+IHtcclxuXHRcdHZhciBjb250ZW50UHJvdmlkZXI6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlO1xyXG5cdFx0dmFyIHRyYW5zY2x1ZGVTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIGZpbHRlclNweTogU2lub24uU2lub25TcHk7XHJcblx0XHR2YXIganF1ZXJ5Q2xvbmU6IGFueTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHZhciBjb250ZW50UHJvdmlkZXJGYWN0b3J5OiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnlcclxuXHRcdFx0XHQ9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdFx0Y29udGVudFByb3ZpZGVyID0gY29udGVudFByb3ZpZGVyRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdFx0anF1ZXJ5Q2xvbmUgPSB7fTtcclxuXHRcdFx0ZmlsdGVyU3B5ID0gc2lub24uc3B5KChvYmplY3Q6IGFueSk6IGFueSA9PiB7IHJldHVybiBvYmplY3Q7IH0pO1xyXG5cdFx0XHRqcXVlcnlDbG9uZS5maWx0ZXIgPSBmaWx0ZXJTcHk7XHJcblxyXG5cdFx0XHR0cmFuc2NsdWRlU3B5ID0gc2lub24uc3B5KChmdW5jOiBGdW5jdGlvbikgPT4gZnVuYyhqcXVlcnlDbG9uZSkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIGNvbnRlbnQgdGhhdCB3YXMgc2V0IGJ5IHNldENvbnRlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRDb250ZW50KGpxdWVyeUNsb25lKTtcclxuXHRcdFx0ZXhwZWN0KGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCkpLnRvLmVxdWFsKGpxdWVyeUNsb25lKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgc2V0IHRoZSBjb250ZW50IHRvIHRoZSBjb250ZW50IHByb3ZpZGVkIGJ5IHRoZSB0cmFuc2NsdWRlIGZ1bmN0aW9uJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIuc2V0VHJhbnNjbHVkZUNvbnRlbnQodHJhbnNjbHVkZVNweSk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh0cmFuc2NsdWRlU3B5KTtcclxuXHJcblx0XHRcdGV4cGVjdChjb250ZW50UHJvdmlkZXIuZ2V0Q29udGVudCgpKS50by5lcXVhbChqcXVlcnlDbG9uZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGZpbHRlciB0aGUganF1ZXJ5IG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRDb250ZW50KGpxdWVyeUNsb25lKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCdzZWxlY3RvcicpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZmlsdGVyU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZmlsdGVyU3B5LCAnc2VsZWN0b3InKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgY2FsbCB0aGUgYWN0aW9uIHdpdGggdGhlIG5ldyBjb250ZW50IHdoZW4gdGhlIGNvbnRlbnQgY2hhbmdlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFjdGlvblNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5yZWdpc3RlcihhY3Rpb25TcHkpO1xyXG5cclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYWN0aW9uU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYWN0aW9uU3B5LCBqcXVlcnlDbG9uZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGNhbGwgdGhlIGFjdGlvbiBpbW1lZGlhdGVseSBpZiB0aGVyZSBpcyBhbHJlYWR5IGNvbnRlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBhY3Rpb25TcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIuc2V0Q29udGVudChqcXVlcnlDbG9uZSk7XHJcblxyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIucmVnaXN0ZXIoYWN0aW9uU3B5KTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGFjdGlvblNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGFjdGlvblNweSwganF1ZXJ5Q2xvbmUpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgZGF0ZVNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0XHRuYW1lOiBzdHJpbmc7XHJcblx0XHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdFx0eyBuYW1lOiAnSmFudWFyeScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0FwcmlsJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bHknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vbnRoOiBJTW9udGhbXTtcclxuXHJcblx0XHRwcml2YXRlIGlzTGVhcFllYXIoeWVhcj86IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0XHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0XHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0XHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdFx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxuXHR9O1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2UoZGF0ZVNlcnZpY2VOYW1lLCBEYXRlVXRpbGl0eSlcclxuXHRcdC52YWx1ZShkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2RhdGVVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGRhdGVVdGlsaXR5OiBJRGF0ZVV0aWxpdHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZGF0ZVNlcnZpY2VOYW1lKTtcclxuXHRcdFx0ZGF0ZVV0aWxpdHkgPSBzZXJ2aWNlc1tkYXRlU2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2dldEZ1bGxTdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgZ2V0IHRoZSBtb250aCBuYW1lJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDApKS50by5lcXVhbCgnSmFudWFyeScpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEpKS50by5lcXVhbCgnRmVicnVhcnknKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygyKSkudG8uZXF1YWwoJ01hcmNoJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMykpLnRvLmVxdWFsKCdBcHJpbCcpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDQpKS50by5lcXVhbCgnTWF5Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNSkpLnRvLmVxdWFsKCdKdW5lJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNikpLnRvLmVxdWFsKCdKdWx5Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNykpLnRvLmVxdWFsKCdBdWd1c3QnKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg4KSkudG8uZXF1YWwoJ1NlcHRlbWJlcicpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDkpKS50by5lcXVhbCgnT2N0b2JlcicpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEwKSkudG8uZXF1YWwoJ05vdmVtYmVyJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMTEpKS50by5lcXVhbCgnRGVjZW1iZXInKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnZ2V0RGF5cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygwKSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDIpKS50by5lcXVhbCgzMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMykpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg0KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDUpKS50by5lcXVhbCgzMCk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNikpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg3KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDgpKS50by5lcXVhbCgzMCk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoOSkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxMCkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxMSkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIGFjY291bnQgZm9yIGxlYXAgeWVhcnMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMSwgMjAxNSkpLnRvLmVxdWFsKDI4KTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxLCAyMDE2KSkudG8uZXF1YWwoMjkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdudW1iZXJVdGlsaXR5JztcclxuXHJcblx0ZW51bSBTaWduIHtcclxuXHRcdHBvc2l0aXZlID0gMSxcclxuXHRcdG5lZ2F0aXZlID0gLTEsXHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElOdW1iZXJVdGlsaXR5IHtcclxuXHRcdHByZWNpc2VSb3VuZChudW06IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgTnVtYmVyVXRpbGl0eSBpbXBsZW1lbnRzIElOdW1iZXJVdGlsaXR5IHtcclxuXHRcdHByZWNpc2VSb3VuZChudW06IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHZhciBzaWduOiBTaWduID0gbnVtID49IDAgPyBTaWduLnBvc2l0aXZlIDogU2lnbi5uZWdhdGl2ZTtcclxuXHRcdFx0cmV0dXJuIChNYXRoLnJvdW5kKChudW0gKiBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKSArICg8bnVtYmVyPnNpZ24gKiAwLjAwMSkpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgTnVtYmVyVXRpbGl0eSk7XHJcbn1cclxuIiwiXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZSB7XHJcblx0XHRkaXNwbGF5KCk6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGNsYXNzIEZpbGVTaXplU2VydmljZSBpbXBsZW1lbnRzIElGaWxlU2l6ZSB7XHJcblx0XHRCWVRFU19QRVJfR0I6IG51bWJlciA9IDEwNzM3NDE4MjQ7XHJcblx0XHRCWVRFU19QRVJfTUI6IG51bWJlciA9IDEwNDg1NzY7XHJcblx0XHRCWVRFU19QRVJfS0I6IG51bWJlciA9IDEwMjQ7XHJcblxyXG5cdFx0Ynl0ZXM6IG51bWJlcjtcclxuXHJcblx0XHRHQjogbnVtYmVyO1xyXG5cdFx0aXNHQjogYm9vbGVhbjtcclxuXHJcblx0XHRNQjogbnVtYmVyO1xyXG5cdFx0aXNNQjogYm9vbGVhbjtcclxuXHJcblx0XHRLQjogbnVtYmVyO1xyXG5cdFx0aXNLQjogYm9vbGVhbjtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihudW1iZXJVdGlsaXR5OiBudW1iZXIuSU51bWJlclV0aWxpdHksIGJ5dGVzOiBudW1iZXIpIHtcclxuXHRcdFx0dGhpcy5ieXRlcyA9IGJ5dGVzO1xyXG5cclxuXHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0dCKSB7XHJcblx0XHRcdFx0dGhpcy5pc0dCID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLkdCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9HQjtcclxuXHRcdFx0XHR0aGlzLkdCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5HQiwgMSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pc0dCID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG5cdFx0XHRcdFx0dGhpcy5pc01CID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuTUIgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX01CO1xyXG5cdFx0XHRcdFx0dGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzTUIgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0tCID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5LQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfS0I7XHJcblx0XHRcdFx0XHRcdHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaXNLQiA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5ieXRlcyA9IE1hdGgucm91bmQodGhpcy5ieXRlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGlzcGxheSgpOiBzdHJpbmcge1xyXG5cdFx0XHRpZiAodGhpcy5pc0dCKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmlzTUIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5NQiArICcgTUInO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLktCICsgJyBLQic7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemU7XHJcblx0fVxyXG5cclxuXHRmaWxlU2l6ZUZhY3RvcnkuJGluamVjdCA9IFtudW1iZXIuc2VydmljZU5hbWVdO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZhY3RvcnkobnVtYmVyVXRpbGl0eTogbnVtYmVyLklOdW1iZXJVdGlsaXR5KTogSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEZpbGVTaXplU2VydmljZShudW1iZXJVdGlsaXR5LCBieXRlcyk7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIHNpbXBsZUZpbHRlck5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzaW1wbGVGaWx0ZXJOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmlsdGVyIHtcclxuXHRcdChieXRlcz86IG51bWJlcik6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGZpbGVTaXplRmlsdGVyLiRpbmplY3QgPSBbZmFjdG9yeU5hbWVdO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3Rvcnk6IElGaWxlU2l6ZUZhY3RvcnkpOiBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChieXRlcz86IG51bWJlcik6IHN0cmluZyA9PiB7XHJcblx0XHRcdHZhciBmaWxlU2l6ZTogSUZpbGVTaXplID0gZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKGJ5dGVzKTtcclxuXHRcdFx0cmV0dXJuIGZpbGVTaXplLmRpc3BsYXkoKTtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemVGaWx0ZXIudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW251bWJlci5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkpXHJcblx0XHQuZmlsdGVyKHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdGRlc2NyaWJlKCdmaWxlU2l6ZScsICgpID0+IHtcclxuXHRcdHZhciBmaWxlU2l6ZUZhY3Rvcnk6IElGaWxlU2l6ZUZhY3Rvcnk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZhY3RvcnlOYW1lKTtcclxuXHRcdFx0ZmlsZVNpemVGYWN0b3J5ID0gc2VydmljZXNbZmFjdG9yeU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUgYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMSkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBieXRlcycpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwMjMpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEwMjMgYnl0ZXMnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZGV0ZXJtaW5lIGtpbG8gYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTAyNCkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBLQicpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwNDg1NzUpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEwMjQgS0InKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZGV0ZXJtaW5lIG1lZ2EgYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA0ODU3NikuZGlzcGxheSgpKS50by5lcXVhbCgnMSBNQicpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwNzM3NDE4MjMpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEwMjQgTUInKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZGV0ZXJtaW5lIGdpZ2EgYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA3Mzc0MTgyNCkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBHQicpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwNzM3NDE4MjUpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEgR0InKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdudW1iZXJVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIG51bWJlclV0aWxpdHk6IElOdW1iZXJVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0bnVtYmVyVXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdwcmVjaXNlUm91bmQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcm91bmQgNiB0byA2JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCg2LCAyKTtcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoNik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjI3NSB0byAxLjI4JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjI3NSwgMik7XHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuMjgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcm91bmQgMS4yNzQgdG8gMS4yNycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS4yNzQsIDIpO1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgxLjI3KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuNTU1NTU1NTU1NTU1NTU1NTU1NTUgdG8gMS41NTU1NTU1NTU1NTU1NTU1NTU2JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdC8vIDIwIDUncy4gVGhpcyBpcyB0aGUgbWF4IHByZWNpc2lvbiBwcmVjaXNlX3JvdW5kIGlzIHZhbGlkIGZvclxyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjU1NTU1NTU1NTU1NTU1NTU1NTU1LCAxOSk7XHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDEuNTU1NTU1NTU1NTU1NTU1NTU1Nik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjk5OTk5OTk5OTk5OTk5OTk5OTk5OSB0byAyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjk5OTk5OTk5OTk5OTk5OTk5OTk5OSwgMjApOyAvLyAyMSA5J3NcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBub3Qgcm91bmQgMS4xMTExMTExMTExMTExMTExMTExMTEnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuMTExMTExMTExMTExMTExMTExMTExLCAyMCk7IC8vIDIxIDEnc1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgxLjExMTExMTExMTExMTExMTExMTExKTtcdC8vIHRyaW1tZWQgMSBmcm9tIHRoZSBlbmRcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnb2JqZWN0VXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBvYmplY3RVdGlsaXR5OiBJT2JqZWN0VXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdG9iamVjdFV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnaXNOdWxsT3JFbXB0eScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gZW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgnJykpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBzdHJpbmcgaGFzIGNvbnRlbnRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJ3JhbmRvbSBzdHJpbmcnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgbnVsbCBvciBlbXB0eSBhcnJheXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFtdKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KFsxLCAyLCAzXSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgbnVtYmVyIHR5cGUgaXMgbm90IGEgbnVtYmVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoTnVtYmVyLk5hTikpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSg1KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2lzTnVsbE9yV2hpdGVzcGFjZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgZW1wdHkgd2hpdGVzcGFjZSBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgnICAgJykpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBoYW5kbGUgbnVsbCBhbmQgZW1wdHkgb2JqZWN0cyBsaWtlIGlzTnVsbE9yRW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKG51bGwpKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkobnVsbCkpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShbXSkpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShbXSkpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSh7fSkpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSh7fSkpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgnJykpLnRvLmVxdWFsKG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSgnJykpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSgncmFuZG9tIHN0cmluZycpKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJ3JhbmRvbSBzdHJpbmcnKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2FyZUVxdWFsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHR3byBwcmltaXRpdmVzIGFyZSBlcXVhbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc3RyaW5nMTogc3RyaW5nID0gJ2FiYyc7XHJcblx0XHRcdFx0dmFyIHN0cmluZzI6IHN0cmluZyA9ICdhYmMnO1xyXG5cdFx0XHRcdHZhciBudW0xOiBudW1iZXIgPSAxO1xyXG5cdFx0XHRcdHZhciBudW0yOiBudW1iZXIgPSAxO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKHN0cmluZzEsIHN0cmluZzIpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG51bTEsIG51bTIpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHR3byBvYmplY3RzIGFyZSBub3Qgb2YgdGhlIHNhbWUgdHlwZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc3RyaW5nOiBzdHJpbmcgPSAnYWJjJztcclxuXHRcdFx0XHR2YXIgbnVtOiBudW1iZXIgPSAxO1xyXG5cdFx0XHRcdHZhciBvYmo6IGFueSA9IHt9O1xyXG5cdFx0XHRcdHZhciBhcnJheTogYW55W10gPSBbXTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChzdHJpbmcsIG51bSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKHN0cmluZywgb2JqKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoc3RyaW5nLCBhcnJheSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG51bSwgb2JqKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwobnVtLCBhcnJheSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdC8vb2JqIGFuZCBhcnJheSBhcmUgY29uc2lkZXJlZCB0aGUgc2FtZSB0eXBlXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgb25lIG9iamVjdCBpcyB2YWxpZCBhbmQgdGhlIG90aGVyIGlzIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIG9iajogYW55ID0geyAnMSc6IDEsICcyJzogMiB9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iaiwgbnVsbCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGFycmF5cyBoYXZlIGRpZmZlcmVudCBsZW5ndGhzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTE6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cdFx0XHRcdHZhciBhcnJheTI6IG51bWJlcltdID0gWzEsIDIsIDNdO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKGFycmF5MSwgYXJyYXkyKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBjb21wYXJlIGFycmF5cyBieSBlbGVtZW50IGlmIHRoZXkgYXJlIHRoZSBzYW1lIGxlbmd0aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cdFx0XHRcdHZhciBzaW1pbGFyQXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cdFx0XHRcdHZhciBkaWZmZXJlbnRBcnJheTogbnVtYmVyW10gPSBbNSwgNCwgMywgMiwgMV07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoYXJyYXksIHNpbWlsYXJBcnJheSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoYXJyYXksIGRpZmZlcmVudEFycmF5KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCB1c2UgdGhlIGtleXMgZnJvbSB0aGUgZmlyc3Qgb2JqZWN0IHRvIGNvbXBhcmUgcHJvcGVydGllcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgb2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgc2ltaWxhck9iamVjdDogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVudE9iamVjdDogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0J3R3byc6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QsIHNpbWlsYXJPYmplY3QpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgZGlmZmVyZW50T2JqZWN0KSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgb2JqZWN0IDIgaGFzIHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCAxIHdpdGggYWRkaXRpb25hbCBwcm9wZXJ0aWVzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBvYmplY3QxOiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgb2JqZWN0MjogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdFx0JzQnOiA0LFxyXG5cdFx0XHRcdFx0JzUnOiA1LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqZWN0MSwgb2JqZWN0MikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmVjdXJzaXZlbHkgY29tcGFyZSBuZXN0ZWQgb2JqZWN0cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgb2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHRuZXN0ZWRPYmo6IHtcclxuXHRcdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bmVzdGVkQXJyYXk6IFsxLCAyLCAzXSxcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBzaW1pbGFyT2JqZWN0OiBhbnkgPSB7XHJcblx0XHRcdFx0XHRuZXN0ZWRPYmo6IHtcclxuXHRcdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0XHQnMic6IDIsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bmVzdGVkQXJyYXk6IFsxLCAyLCAzXSxcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBkaWZmZXJlbnRPYmplY3QxOiBhbnkgPSB7XHJcblx0XHRcdFx0XHRuZXN0ZWRPYmo6IHtcclxuXHRcdFx0XHRcdFx0J29uZSc6IDEsXHJcblx0XHRcdFx0XHRcdCd0d28nOiAyLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG5lc3RlZEFycmF5OiBbMSwgMiwgM10sXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgZGlmZmVyZW50T2JqZWN0MjogYW55ID0ge1xyXG5cdFx0XHRcdFx0bmVzdGVkT2JqOiB7XHJcblx0XHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG5lc3RlZEFycmF5OiBbMSwgMiwgMywgNCwgNV0sXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QsIHNpbWlsYXJPYmplY3QpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgZGlmZmVyZW50T2JqZWN0MSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdCwgZGlmZmVyZW50T2JqZWN0MikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd0b1N0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCB0dXJuIG51bWJlcnMgaW50byBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKDUpKS50by5lcXVhbCgnNScpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKDIuNSkpLnRvLmVxdWFsKCcyLjUnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHR1cm4gYm9vbGVhbnMgaW50byBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKGZhbHNlKSkudG8uZXF1YWwoJ2ZhbHNlJyk7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcodHJ1ZSkpLnRvLmVxdWFsKCd0cnVlJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCB0dXJuIHVuZGVmaW5lZCBhbmQgbnVsbCBpbnRvIHN0cmluZ3MnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkudG9TdHJpbmcodW5kZWZpbmVkKSkudG8uZXF1YWwoJ3VuZGVmaW5lZCcpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKG51bGwpKS50by5lcXVhbCgnbnVsbCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd2YWx1ZU9yRGVmYXVsdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdGhlIHZhbHVlIGlmIGl0IGlzIGRlZmluZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHNvbWVPYmplY3Q6IGFueSA9IHsgZXhpc3RpbmdQcm9wZXJ0eTogJ3ZhbHVlJyB9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0KHNvbWVPYmplY3QuZXhpc3RpbmdQcm9wZXJ0eSwgJ2RlZmF1bHQnKSkudG8uZXF1YWwoJ3ZhbHVlJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdGhlIGRlZmF1bHQgaWYgdGhlIHZhbHVlIGlzIG5vdCBkZWZpbmVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBzb21lT2JqZWN0OiBhbnkgPSB7IG51bGxQcm9wZXJ0eTogbnVsbCB9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0KHNvbWVPYmplY3QubnVsbFByb3BlcnR5LCAnZGVmYXVsdCcpKS50by5lcXVhbCgnZGVmYXVsdCcpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0KHNvbWVPYmplY3QubWlzc2luZ1Byb3BlcnR5LCAnZGVmYXVsdCcpKS50by5lcXVhbCgnZGVmYXVsdCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgSlF1ZXJ5VXRpbGl0eSBpbXBsZW1lbnRzIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHRjb250ZW50QXJlYS5lbXB0eSgpO1xyXG5cdFx0XHRjb250ZW50QXJlYS5hcHBlbmQobmV3Q29udGVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBKUXVlcnlVdGlsaXR5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nanF1ZXJ5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdqcXVlcnlVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGpxdWVyeVV0aWxpdHk6IElKUXVlcnlVdGlsaXR5O1xyXG5cdFx0dmFyIGVtcHR5U3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciBhcHBlbmRTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0anF1ZXJ5VXRpbGl0eSA9IHNlcnZpY2VzLmpxdWVyeVV0aWxpdHk7XHJcblxyXG5cdFx0XHRlbXB0eVNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHRhcHBlbmRTcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZW1wdHkgdGhlIGV4aXN0aW5nIGNvbnRlbnQgYW5kIGFwcGVuZCB0aGUgbmV3IGNvbnRlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBleGlzdGluZ0VsZW1lbnQ6IGFueSA9IHtcclxuXHRcdFx0XHRlbXB0eTogZW1wdHlTcHksXHJcblx0XHRcdFx0YXBwZW5kOiBhcHBlbmRTcHksXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgbmV3Q29udGVudDogYW55ID0ge307XHJcblxyXG5cdFx0XHRqcXVlcnlVdGlsaXR5LnJlcGxhY2VDb250ZW50KGV4aXN0aW5nRWxlbWVudCwgbmV3Q29udGVudCk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShlbXB0eVNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGFwcGVuZFNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGFwcGVuZFNweSwgbmV3Q29udGVudCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0XHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlcjtcclxuXHRcdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZztcclxuXHRcdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsaXR5U2VydmljZSBpbXBsZW1lbnRzIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0XHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiArc3RyaW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHN1YnN0cmluZykge1xyXG5cdFx0XHRcdHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHJpbmcpICE9PSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcblx0XHRcdF8uZWFjaChwYXJhbXMsIChwYXJhbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0Zm9ybWF0U3RyaW5nID0gdGhpcy5yZXBsYWNlQWxsKGZvcm1hdFN0cmluZywgJ1xcXFx7JyArIGluZGV4ICsgJ1xcXFx9JywgcGFyYW0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGZvcm1hdFN0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFN0cmluZ1V0aWxpdHlTZXJ2aWNlKTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyV2l0aENvdW50cyBleHRlbmRzIElGaWx0ZXIge1xyXG5cdFx0dXBkYXRlT3B0aW9uQ291bnRzPFRJdGVtVHlwZT4oZGF0YTogVEl0ZW1UeXBlW10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9maWx0ZXJzL2ZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlcic7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9ICdzZWFyY2gnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyIGV4dGVuZHMgZmlsdGVyLklGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbjtcclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgR2VuZXJpY1NlYXJjaEZpbHRlciBpbXBsZW1lbnRzIElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZyA9IGZpbHRlck5hbWU7XHJcblx0XHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0XHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBvYmplY3Q6IG9iamVjdC5JT2JqZWN0VXRpbGl0eSwgcHJpdmF0ZSBzdHJpbmc6IHN0cmluZy5JU3RyaW5nVXRpbGl0eVNlcnZpY2UpIHt9XHJcblxyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLm9iamVjdC5pc051bGxPckVtcHR5KHRoaXMuc2VhcmNoVGV4dCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHNlYXJjaE9iamVjdDxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSwgc2VhcmNoOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuXHRcdFx0XHR2YXIgdmFsdWVzOiBhbnkgPSBfLnZhbHVlcyhpdGVtKTtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkodmFsdWVzLCAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4geyByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkYXRhU3RyaW5nOiBzdHJpbmcgPSB0aGlzLm9iamVjdC50b1N0cmluZyhpdGVtKTtcclxuXHJcblx0XHRcdFx0aWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0XHRzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRcdGRhdGFTdHJpbmcgPSBkYXRhU3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdHJpbmcuY29udGFpbnMoZGF0YVN0cmluZywgc2VhcmNoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcblx0fVxyXG5cclxuXHRnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS4kaW5qZWN0ID0gW29iamVjdC5zZXJ2aWNlTmFtZSwgc3RyaW5nLnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeShvYmplY3Q6IG9iamVjdC5JT2JqZWN0VXRpbGl0eSxcclxuXHRcdHN0cmluZ1V0aWxpdHk6IHN0cmluZy5JU3RyaW5nVXRpbGl0eVNlcnZpY2UpOiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBHZW5lcmljU2VhcmNoRmlsdGVyKG9iamVjdCwgc3RyaW5nVXRpbGl0eSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0Lm1vZHVsZU5hbWUsIHN0cmluZy5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdnZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW50ZXJmYWNlIElUZXN0T2JqZWN0IHtcclxuXHRcdHByb3A6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJVGVzdE9iamVjdDIge1xyXG5cdFx0cHJvcDE/OiBudW1iZXI7XHJcblx0XHRwcm9wMj86IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTmVzdGVkVGVzdE9iamVjdCB7XHJcblx0XHRuZXN0ZWRPYmplY3Q6IElUZXN0T2JqZWN0MjtcclxuXHR9XHJcblxyXG5cdGRlc2NyaWJlKCdnZW5lcmljU2VhcmNoRmlsdGVyJywgKCkgPT4ge1xyXG5cdFx0dmFyIGdlbmVyaWNTZWFyY2hGaWx0ZXI6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZhY3RvcnlOYW1lKTtcclxuXHRcdFx0dmFyIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5OiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkgPSBzZXJ2aWNlc1tmYWN0b3J5TmFtZV07XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIgPSBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBpbmNsdWRlIGFsbCBpdGVtcyBpZiBxdWVyeSBpcyBudWxsIG9yIGVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSBudWxsO1xyXG5cclxuXHRcdFx0dmFyIG9iamVjdDE6IElUZXN0T2JqZWN0ID0ge1xyXG5cdFx0XHRcdHByb3A6ICdzb21lIHN0cmluZycsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgb2JqZWN0MjogSVRlc3RPYmplY3QgPSB7XHJcblx0XHRcdFx0cHJvcDogJ2Fub3RoZXIgdmFsdWUnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdDEpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0MikpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnJztcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdDEpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0MikpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHNlYXJjaCB0aGUgYWN0dWFsIGRhdGEgdmFsdWVzIGlmIHRoZXkgYXJlbnQgb2JqZWN0cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gJzInO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKDEpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKDIpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoMykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoNCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoNSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBpbmNsdWRlIGl0ZW1zIHRoYXQgY29udGFpbiB0aGUgc2VhcmNoIHN0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gJ215JztcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5jYXNlU2Vuc2l0aXZlID0gdHJ1ZTtcclxuXHRcdFx0dmFyIG1hdGNoaW5nT2JqZWN0MTogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AyOiAnbXkgc3RyaW5nJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBtYXRjaGluZ09iamVjdDI6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMTogNSxcclxuXHRcdFx0XHRwcm9wMjogJ3NvbWUgc3RyaW5nIHdpdGggbXknLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG9iamVjdFdpdGhvdXRTZWFyY2hTdHJpbmc6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMTogMixcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBvYmplY3RXaXRoRGlmZmVyZW50Q2FzZTogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AxOiA1LFxyXG5cdFx0XHRcdHByb3AyOiAnTVkgc3RyaW5nJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihtYXRjaGluZ09iamVjdDEpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0V2l0aG91dFNlYXJjaFN0cmluZykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIobWF0Y2hpbmdPYmplY3QyKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdFdpdGhEaWZmZXJlbnRDYXNlKSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGluY2x1ZGUgaXRlbXMgdGhhdCBjb250YWluIHRoZSBzZWFyY2ggc3RyaW5nLCBjYXNlIGluc2Vuc2l0aXZlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnbXknO1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLmNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcclxuXHRcdFx0dmFyIGxvd2VyY2FzZU1hdGNoOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDI6ICdteSBzdHJpbmcnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIHVwcGVyY2FzZU1hdGNoOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDE6IDIuMixcclxuXHRcdFx0XHRwcm9wMjogJ01ZIHN0cmluZycsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIobG93ZXJjYXNlTWF0Y2gpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIodXBwZXJjYXNlTWF0Y2gpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZWN1cnNpdmVseSBzZWFyY2ggdGhlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnbXknO1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLmNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcclxuXHRcdFx0dmFyIG9iamVjdFdpdGhOZXN0ZWRPYmplY3Q6IElOZXN0ZWRUZXN0T2JqZWN0ID0ge1xyXG5cdFx0XHRcdG5lc3RlZE9iamVjdDoge1xyXG5cdFx0XHRcdFx0cHJvcDI6ICdteSBzdHJpbmcnLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0V2l0aE5lc3RlZE9iamVjdCkpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ29ic2VydmFibGUnLCAoKSA9PiB7XHJcblx0XHR2YXIgb2JzZXJ2YWJsZTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZhY3RvcnlOYW1lKTtcclxuXHRcdFx0dmFyIG9ic2VydmFibGVGYWN0b3J5OiBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5ID0gc2VydmljZXNbZmFjdG9yeU5hbWVdO1xyXG5cdFx0XHRvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmVnaXN0ZXIgYSB3YXRjaGVyIGFuZCBjYWxsIHRoZSBhY3Rpb24gd2hlbiBmaXJlIGlzIGNhbGxlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMpO1xyXG5cdFx0XHRvYnNlcnZhYmxlLmZpcmUoKTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZ1bmMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCB1bnJlZ2lzdGVyIG9ubHkgdGhlIGluZGljYXRlZCB3YXRjaGVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgcmVnaXN0ZXJlZEZ1bmMxOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHR2YXIgdW5yZWdpc3RlcmVkRnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdFx0dmFyIHJlZ2lzdGVyZWRGdW5jMjogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIocmVnaXN0ZXJlZEZ1bmMxKTtcclxuXHRcdFx0dmFyIGNhbmNlbDogKCkgPT4gdm9pZCA9IG9ic2VydmFibGUucmVnaXN0ZXIodW5yZWdpc3RlcmVkRnVuYyk7XHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIocmVnaXN0ZXJlZEZ1bmMyKTtcclxuXHJcblx0XHRcdGNhbmNlbCgpO1xyXG5cclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShyZWdpc3RlcmVkRnVuYzEpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHVucmVnaXN0ZXJlZEZ1bmMpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShyZWdpc3RlcmVkRnVuYzIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBvbmx5IGNhbGwgd2F0Y2hlciByZWdpc3RlcmVkIHdpdGggdGhlIHNwZWNpZmllZCBldmVudCBpZiBmaXJlIGlzIGNhbGxlZCB3aXRoIGFuIGV2ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuY1dpdGhFdmVudDogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdFx0dmFyIGZ1bmNXaXRob3V0RXZlbnQ6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmNXaXRoRXZlbnQsICdteUV2ZW50Jyk7XHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuY1dpdGhvdXRFdmVudCk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgnbXlFdmVudCcpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChmdW5jV2l0aG91dEV2ZW50KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZnVuY1dpdGhFdmVudCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG5vdCBjYWxsIHdhdGNoZXJzIHJlZ2lzdGVyZWQgd2l0aCBhIGRpZmZlcmVudCBldmVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMsICdteUV2ZW50Jyk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgnb3RoZXJFdmVudCcpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChmdW5jKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgY2FsbCB0aGUgcmVnaXN0ZXJlZCB3YXRjaGVycyB3aXRoIHRoZSBhZGRpdGlvbmFsIHBhcmFtcyBwYXNzZWQgaW50byB0aGUgZmlyZSBmdW5jdGlvbicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMsICdteUV2ZW50Jyk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgnbXlFdmVudCcsIDEsIDIsIDMsIDQsIDUpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZnVuYyk7XHJcblxyXG5cdFx0XHR2YXIgYXJnczogbnVtYmVyW10gPSBmdW5jLmZpcnN0Q2FsbC5hcmdzO1xyXG5cdFx0XHRleHBlY3QoYXJnc1swXSkudG8uZXF1YWwoMSk7XHJcblx0XHRcdGV4cGVjdChhcmdzWzFdKS50by5lcXVhbCgyKTtcclxuXHRcdFx0ZXhwZWN0KGFyZ3NbMl0pLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHRleHBlY3QoYXJnc1szXSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdGV4cGVjdChhcmdzWzRdKS50by5lcXVhbCg1KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHdpdGggYW4gZXJyb3IgaWYgbm8gZnVuY3Rpb24gaXMgcHJvdmlkZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBvcmlnaW5hbExvZzogKG1lc3NhZ2U/OiBzdHJpbmcpID0+IHZvaWQgPSBjb25zb2xlLmxvZztcclxuXHRcdFx0dmFyIGxvZ1NweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdFx0Y29uc29sZS5sb2cgPSBsb2dTcHk7XHJcblxyXG5cdFx0XHR2YXIgY2FuY2VsOiAoKSA9PiB2b2lkID0gb2JzZXJ2YWJsZS5yZWdpc3RlcihudWxsKTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGxvZ1NweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGxvZ1NweSwgJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNhbmNlbCkudG8uYmUubnVsbDtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nID0gb3JpZ2luYWxMb2c7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ3Byb21pc2VVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIHByb21pc2VVdGlsaXR5OiBJUHJvbWlzZVV0aWxpdHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRwcm9taXNlVXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdpc1Byb21pc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIG9iamVjdCBpcyBhIHByb21pc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHByb21pc2U6IE9iamVjdCA9IHtcclxuXHRcdFx0XHRcdHRoZW46IHNpbm9uLnNweSgpLFxyXG5cdFx0XHRcdFx0Y2F0Y2g6IHNpbm9uLnNweSgpLFxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdGV4cGVjdChwcm9taXNlVXRpbGl0eS5pc1Byb21pc2UocHJvbWlzZSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIG9iamVjdCBpcyBub3QgYSBwcm9taXNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBzdHI6IHN0cmluZyA9ICdwcm9taXNlJztcclxuXHRcdFx0XHR2YXIgb2JqOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KHByb21pc2VVdGlsaXR5LmlzUHJvbWlzZShzdHIpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3QocHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlKG9iaikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpZXdEYXRhPFRCZWhhdmlvcj4ge1xyXG5cdFx0YmVoYXZpb3I6IFRCZWhhdmlvcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNoaWxkPFRCZWhhdmlvcj4ge1xyXG5cdFx0dmlld0RhdGE/OiBJVmlld0RhdGE8VEJlaGF2aW9yPjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3I7XHJcblx0XHR0cmlnZ2VyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZDogSUNoaWxkPGFueT5cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGU7XHJcblx0XHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW107XHJcblx0XHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdO1xyXG5cdFx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0XHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yIHtcclxuXHRcdFx0cmV0dXJuIGNoaWxkICYmIGNoaWxkLnZpZXdEYXRhICE9IG51bGxcclxuXHRcdFx0XHQ/IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yXHJcblx0XHRcdFx0OiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcjogVEJlaGF2aW9yID0gdGhpcy5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKTtcclxuXHJcblx0XHRcdGlmIChiZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdXHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3JzOiBUQmVoYXZpb3JbXSA9IHRoaXMuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMoY2hpbGRMaXN0KTtcclxuXHJcblx0XHRcdHJldHVybiBfLm1hcChiZWhhdmlvcnMsIChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3I+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXSk6IFRCZWhhdmlvcltdIHtcclxuXHRcdFx0cmV0dXJuIF8oY2hpbGRMaXN0KS5tYXAoKGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciA9PiB7IHJldHVybiB0aGlzLmdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZCk7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQuZmlsdGVyKChiZWhhdmlvcjogVEJlaGF2aW9yKTogYm9vbGVhbiA9PiB7IHJldHVybiBiZWhhdmlvciAhPSBudWxsOyB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LnZhbHVlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+LCBiZWhhdmlvcjogVEJlaGF2aW9yKTogdm9pZCB7XHJcblx0XHRcdGlmIChjaGlsZCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY2hpbGQudmlld0RhdGEgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhID0geyBiZWhhdmlvcjogbnVsbCB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEJlaGF2aW9yOiBUQmVoYXZpb3IgPSBjaGlsZC52aWV3RGF0YS5iZWhhdmlvcjtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50QmVoYXZpb3IgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSA8VEJlaGF2aW9yPl8uZXh0ZW5kKGN1cnJlbnRCZWhhdmlvciwgYmVoYXZpb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3Ige1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RCZWhhdmlvciB7XHJcblx0XHRhY3Rpb246IEZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0ZGVzY3JpYmUoJ3BhcmVudENoaWxkQmVoYXZpb3InLCAoKSA9PiB7XHJcblx0XHR2YXIgcGFyZW50Q2hpbGRCZWhhdmlvcjogSVBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvciA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZWdpc3RlcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZWdpc3RlciBhIGNoaWxkIGJlaGF2aW9yIGJ5IHB1dHRpbmcgaXQgb24gdGhlIHZpZXcgZGF0YSBvZiB0aGUgY2hpbGQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGNoaWxkOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiBudWxsIH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cclxuXHRcdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoY2hpbGQudmlld0RhdGEuYmVoYXZpb3IpLnRvLmVxdWFsKGJlaGF2aW9yKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHVzZSB0aGUgZXhpc3Rpbmcgdmlld0RhdGEgb2JqZWN0IGlmIG9uZSBleGlzdHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGNoaWxkV2l0aFZpZXdEYXRhOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSA8YW55Pnsgdmlld0RhdGE6IHsgcmFuZG9tVmFsdWU6IDUgfSB9O1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDU7IH0gfTtcclxuXHJcblx0XHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5yZWdpc3RlckNoaWxkQmVoYXZpb3IoY2hpbGRXaXRoVmlld0RhdGEsIGJlaGF2aW9yKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGNoaWxkV2l0aFZpZXdEYXRhLnZpZXdEYXRhLmJlaGF2aW9yKS50by5lcXVhbChiZWhhdmlvcik7XHJcblx0XHRcdFx0ZXhwZWN0KCg8YW55PmNoaWxkV2l0aFZpZXdEYXRhLnZpZXdEYXRhKS5yYW5kb21WYWx1ZSkudG8uZXF1YWwoNSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBub3QgcmVnaXN0ZXIgY2hpbGQgYmVoYXZpb3IgaWYgY2hpbGQgb2JqZWN0IGlzIG51bGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0gbnVsbDtcclxuXHRcdFx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvcihjaGlsZCwgYmVoYXZpb3IpO1xyXG5cdFx0XHRcdGV4cGVjdChwYXJlbnRDaGlsZEJlaGF2aW9yLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpKS50by5iZS5udWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdnZXRDaGlsZEJlaGF2aW9yJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGdldCB0aGUgYmVoYXZpb3Igb2YgYW4gaW5kaXZpZHVhbCBjaGlsZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IxOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KHBhcmVudENoaWxkQmVoYXZpb3IuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCkpLnRvLmVxdWFsKGJlaGF2aW9yMSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgZXhpc3RpbmcgYmVoYXZpb3JzIGZvciBhIGxpc3Qgb2YgY2hpbGRyZW4nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMTogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IyOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gNzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZExpc3Q6IElDaGlsZDxJVGVzdEJlaGF2aW9yPltdID0gW1xyXG5cdFx0XHRcdFx0eyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfSxcclxuXHRcdFx0XHRcdHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IG51bGwgfSB9LFxyXG5cdFx0XHRcdFx0eyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IyIH0gfSxcclxuXHRcdFx0XHRdO1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JzOiBJVGVzdEJlaGF2aW9yW10gPSBwYXJlbnRDaGlsZEJlaGF2aW9yLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvcnMubGVuZ3RoKS50by5lcXVhbCgyKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JzWzBdKS50by5lcXVhbChiZWhhdmlvcjEpO1xyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvcnNbMV0pLnRvLmVxdWFsKGJlaGF2aW9yMik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RyaWdnZXJDaGlsZEJlaGF2aW9yJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHRyaWdnZXIgdGhlIHNwZWNpZmllZCBjaGlsZCBhY3Rpb24gYW5kIHJldHVybiB0aGUgcmVzdWx0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjE6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAzOyB9IH07XHJcblx0XHRcdFx0dmFyIGNoaWxkOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjEgfSB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlciA9IHBhcmVudENoaWxkQmVoYXZpb3IudHJpZ2dlckNoaWxkQmVoYXZpb3IoY2hpbGQsXHJcblx0XHRcdFx0XHQoYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJlaGF2aW9yLmFjdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHQpLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgdGhlIGJlaGF2aW9yIGRvZXMgbm90IGV4aXN0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlciA9IHBhcmVudENoaWxkQmVoYXZpb3IudHJpZ2dlckNoaWxkQmVoYXZpb3IoY2hpbGQsXHJcblx0XHRcdFx0XHQoYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJlaGF2aW9yLmFjdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHQpLnRvLmJlLm51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCB0cmlnZ2VyIHRoZSBzcGVjaWZpZWQgY2hpbGQgYWN0aW9ucyBhbmQgcmV0dXJuIHRoZSByZXN1bHRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjE6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAxOyB9IH07XHJcblx0XHRcdFx0dmFyIGNoaWxkMTogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfTtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IyOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMjsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDI6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMiB9IH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMzogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGQzOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjMgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZFdpdGhvdXRCZWhhdmlvcjogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB9O1xyXG5cclxuXHRcdFx0XHR2YXIgYmVoYXZpb3JSZXN1bHQ6IG51bWJlcltdID0gcGFyZW50Q2hpbGRCZWhhdmlvci50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMoW2NoaWxkMSwgY2hpbGQyLCBjaGlsZDMsIGNoaWxkV2l0aG91dEJlaGF2aW9yXSxcclxuXHRcdFx0XHRcdChiZWhhdmlvcjogSVRlc3RCZWhhdmlvcik6IG51bWJlciA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYmVoYXZpb3IuYWN0aW9uKCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvclJlc3VsdCkudG8uaGF2ZS5sZW5ndGgoMyk7XHJcblx0XHRcdFx0ZXhwZWN0KGJlaGF2aW9yUmVzdWx0WzBdKS50by5lcXVhbCgxKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHRbMV0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvclJlc3VsdFsyXSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3Mvc2lub25cclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnk7XHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0XHRwcm9taXNlOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+O1xyXG5cdFx0ZGF0YTogVERhdGFUeXBlO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNlcnZpY2UpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNlcnZpY2UgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdHJldHVybiBzZXJ2aWNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCguLi5wYXJhbXM6IGFueVtdKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGNhbGxiYWNrLmFwcGx5KHRoaXMsIHBhcmFtcyksXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBuZy5JU2NvcGUpOiB2b2lkIHtcclxuXHRcdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0XHR2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0czogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT5bXSA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdFx0Ly8gVGhpcyB3YXkgaWYgYW55IGFkZGl0aW9uYWwgcmVxdWVzdHMgYXJlIGdlbmVyYXRlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSBjdXJyZW50IC8gbG9jYWwgbGlzdCBcclxuXHRcdFx0Ly8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuXHRcdFx0Xy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIChyZXF1ZXN0OiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBtb2NrOiBJTW9jayA9IG5ldyBNb2NrKCk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFRpbWVVdGlsaXR5IHtcclxuXHRcdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0aW1lLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUge1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCd0aW1lVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciB0aW1lVXRpbGl0eTogSVRpbWVVdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0dGltZVV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBleHBlY3RlZCBudW1iZXIgb2Ygc2Vjb25kcyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzKDQwMDApKS50by5lcXVhbCg0KTtcclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvU2Vjb25kcyg0NjAwKSkudG8uZXF1YWwoNCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBleHBlY3RlZCBudW1iZXIgb2YgbWludXRlcyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgc2Vjb25kczE6IG51bWJlciA9IDEyMDtcclxuXHRcdFx0dmFyIHNlY29uZHMyOiBudW1iZXIgPSA1OTtcclxuXHJcblx0XHRcdHNlY29uZHMxICo9IDEwMDA7XHJcblx0XHRcdHNlY29uZHMyICo9IDEwMDA7XHJcblxyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzKHNlY29uZHMxKSkudG8uZXF1YWwoMik7XHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMoc2Vjb25kczIpKS50by5lcXVhbCgwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGV4cGVjdGVkIG51bWJlciBvZiBob3VycyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgbWludXRlczE6IG51bWJlciA9IDU5O1xyXG5cdFx0XHR2YXIgbWludXRlczI6IG51bWJlciA9IDYwO1xyXG5cclxuXHRcdFx0bWludXRlczEgKj0gNjAgKiAxMDAwO1xyXG5cdFx0XHRtaW51dGVzMiAqPSA2MCAqIDEwMDA7XHJcblxyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyhtaW51dGVzMSkpLnRvLmVxdWFsKDApO1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyhtaW51dGVzMikpLnRvLmVxdWFsKDEpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZXhwZWN0ZWQgbnVtYmVyIG9mIGRheXMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGhvdXJzMTogbnVtYmVyID0gMjM7XHJcblx0XHRcdHZhciBob3VyczI6IG51bWJlciA9IDI0O1xyXG5cclxuXHRcdFx0aG91cnMxICo9IDYwICogNjAgKiAxMDAwO1xyXG5cdFx0XHRob3VyczIgKj0gNjAgKiA2MCAqIDEwMDA7XHJcblxyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzKGhvdXJzMSkpLnRvLmVxdWFsKDApO1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzKGhvdXJzMikpLnRvLmVxdWFsKDEpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc3RyaW5nLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyB7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ3N0cmluZ1V0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgc3RyaW5nVXRpbGl0eTogSVN0cmluZ1V0aWxpdHlTZXJ2aWNlO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0c3RyaW5nVXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd0b051bWJlcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBjb252ZXJ0IGEgc3RyaW5nIHRvIGEgbnVtYmVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnRvTnVtYmVyKCc1JykpLnRvLmVxdWFsKDUpO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnRvTnVtYmVyKCczJykpLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnRvTnVtYmVyKCcxLjI1JykpLnRvLmVxdWFsKDEuMjUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdjb250YWlucycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUgc3Vic3RyaW5nIGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhlIHN0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnbXkgc3RyaW5nJywgJ215JykpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJzEyMycsICcxJykpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJycsIG51bGwpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCdteSBzdHJpbmcnLCAnJykpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIHN1YnN0cmluZyBpcyBub3QgY29udGFpbmVkIHdpdGhpbiB0aGUgc3RyaW5nJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCdteSBzdHJpbmcnLCAnbXkgdmFsJykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCcxMjMnLCAnNCcpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnbXkgc3RyaW5nJywgJ215IHN0cmluZyAxJykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZXBsYWNlQWxsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJlcGxhY2UgYWxsIG9jY3VyYW5jZXMgb2Ygc29tZSBnaXZlbiB0ZXh0IHdpdGggYW5vdGhlciBpbnNpZGUgYSBzdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkucmVwbGFjZUFsbCgnaGVsbG8gd29ybGQnLCAnZm9vJywgJ2JhcicpKS50by5lcXVhbCgnaGVsbG8gd29ybGQnKTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5yZXBsYWNlQWxsKCdmb29IZWxsb2Zvb1dvcmxkZm9vJywgJ2ZvbycsICdiYXInKSkudG8uZXF1YWwoJ2JhckhlbGxvYmFyV29ybGRiYXInKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnc3Vic3RpdHV0ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBzdWJzdGl0dXRlIHN0cmluZ3Mgd2l0aCB0aGVpciBwb3NpdGlvbmFsIHBsYWNlaG9sZGVyIHZhbHVlIGluIG90aGVyIHN0cmluZ3MnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuc3Vic3RpdHV0ZSgnaGVsbG8gd29ybGQnLCAnZm9vJykpLnRvLmVxdWFsKCdoZWxsbyB3b3JsZCcpO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnN1YnN0aXR1dGUoJ2hlbGxvIHswfSB3b3JsZCB7MX0nLCAnZm9vJywgJ2JhcicpKS50by5lcXVhbCgnaGVsbG8gZm9vIHdvcmxkIGJhcicpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmJlaGF2aW9ycyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdHN0b3BFdmVudFByb3BvZ2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2lzRW1wdHkvaXNFbXB0eS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHJ1bmNhdGUvdHJ1bmNhdGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0aXNFbXB0eS5tb2R1bGVOYW1lLFxyXG5cdFx0dHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRlbnRQcm92aWRlci9jb250ZW50UHJvdmlkZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS9kYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2pxdWVyeS9qcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRhcnJheS5tb2R1bGVOYW1lLFxyXG5cdFx0YXV0b3NhdmUubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWUsXHJcblx0XHRib29sZWFuLm1vZHVsZU5hbWUsXHJcblx0XHRjb250ZW50UHJvdmlkZXIubW9kdWxlTmFtZSxcclxuXHRcdGRhdGUubW9kdWxlTmFtZSxcclxuXHRcdGpxdWVyeS5tb2R1bGVOYW1lLFxyXG5cdFx0bnVtYmVyLm1vZHVsZU5hbWUsXHJcblx0XHRvYmplY3QubW9kdWxlTmFtZSxcclxuXHRcdG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuXHRcdHBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSxcclxuXHRcdHByb21pc2UubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRcdGJlaGF2aW9ycy5tb2R1bGVOYW1lLFxyXG5cdFx0ZmlsdGVycy5tb2R1bGVOYW1lLFxyXG5cdFx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=