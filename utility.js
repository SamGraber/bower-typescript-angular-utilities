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
// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../typings/angularMocks.d.ts' />
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
                    AngularFixture.prototype.controllerWithBindings = function (controllerName, bindings, locals, scope) {
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
                            controller: $controller(controllerName, locals, bindings),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50cyIsImZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHMiLCJiZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsInNlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwidHlwZXMvY29tcGFyZVJlc3VsdC50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwiZmlsdGVycy9maWx0ZXIudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsInNlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJzZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsInNlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsInNlcnZpY2VzL3Rlc3QvbW9jay50cyIsInNlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIiwiYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMiLCJmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIiwic2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbInJsIiwicmwudXRpbGl0aWVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdCIsInJsLnV0aWxpdGllcy5maWx0ZXJzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbiIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24uc3RvcEV2ZW50UHJvcGFnYXRpb24iLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uLnN0b3BFdmVudFByb3BhZ2F0aW9uLmxpbmsiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc2F2aW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb21wbGV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc3VjY2Vzc2Z1bCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UudHJpZ2dlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UubnVsbEZvcm0uJHNldFByaXN0aW5lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLmF1dG9zYXZlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXIubW9tZW50V3JhcHBlciIsInJsLnV0aWxpdGllcy50eXBlcyIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0IiwicmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdCIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0LmdldENvbXBhcmVSZXN1bHQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5pc0xlYXBZZWFyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldERheXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5EYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29tcGFyZURhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZGF0ZUluUmFuZ2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0Tm93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS50b051bWJlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29udGFpbnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnN1YnN0aXR1dGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnJlcGxhY2VBbGwiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaE9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5TaWduIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmRpc3BsYXkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkucmVwbGFjZUNvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLmluZm8iLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2Uud2FybmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5lcnJvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIuaW5mbyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLndhcm5pbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5lcnJvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLnN1Y2Nlc3MiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5ub3RpZnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb250cm9sbGVyV2l0aEJpbmRpbmdzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmZsdXNoIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZS5yZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UudW5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSJdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0E2RVI7QUE3RUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBNkVsQkE7SUE3RVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBNkUzQkE7UUE3RW1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxLQUFLQSxDQTZFakNBO1lBN0U0QkEsV0FBQUEsT0FBS0EsRUFBQ0EsQ0FBQ0E7Z0JBQ25DQyxZQUFZQSxDQUFDQTtnQkFFRkEsa0JBQVVBLEdBQVdBLDZCQUE2QkEsQ0FBQ0E7Z0JBQ25EQSxtQkFBV0EsR0FBV0EsY0FBY0EsQ0FBQ0E7Z0JBWWhEQTtvQkFBQUM7b0JBeURBQyxDQUFDQTtvQkF4REFELGtDQUFXQSxHQUFYQSxVQUF1QkEsS0FBa0JBLEVBQUVBLFNBQXlDQTt3QkFDbkZFLElBQUlBLFdBQW1CQSxDQUFDQTt3QkFFeEJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLElBQWVBLEVBQUVBLEtBQWFBOzRCQUM1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ3JCQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtnQ0FDcEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBOzRCQUNkQSxDQUFDQTt3QkFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRUhBLE1BQU1BLENBQUNBLFdBQVdBLElBQUlBLElBQUlBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUMvQ0EsQ0FBQ0E7b0JBRURGLDZCQUFNQSxHQUFOQSxVQUFrQkEsS0FBa0JBLEVBQUVBLElBQStDQTt3QkFDcEZHLElBQUlBLEtBQWFBLENBQUNBO3dCQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3hCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxFQUErQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3BFQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQWFBLElBQUlBLENBQUNBLENBQUNBO3dCQUMzQ0EsQ0FBQ0E7d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2xDQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTtvQkFDRkEsQ0FBQ0E7b0JBRURILDhCQUFPQSxHQUFQQSxVQUFtQkEsS0FBa0JBLEVBQUVBLE9BQWtCQSxFQUFFQSxPQUFrQkE7d0JBQzVFSSxJQUFJQSxLQUFLQSxHQUFXQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTt3QkFFOUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoQkEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2pDQSxDQUFDQTtvQkFDRkEsQ0FBQ0E7b0JBRURKLDBCQUFHQSxHQUFIQSxVQUFlQSxLQUFrQkEsRUFBRUEsU0FBeUNBO3dCQUMzRUssSUFBSUEsSUFBY0EsQ0FBQ0E7d0JBRW5CQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkJBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLElBQWVBLElBQWVBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUMvRUEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNQQSxJQUFJQSxHQUFVQSxLQUFLQSxDQUFDQTt3QkFDckJBLENBQUNBO3dCQUVEQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxVQUFDQSxHQUFXQSxFQUFFQSxHQUFXQSxJQUFlQSxNQUFNQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdkZBLENBQUNBO29CQUVETCxtQ0FBWUEsR0FBWkEsVUFBd0JBLEtBQWtCQSxFQUFFQSxXQUEwQ0E7d0JBRXJGTSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxVQUEwQ0EsRUFBRUEsSUFBZUE7NEJBQ2xGQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTs0QkFDckNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO3dCQUNuQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1JBLENBQUNBO29CQUNGTixtQkFBQ0E7Z0JBQURBLENBekRBRCxBQXlEQ0MsSUFBQUQ7Z0JBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGtCQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtxQkFDNUJBLE9BQU9BLENBQUNBLG1CQUFXQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUN0Q0EsQ0FBQ0EsRUE3RTRCRCxLQUFLQSxHQUFMQSxjQUFLQSxLQUFMQSxjQUFLQSxRQTZFakNBO1FBQURBLENBQUNBLEVBN0VtQkQsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQTZFM0JBO0lBQURBLENBQUNBLEVBN0VTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQTZFbEJBO0FBQURBLENBQUNBLEVBN0VNLEVBQUUsS0FBRixFQUFFLFFBNkVSO0FDaEZELHlCQUF5QjtBQUN6QixzQkFBc0I7QUFFdEIsa0RBQWtEO0FBRWxELElBQU8sRUFBRSxDQTZHUjtBQTdHRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0E2R2xCQTtJQTdHU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsUUFBUUEsQ0E2RzNCQTtRQTdHbUJBLFdBQUFBLFFBQVFBO1lBQUNDLElBQUFBLE1BQU1BLENBNkdsQ0E7WUE3RzRCQSxXQUFBQSxRQUFNQSxFQUFDQSxDQUFDQTtnQkFDcENTLFlBQVlBLENBQUNBO2dCQUVGQSxtQkFBVUEsR0FBV0EsOEJBQThCQSxDQUFDQTtnQkFDcERBLG9CQUFXQSxHQUFXQSxlQUFlQSxDQUFDQTtnQkFnQmpEQTtvQkFFRUMsdUJBQW9CQSxLQUEwQkE7d0JBQTFCQyxVQUFLQSxHQUFMQSxLQUFLQSxDQUFxQkE7b0JBQzlDQSxDQUFDQTtvQkFFRkQscUNBQWFBLEdBQWJBLFVBQWNBLE1BQVdBO3dCQUN4QkUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3BCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDYkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUM5QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsS0FBS0EsQ0FBQ0E7d0JBQ2hDQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQy9CQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTt3QkFDeEJBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDUEEsTUFBTUEsQ0FBQ0EsTUFBTUEsS0FBS0EsRUFBRUEsQ0FBQ0E7d0JBQ3RCQSxDQUFDQTtvQkFDRkEsQ0FBQ0E7b0JBRURGLDBDQUFrQkEsR0FBbEJBLFVBQW1CQSxNQUFXQTt3QkFDN0JHLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUN4QkEsTUFBTUEsR0FBWUEsTUFBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7d0JBQ2xDQSxDQUFDQTt3QkFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7b0JBQ25DQSxDQUFDQTtvQkFFREgsZ0NBQVFBLEdBQVJBLFVBQVNBLElBQVNBLEVBQUVBLElBQVNBO3dCQUE3QkksaUJBK0NDQTt3QkE5Q0FBLElBQUlBLEtBQUtBLEdBQVdBLE9BQU9BLElBQUlBLENBQUNBO3dCQUNoQ0EsSUFBSUEsS0FBS0EsR0FBV0EsT0FBT0EsSUFBSUEsQ0FBQ0E7d0JBRWhDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3pDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTt3QkFDZEEsQ0FBQ0E7d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBOzRCQUNyQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ2RBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEtBQUtBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dDQUNqQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ2RBLENBQUNBOzRCQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQ0FDOUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO29DQUMvQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0NBQ2RBLENBQUNBOzRCQUNGQSxDQUFDQTt3QkFDRkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBOzRCQUMvQkEsd0NBQXdDQTs0QkFDeENBLElBQUlBLEtBQUtBLEdBQWFBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNuQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsVUFBQ0EsS0FBVUEsRUFBRUEsR0FBV0E7Z0NBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQ0FDdEJBLGdGQUFnRkE7b0NBQ2hGQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTt3Q0FDL0NBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO29DQUNkQSxDQUFDQTtvQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0NBQ1BBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO29DQUMvQkEsQ0FBQ0E7Z0NBQ0ZBLENBQUNBO2dDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQ0FDUEEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0NBQ2RBLENBQUNBOzRCQUNGQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDSEEsOEZBQThGQTs0QkFDOUZBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dDQUNsQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7NEJBQ2RBLENBQUNBO3dCQUNGQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLGdEQUFnREE7NEJBQ2hEQSxNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxJQUFJQSxDQUFDQTt3QkFDdEJBLENBQUNBO3dCQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFDYkEsQ0FBQ0E7b0JBRURKLGdDQUFRQSxHQUFSQSxVQUFTQSxNQUFXQTt3QkFDbkJLLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBO29CQUNwQkEsQ0FBQ0E7b0JBRURMLHNDQUFjQSxHQUFkQSxVQUFlQSxLQUFVQSxFQUFFQSxZQUFpQkE7d0JBQzNDTSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbkJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO3dCQUNkQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBO3dCQUNyQkEsQ0FBQ0E7b0JBQ0ZBLENBQUNBO29CQW5GT04scUJBQU9BLEdBQWFBLENBQUNBLGNBQUtBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO29CQW9GakRBLG9CQUFDQTtnQkFBREEsQ0FyRkFELEFBcUZDQyxJQUFBRDtnQkFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQVVBLEVBQUVBLENBQUNBLGNBQUtBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3FCQUM1Q0EsT0FBT0EsQ0FBQ0Esb0JBQVdBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3ZDQSxDQUFDQSxFQTdHNEJULE1BQU1BLEdBQU5BLGVBQU1BLEtBQU5BLGVBQU1BLFFBNkdsQ0E7UUFBREEsQ0FBQ0EsRUE3R21CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBNkczQkE7SUFBREEsQ0FBQ0EsRUE3R1NELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBNkdsQkE7QUFBREEsQ0FBQ0EsRUE3R00sRUFBRSxLQUFGLEVBQUUsUUE2R1I7QUNsSEQsdUJBQXVCO0FBRXZCLGdFQUFnRTtBQUVoRSxJQUFPLEVBQUUsQ0E0QlI7QUE1QkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBNEJsQkE7SUE1QlNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLE9BQU9BLENBNEIxQkE7UUE1Qm1CQSxXQUFBQSxPQUFPQTtZQUFDa0IsSUFBQUEsT0FBT0EsQ0E0QmxDQTtZQTVCMkJBLFdBQUFBLFNBQU9BLEVBQUNBLENBQUNBO2dCQUNwQ0MsWUFBWUEsQ0FBQ0E7Z0JBRWJBLElBQU9BLFFBQVFBLEdBQUdBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO2dCQUVwQ0Esb0JBQVVBLEdBQVdBLDhCQUE4QkEsQ0FBQ0E7Z0JBQ3BEQSxxQkFBV0EsR0FBV0EsU0FBU0EsQ0FBQ0E7Z0JBQ2hDQSxvQkFBVUEsR0FBV0EscUJBQVdBLEdBQUdBLFFBQVFBLENBQUNBO2dCQU12REEsT0FBT0EsQ0FBQ0EsT0FBT0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pDQSxpQkFBaUJBLE1BQStCQTtvQkFDL0NDLFlBQVlBLENBQUNBO29CQUNiQSxNQUFNQSxDQUFDQSxVQUFDQSxLQUFVQSxFQUFFQSxhQUF1QkE7d0JBQzFDQSxJQUFJQSxPQUFPQSxHQUFZQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTt3QkFFbkRBLEVBQUVBLENBQUNBLENBQUNBLGFBQWFBLEtBQUtBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBOzRCQUM3QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7d0JBQ2pCQSxDQUFDQTt3QkFDREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7b0JBQ2hCQSxDQUFDQSxDQUFDQTtnQkFDSEEsQ0FBQ0E7Z0JBRURELE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLG9CQUFVQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtxQkFDL0NBLE1BQU1BLENBQUNBLHFCQUFXQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUNoQ0EsQ0FBQ0EsRUE1QjJCRCxPQUFPQSxHQUFQQSxlQUFPQSxLQUFQQSxlQUFPQSxRQTRCbENBO1FBQURBLENBQUNBLEVBNUJtQmxCLE9BQU9BLEdBQVBBLGlCQUFPQSxLQUFQQSxpQkFBT0EsUUE0QjFCQTtJQUFEQSxDQUFDQSxFQTVCU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUE0QmxCQTtBQUFEQSxDQUFDQSxFQTVCTSxFQUFFLEtBQUYsRUFBRSxRQTRCUjtBQ2hDRCx5QkFBeUI7QUFDekIsOEZBQThGO0FBRTlGLGdFQUFnRTtBQUVoRSxJQUFPLEVBQUUsQ0FtQ1I7QUFuQ0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBbUNsQkE7SUFuQ1NBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLE9BQU9BLENBbUMxQkE7UUFuQ21CQSxXQUFBQSxPQUFPQTtZQUFDa0IsSUFBQUEsUUFBUUEsQ0FtQ25DQTtZQW5DMkJBLFdBQUFBLFVBQVFBLEVBQUNBLENBQUNBO2dCQUNyQ0csWUFBWUEsQ0FBQ0E7Z0JBRWJBLElBQU9BLFFBQVFBLEdBQUdBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO2dCQUVwQ0EscUJBQVVBLEdBQVdBLGlDQUFpQ0EsQ0FBQ0E7Z0JBQ3ZEQSxzQkFBV0EsR0FBV0EsVUFBVUEsQ0FBQ0E7Z0JBQ2pDQSxxQkFBVUEsR0FBV0Esc0JBQVdBLEdBQUdBLFFBQVFBLENBQUNBO2dCQU92REEsUUFBUUEsQ0FBQ0EsT0FBT0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxrQkFBa0JBLGFBQXNDQTtvQkFDdkRDLFlBQVlBLENBQUNBO29CQUNiQSxNQUFNQSxDQUFDQSxVQUFDQSxLQUFXQSxFQUFFQSxVQUFtQkEsRUFBRUEsZUFBeUJBO3dCQUNsRUEsZUFBZUEsR0FBR0EsZUFBZUEsSUFBSUEsSUFBSUEsR0FBR0EsS0FBS0EsR0FBR0EsZUFBZUEsQ0FBQ0E7d0JBRXBFQSxJQUFJQSxHQUFHQSxHQUFXQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEtBQUtBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO3dCQUNsRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxDQUFDQSxNQUFNQSxHQUFHQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDbkRBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO2dDQUNuQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0NBQ3JCQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQTtnQ0FDZEEsQ0FBQ0E7NEJBQ0ZBLENBQUNBO3dCQUNGQSxDQUFDQTt3QkFDREEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ1pBLENBQUNBLENBQUNBO2dCQUNIQSxDQUFDQTtnQkFFREQsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EscUJBQVVBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3FCQUMvQ0EsTUFBTUEsQ0FBQ0Esc0JBQVdBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQ2pDQSxDQUFDQSxFQW5DMkJILFFBQVFBLEdBQVJBLGdCQUFRQSxLQUFSQSxnQkFBUUEsUUFtQ25DQTtRQUFEQSxDQUFDQSxFQW5DbUJsQixPQUFPQSxHQUFQQSxpQkFBT0EsS0FBUEEsaUJBQU9BLFFBbUMxQkE7SUFBREEsQ0FBQ0EsRUFuQ1NELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBbUNsQkE7QUFBREEsQ0FBQ0EsRUFuQ00sRUFBRSxLQUFGLEVBQUUsUUFtQ1I7QUN4Q0QsdUJBQXVCO0FBRXZCLElBQU8sRUFBRSxDQTJCUjtBQTNCRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0EyQmxCQTtJQTNCU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsU0FBU0EsQ0EyQjVCQTtRQTNCbUJBLFdBQUFBLFNBQVNBO1lBQUN1QixJQUFBQSxvQkFBb0JBLENBMkJqREE7WUEzQjZCQSxXQUFBQSxvQkFBb0JBLEVBQUNBLENBQUNBO2dCQUNuREMsWUFBWUEsQ0FBQ0E7Z0JBRUZBLCtCQUFVQSxHQUFXQSw2Q0FBNkNBLENBQUNBO2dCQUNuRUEsa0NBQWFBLEdBQVdBLHdCQUF3QkEsQ0FBQ0E7Z0JBTTVEQTtvQkFDQ0MsWUFBWUEsQ0FBQ0E7b0JBQ2JBLE1BQU1BLENBQUNBO3dCQUNOQSxRQUFRQSxFQUFFQSxHQUFHQTt3QkFDYkEsSUFBSUEsWUFBQ0EsS0FBZ0JBLEVBQ2xCQSxPQUE0QkEsRUFDNUJBLEtBQWlDQTs0QkFDbkNDLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLHNCQUFzQkEsRUFBRUEsVUFBQ0EsS0FBd0JBO2dDQUNqRUEsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7Z0NBQ3ZCQSxLQUFLQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTs0QkFDekJBLENBQUNBLENBQUNBLENBQUNBO3dCQUNKQSxDQUFDQTtxQkFDREQsQ0FBQ0E7Z0JBQ0hBLENBQUNBO2dCQUVERCxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSwrQkFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0E7cUJBQzVCQSxTQUFTQSxDQUFDQSxrQ0FBYUEsRUFBRUEsb0JBQW9CQSxDQUFDQSxDQUFDQTtZQUNsREEsQ0FBQ0EsRUEzQjZCRCxvQkFBb0JBLEdBQXBCQSw4QkFBb0JBLEtBQXBCQSw4QkFBb0JBLFFBMkJqREE7UUFBREEsQ0FBQ0EsRUEzQm1CdkIsU0FBU0EsR0FBVEEsbUJBQVNBLEtBQVRBLG1CQUFTQSxRQTJCNUJBO0lBQURBLENBQUNBLEVBM0JTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQTJCbEJBO0FBQURBLENBQUNBLEVBM0JNLEVBQUUsS0FBRixFQUFFLFFBMkJSO0FDNUJELElBQU8sRUFBRSxDQWdFUjtBQWhFRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FnRWxCQTtJQWhFU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsUUFBUUEsQ0FnRTNCQTtRQWhFbUJBLFdBQUFBLFFBQVFBO1lBQUNDLElBQUFBLGNBQWNBLENBZ0UxQ0E7WUFoRTRCQSxXQUFBQSxjQUFjQSxFQUFDQSxDQUFDQTtnQkFDNUMwQixZQUFZQSxDQUFDQTtnQkFFRkEseUJBQVVBLEdBQVdBLHNDQUFzQ0EsQ0FBQ0E7Z0JBQzVEQSwwQkFBV0EsR0FBV0EsZ0JBQWdCQSxDQUFDQTtnQkFTbERBO29CQUVDQywrQkFBb0JBLFFBQTRCQTt3QkFGakRDLGlCQStDQ0E7d0JBN0NvQkEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBb0JBO3dCQUV4Q0EsNEJBQXVCQSxHQUFXQSxJQUFJQSxDQUFDQTt3QkF3QnZDQSx1QkFBa0JBLEdBQXlCQSxVQUFDQSxJQUFTQTs0QkFDNURBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO3dCQUN6Q0EsQ0FBQ0EsQ0FBQUE7d0JBRU9BLG1CQUFjQSxHQUF5QkEsVUFBQ0EsSUFBU0E7NEJBQ3hEQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTt3QkFDMUNBLENBQUNBLENBQUFBO3dCQUVPQSxvQkFBZUEsR0FBMkNBLFVBQUNBLElBQVNBLEVBQUVBLE9BQWdCQTs0QkFDN0ZBLEtBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBOzRCQUNyQkEsS0FBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7NEJBQ3RCQSxLQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxPQUFPQSxDQUFDQTs0QkFFM0JBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBO2dDQUNiQSxLQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTs0QkFDeEJBLENBQUNBLEVBQUVBLEtBQUlBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsQ0FBQ0E7NEJBRWpDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTt3QkFDYkEsQ0FBQ0EsQ0FBQUE7b0JBNUNrREEsQ0FBQ0E7b0JBUXBERCxzQkFBSUEseUNBQU1BOzZCQUFWQTs0QkFDQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7d0JBQ3JCQSxDQUFDQTs7O3VCQUFBRjtvQkFFREEsc0JBQUlBLDJDQUFRQTs2QkFBWkE7NEJBQ0NHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO3dCQUN2QkEsQ0FBQ0E7Ozt1QkFBQUg7b0JBRURBLHNCQUFJQSw2Q0FBVUE7NkJBQWRBOzRCQUNDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTt3QkFDekJBLENBQUNBOzs7dUJBQUFKO29CQUVEQSx1Q0FBT0EsR0FBUEEsVUFBUUEsT0FBeUJBO3dCQUNoQ0ssSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ3BCQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBOzZCQUN4Q0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2hDQSxDQUFDQTtvQkF6Qk1MLDZCQUFPQSxHQUFhQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtvQkE4Q3pDQSw0QkFBQ0E7Z0JBQURBLENBL0NBRCxBQStDQ0MsSUFBQUQ7Z0JBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLHlCQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtxQkFDNUJBLE9BQU9BLENBQUNBLDBCQUFXQSxFQUFFQSxxQkFBcUJBLENBQUNBLENBQUNBO1lBQy9DQSxDQUFDQSxFQWhFNEIxQixjQUFjQSxHQUFkQSx1QkFBY0EsS0FBZEEsdUJBQWNBLFFBZ0UxQ0E7UUFBREEsQ0FBQ0EsRUFoRW1CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBZ0UzQkE7SUFBREEsQ0FBQ0EsRUFoRVNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBZ0VsQkE7QUFBREEsQ0FBQ0EsRUFoRU0sRUFBRSxLQUFGLEVBQUUsUUFnRVI7QUNqRUQsdUJBQXVCO0FBRXZCLG9FQUFvRTtBQUVwRSxJQUFPLEVBQUUsQ0FtRlI7QUFuRkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBbUZsQkE7SUFuRlNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBbUYzQkE7UUFuRm1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxRQUFRQSxDQW1GcENBO1lBbkY0QkEsV0FBQUEsUUFBUUEsRUFBQ0EsQ0FBQ0E7Z0JBQ3RDaUMsWUFBWUEsQ0FBQ0E7Z0JBRWJBLElBQU9BLGdCQUFnQkEsR0FBR0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7Z0JBRXBEQSxtQkFBVUEsR0FBV0EsZ0NBQWdDQSxDQUFDQTtnQkFDdERBLG9CQUFXQSxHQUFXQSxpQkFBaUJBLENBQUNBO2dCQU9uREE7b0JBR0NDLHlCQUFvQkEsZUFBd0RBLEVBQ2hFQSxJQUEyQ0EsRUFDNUNBLFdBQWdDQSxFQUMvQkEsUUFBd0JBO3dCQU5yQ0MsaUJBb0RDQTt3QkFqRG9CQSxvQkFBZUEsR0FBZkEsZUFBZUEsQ0FBeUNBO3dCQUNoRUEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBdUNBO3dCQUM1Q0EsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQXFCQTt3QkFDL0JBLGFBQVFBLEdBQVJBLFFBQVFBLENBQWdCQTt3QkFRcENBLGFBQVFBLEdBQWtDQTs0QkFBQ0EsY0FBY0E7aUNBQWRBLFdBQWNBLENBQWRBLHNCQUFjQSxDQUFkQSxJQUFjQTtnQ0FBZEEsNkJBQWNBOzs0QkFDeERBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO2dDQUNoQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7NEJBQ2JBLENBQUNBOzRCQUVEQSxJQUFJQSxLQUFLQSxHQUFZQSxJQUFJQSxDQUFDQTs0QkFDMUJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2dDQUN2QkEsS0FBS0EsR0FBR0EsS0FBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7Z0NBQ3hCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtvQ0FDekJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO2dDQUNkQSxDQUFDQTs0QkFDRkEsQ0FBQ0E7NEJBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dDQUNYQSxJQUFJQSxPQUFPQSxHQUFzQkEsS0FBSUEsQ0FBQ0EsSUFBSUEsT0FBVEEsS0FBSUEsRUFBU0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0NBRXBEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQ0FDN0JBLEtBQUlBLENBQUNBLGVBQWVBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBO3dDQUN6Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsV0FBV0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NENBQzlCQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTt3Q0FDakNBLENBQUNBO29DQUNGQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDTEEsQ0FBQ0E7Z0NBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBOzRCQUNiQSxDQUFDQTs0QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0NBQ1BBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBOzRCQUNkQSxDQUFDQTt3QkFDRkEsQ0FBQ0EsQ0FBQUE7d0JBbkNBQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQTt3QkFFckNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUM5QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7d0JBQ3BDQSxDQUFDQTtvQkFDRkEsQ0FBQ0E7b0JBZ0NPRCxrQ0FBUUEsR0FBaEJBO3dCQUNDRSxNQUFNQSxDQUFNQTs0QkFDWEEsU0FBU0EsRUFBRUEsS0FBS0E7NEJBQ2hCQSxZQUFZQTtnQ0FDWEMsTUFBTUEsQ0FBQ0E7NEJBQ1JBLENBQUNBO3lCQUNERCxDQUFDQTtvQkFDSEEsQ0FBQ0E7b0JBQ0ZGLHNCQUFDQTtnQkFBREEsQ0FwREFELEFBb0RDQyxJQUFBRDtnQkFNREEsc0JBQXNCQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO2dCQUNoRUEsZ0NBQWdDQSxlQUF3REE7b0JBQ3ZGSyxZQUFZQSxDQUFDQTtvQkFDYkEsTUFBTUEsQ0FBQ0E7d0JBQ05BLFdBQVdBLFlBQUNBLElBQStCQSxFQUFFQSxXQUFnQ0EsRUFBRUEsUUFBMEJBOzRCQUN4R0MsTUFBTUEsQ0FBQ0EsSUFBSUEsZUFBZUEsQ0FBQ0EsZUFBZUEsRUFBRUEsSUFBSUEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7d0JBQzFFQSxDQUFDQTtxQkFDREQsQ0FBQ0E7Z0JBQ0hBLENBQUNBO2dCQUVETCxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBVUEsRUFBRUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtxQkFDdkRBLE9BQU9BLENBQUNBLG9CQUFXQSxFQUFFQSxzQkFBc0JBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQSxFQW5GNEJqQyxRQUFRQSxHQUFSQSxpQkFBUUEsS0FBUkEsaUJBQVFBLFFBbUZwQ0E7UUFBREEsQ0FBQ0EsRUFuRm1CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBbUYzQkE7SUFBREEsQ0FBQ0EsRUFuRlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBbUZsQkE7QUFBREEsQ0FBQ0EsRUFuRk0sRUFBRSxLQUFGLEVBQUUsUUFtRlI7QUN2RkQsdUJBQXVCO0FBRXZCLElBQU8sRUFBRSxDQWtCUjtBQWxCRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FrQmxCQTtJQWxCU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsUUFBUUEsQ0FrQjNCQTtRQWxCbUJBLFdBQUFBLFFBQVFBO1lBQUNDLElBQUFBLE9BQU9BLENBa0JuQ0E7WUFsQjRCQSxXQUFBQSxPQUFPQSxFQUFDQSxDQUFDQTtnQkFDckN3QyxZQUFZQSxDQUFDQTtnQkFFRkEsa0JBQVVBLEdBQVdBLCtCQUErQkEsQ0FBQ0E7Z0JBQ3JEQSxtQkFBV0EsR0FBV0EsZ0JBQWdCQSxDQUFDQTtnQkFNbERBO29CQUFBQztvQkFJQUMsQ0FBQ0E7b0JBSEFELCtCQUFNQSxHQUFOQSxVQUFPQSxNQUFXQTt3QkFDakJFLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO29CQUNqQkEsQ0FBQ0E7b0JBQ0ZGLHFCQUFDQTtnQkFBREEsQ0FKQUQsQUFJQ0MsSUFBQUQ7Z0JBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGtCQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtxQkFDNUJBLE9BQU9BLENBQUNBLG1CQUFXQSxFQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtZQUN4Q0EsQ0FBQ0EsRUFsQjRCeEMsT0FBT0EsR0FBUEEsZ0JBQU9BLEtBQVBBLGdCQUFPQSxRQWtCbkNBO1FBQURBLENBQUNBLEVBbEJtQkQsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQWtCM0JBO0lBQURBLENBQUNBLEVBbEJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQWtCbEJBO0FBQURBLENBQUNBLEVBbEJNLEVBQUUsS0FBRixFQUFFLFFBa0JSO0FDcEJELHlCQUF5QjtBQUN6QixzQkFBc0I7QUFFdEIsSUFBTyxFQUFFLENBK0VSO0FBL0VELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQStFbEJBO0lBL0VTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxRQUFRQSxDQStFM0JBO1FBL0VtQkEsV0FBQUEsUUFBUUE7WUFBQ0MsSUFBQUEsVUFBVUEsQ0ErRXRDQTtZQS9FNEJBLFdBQUFBLFVBQVVBLEVBQUNBLENBQUNBO2dCQUN4QzRDLFlBQVlBLENBQUNBO2dCQUVGQSxxQkFBVUEsR0FBV0Esa0NBQWtDQSxDQUFDQTtnQkFDeERBLHNCQUFXQSxHQUFXQSxtQkFBbUJBLENBQUNBO2dCQXNCckRBO29CQUFBQzt3QkFDU0MsYUFBUUEsR0FBb0JBLEVBQUVBLENBQUNBO3dCQUMvQkEsWUFBT0EsR0FBV0EsQ0FBQ0EsQ0FBQ0E7b0JBZ0M3QkEsQ0FBQ0E7b0JBOUJBRCxvQ0FBUUEsR0FBUkEsVUFBc0JBLE1BQTRCQSxFQUFFQSxLQUFjQTt3QkFBbEVFLGlCQWdCQ0E7d0JBZkFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMzQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbUNBQW1DQSxDQUFDQSxDQUFDQTs0QkFDakRBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsVUFBVUEsR0FBV0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7d0JBQ3RDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTt3QkFDZkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0E7NEJBQzNCQSxNQUFNQSxFQUFFQSxNQUFNQTs0QkFDZEEsS0FBS0EsRUFBRUEsS0FBS0E7eUJBQ1pBLENBQUNBO3dCQUVGQSxNQUFNQSxDQUFDQTs0QkFDTkEsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQzdCQSxDQUFDQSxDQUFDQTtvQkFDSEEsQ0FBQ0E7b0JBRURGLGdDQUFJQSxHQUFKQSxVQUFrQkEsS0FBY0E7d0JBQWhDRyxpQkFPQ0E7d0JBUGlDQSxnQkFBZ0JBOzZCQUFoQkEsV0FBZ0JBLENBQWhCQSxzQkFBZ0JBLENBQWhCQSxJQUFnQkE7NEJBQWhCQSwrQkFBZ0JBOzt3QkFDakRBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFVBQUNBLE9BQThCQTs0QkFDN0RBLE1BQU1BLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLElBQUlBLE9BQU9BLENBQUNBLEtBQUtBLEtBQUtBLEtBQUtBLENBQUNBO3dCQUNuREEsQ0FBQ0EsQ0FBQ0E7NkJBQ0RBLEdBQUdBLENBQUNBLFVBQUNBLE9BQThCQTs0QkFDbkNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEtBQUlBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO3dCQUMzQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7b0JBQ1pBLENBQUNBO29CQUVPSCxzQ0FBVUEsR0FBbEJBLFVBQW1CQSxHQUFXQTt3QkFDN0JJLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO29CQUMzQkEsQ0FBQ0E7b0JBQ0ZKLHdCQUFDQTtnQkFBREEsQ0FsQ0FELEFBa0NDQyxJQUFBRDtnQkFsQ1lBLDRCQUFpQkEsb0JBa0M3QkEsQ0FBQUE7Z0JBTURBO29CQUNDTSxZQUFZQSxDQUFDQTtvQkFFYkEsTUFBTUEsQ0FBQ0E7d0JBQ05BLFdBQVdBOzRCQUNWQyxNQUFNQSxDQUFDQSxJQUFJQSxpQkFBaUJBLEVBQUVBLENBQUNBO3dCQUNoQ0EsQ0FBQ0E7cUJBQ0RELENBQUNBO2dCQUNIQSxDQUFDQTtnQkFSZU4sbUNBQXdCQSwyQkFRdkNBLENBQUFBO2dCQUdEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxxQkFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0E7cUJBQzVCQSxPQUFPQSxDQUFDQSxzQkFBV0EsRUFBRUEsd0JBQXdCQSxDQUFDQSxDQUFDQTtZQUNsREEsQ0FBQ0EsRUEvRTRCNUMsVUFBVUEsR0FBVkEsbUJBQVVBLEtBQVZBLG1CQUFVQSxRQStFdENBO1FBQURBLENBQUNBLEVBL0VtQkQsUUFBUUEsR0FBUkEsa0JBQVFBLEtBQVJBLGtCQUFRQSxRQStFM0JBO0lBQURBLENBQUNBLEVBL0VTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQStFbEJBO0FBQURBLENBQUNBLEVBL0VNLEVBQUUsS0FBRixFQUFFLFFBK0VSO0FDbEZELHlCQUF5QjtBQUN6QixzQkFBc0I7QUFDdEIsc0JBQXNCO0FBRXRCLDREQUE0RDtBQUU1RCxJQUFPLEVBQUUsQ0F3RVI7QUF4RUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBd0VsQkE7SUF4RVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBd0UzQkE7UUF4RW1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxlQUFlQSxDQXdFM0NBO1lBeEU0QkEsV0FBQUEsZUFBZUEsRUFBQ0EsQ0FBQ0E7Z0JBQzdDb0QsWUFBWUEsQ0FBQ0E7Z0JBRUZBLDBCQUFVQSxHQUFXQSx1Q0FBdUNBLENBQUNBO2dCQUM3REEsMkJBQVdBLEdBQVdBLHdCQUF3QkEsQ0FBQ0E7Z0JBUzFEQTtvQkFDQ0MsZ0NBQVlBLGlCQUF1REE7d0JBRHBFQyxpQkF3Q0NBO3dCQTNCQUEseUJBQW9CQSxHQUE4REEsVUFBQ0Esa0JBQTBDQTs0QkFDNUhBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ3RDQSxrQkFBa0JBLENBQUNBLFVBQUNBLEtBQWFBO29DQUNoQ0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ3hCQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDSkEsQ0FBQ0E7NEJBQUNBLElBQUlBLENBQUNBLENBQUNBO2dDQUNQQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDdkJBLENBQUNBO3dCQUNGQSxDQUFDQSxDQUFBQTt3QkFuQkFBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7b0JBQ25EQSxDQUFDQTtvQkFLREQsMkNBQVVBLEdBQVZBLFVBQVdBLE9BQWVBO3dCQUN6QkUsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0E7d0JBQ3ZCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO29CQUN4Q0EsQ0FBQ0E7b0JBWURGLHlDQUFRQSxHQUFSQSxVQUFTQSxNQUFvQ0EsRUFBRUEsUUFBaUJBO3dCQUFoRUcsaUJBUUNBO3dCQVBBQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDMUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO3dCQUNuQ0EsQ0FBQ0E7d0JBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBOzRCQUMvQkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ25DQSxDQUFDQSxFQUFFQSxnQkFBZ0JBLENBQUNBLENBQUNBO29CQUN0QkEsQ0FBQ0E7b0JBRURILDJDQUFVQSxHQUFWQSxVQUFXQSxRQUFpQkE7d0JBQzNCSSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO3dCQUN0Q0EsQ0FBQ0E7d0JBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO29CQUNyQkEsQ0FBQ0E7b0JBQ0ZKLDZCQUFDQTtnQkFBREEsQ0F4Q0FELEFBd0NDQyxJQUFBRDtnQkFNREEsNkJBQTZCQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxtQkFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pFQSx1Q0FBdUNBLGlCQUF1REE7b0JBQzdGTSxZQUFZQSxDQUFDQTtvQkFFYkEsTUFBTUEsQ0FBQ0E7d0JBQ05BLFdBQVdBOzRCQUNWQyxNQUFNQSxDQUFDQSxJQUFJQSxzQkFBc0JBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxDQUFDQTtxQkFDREQsQ0FBQ0E7Z0JBQ0hBLENBQUNBO2dCQUVETixPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSwwQkFBVUEsRUFBRUEsQ0FBQ0EsbUJBQVVBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3FCQUNqREEsT0FBT0EsQ0FBQ0EsMkJBQVdBLEVBQUVBLDZCQUE2QkEsQ0FBQ0EsQ0FBQ0E7WUFDdkRBLENBQUNBLEVBeEU0QnBELGVBQWVBLEdBQWZBLHdCQUFlQSxLQUFmQSx3QkFBZUEsUUF3RTNDQTtRQUFEQSxDQUFDQSxFQXhFbUJELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUF3RTNCQTtJQUFEQSxDQUFDQSxFQXhFU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUF3RWxCQTtBQUFEQSxDQUFDQSxFQXhFTSxFQUFFLEtBQUYsRUFBRSxRQXdFUjtBQzlFRCxJQUFPLEVBQUUsQ0FpQ1I7QUFqQ0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBaUNsQkE7SUFqQ1NBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBaUMzQkE7UUFqQ21CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxJQUFJQSxDQWlDaENBO1lBakM0QkEsV0FBQUEsSUFBSUEsRUFBQ0EsQ0FBQ0E7Z0JBQ2xDNEQsWUFBWUEsQ0FBQ0E7Z0JBRUZBLGVBQVVBLEdBQVdBLDRCQUE0QkEsQ0FBQ0E7Z0JBQ2xEQSxnQkFBV0EsR0FBV0EsYUFBYUEsQ0FBQ0E7Z0JBUy9DQTtvQkFBQUM7b0JBZ0JBQyxDQUFDQTtvQkFmQUQsMkNBQXFCQSxHQUFyQkEsVUFBc0JBLFlBQW9CQTt3QkFDekNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBO29CQUN4Q0EsQ0FBQ0E7b0JBRURGLDJDQUFxQkEsR0FBckJBLFVBQXNCQSxZQUFvQkE7d0JBQ3pDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBO29CQUNsRUEsQ0FBQ0E7b0JBRURILHlDQUFtQkEsR0FBbkJBLFVBQW9CQSxZQUFvQkE7d0JBQ3ZDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBO29CQUNsRUEsQ0FBQ0E7b0JBRURKLHdDQUFrQkEsR0FBbEJBLFVBQW1CQSxZQUFvQkE7d0JBQ3RDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBO29CQUNoRUEsQ0FBQ0E7b0JBQ0ZMLGtCQUFDQTtnQkFBREEsQ0FoQkFELEFBZ0JDQyxJQUFBRDtnQkFoQllBLGdCQUFXQSxjQWdCdkJBLENBQUFBO2dCQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFVQSxFQUFFQSxFQUFFQSxDQUFDQTtxQkFDNUJBLE9BQU9BLENBQUNBLGdCQUFXQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUNyQ0EsQ0FBQ0EsRUFqQzRCNUQsSUFBSUEsR0FBSkEsYUFBSUEsS0FBSkEsYUFBSUEsUUFpQ2hDQTtRQUFEQSxDQUFDQSxFQWpDbUJELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUFpQzNCQTtJQUFEQSxDQUFDQSxFQWpDU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUFpQ2xCQTtBQUFEQSxDQUFDQSxFQWpDTSxFQUFFLEtBQUYsRUFBRSxRQWlDUjtBQy9CRCxJQUFPLEVBQUUsQ0F5QlI7QUF6QkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBeUJsQkE7SUF6QlNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBeUIzQkE7UUF6Qm1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxhQUFhQSxDQXlCekNBO1lBekI0QkEsV0FBQUEsZUFBYUEsRUFBQ0EsQ0FBQ0E7Z0JBQ2hDbUUsMEJBQVVBLEdBQVdBLHFDQUFxQ0EsQ0FBQ0E7Z0JBQzNEQSwyQkFBV0EsR0FBV0EsZUFBZUEsQ0FBQ0E7Z0JBRWpEQTtvQkFDQ0MsWUFBWUEsQ0FBQ0E7b0JBRWJBLDhDQUE4Q0E7b0JBQzlDQSxnREFBZ0RBO29CQUNoREEsa0NBQWtDQTtvQkFDbENBLElBQUlBLGFBQWFBLEdBQVFBLE1BQU1BLENBQUNBLENBQUNBLGdDQUFnQ0E7b0JBRWpFQSw0REFBNERBO29CQUM1REEsbUVBQW1FQTtvQkFDbkVBLHFFQUFxRUE7b0JBQ3JFQSxhQUFhQSxDQUFDQSx1QkFBdUJBLEdBQUdBLFVBQUNBLE1BQVdBO3dCQUNuREEsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBQ2pDQSxDQUFDQSxDQUFDQTtvQkFFRkEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7Z0JBQ3RCQSxDQUFDQTtnQkFoQmVELDZCQUFhQSxnQkFnQjVCQSxDQUFBQTtnQkFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsMEJBQVVBLEVBQUVBLEVBQUVBLENBQUNBO3FCQUM3QkEsT0FBT0EsQ0FBQ0EsMkJBQVdBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO1lBRXRDQSxDQUFDQSxFQXpCNEJuRSxhQUFhQSxHQUFiQSxzQkFBYUEsS0FBYkEsc0JBQWFBLFFBeUJ6Q0E7UUFBREEsQ0FBQ0EsRUF6Qm1CRCxRQUFRQSxHQUFSQSxrQkFBUUEsS0FBUkEsa0JBQVFBLFFBeUIzQkE7SUFBREEsQ0FBQ0EsRUF6QlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBeUJsQkE7QUFBREEsQ0FBQ0EsRUF6Qk0sRUFBRSxLQUFGLEVBQUUsUUF5QlI7QUMxQkQsSUFBTyxFQUFFLENBc0JSO0FBdEJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQXNCbEJBO0lBdEJTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxLQUFLQSxDQXNCeEJBO1FBdEJtQkEsV0FBQUEsS0FBS0E7WUFBQ3NFLElBQUFBLGFBQWFBLENBc0J0Q0E7WUF0QnlCQSxXQUFBQSxhQUFhQSxFQUFDQSxDQUFDQTtnQkFDeENDLFlBQVlBLENBQUNBO2dCQUVGQSx3QkFBVUEsR0FBV0Esa0NBQWtDQSxDQUFDQTtnQkFFbkVBLFdBQVlBLGFBQWFBO29CQUN4QkMsdURBQVdBLENBQUFBO29CQUNYQSxtREFBU0EsQ0FBQUE7b0JBQ1RBLGtEQUFTQSxDQUFBQTtnQkFDVkEsQ0FBQ0EsRUFKV0QsMkJBQWFBLEtBQWJBLDJCQUFhQSxRQUl4QkE7Z0JBSkRBLElBQVlBLGFBQWFBLEdBQWJBLDJCQUlYQSxDQUFBQTtnQkFFREEsMEJBQWlDQSxHQUFXQTtvQkFDM0NFLFlBQVlBLENBQUNBO29CQUNiQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDZkEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7b0JBQzVCQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BCQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQTtvQkFDOUJBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDUEEsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBQzNCQSxDQUFDQTtnQkFDRkEsQ0FBQ0E7Z0JBVGVGLDhCQUFnQkEsbUJBUy9CQSxDQUFBQTtZQUVGQSxDQUFDQSxFQXRCeUJELGFBQWFBLEdBQWJBLG1CQUFhQSxLQUFiQSxtQkFBYUEsUUFzQnRDQTtRQUFEQSxDQUFDQSxFQXRCbUJ0RSxLQUFLQSxHQUFMQSxlQUFLQSxLQUFMQSxlQUFLQSxRQXNCeEJBO0lBQURBLENBQUNBLEVBdEJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQXNCbEJBO0FBQURBLENBQUNBLEVBdEJNLEVBQUUsS0FBRixFQUFFLFFBc0JSO0FDdkJELGdEQUFnRDtBQUNoRCxtREFBbUQ7QUFDbkQscURBQXFEO0FBRXJELHlCQUF5QjtBQUV6QixJQUFPLEVBQUUsQ0FrSVI7QUFsSUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBa0lsQkE7SUFsSVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBa0kzQkE7UUFsSW1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxJQUFJQSxDQWtJaENBO1lBbEk0QkEsV0FBQUEsTUFBSUEsRUFBQ0EsQ0FBQ0E7Z0JBQ2xDeUUsWUFBWUEsQ0FBQ0E7Z0JBRWJBLElBQU9BLGFBQWFBLEdBQUdBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBO2dCQXdCeERBO29CQUVDQyxxQkFBb0JBLE1BQTJCQSxFQUFVQSxJQUF1QkE7d0JBRmpGQyxpQkFzR0NBO3dCQXBHb0JBLFdBQU1BLEdBQU5BLE1BQU1BLENBQXFCQTt3QkFBVUEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBbUJBO3dCQWtCeEVBLGVBQVVBLEdBQVdBLFlBQVlBLENBQUNBO3dCQWpCekNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBOzRCQUNaQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFnQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUE7NEJBQ3ZEQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFDQSxJQUFZQSxJQUFlQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDakdBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDckRBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDckRBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDekRBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdkRBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDeERBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTt5QkFDeERBLENBQUNBO29CQUNIQSxDQUFDQTtvQkFLT0QsZ0NBQVVBLEdBQWxCQSxVQUFtQkEsSUFBYUE7d0JBQy9CRSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtvQkFDL0NBLENBQUNBO29CQUVERixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBYUE7d0JBQzFCRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFDL0JBLENBQUNBO29CQUVESCw2QkFBT0EsR0FBUEEsVUFBUUEsS0FBYUEsRUFBRUEsSUFBYUE7d0JBQ25DSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDckNBLENBQUNBO29CQUVESixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQzFFSyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFFbERBLElBQUlBLE1BQU1BLEdBQW9CQSxFQUFFQSxDQUFDQTt3QkFDakNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUN0REEsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7d0JBQy9EQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTt3QkFFMURBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNyQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ25CQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTt3QkFDNUVBLENBQUNBO3dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkJBLE1BQU1BLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBOzRCQUNsQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxDQUFDQTt3QkFFREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ2ZBLENBQUNBO29CQUVETCx3Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQy9FTSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFFbERBLElBQUlBLFlBQVlBLEdBQVdB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QSxLQUFLQSxDQUFDQTt3QkFFbkJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBOzRCQUNoQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7NEJBQ2pCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTs0QkFDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO3dCQUNsREEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTs0QkFFbEJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2dDQUNoQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0NBQ2pCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtnQ0FDcENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsREEsQ0FBQ0E7NEJBQUNBLElBQUlBLENBQUNBLENBQUNBO2dDQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtnQ0FFbEJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO29DQUNoQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7b0NBQ2pCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFL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O2FBQ3JCQSxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQSxFQXhCbUJELFFBQVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUF3QjNCQTtJQUFEQSxDQUFDQSxFQXhCU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUF3QmxCQTtBQUFEQSxDQUFDQSxFQXhCTSxFQUFFLEtBQUYsRUFBRSxRQXdCUjtBQzlDRCxpQkFBaUI7QUFFakIsc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCxvREFBb0Q7QUFFcEQsSUFBTyxFQUFFLENBUVI7QUFSRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FRbEJBO0lBUlNBLFdBQUFBLFNBQVNBLEVBQUNBLENBQUNBO1FBQ1RDLG9CQUFVQSxHQUFXQSxjQUFjQSxDQUFDQTtRQUUvQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQVVBLEVBQUVBO1lBQzFCQSxtQkFBU0EsQ0FBQ0EsVUFBVUE7WUFDcEJBLGlCQUFPQSxDQUFDQSxVQUFVQTtZQUNsQkEsa0JBQVFBLENBQUNBLFVBQVVBO1NBQ25CQSxDQUFDQSxDQUFDQTtJQUNKQSxDQUFDQSxFQVJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQVFsQkE7QUFBREEsQ0FBQ0EsRUFSTSxFQUFFLEtBQUYsRUFBRSxRQVFSIiwiZmlsZSI6InV0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXJyYXlVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXJyYXlVdGlsaXR5IHtcclxuXHRcdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGU7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSk6IFREYXRhVHlwZTtcclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtOiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlcjtcclxuXHRcdHN1bShhcnJheTogbnVtYmVyW10pOiBudW1iZXI7XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZ30pOiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH07XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBcnJheVV0aWxpdHkgaW1wbGVtZW50cyBJQXJyYXlVdGlsaXR5IHtcclxuXHRcdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciB0YXJnZXRJbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0Xy5lYWNoKGFycmF5LCAoaXRlbTogVERhdGFUeXBlLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0aWYgKHByZWRpY2F0ZShpdGVtKSkge1xyXG5cdFx0XHRcdFx0dGFyZ2V0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRhcmdldEluZGV4ICE9IG51bGwgPyB0YXJnZXRJbmRleCA6IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlIHwgeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGUge1xyXG5cdFx0XHR2YXIgaW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24oaXRlbSkpIHtcclxuXHRcdFx0XHRpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIDx7KG9iajogVERhdGFUeXBlKTogYm9vbGVhbn0+aXRlbSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5kZXggPSBfLmluZGV4T2YoYXJyYXksIDxURGF0YVR5cGU+aXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSlbMF07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQge1xyXG5cdFx0XHR2YXIgaW5kZXg6IG51bWJlciA9IF8uaW5kZXhPZihhcnJheSwgb2xkSXRlbSk7XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdGFycmF5LnNwbGljZShpbmRleCwgMSwgbmV3SXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybT86IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIGxpc3Q6IG51bWJlcltdO1xyXG5cclxuXHRcdFx0aWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdFx0bGlzdCA9IF8ubWFwKGFycmF5LCAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyID0+IHsgcmV0dXJuIHRyYW5zZm9ybShpdGVtKTsgfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGlzdCA9IDxhbnlbXT5hcnJheTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIF8ucmVkdWNlKGxpc3QsIChzdW06IG51bWJlciwgbnVtOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gc3VtICsgbnVtOyB9LCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7IChpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmcgfSlcclxuXHRcdFx0OiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0ge1xyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UoYXJyYXksIChkaWN0aW9uYXJ5OiB7IFtpbmRleDogc3RyaW5nXTogVERhdGFUeXBlIH0sIGl0ZW06IFREYXRhVHlwZSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSA9PiB7XHJcblx0XHRcdFx0ZGljdGlvbmFyeVtrZXlTZWxlY3RvcihpdGVtKV0gPSBpdGVtO1xyXG5cdFx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0XHR9LCBbXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBcnJheVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuO1xyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0XHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHQgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW2FycmF5LnNlcnZpY2VOYW1lXTtcclxuXHRcdCBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBhcnJheS5JQXJyYXlVdGlsaXR5KSB7XHJcblx0XHQgfVxyXG5cclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0XHR2YXIgdHlwZTI6IHN0cmluZyA9IHR5cGVvZiBvYmoyO1xyXG5cclxuXHRcdFx0aWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdFx0dmFyIGtleXMyOiBzdHJpbmdbXSA9IF8ua2V5cyhvYmoyKTtcclxuXHRcdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdFx0Ly9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRcdGlmIChfLmFueShrZXlzMikpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcblx0XHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIG9iamVjdCArICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnaXNFbXB0eSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElJc0VtcHR5RmlsdGVyIHtcclxuXHRcdChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRpc0VtcHR5LiRpbmplY3QgPSBbX19vYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0OiBfX29iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElJc0VtcHR5RmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0dmFyIGlzRW1wdHk6IGJvb2xlYW4gPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcblxyXG5cdFx0XHRpZiAodHJ1ZVdoZW5FbXB0eSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gIWlzRW1wdHk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlzRW1wdHk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fb2JqZWN0Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgaXNFbXB0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyBGb3JtYXRzIGFuZCBvcHRpb25hbGx5IHRydW5jYXRlcyBhbmQgZWxsaXBzaW1vZ3JpZmllcyBhIHN0cmluZyBmb3IgZGlzcGxheSBpbiBhIGNhcmQgaGVhZGVyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fb2JqZWN0ID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdDtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRydW5jYXRlRmlsdGVyIHtcclxuXHRcdChpbnB1dD86IHN0cmluZywgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHRcdChpbnB1dD86IG51bWJlciwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdHRydW5jYXRlLiRpbmplY3QgPSBbX19vYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIHRydW5jYXRlKG9iamVjdFV0aWxpdHk6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSVRydW5jYXRlRmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoaW5wdXQ/OiBhbnksIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG5cdFx0XHRpbmNsdWRlRWxsaXBzZXMgPSBpbmNsdWRlRWxsaXBzZXMgPT0gbnVsbCA/IGZhbHNlIDogaW5jbHVkZUVsbGlwc2VzO1xyXG5cclxuXHRcdFx0dmFyIG91dDogc3RyaW5nID0gb2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UoaW5wdXQpID8gJycgOiBpbnB1dC50b1N0cmluZygpO1xyXG5cdFx0XHRpZiAob3V0Lmxlbmd0aCkge1xyXG5cdFx0XHRcdGlmICh0cnVuY2F0ZVRvICE9IG51bGwgJiYgb3V0Lmxlbmd0aCA+IHRydW5jYXRlVG8pIHtcclxuXHRcdFx0XHRcdG91dCA9IG91dC5zdWJzdHJpbmcoMCwgdHJ1bmNhdGVUbyk7XHJcblx0XHRcdFx0XHRpZiAoaW5jbHVkZUVsbGlwc2VzKSB7XHJcblx0XHRcdFx0XHRcdG91dCArPSAnLi4uJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG91dDtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCB0cnVuY2F0ZSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24nO1xyXG5cdGV4cG9ydCB2YXIgZGlyZWN0aXZlTmFtZTogc3RyaW5nID0gJ3JsU3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzIGV4dGVuZHMgbmcuSUF0dHJpYnV0ZXMge1xyXG5cdFx0cmxTdG9wRXZlbnRQcm9wYWdhdGlvbjogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKTogbmcuSURpcmVjdGl2ZSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogJ0EnLFxyXG5cdFx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGVcclxuXHRcdFx0XHQsIGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnlcclxuXHRcdFx0XHQsIGF0dHJzOiBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyk6IHZvaWQge1xyXG5cdFx0XHRcdGVsZW1lbnQub24oYXR0cnMucmxTdG9wRXZlbnRQcm9wYWdhdGlvbiwgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIHN0b3BFdmVudFByb3BhZ2F0aW9uKTtcclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24nO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUFjdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiB2b2lkO1xyXG5cdFx0c2F2aW5nOiBib29sZWFuO1xyXG5cdFx0Y29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyR0aW1lb3V0J107XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UpIHt9XHJcblxyXG5cdFx0cHJpdmF0ZSBjb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbjogbnVtYmVyID0gMTAwMDtcclxuXHJcblx0XHRwcml2YXRlIF9zYXZpbmc6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9jb21wbGV0ZTogYm9vbGVhbjtcclxuXHRcdHByaXZhdGUgX3N1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblxyXG5cdFx0Z2V0IHNhdmluZygpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3NhdmluZztcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgY29tcGxldGUoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wbGV0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgc3VjY2Vzc2Z1bCgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N1Y2Nlc3NmdWw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYW55IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2UudGhlbih0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bClcclxuXHRcdFx0XHRcdFx0LmNhdGNoKHRoaXMuYXV0b3NhdmVGYWlsZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVTdWNjZXNzZnVsOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgdHJ1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBhdXRvc2F2ZUZhaWxlZDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHJlc29sdmVBdXRvc2F2ZTogeyAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55IH0gPSAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55ID0+IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX2NvbXBsZXRlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5fc3VjY2Vzc2Z1bCA9IHN1Y2Nlc3M7XHJcblxyXG5cdFx0XHR0aGlzLiR0aW1lb3V0KCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLl9jb21wbGV0ZSA9IGZhbHNlO1xyXG5cdFx0XHR9LCB0aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uKTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fYXV0b3NhdmVBY3Rpb24gPSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb247XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2F1dG9zYXZlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRhdXRvc2F2ZSguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRjb250ZW50Rm9ybTogbmcuSUZvcm1Db250cm9sbGVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVTZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIGhhc1ZhbGlkYXRvcjogYm9vbGVhbjtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlXHJcblx0XHRcdFx0LCBwcml2YXRlIHNhdmU6IHsoLi4uZGF0YTogYW55W10pOiBuZy5JUHJvbWlzZTx2b2lkPn1cclxuXHRcdFx0XHQsIHB1YmxpYyBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlclxyXG5cdFx0XHRcdCwgcHJpdmF0ZSB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pIHtcclxuXHRcdFx0dGhpcy5oYXNWYWxpZGF0b3IgPSB2YWxpZGF0ZSAhPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuY29udGVudEZvcm0gPSB0aGlzLm51bGxGb3JtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhdXRvc2F2ZTogeyAoLi4uZGF0YTogYW55W10pOiBib29sZWFuIH0gPSAoLi4uZGF0YTogYW55W10pOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0uJHByaXN0aW5lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmhhc1ZhbGlkYXRvcikge1xyXG5cdFx0XHRcdHZhbGlkID0gdGhpcy52YWxpZGF0ZSgpO1xyXG5cdFx0XHRcdGlmICh2YWxpZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmFsaWQpIHtcclxuXHRcdFx0XHR2YXIgcHJvbWlzZTogbmcuSVByb21pc2U8dm9pZD4gPSB0aGlzLnNhdmUoLi4uZGF0YSk7XHJcblxyXG5cdFx0XHRcdGlmICghXy5pc1VuZGVmaW5lZChwcm9taXNlKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5hdXRvc2F2ZVNlcnZpY2UudHJpZ2dlcihwcm9taXNlLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jb250ZW50Rm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBudWxsRm9ybSgpOiBuZy5JRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0XHRyZXR1cm4gPGFueT57XHJcblx0XHRcdFx0JHByaXN0aW5lOiBmYWxzZSxcclxuXHRcdFx0XHQkc2V0UHJpc3RpbmUoKTogdm9pZCB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeygpOiBuZy5JUHJvbWlzZTx2b2lkPn0sIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyLCB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pOiBJQXV0b3NhdmVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0YXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW19fYXV0b3NhdmVBY3Rpb24uc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGF1dG9zYXZlU2VydmljZUZhY3RvcnkoYXV0b3NhdmVTZXJ2aWNlOiBfX2F1dG9zYXZlQWN0aW9uLklBdXRvc2F2ZUFjdGlvblNlcnZpY2UpOiBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZShzYXZlOiB7ICgpOiBuZy5JUHJvbWlzZTx2b2lkPiB9LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7ICgpOiBib29sZWFuIH0pOiBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEF1dG9zYXZlU2VydmljZShhdXRvc2F2ZVNlcnZpY2UsIHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19hdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYm9vbGVhblV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiAhIW9iamVjdDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ29ic2VydmFibGVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRcdGV2ZW50Pzogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0XHQoLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdCgpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogSUFjdGlvbjx2b2lkPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdFx0ZmlyZShldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSB3YXRjaGVyczogSVdhdGNoZXI8YW55PltdID0gW107XHJcblx0XHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICghXy5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG5cdFx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfKHRoaXMud2F0Y2hlcnMpLmZpbHRlcigod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm1hcCgod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xyXG5cdFx0XHR9KS52YWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGVTZXJ2aWNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnY29udGVudFByb3ZpZGVyRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkO1xyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkO1xyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeTtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdUZXh0OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0fVxyXG5cclxuXHRjbGFzcyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlIGltcGxlbWVudHMgSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3Iob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0XHRwcml2YXRlIGNvbnRlbnQ6IEpRdWVyeTtcclxuXHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudDogeyh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWR9ID0gKHRyYW5zY2x1ZGVGdW5jdGlvbjogbmcuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQgPT4ge1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKHRyYW5zY2x1ZGVGdW5jdGlvbikpIHtcclxuXHRcdFx0XHR0cmFuc2NsdWRlRnVuY3Rpb24oKGNsb25lOiBKUXVlcnkpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2V0Q29udGVudChjbG9uZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRDb250ZW50KG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YWJsZS5yZWdpc3RlcigoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9LCAnY29udGVudENoYW5nZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5IHtcclxuXHRcdFx0aWYgKHNlbGVjdG9yICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50LmZpbHRlcihzZWxlY3Rvcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbb2JzZXJ2YWJsZS5mYWN0b3J5TmFtZV07XHJcblx0ZnVuY3Rpb24gY29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkob2JzZXJ2YWJsZUZhY3Rvcnk6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQ29udGVudFByb3ZpZGVyU2VydmljZShvYnNlcnZhYmxlRmFjdG9yeSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JzZXJ2YWJsZS5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFRpbWVVdGlsaXR5IHtcclxuXHRcdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcbn1cclxuIiwiXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXIge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9tZW50V3JhcHBlcic7XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBtb21lbnRXcmFwcGVyKCk6IHZvaWQge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdC8vIFVzaW5nIGBhbnlgIGluc3RlYWQgb2YgTW9tZW50U3RhdGljIGJlY2F1c2VcclxuXHRcdC8vICBjcmVhdGVGcm9tSW5wdXRGYWxsYmFjayBkb2Vzbid0IGFwcGVhciB0byBiZVxyXG5cdFx0Ly8gIGRlZmluZWQgaW4gTW9tZW50U3RhdGljLi4uIDotKFxyXG5cdFx0dmFyIG1vbWVudFdyYXBwZXI6IGFueSA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuXHJcblx0XHQvLyBTZXQgZGVmYXVsdCBtZXRob2QgZm9yIGhhbmRsaW5nIG5vbi1JU08gZGF0ZSBjb252ZXJzaW9ucy5cclxuXHRcdC8vIFNlZSA0LzI4IGNvbW1lbnQgaW4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDdcclxuXHRcdC8vIFRoaXMgYWxzbyBwcmV2ZW50cyB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxyXG5cdFx0bW9tZW50V3JhcHBlci5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IChjb25maWc6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gbW9tZW50V3JhcHBlcjtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBtb21lbnRXcmFwcGVyKTtcclxuXHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdCc7XHJcblxyXG5cdGV4cG9ydCBlbnVtIENvbXBhcmVSZXN1bHQge1xyXG5cdFx0Z3JlYXRlciA9IDEsXHJcblx0XHRlcXVhbCA9IDAsXHJcblx0XHRsZXNzID0gLTEsXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gZ2V0Q29tcGFyZVJlc3VsdChudW06IG51bWJlcik6IENvbXBhcmVSZXN1bHQge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0aWYgKG51bSA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5lcXVhbDtcclxuXHRcdH0gZWxzZSBpZiAobnVtID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQubGVzcztcclxuXHRcdH1cclxuXHR9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90aW1lL3RpbWUuc2VydmljZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb21lbnQvbW9tZW50Lm1vZHVsZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBlcy9jb21wYXJlUmVzdWx0LnRzXCIgLz5cclxuXHJcbi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgY29tcGFyZVJlc3VsdCA9IHJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0O1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0XHRuYW1lOiBzdHJpbmc7XHJcblx0XHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVmFsdWUge1xyXG5cdFx0eWVhcnM6IG51bWJlcjtcclxuXHRcdG1vbnRoczogbnVtYmVyO1xyXG5cdFx0ZGF5czogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZVV0aWxpdHkge1xyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nO1xyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZTtcclxuXHRcdHN1YnRyYWN0RGF0ZUluRGF5cyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdFx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdDtcclxuXHRcdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbjtcclxuXHRcdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGU7XHJcblx0XHRnZXROb3coKTogRGF0ZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBEYXRlVXRpbGl0eSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbW9tZW50V3JhcHBlci5zZXJ2aWNlTmFtZSwgdGltZS5zZXJ2aWNlTmFtZV07XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG1vbWVudDogbW9tZW50Lk1vbWVudFN0YXRpYywgcHJpdmF0ZSB0aW1lOiB0aW1lLklUaW1lVXRpbGl0eSkge1xyXG5cdFx0XHR0aGlzLm1vbnRoID0gW1xyXG5cdFx0XHRcdHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRmVicnVhcnknLCBkYXlzOiAoeWVhcjogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHRoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjg7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdNYXJjaCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBcHJpbCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdNYXknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVuZScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdWx5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0F1Z3VzdCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnT2N0b2JlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdOb3ZlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XTtcclxuXHRcdH1cclxuXHJcblx0XHRtb250aDogSU1vbnRoW107XHJcblx0XHRwcml2YXRlIGJhc2VGb3JtYXQ6IHN0cmluZyA9ICdNTS1ERC1ZWVlZJztcclxuXHJcblx0XHRwcml2YXRlIGlzTGVhcFllYXIoeWVhcj86IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZSB7XHJcblx0XHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdFx0dmFyIHJlc3VsdDogSURhdGVWYWx1ZSA9IDxhbnk+e307XHJcblx0XHRcdHJlc3VsdC5kYXlzID0gZW5kRGF0ZS5nZXREYXRlKCkgLSBzdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG5cdFx0XHRyZXN1bHQueWVhcnMgPSBlbmREYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHRcdFx0cmVzdWx0Lm1vbnRocyA9IGVuZERhdGUuZ2V0TW9udGgoKSAtIHN0YXJ0RGF0ZS5nZXRNb250aCgpO1xyXG5cclxuXHRcdFx0aWYgKHJlc3VsdC5kYXlzIDwgMCkge1xyXG5cdFx0XHRcdHJlc3VsdC5tb250aHMgLT0gMTtcclxuXHRcdFx0XHRyZXN1bHQuZGF5cyArPSB0aGlzLmdldERheXMoc3RhcnREYXRlLmdldE1vbnRoKCksIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHJlc3VsdC5tb250aHMgPCAwKSB7XHJcblx0XHRcdFx0cmVzdWx0LnllYXJzIC09IDE7XHJcblx0XHRcdFx0cmVzdWx0Lm1vbnRocyArPSAxMjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdFx0dmFyIG1pbGxpc2Vjb25kczogbnVtYmVyID0gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMudGltZS5taWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0IHtcclxuXHRcdFx0Ly8gc3VidHJhY3REYXRlSW5EYXlzIHN1YnRyYWN0cyB0aGUgZmlzdCBmcm9tIHRoZSBzZWNvbmQsIGFzc3VtaW5nIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcclxuXHRcdFx0dmFyIGRpZmZlcmVuY2U6IG51bWJlciA9IHRoaXMuc3VidHJhY3REYXRlSW5EYXlzKGRhdGUyLCBkYXRlMSwgZGF0ZUZvcm1hdCk7XHJcblx0XHRcdHJldHVybiBjb21wYXJlUmVzdWx0LmdldENvbXBhcmVSZXN1bHQoZGlmZmVyZW5jZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlU3RhcnQpID09PSBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQubGVzcykge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZUVuZCkgPT09IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdC5ncmVhdGVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZSB7XHJcblx0XHRcdHZhciBmb3JtYXQ6IHN0cmluZyA9IGRhdGVGb3JtYXQgIT0gbnVsbCA/IGRhdGVGb3JtYXQgOiB0aGlzLmJhc2VGb3JtYXQ7XHJcblxyXG5cdFx0XHRpZiAoXy5pc0RhdGUoZGF0ZSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gPERhdGU+ZGF0ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCBmb3JtYXQpLnRvRGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Tm93KCk6IERhdGUge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSB7XHJcblx0ZXhwb3J0IHZhciBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZUZvcm1hdFN0cmluZ3Mge1xyXG5cdFx0ZGF0ZVRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHRcdGRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHRcdHRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgZGVmYXVsdEZvcm1hdHM6IElEYXRlRm9ybWF0U3RyaW5ncyA9IHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiAnTS9EL1lZWVkgaDptbSBBJyxcclxuXHRcdGRhdGVGb3JtYXQ6ICdNL0QvWVlZWScsXHJcblx0XHR0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG5cdH07XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlVGltZUZvcm1hdFN0cmluZ3MudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3RpbWUvdGltZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9tb21lbnQvbW9tZW50Lm1vZHVsZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVXRpbGl0eSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFttb21lbnRXcmFwcGVyLm1vZHVsZU5hbWUsIHRpbWUubW9kdWxlTmFtZV0pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgRGF0ZVV0aWxpdHkpXHJcblx0XHQudmFsdWUoZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSwgZGVmYXVsdEZvcm1hdHMpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdzdHJpbmdVdGlsaXR5U2VydmljZSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHRcdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdFx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nO1xyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWxpdHlTZXJ2aWNlIGltcGxlbWVudHMgSVN0cmluZ1V0aWxpdHlTZXJ2aWNlIHtcclxuXHRcdHRvTnVtYmVyKHN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuICtzdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udGFpbnMoc3RyOiBzdHJpbmcsIHN1YnN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoc3Vic3RyaW5nKSB7XHJcblx0XHRcdFx0cmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWJzdGl0dXRlKGZvcm1hdFN0cmluZzogc3RyaW5nLCAuLi5wYXJhbXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuXHRcdFx0Xy5lYWNoKHBhcmFtcywgKHBhcmFtOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRmb3JtYXRTdHJpbmcgPSB0aGlzLnJlcGxhY2VBbGwoZm9ybWF0U3RyaW5nLCAnXFxcXHsnICsgaW5kZXggKyAnXFxcXH0nLCBwYXJhbSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZm9ybWF0U3RyaW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm5Ub0ZpbmQsICdnaScpLCByZXBsYWNlbWVudFN0cmluZyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgU3RyaW5nVXRpbGl0eVNlcnZpY2UpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJXaXRoQ291bnRzIGV4dGVuZHMgSUZpbHRlciB7XHJcblx0XHR1cGRhdGVPcHRpb25Db3VudHM8VEl0ZW1UeXBlPihkYXRhOiBUSXRlbVR5cGVbXSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbjtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL2ZpbHRlcnMvZmlsdGVyLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnknO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gJ3NlYXJjaCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXIgZXh0ZW5kcyBmaWx0ZXJzLklGaWx0ZXIge1xyXG5cdFx0dHlwZTogc3RyaW5nO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbjtcclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgR2VuZXJpY1NlYXJjaEZpbHRlciBpbXBsZW1lbnRzIElHZW5lcmljU2VhcmNoRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZyA9IGZpbHRlck5hbWU7XHJcblx0XHRzZWFyY2hUZXh0OiBzdHJpbmc7XHJcblx0XHRjYXNlU2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBvYmplY3Q6IG9iamVjdC5JT2JqZWN0VXRpbGl0eSwgcHJpdmF0ZSBzdHJpbmc6IHN0cmluZy5JU3RyaW5nVXRpbGl0eVNlcnZpY2UpIHt9XHJcblxyXG5cdFx0ZmlsdGVyPFRJdGVtVHlwZT4oaXRlbTogVEl0ZW1UeXBlKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLm9iamVjdC5pc051bGxPckVtcHR5KHRoaXMuc2VhcmNoVGV4dCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KGl0ZW0sIHRoaXMuc2VhcmNoVGV4dCwgdGhpcy5jYXNlU2Vuc2l0aXZlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHNlYXJjaE9iamVjdDxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSwgc2VhcmNoOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKF8uaXNPYmplY3QoaXRlbSkpIHtcclxuXHRcdFx0XHR2YXIgdmFsdWVzOiBhbnkgPSBfLnZhbHVlcyhpdGVtKTtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkodmFsdWVzLCAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4geyByZXR1cm4gdGhpcy5zZWFyY2hPYmplY3QodmFsdWUsIHNlYXJjaCwgY2FzZVNlbnNpdGl2ZSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkYXRhU3RyaW5nOiBzdHJpbmcgPSB0aGlzLm9iamVjdC50b1N0cmluZyhpdGVtKTtcclxuXHJcblx0XHRcdFx0aWYgKCFjYXNlU2Vuc2l0aXZlKSB7XHJcblx0XHRcdFx0XHRzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRcdGRhdGFTdHJpbmcgPSBkYXRhU3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdHJpbmcuY29udGFpbnMoZGF0YVN0cmluZywgc2VhcmNoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXI7XHJcblx0fVxyXG5cclxuXHRnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS4kaW5qZWN0ID0gW29iamVjdC5zZXJ2aWNlTmFtZSwgc3RyaW5nLnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeShvYmplY3Q6IG9iamVjdC5JT2JqZWN0VXRpbGl0eSxcclxuXHRcdHN0cmluZ1V0aWxpdHk6IHN0cmluZy5JU3RyaW5nVXRpbGl0eVNlcnZpY2UpOiBJR2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkge1xyXG5cclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBHZW5lcmljU2VhcmNoRmlsdGVyKG9iamVjdCwgc3RyaW5nVXRpbGl0eSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbb2JqZWN0Lm1vZHVsZU5hbWUsIHN0cmluZy5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuXHRlbnVtIFNpZ24ge1xyXG5cdFx0cG9zaXRpdmUgPSAxLFxyXG5cdFx0bmVnYXRpdmUgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBOdW1iZXJVdGlsaXR5IGltcGxlbWVudHMgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0XHRyZXR1cm4gKE1hdGgucm91bmQoKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgKDxudW1iZXI+c2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxufVxyXG4iLCJcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRcdEJZVEVTX1BFUl9HQjogbnVtYmVyID0gMTA3Mzc0MTgyNDtcclxuXHRcdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRcdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0XHRieXRlczogbnVtYmVyO1xyXG5cclxuXHRcdEdCOiBudW1iZXI7XHJcblx0XHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRcdE1COiBudW1iZXI7XHJcblx0XHRpc01COiBib29sZWFuO1xyXG5cclxuXHRcdEtCOiBudW1iZXI7XHJcblx0XHRpc0tCOiBib29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSwgYnl0ZXM6IG51bWJlcikge1xyXG5cdFx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzTUIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5HQiArICcgR0InO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc0tCKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5ieXRlcyArICcgYnl0ZXMnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxuXHR9XHJcblxyXG5cdGZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlci5zZXJ2aWNlTmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBudW1iZXIuSU51bWJlclV0aWxpdHkpOiBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemUge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdFx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0XHRyZXR1cm4gZmlsZVNpemUuZGlzcGxheSgpO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZUZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHRcdC5maWx0ZXIoc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXIpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgSlF1ZXJ5VXRpbGl0eSBpbXBsZW1lbnRzIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHRjb250ZW50QXJlYS5lbXB0eSgpO1xyXG5cdFx0XHRjb250ZW50QXJlYS5hcHBlbmQobmV3Q29udGVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBKUXVlcnlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbm90aWZpY2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcblx0XHRzZXROb3RpZmllcihub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZDtcclxuXHRcdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5vdGlmaWVyOiBuZXcgQmFzZU5vdGlmaWVyKCksXHJcblx0XHRcdHNldE5vdGlmaWVyOiAobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdFx0fSxcclxuXHRcdFx0JGdldDogKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQucHJvdmlkZXIoc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQmFzZU5vdGlmaWVyIGltcGxlbWVudHMgSU5vdGlmaWVyIHtcclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0d2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0XHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0XHR2aWV3RGF0YT86IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0XHQ6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyAvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHMnIC8+XHJcbi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL3R5cGluZ3MvbG9kYXNoL2xvZGFzaC5kLnRzJyAvPlxyXG4vLyAvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJNb2Nrcy5kLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IG5nLklTY29wZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZVJlc3VsdCB7XHJcblx0XHRkaXJlY3RpdmU6IG5nLklEaXJlY3RpdmU7XHJcblx0XHRzY29wZTogbmcuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyV2l0aEJpbmRpbmdzPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgYmluZGluZ3M/OiBhbnksIGxvY2Fscz86IGFueSwgc2NvcGU/OiBhbnkpXHJcblx0XHRcdDogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPjtcclxuXHRcdGRpcmVjdGl2ZTogKGRvbTogc3RyaW5nKSA9PiBJRGlyZWN0aXZlUmVzdWx0O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQW5ndWxhckZpeHR1cmUgaW1wbGVtZW50cyBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0XHQvLyBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIG9mIHRoZSBzZXJ2aWNlcyByZXF1ZXN0ZWRcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0XHQvLyB0aGlzIGF2b2lkcyBpdGVyYXRpbmcgb3ZlciB0aGUgZnVuY3Rpb24gaXRzZWxmXHJcblx0XHRcdHZhciBpbmplY3RQYXJhbWV0ZXJzOiBhbnlbXSA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuXHRcdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHRcdC8vIHNob3VsZCBnZXQgY2FsbGVkIHdpdGggdGhlIHNlcnZpY2VzIGluamVjdGVkIGJ5IGFuZ3VsYXJcclxuXHRcdFx0XHQvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuXHRcdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHRzZXJ2aWNlc1tzZXJ2aWNlXSA9IGluamVjdGVkU2VydmljZXNbaW5kZXhdO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGFuZ3VsYXIubW9jay5pbmplY3QoaW5qZWN0UGFyYW1ldGVycyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9jayhtb2NrczogYW55KTogdm9pZCB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoKCRwcm92aWRlOiBuZy5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250cm9sbGVyV2l0aEJpbmRpbmdzPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgYmluZGluZ3M/OiBhbnksIGxvY2Fscz86IGFueSwgc2NvcGU/OiBhbnkpXHJcblx0XHRcdDogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdFx0dmFyICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb250cm9sbGVyOiBuZy5JQ29udHJvbGxlclNlcnZpY2UgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRcdHNjb3BlID0gXy5leHRlbmQoJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuXHJcblx0XHRcdGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNjb3BlOiBzY29wZSxcclxuXHRcdFx0XHRjb250cm9sbGVyOiA8VENvbnRyb2xsZXJUeXBlPiRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMsIGJpbmRpbmdzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXJlY3RpdmUoZG9tOiBzdHJpbmcpOiBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogbmcuSVNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb21waWxlOiBhbnkgPSBzZXJ2aWNlcy4kY29tcGlsZTtcclxuXHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoJ3Jlbm92b1RlbXBsYXRlcycpO1xyXG5cclxuXHRcdFx0dmFyIGNvbXBvbmVudDogYW55ID0gJGNvbXBpbGUoZG9tKSgkcm9vdFNjb3BlKTtcclxuXHRcdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0ZGlyZWN0aXZlOiBjb21wb25lbnQsXHJcblx0XHRcdFx0c2NvcGU6IGNvbXBvbmVudC5pc29sYXRlU2NvcGUoKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgYW5ndWxhckZpeHR1cmU6IElBbmd1bGFyRml4dHVyZSA9IG5ldyBBbmd1bGFyRml4dHVyZSgpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL3Npbm9uXHJcbi8vIHVzZXMgdHlwaW5ncy9qcXVlcnlcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55O1xyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4ge1xyXG5cdFx0cHJvbWlzZTogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPjtcclxuXHRcdGRhdGE6IFREYXRhVHlwZTtcclxuXHRcdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueSB7XHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRGVmaW5lZChzZXJ2aWNlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRzZXJ2aWNlID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKCk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoLi4ucGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XHJcblx0XHRcdFx0dmFyIGRlZmVycmVkOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+ID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG5cdFx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfLnB1c2goe1xyXG5cdFx0XHRcdFx0cHJvbWlzZTogZGVmZXJyZWQsXHJcblx0XHRcdFx0XHRkYXRhOiBjYWxsYmFjay5hcHBseSh0aGlzLCBwYXJhbXMpLFxyXG5cdFx0XHRcdFx0c3VjY2Vzc2Z1bDogc3VjY2Vzc2Z1bCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIHNjb3BlPzogbmcuSVNjb3BlKTogdm9pZCB7XHJcblx0XHRcdC8vIFNhdmUgbG9jYWwgcmVmZXJlbmNlIHRvIHRoZSByZXF1ZXN0IGxpc3QgYW5kIHRoZW4gY2xlYXJcclxuXHRcdFx0dmFyIGN1cnJlbnRQZW5kaW5nUmVxdWVzdHM6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+W10gPSBzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XztcclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdC8vIFByb2Nlc3MgdGhlIHNhdmVkIGxpc3QuXHJcblx0XHRcdC8vIFRoaXMgd2F5IGlmIGFueSBhZGRpdGlvbmFsIHJlcXVlc3RzIGFyZSBnZW5lcmF0ZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY3VycmVudCAvIGxvY2FsIGxpc3QgXHJcblx0XHRcdC8vICB0aGVzZSByZXF1ZXN0cyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGUgbmV4dCBjYWxsIHRvIGZsdXNoKCkuXHJcblx0XHRcdF8uZWFjaChjdXJyZW50UGVuZGluZ1JlcXVlc3RzLCAocmVxdWVzdDogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT4pOiB2b2lkID0+IHtcclxuXHRcdFx0XHRpZiAocmVxdWVzdC5zdWNjZXNzZnVsKSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVzb2x2ZShyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0LnByb21pc2UucmVqZWN0KHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzY29wZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRzY29wZS4kZGlnZXN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9jazogSU1vY2sgPSBuZXcgTW9jaygpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAndmFsaWRhdGlvbkZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uSGFuZGxlciB7XHJcblx0XHRpc0FjdGl2ZT86IHsoKTogYm9vbGVhbn0gfCBib29sZWFuO1xyXG5cdFx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRcdGVycm9yTWVzc2FnZTogc3RyaW5nIHwgeygpOiBzdHJpbmd9O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdCgpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdFx0dmFsaWRhdGUoKTogYm9vbGVhbjtcclxuXHRcdHJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdG5vdGlmeUFzRXJyb3I6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgVmFsaWRhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZGF0aW9uSGFuZGxlcnM6IHsgW2luZGV4OiBudW1iZXJdOiBJVmFsaWRhdGlvbkhhbmRsZXIgfSA9IHt9O1xyXG5cdFx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cdFx0bm90aWZ5QXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uOiBzZXJ2aWNlcy5ub3RpZmljYXRpb24uSU5vdGlmaWNhdGlvblNlcnZpY2UpIHt9XHJcblxyXG5cdFx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0XHRcdF8uZWFjaCh0aGlzLnZhbGlkYXRpb25IYW5kbGVycywgKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHZhciBpc0FjdGl2ZTogYm9vbGVhbiA9IChfLmlzRnVuY3Rpb24oaGFuZGxlci5pc0FjdGl2ZSkgJiYgKDx7KCk6IGJvb2xlYW59PmhhbmRsZXIuaXNBY3RpdmUpKCkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PSBudWxsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fHwgaGFuZGxlci5pc0FjdGl2ZSA9PT0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0aWYgKGlzQWN0aXZlICYmICFoYW5kbGVyLnZhbGlkYXRlKCkpIHtcclxuXHRcdFx0XHRcdGlzVmFsaWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHR2YXIgZXJyb3I6IHN0cmluZyA9IF8uaXNGdW5jdGlvbihoYW5kbGVyLmVycm9yTWVzc2FnZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ/ICg8eygpOiBzdHJpbmd9PmhhbmRsZXIuZXJyb3JNZXNzYWdlKSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiA8c3RyaW5nPmhhbmRsZXIuZXJyb3JNZXNzYWdlO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLm5vdGlmeUFzRXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb24uZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb24ud2FybmluZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyKGhhbmRsZXI6IElWYWxpZGF0aW9uSGFuZGxlcik6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdFx0dGhpcy52YWxpZGF0aW9uSGFuZGxlcnNbY3VycmVudEtleV0gPSBoYW5kbGVyO1xyXG5cclxuXHRcdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1trZXldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElWYWxpZGF0aW9uU2VydmljZTtcclxuXHR9XHJcblxyXG5cdHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW3NlcnZpY2VzLm5vdGlmaWNhdGlvbi5zZXJ2aWNlTmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeShub3RpZmljYXRpb246IHNlcnZpY2VzLm5vdGlmaWNhdGlvbi5JTm90aWZpY2F0aW9uU2VydmljZSk6IElWYWxpZGF0aW9uU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBWYWxpZGF0aW9uU2VydmljZShub3RpZmljYXRpb24pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW3NlcnZpY2VzLm5vdGlmaWNhdGlvbi5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCB2YWxpZGF0aW9uU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuYmVoYXZpb3JzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0c3RvcEV2ZW50UHJvcG9nYXRpb24ubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0naXNFbXB0eS9pc0VtcHR5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cnVuY2F0ZS90cnVuY2F0ZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRpc0VtcHR5Lm1vZHVsZU5hbWUsXHJcblx0XHR0cnVuY2F0ZS5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcnJheS9hcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdib29sZWFuL2Jvb2xlYW4uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nY29udGVudFByb3ZpZGVyL2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlL2RhdGUubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdqcXVlcnkvanF1ZXJ5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J21vbWVudC9tb21lbnQubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RpbWUvdGltZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd2YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGFycmF5Lm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZS5tb2R1bGVOYW1lLFxyXG5cdFx0YXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZSxcclxuXHRcdGJvb2xlYW4ubW9kdWxlTmFtZSxcclxuXHRcdGNvbnRlbnRQcm92aWRlci5tb2R1bGVOYW1lLFxyXG5cdFx0ZGF0ZS5tb2R1bGVOYW1lLFxyXG5cdFx0ZmlsZVNpemUubW9kdWxlTmFtZSxcclxuXHRcdGdlbmVyaWNTZWFyY2hGaWx0ZXIubW9kdWxlTmFtZSxcclxuXHRcdGpxdWVyeS5tb2R1bGVOYW1lLFxyXG5cdFx0bW9tZW50V3JhcHBlci5tb2R1bGVOYW1lLFxyXG5cdFx0bm90aWZpY2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0XHRudW1iZXIubW9kdWxlTmFtZSxcclxuXHRcdG9iamVjdC5tb2R1bGVOYW1lLFxyXG5cdFx0b2JzZXJ2YWJsZS5tb2R1bGVOYW1lLFxyXG5cdFx0cGFyZW50Q2hpbGRCZWhhdmlvci5tb2R1bGVOYW1lLFxyXG5cdFx0cHJvbWlzZS5tb2R1bGVOYW1lLFxyXG5cdFx0c3RyaW5nLm1vZHVsZU5hbWUsXHJcblx0XHR0aW1lLm1vZHVsZU5hbWUsXHJcblx0XHR2YWxpZGF0aW9uLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRiZWhhdmlvcnMubW9kdWxlTmFtZSxcclxuXHRcdGZpbHRlcnMubW9kdWxlTmFtZSxcclxuXHRcdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9