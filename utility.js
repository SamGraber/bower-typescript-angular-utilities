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
        (function (services_2) {
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
            })(autosave = services_2.autosave || (services_2.autosave = {}));
        })(services = utilities.services || (utilities.services = {}));
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
        (function (services_3) {
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
            })(array = services_3.array || (services_3.array = {}));
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
                contentProvider.moduleName = 'rl21.utilities.services.contentProvider';
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
        (function (services_10) {
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
            })(jquery = services_10.jquery || (services_10.jquery = {}));
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
        (function (services_11) {
            var genericSearchFilter;
            (function (genericSearchFilter_1) {
                'use strict';
                describe('genericSearchFilter', function () {
                    var genericSearchFilter;
                    beforeEach(function () {
                        angular.mock.module(genericSearchFilter_1.moduleName);
                        var services = services_11.test.angularFixture.inject(genericSearchFilter_1.factoryName);
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
            })(genericSearchFilter = services_11.genericSearchFilter || (services_11.genericSearchFilter = {}));
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
        (function (services_12) {
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
            })(number = services_12.number || (services_12.number = {}));
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
        (function (services_13) {
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
            })(object = services_13.object || (services_13.object = {}));
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
                    it('should return expected number of hours for milliseconds', function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwic2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsImZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudGVzdHMudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50cyIsImZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRlc3RzLnRzIiwiYmVoYXZpb3JzL3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzIiwic2VydmljZXMvYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cyIsInNlcnZpY2VzL2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9ib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMudHMiLCJzZXJ2aWNlcy9icmVha3BvaW50cy92aXNpYmxlQnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL2JyZWFrcG9pbnRzL2JyZWFrcG9pbnRzLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudGVzdHMudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL3N0cmluZy9zdHJpbmcuc2VydmljZS50cyIsImZpbHRlcnMvZmlsdGVyLnRzIiwic2VydmljZXMvZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50ZXN0cy50cyIsInNlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvcHJvbWlzZS9wcm9taXNlVXRpbGl0eS5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRlc3RzLnRzIiwic2VydmljZXMvdGVzdC9tb2NrLnRzIiwic2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50ZXN0cy50cyIsImJlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwiZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50cyIsInNlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cyIsInV0aWxpdGllcy50cyJdLCJuYW1lcyI6WyJybCIsInJsLnV0aWxpdGllcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5maW5kSW5kZXhPZiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkucmVtb3ZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZXBsYWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5zdW0iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnRvRGljdGlvbmFyeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuYXJlRXF1YWwiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkudG9TdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJybC51dGlsaXRpZXMuZmlsdGVycyIsInJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5pbmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5tb2NrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29udHJvbGxlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmRpcmVjdGl2ZSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkiLCJybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5LmlzRW1wdHkiLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbiIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24uc3RvcEV2ZW50UHJvcGFnYXRpb24iLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uLnN0b3BFdmVudFByb3BhZ2F0aW9uLmxpbmsiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc2F2aW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb21wbGV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc3VjY2Vzc2Z1bCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UudHJpZ2dlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UubnVsbEZvcm0uJHNldFByaXN0aW5lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLmF1dG9zYXZlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5WaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLlZpc2libGVCcmVha3BvaW50U2VydmljZS5pc1Zpc2libGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLmZpcmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS51bnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUub2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUub2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy53aW5kb3cuV2luZG93U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy53aW5kb3cuV2luZG93U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy53aW5kb3cuV2luZG93U2VydmljZS5yZXNpemUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuQnJlYWtwb2ludFNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuQnJlYWtwb2ludFNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuQnJlYWtwb2ludFNlcnZpY2UuZ2V0QnJlYWtwb2ludCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5pc0JyZWFrcG9pbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuQnJlYWtwb2ludFNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuYnVpbGRTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5zZXRDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmdldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5jb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmlzTGVhcFllYXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLlNpZ24iLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LmludGVnZXJEaXZpZGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UuZGlzcGxheSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5yZXBsYWNlQ29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UudG9OdW1iZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnRhaW5zIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5zdWJzdGl0dXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5yZXBsYWNlQWxsIiwicmwudXRpbGl0aWVzLmZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoT2JqZWN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldEFsbENoaWxkQmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucmVnaXN0ZXJDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmZsdXNoIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyJdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0E2RVI7QUE3RUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBNkVsQkE7SUE3RVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBNkUzQkE7UUE3RW1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxLQUFLQSxDQTZFakNBO1lBN0U0QkEsV0FBQUEsT0FBS0EsRUFBQ0EsQ0FBQ0E7Z0JBQ25DQyxZQUFZQSxDQUFDQTtnQkFFRkEsa0JBQVVBLEdBQVdBLDZCQUE2QkEsQ0FBQ0E7Z0JBQ25EQSxtQkFBV0EsR0FBV0EsY0FBY0EsQ0FBQ0E7Z0JBYWhEQTtvQkFBQUM7b0JBd0RBQyxDQUFDQTtvQkF2REFELGtDQUFXQSxHQUFYQSxVQUF1QkEsS0FBa0JBLEVBQUVBLFNBQXlDQTt3QkFDbkZFLElBQUlBLFdBQW1CQSxDQUFDQTt3QkFFeEJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLElBQWVBLEVBQUVBLEtBQWFBOzRCQUM1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ3JCQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtnQ0FDcEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBOzRCQUNkQSxDQUFDQTt3QkFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FB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b0JBQ25CQSxJQUFJQSxPQUF1QkEsQ0FBQ0E7b0JBRTVCQSxVQUFVQSxDQUFDQTt3QkFDVkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQVVBLENBQUNBLENBQUNBO3dCQUVoQ0EsSUFBSUEsUUFBUUEsR0FBUUEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQVVBLENBQUNBLENBQUNBO3dCQUM3REEsT0FBT0EsR0FBR0EsUUFBUUEsQ0FBQ0Esb0JBQVVBLENBQUNBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLGtEQUFrREEsRUFBRUE7d0JBQ3REQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDakNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLDRDQUE0Q0EsRUFBRUE7d0JBQ2hEQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDdkNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO29CQUM5Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLCtEQUErREEsRUFBRUE7d0JBQ25FQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFF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QUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDdkNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUN2Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLHVEQUF1REEsRUFBRUE7NEJBQzNEQSxJQUFJQSxjQUFjQSxHQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDekNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBOzRCQUU1Q0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3RDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdENBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUN2Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQTt3QkFDZkEsRUFBRUEsQ0FBQ0EsbUNBQW1DQSxFQUFFQTs0QkFDdkNBLElBQUlBLE1BQU1BLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUN2Q0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7d0JBQy9DQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsNERBQTREQSxFQUFFQTs0QkFDaEVBLElBQUlBLE1BQU1BLEdBQWVBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUNqRUEsSUFBSUEsU0FBU0EsR0FBaUNBLFVBQUNBLElBQWNBLElBQWVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoR0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7d0JBQzFEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsOENBQThDQSxFQUFFQTs0QkFDbERBLElBQUlBLE1BQU1BLEdBQWFBLEVBQUVBLENBQUNBOzRCQUMxQkEsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzlDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLFFBQVFBLENBQUNBLGNBQWNBLEVBQUVBO3dCQUN4QkEsRUFBRUEsQ0FBQ0EseUNBQXlDQSxFQUFFQTs0QkFDN0NBLElBQUlBLEtBQUtBLEdBQWNBO2dDQUN0QkEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUE7Z0NBQ1hBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBO2dDQUNYQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQTtnQ0FDWEEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUE7Z0NBQ1hBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBOzZCQUNYQSxDQUFDQTs0QkFFRkEsSUFBSUEsVUFBVUEsR0FBY0EsWUFBWUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBQ0EsSUFBYUEsSUFBZUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBRTlHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDMUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMxQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzFDQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDMUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUMzQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO2dCQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNKQSxDQUFDQSxFQTVHNEJELEtBQUtBLEdBQUxBLGdCQUFLQSxLQUFMQSxnQkFBS0EsUUE0R2pDQTtRQUFEQSxDQUFDQSxFQTVHbUJELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUE0RzNCQTtJQUFEQSxDQUFDQSxFQTVHU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUE0R2xCQTtBQUFEQSxDQUFDQSxFQTVHTSxFQUFFLEtBQUYsRUFBRSxRQTRHUjtBQ3BIRCx3REFBd0Q7QUFDeEQsMERBQTBEO0FBQzFELDJEQUEyRDtBQUMzRCw2REFBNkQ7QUFFN0Qsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUVsRCxJQUFPLEVBQUUsQ0F5RFI7QUF6REQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBeURsQkE7SUF6RFNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBeUQzQkE7UUF6RG1CQSxXQUFBQSxVQUFRQTtZQUFDQyxJQUFBQSxjQUFjQSxDQXlEMUNBO1lBekQ0QkEsV0FBQUEsZ0JBQWNBLEVBQUNBLENBQUNBO2dCQUM1Q2lDLFlBQVlBLENBQUNBO2dCQUViQSxJQUFPQSxNQUFNQSxHQUFHQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFFM0NBLFFBQVFBLENBQUNBLGdCQUFnQkEsRUFBRUE7b0JBQzFCQSxJQUFJQSxjQUFzQ0EsQ0FBQ0E7b0JBQzNDQSxJQUFJQSxRQUE0QkEsQ0FBQ0E7b0JBQ2pDQSxJQUFJQSxFQUFnQkEsQ0FBQ0E7b0JBQ3JCQSxJQUFJQSxVQUFxQkEsQ0FBQ0E7b0JBQzFCQSxJQUFJQSxRQUE0QkEsQ0FBQ0E7b0JBRWpDQSxVQUFVQSxDQUFDQTt3QkFDVkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsMkJBQVVBLENBQUNBLENBQUNBO3dCQUVoQ0EsSUFBSUEsUUFBUUEsR0FBUUEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsNEJBQVdBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO3dCQUM5RkEsY0FBY0EsR0FBR0EsUUFBUUEsQ0FBQ0EsNEJBQVdBLENBQUNBLENBQUNBO3dCQUN2Q0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7d0JBQzdCQSxFQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQTt3QkFDakJBLFVBQVVBLEdBQUdBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBO3dCQUVqQ0EsUUFBUUEsR0FBR0EsRUFBRUEsQ0FBQ0EsS0FBS0EsRUFBUUEsQ0FBQ0E7d0JBRTVCQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTt3QkFFekNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO29CQUMxQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLG9FQUFvRUEsRUFBRUE7d0JBQ3hFQSxRQUFRQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTt3QkFDbkJBLFVBQVVBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUVyQkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQzFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDM0NBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO29CQUM5Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLHFEQUFxREEsRUFBRUE7d0JBQ3pEQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTt3QkFDbEJBLFVBQVVBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUVyQkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQzFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDM0NBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO29CQUMvQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLDZDQUE2Q0EsRUFBRUE7d0JBQ2pEQSxRQUFRQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTt3QkFDbkJBLFVBQVVBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUVyQkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBRTNDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFFckJBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO29CQUM3Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLEVBekQ0QmpDLGNBQWNBLEdBQWRBLHlCQUFjQSxLQUFkQSx5QkFBY0EsUUF5RDFDQTtRQUFEQSxDQUFDQSxFQXpEbUJELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUF5RDNCQTtJQUFEQSxDQUFDQSxFQXpEU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUF5RGxCQTtBQUFEQSxDQUFDQSxFQXpETSxFQUFFLEtBQUYsRUFBRSxRQXlEUjtBQ2pFRCx1QkFBdUI7QUFFdkIsSUFBTyxFQUFFLENBa0JSO0FBbEJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQWtCbEJBO0lBbEJTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxRQUFRQSxDQWtCM0JBO1FBbEJtQkEsV0FBQUEsUUFBUUE7WUFBQ0MsSUFBQUEsT0FBT0EsQ0FrQm5DQTtZQWxCNEJBLFdBQUFBLE9BQU9BLEVBQUNBLENBQUNBO2dCQUNyQytDLFlBQVlBLENBQUNBO2dCQUVGQSxrQkFBVUEsR0FBV0EsK0JBQStCQSxDQUFDQTtnQkFDckRBLG1CQUFXQSxHQUFXQSxnQkFBZ0JBLENBQUNBO2dCQU1sREE7b0JBQUFDO29CQUlBQyxDQUFDQTtvQkFIQUQsK0JBQU1BLEdBQU5BLFVBQU9BLE1BQVdBO3dCQUNqQkUsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ2pCQSxDQUFDQTtvQkFDRkYscUJBQUNBO2dCQUFEQSxDQUpBRCxBQUlDQyxJQUFBRDtnQkFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esa0JBQVVBLEVBQUVBLEVBQUVBLENBQUNBO3FCQUM1QkEsT0FBT0EsQ0FBQ0EsbUJBQVdBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO1lBQ3hDQSxDQUFDQSxFQWxCNEIvQyxPQUFPQSxHQUFQQSxnQkFBT0EsS0FBUEEsZ0JBQU9BLFFBa0JuQ0E7UUFBREEsQ0FBQ0EsRUFsQm1CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBa0IzQkE7SUFBREEsQ0FBQ0EsRUFsQlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBa0JsQkE7QUFBREEsQ0FBQ0EsRUFsQk0sRUFBRSxLQUFGLEVBQUUsUUFrQlI7QUNwQkQsd0RBQXdEO0FBQ3hELDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsNkRBQTZEO0FBRTdELDJDQUEyQztBQUMzQyxrREFBa0Q7QUFFbEQsSUFBTyxFQUFFLENBMkJSO0FBM0JELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQTJCbEJBO0lBM0JTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxRQUFRQSxDQTJCM0JBO1FBM0JtQkEsV0FBQUEsVUFBUUE7WUFBQ0MsSUFBQUEsT0FBT0EsQ0EyQm5DQTtZQTNCNEJBLFdBQUFBLE9BQU9BLEVBQUNBLENBQUNBO2dCQUNyQytDLFlBQVlBLENBQUNBO2dCQUViQSxJQUFPQSxNQUFNQSxHQUFHQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFFM0NBLFFBQVFBLENBQUNBLGdCQUFnQkEsRUFBRUE7b0JBQzFCQSxJQUFJQSxjQUErQkEsQ0FBQ0E7b0JBRXBDQSxVQUFVQSxDQUFDQTt3QkFDVkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0Esa0JBQVVBLENBQUNBLENBQUNBO3dCQUVoQ0EsSUFBSUEsUUFBUUEsR0FBUUEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQVdBLENBQUNBLENBQUNBO3dCQUM5REEsY0FBY0EsR0FBR0EsUUFBUUEsQ0FBQ0EsbUJBQVdBLENBQUNBLENBQUNBO29CQUN4Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLFFBQVFBLENBQUNBLFFBQVFBLEVBQUVBO3dCQUNsQkEsRUFBRUEsQ0FBQ0EsNENBQTRDQSxFQUFFQTs0QkFDaERBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUNoREEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0Esb0NBQW9DQSxFQUFFQTs0QkFDeENBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUNqREEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQ2hEQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0pBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLEVBM0I0Qi9DLE9BQU9BLEdBQVBBLGtCQUFPQSxLQUFQQSxrQkFBT0EsUUEyQm5DQTtRQUFEQSxDQUFDQSxFQTNCbUJELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUEyQjNCQTtJQUFEQSxDQUFDQSxFQTNCU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUEyQmxCQTtBQUFEQSxDQUFDQSxFQTNCTSxFQUFFLEtBQUYsRUFBRSxRQTJCUjtBQ25DRCxJQUFPLEVBQUUsQ0FPUjtBQVBELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQU9sQkE7SUFQU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsUUFBUUEsQ0FPM0JBO1FBUG1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxXQUFXQSxDQU92Q0E7WUFQNEJBLFdBQUFBLFdBQVdBLEVBQUNBLENBQUNBO2dCQUN6Q21ELFlBQVlBLENBQUNBO2dCQUVGQSxjQUFFQSxHQUFXQSxJQUFJQSxDQUFDQTtnQkFDbEJBLGNBQUVBLEdBQVdBLElBQUlBLENBQUNBO2dCQUNsQkEsY0FBRUEsR0FBV0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxjQUFFQSxHQUFXQSxJQUFJQSxDQUFDQTtZQUM5QkEsQ0FBQ0EsRUFQNEJuRCxXQUFXQSxHQUFYQSxvQkFBV0EsS0FBWEEsb0JBQVdBLFFBT3ZDQTtRQUFEQSxDQUFDQSxFQVBtQkQsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQU8zQkE7SUFBREEsQ0FBQ0EsRUFQU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFPbEJBO0FBQURBLENBQUNBLEVBUE0sRUFBRSxLQUFGLEVBQUUsUUFPUjtBQ1BEOzs7Ozs7R0FNRztBQUVGLElBQU8sRUFBRSxDQWVUO0FBZkEsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBZW5CQTtJQWZVQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxRQUFRQSxDQWU1QkE7UUFmb0JBLFdBQUFBLFFBQVFBO1lBQUNDLElBQUFBLFdBQVdBLENBZXhDQTtZQWY2QkEsV0FBQUEsV0FBV0EsRUFBQ0EsQ0FBQ0E7Z0JBQzFDbUQsWUFBWUEsQ0FBQ0E7Z0JBRUZBLHlDQUE2QkEsR0FBV0EsbUJBQW1CQSxDQUFDQTtnQkFNdkVBO29CQUFBQztvQkFLQUMsQ0FBQ0E7b0JBSkFELDRDQUFTQSxHQUFUQSxVQUFVQSxVQUFrQkE7d0JBQzNCRSx1RUFBdUVBO3dCQUN2RUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsR0FBR0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7b0JBQ2xEQSxDQUFDQTtvQkFDRkYsK0JBQUNBO2dCQUFEQSxDQUxBRCxBQUtDQyxJQUFBRDtnQkFMWUEsb0NBQXdCQSwyQkFLcENBLENBQUFBO1lBQ0ZBLENBQUNBLEVBZjZCbkQsV0FBV0EsR0FBWEEsb0JBQVdBLEtBQVhBLG9CQUFXQSxRQWV4Q0E7UUFBREEsQ0FBQ0EsRUFmb0JELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUFlNUJBO0lBQURBLENBQUNBLEVBZlVELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBZW5CQTtBQUFEQSxDQUFDQSxFQWZPLEVBQUUsS0FBRixFQUFFLFFBZVQ7QUN2QkQseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0ErRVI7QUEvRUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBK0VsQkE7SUEvRVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBK0UzQkE7UUEvRW1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxVQUFVQSxDQStFdENBO1lBL0U0QkEsV0FBQUEsVUFBVUEsRUFBQ0EsQ0FBQ0E7Z0JBQ3hDdUQsWUFBWUEsQ0FBQ0E7Z0JBRUZBLHFCQUFVQSxHQUFXQSxrQ0FBa0NBLENBQUNBO2dCQUN4REEsc0JBQVdBLEdBQVdBLG1CQUFtQkEsQ0FBQ0E7Z0JBc0JyREE7b0JBQUFDO3dCQUNTQyxhQUFRQSxHQUFvQkEsRUFBRUEsQ0FBQ0E7d0JBQy9CQSxZQUFPQSxHQUFXQSxDQUFDQSxDQUFDQTtvQkFnQzdCQSxDQUFDQTtvQkE5QkFELG9DQUFRQSxHQUFSQSxVQUFzQkEsTUFBNEJBLEVBQUVBLEtBQWNBO3dCQUFsRUUsaUJBZ0JDQTt3QkFmQUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzNCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxtQ0FBbUNBLENBQUNBLENBQUNBOzRCQUNqREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQ2JBLENBQUNBO3dCQUVEQSxJQUFJQSxVQUFVQSxHQUFXQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTt3QkFDdENBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUNmQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQTs0QkFDM0JBLE1BQU1BLEVBQUVBLE1BQU1BOzRCQUNkQSxLQUFLQSxFQUFFQSxLQUFLQTt5QkFDWkEsQ0FBQ0E7d0JBRUZBLE1BQU1BLENBQUNBOzRCQUNOQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFDN0JBLENBQUNBLENBQUNBO29CQUNIQSxDQUFDQTtvQkFFREYsZ0NBQUlBLEdBQUpBLFVBQWtCQSxLQUFjQTt3QkFBaENHLGlCQU9DQTt3QkFQaUNBLGdCQUFnQkE7NkJBQWhCQSxXQUFnQkEsQ0FBaEJBLHNCQUFnQkEsQ0FBaEJBLElBQWdCQTs0QkFBaEJBLCtCQUFnQkE7O3dCQUNqREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQ0EsT0FBOEJBOzRCQUM3REEsTUFBTUEsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsSUFBSUEsT0FBT0EsQ0FBQ0EsS0FBS0EsS0FBS0EsS0FBS0EsQ0FBQ0E7d0JBQ25EQSxDQUFDQSxDQUFDQTs2QkFDREEsR0FBR0EsQ0FBQ0EsVUFBQ0EsT0FBOEJBOzRCQUNuQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7d0JBQzNDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDWkEsQ0FBQ0E7b0JBRU9ILHNDQUFVQSxHQUFsQkEsVUFBbUJBLEdBQVdBO3dCQUM3QkksSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7b0JBQzNCQSxDQUFDQTtvQkFDRkosd0JBQUNBO2dCQUFEQSxDQWxDQUQsQUFrQ0NDLElBQUFEO2dCQWxDWUEsNEJBQWlCQSxvQkFrQzdCQSxDQUFBQTtnQkFNREE7b0JBQ0NNLFlBQVlBLENBQUNBO29CQUViQSxNQUFNQSxDQUFDQTt3QkFDTkEsV0FBV0E7NEJBQ1ZDLE1BQU1BLENBQUNBLElBQUlBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7d0JBQ2hDQSxDQUFDQTtxQkFDREQsQ0FBQ0E7Z0JBQ0hBLENBQUNBO2dCQVJlTixtQ0FBd0JBLDJCQVF2Q0EsQ0FBQUE7Z0JBR0RBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLHFCQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtxQkFDNUJBLE9BQU9BLENBQUNBLHNCQUFXQSxFQUFFQSx3QkFBd0JBLENBQUNBLENBQUNBO1lBQ2xEQSxDQUFDQSxFQS9FNEJ2RCxVQUFVQSxHQUFWQSxtQkFBVUEsS0FBVkEsbUJBQVVBLFFBK0V0Q0E7UUFBREEsQ0FBQ0EsRUEvRW1CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBK0UzQkE7SUFBREEsQ0FBQ0EsRUEvRVNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBK0VsQkE7QUFBREEsQ0FBQ0EsRUEvRU0sRUFBRSxLQUFGLEVBQUUsUUErRVI7QUNsRkQsdUJBQXVCO0FBQ3ZCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0FvQlI7QUFwQkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBb0JsQkE7SUFwQlNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBb0IzQkE7UUFwQm1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxNQUFNQSxDQW9CbENBO1lBcEI0QkEsV0FBQUEsTUFBTUEsRUFBQ0EsQ0FBQ0E7Z0JBQ3BDK0QsWUFBWUEsQ0FBQ0E7Z0JBRUZBLGlCQUFVQSxHQUFXQSw4QkFBOEJBLENBQUNBO2dCQUNwREEsa0JBQVdBLEdBQVdBLGVBQWVBLENBQUNBO2dCQU1qREE7b0JBQUFDO3dCQUNTQyxrQkFBYUEsR0FBV0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7b0JBSzNDQSxDQUFDQTtvQkFIQUQsOEJBQU1BLEdBQU5BLFVBQU9BLFFBQTZDQTt3QkFDbkRFLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO29CQUNyQ0EsQ0FBQ0E7b0JBQ0ZGLG9CQUFDQTtnQkFBREEsQ0FOQUQsQUFNQ0MsSUFBQUQ7Z0JBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtxQkFDNUJBLE9BQU9BLENBQUNBLGtCQUFXQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUN2Q0EsQ0FBQ0EsRUFwQjRCL0QsTUFBTUEsR0FBTkEsZUFBTUEsS0FBTkEsZUFBTUEsUUFvQmxDQTtRQUFEQSxDQUFDQSxFQXBCbUJELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUFvQjNCQTtJQUFEQSxDQUFDQSxFQXBCU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFvQmxCQTtBQUFEQSxDQUFDQSxFQXBCTSxFQUFFLEtBQUYsRUFBRSxRQW9CUjtBQ3ZCRCx1QkFBdUI7QUFFdkIsdUNBQXVDO0FBQ3ZDLHNEQUFzRDtBQUN0RCw0REFBNEQ7QUFDNUQsb0RBQW9EO0FBRXBELElBQU8sRUFBRSxDQXNFUjtBQXRFRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FzRWxCQTtJQXRFU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsUUFBUUEsQ0FzRTNCQTtRQXRFbUJBLFdBQUFBLFFBQVFBO1lBQUNDLElBQUFBLFdBQVdBLENBc0V2Q0E7WUF0RTRCQSxXQUFBQSxXQUFXQSxFQUFDQSxDQUFDQTtnQkFDekNtRCxZQUFZQSxDQUFDQTtnQkFFYkEsSUFBT0EsUUFBUUEsR0FBR0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQy9DQSxJQUFPQSxZQUFZQSxHQUFHQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFFNUNBLHNCQUFVQSxHQUFXQSxtQ0FBbUNBLENBQUNBO2dCQUN6REEsdUJBQVdBLEdBQVdBLGFBQWFBLENBQUNBO2dCQVEvQ0E7b0JBRUNnQiwyQkFBb0JBLGtCQUE2Q0EsRUFDN0RBLDBCQUFrQ0EsRUFDbENBLGFBQXNDQSxFQUN0Q0EsaUJBQXlEQTt3QkFMOURDLGlCQWlEQ0E7d0JBL0NvQkEsdUJBQWtCQSxHQUFsQkEsa0JBQWtCQSxDQUEyQkE7d0JBdUN6REEscUJBQWdCQSxHQUFlQTs0QkFDdENBLElBQUlBLGFBQWFBLEdBQVdBLEtBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBOzRCQUVqREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsS0FBS0EsS0FBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDOUNBLEtBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsYUFBYUEsQ0FBQ0E7Z0NBQ3ZDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSwwQkFBMEJBLEVBQUVBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7NEJBQzFFQSxDQUFDQTt3QkFDRkEsQ0FBQ0EsQ0FBQUE7d0JBMUNBQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO3dCQUU5Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTt3QkFFbERBLElBQUlBLGVBQWVBLEdBQWVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsMEJBQTBCQSxFQUFFQTs0QkFDL0ZBLE9BQU9BLEVBQUVBLElBQUlBOzRCQUNiQSxRQUFRQSxFQUFFQSxJQUFJQTs0QkFDZEEsT0FBT0EsRUFBRUEsMEJBQTBCQTt5QkFDbkNBLENBQUNBLENBQUNBO3dCQUNIQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtvQkFDdkNBLENBQUNBO29CQUtPRCx5Q0FBYUEsR0FBckJBO3dCQUNDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLFNBQVNBLENBQUNBLGNBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMzQ0EsTUFBTUEsQ0FBQ0EsY0FBRUEsQ0FBQ0E7d0JBQ1hBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLFNBQVNBLENBQUNBLGNBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsREEsTUFBTUEsQ0FBQ0EsY0FBRUEsQ0FBQ0E7d0JBQ1hBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLFNBQVNBLENBQUNBLGNBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsREEsTUFBTUEsQ0FBQ0EsY0FBRUEsQ0FBQ0E7d0JBQ1hBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDUEEsTUFBTUEsQ0FBQ0EsY0FBRUEsQ0FBQ0E7d0JBQ1hBLENBQUNBO29CQUNGQSxDQUFDQTtvQkFFREYsd0NBQVlBLEdBQVpBLFVBQWFBLFVBQWtCQTt3QkFDOUJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsS0FBS0EsVUFBVUEsQ0FBQ0E7b0JBQzlDQSxDQUFDQTtvQkFFREgsb0NBQVFBLEdBQVJBLFVBQVNBLE1BQXNDQTt3QkFDOUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLDBCQUEwQkEsQ0FBQ0EsQ0FBQ0E7b0JBQ3JFQSxDQUFDQTtvQkF0Q01KLHlCQUFPQSxHQUFhQSxDQUFDQSx5Q0FBNkJBLEVBQUVBLDRCQUE0QkEsRUFBRUEsUUFBUUEsQ0FBQ0EsV0FBV0EsRUFBRUEsWUFBWUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQUE7b0JBZ0R6SUEsd0JBQUNBO2dCQUFEQSxDQWpEQWhCLEFBaURDZ0IsSUFBQWhCO2dCQWpEWUEsNkJBQWlCQSxvQkFpRDdCQSxDQUFBQTtnQkFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esc0JBQVVBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLEVBQUVBLFlBQVlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3FCQUN4RUEsUUFBUUEsQ0FBQ0EsNEJBQTRCQSxFQUFFQSxHQUFHQSxDQUFDQTtxQkFDM0NBLE9BQU9BLENBQUNBLHlDQUE2QkEsRUFBRUEsb0NBQXdCQSxDQUFDQTtxQkFDaEVBLE9BQU9BLENBQUNBLHVCQUFXQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQzNDQSxDQUFDQSxFQXRFNEJuRCxXQUFXQSxHQUFYQSxvQkFBV0EsS0FBWEEsb0JBQVdBLFFBc0V2Q0E7UUFBREEsQ0FBQ0EsRUF0RW1CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBc0UzQkE7SUFBREEsQ0FBQ0EsRUF0RVNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBc0VsQkE7QUFBREEsQ0FBQ0EsRUF0RU0sRUFBRSxLQUFGLEVBQUUsUUFzRVI7QUM3RUQsd0RBQXdEO0FBQ3hELDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsNkRBQTZEO0FBRTdELCtDQUErQztBQUMvQyxrREFBa0Q7QUFFbEQsSUFBTyxFQUFFLENBOEVSO0FBOUVELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQThFbEJBO0lBOUVTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxRQUFRQSxDQThFM0JBO1FBOUVtQkEsV0FBQUEsVUFBUUE7WUFBQ0MsSUFBQUEsV0FBV0EsQ0E4RXZDQTtZQTlFNEJBLFdBQUFBLGFBQVdBLEVBQUNBLENBQUNBO2dCQUN6Q21ELFlBQVlBLENBQUNBO2dCQUViQSxJQUFPQSxNQUFNQSxHQUFHQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFVM0NBLFFBQVFBLENBQUNBLGFBQWFBLEVBQUVBO29CQUN2QkEsSUFBSUEsV0FBK0JBLENBQUNBO29CQUVwQ0EsSUFBSUEsaUJBQXlCQSxDQUFDQTtvQkFDOUJBLElBQUlBLGFBQTJCQSxDQUFDQTtvQkFFaENBLFVBQVVBLENBQUNBO3dCQUNWQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSx3QkFBVUEsQ0FBQ0EsQ0FBQ0E7b0JBQ2pDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsRUFBRUEsQ0FBQ0Esa0RBQWtEQSxFQUFFQTt3QkFDdERBLGlCQUFpQkEsR0FBR0EsZ0JBQUVBLENBQUNBO3dCQUV2QkEsWUFBWUEsRUFBRUEsQ0FBQ0E7d0JBRWZBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBO3dCQUNuREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO3dCQUNoREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUNqREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUNqREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO29CQUNsREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLEVBQUVBLENBQUNBLGdFQUFnRUEsRUFBRUE7d0JBQ3BFQSxJQUFJQSxtQkFBbUJBLEdBQW1CQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFFdERBLGlCQUFpQkEsR0FBR0EsZ0JBQUVBLENBQUNBO3dCQUV2QkEsWUFBWUEsRUFBRUEsQ0FBQ0E7d0JBRWZBLFdBQVdBLENBQUNBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7d0JBRTFDQSxpQkFBaUJBLEdBQUdBLGdCQUFFQSxDQUFDQTt3QkFDdkJBLGFBQWFBLEVBQUVBLENBQUNBO3dCQUVoQkEsTUFBTUEs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S0FBS0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQzFEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTs0QkFDdkRBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBOzRCQUN2REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTs0QkFDdERBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBOzRCQUN0REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7NEJBQ3hEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTs0QkFDM0RBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBOzRCQUN6REEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQzNEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFDNURBLENBQUNBLENBQUNBLENBQUNBO29CQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsUUFBUUEsQ0FBQ0EsU0FBU0EsRUFBRUE7d0JBQ25CQSxFQUFFQSxDQUFDQSw0Q0FBNENBLEVBQUVBOzRCQUNoREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs0QkFDNUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBOzRCQUM1Q0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQzdDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTt3QkFDOUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUVIQSxFQUFFQSxDQUFDQSwrQkFBK0JBLEVBQUVBOzRCQUNuQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7NEJBQ2xEQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxD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QUlBLENBQUNBLE1BQU1BLENBQUNBLG1CQUFVQSxDQUFDQSxDQUFDQTt3QkFFaENBLElBQUlBLFFBQVFBLEdBQVFBLGVBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLG9CQUFXQSxDQUFDQSxDQUFDQTt3QkFDNURBLGVBQWVBLEdBQUdBLFFBQVFBLENBQUNBLG9CQUFXQSxDQUFDQSxDQUFDQTtvQkFDekNBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSx3QkFBd0JBLEVBQUVBO3dCQUM1QkEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3JFQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtvQkFDNUVBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSw2QkFBNkJBLEVBQUVBO3dCQUNqQ0EsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3JFQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtvQkFDNUVBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSw2QkFBNkJBLEVBQUVBO3dCQUNqQ0EsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsV0FBV0Es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QUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBO3dCQUN2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLDZEQUE2REEsRUFBRUE7NEJBQ2pFQSxJQUFJQSxNQUFNQSxHQUFXQSxLQUFLQSxDQUFDQTs0QkFDM0JBLElBQUlBLEdBQUdBLEdBQVdBLENBQUNBLENBQUNBOzRCQUNwQkEsSUFBSUEsR0FBR0EsR0FBUUEsRUFBRUEsQ0FBQ0E7NEJBQ2xCQSxJQUFJQSxLQUFLQSxHQUFVQSxFQUFFQSxDQUFDQTs0QkFDdEJBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUN4REEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3hEQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTs0QkFDMURBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBOzRCQUNyREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ3ZEQSw0Q0FBNENBO3dCQUM3Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLGtFQUFrRUEsRUFBRUE7NEJBQ3RFQSxJQUFJQSxHQUFHQSxHQUFRQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO3dCQUN2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLEVBQUVBLENBQUNBLHNEQUFzREEsRUFBRUE7NEJBQzFEQSxJQUFJQSxNQUFNQSxHQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkNBLElBQUlBLE1BQU1BLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUNqQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQzVEQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsOERBQThEQSxFQUFFQTs0QkFDbEVBLElBQUlBLEtBQUtBLEdBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUN0Q0EsSUFBSUEsWUFBWUEsR0FBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzdDQSxJQUFJQSxjQUFjQSxHQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDL0NBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBOzRCQUMvREEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ25FQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFSEEsRUFBRUEsQ0FBQ0EsaUVBQWlFQSxFQUFFQTs0QkFDckVBLElBQUlBLE1BQU1BLEdBQVFBO2dDQUNqQkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEdBQUdBLEVBQUVBLENBQUNBO2dDQUNOQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLElBQUlBLGFBQWFBLEdBQVFBO2dDQUN4QkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEdBQUdBLEVBQUVBLENBQUNBO2dDQUNOQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLElBQUlBLGVBQWVBLEdBQVFBO2dDQUMxQkEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0NBQ05BLEtBQUtBLEVBQUVBLENBQUNBO2dDQUNSQSxHQUFHQSxFQUFFQSxDQUFDQTs2QkFDTkEsQ0FBQ0E7NEJBQ0ZBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBOzRCQUNqRUEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ3JFQSxDQUFDQSxDQUFDQSxD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QTt3QkFFOUJBLElBQUlBLElBQUlBLEdBQWFBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBO3dCQUN6Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzVCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDNUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUM1QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQzVCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDN0JBLENBQUNBLENBQUNBLENBQUNBO29CQUVIQSxFQUFFQSxDQUFDQSx3REFBd0RBLEVBQUVBO3dCQUM1REEsSUFBSUEsV0FBV0EsR0FBK0JBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBO3dCQUMxREEsSUFBSUEsTUFBTUEsR0FBbUJBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUN6Q0EsT0FBT0EsQ0FBQ0EsR0FBR0EsR0FBR0EsTUFBTUEsQ0FBQ0E7d0JBRXJCQSxJQUFJQSxNQUFNQSxHQUFlQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFFbkRBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO3dCQUNo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O1FBQ0pBLENBQUNBLEVBakJtQkQsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQWlCM0JBO0lBQURBLENBQUNBLEVBakJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQWlCbEJBO0FBQURBLENBQUNBLEVBakJNLEVBQUUsS0FBRixFQUFFLFFBaUJSO0FDaENELGlCQUFpQjtBQUVqQixzREFBc0Q7QUFDdEQsa0RBQWtEO0FBQ2xELG9EQUFvRDtBQUVwRCxJQUFPLEVBQUUsQ0FRUjtBQVJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQVFsQkE7SUFSU0EsV0FBQUEsU0FBU0EsRUFBQ0EsQ0FBQ0E7UUFDVEMsb0JBQVVBLEdBQVdBLGNBQWNBLENBQUNBO1FBRS9DQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQTtZQUNwQkEsbUJBQVNBLENBQUNBLFVBQVVBO1lBQ3BCQSxpQkFBT0EsQ0FBQ0EsVUFBVUE7WUFDbEJBLGtCQUFRQSxDQUFDQSxVQUFVQTtTQUNuQkEsQ0FBQ0EsQ0FBQ0E7SUFDSkEsQ0FBQ0EsRUFSU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFRbEJBO0FBQURBLENBQUNBLEVBUk0sRUFBRSxLQUFGLEVBQUUsUUFRUiIsImZpbGUiOiJ1dGlsaXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXI7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGU7XHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQ7XHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0XHRzdW0oYXJyYXk6IG51bWJlcltdKTogbnVtYmVyO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmd9KTogVERhdGFUeXBlW107XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IG51bWJlcn0pOiBURGF0YVR5cGVbXTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFycmF5VXRpbGl0eSBpbXBsZW1lbnRzIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHRhcmdldEluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRfLmVhY2goYXJyYXksIChpdGVtOiBURGF0YVR5cGUsIGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0XHR0YXJnZXRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0SW5kZXggIT0gbnVsbCA/IHRhcmdldEluZGV4IDogLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUgfCB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZSB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgPHsob2JqOiBURGF0YVR5cGUpOiBib29sZWFufT5pdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZCB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtPzogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0XHRpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRsaXN0ID0gXy5tYXAoYXJyYXksIChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgPT4geyByZXR1cm4gdHJhbnNmb3JtKGl0ZW0pOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaXN0ID0gPGFueVtdPmFycmF5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsgKGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZyB8IG51bWJlciB9KTogVERhdGFUeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UoYXJyYXksIChkaWN0aW9uYXJ5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlW10gPT4ge1xyXG5cdFx0XHRcdGRpY3Rpb25hcnlbPGFueT5rZXlTZWxlY3RvcihpdGVtKV0gPSBpdGVtO1xyXG5cdFx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0XHR9LCBbXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBcnJheVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuO1xyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0XHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHQgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW2FycmF5LnNlcnZpY2VOYW1lXTtcclxuXHRcdCBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBhcnJheS5JQXJyYXlVdGlsaXR5KSB7XHJcblx0XHQgfVxyXG5cclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0XHR2YXIgdHlwZTI6IHN0cmluZyA9IHR5cGVvZiBvYmoyO1xyXG5cclxuXHRcdFx0aWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdFx0dmFyIGtleXMyOiBzdHJpbmdbXSA9IF8ua2V5cyhvYmoyKTtcclxuXHRcdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdFx0Ly9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRcdGlmIChfLmFueShrZXlzMikpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcblx0XHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIG9iamVjdCArICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0cnVuY2F0ZSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQoaW5wdXQ/OiBzdHJpbmcsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0XHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHR0cnVuY2F0ZS4kaW5qZWN0ID0gW19fb2JqZWN0LnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBfX29iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGlucHV0PzogYW55LCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuXHRcdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHRcdHZhciBvdXQ6IHN0cmluZyA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuXHRcdFx0aWYgKG91dC5sZW5ndGgpIHtcclxuXHRcdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0XHRvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG5cdFx0XHRcdFx0aWYgKGluY2x1ZGVFbGxpcHNlcykge1xyXG5cdFx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBvdXQ7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fb2JqZWN0Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgdHJ1bmNhdGUpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhck1vY2tzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Qge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcblx0XHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVSZXN1bHQge1xyXG5cdFx0ZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmU7XHJcblx0XHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBbmd1bGFyRml4dHVyZSB7XHJcblx0XHRpbmplY3Q6ICguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKSA9PiBhbnk7XHJcblx0XHRtb2NrOiAobW9ja3M6IGFueSkgPT4gdm9pZDtcclxuXHRcdGNvbnRyb2xsZXI8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBzY29wZT86IGFueSwgbG9jYWxzPzogYW55KTogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPjtcclxuXHRcdGRpcmVjdGl2ZTogKGRvbTogc3RyaW5nKSA9PiBJRGlyZWN0aXZlUmVzdWx0O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQW5ndWxhckZpeHR1cmUgaW1wbGVtZW50cyBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0XHQvLyBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIG9mIHRoZSBzZXJ2aWNlcyByZXF1ZXN0ZWRcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0XHQvLyB0aGlzIGF2b2lkcyBpdGVyYXRpbmcgb3ZlciB0aGUgZnVuY3Rpb24gaXRzZWxmXHJcblx0XHRcdHZhciBpbmplY3RQYXJhbWV0ZXJzOiBhbnlbXSA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuXHRcdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHRcdC8vIHNob3VsZCBnZXQgY2FsbGVkIHdpdGggdGhlIHNlcnZpY2VzIGluamVjdGVkIGJ5IGFuZ3VsYXJcclxuXHRcdFx0XHQvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuXHRcdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHRzZXJ2aWNlc1tzZXJ2aWNlXSA9IGluamVjdGVkU2VydmljZXNbaW5kZXhdO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGFuZ3VsYXIubW9jay5pbmplY3QoaW5qZWN0UGFyYW1ldGVycyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9jayhtb2NrczogYW55KTogdm9pZCB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoKCRwcm92aWRlOiBhbmd1bGFyLmF1dG8uSVByb3ZpZGVTZXJ2aWNlKSA9PiB7XHJcblx0XHRcdFx0Xy5lYWNoKG1vY2tzLCAodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRcdCRwcm92aWRlLnZhbHVlKGtleS50b1N0cmluZygpLCB2YWx1ZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRyb2xsZXI8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBzY29wZT86IGFueSwgbG9jYWxzPzogYW55KTogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdFx0dmFyICRyb290U2NvcGU6IGFuZ3VsYXIuSVNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb250cm9sbGVyOiBhbnkgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRcdHNjb3BlID0gXy5leHRlbmQoJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuXHJcblx0XHRcdGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNjb3BlOiBzY29wZSxcclxuXHRcdFx0XHRjb250cm9sbGVyOiA8VENvbnRyb2xsZXJUeXBlPiRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpcmVjdGl2ZShkb206IHN0cmluZyk6IElEaXJlY3RpdmVSZXN1bHQge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb21waWxlJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29tcGlsZTogYW55ID0gc2VydmljZXMuJGNvbXBpbGU7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCdyZW5vdm9UZW1wbGF0ZXMnKTtcclxuXHJcblx0XHRcdHZhciBjb21wb25lbnQ6IGFueSA9ICRjb21waWxlKGRvbSkoJHJvb3RTY29wZSk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGRpcmVjdGl2ZTogY29tcG9uZW50LFxyXG5cdFx0XHRcdHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGFuZ3VsYXJGaXh0dXJlOiBJQW5ndWxhckZpeHR1cmUgPSBuZXcgQW5ndWxhckZpeHR1cmUoKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ3RydW5jYXRlJywgKCkgPT4ge1xyXG5cdFx0dmFyIHRydW5jYXRlOiBJVHJ1bmNhdGVGaWx0ZXI7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZmlsdGVyTmFtZSk7XHJcblx0XHRcdHRydW5jYXRlID0gc2VydmljZXNbZmlsdGVyTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgd2hlbiBubyBzdHJpbmcgaXMgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoKSkudG8uZXF1YWwoJycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gYW4gZW1wdHkgc3RyaW5nIGlzIHBhc3NlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCcnKSkudG8uZXF1YWwoJycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gYSBzdHJpbmcgd2hlbiBhIG51bWJlciBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgzNC41KSkudG8uZXF1YWwoJzM0LjUnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgbm90IHRydW5jYXRlIGEgc3RyaW5nIHdoZW4gbm8gcGFyYW1ldGVycyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJykpLnRvLmVxdWFsKCdUZXN0IHN0cmluZycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gdHJ1bmNhdGVUbyBpcyAwJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgMCkpLnRvLmVxdWFsKCcnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgdHJ1bmNhdGUgYnV0IG5vdCBlbGxpcHNpbW9ncmlmeSBhIHN0cmluZyB3aGVuIG9ubHkgdHJ1bmNhdGVUbyBpcyBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCA2KSkudG8uZXF1YWwoJ1Rlc3QgcycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBub3QgdHJ1bmNhdGUgYSBzdHJpbmcgd2hlbiB0cnVuY2F0ZVRvIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc3RyaW5nIGxlbmd0aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRydW5jYXRlKCdUZXN0IHN0cmluZycsIDI1KSkudG8uZXF1YWwoJ1Rlc3Qgc3RyaW5nJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHRydW5jYXRlIGJ1dCBub3QgZWxsaXBzaW1vZ3JpZnkgYSBzdHJpbmcgd2hlbiBib3RoIHRydW5jYXRlVG8gYW5kIGluY2x1ZGVFbGxpcHNlcyBhcmUgcGFzc2VkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QodHJ1bmNhdGUoJ1Rlc3Qgc3RyaW5nJywgNiwgZmFsc2UpKS50by5lcXVhbCgnVGVzdCBzJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHRydW5jYXRlIGFuZCBlbGxpcHNpbW9ncmlmeSBhIHN0cmluZyB3aGVuIGJvdGggdHJ1bmNhdGVUbyBhbmQgaW5jbHVkZUVsbGlwc2VzIGFyZSBwYXNzZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdCh0cnVuY2F0ZSgnVGVzdCBzdHJpbmcnLCA2LCB0cnVlKSkudG8uZXF1YWwoJ1Rlc3Qgcy4uLicpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2lzRW1wdHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdpc0VtcHR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGlzRW1wdHk6IElJc0VtcHR5RmlsdGVyO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZpbHRlck5hbWUpO1xyXG5cdFx0XHRpc0VtcHR5ID0gc2VydmljZXNbZmlsdGVyTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBhcnJheSBpcyBudWxsIG9yIGVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRleHBlY3QoaXNFbXB0eShudWxsKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkoW10pKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIGFycmF5IGhhcyBpdGVtcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KGlzRW1wdHkoWzEsIDIsIDNdKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KFsnMScsICcyJywgJzMnXSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBpbnZlcnQgdGhlIHJlc3VsdCBpZiB0cnVlSWZFbXB0eSBpcyBzcGVjaWZpZWQgYXMgZmFsc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KG51bGwsIGZhbHNlKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChpc0VtcHR5KFsxLCAyLCAzXSwgZmFsc2UpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24nO1xyXG5cdGV4cG9ydCB2YXIgZGlyZWN0aXZlTmFtZTogc3RyaW5nID0gJ3JsU3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzIGV4dGVuZHMgbmcuSUF0dHJpYnV0ZXMge1xyXG5cdFx0cmxTdG9wRXZlbnRQcm9wYWdhdGlvbjogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKTogbmcuSURpcmVjdGl2ZSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogJ0EnLFxyXG5cdFx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGVcclxuXHRcdFx0XHQsIGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnlcclxuXHRcdFx0XHQsIGF0dHJzOiBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyk6IHZvaWQge1xyXG5cdFx0XHRcdGVsZW1lbnQub24oYXR0cnMucmxTdG9wRXZlbnRQcm9wYWdhdGlvbiwgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIHN0b3BFdmVudFByb3BhZ2F0aW9uKTtcclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24nO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUFjdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiB2b2lkO1xyXG5cdFx0c2F2aW5nOiBib29sZWFuO1xyXG5cdFx0Y29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyR0aW1lb3V0J107XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UpIHt9XHJcblxyXG5cdFx0cHJpdmF0ZSBjb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbjogbnVtYmVyID0gMTAwMDtcclxuXHJcblx0XHRwcml2YXRlIF9zYXZpbmc6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9jb21wbGV0ZTogYm9vbGVhbjtcclxuXHRcdHByaXZhdGUgX3N1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblxyXG5cdFx0Z2V0IHNhdmluZygpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3NhdmluZztcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgY29tcGxldGUoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wbGV0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgc3VjY2Vzc2Z1bCgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N1Y2Nlc3NmdWw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYW55IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2UudGhlbih0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bClcclxuXHRcdFx0XHRcdFx0LmNhdGNoKHRoaXMuYXV0b3NhdmVGYWlsZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVTdWNjZXNzZnVsOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgdHJ1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBhdXRvc2F2ZUZhaWxlZDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHJlc29sdmVBdXRvc2F2ZTogeyAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55IH0gPSAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55ID0+IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX2NvbXBsZXRlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5fc3VjY2Vzc2Z1bCA9IHN1Y2Nlc3M7XHJcblxyXG5cdFx0XHR0aGlzLiR0aW1lb3V0KCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLl9jb21wbGV0ZSA9IGZhbHNlO1xyXG5cdFx0XHR9LCB0aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uKTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fYXV0b3NhdmVBY3Rpb24gPSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb247XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2F1dG9zYXZlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRhdXRvc2F2ZSguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRjb250ZW50Rm9ybTogbmcuSUZvcm1Db250cm9sbGVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVTZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIGhhc1ZhbGlkYXRvcjogYm9vbGVhbjtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlXHJcblx0XHRcdFx0LCBwcml2YXRlIHNhdmU6IHsoLi4uZGF0YTogYW55W10pOiBuZy5JUHJvbWlzZTx2b2lkPn1cclxuXHRcdFx0XHQsIHB1YmxpYyBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlclxyXG5cdFx0XHRcdCwgcHJpdmF0ZSB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pIHtcclxuXHRcdFx0dGhpcy5oYXNWYWxpZGF0b3IgPSB2YWxpZGF0ZSAhPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuY29udGVudEZvcm0gPSB0aGlzLm51bGxGb3JtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhdXRvc2F2ZTogeyAoLi4uZGF0YTogYW55W10pOiBib29sZWFuIH0gPSAoLi4uZGF0YTogYW55W10pOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0uJHByaXN0aW5lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmhhc1ZhbGlkYXRvcikge1xyXG5cdFx0XHRcdHZhbGlkID0gdGhpcy52YWxpZGF0ZSgpO1xyXG5cdFx0XHRcdGlmICh2YWxpZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmFsaWQpIHtcclxuXHRcdFx0XHR0aGlzLmF1dG9zYXZlU2VydmljZS50cmlnZ2VyKHRoaXMuc2F2ZSguLi5kYXRhKS50aGVuKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZW50Rm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBudWxsRm9ybSgpOiBuZy5JRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0XHRyZXR1cm4gPGFueT57XHJcblx0XHRcdFx0JHByaXN0aW5lOiBmYWxzZSxcclxuXHRcdFx0XHQkc2V0UHJpc3RpbmUoKTogdm9pZCB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeygpOiBuZy5JUHJvbWlzZTx2b2lkPn0sIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyLCB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pOiBJQXV0b3NhdmVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0YXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW19fYXV0b3NhdmVBY3Rpb24uc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGF1dG9zYXZlU2VydmljZUZhY3RvcnkoYXV0b3NhdmVTZXJ2aWNlOiBfX2F1dG9zYXZlQWN0aW9uLklBdXRvc2F2ZUFjdGlvblNlcnZpY2UpOiBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZShzYXZlOiB7ICgpOiBuZy5JUHJvbWlzZTx2b2lkPiB9LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7ICgpOiBib29sZWFuIH0pOiBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEF1dG9zYXZlU2VydmljZShhdXRvc2F2ZVNlcnZpY2UsIHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19hdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0aW50ZXJmYWNlIElBdXRvc2F2ZUFjdGlvbk1vY2sge1xyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTx2b2lkPik6IG5nLklQcm9taXNlPHZvaWQ+O1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElNb2NrRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0JHByaXN0aW5lOiBib29sZWFuO1xyXG5cdFx0JHNldFByaXN0aW5lOiBTaW5vbi5TaW5vblNweTtcclxuXHR9XHJcblxyXG5cdGRlc2NyaWJlKCdhdXRvc2F2ZScsICgpID0+IHtcclxuXHRcdHZhciBhdXRvc2F2ZTogSUF1dG9zYXZlU2VydmljZTtcclxuXHRcdHZhciBhdXRvc2F2ZUZhY3Rvcnk6IElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5O1xyXG5cdFx0dmFyIHNhdmVTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIHRyaWdnZXJTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIHNldFByaXN0aW5lU3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciBiYXNlQ29udGVudEZvcm06IElNb2NrRm9ybUNvbnRyb2xsZXI7XHJcblx0XHR2YXIgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2U7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR0cmlnZ2VyU3B5ID0gc2lub24uc3B5KChwcm9taXNlOiBuZy5JUHJvbWlzZTx2b2lkPik6IG5nLklQcm9taXNlPHZvaWQ+ID0+IHsgcmV0dXJuIHByb21pc2U7IH0pO1xyXG5cdFx0XHR2YXIgYXV0b3NhdmVBY3Rpb25TZXJ2aWNlOiBJQXV0b3NhdmVBY3Rpb25Nb2NrID0geyB0cmlnZ2VyOiB0cmlnZ2VyU3B5IH07XHJcblxyXG5cdFx0XHRfX3Rlc3QuYW5ndWxhckZpeHR1cmUubW9jayh7XHJcblx0XHRcdFx0YXV0b3NhdmVBY3Rpb246IGF1dG9zYXZlQWN0aW9uU2VydmljZSxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzZXRQcmlzdGluZVNweSA9IHNpbm9uLnNweSgpO1xyXG5cclxuXHRcdFx0YmFzZUNvbnRlbnRGb3JtID0ge1xyXG5cdFx0XHRcdCRwcmlzdGluZTogZmFsc2UsXHJcblx0XHRcdFx0JHNldFByaXN0aW5lOiBzZXRQcmlzdGluZVNweSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChmYWN0b3J5TmFtZSwgJyRxJywgJyRyb290U2NvcGUnKTtcclxuXHRcdFx0YXV0b3NhdmVGYWN0b3J5ID0gc2VydmljZXNbZmFjdG9yeU5hbWVdO1xyXG5cdFx0XHR2YXIgJHE6IG5nLklRU2VydmljZSA9IHNlcnZpY2VzLiRxO1xyXG5cdFx0XHQkcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHJcblx0XHRcdHNhdmVTcHkgPSBzaW5vbi5zcHkoKCk6IG5nLklQcm9taXNlPHZvaWQ+ID0+IHsgcmV0dXJuICRxLndoZW4oKTsgfSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGNhbGwgc2F2ZSBvbiB0aGUgcGFyZW50IGFuZCBzZXQgdGhlIGZvcm0gdG8gcHJpc3RpbmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGF1dG9zYXZlID0gYXV0b3NhdmVGYWN0b3J5LmdldEluc3RhbmNlKHNhdmVTcHksIDxhbnk+YmFzZUNvbnRlbnRGb3JtKTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzYXZlU3B5KTtcclxuXHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uoc2V0UHJpc3RpbmVTcHkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBub3Qgc2F2ZSBpZiB0aGUgZm9ybSBpcyBwcmlzdGluZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0YXV0b3NhdmUgPSBhdXRvc2F2ZUZhY3RvcnkuZ2V0SW5zdGFuY2Uoc2F2ZVNweSwgPGFueT5iYXNlQ29udGVudEZvcm0pO1xyXG5cclxuXHRcdFx0YmFzZUNvbnRlbnRGb3JtLiRwcmlzdGluZSA9IHRydWU7XHJcblxyXG5cdFx0XHR2YXIgY2xvc2U6IGJvb2xlYW4gPSBhdXRvc2F2ZS5hdXRvc2F2ZSgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNsb3NlKS50by5iZS50cnVlO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChzYXZlU3B5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgdmFsaWRhdGUgdXNpbmcgdGhlIHZhbGlkYXRvciBpZiBvbmUgZXhpc3RzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgdmFsaWRhdGVTcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCgpOiBib29sZWFuID0+IHsgcmV0dXJuIHRydWU7IH0pO1xyXG5cclxuXHRcdFx0YXV0b3NhdmUgPSBhdXRvc2F2ZUZhY3RvcnkuZ2V0SW5zdGFuY2Uoc2F2ZVNweSwgPGFueT5iYXNlQ29udGVudEZvcm0sIHZhbGlkYXRlU3B5KTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh2YWxpZGF0ZVNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHNhdmVTcHkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2l0aG91dCBzYXZpbmcgaWYgdmFsaWRhdGlvbiBmYWlscycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHZhbGlkYXRlU3B5OiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgoKTogYm9vbGVhbiA9PiB7IHJldHVybiBmYWxzZTsgfSk7XHJcblxyXG5cdFx0XHRhdXRvc2F2ZSA9IGF1dG9zYXZlRmFjdG9yeS5nZXRJbnN0YW5jZShzYXZlU3B5LCA8YW55PmJhc2VDb250ZW50Rm9ybSwgdmFsaWRhdGVTcHkpO1xyXG5cclxuXHRcdFx0dmFyIGNsb3NlOiBib29sZWFuID0gYXV0b3NhdmUuYXV0b3NhdmUoKTtcclxuXHJcblx0XHRcdGV4cGVjdChjbG9zZSkudG8uYmUuZmFsc2U7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh2YWxpZGF0ZVNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoc2F2ZVNweSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGFsd2F5cyBzYXZlIGlmIG5vIGZvcm0gaXMgc3BlY2lmaWVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRhdXRvc2F2ZSA9IGF1dG9zYXZlRmFjdG9yeS5nZXRJbnN0YW5jZShzYXZlU3B5KTtcclxuXHJcblx0XHRcdHZhciBjbG9zZTogYm9vbGVhbiA9IGF1dG9zYXZlLmF1dG9zYXZlKCk7XHJcblxyXG5cdFx0XHRleHBlY3QoY2xvc2UpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzYXZlU3B5KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXJyYXkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSVRlc3RPYmoge1xyXG5cdFx0cHJvcDogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElLZXlPYmoge1xyXG5cdFx0a2V5OiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRkZXNjcmliZSgnYXJyYXlVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGFycmF5VXRpbGl0eTogSUFycmF5VXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdGFycmF5VXRpbGl0eSA9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdmaW5kSW5kZXhPZicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBmaW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBpbiBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHByZWRpY2F0ZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mPG51bWJlcj4oYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtICUgMikgPT09IDA7IH0pKS50by5lcXVhbCgxKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mPG51bWJlcj4oYXJyYXksIChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHsgcmV0dXJuIChpdGVtID4gMTApOyB9KSkudG8uZXF1YWwoLTEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdyZW1vdmUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBzcGVjaWZpZWQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgcmV0dXJuIHRoZSBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheTogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAzKSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5Lmxlbmd0aCkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5yZW1vdmUoYXJyYXksIDEwKSkudG8ubm90LmV4aXN0O1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmVtb3ZlIHRoZSBmaXJzdCBpdGVtIG1hdGNoaW5nIHRoZSBwcmVkaWNhdGUgYW5kIHJldHVybiBpdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IG51bWJlcltdID0gWzEsIDIsIDMsIDQsIDVdO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYXJyYXlVdGlsaXR5LnJlbW92ZShhcnJheSwgKGl0ZW06IG51bWJlcik6IGJvb2xlYW4gPT4geyByZXR1cm4gKGl0ZW0gPiAzKTsgfSkpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheS5sZW5ndGgpLnRvLmVxdWFsKDQpO1xyXG5cdFx0XHRcdGV4cGVjdChhcnJheVV0aWxpdHkucmVtb3ZlKGFycmF5LCAoaXRlbTogbnVtYmVyKTogYm9vbGVhbiA9PiB7IHJldHVybiAoaXRlbSA+IDEwKTsgfSkpLnRvLm5vdC5leGlzdDtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgncmVwbGFjZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXBsYWNlIGFuIGl0ZW0gaW4gdGhlIGFycmF5IHdpdGggYW5vdGhlciBpdGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBhcnJheVdpdGhJdGVtczogbnVtYmVyW10gPSBbMywgNSwgN107XHJcblx0XHRcdFx0YXJyYXlVdGlsaXR5LnJlcGxhY2UoYXJyYXlXaXRoSXRlbXMsIDUsIDEwKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzBdKS50by5lcXVhbCgzKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMV0pLnRvLmVxdWFsKDEwKTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMl0pLnRvLmVxdWFsKDcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgZG8gbm90aGluZyBpZiB0aGUgaXRlbSB0byByZXBsYWNlIGlzIG5vdCBmb3VuZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXlXaXRoSXRlbXM6IG51bWJlcltdID0gWzQsIDYsIDhdO1xyXG5cdFx0XHRcdGFycmF5VXRpbGl0eS5yZXBsYWNlKGFycmF5V2l0aEl0ZW1zLCA1LCAxMCk7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChhcnJheVdpdGhJdGVtc1swXSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5V2l0aEl0ZW1zWzFdKS50by5lcXVhbCg2KTtcclxuXHRcdFx0XHRleHBlY3QoYXJyYXlXaXRoSXRlbXNbMl0pLnRvLmVxdWFsKDgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdzdW0nLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgc3VtIHRoZSB2YWx1ZXMgaW4gYW4gYXJyYXknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogbnVtYmVyW10gPSBbMSwgMiwgMywgNCwgNV07XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMTUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgYXBwbHkgYSB0cmFuc2Zvcm0gdG8gdGhlIHZhbHVlcyBiZWZvcmUgc3VtbWluZyB0aGVtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IElUZXN0T2JqW10gPSBbeyBwcm9wOiAxIH0sIHsgcHJvcDogNCB9LCB7IHByb3A6IDcgfV07XHJcblx0XHRcdFx0dmFyIHRyYW5zZm9ybTogeyAoaXRlbTogSVRlc3RPYmopOiBudW1iZXIgfSA9IChpdGVtOiBJVGVzdE9iaik6IG51bWJlciA9PiB7IHJldHVybiBpdGVtLnByb3A7IH07XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzLCB0cmFuc2Zvcm0pKS50by5lcXVhbCgxMik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gMCBpZiB0aGVyZSBhcmUgbm8gaXRlbXMgdG8gc3VtJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IG51bWJlcltdID0gW107XHJcblx0XHRcdFx0ZXhwZWN0KGFycmF5VXRpbGl0eS5zdW0odmFsdWVzKSkudG8uZXF1YWwoMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RvRGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBjb252ZXJ0IGFuIGFycmF5IHRvIGEgZGljdGlvbmFyeScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IElLZXlPYmpbXSA9IFtcclxuXHRcdFx0XHRcdHsga2V5OiAxMSB9LFxyXG5cdFx0XHRcdFx0eyBrZXk6IDEyIH0sXHJcblx0XHRcdFx0XHR7IGtleTogMTMgfSxcclxuXHRcdFx0XHRcdHsga2V5OiAxNCB9LFxyXG5cdFx0XHRcdFx0eyBrZXk6IDE1IH0sXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0dmFyIGRpY3Rpb25hcnk6IElLZXlPYmpbXSA9IGFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkoYXJyYXksIChpdGVtOiBJS2V5T2JqKTogbnVtYmVyID0+IHsgcmV0dXJuIGl0ZW0ua2V5OyB9KTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTFdKS50by5lcXVhbChhcnJheVswXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTJdKS50by5lcXVhbChhcnJheVsxXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTNdKS50by5lcXVhbChhcnJheVsyXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTRdKS50by5lcXVhbChhcnJheVszXSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRpY3Rpb25hcnlbMTVdKS50by5lcXVhbChhcnJheVs0XSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdhdXRvc2F2ZUFjdGlvbicsICgpID0+IHtcclxuXHRcdHZhciBhdXRvc2F2ZUFjdGlvbjogSUF1dG9zYXZlQWN0aW9uU2VydmljZTtcclxuXHRcdHZhciAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlO1xyXG5cdFx0dmFyICRxOiBuZy5JUVNlcnZpY2U7XHJcblx0XHR2YXIgJHJvb3RTY29wZTogbmcuSVNjb3BlO1xyXG5cdFx0dmFyIGRlZmVycmVkOiBuZy5JRGVmZXJyZWQ8dm9pZD47XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUsICckdGltZW91dCcsICckcScsICckcm9vdFNjb3BlJyk7XHJcblx0XHRcdGF1dG9zYXZlQWN0aW9uID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0XHQkdGltZW91dCA9IHNlcnZpY2VzLiR0aW1lb3V0O1xyXG5cdFx0XHQkcSA9IHNlcnZpY2VzLiRxO1xyXG5cdFx0XHQkcm9vdFNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHJcblx0XHRcdGRlZmVycmVkID0gJHEuZGVmZXI8dm9pZD4oKTtcclxuXHJcblx0XHRcdGF1dG9zYXZlQWN0aW9uLnRyaWdnZXIoZGVmZXJyZWQucHJvbWlzZSk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uc2F2aW5nKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgc3VjY2Vzc2Z1bCB0byB0cnVlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzIHN1Y2Nlc3NmdWxseScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5zYXZpbmcpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uY29tcGxldGUpLnRvLmJlLnRydWU7XHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5zdWNjZXNzZnVsKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgc3VjY2Vzc2Z1bCB0byBmYWxzZSBpZiB0aGUgcHJvbWlzZSBmYWlscycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZGVmZXJyZWQucmVqZWN0KCk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLnNhdmluZykudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5jb21wbGV0ZSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGF1dG9zYXZlQWN0aW9uLnN1Y2Nlc3NmdWwpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBzZXQgY29tcGxldGUgdG8gZmFsc2UgYWZ0ZXIgMSBzZWNvbmQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGRlZmVycmVkLnJlc29sdmUoKTtcclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG5cdFx0XHRleHBlY3QoYXV0b3NhdmVBY3Rpb24uY29tcGxldGUpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHQkdGltZW91dC5mbHVzaCgxMDAwKTtcclxuXHJcblx0XHRcdGV4cGVjdChhdXRvc2F2ZUFjdGlvbi5jb21wbGV0ZSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYm9vbGVhblV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiAhIW9iamVjdDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2Jvb2xlYW4uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdib29sZWFuVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBib29sZWFuVXRpbGl0eTogSUJvb2xlYW5VdGlsaXR5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0Ym9vbGVhblV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgndG9Cb29sJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGNvbnZlcnQgbnVsbCBhbmQgdW5kZWZpbmVkIHRvIGZhbHNlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChib29sZWFuVXRpbGl0eS50b0Jvb2wobnVsbCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChib29sZWFuVXRpbGl0eS50b0Jvb2wodW5kZWZpbmVkKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCBsZWF2ZSBib29sIHZhbHVlcyB1bmNoYW5nZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KGJvb2xlYW5VdGlsaXR5LnRvQm9vbChmYWxzZSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChib29sZWFuVXRpbGl0eS50b0Jvb2wodHJ1ZSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIGxnOiBzdHJpbmcgPSAnbGcnO1xyXG5cdGV4cG9ydCB2YXIgbWQ6IHN0cmluZyA9ICdtZCc7XHJcblx0ZXhwb3J0IHZhciBzbTogc3RyaW5nID0gJ3NtJztcclxuXHRleHBvcnQgdmFyIHhzOiBzdHJpbmcgPSAneHMnO1xyXG59XHJcbiIsIi8qXHJcbiAqIEltcGxlbWVudGF0aW9uIGFsc28gcmVxdWlyZXMgdGhlIGZvbGxvd2luZyBlbGVtZW50cyB0byBiZSBpbnNlcnRlZCBvbiB0aGUgcGFnZTpcclxuICogICA8ZGl2IGNsYXNzPVwiZGV2aWNlLXhzIHZpc2libGUteHNcIj48L2Rpdj5cclxuICogICA8ZGl2IGNsYXNzPVwiZGV2aWNlLXNtIHZpc2libGUtc21cIj48L2Rpdj5cclxuICogICA8ZGl2IGNsYXNzPVwiZGV2aWNlLW1kIHZpc2libGUtbWRcIj48L2Rpdj5cclxuICogICA8ZGl2IGNsYXNzPVwiZGV2aWNlLWxnIHZpc2libGUtbGdcIj48L2Rpdj5cclxuICovXHJcblxyXG4gbW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIHZpc2libGVCcmVha3BvaW50c1NlcnZpY2VOYW1lOiBzdHJpbmcgPSAndmlzaWJsZUJyZWFrcG9pbnQnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2Uge1xyXG5cdFx0aXNWaXNpYmxlKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlIGltcGxlbWVudHMgSVZpc2libGVCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRpc1Zpc2libGUoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdC8vIGpxdWVyeSBnZXRzIHRoZSBicmVha3BvaW50IHRyaWdnZXIgZGlyZWN0aXZlcyBsaXN0ZWQgYWJvdmUgb24gbGluZSAzXHJcblx0XHRcdHJldHVybiAkKCcuZGV2aWNlLScgKyBicmVha3BvaW50KS5pcygnOnZpc2libGUnKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdhdGNoZXI8VFJldHVyblR5cGU+IHtcclxuXHRcdGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT47XHJcblx0XHRldmVudD86IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHQoKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IElBY3Rpb248dm9pZD4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXTtcclxuXHRcdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXJ2aWNlIGltcGxlbWVudHMgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdFx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyICE9IG51bGwgJiYgd2F0Y2hlci5ldmVudCA9PT0gZXZlbnQ7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gd2F0Y2hlci5hY3Rpb24uYXBwbHkodGhpcywgcGFyYW1zKTtcclxuXHRcdFx0fSkudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KCk6IElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy53aW5kb3cge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdyc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3dpbmRvd0NvbnRyb2wnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElXaW5kb3dTZXJ2aWNlIHtcclxuXHRcdHJlc2l6ZShjYWxsYmFjazogeyAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogYW55IH0pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgV2luZG93U2VydmljZSB7XHJcblx0XHRwcml2YXRlIHdpbmRvd0NvbnRyb2w6IEpRdWVyeSA9ICQod2luZG93KTtcclxuXHJcblx0XHRyZXNpemUoY2FsbGJhY2s6IHsgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IGFueSB9KTogdm9pZCB7XHJcblx0XHRcdHRoaXMud2luZG93Q29udHJvbC5yZXNpemUoY2FsbGJhY2spO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgV2luZG93U2VydmljZSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2JyZWFrcG9pbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd2aXNpYmxlQnJlYWtwb2ludHMuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3dpbmRvdy93aW5kb3cuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fd2luZG93ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdztcclxuXHRpbXBvcnQgX19vYnNlcnZhYmxlID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGU7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2JyZWFrcG9pbnRzJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQnJlYWtwb2ludFNlcnZpY2Uge1xyXG5cdFx0Y3VycmVudEJyZWFrcG9pbnQ6IHN0cmluZztcclxuXHRcdGlzQnJlYWtwb2ludChicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KGJyZWFrcG9pbnQ6IHN0cmluZyk6IHZvaWR9KTogX19vYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgQnJlYWtwb2ludFNlcnZpY2UgaW1wbGVtZW50cyBJQnJlYWtwb2ludFNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW3Zpc2libGVCcmVha3BvaW50c1NlcnZpY2VOYW1lLCAncmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHMnLCBfX3dpbmRvdy5zZXJ2aWNlTmFtZSwgX19vYnNlcnZhYmxlLmZhY3RvcnlOYW1lXVxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSB2aXNpYmxlQnJlYWtwb2ludHM6IElWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2VcclxuXHRcdFx0XHQsIHJlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzOiBudW1iZXJcclxuXHRcdFx0XHQsIHdpbmRvd1NlcnZpY2U6IF9fd2luZG93LklXaW5kb3dTZXJ2aWNlXHJcblx0XHRcdFx0LCBvYnNlcnZhYmxlRmFjdG9yeTogX19vYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpIHtcclxuXHRcdFx0dGhpcy5jdXJyZW50QnJlYWtwb2ludCA9IHRoaXMuZ2V0QnJlYWtwb2ludCgpO1xyXG5cclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHJcblx0XHRcdHZhciBlZmZpY2llbnRSZXNpemU6IHsoKTogdm9pZH0gPSBfLmRlYm91bmNlKHRoaXMudXBkYXRlQnJlYWtwb2ludCwgcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHMsIHtcclxuXHRcdFx0XHRsZWFkaW5nOiB0cnVlLFxyXG5cdFx0XHRcdHRyYWlsaW5nOiB0cnVlLFxyXG5cdFx0XHRcdG1heFdhaXQ6IHJlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0d2luZG93U2VydmljZS5yZXNpemUoZWZmaWNpZW50UmVzaXplKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG9ic2VydmFibGU6IF9fb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0XHRjdXJyZW50QnJlYWtwb2ludDogc3RyaW5nO1xyXG5cclxuXHRcdHByaXZhdGUgZ2V0QnJlYWtwb2ludCgpOiBzdHJpbmcge1xyXG5cdFx0XHRpZiAodGhpcy52aXNpYmxlQnJlYWtwb2ludHMuaXNWaXNpYmxlKGxnKSkge1xyXG5cdFx0XHRcdHJldHVybiBsZztcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnZpc2libGVCcmVha3BvaW50cy5pc1Zpc2libGUobWQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1kO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudmlzaWJsZUJyZWFrcG9pbnRzLmlzVmlzaWJsZShzbSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gc207XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHhzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aXNCcmVha3BvaW50KGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50QnJlYWtwb2ludCA9PT0gYnJlYWtwb2ludDtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsgKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHZvaWQgfSk6IF9fb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YWJsZS5yZWdpc3RlcihhY3Rpb24sICd3aW5kb3cuYnJlYWtwb2ludENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVwZGF0ZUJyZWFrcG9pbnQ6IHsoKTogdm9pZH0gPSAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBuZXdCcmVha1BvaW50OiBzdHJpbmcgPSB0aGlzLmdldEJyZWFrcG9pbnQoKTtcclxuXHJcblx0XHRcdGlmIChuZXdCcmVha1BvaW50ICE9PSB0aGlzLmN1cnJlbnRCcmVha3BvaW50KSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50QnJlYWtwb2ludCA9IG5ld0JyZWFrUG9pbnQ7XHJcblx0XHRcdFx0dGhpcy5vYnNlcnZhYmxlLmZpcmUoJ3dpbmRvdy5icmVha3BvaW50Q2hhbmdlZCcsIHRoaXMuY3VycmVudEJyZWFrcG9pbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX193aW5kb3cubW9kdWxlTmFtZSwgX19vYnNlcnZhYmxlLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmNvbnN0YW50KCdyZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcycsIDUwMClcclxuXHRcdC5zZXJ2aWNlKHZpc2libGVCcmVha3BvaW50c1NlcnZpY2VOYW1lLCBWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UpXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQnJlYWtwb2ludFNlcnZpY2UpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYnJlYWtwb2ludHMuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRpbnRlcmZhY2UgSVZpc2libGVCcmVha3BvaW50c01vY2sge1xyXG5cdFx0aXNWaXNpYmxlKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSVdpbmRvd1NlcnZpY2VNb2NrIHtcclxuXHRcdHJlc2l6ZShjYWxsYmFjazogeyhldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiBhbnl9KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGRlc2NyaWJlKCdicmVha3BvaW50cycsICgpID0+IHtcclxuXHRcdHZhciBicmVha3BvaW50czogSUJyZWFrcG9pbnRTZXJ2aWNlO1xyXG5cclxuXHRcdHZhciB2aXNpYmxlQnJlYWtwb2ludDogc3RyaW5nO1xyXG5cdFx0dmFyIHRyaWdnZXJSZXNpemU6IHsgKCk6IHZvaWQgfTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgaGF2ZSB2aXNpYmxlIGJyZWFrcG9pbnQgbWFya2VkIGFzIGN1cnJlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZpc2libGVCcmVha3BvaW50ID0gbWQ7XHJcblxyXG5cdFx0XHRidWlsZFNlcnZpY2UoKTtcclxuXHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5jdXJyZW50QnJlYWtwb2ludCkudG8uZXF1YWwobWQpO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KG1kKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludChsZykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KHNtKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQoeHMpKS50by5iZS5mYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgc2lnbmFsIHJlZ2lzdGVyZWQgbGlzdGVuZXJzIHdoZW4gdGhlIGJyZWFrcG9pbnQgY2hhbmdlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGJyZWFrcG9pbnRDaGFuZ2VTcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHR2aXNpYmxlQnJlYWtwb2ludCA9IHNtO1xyXG5cclxuXHRcdFx0YnVpbGRTZXJ2aWNlKCk7XHJcblxyXG5cdFx0XHRicmVha3BvaW50cy5yZWdpc3RlcihicmVha3BvaW50Q2hhbmdlU3B5KTtcclxuXHJcblx0XHRcdHZpc2libGVCcmVha3BvaW50ID0gbWQ7XHJcblx0XHRcdHRyaWdnZXJSZXNpemUoKTtcclxuXHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5jdXJyZW50QnJlYWtwb2ludCkudG8uZXF1YWwobWQpO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KG1kKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGJyZWFrcG9pbnRzLmlzQnJlYWtwb2ludChsZykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoYnJlYWtwb2ludHMuaXNCcmVha3BvaW50KHNtKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdGV4cGVjdChicmVha3BvaW50cy5pc0JyZWFrcG9pbnQoeHMpKS50by5iZS5mYWxzZTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGJyZWFrcG9pbnRDaGFuZ2VTcHkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gYnVpbGRTZXJ2aWNlKCk6IHZvaWQge1xyXG5cdFx0XHR2YXIgbW9ja1Zpc2libGVCcmVha3BvaW50U2VydmljZTogSVZpc2libGVCcmVha3BvaW50c01vY2sgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiAoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYnJlYWtwb2ludCA9PT0gdmlzaWJsZUJyZWFrcG9pbnQ7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBtb2NrV2luZG93Q29udHJvbDogSVdpbmRvd1NlcnZpY2VNb2NrID0ge1xyXG5cdFx0XHRcdHJlc2l6ZTogKGNhbGxiYWNrOiB7ICgpOiB2b2lkIH0pOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdHRyaWdnZXJSZXNpemUgPSBjYWxsYmFjaztcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0X190ZXN0LmFuZ3VsYXJGaXh0dXJlLm1vY2soe1xyXG5cdFx0XHRcdHZpc2libGVCcmVha3BvaW50OiBtb2NrVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlLFxyXG5cdFx0XHRcdHdpbmRvd0NvbnRyb2w6IG1vY2tXaW5kb3dDb250cm9sLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdGJyZWFrcG9pbnRzID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2NvbnRlbnRQcm92aWRlckZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZDtcclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnk7XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3VGV4dDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQ29udGVudFByb3ZpZGVyU2VydmljZSBpbXBsZW1lbnRzIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdGNvbnN0cnVjdG9yKG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpIHtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG9ic2VydmFibGU6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdFx0cHJpdmF0ZSBjb250ZW50OiBKUXVlcnk7XHJcblxyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlLmZpcmUoJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQ6IHsodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkfSA9ICh0cmFuc2NsdWRlRnVuY3Rpb246IG5nLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih0cmFuc2NsdWRlRnVuY3Rpb24pKSB7XHJcblx0XHRcdFx0dHJhbnNjbHVkZUZ1bmN0aW9uKChjbG9uZTogSlF1ZXJ5KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNldENvbnRlbnQoY2xvbmUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0Q29udGVudChudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50ICE9IG51bGwpIHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmFibGUucmVnaXN0ZXIoKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fSwgJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeSB7XHJcblx0XHRcdGlmIChzZWxlY3RvciAhPSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29udGVudC5maWx0ZXIoc2VsZWN0b3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW29ic2VydmFibGUuZmFjdG9yeU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRQcm92aWRlclNlcnZpY2Uob2JzZXJ2YWJsZUZhY3RvcnkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9zaW5vbi9zaW5vbi5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250ZW50UHJvdmlkZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2NvbnRlbnRQcm92aWRlcicsICgpID0+IHtcclxuXHRcdHZhciBjb250ZW50UHJvdmlkZXI6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlO1xyXG5cdFx0dmFyIHRyYW5zY2x1ZGVTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cdFx0dmFyIGZpbHRlclNweTogU2lub24uU2lub25TcHk7XHJcblx0XHR2YXIganF1ZXJ5Q2xvbmU6IGFueTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHZhciBjb250ZW50UHJvdmlkZXJGYWN0b3J5OiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnlcclxuXHRcdFx0XHQ9IHNlcnZpY2VzW3NlcnZpY2VOYW1lXTtcclxuXHRcdFx0Y29udGVudFByb3ZpZGVyID0gY29udGVudFByb3ZpZGVyRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdFx0anF1ZXJ5Q2xvbmUgPSB7fTtcclxuXHRcdFx0ZmlsdGVyU3B5ID0gc2lub24uc3B5KChvYmplY3Q6IGFueSk6IGFueSA9PiB7IHJldHVybiBvYmplY3Q7IH0pO1xyXG5cdFx0XHRqcXVlcnlDbG9uZS5maWx0ZXIgPSBmaWx0ZXJTcHk7XHJcblxyXG5cdFx0XHR0cmFuc2NsdWRlU3B5ID0gc2lub24uc3B5KChmdW5jOiBGdW5jdGlvbikgPT4gZnVuYyhqcXVlcnlDbG9uZSkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIGNvbnRlbnQgdGhhdCB3YXMgc2V0IGJ5IHNldENvbnRlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRDb250ZW50KGpxdWVyeUNsb25lKTtcclxuXHRcdFx0ZXhwZWN0KGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCkpLnRvLmVxdWFsKGpxdWVyeUNsb25lKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgc2V0IHRoZSBjb250ZW50IHRvIHRoZSBjb250ZW50IHByb3ZpZGVkIGJ5IHRoZSB0cmFuc2NsdWRlIGZ1bmN0aW9uJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIuc2V0VHJhbnNjbHVkZUNvbnRlbnQodHJhbnNjbHVkZVNweSk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh0cmFuc2NsdWRlU3B5KTtcclxuXHJcblx0XHRcdGV4cGVjdChjb250ZW50UHJvdmlkZXIuZ2V0Q29udGVudCgpKS50by5lcXVhbChqcXVlcnlDbG9uZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGZpbHRlciB0aGUganF1ZXJ5IG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5zZXRDb250ZW50KGpxdWVyeUNsb25lKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5nZXRDb250ZW50KCdzZWxlY3RvcicpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZmlsdGVyU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZmlsdGVyU3B5LCAnc2VsZWN0b3InKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgY2FsbCB0aGUgYWN0aW9uIHdpdGggdGhlIG5ldyBjb250ZW50IHdoZW4gdGhlIGNvbnRlbnQgY2hhbmdlcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGFjdGlvblNweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdGNvbnRlbnRQcm92aWRlci5yZWdpc3RlcihhY3Rpb25TcHkpO1xyXG5cclxuXHRcdFx0Y29udGVudFByb3ZpZGVyLnNldENvbnRlbnQoanF1ZXJ5Q2xvbmUpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYWN0aW9uU3B5KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoYWN0aW9uU3B5LCBqcXVlcnlDbG9uZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGNhbGwgdGhlIGFjdGlvbiBpbW1lZGlhdGVseSBpZiB0aGVyZSBpcyBhbHJlYWR5IGNvbnRlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBhY3Rpb25TcHk6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIuc2V0Q29udGVudChqcXVlcnlDbG9uZSk7XHJcblxyXG5cdFx0XHRjb250ZW50UHJvdmlkZXIucmVnaXN0ZXIoYWN0aW9uU3B5KTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGFjdGlvblNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGFjdGlvblNweSwganF1ZXJ5Q2xvbmUpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgZGF0ZVNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0XHRuYW1lOiBzdHJpbmc7XHJcblx0XHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdFx0eyBuYW1lOiAnSmFudWFyeScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0FwcmlsJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bHknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vbnRoOiBJTW9udGhbXTtcclxuXHJcblx0XHRwcml2YXRlIGlzTGVhcFllYXIoeWVhcj86IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0XHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0XHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0XHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdFx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxuXHR9O1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2UoZGF0ZVNlcnZpY2VOYW1lLCBEYXRlVXRpbGl0eSlcclxuXHRcdC52YWx1ZShkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ2RhdGVVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGRhdGVVdGlsaXR5OiBJRGF0ZVV0aWxpdHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3QoZGF0ZVNlcnZpY2VOYW1lKTtcclxuXHRcdFx0ZGF0ZVV0aWxpdHkgPSBzZXJ2aWNlc1tkYXRlU2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2dldEZ1bGxTdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgZ2V0IHRoZSBtb250aCBuYW1lJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDApKS50by5lcXVhbCgnSmFudWFyeScpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEpKS50by5lcXVhbCgnRmVicnVhcnknKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZygyKSkudG8uZXF1YWwoJ01hcmNoJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMykpLnRvLmVxdWFsKCdBcHJpbCcpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDQpKS50by5lcXVhbCgnTWF5Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNSkpLnRvLmVxdWFsKCdKdW5lJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNikpLnRvLmVxdWFsKCdKdWx5Jyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoNykpLnRvLmVxdWFsKCdBdWd1c3QnKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyg4KSkudG8uZXF1YWwoJ1NlcHRlbWJlcicpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDkpKS50by5lcXVhbCgnT2N0b2JlcicpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nKDEwKSkudG8uZXF1YWwoJ05vdmVtYmVyJyk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmcoMTEpKS50by5lcXVhbCgnRGVjZW1iZXInKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnZ2V0RGF5cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygwKSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDIpKS50by5lcXVhbCgzMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMykpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg0KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDUpKS50by5lcXVhbCgzMCk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoNikpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cyg3KSkudG8uZXF1YWwoMzEpO1xyXG5cdFx0XHRcdGV4cGVjdChkYXRlVXRpbGl0eS5nZXREYXlzKDgpKS50by5lcXVhbCgzMCk7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoOSkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxMCkpLnRvLmVxdWFsKDMwKTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxMSkpLnRvLmVxdWFsKDMxKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIGFjY291bnQgZm9yIGxlYXAgeWVhcnMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KGRhdGVVdGlsaXR5LmdldERheXMoMSwgMjAxNSkpLnRvLmVxdWFsKDI4KTtcclxuXHRcdFx0XHRleHBlY3QoZGF0ZVV0aWxpdHkuZ2V0RGF5cygxLCAyMDE2KSkudG8uZXF1YWwoMjkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdudW1iZXJVdGlsaXR5JztcclxuXHJcblx0ZW51bSBTaWduIHtcclxuXHRcdHBvc2l0aXZlID0gMSxcclxuXHRcdG5lZ2F0aXZlID0gLTEsXHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElOdW1iZXJVdGlsaXR5IHtcclxuXHRcdHByZWNpc2VSb3VuZChudW06IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgTnVtYmVyVXRpbGl0eSBpbXBsZW1lbnRzIElOdW1iZXJVdGlsaXR5IHtcclxuXHRcdHByZWNpc2VSb3VuZChudW06IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHZhciBzaWduOiBTaWduID0gbnVtID49IDAgPyBTaWduLnBvc2l0aXZlIDogU2lnbi5uZWdhdGl2ZTtcclxuXHRcdFx0cmV0dXJuIChNYXRoLnJvdW5kKChudW0gKiBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKSArICg8bnVtYmVyPnNpZ24gKiAwLjAwMSkpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxzKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgTnVtYmVyVXRpbGl0eSk7XHJcbn1cclxuIiwiXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZSB7XHJcblx0XHRkaXNwbGF5KCk6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGNsYXNzIEZpbGVTaXplU2VydmljZSBpbXBsZW1lbnRzIElGaWxlU2l6ZSB7XHJcblx0XHRCWVRFU19QRVJfR0I6IG51bWJlciA9IDEwNzM3NDE4MjQ7XHJcblx0XHRCWVRFU19QRVJfTUI6IG51bWJlciA9IDEwNDg1NzY7XHJcblx0XHRCWVRFU19QRVJfS0I6IG51bWJlciA9IDEwMjQ7XHJcblxyXG5cdFx0Ynl0ZXM6IG51bWJlcjtcclxuXHJcblx0XHRHQjogbnVtYmVyO1xyXG5cdFx0aXNHQjogYm9vbGVhbjtcclxuXHJcblx0XHRNQjogbnVtYmVyO1xyXG5cdFx0aXNNQjogYm9vbGVhbjtcclxuXHJcblx0XHRLQjogbnVtYmVyO1xyXG5cdFx0aXNLQjogYm9vbGVhbjtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihudW1iZXJVdGlsaXR5OiBudW1iZXIuSU51bWJlclV0aWxpdHksIGJ5dGVzOiBudW1iZXIpIHtcclxuXHRcdFx0dGhpcy5ieXRlcyA9IGJ5dGVzO1xyXG5cclxuXHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0dCKSB7XHJcblx0XHRcdFx0dGhpcy5pc0dCID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLkdCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9HQjtcclxuXHRcdFx0XHR0aGlzLkdCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5HQiwgMSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pc0dCID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9NQikge1xyXG5cdFx0XHRcdFx0dGhpcy5pc01CID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuTUIgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX01CO1xyXG5cdFx0XHRcdFx0dGhpcy5NQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuTUIsIDEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzTUIgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfS0IpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0tCID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5LQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfS0I7XHJcblx0XHRcdFx0XHRcdHRoaXMuS0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLktCLCAxKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaXNLQiA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5ieXRlcyA9IE1hdGgucm91bmQodGhpcy5ieXRlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGlzcGxheSgpOiBzdHJpbmcge1xyXG5cdFx0XHRpZiAodGhpcy5pc0dCKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuR0IgKyAnIEdCJztcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmlzTUIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5NQiArICcgTUInO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuaXNLQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLktCICsgJyBLQic7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYnl0ZXMgKyAnIGJ5dGVzJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemU7XHJcblx0fVxyXG5cclxuXHRmaWxlU2l6ZUZhY3RvcnkuJGluamVjdCA9IFtudW1iZXIuc2VydmljZU5hbWVdO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZhY3RvcnkobnVtYmVyVXRpbGl0eTogbnVtYmVyLklOdW1iZXJVdGlsaXR5KTogSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEZpbGVTaXplU2VydmljZShudW1iZXJVdGlsaXR5LCBieXRlcyk7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIHNpbXBsZUZpbHRlck5hbWU6IHN0cmluZyA9ICdmaWxlU2l6ZSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzaW1wbGVGaWx0ZXJOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmlsdGVyIHtcclxuXHRcdChieXRlcz86IG51bWJlcik6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGZpbGVTaXplRmlsdGVyLiRpbmplY3QgPSBbZmFjdG9yeU5hbWVdO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBmaWxlU2l6ZUZpbHRlcihmaWxlU2l6ZUZhY3Rvcnk6IElGaWxlU2l6ZUZhY3RvcnkpOiBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChieXRlcz86IG51bWJlcik6IHN0cmluZyA9PiB7XHJcblx0XHRcdHZhciBmaWxlU2l6ZTogSUZpbGVTaXplID0gZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKGJ5dGVzKTtcclxuXHRcdFx0cmV0dXJuIGZpbGVTaXplLmRpc3BsYXkoKTtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemVGaWx0ZXIudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW251bWJlci5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBmaWxlU2l6ZUZhY3RvcnkpXHJcblx0XHQuZmlsdGVyKHNpbXBsZUZpbHRlck5hbWUsIGZpbGVTaXplRmlsdGVyKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdGRlc2NyaWJlKCdmaWxlU2l6ZScsICgpID0+IHtcclxuXHRcdHZhciBmaWxlU2l6ZUZhY3Rvcnk6IElGaWxlU2l6ZUZhY3Rvcnk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZhY3RvcnlOYW1lKTtcclxuXHRcdFx0ZmlsZVNpemVGYWN0b3J5ID0gc2VydmljZXNbZmFjdG9yeU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBkZXRlcm1pbmUgYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMSkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBieXRlcycpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwMjMpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEwMjMgYnl0ZXMnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZGV0ZXJtaW5lIGtpbG8gYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTAyNCkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBLQicpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwNDg1NzUpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEwMjQgS0InKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZGV0ZXJtaW5lIG1lZ2EgYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA0ODU3NikuZGlzcGxheSgpKS50by5lcXVhbCgnMSBNQicpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwNzM3NDE4MjMpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEwMjQgTUInKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZGV0ZXJtaW5lIGdpZ2EgYnl0ZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGV4cGVjdChmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoMTA3Mzc0MTgyNCkuZGlzcGxheSgpKS50by5lcXVhbCgnMSBHQicpO1xyXG5cdFx0XHRleHBlY3QoZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlKDEwNzM3NDE4MjUpLmRpc3BsYXkoKSkudG8uZXF1YWwoJzEgR0InKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgSlF1ZXJ5VXRpbGl0eSBpbXBsZW1lbnRzIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHRjb250ZW50QXJlYS5lbXB0eSgpO1xyXG5cdFx0XHRjb250ZW50QXJlYS5hcHBlbmQobmV3Q29udGVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBKUXVlcnlVdGlsaXR5KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nanF1ZXJ5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX190ZXN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Q7XHJcblxyXG5cdGRlc2NyaWJlKCdqcXVlcnlVdGlsaXR5JywgKCkgPT4ge1xyXG5cdFx0dmFyIGpxdWVyeVV0aWxpdHk6IElKUXVlcnlVdGlsaXR5O1xyXG5cdFx0dmFyIGVtcHR5U3B5OiBTaW5vbi5TaW5vblNweTtcclxuXHRcdHZhciBhcHBlbmRTcHk6IFNpbm9uLlNpbm9uU3B5O1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KHNlcnZpY2VOYW1lKTtcclxuXHRcdFx0anF1ZXJ5VXRpbGl0eSA9IHNlcnZpY2VzLmpxdWVyeVV0aWxpdHk7XHJcblxyXG5cdFx0XHRlbXB0eVNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHRhcHBlbmRTcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgZW1wdHkgdGhlIGV4aXN0aW5nIGNvbnRlbnQgYW5kIGFwcGVuZCB0aGUgbmV3IGNvbnRlbnQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBleGlzdGluZ0VsZW1lbnQ6IGFueSA9IHtcclxuXHRcdFx0XHRlbXB0eTogZW1wdHlTcHksXHJcblx0XHRcdFx0YXBwZW5kOiBhcHBlbmRTcHksXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgbmV3Q29udGVudDogYW55ID0ge307XHJcblxyXG5cdFx0XHRqcXVlcnlVdGlsaXR5LnJlcGxhY2VDb250ZW50KGV4aXN0aW5nRWxlbWVudCwgbmV3Q29udGVudCk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShlbXB0eVNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGFwcGVuZFNweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGFwcGVuZFNweSwgbmV3Q29udGVudCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0XHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlcjtcclxuXHRcdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZztcclxuXHRcdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsaXR5U2VydmljZSBpbXBsZW1lbnRzIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0XHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiArc3RyaW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHN1YnN0cmluZykge1xyXG5cdFx0XHRcdHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHJpbmcpICE9PSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcblx0XHRcdF8uZWFjaChwYXJhbXMsIChwYXJhbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0Zm9ybWF0U3RyaW5nID0gdGhpcy5yZXBsYWNlQWxsKGZvcm1hdFN0cmluZywgJ1xcXFx7JyArIGluZGV4ICsgJ1xcXFx9JywgcGFyYW0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGZvcm1hdFN0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFN0cmluZ1V0aWxpdHlTZXJ2aWNlKTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyV2l0aENvdW50cyBleHRlbmRzIElGaWx0ZXIge1xyXG5cdFx0dXBkYXRlT3B0aW9uQ291bnRzPFRJdGVtVHlwZT4oZGF0YTogVEl0ZW1UeXBlW10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9maWx0ZXJzL2ZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlcic7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9ICdzZWFyY2gnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyIGV4dGVuZHMgZmlsdGVyLklGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbjtcclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgR2VuZXJpY1NlYXJjaEZpbHRlciBpbXBsZW1lbnRzIElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZyA9IGZpbHRlck5hbWU7XHJcblx0XHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0XHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBvYmplY3Q6IG9iamVjdC5JT2JqZWN0VXRpbGl0eSwgcHJpdmF0ZSBzdHJpbmc6IHN0cmluZy5JU3RyaW5nVXRpbGl0eVNlcnZpY2UpIHt9XHJcblxyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLm9iamVjdC5pc051bGxPckVtcHR5KHRoaXMuc2VhcmNoVGV4dCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHNlYXJjaE9iamVjdDxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSwgc2VhcmNoOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuXHRcdFx0XHR2YXIgdmFsdWVzOiBhbnkgPSBfLnZhbHVlcyhpdGVtKTtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkodmFsdWVzLCAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4geyByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkYXRhU3RyaW5nOiBzdHJpbmcgPSB0aGlzLm9iamVjdC50b1N0cmluZyhpdGVtKTtcclxuXHJcblx0XHRcdFx0aWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0XHRzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRcdGRhdGFTdHJpbmcgPSBkYXRhU3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdHJpbmcuY29udGFpbnMoZGF0YVN0cmluZywgc2VhcmNoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcblx0fVxyXG5cclxuXHRnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS4kaW5qZWN0ID0gW29iamVjdC5zZXJ2aWNlTmFtZSwgc3RyaW5nLnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeShvYmplY3Q6IG9iamVjdC5JT2JqZWN0VXRpbGl0eSxcclxuXHRcdHN0cmluZ1V0aWxpdHk6IHN0cmluZy5JU3RyaW5nVXRpbGl0eVNlcnZpY2UpOiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBHZW5lcmljU2VhcmNoRmlsdGVyKG9iamVjdCwgc3RyaW5nVXRpbGl0eSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0Lm1vZHVsZU5hbWUsIHN0cmluZy5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdnZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW50ZXJmYWNlIElUZXN0T2JqZWN0IHtcclxuXHRcdHByb3A6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJVGVzdE9iamVjdDIge1xyXG5cdFx0cHJvcDE/OiBudW1iZXI7XHJcblx0XHRwcm9wMj86IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTmVzdGVkVGVzdE9iamVjdCB7XHJcblx0XHRuZXN0ZWRPYmplY3Q6IElUZXN0T2JqZWN0MjtcclxuXHR9XHJcblxyXG5cdGRlc2NyaWJlKCdnZW5lcmljU2VhcmNoRmlsdGVyJywgKCkgPT4ge1xyXG5cdFx0dmFyIGdlbmVyaWNTZWFyY2hGaWx0ZXI6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZhY3RvcnlOYW1lKTtcclxuXHRcdFx0dmFyIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5OiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkgPSBzZXJ2aWNlc1tmYWN0b3J5TmFtZV07XHJcblx0XHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIgPSBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBpbmNsdWRlIGFsbCBpdGVtcyBpZiBxdWVyeSBpcyBudWxsIG9yIGVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSBudWxsO1xyXG5cclxuXHRcdFx0dmFyIG9iamVjdDE6IElUZXN0T2JqZWN0ID0ge1xyXG5cdFx0XHRcdHByb3A6ICdzb21lIHN0cmluZycsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgb2JqZWN0MjogSVRlc3RPYmplY3QgPSB7XHJcblx0XHRcdFx0cHJvcDogJ2Fub3RoZXIgdmFsdWUnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdDEpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0MikpLnRvLmJlLnRydWU7XHJcblxyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnJztcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdDEpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0MikpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHNlYXJjaCB0aGUgYWN0dWFsIGRhdGEgdmFsdWVzIGlmIHRoZXkgYXJlbnQgb2JqZWN0cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gJzInO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKDEpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKDIpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoMykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoNCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIoNSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBpbmNsdWRlIGl0ZW1zIHRoYXQgY29udGFpbiB0aGUgc2VhcmNoIHN0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5zZWFyY2hUZXh0ID0gJ215JztcclxuXHRcdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5jYXNlU2Vuc2l0aXZlID0gdHJ1ZTtcclxuXHRcdFx0dmFyIG1hdGNoaW5nT2JqZWN0MTogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AyOiAnbXkgc3RyaW5nJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBtYXRjaGluZ09iamVjdDI6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMTogNSxcclxuXHRcdFx0XHRwcm9wMjogJ3NvbWUgc3RyaW5nIHdpdGggbXknLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG9iamVjdFdpdGhvdXRTZWFyY2hTdHJpbmc6IElUZXN0T2JqZWN0MiA9IHtcclxuXHRcdFx0XHRwcm9wMTogMixcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBvYmplY3RXaXRoRGlmZmVyZW50Q2FzZTogSVRlc3RPYmplY3QyID0ge1xyXG5cdFx0XHRcdHByb3AxOiA1LFxyXG5cdFx0XHRcdHByb3AyOiAnTVkgc3RyaW5nJyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGV4cGVjdChnZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlcihtYXRjaGluZ09iamVjdDEpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0V2l0aG91dFNlYXJjaFN0cmluZykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIobWF0Y2hpbmdPYmplY3QyKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0ZXhwZWN0KGdlbmVyaWNTZWFyY2hGaWx0ZXIuZmlsdGVyKG9iamVjdFdpdGhEaWZmZXJlbnRDYXNlKSkudG8uYmUuZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIGluY2x1ZGUgaXRlbXMgdGhhdCBjb250YWluIHRoZSBzZWFyY2ggc3RyaW5nLCBjYXNlIGluc2Vuc2l0aXZlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnbXknO1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLmNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcclxuXHRcdFx0dmFyIGxvd2VyY2FzZU1hdGNoOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDI6ICdteSBzdHJpbmcnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIHVwcGVyY2FzZU1hdGNoOiBJVGVzdE9iamVjdDIgPSB7XHJcblx0XHRcdFx0cHJvcDE6IDIuMixcclxuXHRcdFx0XHRwcm9wMjogJ01ZIHN0cmluZycsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIobG93ZXJjYXNlTWF0Y2gpKS50by5iZS50cnVlO1xyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIodXBwZXJjYXNlTWF0Y2gpKS50by5iZS50cnVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZWN1cnNpdmVseSBzZWFyY2ggdGhlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaFRleHQgPSAnbXknO1xyXG5cdFx0XHRnZW5lcmljU2VhcmNoRmlsdGVyLmNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcclxuXHRcdFx0dmFyIG9iamVjdFdpdGhOZXN0ZWRPYmplY3Q6IElOZXN0ZWRUZXN0T2JqZWN0ID0ge1xyXG5cdFx0XHRcdG5lc3RlZE9iamVjdDoge1xyXG5cdFx0XHRcdFx0cHJvcDI6ICdteSBzdHJpbmcnLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRleHBlY3QoZ2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIob2JqZWN0V2l0aE5lc3RlZE9iamVjdCkpLnRvLmJlLnRydWU7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL21vY2hhL21vY2hhLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhck1vY2tzLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaUFzc2VydGlvbnMuZC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnbnVtYmVyVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBudW1iZXJVdGlsaXR5OiBJTnVtYmVyVXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdG51bWJlclV0aWxpdHkgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgncHJlY2lzZVJvdW5kJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJvdW5kIDYgdG8gNicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoNiwgMik7XHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDYpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcm91bmQgMS4yNzUgdG8gMS4yOCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS4yNzUsIDIpO1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgxLjI4KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJvdW5kIDEuMjc0IHRvIDEuMjcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHJvdW5kZWROdW06IG51bWJlciA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKDEuMjc0LCAyKTtcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS4yNyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByb3VuZCAxLjU1NTU1NTU1NTU1NTU1NTU1NTU1IHRvIDEuNTU1NTU1NTU1NTU1NTU1NTU1NicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHQvLyAyMCA1J3MuIFRoaXMgaXMgdGhlIG1heCBwcmVjaXNpb24gcHJlY2lzZV9yb3VuZCBpcyB2YWxpZCBmb3JcclxuXHRcdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS41NTU1NTU1NTU1NTU1NTU1NTU1NSwgMTkpO1xyXG5cdFx0XHRcdGV4cGVjdChyb3VuZGVkTnVtKS50by5lcXVhbCgxLjU1NTU1NTU1NTU1NTU1NTU1NTYpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcm91bmQgMS45OTk5OTk5OTk5OTk5OTk5OTk5OTkgdG8gMicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgcm91bmRlZE51bTogbnVtYmVyID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQoMS45OTk5OTk5OTk5OTk5OTk5OTk5OTksIDIwKTsgLy8gMjEgOSdzXHJcblx0XHRcdFx0ZXhwZWN0KHJvdW5kZWROdW0pLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgbm90IHJvdW5kIDEuMTExMTExMTExMTExMTExMTExMTExJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciByb3VuZGVkTnVtOiBudW1iZXIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCgxLjExMTExMTExMTExMTExMTExMTExMSwgMjApOyAvLyAyMSAxJ3NcclxuXHRcdFx0XHRleHBlY3Qocm91bmRlZE51bSkudG8uZXF1YWwoMS4xMTExMTExMTExMTExMTExMTExMSk7XHQvLyB0cmltbWVkIDEgZnJvbSB0aGUgZW5kXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYmplY3Quc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ29iamVjdFV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgb2JqZWN0VXRpbGl0eTogSU9iamVjdFV0aWxpdHk7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRvYmplY3RVdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2lzTnVsbE9yRW1wdHknLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBudWxsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkobnVsbCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIGVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJycpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gc3RyaW5nIGhhcyBjb250ZW50cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KCdyYW5kb20gc3RyaW5nJykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIG51bGwgb3IgZW1wdHkgYXJyYXlzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkobnVsbCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShbXSkpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eShbMSwgMiwgM10pKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIG51bWJlciB0eXBlIGlzIG5vdCBhIG51bWJlcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KE51bWJlci5OYU4pKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoNSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdpc051bGxPcldoaXRlc3BhY2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIGVtcHR5IHdoaXRlc3BhY2Ugc3RyaW5ncycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoJyAgICcpKS50by5iZS50cnVlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgaGFuZGxlIG51bGwgYW5kIGVtcHR5IG9iamVjdHMgbGlrZSBpc051bGxPckVtcHR5JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShudWxsKSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KG51bGwpKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoW10pKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoW10pKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2Uoe30pKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoe30pKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoJycpKS50by5lcXVhbChvYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkoJycpKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoJ3JhbmRvbSBzdHJpbmcnKSkudG8uZXF1YWwob2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5KCdyYW5kb20gc3RyaW5nJykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdhcmVFcXVhbCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0d28gcHJpbWl0aXZlcyBhcmUgZXF1YWwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHN0cmluZzE6IHN0cmluZyA9ICdhYmMnO1xyXG5cdFx0XHRcdHZhciBzdHJpbmcyOiBzdHJpbmcgPSAnYWJjJztcclxuXHRcdFx0XHR2YXIgbnVtMTogbnVtYmVyID0gMTtcclxuXHRcdFx0XHR2YXIgbnVtMjogbnVtYmVyID0gMTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChzdHJpbmcxLCBzdHJpbmcyKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChudW0xLCBudW0yKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0d28gb2JqZWN0cyBhcmUgbm90IG9mIHRoZSBzYW1lIHR5cGUnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHN0cmluZzogc3RyaW5nID0gJ2FiYyc7XHJcblx0XHRcdFx0dmFyIG51bTogbnVtYmVyID0gMTtcclxuXHRcdFx0XHR2YXIgb2JqOiBhbnkgPSB7fTtcclxuXHRcdFx0XHR2YXIgYXJyYXk6IGFueVtdID0gW107XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwoc3RyaW5nLCBudW0pKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChzdHJpbmcsIG9iaikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKHN0cmluZywgYXJyYXkpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChudW0sIG9iaikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG51bSwgYXJyYXkpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHQvL29iaiBhbmQgYXJyYXkgYXJlIGNvbnNpZGVyZWQgdGhlIHNhbWUgdHlwZVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIG9uZSBvYmplY3QgaXMgdmFsaWQgYW5kIHRoZSBvdGhlciBpcyBudWxsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBvYmo6IGFueSA9IHsgJzEnOiAxLCAnMic6IDIgfTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmosIG51bGwpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBhcnJheXMgaGF2ZSBkaWZmZXJlbnQgbGVuZ3RocycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYXJyYXkxOiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHRcdFx0XHR2YXIgYXJyYXkyOiBudW1iZXJbXSA9IFsxLCAyLCAzXTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChhcnJheTEsIGFycmF5MikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgY29tcGFyZSBhcnJheXMgYnkgZWxlbWVudCBpZiB0aGV5IGFyZSB0aGUgc2FtZSBsZW5ndGgnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGFycmF5OiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHRcdFx0XHR2YXIgc2ltaWxhckFycmF5OiBudW1iZXJbXSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuXHRcdFx0XHR2YXIgZGlmZmVyZW50QXJyYXk6IG51bWJlcltdID0gWzUsIDQsIDMsIDIsIDFdO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKGFycmF5LCBzaW1pbGFyQXJyYXkpKS50by5iZS50cnVlO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKGFycmF5LCBkaWZmZXJlbnRBcnJheSkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgdXNlIHRoZSBrZXlzIGZyb20gdGhlIGZpcnN0IG9iamVjdCB0byBjb21wYXJlIHByb3BlcnRpZXMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIG9iamVjdDogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIHNpbWlsYXJPYmplY3Q6IGFueSA9IHtcclxuXHRcdFx0XHRcdCcyJzogMixcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHZhciBkaWZmZXJlbnRPYmplY3Q6IGFueSA9IHtcclxuXHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdCd0d28nOiAyLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqZWN0LCBzaW1pbGFyT2JqZWN0KSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QsIGRpZmZlcmVudE9iamVjdCkpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIG9iamVjdCAyIGhhcyB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgMSB3aXRoIGFkZGl0aW9uYWwgcHJvcGVydGllcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgb2JqZWN0MTogYW55ID0ge1xyXG5cdFx0XHRcdFx0JzEnOiAxLFxyXG5cdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIG9iamVjdDI6IGFueSA9IHtcclxuXHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdCcyJzogMixcclxuXHRcdFx0XHRcdCczJzogMyxcclxuXHRcdFx0XHRcdCc0JzogNCxcclxuXHRcdFx0XHRcdCc1JzogNSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LmFyZUVxdWFsKG9iamVjdDEsIG9iamVjdDIpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJlY3Vyc2l2ZWx5IGNvbXBhcmUgbmVzdGVkIG9iamVjdHMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIG9iamVjdDogYW55ID0ge1xyXG5cdFx0XHRcdFx0bmVzdGVkT2JqOiB7XHJcblx0XHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG5lc3RlZEFycmF5OiBbMSwgMiwgM10sXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgc2ltaWxhck9iamVjdDogYW55ID0ge1xyXG5cdFx0XHRcdFx0bmVzdGVkT2JqOiB7XHJcblx0XHRcdFx0XHRcdCcxJzogMSxcclxuXHRcdFx0XHRcdFx0JzInOiAyLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG5lc3RlZEFycmF5OiBbMSwgMiwgM10sXHJcblx0XHRcdFx0XHQnMyc6IDMsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR2YXIgZGlmZmVyZW50T2JqZWN0MTogYW55ID0ge1xyXG5cdFx0XHRcdFx0bmVzdGVkT2JqOiB7XHJcblx0XHRcdFx0XHRcdCdvbmUnOiAxLFxyXG5cdFx0XHRcdFx0XHQndHdvJzogMixcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRuZXN0ZWRBcnJheTogWzEsIDIsIDNdLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVudE9iamVjdDI6IGFueSA9IHtcclxuXHRcdFx0XHRcdG5lc3RlZE9iajoge1xyXG5cdFx0XHRcdFx0XHQnMSc6IDEsXHJcblx0XHRcdFx0XHRcdCcyJzogMixcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRuZXN0ZWRBcnJheTogWzEsIDIsIDMsIDQsIDVdLFxyXG5cdFx0XHRcdFx0JzMnOiAzLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZXhwZWN0KG9iamVjdFV0aWxpdHkuYXJlRXF1YWwob2JqZWN0LCBzaW1pbGFyT2JqZWN0KSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QsIGRpZmZlcmVudE9iamVjdDEpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS5hcmVFcXVhbChvYmplY3QsIGRpZmZlcmVudE9iamVjdDIpKS50by5iZS5mYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgndG9TdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgdHVybiBudW1iZXJzIGludG8gc3RyaW5ncycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS50b1N0cmluZyg1KSkudG8uZXF1YWwoJzUnKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS50b1N0cmluZygyLjUpKS50by5lcXVhbCgnMi41Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCB0dXJuIGJvb2xlYW5zIGludG8gc3RyaW5ncycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS50b1N0cmluZyhmYWxzZSkpLnRvLmVxdWFsKCdmYWxzZScpO1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKHRydWUpKS50by5lcXVhbCgndHJ1ZScpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgdHVybiB1bmRlZmluZWQgYW5kIG51bGwgaW50byBzdHJpbmdzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChvYmplY3RVdGlsaXR5LnRvU3RyaW5nKHVuZGVmaW5lZCkpLnRvLmVxdWFsKCd1bmRlZmluZWQnKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS50b1N0cmluZyhudWxsKSkudG8uZXF1YWwoJ251bGwnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgndmFsdWVPckRlZmF1bHQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRoZSB2YWx1ZSBpZiBpdCBpcyBkZWZpbmVkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBzb21lT2JqZWN0OiBhbnkgPSB7IGV4aXN0aW5nUHJvcGVydHk6ICd2YWx1ZScgfTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdChzb21lT2JqZWN0LmV4aXN0aW5nUHJvcGVydHksICdkZWZhdWx0JykpLnRvLmVxdWFsKCd2YWx1ZScpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgcmV0dXJuIHRoZSBkZWZhdWx0IGlmIHRoZSB2YWx1ZSBpcyBub3QgZGVmaW5lZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgc29tZU9iamVjdDogYW55ID0geyBudWxsUHJvcGVydHk6IG51bGwgfTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdChzb21lT2JqZWN0Lm51bGxQcm9wZXJ0eSwgJ2RlZmF1bHQnKSkudG8uZXF1YWwoJ2RlZmF1bHQnKTtcclxuXHRcdFx0XHRleHBlY3Qob2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdChzb21lT2JqZWN0Lm1pc3NpbmdQcm9wZXJ0eSwgJ2RlZmF1bHQnKSkudG8uZXF1YWwoJ2RlZmF1bHQnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWkvY2hhaS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL3Npbm9uL3Npbm9uLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0ZGVzY3JpYmUoJ29ic2VydmFibGUnLCAoKSA9PiB7XHJcblx0XHR2YXIgb2JzZXJ2YWJsZTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cclxuXHRcdGJlZm9yZUVhY2goKCkgPT4ge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKG1vZHVsZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSBfX3Rlc3QuYW5ndWxhckZpeHR1cmUuaW5qZWN0KGZhY3RvcnlOYW1lKTtcclxuXHRcdFx0dmFyIG9ic2VydmFibGVGYWN0b3J5OiBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5ID0gc2VydmljZXNbZmFjdG9yeU5hbWVdO1xyXG5cdFx0XHRvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmVnaXN0ZXIgYSB3YXRjaGVyIGFuZCBjYWxsIHRoZSBhY3Rpb24gd2hlbiBmaXJlIGlzIGNhbGxlZCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMpO1xyXG5cdFx0XHRvYnNlcnZhYmxlLmZpcmUoKTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZ1bmMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCB1bnJlZ2lzdGVyIG9ubHkgdGhlIGluZGljYXRlZCB3YXRjaGVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgcmVnaXN0ZXJlZEZ1bmMxOiBTaW5vbi5TaW5vblNweSA9IHNpbm9uLnNweSgpO1xyXG5cdFx0XHR2YXIgdW5yZWdpc3RlcmVkRnVuYzogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdFx0dmFyIHJlZ2lzdGVyZWRGdW5jMjogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIocmVnaXN0ZXJlZEZ1bmMxKTtcclxuXHRcdFx0dmFyIGNhbmNlbDogKCkgPT4gdm9pZCA9IG9ic2VydmFibGUucmVnaXN0ZXIodW5yZWdpc3RlcmVkRnVuYyk7XHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIocmVnaXN0ZXJlZEZ1bmMyKTtcclxuXHJcblx0XHRcdGNhbmNlbCgpO1xyXG5cclxuXHRcdFx0b2JzZXJ2YWJsZS5maXJlKCk7XHJcblxyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShyZWdpc3RlcmVkRnVuYzEpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQubm90Q2FsbGVkKHVucmVnaXN0ZXJlZEZ1bmMpO1xyXG5cdFx0XHRzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShyZWdpc3RlcmVkRnVuYzIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCBvbmx5IGNhbGwgd2F0Y2hlciByZWdpc3RlcmVkIHdpdGggdGhlIHNwZWNpZmllZCBldmVudCBpZiBmaXJlIGlzIGNhbGxlZCB3aXRoIGFuIGV2ZW50JywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgZnVuY1dpdGhFdmVudDogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdFx0dmFyIGZ1bmNXaXRob3V0RXZlbnQ6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmNXaXRoRXZlbnQsICdteUV2ZW50Jyk7XHJcblx0XHRcdG9ic2VydmFibGUucmVnaXN0ZXIoZnVuY1dpdGhvdXRFdmVudCk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgnbXlFdmVudCcpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChmdW5jV2l0aG91dEV2ZW50KTtcclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZnVuY1dpdGhFdmVudCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIG5vdCBjYWxsIHdhdGNoZXJzIHJlZ2lzdGVyZWQgd2l0aCBhIGRpZmZlcmVudCBldmVudCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMsICdteUV2ZW50Jyk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgnb3RoZXJFdmVudCcpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0Lm5vdENhbGxlZChmdW5jKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgY2FsbCB0aGUgcmVnaXN0ZXJlZCB3YXRjaGVycyB3aXRoIHRoZSBhZGRpdGlvbmFsIHBhcmFtcyBwYXNzZWQgaW50byB0aGUgZmlyZSBmdW5jdGlvbicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIGZ1bmM6IFNpbm9uLlNpbm9uU3B5ID0gc2lub24uc3B5KCk7XHJcblxyXG5cdFx0XHRvYnNlcnZhYmxlLnJlZ2lzdGVyKGZ1bmMsICdteUV2ZW50Jyk7XHJcblx0XHRcdG9ic2VydmFibGUuZmlyZSgnbXlFdmVudCcsIDEsIDIsIDMsIDQsIDUpO1xyXG5cclxuXHRcdFx0c2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZnVuYyk7XHJcblxyXG5cdFx0XHR2YXIgYXJnczogbnVtYmVyW10gPSBmdW5jLmZpcnN0Q2FsbC5hcmdzO1xyXG5cdFx0XHRleHBlY3QoYXJnc1swXSkudG8uZXF1YWwoMSk7XHJcblx0XHRcdGV4cGVjdChhcmdzWzFdKS50by5lcXVhbCgyKTtcclxuXHRcdFx0ZXhwZWN0KGFyZ3NbMl0pLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHRleHBlY3QoYXJnc1szXSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdGV4cGVjdChhcmdzWzRdKS50by5lcXVhbCg1KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHdpdGggYW4gZXJyb3IgaWYgbm8gZnVuY3Rpb24gaXMgcHJvdmlkZWQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdHZhciBvcmlnaW5hbExvZzogKG1lc3NhZ2U/OiBzdHJpbmcpID0+IHZvaWQgPSBjb25zb2xlLmxvZztcclxuXHRcdFx0dmFyIGxvZ1NweTogU2lub24uU2lub25TcHkgPSBzaW5vbi5zcHkoKTtcclxuXHRcdFx0Y29uc29sZS5sb2cgPSBsb2dTcHk7XHJcblxyXG5cdFx0XHR2YXIgY2FuY2VsOiAoKSA9PiB2b2lkID0gb2JzZXJ2YWJsZS5yZWdpc3RlcihudWxsKTtcclxuXHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGxvZ1NweSk7XHJcblx0XHRcdHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGxvZ1NweSwgJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cclxuXHRcdFx0ZXhwZWN0KGNhbmNlbCkudG8uYmUubnVsbDtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nID0gb3JpZ2luYWxMb2c7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3Ige1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWaWV3RGF0YTxUQmVoYXZpb3I+IHtcclxuXHRcdGJlaGF2aW9yOiBUQmVoYXZpb3I7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDaGlsZDxUQmVoYXZpb3I+IHtcclxuXHRcdHZpZXdEYXRhPzogSVZpZXdEYXRhPFRCZWhhdmlvcj47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0XHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yO1xyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxhbnk+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlO1xyXG5cdFx0dHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXVxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdFx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXTtcclxuXHRcdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciB7XHJcblx0XHRcdHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcblx0XHRcdFx0PyBjaGlsZC52aWV3RGF0YS5iZWhhdmlvclxyXG5cdFx0XHRcdDogbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR0cmlnZ2VyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj5cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGUge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3I6IFRCZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcblxyXG5cdFx0XHRpZiAoYmVoYXZpb3IgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXVxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yczogVEJlaGF2aW9yW10gPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gXy5tYXAoYmVoYXZpb3JzLCAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXSB7XHJcblx0XHRcdHJldHVybiBfKGNoaWxkTGlzdCkubWFwKChjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3IgPT4geyByZXR1cm4gdGhpcy5nZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LmZpbHRlcigoYmVoYXZpb3I6IFRCZWhhdmlvcik6IGJvb2xlYW4gPT4geyByZXR1cm4gYmVoYXZpb3IgIT0gbnVsbDsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC52YWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQge1xyXG5cdFx0XHRpZiAoY2hpbGQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNoaWxkLnZpZXdEYXRhID09IG51bGwpIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGN1cnJlbnRCZWhhdmlvcjogVEJlaGF2aW9yID0gY2hpbGQudmlld0RhdGEuYmVoYXZpb3I7XHJcblxyXG5cdFx0XHRpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gPFRCZWhhdmlvcj5fLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX3Rlc3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdDtcclxuXHJcblx0aW50ZXJmYWNlIElUZXN0QmVoYXZpb3Ige1xyXG5cdFx0YWN0aW9uOiBGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGRlc2NyaWJlKCdwYXJlbnRDaGlsZEJlaGF2aW9yJywgKCkgPT4ge1xyXG5cdFx0dmFyIHBhcmVudENoaWxkQmVoYXZpb3I6IElQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHBhcmVudENoaWxkQmVoYXZpb3IgPSBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV07XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgncmVnaXN0ZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmVnaXN0ZXIgYSBjaGlsZCBiZWhhdmlvciBieSBwdXR0aW5nIGl0IG9uIHRoZSB2aWV3IGRhdGEgb2YgdGhlIGNoaWxkJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogbnVsbCB9O1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHJcblx0XHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5yZWdpc3RlckNoaWxkQmVoYXZpb3IoY2hpbGQsIGJlaGF2aW9yKTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yKS50by5lcXVhbChiZWhhdmlvcik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aXQoJ3Nob3VsZCB1c2UgdGhlIGV4aXN0aW5nIHZpZXdEYXRhIG9iamVjdCBpZiBvbmUgZXhpc3RzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBjaGlsZFdpdGhWaWV3RGF0YTogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0gPGFueT57IHZpZXdEYXRhOiB7IHJhbmRvbVZhbHVlOiA1IH0gfTtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiA1OyB9IH07XHJcblxyXG5cdFx0XHRcdHBhcmVudENoaWxkQmVoYXZpb3IucmVnaXN0ZXJDaGlsZEJlaGF2aW9yKGNoaWxkV2l0aFZpZXdEYXRhLCBiZWhhdmlvcik7XHJcblxyXG5cdFx0XHRcdGV4cGVjdChjaGlsZFdpdGhWaWV3RGF0YS52aWV3RGF0YS5iZWhhdmlvcikudG8uZXF1YWwoYmVoYXZpb3IpO1xyXG5cdFx0XHRcdGV4cGVjdCgoPGFueT5jaGlsZFdpdGhWaWV3RGF0YS52aWV3RGF0YSkucmFuZG9tVmFsdWUpLnRvLmVxdWFsKDUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgbm90IHJlZ2lzdGVyIGNoaWxkIGJlaGF2aW9yIGlmIGNoaWxkIG9iamVjdCBpcyBudWxsJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGQ6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IG51bGw7XHJcblx0XHRcdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5yZWdpc3RlckNoaWxkQmVoYXZpb3IoY2hpbGQsIGJlaGF2aW9yKTtcclxuXHRcdFx0XHRleHBlY3QocGFyZW50Q2hpbGRCZWhhdmlvci5nZXRDaGlsZEJlaGF2aW9yKGNoaWxkKSkudG8uYmUubnVsbDtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZXNjcmliZSgnZ2V0Q2hpbGRCZWhhdmlvcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCBnZXQgdGhlIGJlaGF2aW9yIG9mIGFuIGluZGl2aWR1YWwgY2hpbGQnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMTogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDM7IH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGQ6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMSB9IH07XHJcblxyXG5cdFx0XHRcdGV4cGVjdChwYXJlbnRDaGlsZEJlaGF2aW9yLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpKS50by5lcXVhbChiZWhhdmlvcjEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGl0KCdzaG91bGQgZ2V0IGV4aXN0aW5nIGJlaGF2aW9ycyBmb3IgYSBsaXN0IG9mIGNoaWxkcmVuJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjE6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAzOyB9IH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDc7IH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGRMaXN0OiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj5bXSA9IFtcclxuXHRcdFx0XHRcdHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMSB9IH0sXHJcblx0XHRcdFx0XHR7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBudWxsIH0gfSxcclxuXHRcdFx0XHRcdHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMiB9IH0sXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yczogSVRlc3RCZWhhdmlvcltdID0gcGFyZW50Q2hpbGRCZWhhdmlvci5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JzLmxlbmd0aCkudG8uZXF1YWwoMik7XHJcblx0XHRcdFx0ZXhwZWN0KGJlaGF2aW9yc1swXSkudG8uZXF1YWwoYmVoYXZpb3IxKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JzWzFdKS50by5lcXVhbChiZWhhdmlvcjIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd0cmlnZ2VyQ2hpbGRCZWhhdmlvcicsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCB0cmlnZ2VyIHRoZSBzcGVjaWZpZWQgY2hpbGQgYWN0aW9uIGFuZCByZXR1cm4gdGhlIHJlc3VsdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IxOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IxIH0gfTtcclxuXHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yUmVzdWx0OiBudW1iZXIgPSBwYXJlbnRDaGlsZEJlaGF2aW9yLnRyaWdnZXJDaGlsZEJlaGF2aW9yKGNoaWxkLFxyXG5cdFx0XHRcdFx0KGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yKTogbnVtYmVyID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBiZWhhdmlvci5hY3Rpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGJlaGF2aW9yUmVzdWx0KS50by5lcXVhbCgzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIHRoZSBiZWhhdmlvciBkb2VzIG5vdCBleGlzdCcsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgY2hpbGQ6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgfTtcclxuXHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yUmVzdWx0OiBudW1iZXIgPSBwYXJlbnRDaGlsZEJlaGF2aW9yLnRyaWdnZXJDaGlsZEJlaGF2aW9yKGNoaWxkLFxyXG5cdFx0XHRcdFx0KGJlaGF2aW9yOiBJVGVzdEJlaGF2aW9yKTogbnVtYmVyID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBiZWhhdmlvci5hY3Rpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KGJlaGF2aW9yUmVzdWx0KS50by5iZS5udWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCd0cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgdHJpZ2dlciB0aGUgc3BlY2lmaWVkIGNoaWxkIGFjdGlvbnMgYW5kIHJldHVybiB0aGUgcmVzdWx0cycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgYmVoYXZpb3IxOiBJVGVzdEJlaGF2aW9yID0geyBhY3Rpb246ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMTsgfSB9O1xyXG5cdFx0XHRcdHZhciBjaGlsZDE6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgdmlld0RhdGE6IHsgYmVoYXZpb3I6IGJlaGF2aW9yMSB9IH07XHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yMjogSVRlc3RCZWhhdmlvciA9IHsgYWN0aW9uOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDI7IH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGQyOiBJQ2hpbGQ8SVRlc3RCZWhhdmlvcj4gPSB7IHZpZXdEYXRhOiB7IGJlaGF2aW9yOiBiZWhhdmlvcjIgfSB9O1xyXG5cdFx0XHRcdHZhciBiZWhhdmlvcjM6IElUZXN0QmVoYXZpb3IgPSB7IGFjdGlvbjogKCk6IG51bWJlciA9PiB7IHJldHVybiAzOyB9IH07XHJcblx0XHRcdFx0dmFyIGNoaWxkMzogSUNoaWxkPElUZXN0QmVoYXZpb3I+ID0geyB2aWV3RGF0YTogeyBiZWhhdmlvcjogYmVoYXZpb3IzIH0gfTtcclxuXHRcdFx0XHR2YXIgY2hpbGRXaXRob3V0QmVoYXZpb3I6IElDaGlsZDxJVGVzdEJlaGF2aW9yPiA9IHsgfTtcclxuXHJcblx0XHRcdFx0dmFyIGJlaGF2aW9yUmVzdWx0OiBudW1iZXJbXSA9IHBhcmVudENoaWxkQmVoYXZpb3IudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzKFtjaGlsZDEsIGNoaWxkMiwgY2hpbGQzLCBjaGlsZFdpdGhvdXRCZWhhdmlvcl0sXHJcblx0XHRcdFx0XHQoYmVoYXZpb3I6IElUZXN0QmVoYXZpb3IpOiBudW1iZXIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJlaGF2aW9yLmFjdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHQpLnRvLmhhdmUubGVuZ3RoKDMpO1xyXG5cdFx0XHRcdGV4cGVjdChiZWhhdmlvclJlc3VsdFswXSkudG8uZXF1YWwoMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGJlaGF2aW9yUmVzdWx0WzFdKS50by5lcXVhbCgyKTtcclxuXHRcdFx0XHRleHBlY3QoYmVoYXZpb3JSZXN1bHRbMl0pLnRvLmVxdWFsKDMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncHJvbWlzZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbjtcclxuXHRcdGlzUHJvbWlzZShwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIFByb21pc2VVdGlsaXR5IGltcGxlbWVudHMgSVByb21pc2VVdGlsaXR5IHtcclxuXHRcdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIF8uaXNPYmplY3QocHJvbWlzZSkgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UudGhlbikgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UuY2F0Y2gpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUHJvbWlzZVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3Mvc2lub24vc2lub24uZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2Uge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgncHJvbWlzZVV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgcHJvbWlzZVV0aWxpdHk6IElQcm9taXNlVXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHByb21pc2VVdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2lzUHJvbWlzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0aXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGEgcHJvbWlzZScsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR2YXIgcHJvbWlzZTogT2JqZWN0ID0ge1xyXG5cdFx0XHRcdFx0dGhlbjogc2lub24uc3B5KCksXHJcblx0XHRcdFx0XHRjYXRjaDogc2lub24uc3B5KCksXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0ZXhwZWN0KHByb21pc2VVdGlsaXR5LmlzUHJvbWlzZShwcm9taXNlKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgb2JqZWN0IGlzIG5vdCBhIHByb21pc2UnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dmFyIHN0cjogc3RyaW5nID0gJ3Byb21pc2UnO1xyXG5cdFx0XHRcdHZhciBvYmo6IE9iamVjdCA9IHt9O1xyXG5cclxuXHRcdFx0XHRleHBlY3QocHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlKHN0cikpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChwcm9taXNlVXRpbGl0eS5pc1Byb21pc2Uob2JqKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpL2NoYWkuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9tb2NoYS9tb2NoYS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2NoYWlBc3NlcnRpb25zLmQudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGVzdC9hbmd1bGFyRml4dHVyZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIHtcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgnc3RyaW5nVXRpbGl0eScsICgpID0+IHtcclxuXHRcdHZhciBzdHJpbmdVdGlsaXR5OiBJU3RyaW5nVXRpbGl0eVNlcnZpY2U7XHJcblxyXG5cdFx0YmVmb3JlRWFjaCgoKSA9PiB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUobW9kdWxlTmFtZSk7XHJcblxyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IF9fdGVzdC5hbmd1bGFyRml4dHVyZS5pbmplY3Qoc2VydmljZU5hbWUpO1xyXG5cdFx0XHRzdHJpbmdVdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3RvTnVtYmVyJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIGNvbnZlcnQgYSBzdHJpbmcgdG8gYSBudW1iZXInLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkudG9OdW1iZXIoJzUnKSkudG8uZXF1YWwoNSk7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkudG9OdW1iZXIoJzMnKSkudG8uZXF1YWwoMyk7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkudG9OdW1iZXIoJzEuMjUnKSkudG8uZXF1YWwoMS4yNSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ2NvbnRhaW5zJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBzdWJzdHJpbmcgaXMgY29udGFpbmVkIHdpdGhpbiB0aGUgc3RyaW5nJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCdteSBzdHJpbmcnLCAnbXknKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnMTIzJywgJzEnKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5jb250YWlucygnJywgbnVsbCkpLnRvLmJlLnRydWU7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJ215IHN0cmluZycsICcnKSkudG8uYmUudHJ1ZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgc3Vic3RyaW5nIGlzIG5vdCBjb250YWluZWQgd2l0aGluIHRoZSBzdHJpbmcnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJ215IHN0cmluZycsICdteSB2YWwnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuY29udGFpbnMoJzEyMycsICc0JykpLnRvLmJlLmZhbHNlO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LmNvbnRhaW5zKCdteSBzdHJpbmcnLCAnbXkgc3RyaW5nIDEnKSkudG8uYmUuZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZGVzY3JpYmUoJ3JlcGxhY2VBbGwnLCAoKTogdm9pZCA9PiB7XHJcblx0XHRcdGl0KCdzaG91bGQgcmVwbGFjZSBhbGwgb2NjdXJhbmNlcyBvZiBzb21lIGdpdmVuIHRleHQgd2l0aCBhbm90aGVyIGluc2lkZSBhIHN0cmluZycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5yZXBsYWNlQWxsKCdoZWxsbyB3b3JsZCcsICdmb28nLCAnYmFyJykpLnRvLmVxdWFsKCdoZWxsbyB3b3JsZCcpO1xyXG5cdFx0XHRcdGV4cGVjdChzdHJpbmdVdGlsaXR5LnJlcGxhY2VBbGwoJ2Zvb0hlbGxvZm9vV29ybGRmb28nLCAnZm9vJywgJ2JhcicpKS50by5lcXVhbCgnYmFySGVsbG9iYXJXb3JsZGJhcicpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlc2NyaWJlKCdzdWJzdGl0dXRlJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRpdCgnc2hvdWxkIHN1YnN0aXR1dGUgc3RyaW5ncyB3aXRoIHRoZWlyIHBvc2l0aW9uYWwgcGxhY2Vob2xkZXIgdmFsdWUgaW4gb3RoZXIgc3RyaW5ncycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRleHBlY3Qoc3RyaW5nVXRpbGl0eS5zdWJzdGl0dXRlKCdoZWxsbyB3b3JsZCcsICdmb28nKSkudG8uZXF1YWwoJ2hlbGxvIHdvcmxkJyk7XHJcblx0XHRcdFx0ZXhwZWN0KHN0cmluZ1V0aWxpdHkuc3Vic3RpdHV0ZSgnaGVsbG8gezB9IHdvcmxkIHsxfScsICdmb28nLCAnYmFyJykpLnRvLmVxdWFsKCdoZWxsbyBmb28gd29ybGQgYmFyJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL3Npbm9uXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4ge1xyXG5cdFx0cHJvbWlzZTogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRcdGRhdGE6IFREYXRhVHlwZTtcclxuXHRcdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChzZXJ2aWNlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKCk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBjYWxsYmFjay5hcHBseSh0aGlzLCBwYXJhbXMpLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIHNjb3BlPzogbmcuSVNjb3BlKTogdm9pZCB7XHJcblx0XHRcdC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuXHRcdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcblx0XHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3QgXHJcblx0XHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRcdF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCAocmVxdWVzdDogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4pOiB2b2lkID0+IHtcclxuXHRcdFx0XHRpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9jazogSU1vY2sgPSBuZXcgTW9jaygpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGltZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RpbWVVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvY2hhaS9jaGFpLmQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbW9jaGEvbW9jaGEuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyTW9ja3MuZC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy9jaGFpQXNzZXJ0aW9ucy5kLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndGltZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIHtcclxuXHJcblx0aW1wb3J0IF9fdGVzdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0O1xyXG5cclxuXHRkZXNjcmliZSgndGltZVV0aWxpdHknLCAoKSA9PiB7XHJcblx0XHR2YXIgdGltZVV0aWxpdHk6IElUaW1lVXRpbGl0eTtcclxuXHJcblx0XHRiZWZvcmVFYWNoKCgpID0+IHtcclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZShtb2R1bGVOYW1lKTtcclxuXHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gX190ZXN0LmFuZ3VsYXJGaXh0dXJlLmluamVjdChzZXJ2aWNlTmFtZSk7XHJcblx0XHRcdHRpbWVVdGlsaXR5ID0gc2VydmljZXNbc2VydmljZU5hbWVdO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZXhwZWN0ZWQgbnVtYmVyIG9mIHNlY29uZHMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvU2Vjb25kcyg0MDAwKSkudG8uZXF1YWwoNCk7XHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMoNDYwMCkpLnRvLmVxdWFsKDQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aXQoJ3Nob3VsZCByZXR1cm4gZXhwZWN0ZWQgbnVtYmVyIG9mIG1pbnV0ZXMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIHNlY29uZHMxOiBudW1iZXIgPSAxMjA7XHJcblx0XHRcdHZhciBzZWNvbmRzMjogbnVtYmVyID0gNTk7XHJcblxyXG5cdFx0XHRzZWNvbmRzMSAqPSAxMDAwO1xyXG5cdFx0XHRzZWNvbmRzMiAqPSAxMDAwO1xyXG5cclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvTWludXRlcyhzZWNvbmRzMSkpLnRvLmVxdWFsKDIpO1xyXG5cdFx0XHRleHBlY3QodGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzKHNlY29uZHMyKSkudG8uZXF1YWwoMCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpdCgnc2hvdWxkIHJldHVybiBleHBlY3RlZCBudW1iZXIgb2YgaG91cnMgZm9yIG1pbGxpc2Vjb25kcycsICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG1pbnV0ZXMxOiBudW1iZXIgPSA1OTtcclxuXHRcdFx0dmFyIG1pbnV0ZXMyOiBudW1iZXIgPSA2MDtcclxuXHJcblx0XHRcdG1pbnV0ZXMxICo9IDYwICogMTAwMDtcclxuXHRcdFx0bWludXRlczIgKj0gNjAgKiAxMDAwO1xyXG5cclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvSG91cnMobWludXRlczEpKS50by5lcXVhbCgwKTtcclxuXHRcdFx0ZXhwZWN0KHRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvSG91cnMobWludXRlczIpKS50by5lcXVhbCgxKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGl0KCdzaG91bGQgcmV0dXJuIGV4cGVjdGVkIG51bWJlciBvZiBob3VycyBmb3IgbWlsbGlzZWNvbmRzJywgKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHR2YXIgaG91cnMxOiBudW1iZXIgPSAyMztcclxuXHRcdFx0dmFyIGhvdXJzMjogbnVtYmVyID0gMjQ7XHJcblxyXG5cdFx0XHRob3VyczEgKj0gNjAgKiA2MCAqIDEwMDA7XHJcblx0XHRcdGhvdXJzMiAqPSA2MCAqIDYwICogMTAwMDtcclxuXHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0RheXMoaG91cnMxKSkudG8uZXF1YWwoMCk7XHJcblx0XHRcdGV4cGVjdCh0aW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0RheXMoaG91cnMyKSkudG8uZXF1YWwoMSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpc0VtcHR5L2lzRW1wdHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlL3RydW5jYXRlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGlzRW1wdHkubW9kdWxlTmFtZSxcclxuXHRcdHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUvZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdqcXVlcnkvanF1ZXJ5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlLm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lLFxyXG5cdFx0Ym9vbGVhbi5tb2R1bGVOYW1lLFxyXG5cdFx0Y29udGVudFByb3ZpZGVyLm1vZHVsZU5hbWUsXHJcblx0XHRkYXRlLm1vZHVsZU5hbWUsXHJcblx0XHRqcXVlcnkubW9kdWxlTmFtZSxcclxuXHRcdG51bWJlci5tb2R1bGVOYW1lLFxyXG5cdFx0b2JqZWN0Lm1vZHVsZU5hbWUsXHJcblx0XHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0XHRwcm9taXNlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0XHRiZWhhdmlvcnMubW9kdWxlTmFtZSxcclxuXHRcdGZpbHRlcnMubW9kdWxlTmFtZSxcclxuXHRcdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9