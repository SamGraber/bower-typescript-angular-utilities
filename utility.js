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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cyIsInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL3RydW5jYXRlL3RydW5jYXRlLnRzIiwiZmlsdGVycy9pc0VtcHR5L2lzRW1wdHkudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90aW1lL3RpbWUuc2VydmljZS50cyIsInNlcnZpY2VzL21vbWVudC9tb21lbnQubW9kdWxlLnRzIiwidHlwZXMvY29tcGFyZVJlc3VsdC50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlVGltZUZvcm1hdFN0cmluZ3MudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUubW9kdWxlLnRzIiwic2VydmljZXMvbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplRmlsdGVyLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemUubW9kdWxlLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwiZmlsdGVycy9maWx0ZXIudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJzZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsInNlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsInNlcnZpY2VzL3Rlc3QvbW9jay50cyIsInNlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIiwiYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMiLCJmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIiwic2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbInJsIiwicmwudXRpbGl0aWVzIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24iLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uLnN0b3BFdmVudFByb3BhZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdCIsInJsLnV0aWxpdGllcy5maWx0ZXJzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZS50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkiLCJybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5LmlzRW1wdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc2F2aW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb21wbGV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc3VjY2Vzc2Z1bCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UudHJpZ2dlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UubnVsbEZvcm0uJHNldFByaXN0aW5lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLmF1dG9zYXZlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5Db250ZW50UHJvdmlkZXJTZXJ2aWNlLnNldENvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuZ2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLmNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9TZWNvbmRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9NaW51dGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9Ib3VycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvRGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXIubW9tZW50V3JhcHBlciIsInJsLnV0aWxpdGllcy50eXBlcyIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0IiwicmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdCIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0LmdldENvbXBhcmVSZXN1bHQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5pc0xlYXBZZWFyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RnVsbFN0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldERheXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlSW5EYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuY29tcGFyZURhdGVzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZGF0ZUluUmFuZ2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0Tm93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuU2lnbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkuaW50ZWdlckRpdmlkZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZS5kaXNwbGF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsInJsLnV0aWxpdGllcy5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaE9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LnJlcGxhY2VDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5pbmZvIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLndhcm5pbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLmluZm8iLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci53YXJuaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIuZXJyb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5zdWNjZXNzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIubm90aWZ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5pc1Byb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5pbmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5tb2NrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29udHJvbGxlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmRpcmVjdGl2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5zZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5wcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5wcm9taXNlV2l0aENhbGxiYWNrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5mbHVzaCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UucmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi52YWxpZGF0aW9uU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi52YWxpZGF0aW9uU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiXSwibWFwcGluZ3MiOiJBQUFBLHVCQUF1QjtBQUV2QixJQUFPLEVBQUUsQ0EyQlI7QUEzQkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBMkJsQkE7SUEzQlNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFNBQVNBLENBMkI1QkE7UUEzQm1CQSxXQUFBQSxTQUFTQTtZQUFDQyxJQUFBQSxvQkFBb0JBLENBMkJqREE7WUEzQjZCQSxXQUFBQSxvQkFBb0JBLEVBQUNBLENBQUNBO2dCQUNuREMsWUFBWUEsQ0FBQ0E7Z0JBRUZBLCtCQUFVQSxHQUFXQSw2Q0FBNkNBLENBQUNBO2dCQUNuRUEsa0NBQWFBLEdBQVdBLHdCQUF3QkEsQ0FBQ0E7Z0JBTTVEQTtvQkFDQ0MsWUFBWUEsQ0FBQ0E7b0JBQ2JBLE1BQU1BLENBQUNBO3dCQUNOQSxRQUFRQSxFQUFFQSxHQUFHQTt3QkFDYkEsSUFBSUEs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Z0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNuREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNwREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNwREEsRUFBRUEsSUFBSUEsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN0REEsRUFBRUEsSUFBSUEsRUFBRUEsV0FBV0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN6REEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN2REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN4REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO3lCQUN4REEsQ0FBQ0E7b0JBQ0hBLENBQUNBO29CQUtPRCxnQ0FBVUEsR0FBbEJBLFVBQW1CQSxJQUFhQTt3QkFDL0JFLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO29CQUMvQ0EsQ0FBQ0E7b0JBRURGLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFhQTt3QkFDMUJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLElBQUlBLENBQUNBO29CQUMvQkEsQ0FBQ0E7b0JBRURILDZCQUFPQSxHQUFQQSxVQUFRQSxLQUFhQSxFQUFFQSxJQUFhQTt3QkFDbkNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNyQ0EsQ0FBQ0E7b0JBRURKLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFvQkEsRUFBRUEsR0FBa0JBLEVBQUVBLFVBQW1CQTt3QkFDMUVLLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQ2JBLENBQUNBO3dCQUVEQSxJQUFJQSxTQUFTQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFDdERBLElBQUlBLE9BQU9BLEdBQVNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO3dCQUVsREEsSUFBSUEsTUFBTUEsR0FBb0JBLEVBQUVBLENBQUNBO3dCQUNqQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7d0JBQ3REQSxNQUFNQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTt3QkFDL0RBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO3dCQUUxREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxNQUFNQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDbkJBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLFNBQVNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBO3dCQUM1RUEsQ0FBQ0E7d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUN2QkEsTUFBTUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ2xCQSxNQUFNQSxDQUFDQSxNQUFNQSxJQUFJQSxFQUFFQSxDQUFDQTt3QkFDckJBLENBQUNBO3dCQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDZkEsQ0FBQ0E7b0JBRURMLHdDQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFvQkEsRUFBRUEsR0FBa0JBLEVBQUVBLFVBQW1CQTt3QkFDL0VNLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQ2JBLENBQUNBO3dCQUVEQSxJQUFJQSxTQUFTQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFDdERBLElBQUlBLE9BQU9BLEdBQVNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO3dCQUVsREEsSUFBSUEsWUFB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SUFBQ0EsSUFBQUEsU0FBU0EsQ0FRbEJBO0lBUlNBLFdBQUFBLFNBQVNBLEVBQUNBLENBQUNBO1FBQ1RDLG9CQUFVQSxHQUFXQSxjQUFjQSxDQUFDQTtRQUUvQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUE7WUFDcEJBLG1CQUFTQSxDQUFDQSxVQUFVQTtZQUNwQkEsaUJBQU9BLENBQUNBLFVBQVVBO1lBQ2xCQSxrQkFBUUEsQ0FBQ0EsVUFBVUE7U0FDbkJBLENBQUNBLENBQUNBO0lBQ0pBLENBQUNBLEVBUlNELFNBQVNBLEdBQVRBLFlBQVNBLEtBQVRBLFlBQVNBLFFBUWxCQTtBQUFEQSxDQUFDQSxFQVJNLEVBQUUsS0FBRixFQUFFLFFBUVIiLCJmaWxlIjoidXRpbGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uJztcclxuXHRleHBvcnQgdmFyIGRpcmVjdGl2ZU5hbWU6IHN0cmluZyA9ICdybFN0b3BFdmVudFByb3BhZ2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyBleHRlbmRzIG5nLklBdHRyaWJ1dGVzIHtcclxuXHRcdHJsU3RvcEV2ZW50UHJvcGFnYXRpb246IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKCk6IG5nLklEaXJlY3RpdmUge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdFx0bGluayhzY29wZTogbmcuSVNjb3BlXHJcblx0XHRcdFx0LCBlbGVtZW50OiBuZy5JQXVnbWVudGVkSlF1ZXJ5XHJcblx0XHRcdFx0LCBhdHRyczogSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMpOiB2b2lkIHtcclxuXHRcdFx0XHRlbGVtZW50Lm9uKGF0dHJzLnJsU3RvcEV2ZW50UHJvcGFnYXRpb24sIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmRpcmVjdGl2ZShkaXJlY3RpdmVOYW1lLCBzdG9wRXZlbnRQcm9wYWdhdGlvbik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2FycmF5VXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXI7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGU7XHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQ7XHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybTogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXI7XHJcblx0XHRzdW0oYXJyYXk6IG51bWJlcltdKTogbnVtYmVyO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmd9KTogVERhdGFUeXBlW107XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IG51bWJlcn0pOiBURGF0YVR5cGVbXTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFycmF5VXRpbGl0eSBpbXBsZW1lbnRzIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHRhcmdldEluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRfLmVhY2goYXJyYXksIChpdGVtOiBURGF0YVR5cGUsIGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0XHR0YXJnZXRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0SW5kZXggIT0gbnVsbCA/IHRhcmdldEluZGV4IDogLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUgfCB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZSB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgPHsob2JqOiBURGF0YVR5cGUpOiBib29sZWFufT5pdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZCB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtPzogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0XHRpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRsaXN0ID0gXy5tYXAoYXJyYXksIChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgPT4geyByZXR1cm4gdHJhbnNmb3JtKGl0ZW0pOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaXN0ID0gPGFueVtdPmFycmF5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsgKGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZyB8IG51bWJlciB9KTogVERhdGFUeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UoYXJyYXksIChkaWN0aW9uYXJ5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlW10gPT4ge1xyXG5cdFx0XHRcdGRpY3Rpb25hcnlbPGFueT5rZXlTZWxlY3RvcihpdGVtKV0gPSBpdGVtO1xyXG5cdFx0XHRcdHJldHVybiBkaWN0aW9uYXJ5O1xyXG5cdFx0XHR9LCBbXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBcnJheVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdvYmplY3RVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IG51bWJlcik6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55W10pOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdFx0YXJlRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuO1xyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmc7XHJcblx0XHR2YWx1ZU9yRGVmYXVsdCh2YWx1ZTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSk6IGFueTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE9iamVjdFV0aWxpdHkgaW1wbGVtZW50cyBJT2JqZWN0VXRpbGl0eSB7XHJcblx0XHQgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW2FycmF5LnNlcnZpY2VOYW1lXTtcclxuXHRcdCBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBhcnJheS5JQXJyYXlVdGlsaXR5KSB7XHJcblx0XHQgfVxyXG5cclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKG9iamVjdCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc0FycmF5KG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5hbnkob2JqZWN0KSA9PT0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAoXy5pc051bWJlcihvYmplY3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uaXNOYU4ob2JqZWN0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0ID09PSAnJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoXy5pc1N0cmluZyhvYmplY3QpKSB7XHJcblx0XHRcdFx0b2JqZWN0ID0gKDxzdHJpbmc+b2JqZWN0KS50cmltKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmlzTnVsbE9yRW1wdHkob2JqZWN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgdHlwZTE6IHN0cmluZyA9IHR5cGVvZiBvYmoxO1xyXG5cdFx0XHR2YXIgdHlwZTI6IHN0cmluZyA9IHR5cGVvZiBvYmoyO1xyXG5cclxuXHRcdFx0aWYgKG9iajEgPT0gbnVsbCAmJiBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvYmoxID09IG51bGwgfHwgb2JqMiA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZTEgIT09IHR5cGUyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdGlmIChvYmoxLmxlbmd0aCAhPT0gb2JqMi5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBvYmoxLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbChvYmoxW2ldLCBvYmoyW2ldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0eXBlMSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHQvL2luaXQgYW4gb2JqZWN0IHdpdGggdGhlIGtleXMgZnJvbSBvYmoyXHJcblx0XHRcdFx0dmFyIGtleXMyOiBzdHJpbmdbXSA9IF8ua2V5cyhvYmoyKTtcclxuXHRcdFx0XHRfLmZvckluKG9iajEsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKF8uaGFzKG9iajIsIGtleSkpIHtcclxuXHRcdFx0XHRcdFx0Ly9jb21wYXJlIHZhbHVlIGFnYWluc3QgdGhlIHZhbHVlIHdpdGggdGhlIHNhbWUga2V5IGluIG9iajIsIHRoZW4gcmVtb3ZlIHRoZSBrZXlcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuYXJlRXF1YWwodmFsdWUsIG9iajJba2V5XSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXJyYXkucmVtb3ZlKGtleXMyLCBrZXkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly9pZiB0aGVyZSBhcmUgc3RpbGwga2V5cyBsZWZ0IGluIGtleXMyLCB3ZSBrbm93IHRoZXkgYXJlIG5vdCBlcXVhbCAob2JqMiBoYXMgbW9yZSBwcm9wZXJ0aWVzKVxyXG5cdFx0XHRcdGlmIChfLmFueShrZXlzMikpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly9pZiB0eXBlcyBhcmUgcHJpbWl0aXZlLCBkbyBhIHNpbXBsZSBjb21wYXJpc29uXHJcblx0XHRcdFx0cmV0dXJuIG9iajEgPT09IG9iajI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvU3RyaW5nKG9iamVjdDogYW55KTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIG9iamVjdCArICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW2FycmF5Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE9iamVjdFV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vc2VydmljZXMvb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0cnVuY2F0ZSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQoaW5wdXQ/OiBzdHJpbmcsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0XHQoaW5wdXQ/OiBudW1iZXIsIHRydW5jYXRlVG8/OiBudW1iZXIsIGluY2x1ZGVFbGxpcHNlcz86IGJvb2xlYW4pOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHR0cnVuY2F0ZS4kaW5qZWN0ID0gW19fb2JqZWN0LnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiB0cnVuY2F0ZShvYmplY3RVdGlsaXR5OiBfX29iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElUcnVuY2F0ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGlucHV0PzogYW55LCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuXHRcdFx0aW5jbHVkZUVsbGlwc2VzID0gaW5jbHVkZUVsbGlwc2VzID09IG51bGwgPyBmYWxzZSA6IGluY2x1ZGVFbGxpcHNlcztcclxuXHJcblx0XHRcdHZhciBvdXQ6IHN0cmluZyA9IG9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlKGlucHV0KSA/ICcnIDogaW5wdXQudG9TdHJpbmcoKTtcclxuXHRcdFx0aWYgKG91dC5sZW5ndGgpIHtcclxuXHRcdFx0XHRpZiAodHJ1bmNhdGVUbyAhPSBudWxsICYmIG91dC5sZW5ndGggPiB0cnVuY2F0ZVRvKSB7XHJcblx0XHRcdFx0XHRvdXQgPSBvdXQuc3Vic3RyaW5nKDAsIHRydW5jYXRlVG8pO1xyXG5cdFx0XHRcdFx0aWYgKGluY2x1ZGVFbGxpcHNlcykge1xyXG5cdFx0XHRcdFx0XHRvdXQgKz0gJy4uLic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBvdXQ7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fb2JqZWN0Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgdHJ1bmNhdGUpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9zZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnaXNFbXB0eSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSBzZXJ2aWNlTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElJc0VtcHR5RmlsdGVyIHtcclxuXHRcdChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRpc0VtcHR5LiRpbmplY3QgPSBbX19vYmplY3Quc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0OiBfX29iamVjdC5JT2JqZWN0VXRpbGl0eSk6IElJc0VtcHR5RmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoaW5wdXQ6IGFueSwgdHJ1ZVdoZW5FbXB0eT86IGJvb2xlYW4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0dmFyIGlzRW1wdHk6IGJvb2xlYW4gPSBvYmplY3QuaXNOdWxsT3JFbXB0eShpbnB1dCk7XHJcblxyXG5cdFx0XHRpZiAodHJ1ZVdoZW5FbXB0eSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gIWlzRW1wdHk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlzRW1wdHk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fb2JqZWN0Lm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZpbHRlcihzZXJ2aWNlTmFtZSwgaXNFbXB0eSk7XHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXV0b3NhdmVBY3Rpb24nO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogdm9pZDtcclxuXHRcdHNhdmluZzogYm9vbGVhbjtcclxuXHRcdGNvbXBsZXRlOiBib29sZWFuO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlQWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZUFjdGlvblNlcnZpY2Uge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckdGltZW91dCddO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdHByaXZhdGUgY29tcGxldGVNZXNzYWdlRHVyYXRpb246IG51bWJlciA9IDEwMDA7XHJcblxyXG5cdFx0cHJpdmF0ZSBfc2F2aW5nOiBib29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBfY29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9zdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cclxuXHRcdGdldCBzYXZpbmcoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zYXZpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IGNvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29tcGxldGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IHN1Y2Nlc3NmdWwoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zdWNjZXNzZnVsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXIocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGFueSB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IHRydWU7XHJcblx0XHRcdHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5hdXRvc2F2ZVN1Y2Nlc3NmdWwpXHJcblx0XHRcdFx0XHRcdC5jYXRjaCh0aGlzLmF1dG9zYXZlRmFpbGVkKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGF1dG9zYXZlU3VjY2Vzc2Z1bDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVGYWlsZWQ6IHsgKGRhdGE6IGFueSk6IGFueSB9ID0gKGRhdGE6IGFueSk6IGFueSA9PiB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSByZXNvbHZlQXV0b3NhdmU6IHsgKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSB9ID0gKGRhdGE6IGFueSwgc3VjY2VzczogYm9vbGVhbik6IGFueSA9PiB7XHJcblx0XHRcdHRoaXMuX3NhdmluZyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9jb21wbGV0ZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuX3N1Y2Nlc3NmdWwgPSBzdWNjZXNzO1xyXG5cclxuXHRcdFx0dGhpcy4kdGltZW91dCgoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy5fY29tcGxldGUgPSBmYWxzZTtcclxuXHRcdFx0fSwgdGhpcy5jb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbik7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEF1dG9zYXZlQWN0aW9uU2VydmljZSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX2F1dG9zYXZlQWN0aW9uID0gcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0YXV0b3NhdmUoLi4uZGF0YTogYW55W10pOiBib29sZWFuO1xyXG5cdFx0Y29udGVudEZvcm06IG5nLklGb3JtQ29udHJvbGxlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEF1dG9zYXZlU2VydmljZSBpbXBsZW1lbnRzIElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSBoYXNWYWxpZGF0b3I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBhdXRvc2F2ZVNlcnZpY2U6IF9fYXV0b3NhdmVBY3Rpb24uSUF1dG9zYXZlQWN0aW9uU2VydmljZVxyXG5cdFx0XHRcdCwgcHJpdmF0ZSBzYXZlOiB7KC4uLmRhdGE6IGFueVtdKTogbmcuSVByb21pc2U8dm9pZD59XHJcblx0XHRcdFx0LCBwdWJsaWMgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXJcclxuXHRcdFx0XHQsIHByaXZhdGUgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KSB7XHJcblx0XHRcdHRoaXMuaGFzVmFsaWRhdG9yID0gdmFsaWRhdGUgIT0gbnVsbDtcclxuXHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtID09IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRGb3JtID0gdGhpcy5udWxsRm9ybSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YXV0b3NhdmU6IHsgKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiB9ID0gKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtLiRwcmlzdGluZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cdFx0XHRpZiAodGhpcy5oYXNWYWxpZGF0b3IpIHtcclxuXHRcdFx0XHR2YWxpZCA9IHRoaXMudmFsaWRhdGUoKTtcclxuXHRcdFx0XHRpZiAodmFsaWQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHZhbGlkKSB7XHJcblx0XHRcdFx0dmFyIHByb21pc2U6IG5nLklQcm9taXNlPHZvaWQ+ID0gdGhpcy5zYXZlKC4uLmRhdGEpO1xyXG5cclxuXHRcdFx0XHRpZiAoIV8uaXNVbmRlZmluZWQocHJvbWlzZSkpIHtcclxuXHRcdFx0XHRcdHRoaXMuYXV0b3NhdmVTZXJ2aWNlLnRyaWdnZXIocHJvbWlzZS50aGVuKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuY29udGVudEZvcm0uJHNldFByaXN0aW5lKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgbnVsbEZvcm0oKTogbmcuSUZvcm1Db250cm9sbGVyIHtcclxuXHRcdFx0cmV0dXJuIDxhbnk+e1xyXG5cdFx0XHRcdCRwcmlzdGluZTogZmFsc2UsXHJcblx0XHRcdFx0JHNldFByaXN0aW5lKCk6IHZvaWQge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKHNhdmU6IHsoKTogbmcuSVByb21pc2U8dm9pZD59LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7KCk6IGJvb2xlYW59KTogSUF1dG9zYXZlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGF1dG9zYXZlU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtfX2F1dG9zYXZlQWN0aW9uLnNlcnZpY2VOYW1lXTtcclxuXHRmdW5jdGlvbiBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTogSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeyAoKTogbmcuSVByb21pc2U8dm9pZD4gfSwgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXIsIHZhbGlkYXRlPzogeyAoKTogYm9vbGVhbiB9KTogSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBBdXRvc2F2ZVNlcnZpY2UoYXV0b3NhdmVTZXJ2aWNlLCBzYXZlLCBjb250ZW50Rm9ybSwgdmFsaWRhdGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW19fYXV0b3NhdmVBY3Rpb24ubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2Jvb2xlYW5VdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEJvb2xlYW5VdGlsaXR5IGltcGxlbWVudHMgSUJvb2xlYW5VdGlsaXR5IHtcclxuXHRcdHRvQm9vbChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gISFvYmplY3Q7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCb29sZWFuVXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUnO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdvYnNlcnZhYmxlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdhdGNoZXI8VFJldHVyblR5cGU+IHtcclxuXHRcdGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT47XHJcblx0XHRldmVudD86IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0KC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHQoKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IElBY3Rpb248dm9pZD4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXTtcclxuXHRcdGZpcmUoZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTZXJ2aWNlIGltcGxlbWVudHMgSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2F0Y2hlcnM6IElXYXRjaGVyPGFueT5bXSA9IFtdO1xyXG5cdFx0cHJpdmF0ZSBuZXh0S2V5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdHJlZ2lzdGVyPFRSZXR1cm5UeXBlPihhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAoIV8uaXNGdW5jdGlvbihhY3Rpb24pKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yOiB3YXRjaGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEtleTogbnVtYmVyID0gdGhpcy5uZXh0S2V5O1xyXG5cdFx0XHR0aGlzLm5leHRLZXkrKztcclxuXHRcdFx0dGhpcy53YXRjaGVyc1tjdXJyZW50S2V5XSA9IHtcclxuXHRcdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW10ge1xyXG5cdFx0XHRyZXR1cm4gXyh0aGlzLndhdGNoZXJzKS5maWx0ZXIoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyICE9IG51bGwgJiYgd2F0Y2hlci5ldmVudCA9PT0gZXZlbnQ7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5tYXAoKHdhdGNoZXI6IElXYXRjaGVyPFRSZXR1cm5UeXBlPik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gd2F0Y2hlci5hY3Rpb24uYXBwbHkodGhpcywgcGFyYW1zKTtcclxuXHRcdFx0fSkudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53YXRjaGVyc1trZXldID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KCk6IElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBPYnNlcnZhYmxlU2VydmljZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2NvbnRlbnRQcm92aWRlckZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZDtcclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnk7XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3VGV4dDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQ29udGVudFByb3ZpZGVyU2VydmljZSBpbXBsZW1lbnRzIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdGNvbnN0cnVjdG9yKG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpIHtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG9ic2VydmFibGU6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdFx0cHJpdmF0ZSBjb250ZW50OiBKUXVlcnk7XHJcblxyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlLmZpcmUoJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQ6IHsodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkfSA9ICh0cmFuc2NsdWRlRnVuY3Rpb246IG5nLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih0cmFuc2NsdWRlRnVuY3Rpb24pKSB7XHJcblx0XHRcdFx0dHJhbnNjbHVkZUZ1bmN0aW9uKChjbG9uZTogSlF1ZXJ5KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNldENvbnRlbnQoY2xvbmUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0Q29udGVudChudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50ICE9IG51bGwpIHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmFibGUucmVnaXN0ZXIoKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fSwgJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeSB7XHJcblx0XHRcdGlmIChzZWxlY3RvciAhPSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29udGVudC5maWx0ZXIoc2VsZWN0b3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW29ic2VydmFibGUuZmFjdG9yeU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRQcm92aWRlclNlcnZpY2Uob2JzZXJ2YWJsZUZhY3RvcnkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGltZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RpbWVVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG59XHJcbiIsIlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ21vbWVudFdyYXBwZXInO1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpOiB2b2lkIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHQvLyBVc2luZyBgYW55YCBpbnN0ZWFkIG9mIE1vbWVudFN0YXRpYyBiZWNhdXNlXHJcblx0XHQvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuXHRcdC8vICBkZWZpbmVkIGluIE1vbWVudFN0YXRpYy4uLiA6LShcclxuXHRcdHZhciBtb21lbnRXcmFwcGVyOiBhbnkgPSBtb21lbnQ7IC8vIG1vbWVudCBtdXN0IGFscmVhZHkgYmUgbG9hZGVkXHJcblxyXG5cdFx0Ly8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcblx0XHQvLyBTZWUgNC8yOCBjb21tZW50IGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3XHJcblx0XHQvLyBUaGlzIGFsc28gcHJldmVudHMgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cclxuXHRcdG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSAoY29uZmlnOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0Y29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pKTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgbW9tZW50V3JhcHBlcik7XHJcblxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQnO1xyXG5cclxuXHRleHBvcnQgZW51bSBDb21wYXJlUmVzdWx0IHtcclxuXHRcdGdyZWF0ZXIgPSAxLFxyXG5cdFx0ZXF1YWwgPSAwLFxyXG5cdFx0bGVzcyA9IC0xLFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtOiBudW1iZXIpOiBDb21wYXJlUmVzdWx0IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdGlmIChudW0gPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0XHR9IGVsc2UgaWYgKG51bSA+IDApIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZ3JlYXRlcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0Lmxlc3M7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdGltZS90aW1lLnNlcnZpY2UudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9tZW50L21vbWVudC5tb2R1bGUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwZXMvY29tcGFyZVJlc3VsdC50c1wiIC8+XHJcblxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IGNvbXBhcmVSZXN1bHQgPSBybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdDtcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9udGgge1xyXG5cdFx0bmFtZTogc3RyaW5nO1xyXG5cdFx0ZGF5cyh5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZVZhbHVlIHtcclxuXHRcdHllYXJzOiBudW1iZXI7XHJcblx0XHRtb250aHM6IG51bWJlcjtcclxuXHRcdGRheXM6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVVdGlsaXR5IHtcclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZztcclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHRcdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWU7XHJcblx0XHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRcdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQ7XHJcblx0XHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW47XHJcblx0XHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlO1xyXG5cdFx0Z2V0Tm93KCk6IERhdGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW21vbWVudFdyYXBwZXIuc2VydmljZU5hbWUsIHRpbWUuc2VydmljZU5hbWVdO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBtb21lbnQ6IG1vbWVudC5Nb21lbnRTdGF0aWMsIHByaXZhdGUgdGltZTogdGltZS5JVGltZVV0aWxpdHkpIHtcclxuXHRcdFx0dGhpcy5tb250aCA9IFtcclxuXHRcdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWFyY2gnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bmUnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdF07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9udGg6IElNb250aFtdO1xyXG5cdFx0cHJpdmF0ZSBiYXNlRm9ybWF0OiBzdHJpbmcgPSAnTU0tREQtWVlZWSc7XHJcblxyXG5cdFx0cHJpdmF0ZSBpc0xlYXBZZWFyKHllYXI/OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKHllYXIsIDEsIDI5KS5nZXRNb250aCgpID09PSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5uYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5kYXlzKHllYXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWUge1xyXG5cdFx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRcdHZhciByZXN1bHQ6IElEYXRlVmFsdWUgPSA8YW55Pnt9O1xyXG5cdFx0XHRyZXN1bHQuZGF5cyA9IGVuZERhdGUuZ2V0RGF0ZSgpIC0gc3RhcnREYXRlLmdldERhdGUoKTtcclxuXHRcdFx0cmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRcdHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuXHJcblx0XHRcdGlmIChyZXN1bHQuZGF5cyA8IDApIHtcclxuXHRcdFx0XHRyZXN1bHQubW9udGhzIC09IDE7XHJcblx0XHRcdFx0cmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG5cdFx0XHRcdHJlc3VsdC55ZWFycyAtPSAxO1xyXG5cdFx0XHRcdHJlc3VsdC5tb250aHMgKz0gMTI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRcdHZhciBtaWxsaXNlY29uZHM6IG51bWJlciA9IGVuZERhdGUuZ2V0VGltZSgpIC0gc3RhcnREYXRlLmdldFRpbWUoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdCB7XHJcblx0XHRcdC8vIHN1YnRyYWN0RGF0ZUluRGF5cyBzdWJ0cmFjdHMgdGhlIGZpc3QgZnJvbSB0aGUgc2Vjb25kLCBhc3N1bWluZyBzdGFydCBhbmQgZW5kIGRhdGVzXHJcblx0XHRcdHZhciBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluRGF5cyhkYXRlMiwgZGF0ZTEsIGRhdGVGb3JtYXQpO1xyXG5cdFx0XHRyZXR1cm4gY29tcGFyZVJlc3VsdC5nZXRDb21wYXJlUmVzdWx0KGRpZmZlcmVuY2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZVN0YXJ0KSA9PT0gY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0Lmxlc3MpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQuZ3JlYXRlcikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGUge1xyXG5cdFx0XHR2YXIgZm9ybWF0OiBzdHJpbmcgPSBkYXRlRm9ybWF0ICE9IG51bGwgPyBkYXRlRm9ybWF0IDogdGhpcy5iYXNlRm9ybWF0O1xyXG5cclxuXHRcdFx0aWYgKF8uaXNEYXRlKGRhdGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDxEYXRlPmRhdGU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubW9tZW50KDxzdHJpbmc+ZGF0ZSwgZm9ybWF0KS50b0RhdGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldE5vdygpOiBEYXRlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0XHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0XHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0XHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdFx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxuXHR9O1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90aW1lL3RpbWUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbW9tZW50L21vbWVudC5tb2R1bGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbW9tZW50V3JhcHBlci5tb2R1bGVOYW1lLCB0aW1lLm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIERhdGVVdGlsaXR5KVxyXG5cdFx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbnVtYmVyVXRpbGl0eSc7XHJcblxyXG5cdGVudW0gU2lnbiB7XHJcblx0XHRwb3NpdGl2ZSA9IDEsXHJcblx0XHRuZWdhdGl2ZSA9IC0xLFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgc2lnbjogU2lnbiA9IG51bSA+PSAwID8gU2lnbi5wb3NpdGl2ZSA6IFNpZ24ubmVnYXRpdmU7XHJcblx0XHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG59XHJcbiIsIlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemUge1xyXG5cdFx0ZGlzcGxheSgpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBGaWxlU2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVNpemUge1xyXG5cdFx0QllURVNfUEVSX0dCOiBudW1iZXIgPSAxMDczNzQxODI0O1xyXG5cdFx0QllURVNfUEVSX01COiBudW1iZXIgPSAxMDQ4NTc2O1xyXG5cdFx0QllURVNfUEVSX0tCOiBudW1iZXIgPSAxMDI0O1xyXG5cclxuXHRcdGJ5dGVzOiBudW1iZXI7XHJcblxyXG5cdFx0R0I6IG51bWJlcjtcclxuXHRcdGlzR0I6IGJvb2xlYW47XHJcblxyXG5cdFx0TUI6IG51bWJlcjtcclxuXHRcdGlzTUI6IGJvb2xlYW47XHJcblxyXG5cdFx0S0I6IG51bWJlcjtcclxuXHRcdGlzS0I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IobnVtYmVyVXRpbGl0eTogbnVtYmVyLklOdW1iZXJVdGlsaXR5LCBieXRlczogbnVtYmVyKSB7XHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBieXRlcztcclxuXHJcblx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcblx0XHRcdFx0dGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfTUIpIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuXHRcdFx0XHRcdHRoaXMuTUIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLk1CLCAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5pc01CID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0tCKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaXNLQiA9IHRydWU7XHJcblx0XHRcdFx0XHRcdHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5LQiwgMSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNHQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuTUIgKyAnIE1CJztcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyLnNlcnZpY2VOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSk6IElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBzaW1wbGVGaWx0ZXJOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmaWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZhY3RvcnlOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGaWx0ZXIoZmlsZVNpemVGYWN0b3J5OiBJRmlsZVNpemVGYWN0b3J5KTogSUZpbGVTaXplRmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG5cdFx0XHR2YXIgZmlsZVNpemU6IElGaWxlU2l6ZSA9IGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZShieXRlcyk7XHJcblx0XHRcdHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplRmlsdGVyLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtudW1iZXIubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZmlsZVNpemVGYWN0b3J5KVxyXG5cdFx0LmZpbHRlcihzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcik7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXI7XHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gK3N0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChzdWJzdHJpbmcpIHtcclxuXHRcdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG5cdFx0XHRfLmVhY2gocGFyYW1zLCAocGFyYW06IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcldpdGhDb3VudHMgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHRcdHVwZGF0ZU9wdGlvbkNvdW50czxUSXRlbVR5cGU+KGRhdGE6IFRJdGVtVHlwZVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3N0cmluZy9zdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vZmlsdGVycy9maWx0ZXIudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlciBleHRlbmRzIGZpbHRlci5JRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmcgPSBmaWx0ZXJOYW1lO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgb2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzZWFyY2hPYmplY3Q8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUsIHNlYXJjaDogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KHZhbHVlcywgKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHsgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZGF0YVN0cmluZzogc3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcblxyXG5cdFx0XHRcdGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Quc2VydmljZU5hbWUsIHN0cmluZy5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksXHJcblx0XHRzdHJpbmdVdGlsaXR5OiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdC5tb2R1bGVOYW1lLCBzdHJpbmcubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgSlF1ZXJ5VXRpbGl0eSBpbXBsZW1lbnRzIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHRjb250ZW50QXJlYS5lbXB0eSgpO1xyXG5cdFx0XHRjb250ZW50QXJlYS5hcHBlbmQobmV3Q29udGVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBKUXVlcnlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbm90aWZpY2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcblx0XHRzZXROb3RpZmllcihub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZDtcclxuXHRcdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5vdGlmaWVyOiBuZXcgQmFzZU5vdGlmaWVyKCksXHJcblx0XHRcdHNldE5vdGlmaWVyOiAobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdFx0fSxcclxuXHRcdFx0JGdldDogKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQucHJvdmlkZXIoc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQmFzZU5vdGlmaWVyIGltcGxlbWVudHMgSU5vdGlmaWVyIHtcclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0d2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0XHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0XHR2aWV3RGF0YT86IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0XHQ6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJNb2Nrc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0XHRkaXJlY3RpdmU6IChkb206IHN0cmluZykgPT4gSURpcmVjdGl2ZVJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogYW5ndWxhci5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29udHJvbGxlcjogYW55ID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0XHRpZiAobG9jYWxzID09IG51bGwpIHtcclxuXHRcdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogPFRDb250cm9sbGVyVHlwZT4kY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXJlY3RpdmUoZG9tOiBzdHJpbmcpOiBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbXBpbGU6IGFueSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcblxyXG5cdFx0XHR2YXIgY29tcG9uZW50OiBhbnkgPSAkY29tcGlsZShkb20pKCRyb290U2NvcGUpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0XHRzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3Mvc2lub25cclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnk7XHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0XHRwcm9taXNlOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+O1xyXG5cdFx0ZGF0YTogVERhdGFUeXBlO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNlcnZpY2UpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNlcnZpY2UgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdHJldHVybiBzZXJ2aWNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCguLi5wYXJhbXM6IGFueVtdKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGNhbGxiYWNrLmFwcGx5KHRoaXMsIHBhcmFtcyksXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBuZy5JU2NvcGUpOiB2b2lkIHtcclxuXHRcdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0XHR2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0czogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT5bXSA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdFx0Ly8gVGhpcyB3YXkgaWYgYW55IGFkZGl0aW9uYWwgcmVxdWVzdHMgYXJlIGdlbmVyYXRlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSBjdXJyZW50IC8gbG9jYWwgbGlzdCBcclxuXHRcdFx0Ly8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuXHRcdFx0Xy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIChyZXF1ZXN0OiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBtb2NrOiBJTW9jayA9IG5ldyBNb2NrKCk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24nO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25IYW5kbGVyIHtcclxuXHRcdGlzQWN0aXZlPzogeygpOiBib29sZWFufSB8IGJvb2xlYW47XHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdFx0ZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCB7KCk6IHN0cmluZ307XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0KCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdFx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0bm90aWZ5QXNFcnJvcjogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uU2VydmljZSBpbXBsZW1lbnRzIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0XHRwcml2YXRlIHZhbGlkYXRpb25IYW5kbGVyczogeyBbaW5kZXg6IG51bWJlcl06IElWYWxpZGF0aW9uSGFuZGxlciB9ID0ge307XHJcblx0XHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblx0XHRub3RpZnlBc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb246IHNlcnZpY2VzLm5vdGlmaWNhdGlvbi5JTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRcdFx0Xy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gKF8uaXNGdW5jdGlvbihoYW5kbGVyLmlzQWN0aXZlKSAmJiAoPHsoKTogYm9vbGVhbn0+aGFuZGxlci5pc0FjdGl2ZSkoKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09PSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdHZhciBlcnJvcjogc3RyaW5nID0gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdD8gKDx7KCk6IHN0cmluZ30+aGFuZGxlci5lcnJvck1lc3NhZ2UpKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IDxzdHJpbmc+aGFuZGxlci5lcnJvck1lc3NhZ2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMubm90aWZ5QXNFcnJvcikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1tjdXJyZW50S2V5XSA9IGhhbmRsZXI7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSVZhbGlkYXRpb25TZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbc2VydmljZXMubm90aWZpY2F0aW9uLnNlcnZpY2VOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gdmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5KG5vdGlmaWNhdGlvbjogc2VydmljZXMubm90aWZpY2F0aW9uLklOb3RpZmljYXRpb25TZXJ2aWNlKTogSVZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFZhbGlkYXRpb25TZXJ2aWNlKG5vdGlmaWNhdGlvbik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbc2VydmljZXMubm90aWZpY2F0aW9uLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpc0VtcHR5L2lzRW1wdHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlL3RydW5jYXRlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGlzRW1wdHkubW9kdWxlTmFtZSxcclxuXHRcdHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUvZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdqcXVlcnkvanF1ZXJ5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J251bWJlci9udW1iZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nb2JqZWN0L29iamVjdC5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlLm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lLFxyXG5cdFx0Ym9vbGVhbi5tb2R1bGVOYW1lLFxyXG5cdFx0Y29udGVudFByb3ZpZGVyLm1vZHVsZU5hbWUsXHJcblx0XHRkYXRlLm1vZHVsZU5hbWUsXHJcblx0XHRqcXVlcnkubW9kdWxlTmFtZSxcclxuXHRcdG51bWJlci5tb2R1bGVOYW1lLFxyXG5cdFx0b2JqZWN0Lm1vZHVsZU5hbWUsXHJcblx0XHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0XHRwcm9taXNlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2JlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdzZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShuYW1lLCBbXHJcblx0XHRiZWhhdmlvcnMubW9kdWxlTmFtZSxcclxuXHRcdGZpbHRlcnMubW9kdWxlTmFtZSxcclxuXHRcdHNlcnZpY2VzLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9