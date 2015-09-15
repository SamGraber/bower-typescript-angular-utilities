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
                                var promise = _this.save.apply(_this, data);
                                if (!_.isUndefined(promise)) {
                                    _this.autosaveService.trigger(promise.then(function () {
                                        if (_this.contentForm != null) {
                                            _this.contentForm.$setPristine();
                                        }
                                    }));
                                }
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
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var momentWrapper;
            (function (momentWrapper_1) {
                momentWrapper_1.moduleName = 'rl.utilities.services.momentWrapper';
                momentWrapper_1.serviceName = 'momentWrapper';
                function momentWrapper() {
                    'use strict';
                    // Using `any` instead of MomentStatic because
                    //  createFromInputFallback doesn't appear to be
                    //  defined in MomentStatic... :-(
                    var momentWrapper = moment; // moment must already be loaded
                    // Set default method for handling non-ISO date conversions.
                    // See 4/28 comment in https://github.com/moment/moment/issues/1407
                    // This also prevents the deprecation warning message to the console.
                    momentWrapper.createFromInputFallback = function (config) {
                        config._d = new Date(config._i);
                    };
                    return momentWrapper;
                }
                momentWrapper_1.momentWrapper = momentWrapper;
                angular.module(momentWrapper_1.moduleName, [])
                    .factory(momentWrapper_1.serviceName, momentWrapper);
            })(momentWrapper = services.momentWrapper || (services.momentWrapper = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var types;
        (function (types) {
            var compareResult;
            (function (compareResult) {
                'use strict';
                compareResult.moduleName = 'rl.utilities.types.compareResult';
                (function (CompareResult) {
                    CompareResult[CompareResult["greater"] = 1] = "greater";
                    CompareResult[CompareResult["equal"] = 0] = "equal";
                    CompareResult[CompareResult["less"] = -1] = "less";
                })(compareResult.CompareResult || (compareResult.CompareResult = {}));
                var CompareResult = compareResult.CompareResult;
                function getCompareResult(num) {
                    'use strict';
                    if (num === 0) {
                        return CompareResult.equal;
                    }
                    else if (num > 0) {
                        return CompareResult.greater;
                    }
                    else {
                        return CompareResult.less;
                    }
                }
                compareResult.getCompareResult = getCompareResult;
            })(compareResult = types.compareResult || (types.compareResult = {}));
        })(types = utilities.types || (utilities.types = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
/// <reference path="../time/time.service.ts" />
/// <reference path="../moment/moment.module.ts" />
/// <reference path="../../types/compareResult.ts" />
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date_1) {
                'use strict';
                var compareResult = rl.utilities.types.compareResult;
                var DateUtility = (function () {
                    function DateUtility(moment, time) {
                        var _this = this;
                        this.moment = moment;
                        this.time = time;
                        this.baseFormat = 'MM-DD-YYYY';
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
                    DateUtility.prototype.subtractDates = function (start, end, dateFormat) {
                        if (start == null || end == null) {
                            return null;
                        }
                        var startDate = this.getDate(start, dateFormat);
                        var endDate = this.getDate(end, dateFormat);
                        var result = {};
                        result.days = endDate.getDate() - startDate.getDate();
                        result.years = endDate.getFullYear() - startDate.getFullYear();
                        result.months = endDate.getMonth() - startDate.getMonth();
                        if (result.days < 0) {
                            result.months -= 1;
                            result.days += this.getDays(startDate.getMonth(), startDate.getFullYear());
                        }
                        if (result.months < 0) {
                            result.years -= 1;
                            result.months += 12;
                        }
                        return result;
                    };
                    DateUtility.prototype.subtractDateInDays = function (start, end, dateFormat) {
                        if (start == null || end == null) {
                            return null;
                        }
                        var startDate = this.getDate(start, dateFormat);
                        var endDate = this.getDate(end, dateFormat);
                        var milliseconds = endDate.getTime() - startDate.getTime();
                        return this.time.millisecondsToDays(milliseconds);
                    };
                    DateUtility.prototype.compareDates = function (date1, date2, dateFormat) {
                        // subtractDateInDays subtracts the fist from the second, assuming start and end dates
                        var difference = this.subtractDateInDays(date2, date1, dateFormat);
                        return compareResult.getCompareResult(difference);
                    };
                    DateUtility.prototype.dateInRange = function (date, rangeStart, rangeEnd) {
                        if (this.compareDates(date, rangeStart) === compareResult.CompareResult.less) {
                            return false;
                        }
                        else if (this.compareDates(date, rangeEnd) === compareResult.CompareResult.greater) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    };
                    DateUtility.prototype.getDate = function (date, dateFormat) {
                        var format = dateFormat != null ? dateFormat : this.baseFormat;
                        if (_.isDate(date)) {
                            return date;
                        }
                        else {
                            return this.moment(date, format).toDate();
                        }
                    };
                    DateUtility.prototype.getNow = function () {
                        return new Date();
                    };
                    DateUtility.$inject = [services.momentWrapper.serviceName, services.time.serviceName];
                    return DateUtility;
                })();
                date_1.DateUtility = DateUtility;
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
/// <reference path='../time/time.service.ts' />
/// <reference path='../moment/moment.module.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var date;
            (function (date) {
                date.moduleName = 'rl.utilities.services.date';
                date.serviceName = 'dateUtility';
                angular.module(date.moduleName, [services.momentWrapper.moduleName, services.time.moduleName])
                    .service(date.serviceName, date.DateUtility)
                    .value(date.dateTimeFormatServiceName, date.defaultFormats);
            })(date = services.date || (services.date = {}));
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
        var filters;
        (function (filters) {
            'use strict';
        })(filters = utilities.filters || (utilities.filters = {}));
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
// uses typings/angularjs
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var notification;
            (function (notification) {
                'use strict';
                notification.moduleName = 'rl.utilities.services.notification';
                notification.serviceName = 'notification';
                var NotificationService = (function () {
                    function NotificationService(notifier) {
                        this.notifier = notifier;
                    }
                    NotificationService.prototype.info = function (message) {
                        this.notifier.info(message);
                    };
                    NotificationService.prototype.warning = function (message) {
                        this.notifier.warning(message);
                    };
                    NotificationService.prototype.error = function (message) {
                        this.notifier.error(message);
                    };
                    NotificationService.prototype.success = function (message) {
                        this.notifier.success(message);
                    };
                    return NotificationService;
                })();
                notification.NotificationService = NotificationService;
                function notificationServiceProvider() {
                    'use strict';
                    var _this = this;
                    return {
                        notifier: new notification.BaseNotifier(),
                        setNotifier: function (notifier) {
                            _this.notifier = notifier;
                        },
                        $get: function () {
                            return new NotificationService(_this.notifier);
                        },
                    };
                }
                notification.notificationServiceProvider = notificationServiceProvider;
                angular.module(notification.moduleName, [])
                    .provider(notification.serviceName, notificationServiceProvider);
            })(notification = services.notification || (services.notification = {}));
        })(services = utilities.services || (utilities.services = {}));
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));
// uses typings/angularjs
/// <reference path='notification.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var notification;
            (function (notification) {
                'use strict';
                var BaseNotifier = (function () {
                    function BaseNotifier() {
                    }
                    BaseNotifier.prototype.info = function (message) {
                        this.notify(message);
                    };
                    BaseNotifier.prototype.warning = function (message) {
                        this.notify(message);
                    };
                    BaseNotifier.prototype.error = function (message) {
                        this.notify(message);
                    };
                    BaseNotifier.prototype.success = function (message) {
                        this.notify(message);
                    };
                    BaseNotifier.prototype.notify = function (message) {
                        window.alert(message);
                        console.log(message);
                    };
                    return BaseNotifier;
                })();
                notification.BaseNotifier = BaseNotifier;
            })(notification = services.notification || (services.notification = {}));
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
                    AngularFixture.prototype.controller = function (controllerName, bindings, locals, bindToController) {
                        if (bindToController === void 0) { bindToController = false; }
                        var services = this.inject('$rootScope', '$controller');
                        var $rootScope = services.$rootScope;
                        var $controller = services.$controller;
                        var controllerBindings;
                        var scope;
                        if (locals == null) {
                            locals = {};
                        }
                        if (bindToController) {
                            controllerBindings = bindings;
                            scope = $rootScope.$new();
                        }
                        else {
                            scope = _.extend($rootScope.$new(), bindings);
                        }
                        locals.$scope = scope;
                        return {
                            scope: scope,
                            controller: $controller(controllerName, locals, controllerBindings),
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
// uses typings/angularjs
// uses typings/lodash
/// <reference path='../notification/notification.service.ts' />
var rl;
(function (rl) {
    var utilities;
    (function (utilities) {
        var services;
        (function (services) {
            var validation;
            (function (validation) {
                'use strict';
                validation.moduleName = 'rl.utilities.services.validation';
                validation.factoryName = 'validationFactory';
                var ValidationService = (function () {
                    function ValidationService(notification) {
                        this.notification = notification;
                        this.validationHandlers = {};
                        this.nextKey = 0;
                        this.notifyAsError = false;
                    }
                    ValidationService.prototype.validate = function () {
                        var _this = this;
                        var isValid = true;
                        _.each(this.validationHandlers, function (handler) {
                            var isActive = (_.isFunction(handler.isActive) && handler.isActive())
                                || handler.isActive == null
                                || handler.isActive === true;
                            if (isActive && !handler.validate()) {
                                isValid = false;
                                var error = _.isFunction(handler.errorMessage)
                                    ? handler.errorMessage()
                                    : handler.errorMessage;
                                if (_this.notifyAsError) {
                                    _this.notification.error(error);
                                }
                                else {
                                    _this.notification.warning(error);
                                }
                                return false;
                            }
                        });
                        return isValid;
                    };
                    ValidationService.prototype.registerValidationHandler = function (handler) {
                        var _this = this;
                        var currentKey = this.nextKey;
                        this.nextKey++;
                        this.validationHandlers[currentKey] = handler;
                        return function () {
                            _this.unregister(currentKey);
                        };
                    };
                    ValidationService.prototype.unregister = function (key) {
                        delete this.validationHandlers[key];
                    };
                    return ValidationService;
                })();
                validation.ValidationService = ValidationService;
                validationServiceFactory.$inject = [services.notification.serviceName];
                function validationServiceFactory(notification) {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new ValidationService(notification);
                        }
                    };
                }
                validation.validationServiceFactory = validationServiceFactory;
                angular.module(validation.moduleName, [services.notification.moduleName])
                    .factory(validation.factoryName, validationServiceFactory);
            })(validation = services.validation || (services.validation = {}));
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
/// <reference path='date/date.module.ts' />
/// <reference path='fileSize/fileSize.module.ts' />
/// <reference path='genericSearchFilter/genericSearchFilter.service.ts' />
/// <reference path='jquery/jquery.service.ts' />
/// <reference path='moment/moment.module.ts' />
/// <reference path='notification/notification.service.ts' />
/// <reference path='number/number.service.ts' />
/// <reference path='object/object.service.ts' />
/// <reference path='observable/observable.service.ts' />
/// <reference path='parentChildBehavior/parentChildBehavior.service.ts' />
/// <reference path='promise/promise.service.ts' />
/// <reference path='string/string.service.ts' />
/// <reference path='time/time.service.ts' />
/// <reference path='validation/validation.service.ts' />
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
                services.fileSize.moduleName,
                services.genericSearchFilter.moduleName,
                services.jquery.moduleName,
                services.momentWrapper.moduleName,
                services.notification.moduleName,
                services.number.moduleName,
                services.object.moduleName,
                services.observable.moduleName,
                services.parentChildBehavior.moduleName,
                services.promise.moduleName,
                services.string.moduleName,
                services.time.moduleName,
                services.validation.moduleName,
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
        angular.module(utilities.moduleName, [
            utilities.behaviors.moduleName,
            utilities.filters.moduleName,
            utilities.services.moduleName,
        ]);
    })(utilities = rl.utilities || (rl.utilities = {}));
})(rl || (rl = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwiZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkudHMiLCJiZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsInNlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwidHlwZXMvY29tcGFyZVJlc3VsdC50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzIiwic2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwiZmlsdGVycy9maWx0ZXIudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJzZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsInNlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsInNlcnZpY2VzL3Rlc3QvbW9jay50cyIsInNlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzIiwiYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMiLCJmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIiwic2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbInJsIiwicmwudXRpbGl0aWVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdCIsInJsLnV0aWxpdGllcy5maWx0ZXJzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZS50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkiLCJybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5LmlzRW1wdHkiLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbiIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24uc3RvcEV2ZW50UHJvcGFnYXRpb24iLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uLnN0b3BFdmVudFByb3BhZ2F0aW9uLmxpbmsiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc2F2aW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb21wbGV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc3VjY2Vzc2Z1bCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UudHJpZ2dlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UubnVsbEZvcm0uJHNldFByaXN0aW5lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLmF1dG9zYXZlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXIubW9tZW50V3JhcHBlciIsInJsLnV0aWxpdGllcy50eXBlcyIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0IiwicmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdCIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0LmdldENvbXBhcmVSZXN1bHQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5pc0xlYXBZZWFyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldERheXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5EYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29tcGFyZURhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZGF0ZUluUmFuZ2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0Tm93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuU2lnbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoT2JqZWN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2UuaW5mbyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS53YXJuaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLmVycm9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5pbmZvIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIud2FybmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLmVycm9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIuc3VjY2VzcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLm5vdGlmeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmdldEFsbENoaWxkQmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UucmVnaXN0ZXJDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkuaXNQcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuaW5qZWN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUubW9jayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmNvbnRyb2xsZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5kaXJlY3RpdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suc2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2sucHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2sucHJvbWlzZVdpdGhDYWxsYmFjayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suZmx1c2giLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZS52YWxpZGF0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLnJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZS51bnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24udmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24udmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkuSlF1ZXJ5VXRpbGl0eS5yZXBsYWNlQ29udGVudCJdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0E2RVI7QUE3RUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBNkVsQkE7SUE3RVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBNkUzQkE7UUE3RW1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxLQUFLQSxDQTZFakNBO1lBN0U0QkEsV0FBQUEsT0FBS0EsRUFBQ0EsQ0FBQ0E7Z0JBQ25DQyxZQUFZQSxDQUFDQTtnQkFFRkEsa0JBQVVBLEdBQVdBLDZCQUE2QkEsQ0FBQ0E7Z0JBQ25EQSxtQkFBV0EsR0FBV0EsY0FBY0EsQ0FBQ0E7Z0JBWWhEQTtvQkFBQUM7b0JBeURBQyxDQUFDQTtvQkF4REFELGtDQUFXQSxHQUFYQSxVQUF1QkEsS0FBa0JBLEVBQUVBLFNBQXlDQTt3QkFDbkZFLElBQUlBLFdBQW1CQSxD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QSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDekRBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdkRBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDeERBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTt5QkFDeERBLENBQUNBO29CQUNIQSxDQUFDQTtvQkFLT0QsZ0NBQVVBLEdBQWxCQSxVQUFtQkEsSUFBYUE7d0JBQy9CRSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtvQkFDL0NBLENBQUNBO29CQUVERixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBYUE7d0JBQzFCRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFDL0JBLENBQUNBO29CQUVESCw2QkFBT0EsR0FBUEEsVUFBUUEsS0FBYUEsRUFBRUEsSUFBYUE7d0JBQ25DSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDckNBLENBQUNBO29CQUVESixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQzFFSyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFFbERBLElBQUlBLE1BQU1BLEdBQW9CQSxFQUFFQSxDQUFDQTt3QkFDakNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUN0REEsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7d0JBQy9EQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTt3QkFFMURBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNyQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ25CQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTt3QkFDNUVBLENBQUNBO3dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkJBLE1BQU1BLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBOzRCQUNsQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxDQUFDQTt3QkFFREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ2ZBLENBQUNBO29CQUVETCx3Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQy9FTSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFFbERBLElBQUlBLFlBQVlBLEdBQVdBLE9BQU9BLENBQUNB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L2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXI7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGU7XHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQ7XHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0XHRzdW0oYXJyYXk6IG51bWJlcltdKTogbnVtYmVyO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmd9KTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgdGFyZ2V0SW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuXHRcdFx0XHRcdHRhcmdldEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSB8IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcblx0XHRcdFx0aW5kZXggPSB0aGlzLmZpbmRJbmRleE9mKGFycmF5LCA8eyhvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW59Pml0ZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCA8VERhdGFUeXBlPml0ZW0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXIgPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciBsaXN0OiBudW1iZXJbXTtcclxuXHJcblx0XHRcdGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxpc3QgPSA8YW55W10+YXJyYXk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShsaXN0LCAoc3VtOiBudW1iZXIsIG51bTogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIH0pXHJcblx0XHRcdDogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9IHtcclxuXHRcdFx0cmV0dXJuIF8ucmVkdWNlKGFycmF5LCAoZGljdGlvbmFyeTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9LCBpdGVtOiBURGF0YVR5cGUpOiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0gPT4ge1xyXG5cdFx0XHRcdGRpY3Rpb25hcnlba2V5U2VsZWN0b3IoaXRlbSldID0gaXRlbTtcclxuXHRcdFx0XHRyZXR1cm4gZGljdGlvbmFyeTtcclxuXHRcdFx0fSwgW10pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXJyYXlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnb2JqZWN0VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9iamVjdFV0aWxpdHkge1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHRcdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbjtcclxuXHRcdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nO1xyXG5cdFx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnk7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBPYmplY3RVdGlsaXR5IGltcGxlbWVudHMgSU9iamVjdFV0aWxpdHkge1xyXG5cdFx0IHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFthcnJheS5zZXJ2aWNlTmFtZV07XHJcblx0XHQgY29uc3RydWN0b3IocHJpdmF0ZSBhcnJheTogYXJyYXkuSUFycmF5VXRpbGl0eSkge1xyXG5cdFx0IH1cclxuXHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKF8uaXNBcnJheShvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KG9iamVjdCkgPT09IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSkge1xyXG5cdFx0XHRcdHJldHVybiBfLmlzTmFOKG9iamVjdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIG9iamVjdCA9PT0gJyc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKF8uaXNTdHJpbmcob2JqZWN0KSkge1xyXG5cdFx0XHRcdG9iamVjdCA9ICg8c3RyaW5nPm9iamVjdCkudHJpbSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc051bGxPckVtcHR5KG9iamVjdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIHR5cGUxOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMTtcclxuXHRcdFx0dmFyIHR5cGUyOiBzdHJpbmcgPSB0eXBlb2Ygb2JqMjtcclxuXHJcblx0XHRcdGlmIChvYmoxID09IG51bGwgJiYgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAob2JqMSA9PSBudWxsIHx8IG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGUxICE9PSB0eXBlMikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwob2JqMVtpXSwgb2JqMltpXSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAodHlwZTEgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0Ly9pbml0IGFuIG9iamVjdCB3aXRoIHRoZSBrZXlzIGZyb20gb2JqMlxyXG5cdFx0XHRcdHZhciBrZXlzMjogc3RyaW5nW10gPSBfLmtleXMob2JqMik7XHJcblx0XHRcdFx0Xy5mb3JJbihvYmoxLCAodmFsdWU6IGFueSwga2V5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRcdGlmIChfLmhhcyhvYmoyLCBrZXkpKSB7XHJcblx0XHRcdFx0XHRcdC8vY29tcGFyZSB2YWx1ZSBhZ2FpbnN0IHRoZSB2YWx1ZSB3aXRoIHRoZSBzYW1lIGtleSBpbiBvYmoyLCB0aGVuIHJlbW92ZSB0aGUga2V5XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKHZhbHVlLCBvYmoyW2tleV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmFycmF5LnJlbW92ZShrZXlzMiwga2V5KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdC8vaWYgdGhlcmUgYXJlIHN0aWxsIGtleXMgbGVmdCBpbiBrZXlzMiwgd2Uga25vdyB0aGV5IGFyZSBub3QgZXF1YWwgKG9iajIgaGFzIG1vcmUgcHJvcGVydGllcylcclxuXHRcdFx0XHRpZiAoXy5hbnkoa2V5czIpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vaWYgdHlwZXMgYXJlIHByaW1pdGl2ZSwgZG8gYSBzaW1wbGUgY29tcGFyaXNvblxyXG5cdFx0XHRcdHJldHVybiBvYmoxID09PSBvYmoyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiBvYmplY3QgKyAnJztcclxuXHRcdH1cclxuXHJcblx0XHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueSB7XHJcblx0XHRcdGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFthcnJheS5tb2R1bGVOYW1lXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBPYmplY3RVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdFx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0dHJ1bmNhdGUuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eTogX19vYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRcdGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcblxyXG5cdFx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG5cdFx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdFx0b3V0ICs9ICcuLi4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gb3V0O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fb2JqZWN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdDtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2lzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJSXNFbXB0eUZpbHRlciB7XHJcblx0XHQoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0aXNFbXB0eS4kaW5qZWN0ID0gW19fb2JqZWN0LnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBpc0VtcHR5KG9iamVjdDogX19vYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJSXNFbXB0eUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHZhciBpc0VtcHR5OiBib29sZWFuID0gb2JqZWN0LmlzTnVsbE9yRW1wdHkoaW5wdXQpO1xyXG5cclxuXHRcdFx0aWYgKHRydWVXaGVuRW1wdHkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuICFpc0VtcHR5O1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpc0VtcHR5O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIGlzRW1wdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuXHRleHBvcnQgdmFyIGRpcmVjdGl2ZU5hbWU6IHN0cmluZyA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyBleHRlbmRzIG5nLklBdHRyaWJ1dGVzIHtcclxuXHRcdHJsU3RvcEV2ZW50UHJvcGFnYXRpb246IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKCk6IG5nLklEaXJlY3RpdmUge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdFx0bGluayhzY29wZTogbmcuSVNjb3BlXHJcblx0XHRcdFx0LCBlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5XHJcblx0XHRcdFx0LCBhdHRyczogSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMpOiB2b2lkIHtcclxuXHRcdFx0XHRlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBzdG9wRXZlbnRQcm9wYWdhdGlvbik7XHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXV0b3NhdmVBY3Rpb24nO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogdm9pZDtcclxuXHRcdHNhdmluZzogYm9vbGVhbjtcclxuXHRcdGNvbXBsZXRlOiBib29sZWFuO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlQWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckdGltZW91dCddO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdHByaXZhdGUgY29tcGxldGVNZXNzYWdlRHVyYXRpb246IG51bWJlciA9IDEwMDA7XHJcblxyXG5cdFx0cHJpdmF0ZSBfc2F2aW5nOiBib29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBfY29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9zdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cclxuXHRcdGdldCBzYXZpbmcoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zYXZpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IGNvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29tcGxldGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IHN1Y2Nlc3NmdWwoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zdWNjZXNzZnVsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXIocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGFueSB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IHRydWU7XHJcblx0XHRcdHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5hdXRvc2F2ZVN1Y2Nlc3NmdWwpXHJcblx0XHRcdFx0XHRcdC5jYXRjaCh0aGlzLmF1dG9zYXZlRmFpbGVkKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGF1dG9zYXZlU3VjY2Vzc2Z1bDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVGYWlsZWQ6IHsgKGRhdGE6IGFueSk6IGFueSB9ID0gKGRhdGE6IGFueSk6IGFueSA9PiB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSByZXNvbHZlQXV0b3NhdmU6IHsgKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSB9ID0gKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSA9PiB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9jb21wbGV0ZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuX3N1Y2Nlc3NmdWwgPSBzdWNjZXNzO1xyXG5cclxuXHRcdFx0dGhpcy4kdGltZW91dCgoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy5fY29tcGxldGUgPSBmYWxzZTtcclxuXHRcdFx0fSwgdGhpcy5jb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbik7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEF1dG9zYXZlQWN0aW9uU2VydmljZSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX2F1dG9zYXZlQWN0aW9uID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0YXV0b3NhdmUoLi4uZGF0YTogYW55W10pOiBib29sZWFuO1xyXG5cdFx0Y29udGVudEZvcm06IG5nLklGb3JtQ29udHJvbGxlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSBoYXNWYWxpZGF0b3I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBhdXRvc2F2ZVNlcnZpY2U6IF9fYXV0b3NhdmVBY3Rpb24uSUF1dG9zYXZlQWN0aW9uU2VydmljZVxyXG5cdFx0XHRcdCwgcHJpdmF0ZSBzYXZlOiB7KC4uLmRhdGE6IGFueVtdKTogbmcuSVByb21pc2U8dm9pZD59XHJcblx0XHRcdFx0LCBwdWJsaWMgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXJcclxuXHRcdFx0XHQsIHByaXZhdGUgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KSB7XHJcblx0XHRcdHRoaXMuaGFzVmFsaWRhdG9yID0gdmFsaWRhdGUgIT0gbnVsbDtcclxuXHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtID09IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRGb3JtID0gdGhpcy5udWxsRm9ybSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YXV0b3NhdmU6IHsgKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiB9ID0gKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtLiRwcmlzdGluZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cdFx0XHRpZiAodGhpcy5oYXNWYWxpZGF0b3IpIHtcclxuXHRcdFx0XHR2YWxpZCA9IHRoaXMudmFsaWRhdGUoKTtcclxuXHRcdFx0XHRpZiAodmFsaWQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHZhbGlkKSB7XHJcblx0XHRcdFx0dmFyIHByb21pc2U6IG5nLklQcm9taXNlPHZvaWQ+ID0gdGhpcy5zYXZlKC4uLmRhdGEpO1xyXG5cclxuXHRcdFx0XHRpZiAoIV8uaXNVbmRlZmluZWQocHJvbWlzZSkpIHtcclxuXHRcdFx0XHRcdHRoaXMuYXV0b3NhdmVTZXJ2aWNlLnRyaWdnZXIocHJvbWlzZS50aGVuKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuY29udGVudEZvcm0uJHNldFByaXN0aW5lKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgbnVsbEZvcm0oKTogbmcuSUZvcm1Db250cm9sbGVyIHtcclxuXHRcdFx0cmV0dXJuIDxhbnk+e1xyXG5cdFx0XHRcdCRwcmlzdGluZTogZmFsc2UsXHJcblx0XHRcdFx0JHNldFByaXN0aW5lKCk6IHZvaWQge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKHNhdmU6IHsoKTogbmcuSVByb21pc2U8dm9pZD59LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KTogSUF1dG9zYXZlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGF1dG9zYXZlU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtfX2F1dG9zYXZlQWN0aW9uLnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTogSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeyAoKTogbmcuSVByb21pc2U8dm9pZD4gfSwgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXIsIHZhbGlkYXRlPzogeyAoKTogYm9vbGVhbiB9KTogSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBBdXRvc2F2ZVNlcnZpY2UoYXV0b3NhdmVTZXJ2aWNlLCBzYXZlLCBjb250ZW50Rm9ybSwgdmFsaWRhdGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fYXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jvb2xlYW5VdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEJvb2xlYW5VdGlsaXR5IGltcGxlbWVudHMgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHRcdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gISFvYmplY3Q7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCb29sZWFuVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdhdGNoZXI8VFJldHVyblR5cGU+IHtcclxuXHRcdGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT47XHJcblx0XHRldmVudD86IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHQoKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IElBY3Rpb248dm9pZD4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXTtcclxuXHRcdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXJ2aWNlIGltcGxlbWVudHMgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdFx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyICE9IG51bGwgJiYgd2F0Y2hlci5ldmVudCA9PT0gZXZlbnQ7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gd2F0Y2hlci5hY3Rpb24uYXBwbHkodGhpcywgcGFyYW1zKTtcclxuXHRcdFx0fSkudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KCk6IElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2NvbnRlbnRQcm92aWRlckZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZDtcclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnk7XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3VGV4dDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQ29udGVudFByb3ZpZGVyU2VydmljZSBpbXBsZW1lbnRzIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdGNvbnN0cnVjdG9yKG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpIHtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG9ic2VydmFibGU6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdFx0cHJpdmF0ZSBjb250ZW50OiBKUXVlcnk7XHJcblxyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlLmZpcmUoJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQ6IHsodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkfSA9ICh0cmFuc2NsdWRlRnVuY3Rpb246IG5nLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih0cmFuc2NsdWRlRnVuY3Rpb24pKSB7XHJcblx0XHRcdFx0dHJhbnNjbHVkZUZ1bmN0aW9uKChjbG9uZTogSlF1ZXJ5KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNldENvbnRlbnQoY2xvbmUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0Q29udGVudChudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50ICE9IG51bGwpIHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmFibGUucmVnaXN0ZXIoKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fSwgJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeSB7XHJcblx0XHRcdGlmIChzZWxlY3RvciAhPSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29udGVudC5maWx0ZXIoc2VsZWN0b3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW29ic2VydmFibGUuZmFjdG9yeU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRQcm92aWRlclNlcnZpY2Uob2JzZXJ2YWJsZUZhY3RvcnkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGltZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RpbWVVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG59XHJcbiIsIlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ21vbWVudFdyYXBwZXInO1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpOiB2b2lkIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHQvLyBVc2luZyBgYW55YCBpbnN0ZWFkIG9mIE1vbWVudFN0YXRpYyBiZWNhdXNlXHJcblx0XHQvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuXHRcdC8vICBkZWZpbmVkIGluIE1vbWVudFN0YXRpYy4uLiA6LShcclxuXHRcdHZhciBtb21lbnRXcmFwcGVyOiBhbnkgPSBtb21lbnQ7IC8vIG1vbWVudCBtdXN0IGFscmVhZHkgYmUgbG9hZGVkXHJcblxyXG5cdFx0Ly8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcblx0XHQvLyBTZWUgNC8yOCBjb21tZW50IGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3XHJcblx0XHQvLyBUaGlzIGFsc28gcHJldmVudHMgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cclxuXHRcdG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSAoY29uZmlnOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0Y29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pKTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgbW9tZW50V3JhcHBlcik7XHJcblxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQnO1xyXG5cclxuXHRleHBvcnQgZW51bSBDb21wYXJlUmVzdWx0IHtcclxuXHRcdGdyZWF0ZXIgPSAxLFxyXG5cdFx0ZXF1YWwgPSAwLFxyXG5cdFx0bGVzcyA9IC0xLFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtOiBudW1iZXIpOiBDb21wYXJlUmVzdWx0IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdGlmIChudW0gPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0XHR9IGVsc2UgaWYgKG51bSA+IDApIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZ3JlYXRlcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0Lmxlc3M7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdGltZS90aW1lLnNlcnZpY2UudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9tZW50L21vbWVudC5tb2R1bGUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwZXMvY29tcGFyZVJlc3VsdC50c1wiIC8+XHJcblxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IGNvbXBhcmVSZXN1bHQgPSBybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdDtcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9udGgge1xyXG5cdFx0bmFtZTogc3RyaW5nO1xyXG5cdFx0ZGF5cyh5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZVZhbHVlIHtcclxuXHRcdHllYXJzOiBudW1iZXI7XHJcblx0XHRtb250aHM6IG51bWJlcjtcclxuXHRcdGRheXM6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVVdGlsaXR5IHtcclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZztcclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHRcdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWU7XHJcblx0XHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRcdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQ7XHJcblx0XHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW47XHJcblx0XHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlO1xyXG5cdFx0Z2V0Tm93KCk6IERhdGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW21vbWVudFdyYXBwZXIuc2VydmljZU5hbWUsIHRpbWUuc2VydmljZU5hbWVdO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBtb21lbnQ6IG1vbWVudC5Nb21lbnRTdGF0aWMsIHByaXZhdGUgdGltZTogdGltZS5JVGltZVV0aWxpdHkpIHtcclxuXHRcdFx0dGhpcy5tb250aCA9IFtcclxuXHRcdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWFyY2gnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bmUnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdF07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9udGg6IElNb250aFtdO1xyXG5cdFx0cHJpdmF0ZSBiYXNlRm9ybWF0OiBzdHJpbmcgPSAnTU0tREQtWVlZWSc7XHJcblxyXG5cdFx0cHJpdmF0ZSBpc0xlYXBZZWFyKHllYXI/OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKHllYXIsIDEsIDI5KS5nZXRNb250aCgpID09PSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5uYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5kYXlzKHllYXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWUge1xyXG5cdFx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRcdHZhciByZXN1bHQ6IElEYXRlVmFsdWUgPSA8YW55Pnt9O1xyXG5cdFx0XHRyZXN1bHQuZGF5cyA9IGVuZERhdGUuZ2V0RGF0ZSgpIC0gc3RhcnREYXRlLmdldERhdGUoKTtcclxuXHRcdFx0cmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRcdHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuXHJcblx0XHRcdGlmIChyZXN1bHQuZGF5cyA8IDApIHtcclxuXHRcdFx0XHRyZXN1bHQubW9udGhzIC09IDE7XHJcblx0XHRcdFx0cmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG5cdFx0XHRcdHJlc3VsdC55ZWFycyAtPSAxO1xyXG5cdFx0XHRcdHJlc3VsdC5tb250aHMgKz0gMTI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRcdHZhciBtaWxsaXNlY29uZHM6IG51bWJlciA9IGVuZERhdGUuZ2V0VGltZSgpIC0gc3RhcnREYXRlLmdldFRpbWUoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdCB7XHJcblx0XHRcdC8vIHN1YnRyYWN0RGF0ZUluRGF5cyBzdWJ0cmFjdHMgdGhlIGZpc3QgZnJvbSB0aGUgc2Vjb25kLCBhc3N1bWluZyBzdGFydCBhbmQgZW5kIGRhdGVzXHJcblx0XHRcdHZhciBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluRGF5cyhkYXRlMiwgZGF0ZTEsIGRhdGVGb3JtYXQpO1xyXG5cdFx0XHRyZXR1cm4gY29tcGFyZVJlc3VsdC5nZXRDb21wYXJlUmVzdWx0KGRpZmZlcmVuY2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZVN0YXJ0KSA9PT0gY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0Lmxlc3MpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQuZ3JlYXRlcikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGUge1xyXG5cdFx0XHR2YXIgZm9ybWF0OiBzdHJpbmcgPSBkYXRlRm9ybWF0ICE9IG51bGwgPyBkYXRlRm9ybWF0IDogdGhpcy5iYXNlRm9ybWF0O1xyXG5cclxuXHRcdFx0aWYgKF8uaXNEYXRlKGRhdGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDxEYXRlPmRhdGU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubW9tZW50KDxzdHJpbmc+ZGF0ZSwgZm9ybWF0KS50b0RhdGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldE5vdygpOiBEYXRlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0XHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0XHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0XHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdFx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxuXHR9O1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90aW1lL3RpbWUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbW9tZW50L21vbWVudC5tb2R1bGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbW9tZW50V3JhcHBlci5tb2R1bGVOYW1lLCB0aW1lLm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIERhdGVVdGlsaXR5KVxyXG5cdFx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbnVtYmVyVXRpbGl0eSc7XHJcblxyXG5cdGVudW0gU2lnbiB7XHJcblx0XHRwb3NpdGl2ZSA9IDEsXHJcblx0XHRuZWdhdGl2ZSA9IC0xLFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgc2lnbjogU2lnbiA9IG51bSA+PSAwID8gU2lnbi5wb3NpdGl2ZSA6IFNpZ24ubmVnYXRpdmU7XHJcblx0XHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG59XHJcbiIsIlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemUge1xyXG5cdFx0ZGlzcGxheSgpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBGaWxlU2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVNpemUge1xyXG5cdFx0QllURVNfUEVSX0dCOiBudW1iZXIgPSAxMDczNzQxODI0O1xyXG5cdFx0QllURVNfUEVSX01COiBudW1iZXIgPSAxMDQ4NTc2O1xyXG5cdFx0QllURVNfUEVSX0tCOiBudW1iZXIgPSAxMDI0O1xyXG5cclxuXHRcdGJ5dGVzOiBudW1iZXI7XHJcblxyXG5cdFx0R0I6IG51bWJlcjtcclxuXHRcdGlzR0I6IGJvb2xlYW47XHJcblxyXG5cdFx0TUI6IG51bWJlcjtcclxuXHRcdGlzTUI6IGJvb2xlYW47XHJcblxyXG5cdFx0S0I6IG51bWJlcjtcclxuXHRcdGlzS0I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IobnVtYmVyVXRpbGl0eTogbnVtYmVyLklOdW1iZXJVdGlsaXR5LCBieXRlczogbnVtYmVyKSB7XHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBieXRlcztcclxuXHJcblx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcblx0XHRcdFx0dGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfTUIpIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuXHRcdFx0XHRcdHRoaXMuTUIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLk1CLCAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5pc01CID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0tCKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaXNLQiA9IHRydWU7XHJcblx0XHRcdFx0XHRcdHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5LQiwgMSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNHQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuTUIgKyAnIE1CJztcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyLnNlcnZpY2VOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSk6IElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBzaW1wbGVGaWx0ZXJOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmaWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZhY3RvcnlOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGaWx0ZXIoZmlsZVNpemVGYWN0b3J5OiBJRmlsZVNpemVGYWN0b3J5KTogSUZpbGVTaXplRmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG5cdFx0XHR2YXIgZmlsZVNpemU6IElGaWxlU2l6ZSA9IGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZShieXRlcyk7XHJcblx0XHRcdHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplRmlsdGVyLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtudW1iZXIubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZmlsZVNpemVGYWN0b3J5KVxyXG5cdFx0LmZpbHRlcihzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcik7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXI7XHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gK3N0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChzdWJzdHJpbmcpIHtcclxuXHRcdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG5cdFx0XHRfLmVhY2gocGFyYW1zLCAocGFyYW06IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcldpdGhDb3VudHMgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHRcdHVwZGF0ZU9wdGlvbkNvdW50czxUSXRlbVR5cGU+KGRhdGE6IFRJdGVtVHlwZVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3N0cmluZy9zdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vZmlsdGVycy9maWx0ZXIudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlciBleHRlbmRzIGZpbHRlcnMuSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0XHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuO1xyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBHZW5lcmljU2VhcmNoRmlsdGVyIGltcGxlbWVudHMgSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nID0gZmlsdGVyTmFtZTtcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG9iamVjdDogb2JqZWN0LklPYmplY3RVdGlsaXR5LCBwcml2YXRlIHN0cmluZzogc3RyaW5nLklTdHJpbmdVdGlsaXR5U2VydmljZSkge31cclxuXHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMub2JqZWN0LmlzTnVsbE9yRW1wdHkodGhpcy5zZWFyY2hUZXh0KSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QoaXRlbSwgdGhpcy5zZWFyY2hUZXh0LCB0aGlzLmNhc2VTZW5zaXRpdmUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc2VhcmNoT2JqZWN0PFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlLCBzZWFyY2g6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc09iamVjdChpdGVtKSkge1xyXG5cdFx0XHRcdHZhciB2YWx1ZXM6IGFueSA9IF8udmFsdWVzKGl0ZW0pO1xyXG5cdFx0XHRcdHJldHVybiBfLmFueSh2YWx1ZXMsICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB7IHJldHVybiB0aGlzLnNlYXJjaE9iamVjdCh2YWx1ZSwgc2VhcmNoLCBjYXNlU2Vuc2l0aXZlKTsgfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9IHRoaXMub2JqZWN0LnRvU3RyaW5nKGl0ZW0pO1xyXG5cclxuXHRcdFx0XHRpZiAoIWNhc2VTZW5zaXRpdmUpIHtcclxuXHRcdFx0XHRcdHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0ZGF0YVN0cmluZyA9IGRhdGFTdHJpbmcudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnN0cmluZy5jb250YWlucyhkYXRhU3RyaW5nLCBzZWFyY2gpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlcjtcclxuXHR9XHJcblxyXG5cdGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5LiRpbmplY3QgPSBbb2JqZWN0LnNlcnZpY2VOYW1lLCBzdHJpbmcuc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KG9iamVjdDogb2JqZWN0LklPYmplY3RVdGlsaXR5LFxyXG5cdFx0c3RyaW5nVXRpbGl0eTogc3RyaW5nLklTdHJpbmdVdGlsaXR5U2VydmljZSk6IElHZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSB7XHJcblxyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEdlbmVyaWNTZWFyY2hGaWx0ZXIob2JqZWN0LCBzdHJpbmdVdGlsaXR5KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYmplY3QubW9kdWxlTmFtZSwgc3RyaW5nLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbm90aWZpY2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcblx0XHRzZXROb3RpZmllcihub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZDtcclxuXHRcdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5vdGlmaWVyOiBuZXcgQmFzZU5vdGlmaWVyKCksXHJcblx0XHRcdHNldE5vdGlmaWVyOiAobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdFx0fSxcclxuXHRcdFx0JGdldDogKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQucHJvdmlkZXIoc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQmFzZU5vdGlmaWVyIGltcGxlbWVudHMgSU5vdGlmaWVyIHtcclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0d2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0XHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0XHR2aWV3RGF0YT86IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0XHQ6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJNb2Nrc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IG5nLklTY29wZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZVJlc3VsdCB7XHJcblx0XHRkaXJlY3RpdmU6IG5nLklEaXJlY3RpdmU7XHJcblx0XHRzY29wZTogbmcuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0XHRkaXJlY3RpdmU6IChkb206IHN0cmluZykgPT4gSURpcmVjdGl2ZVJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogbmcuYXV0by5JUHJvdmlkZVNlcnZpY2UpID0+IHtcclxuXHRcdFx0XHRfLmVhY2gobW9ja3MsICh2YWx1ZTogYW55LCBrZXk6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0JHByb3ZpZGUudmFsdWUoa2V5LnRvU3RyaW5nKCksIHZhbHVlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udHJvbGxlcjxUQ29udHJvbGxlclR5cGU+KGNvbnRyb2xsZXJOYW1lOiBzdHJpbmcsIGJpbmRpbmdzPzogYW55LCBsb2NhbHM/OiBhbnksIGJpbmRUb0NvbnRyb2xsZXI6IGJvb2xlYW4gPSBmYWxzZSlcclxuXHRcdFx0OiBJQ29udHJvbGxlclJlc3VsdDxUQ29udHJvbGxlclR5cGU+IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29udHJvbGxlcicpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogbmcuSVNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb250cm9sbGVyOiBuZy5JQ29udHJvbGxlclNlcnZpY2UgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHRcdFx0dmFyIGNvbnRyb2xsZXJCaW5kaW5nczogYW55O1xyXG5cdFx0XHR2YXIgc2NvcGU6IG5nLklTY29wZTtcclxuXHJcblx0XHRcdGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoYmluZFRvQ29udHJvbGxlcikge1xyXG5cdFx0XHRcdGNvbnRyb2xsZXJCaW5kaW5ncyA9IGJpbmRpbmdzO1xyXG5cdFx0XHRcdHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2NvcGUgPSBfLmV4dGVuZCgkcm9vdFNjb3BlLiRuZXcoKSwgYmluZGluZ3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNjb3BlOiBzY29wZSxcclxuXHRcdFx0XHRjb250cm9sbGVyOiA8VENvbnRyb2xsZXJUeXBlPiRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMsIGNvbnRyb2xsZXJCaW5kaW5ncyksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZGlyZWN0aXZlKGRvbTogc3RyaW5nKTogSURpcmVjdGl2ZVJlc3VsdCB7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnKTtcclxuXHRcdFx0dmFyICRyb290U2NvcGU6IG5nLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29tcGlsZTogYW55ID0gc2VydmljZXMuJGNvbXBpbGU7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCdyZW5vdm9UZW1wbGF0ZXMnKTtcclxuXHJcblx0XHRcdHZhciBjb21wb25lbnQ6IGFueSA9ICRjb21waWxlKGRvbSkoJHJvb3RTY29wZSk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGRpcmVjdGl2ZTogY29tcG9uZW50LFxyXG5cdFx0XHRcdHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGFuZ3VsYXJGaXh0dXJlOiBJQW5ndWxhckZpeHR1cmUgPSBuZXcgQW5ndWxhckZpeHR1cmUoKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcbi8vIHVzZXMgdHlwaW5ncy9zaW5vblxyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueTtcclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElNb2NrUmVxdWVzdDxURGF0YVR5cGU+IHtcclxuXHRcdHByb21pc2U6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT47XHJcblx0XHRkYXRhOiBURGF0YVR5cGU7XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnkge1xyXG5cdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoc2VydmljZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0c2VydmljZSA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHRcdHZhciBkZWZlcnJlZDogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPiA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuXHRcdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKC4uLnBhcmFtczogYW55W10pOiBhbnkgPT4ge1xyXG5cdFx0XHRcdHZhciBkZWZlcnJlZDogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPiA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuXHRcdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdFx0ZGF0YTogY2FsbGJhY2suYXBwbHkodGhpcywgcGFyYW1zKSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBzY29wZT86IG5nLklTY29wZSk6IHZvaWQge1xyXG5cdFx0XHQvLyBTYXZlIGxvY2FsIHJlZmVyZW5jZSB0byB0aGUgcmVxdWVzdCBsaXN0IGFuZCB0aGVuIGNsZWFyXHJcblx0XHRcdHZhciBjdXJyZW50UGVuZGluZ1JlcXVlc3RzOiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPltdID0gc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF87XHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHQvLyBQcm9jZXNzIHRoZSBzYXZlZCBsaXN0LlxyXG5cdFx0XHQvLyBUaGlzIHdheSBpZiBhbnkgYWRkaXRpb25hbCByZXF1ZXN0cyBhcmUgZ2VuZXJhdGVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlIGN1cnJlbnQgLyBsb2NhbCBsaXN0IFxyXG5cdFx0XHQvLyAgdGhlc2UgcmVxdWVzdHMgd2lsbCBiZSBxdWV1ZWQgdW50aWwgdGhlIG5leHQgY2FsbCB0byBmbHVzaCgpLlxyXG5cdFx0XHRfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgKHJlcXVlc3Q6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0aWYgKHJlcXVlc3Quc3VjY2Vzc2Z1bCkge1xyXG5cdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlc29sdmUocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlamVjdChyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0c2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIG1vY2s6IElNb2NrID0gbmV3IE1vY2soKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ3ZhbGlkYXRpb25GYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkhhbmRsZXIge1xyXG5cdFx0aXNBY3RpdmU/OiB7KCk6IGJvb2xlYW59IHwgYm9vbGVhbjtcclxuXHRcdHZhbGlkYXRlKCk6IGJvb2xlYW47XHJcblx0XHRlcnJvck1lc3NhZ2U6IHN0cmluZyB8IHsoKTogc3RyaW5nfTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHQoKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRcdHZhbGlkYXRlKCk6IGJvb2xlYW47XHJcblx0XHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRub3RpZnlBc0Vycm9yOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgdmFsaWRhdGlvbkhhbmRsZXJzOiB7IFtpbmRleDogbnVtYmVyXTogSVZhbGlkYXRpb25IYW5kbGVyIH0gPSB7fTtcclxuXHRcdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHRcdG5vdGlmeUFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbjogc2VydmljZXMubm90aWZpY2F0aW9uLklOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuXHRcdHZhbGlkYXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0XHRfLmVhY2godGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIChoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHR2YXIgaXNBY3RpdmU6IGJvb2xlYW4gPSAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmICg8eygpOiBib29sZWFufT5oYW5kbGVyLmlzQWN0aXZlKSgpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHx8IGhhbmRsZXIuaXNBY3RpdmUgPT0gbnVsbFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHx8IGhhbmRsZXIuaXNBY3RpdmUgPT09IHRydWU7XHJcblxyXG5cdFx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVycm9yOiBzdHJpbmcgPSBfLmlzRnVuY3Rpb24oaGFuZGxlci5lcnJvck1lc3NhZ2UpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PyAoPHsoKTogc3RyaW5nfT5oYW5kbGVyLmVycm9yTWVzc2FnZSkoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDogPHN0cmluZz5oYW5kbGVyLmVycm9yTWVzc2FnZTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5ub3RpZnlBc0Vycm9yKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubm90aWZpY2F0aW9uLmVycm9yKGVycm9yKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubm90aWZpY2F0aW9uLndhcm5pbmcoZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGlzVmFsaWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdFx0dGhpcy5uZXh0S2V5Kys7XHJcblx0XHRcdHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2N1cnJlbnRLZXldID0gaGFuZGxlcjtcclxuXHJcblx0XHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0XHRkZWxldGUgdGhpcy52YWxpZGF0aW9uSGFuZGxlcnNba2V5XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJVmFsaWRhdGlvblNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0aW9uU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtzZXJ2aWNlcy5ub3RpZmljYXRpb24uc2VydmljZU5hbWVdO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0aW9uU2VydmljZUZhY3Rvcnkobm90aWZpY2F0aW9uOiBzZXJ2aWNlcy5ub3RpZmljYXRpb24uSU5vdGlmaWNhdGlvblNlcnZpY2UpOiBJVmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblNlcnZpY2Uobm90aWZpY2F0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtzZXJ2aWNlcy5ub3RpZmljYXRpb24ubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgdmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdqcXVlcnlVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJSlF1ZXJ5VXRpbGl0eSB7XHJcblx0XHRyZXBsYWNlQ29udGVudChjb250ZW50QXJlYTogSlF1ZXJ5LCBuZXdDb250ZW50czogSlF1ZXJ5KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEpRdWVyeVV0aWxpdHkgaW1wbGVtZW50cyBJSlF1ZXJ5VXRpbGl0eSB7XHJcblx0XHRyZXBsYWNlQ29udGVudChjb250ZW50QXJlYTogSlF1ZXJ5LCBuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0Y29udGVudEFyZWEuZW1wdHkoKTtcclxuXHRcdFx0Y29udGVudEFyZWEuYXBwZW5kKG5ld0NvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgSlF1ZXJ5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpc0VtcHR5L2lzRW1wdHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlL3RydW5jYXRlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGlzRW1wdHkubW9kdWxlTmFtZSxcclxuXHRcdHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUvZGF0ZS5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2pxdWVyeS9qcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbW9tZW50L21vbWVudC5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0cmluZy9zdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndGltZS90aW1lLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlLm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lLFxyXG5cdFx0Ym9vbGVhbi5tb2R1bGVOYW1lLFxyXG5cdFx0Y29udGVudFByb3ZpZGVyLm1vZHVsZU5hbWUsXHJcblx0XHRkYXRlLm1vZHVsZU5hbWUsXHJcblx0XHRmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG5cdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5tb2R1bGVOYW1lLFxyXG5cdFx0anF1ZXJ5Lm1vZHVsZU5hbWUsXHJcblx0XHRtb21lbnRXcmFwcGVyLm1vZHVsZU5hbWUsXHJcblx0XHRub3RpZmljYXRpb24ubW9kdWxlTmFtZSxcclxuXHRcdG51bWJlci5tb2R1bGVOYW1lLFxyXG5cdFx0b2JqZWN0Lm1vZHVsZU5hbWUsXHJcblx0XHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0XHRwcm9taXNlLm1vZHVsZU5hbWUsXHJcblx0XHRzdHJpbmcubW9kdWxlTmFtZSxcclxuXHRcdHRpbWUubW9kdWxlTmFtZSxcclxuXHRcdHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGJlaGF2aW9ycy5tb2R1bGVOYW1lLFxyXG5cdFx0ZmlsdGVycy5tb2R1bGVOYW1lLFxyXG5cdFx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=