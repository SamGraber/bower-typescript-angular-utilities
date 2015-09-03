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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cyIsInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50cyIsImZpbHRlcnMvdHJ1bmNhdGUvdHJ1bmNhdGUudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvdGltZS90aW1lLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9tb21lbnQvbW9tZW50Lm1vZHVsZS50cyIsInR5cGVzL2NvbXBhcmVSZXN1bHQudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGUuc2VydmljZS50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzIiwic2VydmljZXMvZGF0ZS9kYXRlLm1vZHVsZS50cyIsInNlcnZpY2VzL251bWJlci9udW1iZXIuc2VydmljZS50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZUZpbHRlci50cyIsInNlcnZpY2VzL2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvY29udGVudFByb3ZpZGVyL2NvbnRlbnRQcm92aWRlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzIiwiZmlsdGVycy9maWx0ZXIudHMiLCJzZXJ2aWNlcy9nZW5lcmljU2VhcmNoRmlsdGVyL2dlbmVyaWNTZWFyY2hGaWx0ZXIuc2VydmljZS50cyIsInNlcnZpY2VzL2pxdWVyeS9qcXVlcnkuc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi9iYXNlTm90aWZpZXIudHMiLCJzZXJ2aWNlcy9wYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cyIsInNlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvdGVzdC9hbmd1bGFyRml4dHVyZS50cyIsInNlcnZpY2VzL3Rlc3QvbW9jay50cyIsInNlcnZpY2VzL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIiwiYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMiLCJmaWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIiwic2VydmljZXMvc2VydmljZXMubW9kdWxlLnRzIiwidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbInJsIiwicmwudXRpbGl0aWVzIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24iLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uLnN0b3BFdmVudFByb3BhZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbi5saW5rIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPckVtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5hcmVFcXVhbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS50b1N0cmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS52YWx1ZU9yRGVmYXVsdCIsInJsLnV0aWxpdGllcy5maWx0ZXJzIiwicmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkuaXNFbXB0eSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlIiwicmwudXRpbGl0aWVzLmZpbHRlcnMudHJ1bmNhdGUudHJ1bmNhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc2F2aW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5jb21wbGV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2Uuc3VjY2Vzc2Z1bCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UudHJpZ2dlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UubnVsbEZvcm0uJHNldFByaXN0aW5lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLmF1dG9zYXZlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LnRvQm9vbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvU2Vjb25kcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvTWludXRlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvSG91cnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0RheXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyLm1vbWVudFdyYXBwZXIiLCJybC51dGlsaXRpZXMudHlwZXMiLCJybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdCIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQiLCJybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdC5nZXRDb21wYXJlUmVzdWx0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuaXNMZWFwWWVhciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LnN1YnRyYWN0RGF0ZUluRGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmNvbXBhcmVEYXRlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmRhdGVJblJhbmdlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RGF0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldE5vdyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLlNpZ24iLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyLk51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LmludGVnZXJEaXZpZGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UuZGlzcGxheSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5maXJlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UudW5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLm9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLm9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2Uuc2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5nZXRDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5jb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoT2JqZWN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkucmVwbGFjZUNvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLmluZm8iLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2Uud2FybmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5lcnJvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIuaW5mbyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLndhcm5pbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5lcnJvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLnN1Y2Nlc3MiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5ub3RpZnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb250cm9sbGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmZsdXNoIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZS5yZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UudW5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSJdLCJtYXBwaW5ncyI6IkFBQUEsdUJBQXVCO0FBRXZCLElBQU8sRUFBRSxDQTJCUjtBQTNCRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0EyQmxCQTtJQTNCU0EsV0FBQUEsU0FBU0E7UUFBQ0MsSUFBQUEsU0FBU0EsQ0EyQjVCQTtRQTNCbUJBLFdBQUFBLFNBQVNBO1lBQUNDLElBQUFBLG9CQUFvQkEsQ0EyQmpEQTtZQTNCNkJBLFdBQUFBLG9CQUFvQkEsRUFBQ0EsQ0FBQ0E7Z0JBQ25EQyxZQUFZQSxDQUFDQTtnQkFFRkEsK0JBQVVBLEdBQVdBLDZDQUE2Q0EsQ0FBQ0E7Z0JBQ25FQSxrQ0FBYUEsR0FBV0Esd0JBQXdCQSxDQUFDQTtnQkFNNURBO29CQUNDQyxZQUFZQSxDQUFDQTtvQkFDYkEsTUFBTUEsQ0FBQ0E7d0JBQ05BLFFBQVFBLEVBQUVBLEdBQUdBO3dCQUNiQSxJQUFJQSxZQUFDQSxLQUFnQkEsRUFDbEJBLE9B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LElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDckRBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDekRBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdkRBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDeERBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTt5QkFDeERBLENBQUNBO29CQUNIQSxDQUFDQTtvQkFLT0QsZ0NBQVVBLEdBQWxCQSxVQUFtQkEsSUFBYUE7d0JBQy9CRSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtvQkFDL0NBLENBQUNBO29CQUVERixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBYUE7d0JBQzFCRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFDL0JBLENBQUNBO29CQUVESCw2QkFBT0EsR0FBUEEsVUFBUUEsS0FBYUEsRUFBRUEsSUFBYUE7d0JBQ25DSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDckNBLENBQUNBO29CQUVESixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQzFFSyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFFbERBLElBQUlBLE1BQU1BLEdBQW9CQSxFQUFFQSxDQUFDQTt3QkFDakNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUN0REEsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7d0JBQy9EQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTt3QkFFMURBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNyQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ25CQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTt3QkFDNUVBLENBQUNBO3dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkJBLE1BQU1BLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBOzRCQUNsQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxDQUFDQTt3QkFFREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ2ZBLENBQUNBO29CQUVETCx3Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQy9FTSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEsQ0FBQ0Es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QVFBLEdBQVJBLGtCQUFRQSxLQUFSQSxrQkFBUUEsUUF3QjNCQTtJQUFEQSxDQUFDQSxFQXhCU0QsU0FBU0EsR0FBVEEsWUFBU0EsS0FBVEEsWUFBU0EsUUF3QmxCQTtBQUFEQSxDQUFDQSxFQXhCTSxFQUFFLEtBQUYsRUFBRSxRQXdCUjtBQzlDRCxpQkFBaUI7QUFFakIsc0RBQXNEO0FBQ3RELGtEQUFrRDtBQUNsRCxvREFBb0Q7QUFFcEQsSUFBTyxFQUFFLENBUVI7QUFSRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsU0FBU0EsQ0FRbEJBO0lBUlNBLFdBQUFBLFNBQVNBLEVBQUNBLENBQUNBO1FBQ1RDLG9CQUFVQSxHQUFXQSxjQUFjQSxDQUFDQTtRQUUvQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQVVBLEVBQUVBO1lBQzFCQSxtQkFBU0EsQ0FBQ0EsVUFBVUE7WUFDcEJBLGlCQUFPQSxDQUFDQSxVQUFVQTtZQUNsQkEsa0JBQVFBLENBQUNBLFVBQVVBO1NBQ25CQSxDQUFDQSxDQUFDQTtJQUNKQSxDQUFDQSxFQVJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQVFsQkE7QUFBREEsQ0FBQ0EsRUFSTSxFQUFFLEtBQUYsRUFBRSxRQVFSIiwiZmlsZSI6InV0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcblx0ZXhwb3J0IHZhciBkaXJlY3RpdmVOYW1lOiBzdHJpbmcgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMgZXh0ZW5kcyBuZy5JQXR0cmlidXRlcyB7XHJcblx0XHRybFN0b3BFdmVudFByb3BhZ2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpOiBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZVxyXG5cdFx0XHRcdCwgZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeVxyXG5cdFx0XHRcdCwgYXR0cnM6IElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzKTogdm9pZCB7XHJcblx0XHRcdFx0ZWxlbWVudC5vbihhdHRycy5ybFN0b3BFdmVudFByb3BhZ2F0aW9uLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhcnJheVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZTtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkO1xyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm06IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyO1xyXG5cdFx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfTtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFycmF5VXRpbGl0eSBpbXBsZW1lbnRzIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHRhcmdldEluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRfLmVhY2goYXJyYXksIChpdGVtOiBURGF0YVR5cGUsIGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRpZiAocHJlZGljYXRlKGl0ZW0pKSB7XHJcblx0XHRcdFx0XHR0YXJnZXRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0SW5kZXggIT0gbnVsbCA/IHRhcmdldEluZGV4IDogLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUgfCB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZSB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVtKSkge1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5maW5kSW5kZXhPZihhcnJheSwgPHsob2JqOiBURGF0YVR5cGUpOiBib29sZWFufT5pdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmRleCA9IF8uaW5kZXhPZihhcnJheSwgPFREYXRhVHlwZT5pdGVtKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZCB7XHJcblx0XHRcdHZhciBpbmRleDogbnVtYmVyID0gXy5pbmRleE9mKGFycmF5LCBvbGRJdGVtKTtcclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAxLCBuZXdJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtPzogeyAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgbGlzdDogbnVtYmVyW107XHJcblxyXG5cdFx0XHRpZiAodHJhbnNmb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRsaXN0ID0gXy5tYXAoYXJyYXksIChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgPT4geyByZXR1cm4gdHJhbnNmb3JtKGl0ZW0pOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaXN0ID0gPGFueVtdPmFycmF5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gXy5yZWR1Y2UobGlzdCwgKHN1bTogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiBzdW0gKyBudW07IH0sIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsgKGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZyB9KVxyXG5cdFx0XHQ6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSB7XHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShhcnJheSwgKGRpY3Rpb25hcnk6IHsgW2luZGV4OiBzdHJpbmddOiBURGF0YVR5cGUgfSwgaXRlbTogVERhdGFUeXBlKTogeyBbaW5kZXg6IHN0cmluZ106IFREYXRhVHlwZSB9ID0+IHtcclxuXHRcdFx0XHRkaWN0aW9uYXJ5W2tleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHRcdH0sIFtdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9hcnJheS9hcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ29iamVjdFV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0XHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZztcclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgT2JqZWN0VXRpbGl0eSBpbXBsZW1lbnRzIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdCBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXkuc2VydmljZU5hbWVdO1xyXG5cdFx0IGNvbnN0cnVjdG9yKHByaXZhdGUgYXJyYXk6IGFycmF5LklBcnJheVV0aWxpdHkpIHtcclxuXHRcdCB9XHJcblxyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAob2JqZWN0ID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzQXJyYXkob2JqZWN0KSkge1xyXG5cdFx0XHRcdHJldHVybiBfLmFueShvYmplY3QpID09PSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5pc05hTihvYmplY3QpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBvYmplY3QgPT09ICcnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzU3RyaW5nKG9iamVjdCkpIHtcclxuXHRcdFx0XHRvYmplY3QgPSAoPHN0cmluZz5vYmplY3QpLnRyaW0oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNOdWxsT3JFbXB0eShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciB0eXBlMTogc3RyaW5nID0gdHlwZW9mIG9iajE7XHJcblx0XHRcdHZhciB0eXBlMjogc3RyaW5nID0gdHlwZW9mIG9iajI7XHJcblxyXG5cdFx0XHRpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlMSAhPT0gdHlwZTIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdC8vaW5pdCBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyBmcm9tIG9iajJcclxuXHRcdFx0XHR2YXIga2V5czI6IHN0cmluZ1tdID0gXy5rZXlzKG9iajIpO1xyXG5cdFx0XHRcdF8uZm9ySW4ob2JqMSwgKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAoXy5oYXMob2JqMiwga2V5KSkge1xyXG5cdFx0XHRcdFx0XHQvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcblx0XHRcdFx0aWYgKF8uYW55KGtleXMyKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0XHRyZXR1cm4gb2JqMSA9PT0gb2JqMjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG5cdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXkubW9kdWxlTmFtZV0pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgT2JqZWN0VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdFx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0dHJ1bmNhdGUuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eTogX19vYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRcdGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcblxyXG5cdFx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG5cdFx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdFx0b3V0ICs9ICcuLi4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gb3V0O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24nO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUFjdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiB2b2lkO1xyXG5cdFx0c2F2aW5nOiBib29sZWFuO1xyXG5cdFx0Y29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyR0aW1lb3V0J107XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UpIHt9XHJcblxyXG5cdFx0cHJpdmF0ZSBjb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbjogbnVtYmVyID0gMTAwMDtcclxuXHJcblx0XHRwcml2YXRlIF9zYXZpbmc6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9jb21wbGV0ZTogYm9vbGVhbjtcclxuXHRcdHByaXZhdGUgX3N1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblxyXG5cdFx0Z2V0IHNhdmluZygpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3NhdmluZztcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgY29tcGxldGUoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wbGV0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgc3VjY2Vzc2Z1bCgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N1Y2Nlc3NmdWw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYW55IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2UudGhlbih0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bClcclxuXHRcdFx0XHRcdFx0LmNhdGNoKHRoaXMuYXV0b3NhdmVGYWlsZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVTdWNjZXNzZnVsOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgdHJ1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBhdXRvc2F2ZUZhaWxlZDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHJlc29sdmVBdXRvc2F2ZTogeyAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55IH0gPSAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55ID0+IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX2NvbXBsZXRlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5fc3VjY2Vzc2Z1bCA9IHN1Y2Nlc3M7XHJcblxyXG5cdFx0XHR0aGlzLiR0aW1lb3V0KCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLl9jb21wbGV0ZSA9IGZhbHNlO1xyXG5cdFx0XHR9LCB0aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uKTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fYXV0b3NhdmVBY3Rpb24gPSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb247XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2F1dG9zYXZlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRhdXRvc2F2ZSguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRjb250ZW50Rm9ybTogbmcuSUZvcm1Db250cm9sbGVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVTZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIGhhc1ZhbGlkYXRvcjogYm9vbGVhbjtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlXHJcblx0XHRcdFx0LCBwcml2YXRlIHNhdmU6IHsoLi4uZGF0YTogYW55W10pOiBuZy5JUHJvbWlzZTx2b2lkPn1cclxuXHRcdFx0XHQsIHB1YmxpYyBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlclxyXG5cdFx0XHRcdCwgcHJpdmF0ZSB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pIHtcclxuXHRcdFx0dGhpcy5oYXNWYWxpZGF0b3IgPSB2YWxpZGF0ZSAhPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuY29udGVudEZvcm0gPSB0aGlzLm51bGxGb3JtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhdXRvc2F2ZTogeyAoLi4uZGF0YTogYW55W10pOiBib29sZWFuIH0gPSAoLi4uZGF0YTogYW55W10pOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0uJHByaXN0aW5lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmhhc1ZhbGlkYXRvcikge1xyXG5cdFx0XHRcdHZhbGlkID0gdGhpcy52YWxpZGF0ZSgpO1xyXG5cdFx0XHRcdGlmICh2YWxpZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmFsaWQpIHtcclxuXHRcdFx0XHR2YXIgcHJvbWlzZTogbmcuSVByb21pc2U8dm9pZD4gPSB0aGlzLnNhdmUoLi4uZGF0YSk7XHJcblxyXG5cdFx0XHRcdGlmICghXy5pc1VuZGVmaW5lZChwcm9taXNlKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5hdXRvc2F2ZVNlcnZpY2UudHJpZ2dlcihwcm9taXNlLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jb250ZW50Rm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBudWxsRm9ybSgpOiBuZy5JRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0XHRyZXR1cm4gPGFueT57XHJcblx0XHRcdFx0JHByaXN0aW5lOiBmYWxzZSxcclxuXHRcdFx0XHQkc2V0UHJpc3RpbmUoKTogdm9pZCB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeygpOiBuZy5JUHJvbWlzZTx2b2lkPn0sIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyLCB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pOiBJQXV0b3NhdmVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0YXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW19fYXV0b3NhdmVBY3Rpb24uc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGF1dG9zYXZlU2VydmljZUZhY3RvcnkoYXV0b3NhdmVTZXJ2aWNlOiBfX2F1dG9zYXZlQWN0aW9uLklBdXRvc2F2ZUFjdGlvblNlcnZpY2UpOiBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZShzYXZlOiB7ICgpOiBuZy5JUHJvbWlzZTx2b2lkPiB9LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7ICgpOiBib29sZWFuIH0pOiBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEF1dG9zYXZlU2VydmljZShhdXRvc2F2ZVNlcnZpY2UsIHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19hdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYm9vbGVhblV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiAhIW9iamVjdDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICd0aW1lVXRpbGl0eSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRpbWVVdGlsaXR5IHtcclxuXHRcdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgVGltZVV0aWxpdHkge1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IobWlsbGlzZWNvbmRzIC8gMTAwMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzKSAvIDYwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzKSAvIDYwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzKSAvIDI0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFRpbWVVdGlsaXR5KTtcclxufVxyXG4iLCJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlciB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdtb21lbnRXcmFwcGVyJztcclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG1vbWVudFdyYXBwZXIoKTogdm9pZCB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0Ly8gVXNpbmcgYGFueWAgaW5zdGVhZCBvZiBNb21lbnRTdGF0aWMgYmVjYXVzZVxyXG5cdFx0Ly8gIGNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrIGRvZXNuJ3QgYXBwZWFyIHRvIGJlXHJcblx0XHQvLyAgZGVmaW5lZCBpbiBNb21lbnRTdGF0aWMuLi4gOi0oXHJcblx0XHR2YXIgbW9tZW50V3JhcHBlcjogYW55ID0gbW9tZW50OyAvLyBtb21lbnQgbXVzdCBhbHJlYWR5IGJlIGxvYWRlZFxyXG5cclxuXHRcdC8vIFNldCBkZWZhdWx0IG1ldGhvZCBmb3IgaGFuZGxpbmcgbm9uLUlTTyBkYXRlIGNvbnZlcnNpb25zLlxyXG5cdFx0Ly8gU2VlIDQvMjggY29tbWVudCBpbiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwN1xyXG5cdFx0Ly8gVGhpcyBhbHNvIHByZXZlbnRzIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXHJcblx0XHRtb21lbnRXcmFwcGVyLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gKGNvbmZpZzogYW55KTogdm9pZCA9PiB7XHJcblx0XHRcdGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBtb21lbnRXcmFwcGVyO1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIG1vbWVudFdyYXBwZXIpO1xyXG5cclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0JztcclxuXHJcblx0ZXhwb3J0IGVudW0gQ29tcGFyZVJlc3VsdCB7XHJcblx0XHRncmVhdGVyID0gMSxcclxuXHRcdGVxdWFsID0gMCxcclxuXHRcdGxlc3MgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRDb21wYXJlUmVzdWx0KG51bTogbnVtYmVyKTogQ29tcGFyZVJlc3VsdCB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRpZiAobnVtID09PSAwKSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmVxdWFsO1xyXG5cdFx0fSBlbHNlIGlmIChudW0gPiAwKSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0LmdyZWF0ZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5sZXNzO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3RpbWUvdGltZS5zZXJ2aWNlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21vbWVudC9tb21lbnQubW9kdWxlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGVzL2NvbXBhcmVSZXN1bHQudHNcIiAvPlxyXG5cclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBjb21wYXJlUmVzdWx0ID0gcmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQ7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU1vbnRoIHtcclxuXHRcdG5hbWU6IHN0cmluZztcclxuXHRcdGRheXMoeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVWYWx1ZSB7XHJcblx0XHR5ZWFyczogbnVtYmVyO1xyXG5cdFx0bW9udGhzOiBudW1iZXI7XHJcblx0XHRkYXlzOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVXRpbGl0eSB7XHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmc7XHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlO1xyXG5cdFx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXI7XHJcblx0XHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0O1xyXG5cdFx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuO1xyXG5cdFx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZTtcclxuXHRcdGdldE5vdygpOiBEYXRlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIERhdGVVdGlsaXR5IHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFttb21lbnRXcmFwcGVyLnNlcnZpY2VOYW1lLCB0aW1lLnNlcnZpY2VOYW1lXTtcclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgbW9tZW50OiBtb21lbnQuTW9tZW50U3RhdGljLCBwcml2YXRlIHRpbWU6IHRpbWUuSVRpbWVVdGlsaXR5KSB7XHJcblx0XHRcdHRoaXMubW9udGggPSBbXHJcblx0XHRcdFx0eyBuYW1lOiAnSmFudWFyeScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdGZWJydWFyeScsIGRheXM6ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyODsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01hcmNoJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0FwcmlsJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ01heScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdW5lJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bHknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXVndXN0JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ1NlcHRlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdPY3RvYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ05vdmVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0RlY2VtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vbnRoOiBJTW9udGhbXTtcclxuXHRcdHByaXZhdGUgYmFzZUZvcm1hdDogc3RyaW5nID0gJ01NLURELVlZWVknO1xyXG5cclxuXHRcdHByaXZhdGUgaXNMZWFwWWVhcih5ZWFyPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBuZXcgRGF0ZSh5ZWFyLCAxLCAyOSkuZ2V0TW9udGgoKSA9PT0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRGdWxsU3RyaW5nKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0ubmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXREYXlzKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb250aFttb250aF0uZGF5cyh5ZWFyKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWJ0cmFjdERhdGVzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBJRGF0ZVZhbHVlIHtcclxuXHRcdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHRcdHZhciBlbmREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcblxyXG5cdFx0XHR2YXIgcmVzdWx0OiBJRGF0ZVZhbHVlID0gPGFueT57fTtcclxuXHRcdFx0cmVzdWx0LmRheXMgPSBlbmREYXRlLmdldERhdGUoKSAtIHN0YXJ0RGF0ZS5nZXREYXRlKCk7XHJcblx0XHRcdHJlc3VsdC55ZWFycyA9IGVuZERhdGUuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cdFx0XHRyZXN1bHQubW9udGhzID0gZW5kRGF0ZS5nZXRNb250aCgpIC0gc3RhcnREYXRlLmdldE1vbnRoKCk7XHJcblxyXG5cdFx0XHRpZiAocmVzdWx0LmRheXMgPCAwKSB7XHJcblx0XHRcdFx0cmVzdWx0Lm1vbnRocyAtPSAxO1xyXG5cdFx0XHRcdHJlc3VsdC5kYXlzICs9IHRoaXMuZ2V0RGF5cyhzdGFydERhdGUuZ2V0TW9udGgoKSwgc3RhcnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmVzdWx0Lm1vbnRocyA8IDApIHtcclxuXHRcdFx0XHRyZXN1bHQueWVhcnMgLT0gMTtcclxuXHRcdFx0XHRyZXN1bHQubW9udGhzICs9IDEyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnRyYWN0RGF0ZUluRGF5cyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdFx0aWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShzdGFydCwgZGF0ZUZvcm1hdCk7XHJcblx0XHRcdHZhciBlbmREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKGVuZCwgZGF0ZUZvcm1hdCk7XHJcblxyXG5cdFx0XHR2YXIgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSBlbmREYXRlLmdldFRpbWUoKSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy50aW1lLm1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQge1xyXG5cdFx0XHQvLyBzdWJ0cmFjdERhdGVJbkRheXMgc3VidHJhY3RzIHRoZSBmaXN0IGZyb20gdGhlIHNlY29uZCwgYXNzdW1pbmcgc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG5cdFx0XHR2YXIgZGlmZmVyZW5jZTogbnVtYmVyID0gdGhpcy5zdWJ0cmFjdERhdGVJbkRheXMoZGF0ZTIsIGRhdGUxLCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0cmV0dXJuIGNvbXBhcmVSZXN1bHQuZ2V0Q29tcGFyZVJlc3VsdChkaWZmZXJlbmNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VTdGFydCkgPT09IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdC5sZXNzKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlRW5kKSA9PT0gY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0LmdyZWF0ZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlIHtcclxuXHRcdFx0dmFyIGZvcm1hdDogc3RyaW5nID0gZGF0ZUZvcm1hdCAhPSBudWxsID8gZGF0ZUZvcm1hdCA6IHRoaXMuYmFzZUZvcm1hdDtcclxuXHJcblx0XHRcdGlmIChfLmlzRGF0ZShkYXRlKSkge1xyXG5cdFx0XHRcdHJldHVybiA8RGF0ZT5kYXRlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLm1vbWVudCg8c3RyaW5nPmRhdGUsIGZvcm1hdCkudG9EYXRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRnZXROb3coKTogRGF0ZSB7XHJcblx0XHRcdHJldHVybiBuZXcgRGF0ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHRleHBvcnQgdmFyIGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVGltZUZvcm1hdFN0cmluZ3MnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlRm9ybWF0U3RyaW5ncyB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogc3RyaW5nO1xyXG5cdFx0ZGF0ZUZvcm1hdDogc3RyaW5nO1xyXG5cdFx0dGltZUZvcm1hdDogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBkZWZhdWx0Rm9ybWF0czogSURhdGVGb3JtYXRTdHJpbmdzID0ge1xyXG5cdFx0ZGF0ZVRpbWVGb3JtYXQ6ICdNL0QvWVlZWSBoOm1tIEEnLFxyXG5cdFx0ZGF0ZUZvcm1hdDogJ00vRC9ZWVlZJyxcclxuXHRcdHRpbWVGb3JtYXQ6ICdoOm1tQScsXHJcblx0fTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vdGltZS90aW1lLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL21vbWVudC9tb21lbnQubW9kdWxlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVVdGlsaXR5JztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW21vbWVudFdyYXBwZXIubW9kdWxlTmFtZSwgdGltZS5tb2R1bGVOYW1lXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBEYXRlVXRpbGl0eSlcclxuXHRcdC52YWx1ZShkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lLCBkZWZhdWx0Rm9ybWF0cyk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ251bWJlclV0aWxpdHknO1xyXG5cclxuXHRlbnVtIFNpZ24ge1xyXG5cdFx0cG9zaXRpdmUgPSAxLFxyXG5cdFx0bmVnYXRpdmUgPSAtMSxcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0aW50ZWdlckRpdmlkZShkaXZpZGVuZDogbnVtYmVyLCBkaXZpc29yOiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBOdW1iZXJVdGlsaXR5IGltcGxlbWVudHMgSU51bWJlclV0aWxpdHkge1xyXG5cdFx0cHJlY2lzZVJvdW5kKG51bTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIHNpZ246IFNpZ24gPSBudW0gPj0gMCA/IFNpZ24ucG9zaXRpdmUgOiBTaWduLm5lZ2F0aXZlO1xyXG5cdFx0XHRyZXR1cm4gKE1hdGgucm91bmQoKG51bSAqIE1hdGgucG93KDEwLCBkZWNpbWFscykpICsgKDxudW1iZXI+c2lnbiAqIDAuMDAxKSkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbHMpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBOdW1iZXJVdGlsaXR5KTtcclxufVxyXG4iLCJcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplIHtcclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgRmlsZVNpemVTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTaXplIHtcclxuXHRcdEJZVEVTX1BFUl9HQjogbnVtYmVyID0gMTA3Mzc0MTgyNDtcclxuXHRcdEJZVEVTX1BFUl9NQjogbnVtYmVyID0gMTA0ODU3NjtcclxuXHRcdEJZVEVTX1BFUl9LQjogbnVtYmVyID0gMTAyNDtcclxuXHJcblx0XHRieXRlczogbnVtYmVyO1xyXG5cclxuXHRcdEdCOiBudW1iZXI7XHJcblx0XHRpc0dCOiBib29sZWFuO1xyXG5cclxuXHRcdE1COiBudW1iZXI7XHJcblx0XHRpc01COiBib29sZWFuO1xyXG5cclxuXHRcdEtCOiBudW1iZXI7XHJcblx0XHRpc0tCOiBib29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSwgYnl0ZXM6IG51bWJlcikge1xyXG5cdFx0XHR0aGlzLmJ5dGVzID0gYnl0ZXM7XHJcblxyXG5cdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfR0IpIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0dCO1xyXG5cdFx0XHRcdHRoaXMuR0IgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLkdCLCAxKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmlzR0IgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX01CKSB7XHJcblx0XHRcdFx0XHR0aGlzLmlzTUIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5NQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfTUI7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5NQiwgMSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9LQikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9LQjtcclxuXHRcdFx0XHRcdFx0dGhpcy5LQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuS0IsIDEpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0tCID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmJ5dGVzID0gTWF0aC5yb3VuZCh0aGlzLmJ5dGVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXNwbGF5KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLmlzR0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5HQiArICcgR0InO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuaXNNQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLk1CICsgJyBNQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc0tCKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuS0IgKyAnIEtCJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5ieXRlcyArICcgYnl0ZXMnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZTtcclxuXHR9XHJcblxyXG5cdGZpbGVTaXplRmFjdG9yeS4kaW5qZWN0ID0gW251bWJlci5zZXJ2aWNlTmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmFjdG9yeShudW1iZXJVdGlsaXR5OiBudW1iZXIuSU51bWJlclV0aWxpdHkpOiBJRmlsZVNpemVGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKGJ5dGVzOiBudW1iZXIpOiBJRmlsZVNpemUge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgRmlsZVNpemVTZXJ2aWNlKG51bWJlclV0aWxpdHksIGJ5dGVzKTtcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgc2ltcGxlRmlsdGVyTmFtZTogc3RyaW5nID0gJ2ZpbGVTaXplJztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNpbXBsZUZpbHRlck5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemVGaWx0ZXIge1xyXG5cdFx0KGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGaWx0ZXIuJGluamVjdCA9IFtmYWN0b3J5TmFtZV07XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGZpbGVTaXplRmlsdGVyKGZpbGVTaXplRmFjdG9yeTogSUZpbGVTaXplRmFjdG9yeSk6IElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4gKGJ5dGVzPzogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHRcdFx0dmFyIGZpbGVTaXplOiBJRmlsZVNpemUgPSBmaWxlU2l6ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoYnl0ZXMpO1xyXG5cdFx0XHRyZXR1cm4gZmlsZVNpemUuZGlzcGxheSgpO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdmaWxlU2l6ZUZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbnVtYmVyLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGZpbGVTaXplRmFjdG9yeSlcclxuXHRcdC5maWx0ZXIoc2ltcGxlRmlsdGVyTmFtZSwgZmlsZVNpemVGaWx0ZXIpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnb2JzZXJ2YWJsZUZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElXYXRjaGVyPFRSZXR1cm5UeXBlPiB7XHJcblx0XHRhY3Rpb246IElBY3Rpb248VFJldHVyblR5cGU+O1xyXG5cdFx0ZXZlbnQ/OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBY3Rpb248VFJldHVyblR5cGU+IHtcclxuXHRcdCguLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0KCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiBJQWN0aW9uPHZvaWQ+LCBldmVudD86IHN0cmluZyk6IElVbnJlZ2lzdGVyRnVuY3Rpb247XHJcblx0XHRmaXJlPFRSZXR1cm5UeXBlPihldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlW107XHJcblx0XHRmaXJlKGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlU2VydmljZSBpbXBsZW1lbnRzIElPYnNlcnZhYmxlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIHdhdGNoZXJzOiBJV2F0Y2hlcjxhbnk+W10gPSBbXTtcclxuXHRcdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0XHRyZWdpc3RlcjxUUmV0dXJuVHlwZT4oYWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0aWYgKCFfLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdFcnJvcjogd2F0Y2hlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGN1cnJlbnRLZXk6IG51bWJlciA9IHRoaXMubmV4dEtleTtcclxuXHRcdFx0dGhpcy5uZXh0S2V5Kys7XHJcblx0XHRcdHRoaXMud2F0Y2hlcnNbY3VycmVudEtleV0gPSB7XHJcblx0XHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLnVucmVnaXN0ZXIoY3VycmVudEtleSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdFx0cmV0dXJuIF8odGhpcy53YXRjaGVycykuZmlsdGVyKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gd2F0Y2hlciAhPSBudWxsICYmIHdhdGNoZXIuZXZlbnQgPT09IGV2ZW50O1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQubWFwKCh3YXRjaGVyOiBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4pOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHdhdGNoZXIuYWN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0XHRcdH0pLnZhbHVlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSB1bnJlZ2lzdGVyKGtleTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRcdHRoaXMud2F0Y2hlcnNba2V5XSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYnNlcnZhYmxlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgT2JzZXJ2YWJsZVNlcnZpY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdjb250ZW50UHJvdmlkZXJGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQ7XHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudCh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQ7XHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5O1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld1RleHQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIENvbnRlbnRQcm92aWRlclNlcnZpY2UgaW1wbGVtZW50cyBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRjb25zdHJ1Y3RvcihvYnNlcnZhYmxlRmFjdG9yeTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KSB7XHJcblx0XHRcdHRoaXMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGVGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBvYnNlcnZhYmxlOiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZTtcclxuXHRcdHByaXZhdGUgY29udGVudDogSlF1ZXJ5O1xyXG5cclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZCB7XHJcblx0XHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHRcdHRoaXMub2JzZXJ2YWJsZS5maXJlKCdjb250ZW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50OiB7KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZH0gPSAodHJhbnNjbHVkZUZ1bmN0aW9uOiBuZy5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24odHJhbnNjbHVkZUZ1bmN0aW9uKSkge1xyXG5cdFx0XHRcdHRyYW5zY2x1ZGVGdW5jdGlvbigoY2xvbmU6IEpRdWVyeSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRDb250ZW50KGNsb25lKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldENvbnRlbnQobnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3Q29udGVudDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudCAhPSBudWxsKSB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5vYnNlcnZhYmxlLnJlZ2lzdGVyKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH0sICdjb250ZW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnkge1xyXG5cdFx0XHRpZiAoc2VsZWN0b3IgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQuZmlsdGVyKHNlbGVjdG9yKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtvYnNlcnZhYmxlLmZhY3RvcnlOYW1lXTtcclxuXHRmdW5jdGlvbiBjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeShvYnNlcnZhYmxlRmFjdG9yeTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlKG9ic2VydmFibGVGYWN0b3J5KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYnNlcnZhYmxlLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnc3RyaW5nVXRpbGl0eVNlcnZpY2UnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0XHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlcjtcclxuXHRcdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZztcclxuXHRcdHJlcGxhY2VBbGwoc3RyOiBzdHJpbmcsIHBhdHRlcm5Ub0ZpbmQ6IHN0cmluZywgcmVwbGFjZW1lbnRTdHJpbmc6IHN0cmluZyk6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsaXR5U2VydmljZSBpbXBsZW1lbnRzIElTdHJpbmdVdGlsaXR5U2VydmljZSB7XHJcblx0XHR0b051bWJlcihzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiArc3RyaW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRhaW5zKHN0cjogc3RyaW5nLCBzdWJzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHN1YnN0cmluZykge1xyXG5cdFx0XHRcdHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHJpbmcpICE9PSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c3Vic3RpdHV0ZShmb3JtYXRTdHJpbmc6IHN0cmluZywgLi4ucGFyYW1zOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcblx0XHRcdF8uZWFjaChwYXJhbXMsIChwYXJhbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0Zm9ybWF0U3RyaW5nID0gdGhpcy5yZXBsYWNlQWxsKGZvcm1hdFN0cmluZywgJ1xcXFx7JyArIGluZGV4ICsgJ1xcXFx9JywgcGFyYW0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIGZvcm1hdFN0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChwYXR0ZXJuVG9GaW5kLCAnZ2knKSwgcmVwbGFjZW1lbnRTdHJpbmcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFN0cmluZ1V0aWxpdHlTZXJ2aWNlKTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyV2l0aENvdW50cyBleHRlbmRzIElGaWx0ZXIge1xyXG5cdFx0dXBkYXRlT3B0aW9uQ291bnRzPFRJdGVtVHlwZT4oZGF0YTogVEl0ZW1UeXBlW10pOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW47XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vc3RyaW5nL3N0cmluZy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9maWx0ZXJzL2ZpbHRlci50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlcic7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2dlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9ICdzZWFyY2gnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElHZW5lcmljU2VhcmNoRmlsdGVyIGV4dGVuZHMgZmlsdGVycy5JRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmcgPSBmaWx0ZXJOYW1lO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgb2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzZWFyY2hPYmplY3Q8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUsIHNlYXJjaDogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KHZhbHVlcywgKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHsgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZGF0YVN0cmluZzogc3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcblxyXG5cdFx0XHRcdGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Quc2VydmljZU5hbWUsIHN0cmluZy5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksXHJcblx0XHRzdHJpbmdVdGlsaXR5OiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdC5tb2R1bGVOYW1lLCBzdHJpbmcubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgSlF1ZXJ5VXRpbGl0eSBpbXBsZW1lbnRzIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHRjb250ZW50QXJlYS5lbXB0eSgpO1xyXG5cdFx0XHRjb250ZW50QXJlYS5hcHBlbmQobmV3Q29udGVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBKUXVlcnlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbm90aWZpY2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcblx0XHRzZXROb3RpZmllcihub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZDtcclxuXHRcdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5vdGlmaWVyOiBuZXcgQmFzZU5vdGlmaWVyKCksXHJcblx0XHRcdHNldE5vdGlmaWVyOiAobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdFx0fSxcclxuXHRcdFx0JGdldDogKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQucHJvdmlkZXIoc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQmFzZU5vdGlmaWVyIGltcGxlbWVudHMgSU5vdGlmaWVyIHtcclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0d2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0XHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0XHR2aWV3RGF0YT86IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0XHQ6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJNb2Nrc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0XHRkaXJlY3RpdmU6IChkb206IHN0cmluZykgPT4gSURpcmVjdGl2ZVJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogYW5ndWxhci5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29udHJvbGxlcjogYW55ID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0XHRpZiAobG9jYWxzID09IG51bGwpIHtcclxuXHRcdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogPFRDb250cm9sbGVyVHlwZT4kY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXJlY3RpdmUoZG9tOiBzdHJpbmcpOiBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbXBpbGU6IGFueSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcblxyXG5cdFx0XHR2YXIgY29tcG9uZW50OiBhbnkgPSAkY29tcGlsZShkb20pKCRyb290U2NvcGUpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0XHRzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3Mvc2lub25cclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnk7XHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0XHRwcm9taXNlOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+O1xyXG5cdFx0ZGF0YTogVERhdGFUeXBlO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNlcnZpY2UpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNlcnZpY2UgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdHJldHVybiBzZXJ2aWNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCguLi5wYXJhbXM6IGFueVtdKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGNhbGxiYWNrLmFwcGx5KHRoaXMsIHBhcmFtcyksXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBuZy5JU2NvcGUpOiB2b2lkIHtcclxuXHRcdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0XHR2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0czogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT5bXSA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdFx0Ly8gVGhpcyB3YXkgaWYgYW55IGFkZGl0aW9uYWwgcmVxdWVzdHMgYXJlIGdlbmVyYXRlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSBjdXJyZW50IC8gbG9jYWwgbGlzdCBcclxuXHRcdFx0Ly8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuXHRcdFx0Xy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIChyZXF1ZXN0OiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBtb2NrOiBJTW9jayA9IG5ldyBNb2NrKCk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24nO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25IYW5kbGVyIHtcclxuXHRcdGlzQWN0aXZlPzogeygpOiBib29sZWFufSB8IGJvb2xlYW47XHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdFx0ZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCB7KCk6IHN0cmluZ307XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0KCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdFx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0bm90aWZ5QXNFcnJvcjogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uU2VydmljZSBpbXBsZW1lbnRzIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0XHRwcml2YXRlIHZhbGlkYXRpb25IYW5kbGVyczogeyBbaW5kZXg6IG51bWJlcl06IElWYWxpZGF0aW9uSGFuZGxlciB9ID0ge307XHJcblx0XHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblx0XHRub3RpZnlBc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb246IHNlcnZpY2VzLm5vdGlmaWNhdGlvbi5JTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRcdFx0Xy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gKF8uaXNGdW5jdGlvbihoYW5kbGVyLmlzQWN0aXZlKSAmJiAoPHsoKTogYm9vbGVhbn0+aGFuZGxlci5pc0FjdGl2ZSkoKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09PSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdHZhciBlcnJvcjogc3RyaW5nID0gXy5pc0Z1bmN0aW9uKGhhbmRsZXIuZXJyb3JNZXNzYWdlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdD8gKDx7KCk6IHN0cmluZ30+aGFuZGxlci5lcnJvck1lc3NhZ2UpKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IDxzdHJpbmc+aGFuZGxlci5lcnJvck1lc3NhZ2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMubm90aWZ5QXNFcnJvcikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi53YXJuaW5nKGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1tjdXJyZW50S2V5XSA9IGhhbmRsZXI7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSVZhbGlkYXRpb25TZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbc2VydmljZXMubm90aWZpY2F0aW9uLnNlcnZpY2VOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gdmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5KG5vdGlmaWNhdGlvbjogc2VydmljZXMubm90aWZpY2F0aW9uLklOb3RpZmljYXRpb25TZXJ2aWNlKTogSVZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFZhbGlkYXRpb25TZXJ2aWNlKG5vdGlmaWNhdGlvbik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbc2VydmljZXMubm90aWZpY2F0aW9uLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0b3BFdmVudFByb3BhZ2F0aW9uL3N0b3BFdmVudFByb3BhZ2F0aW9uLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRzdG9wRXZlbnRQcm9wb2dhdGlvbi5tb2R1bGVOYW1lLFxyXG5cdF0pO1xyXG59XHJcbiIsIi8vIHVzZXMgYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdpc0VtcHR5L2lzRW1wdHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RydW5jYXRlL3RydW5jYXRlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXJzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuZmlsdGVycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGlzRW1wdHkubW9kdWxlTmFtZSxcclxuXHRcdHRydW5jYXRlLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2FycmF5L2FycmF5LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlL2F1dG9zYXZlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdjb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUvZGF0ZS5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplL2ZpbGVTaXplLm1vZHVsZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZ2VuZXJpY1NlYXJjaEZpbHRlci9nZW5lcmljU2VhcmNoRmlsdGVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2pxdWVyeS9qcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbW9tZW50L21vbWVudC5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3N0cmluZy9zdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndGltZS90aW1lLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0YXJyYXkubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlLm1vZHVsZU5hbWUsXHJcblx0XHRhdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lLFxyXG5cdFx0Ym9vbGVhbi5tb2R1bGVOYW1lLFxyXG5cdFx0Y29udGVudFByb3ZpZGVyLm1vZHVsZU5hbWUsXHJcblx0XHRkYXRlLm1vZHVsZU5hbWUsXHJcblx0XHRmaWxlU2l6ZS5tb2R1bGVOYW1lLFxyXG5cdFx0Z2VuZXJpY1NlYXJjaEZpbHRlci5tb2R1bGVOYW1lLFxyXG5cdFx0anF1ZXJ5Lm1vZHVsZU5hbWUsXHJcblx0XHRtb21lbnRXcmFwcGVyLm1vZHVsZU5hbWUsXHJcblx0XHRub3RpZmljYXRpb24ubW9kdWxlTmFtZSxcclxuXHRcdG51bWJlci5tb2R1bGVOYW1lLFxyXG5cdFx0b2JqZWN0Lm1vZHVsZU5hbWUsXHJcblx0XHRvYnNlcnZhYmxlLm1vZHVsZU5hbWUsXHJcblx0XHRwYXJlbnRDaGlsZEJlaGF2aW9yLm1vZHVsZU5hbWUsXHJcblx0XHRwcm9taXNlLm1vZHVsZU5hbWUsXHJcblx0XHRzdHJpbmcubW9kdWxlTmFtZSxcclxuXHRcdHRpbWUubW9kdWxlTmFtZSxcclxuXHRcdHZhbGlkYXRpb24ubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdGJlaGF2aW9ycy5tb2R1bGVOYW1lLFxyXG5cdFx0ZmlsdGVycy5tb2R1bGVOYW1lLFxyXG5cdFx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=