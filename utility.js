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
                    function ValidationService() {
                        this.validationHandlers = {};
                        this.nextKey = 0;
                    }
                    ValidationService.prototype.validate = function () {
                        var isValid = true;
                        _.each(this.validationHandlers, function (handler) {
                            var isActive = (_.isFunction(handler.isActive) && handler.isActive())
                                || handler.isActive == null
                                || handler.isActive === true;
                            if (isActive && !handler.validate()) {
                                isValid = false;
                                handler.showErrors();
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
                function validationServiceFactory() {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new ValidationService();
                        }
                    };
                }
                validation.validationServiceFactory = validationServiceFactory;
                angular.module(validation.moduleName, [])
                    .factory(validation.factoryName, validationServiceFactory);
            })(validation = services.validation || (services.validation = {}));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9zdG9wRXZlbnRQcm9wYWdhdGlvbi9zdG9wRXZlbnRQcm9wYWdhdGlvbi50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvYXJyYXkvYXJyYXkuc2VydmljZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMudHMiLCJzZXJ2aWNlcy9icmVha3BvaW50cy92aXNpYmxlQnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUudHMiLCJ0eXBlcy9jb21wYXJlUmVzdWx0LnRzIiwic2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJzZXJ2aWNlcy9jb250ZW50UHJvdmlkZXIvY29udGVudFByb3ZpZGVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMiLCJmaWx0ZXJzL2ZpbHRlci50cyIsInNlcnZpY2VzL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzIiwic2VydmljZXMvcGFyZW50Q2hpbGRCZWhhdmlvci9wYXJlbnRDaGlsZEJlaGF2aW9yLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9wcm9taXNlL3Byb21pc2Uuc2VydmljZS50cyIsInNlcnZpY2VzL3Rlc3QvYW5ndWxhckZpeHR1cmUudHMiLCJzZXJ2aWNlcy90ZXN0L21vY2sudHMiLCJzZXJ2aWNlcy92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZS50cyIsImZpbHRlcnMvaXNFbXB0eS9pc0VtcHR5LnRzIiwiZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS50cyIsImJlaGF2aW9ycy9iZWhhdmlvcnMubW9kdWxlLnRzIiwiZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50cyIsInNlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cyIsInV0aWxpdGllcy50cyJdLCJuYW1lcyI6WyJybCIsInJsLnV0aWxpdGllcyIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbiIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24uc3RvcEV2ZW50UHJvcGFnYXRpb24ubGluayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zYXZpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLmNvbXBsZXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS5zdWNjZXNzZnVsIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZS50cmlnZ2VyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLm51bGxGb3JtIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5udWxsRm9ybS4kc2V0UHJpc3RpbmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5hdXRvc2F2ZVNlcnZpY2VGYWN0b3J5LmdldEluc3RhbmNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LmZpbmRJbmRleE9mIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5yZW1vdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlcGxhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnN1bSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkudG9EaWN0aW9uYXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkudG9Cb29sIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLlZpc2libGVCcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5WaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlLmlzVmlzaWJsZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLnJlc2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5nZXRCcmVha3BvaW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLkJyZWFrcG9pbnRTZXJ2aWNlLmlzQnJlYWtwb2ludCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvU2Vjb25kcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvTWludXRlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5Lm1pbGxpc2Vjb25kc1RvSG91cnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0RheXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyLm1vbWVudFdyYXBwZXIiLCJybC51dGlsaXRpZXMudHlwZXMiLCJybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdCIsInJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQiLCJybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdC5nZXRDb21wYXJlUmVzdWx0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuaXNMZWFwWWVhciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldEZ1bGxTdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXREYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuc3VidHJhY3REYXRlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LnN1YnRyYWN0RGF0ZUluRGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmNvbXBhcmVEYXRlcyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmRhdGVJblJhbmdlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RGF0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldE5vdyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2Uuc2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5nZXRDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5jb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5TaWduIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmRpc3BsYXkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuaXNOdWxsT3JFbXB0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3QuT2JqZWN0VXRpbGl0eS5pc051bGxPcldoaXRlc3BhY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuYXJlRXF1YWwiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkudG9TdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkudmFsdWVPckRlZmF1bHQiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLnRvTnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb250YWlucyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2Uuc3Vic3RpdHV0ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UucmVwbGFjZUFsbCIsInJsLnV0aWxpdGllcy5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlci5maWx0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLnNlYXJjaE9iamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLmdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeS5KUXVlcnlVdGlsaXR5LnJlcGxhY2VDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnRyaWdnZXJDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuZ2V0QWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5yZWdpc3RlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5pc1Byb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5pbmplY3QiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5tb2NrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuY29udHJvbGxlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmRpcmVjdGl2ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5zZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5wcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5wcm9taXNlV2l0aENhbGxiYWNrIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jay5mbHVzaCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UucmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi52YWxpZGF0aW9uU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi52YWxpZGF0aW9uU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuZmlsdGVycyIsInJsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHkiLCJybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5LmlzRW1wdHkiLCJybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlLnRydW5jYXRlIl0sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFFdkIsSUFBTyxFQUFFLENBMkJSO0FBM0JELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxTQUFTQSxDQTJCbEJBO0lBM0JTQSxXQUFBQSxTQUFTQTtRQUFDQyxJQUFBQSxTQUFTQSxDQTJCNUJBO1FBM0JtQkEsV0FBQUEsU0FBU0E7WUFBQ0MsSUFBQUEsb0JBQW9CQSxDQTJCakRBO1lBM0I2QkEsV0FBQUEsb0JBQW9CQSxFQUFDQSxDQUFDQTtnQkFDbkRDLFlBQVlBLENBQUNBO2dCQUVGQSwrQkFBVUEsR0FBV0EsNkNBQTZDQSxDQUFDQTtnQkFDbkVBLGtDQUFhQSxHQUFXQSx3QkFBd0JBLENBQUNBO2dCQU01REE7b0JBQ0NDLFlBQVlBLENBQUNBO29CQUNiQSxNQUFNQSxDQUFDQTt3QkFDTkEsUUFBUUEsRUFBRUEsR0FBR0E7d0JBQ2JBLElBQUlBLFlBQUNBLEtBQWdCQSxFQUNsQkEsT0FBNEJBLEVBQzVCQSxLQUFpQ0E7NEJBQ25DQyxP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LEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDckRBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDbkRBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDcERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDekRBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDdkRBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTs0QkFDeERBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLEVBQUVBLGNBQWdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQTt5QkFDeERBLENBQUNBO29CQUNIQSxDQUFDQTtvQkFLT0QsZ0NBQVVBLEdBQWxCQSxVQUFtQkEsSUFBYUE7d0JBQy9CRSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtvQkFDL0NBLENBQUNBO29CQUVERixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBYUE7d0JBQzFCRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFDL0JBLENBQUNBO29CQUVESCw2QkFBT0EsR0FBUEEsVUFBUUEsS0FBYUEsRUFBRUEsSUFBYUE7d0JBQ25DSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDckNBLENBQUNBO29CQUVESixtQ0FBYUEsR0FBYkEsVUFBY0EsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQzFFSyxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxJQUFJQSxPQUFPQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFFbERBLElBQUlBLE1BQU1BLEdBQW9CQSxFQUFFQSxDQUFDQTt3QkFDakNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO3dCQUN0REEsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7d0JBQy9EQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTt3QkFFMURBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUNyQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ25CQSxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTt3QkFDNUVBLENBQUNBO3dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkJBLE1BQU1BLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBOzRCQUNsQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0E7d0JBQ3JCQSxDQUFDQTt3QkFFREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ2ZBLENBQUNBO29CQUVETCx3Q0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxVQUFtQkE7d0JBQy9FTSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO3dCQUNiQSxDQUFDQTt3QkFFREEsSUFBSUEsU0FBU0EsR0FBU0EsSUFBSUEs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QUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTs0QkFDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBOzRCQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2xEQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ1BBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBOzRCQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ2hDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtnQ0FDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO2dDQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2xEQSxDQUFDQTs0QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0NBQ1BBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO2dDQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0NBQ2hDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtvQ0FDakJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO29DQUNwQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFB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dGVudCI6WyIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbic7XHJcblx0ZXhwb3J0IHZhciBkaXJlY3RpdmVOYW1lOiBzdHJpbmcgPSAncmxTdG9wRXZlbnRQcm9wYWdhdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVN0b3BFdmVudFByb3BhZ2F0aW9uQXR0cnMgZXh0ZW5kcyBuZy5JQXR0cmlidXRlcyB7XHJcblx0XHRybFN0b3BFdmVudFByb3BhZ2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzdG9wRXZlbnRQcm9wYWdhdGlvbigpOiBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRcdGxpbmsoc2NvcGU6IG5nLklTY29wZVxyXG5cdFx0XHRcdCwgZWxlbWVudDogbmcuSUF1Z21lbnRlZEpRdWVyeVxyXG5cdFx0XHRcdCwgYXR0cnM6IElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzKTogdm9pZCB7XHJcblx0XHRcdFx0ZWxlbWVudC5vbihhdHRycy5ybFN0b3BFdmVudFByb3BhZ2F0aW9uLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5kaXJlY3RpdmUoZGlyZWN0aXZlTmFtZSwgc3RvcEV2ZW50UHJvcGFnYXRpb24pO1xyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2F1dG9zYXZlQWN0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIHtcclxuXHRcdHRyaWdnZXIocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IHZvaWQ7XHJcblx0XHRzYXZpbmc6IGJvb2xlYW47XHJcblx0XHRjb21wbGV0ZTogYm9vbGVhbjtcclxuXHRcdHN1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBdXRvc2F2ZUFjdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIHtcclxuXHRcdHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHRpbWVvdXQnXTtcclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSkge31cclxuXHJcblx0XHRwcml2YXRlIGNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uOiBudW1iZXIgPSAxMDAwO1xyXG5cclxuXHRcdHByaXZhdGUgX3NhdmluZzogYm9vbGVhbjtcclxuXHRcdHByaXZhdGUgX2NvbXBsZXRlOiBib29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBfc3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHJcblx0XHRnZXQgc2F2aW5nKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fc2F2aW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldCBjb21wbGV0ZSgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBsZXRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldCBzdWNjZXNzZnVsKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fc3VjY2Vzc2Z1bDtcclxuXHRcdH1cclxuXHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiBhbnkge1xyXG5cdFx0XHR0aGlzLl9zYXZpbmcgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZS50aGVuKHRoaXMuYXV0b3NhdmVTdWNjZXNzZnVsKVxyXG5cdFx0XHRcdFx0XHQuY2F0Y2godGhpcy5hdXRvc2F2ZUZhaWxlZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBhdXRvc2F2ZVN1Y2Nlc3NmdWw6IHsgKGRhdGE6IGFueSk6IGFueSB9ID0gKGRhdGE6IGFueSk6IGFueSA9PiB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJlc29sdmVBdXRvc2F2ZShkYXRhLCB0cnVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIGF1dG9zYXZlRmFpbGVkOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgcmVzb2x2ZUF1dG9zYXZlOiB7IChkYXRhOiBhbnksIHN1Y2Nlc3M6IGJvb2xlYW4pOiBhbnkgfSA9IChkYXRhOiBhbnksIHN1Y2Nlc3M6IGJvb2xlYW4pOiBhbnkgPT4ge1xyXG5cdFx0XHR0aGlzLl9zYXZpbmcgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5fY29tcGxldGUgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLl9zdWNjZXNzZnVsID0gc3VjY2VzcztcclxuXHJcblx0XHRcdHRoaXMuJHRpbWVvdXQoKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMuX2NvbXBsZXRlID0gZmFsc2U7XHJcblx0XHRcdH0sIHRoaXMuY29tcGxldGVNZXNzYWdlRHVyYXRpb24pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBBdXRvc2F2ZUFjdGlvblNlcnZpY2UpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9hdXRvc2F2ZUFjdGlvbi9hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19hdXRvc2F2ZUFjdGlvbiA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbjtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlJztcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnYXV0b3NhdmVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdGF1dG9zYXZlKC4uLmRhdGE6IGFueVtdKTogYm9vbGVhbjtcclxuXHRcdGNvbnRlbnRGb3JtOiBuZy5JRm9ybUNvbnRyb2xsZXI7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBdXRvc2F2ZVNlcnZpY2UgaW1wbGVtZW50cyBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgaGFzVmFsaWRhdG9yOiBib29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0b3NhdmVTZXJ2aWNlOiBfX2F1dG9zYXZlQWN0aW9uLklBdXRvc2F2ZUFjdGlvblNlcnZpY2VcclxuXHRcdFx0XHQsIHByaXZhdGUgc2F2ZTogeyguLi5kYXRhOiBhbnlbXSk6IG5nLklQcm9taXNlPHZvaWQ+fVxyXG5cdFx0XHRcdCwgcHVibGljIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyXHJcblx0XHRcdFx0LCBwcml2YXRlIHZhbGlkYXRlPzogeygpOiBib29sZWFufSkge1xyXG5cdFx0XHR0aGlzLmhhc1ZhbGlkYXRvciA9IHZhbGlkYXRlICE9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybSA9PSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5jb250ZW50Rm9ybSA9IHRoaXMubnVsbEZvcm0oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGF1dG9zYXZlOiB7ICguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW4gfSA9ICguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50Rm9ybS4kcHJpc3RpbmUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuaGFzVmFsaWRhdG9yKSB7XHJcblx0XHRcdFx0dmFsaWQgPSB0aGlzLnZhbGlkYXRlKCk7XHJcblx0XHRcdFx0aWYgKHZhbGlkID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh2YWxpZCkge1xyXG5cdFx0XHRcdHRoaXMuYXV0b3NhdmVTZXJ2aWNlLnRyaWdnZXIodGhpcy5zYXZlKC4uLmRhdGEpLnRoZW4oKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRlbnRGb3JtLiRzZXRQcmlzdGluZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG51bGxGb3JtKCk6IG5nLklGb3JtQ29udHJvbGxlciB7XHJcblx0XHRcdHJldHVybiA8YW55PntcclxuXHRcdFx0XHQkcHJpc3RpbmU6IGZhbHNlLFxyXG5cdFx0XHRcdCRzZXRQcmlzdGluZSgpOiB2b2lkIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZShzYXZlOiB7KCk6IG5nLklQcm9taXNlPHZvaWQ+fSwgY29udGVudEZvcm0/OiBuZy5JRm9ybUNvbnRyb2xsZXIsIHZhbGlkYXRlPzogeygpOiBib29sZWFufSk6IElBdXRvc2F2ZVNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbX19hdXRvc2F2ZUFjdGlvbi5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gYXV0b3NhdmVTZXJ2aWNlRmFjdG9yeShhdXRvc2F2ZVNlcnZpY2U6IF9fYXV0b3NhdmVBY3Rpb24uSUF1dG9zYXZlQWN0aW9uU2VydmljZSk6IElBdXRvc2F2ZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKHNhdmU6IHsgKCk6IG5nLklQcm9taXNlPHZvaWQ+IH0sIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyLCB2YWxpZGF0ZT86IHsgKCk6IGJvb2xlYW4gfSk6IElBdXRvc2F2ZVNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQXV0b3NhdmVTZXJ2aWNlKGF1dG9zYXZlU2VydmljZSwgc2F2ZSwgY29udGVudEZvcm0sIHZhbGlkYXRlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX2F1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIGF1dG9zYXZlU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhcnJheVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBcnJheVV0aWxpdHkge1xyXG5cdFx0ZmluZEluZGV4T2Y8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHByZWRpY2F0ZTogeyAoaXRlbTogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogbnVtYmVyO1xyXG5cdFx0cmVtb3ZlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBpdGVtOiB7IChvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IFREYXRhVHlwZTtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlKTogVERhdGFUeXBlO1xyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkO1xyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm06IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyO1xyXG5cdFx0c3VtKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcjtcclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nfSk6IFREYXRhVHlwZVtdO1xyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyhpdGVtOiBURGF0YVR5cGUpOiBudW1iZXJ9KTogVERhdGFUeXBlW107XHJcblx0fVxyXG5cclxuXHRjbGFzcyBBcnJheVV0aWxpdHkgaW1wbGVtZW50cyBJQXJyYXlVdGlsaXR5IHtcclxuXHRcdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciB0YXJnZXRJbmRleDogbnVtYmVyO1xyXG5cclxuXHRcdFx0Xy5lYWNoKGFycmF5LCAoaXRlbTogVERhdGFUeXBlLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0aWYgKHByZWRpY2F0ZShpdGVtKSkge1xyXG5cdFx0XHRcdFx0dGFyZ2V0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRhcmdldEluZGV4ICE9IG51bGwgPyB0YXJnZXRJbmRleCA6IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogVERhdGFUeXBlIHwgeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGUge1xyXG5cdFx0XHR2YXIgaW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24oaXRlbSkpIHtcclxuXHRcdFx0XHRpbmRleCA9IHRoaXMuZmluZEluZGV4T2YoYXJyYXksIDx7KG9iajogVERhdGFUeXBlKTogYm9vbGVhbn0+aXRlbSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5kZXggPSBfLmluZGV4T2YoYXJyYXksIDxURGF0YVR5cGU+aXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSlbMF07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBvbGRJdGVtOiBURGF0YVR5cGUsIG5ld0l0ZW06IFREYXRhVHlwZSk6IHZvaWQge1xyXG5cdFx0XHR2YXIgaW5kZXg6IG51bWJlciA9IF8uaW5kZXhPZihhcnJheSwgb2xkSXRlbSk7XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdGFycmF5LnNwbGljZShpbmRleCwgMSwgbmV3SXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRzdW08VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIHRyYW5zZm9ybT86IHsgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciB9KTogbnVtYmVyIHtcclxuXHRcdFx0dmFyIGxpc3Q6IG51bWJlcltdO1xyXG5cclxuXHRcdFx0aWYgKHRyYW5zZm9ybSAhPSBudWxsKSB7XHJcblx0XHRcdFx0bGlzdCA9IF8ubWFwKGFycmF5LCAoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyID0+IHsgcmV0dXJuIHRyYW5zZm9ybShpdGVtKTsgfSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGlzdCA9IDxhbnlbXT5hcnJheTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIF8ucmVkdWNlKGxpc3QsIChzdW06IG51bWJlciwgbnVtOiBudW1iZXIpOiBudW1iZXIgPT4geyByZXR1cm4gc3VtICsgbnVtOyB9LCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7IChpdGVtOiBURGF0YVR5cGUpOiBzdHJpbmcgfCBudW1iZXIgfSk6IFREYXRhVHlwZVtdIHtcclxuXHRcdFx0cmV0dXJuIF8ucmVkdWNlKGFycmF5LCAoZGljdGlvbmFyeTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSk6IFREYXRhVHlwZVtdID0+IHtcclxuXHRcdFx0XHRkaWN0aW9uYXJ5Wzxhbnk+a2V5U2VsZWN0b3IoaXRlbSldID0gaXRlbTtcclxuXHRcdFx0XHRyZXR1cm4gZGljdGlvbmFyeTtcclxuXHRcdFx0fSwgW10pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXJyYXlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYm9vbGVhblV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiAhIW9iamVjdDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbGc6IHN0cmluZyA9ICdsZyc7XHJcblx0ZXhwb3J0IHZhciBtZDogc3RyaW5nID0gJ21kJztcclxuXHRleHBvcnQgdmFyIHNtOiBzdHJpbmcgPSAnc20nO1xyXG5cdGV4cG9ydCB2YXIgeHM6IHN0cmluZyA9ICd4cyc7XHJcbn1cclxuIiwiLypcclxuICogSW1wbGVtZW50YXRpb24gYWxzbyByZXF1aXJlcyB0aGUgZm9sbG93aW5nIGVsZW1lbnRzIHRvIGJlIGluc2VydGVkIG9uIHRoZSBwYWdlOlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UteHMgdmlzaWJsZS14c1wiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2Utc20gdmlzaWJsZS1zbVwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbWQgdmlzaWJsZS1tZFwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbGcgdmlzaWJsZS1sZ1wiPjwvZGl2PlxyXG4gKi9cclxuXHJcbiBtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWU6IHN0cmluZyA9ICd2aXNpYmxlQnJlYWtwb2ludCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpc2libGVCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRpc1Zpc2libGUoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UgaW1wbGVtZW50cyBJVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlIHtcclxuXHRcdGlzVmlzaWJsZShicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0Ly8ganF1ZXJ5IGdldHMgdGhlIGJyZWFrcG9pbnQgdHJpZ2dlciBkaXJlY3RpdmVzIGxpc3RlZCBhYm92ZSBvbiBsaW5lIDNcclxuXHRcdFx0cmV0dXJuICQoJy5kZXZpY2UtJyArIGJyZWFrcG9pbnQpLmlzKCc6dmlzaWJsZScpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ29ic2VydmFibGVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRcdGV2ZW50Pzogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0XHQoLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdCgpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogSUFjdGlvbjx2b2lkPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdFx0ZmlyZShldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSB3YXRjaGVyczogSVdhdGNoZXI8YW55PltdID0gW107XHJcblx0XHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICghXy5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG5cdFx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfKHRoaXMud2F0Y2hlcnMpLmZpbHRlcigod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm1hcCgod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xyXG5cdFx0XHR9KS52YWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGVTZXJ2aWNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnd2luZG93Q29udHJvbCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdpbmRvd1NlcnZpY2Uge1xyXG5cdFx0cmVzaXplKGNhbGxiYWNrOiB7IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiBhbnkgfSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBXaW5kb3dTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2luZG93Q29udHJvbDogSlF1ZXJ5ID0gJCh3aW5kb3cpO1xyXG5cclxuXHRcdHJlc2l6ZShjYWxsYmFjazogeyAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogYW55IH0pOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53aW5kb3dDb250cm9sLnJlc2l6ZShjYWxsYmFjayk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBXaW5kb3dTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYnJlYWtwb2ludHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Zpc2libGVCcmVha3BvaW50cy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX193aW5kb3cgPSBybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93O1xyXG5cdGltcG9ydCBfX29ic2VydmFibGUgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZTtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYnJlYWtwb2ludHMnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRjdXJyZW50QnJlYWtwb2ludDogc3RyaW5nO1xyXG5cdFx0aXNCcmVha3BvaW50KGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZH0pOiBfX29ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBCcmVha3BvaW50U2VydmljZSBpbXBsZW1lbnRzIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsICdyZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcycsIF9fd2luZG93LnNlcnZpY2VOYW1lLCBfX29ic2VydmFibGUuZmFjdG9yeU5hbWVdXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIHZpc2libGVCcmVha3BvaW50czogSVZpc2libGVCcmVha3BvaW50U2VydmljZVxyXG5cdFx0XHRcdCwgcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHM6IG51bWJlclxyXG5cdFx0XHRcdCwgd2luZG93U2VydmljZTogX193aW5kb3cuSVdpbmRvd1NlcnZpY2VcclxuXHRcdFx0XHQsIG9ic2VydmFibGVGYWN0b3J5OiBfX29ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gdGhpcy5nZXRCcmVha3BvaW50KCk7XHJcblxyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdFx0dmFyIGVmZmljaWVudFJlc2l6ZTogeygpOiB2b2lkfSA9IF8uZGVib3VuY2UodGhpcy51cGRhdGVCcmVha3BvaW50LCByZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcywge1xyXG5cdFx0XHRcdGxlYWRpbmc6IHRydWUsXHJcblx0XHRcdFx0dHJhaWxpbmc6IHRydWUsXHJcblx0XHRcdFx0bWF4V2FpdDogcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHMsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR3aW5kb3dTZXJ2aWNlLnJlc2l6ZShlZmZpY2llbnRSZXNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogX19vYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZTtcclxuXHRcdGN1cnJlbnRCcmVha3BvaW50OiBzdHJpbmc7XHJcblxyXG5cdFx0cHJpdmF0ZSBnZXRCcmVha3BvaW50KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLnZpc2libGVCcmVha3BvaW50cy5pc1Zpc2libGUobGcpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGxnO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudmlzaWJsZUJyZWFrcG9pbnRzLmlzVmlzaWJsZShtZCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbWQ7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy52aXNpYmxlQnJlYWtwb2ludHMuaXNWaXNpYmxlKHNtKSkge1xyXG5cdFx0XHRcdHJldHVybiBzbTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4geHM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpc0JyZWFrcG9pbnQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnRCcmVha3BvaW50ID09PSBicmVha3BvaW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyAoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZCB9KTogX19vYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vYnNlcnZhYmxlLnJlZ2lzdGVyKGFjdGlvbiwgJ3dpbmRvdy5icmVha3BvaW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdXBkYXRlQnJlYWtwb2ludDogeygpOiB2b2lkfSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG5ld0JyZWFrUG9pbnQ6IHN0cmluZyA9IHRoaXMuZ2V0QnJlYWtwb2ludCgpO1xyXG5cclxuXHRcdFx0aWYgKG5ld0JyZWFrUG9pbnQgIT09IHRoaXMuY3VycmVudEJyZWFrcG9pbnQpIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gbmV3QnJlYWtQb2ludDtcclxuXHRcdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnd2luZG93LmJyZWFrcG9pbnRDaGFuZ2VkJywgdGhpcy5jdXJyZW50QnJlYWtwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX3dpbmRvdy5tb2R1bGVOYW1lLCBfX29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuY29uc3RhbnQoJ3Jlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzJywgNTAwKVxyXG5cdFx0LnNlcnZpY2UodmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsIFZpc2libGVCcmVha3BvaW50U2VydmljZSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCcmVha3BvaW50U2VydmljZSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndGltZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRtaWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFRpbWVVdGlsaXR5IHtcclxuXHRcdG1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kcykgLyA2MCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5taWxsaXNlY29uZHNUb0hvdXJzKG1pbGxpc2Vjb25kcykgLyAyNCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBUaW1lVXRpbGl0eSk7XHJcbn1cclxuIiwiXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXIge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbW9tZW50V3JhcHBlcic7XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBtb21lbnRXcmFwcGVyKCk6IHZvaWQge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdC8vIFVzaW5nIGBhbnlgIGluc3RlYWQgb2YgTW9tZW50U3RhdGljIGJlY2F1c2VcclxuXHRcdC8vICBjcmVhdGVGcm9tSW5wdXRGYWxsYmFjayBkb2Vzbid0IGFwcGVhciB0byBiZVxyXG5cdFx0Ly8gIGRlZmluZWQgaW4gTW9tZW50U3RhdGljLi4uIDotKFxyXG5cdFx0dmFyIG1vbWVudFdyYXBwZXI6IGFueSA9IG1vbWVudDsgLy8gbW9tZW50IG11c3QgYWxyZWFkeSBiZSBsb2FkZWRcclxuXHJcblx0XHQvLyBTZXQgZGVmYXVsdCBtZXRob2QgZm9yIGhhbmRsaW5nIG5vbi1JU08gZGF0ZSBjb252ZXJzaW9ucy5cclxuXHRcdC8vIFNlZSA0LzI4IGNvbW1lbnQgaW4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDdcclxuXHRcdC8vIFRoaXMgYWxzbyBwcmV2ZW50cyB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxyXG5cdFx0bW9tZW50V3JhcHBlci5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IChjb25maWc6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gbW9tZW50V3JhcHBlcjtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdC5mYWN0b3J5KHNlcnZpY2VOYW1lLCBtb21lbnRXcmFwcGVyKTtcclxuXHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdCc7XHJcblxyXG5cdGV4cG9ydCBlbnVtIENvbXBhcmVSZXN1bHQge1xyXG5cdFx0Z3JlYXRlciA9IDEsXHJcblx0XHRlcXVhbCA9IDAsXHJcblx0XHRsZXNzID0gLTEsXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gZ2V0Q29tcGFyZVJlc3VsdChudW06IG51bWJlcik6IENvbXBhcmVSZXN1bHQge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0aWYgKG51bSA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5lcXVhbDtcclxuXHRcdH0gZWxzZSBpZiAobnVtID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gQ29tcGFyZVJlc3VsdC5ncmVhdGVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQubGVzcztcclxuXHRcdH1cclxuXHR9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90aW1lL3RpbWUuc2VydmljZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb21lbnQvbW9tZW50Lm1vZHVsZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBlcy9jb21wYXJlUmVzdWx0LnRzXCIgLz5cclxuXHJcbi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgY29tcGFyZVJlc3VsdCA9IHJsLnV0aWxpdGllcy50eXBlcy5jb21wYXJlUmVzdWx0O1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb250aCB7XHJcblx0XHRuYW1lOiBzdHJpbmc7XHJcblx0XHRkYXlzKHllYXI/OiBudW1iZXIpOiBudW1iZXI7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEYXRlVmFsdWUge1xyXG5cdFx0eWVhcnM6IG51bWJlcjtcclxuXHRcdG1vbnRoczogbnVtYmVyO1xyXG5cdFx0ZGF5czogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZVV0aWxpdHkge1xyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nO1xyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZTtcclxuXHRcdHN1YnRyYWN0RGF0ZUluRGF5cyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogbnVtYmVyO1xyXG5cdFx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdDtcclxuXHRcdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbjtcclxuXHRcdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGU7XHJcblx0XHRnZXROb3coKTogRGF0ZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBEYXRlVXRpbGl0eSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbbW9tZW50V3JhcHBlci5zZXJ2aWNlTmFtZSwgdGltZS5zZXJ2aWNlTmFtZV07XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG1vbWVudDogbW9tZW50Lk1vbWVudFN0YXRpYywgcHJpdmF0ZSB0aW1lOiB0aW1lLklUaW1lVXRpbGl0eSkge1xyXG5cdFx0XHR0aGlzLm1vbnRoID0gW1xyXG5cdFx0XHRcdHsgbmFtZTogJ0phbnVhcnknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRmVicnVhcnknLCBkYXlzOiAoeWVhcjogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHRoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjg7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdNYXJjaCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBcHJpbCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdNYXknLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVuZScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdKdWx5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0F1Z3VzdCcsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdTZXB0ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnT2N0b2JlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdOb3ZlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzA7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdEZWNlbWJlcicsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XTtcclxuXHRcdH1cclxuXHJcblx0XHRtb250aDogSU1vbnRoW107XHJcblx0XHRwcml2YXRlIGJhc2VGb3JtYXQ6IHN0cmluZyA9ICdNTS1ERC1ZWVlZJztcclxuXHJcblx0XHRwcml2YXRlIGlzTGVhcFllYXIoeWVhcj86IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoeWVhciwgMSwgMjkpLmdldE1vbnRoKCkgPT09IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RnVsbFN0cmluZyhtb250aDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLm5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF5cyhtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW9udGhbbW9udGhdLmRheXMoeWVhcik7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VidHJhY3REYXRlcyhzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogSURhdGVWYWx1ZSB7XHJcblx0XHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdFx0dmFyIHJlc3VsdDogSURhdGVWYWx1ZSA9IDxhbnk+e307XHJcblx0XHRcdHJlc3VsdC5kYXlzID0gZW5kRGF0ZS5nZXREYXRlKCkgLSBzdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG5cdFx0XHRyZXN1bHQueWVhcnMgPSBlbmREYXRlLmdldEZ1bGxZZWFyKCkgLSBzdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHRcdFx0cmVzdWx0Lm1vbnRocyA9IGVuZERhdGUuZ2V0TW9udGgoKSAtIHN0YXJ0RGF0ZS5nZXRNb250aCgpO1xyXG5cclxuXHRcdFx0aWYgKHJlc3VsdC5kYXlzIDwgMCkge1xyXG5cdFx0XHRcdHJlc3VsdC5tb250aHMgLT0gMTtcclxuXHRcdFx0XHRyZXN1bHQuZGF5cyArPSB0aGlzLmdldERheXMoc3RhcnREYXRlLmdldE1vbnRoKCksIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHJlc3VsdC5tb250aHMgPCAwKSB7XHJcblx0XHRcdFx0cmVzdWx0LnllYXJzIC09IDE7XHJcblx0XHRcdFx0cmVzdWx0Lm1vbnRocyArPSAxMjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRcdGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBzdGFydERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoc3RhcnQsIGRhdGVGb3JtYXQpO1xyXG5cdFx0XHR2YXIgZW5kRGF0ZTogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShlbmQsIGRhdGVGb3JtYXQpO1xyXG5cclxuXHRcdFx0dmFyIG1pbGxpc2Vjb25kczogbnVtYmVyID0gZW5kRGF0ZS5nZXRUaW1lKCkgLSBzdGFydERhdGUuZ2V0VGltZSgpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMudGltZS5taWxsaXNlY29uZHNUb0RheXMobWlsbGlzZWNvbmRzKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb21wYXJlRGF0ZXMoZGF0ZTE6IHN0cmluZyB8IERhdGUsIGRhdGUyOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0IHtcclxuXHRcdFx0Ly8gc3VidHJhY3REYXRlSW5EYXlzIHN1YnRyYWN0cyB0aGUgZmlzdCBmcm9tIHRoZSBzZWNvbmQsIGFzc3VtaW5nIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcclxuXHRcdFx0dmFyIGRpZmZlcmVuY2U6IG51bWJlciA9IHRoaXMuc3VidHJhY3REYXRlSW5EYXlzKGRhdGUyLCBkYXRlMSwgZGF0ZUZvcm1hdCk7XHJcblx0XHRcdHJldHVybiBjb21wYXJlUmVzdWx0LmdldENvbXBhcmVSZXN1bHQoZGlmZmVyZW5jZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0ZUluUmFuZ2UoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VTdGFydDogc3RyaW5nIHwgRGF0ZSwgcmFuZ2VFbmQ6IHN0cmluZyB8IERhdGUpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMuY29tcGFyZURhdGVzKGRhdGUsIHJhbmdlU3RhcnQpID09PSBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQubGVzcykge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZUVuZCkgPT09IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdC5ncmVhdGVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF0ZShkYXRlOiBzdHJpbmcgfCBEYXRlLCBkYXRlRm9ybWF0Pzogc3RyaW5nKTogRGF0ZSB7XHJcblx0XHRcdHZhciBmb3JtYXQ6IHN0cmluZyA9IGRhdGVGb3JtYXQgIT0gbnVsbCA/IGRhdGVGb3JtYXQgOiB0aGlzLmJhc2VGb3JtYXQ7XHJcblxyXG5cdFx0XHRpZiAoXy5pc0RhdGUoZGF0ZSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gPERhdGU+ZGF0ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5tb21lbnQoPHN0cmluZz5kYXRlLCBmb3JtYXQpLnRvRGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Tm93KCk6IERhdGUge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSB7XHJcblx0ZXhwb3J0IHZhciBkYXRlVGltZUZvcm1hdFNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVRpbWVGb3JtYXRTdHJpbmdzJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZUZvcm1hdFN0cmluZ3Mge1xyXG5cdFx0ZGF0ZVRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHRcdGRhdGVGb3JtYXQ6IHN0cmluZztcclxuXHRcdHRpbWVGb3JtYXQ6IHN0cmluZztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCB2YXIgZGVmYXVsdEZvcm1hdHM6IElEYXRlRm9ybWF0U3RyaW5ncyA9IHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiAnTS9EL1lZWVkgaDptbSBBJyxcclxuXHRcdGRhdGVGb3JtYXQ6ICdNL0QvWVlZWScsXHJcblx0XHR0aW1lRm9ybWF0OiAnaDptbUEnLFxyXG5cdH07XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdkYXRlVGltZUZvcm1hdFN0cmluZ3MudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3RpbWUvdGltZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9tb21lbnQvbW9tZW50Lm1vZHVsZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZSB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUnO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdkYXRlVXRpbGl0eSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFttb21lbnRXcmFwcGVyLm1vZHVsZU5hbWUsIHRpbWUubW9kdWxlTmFtZV0pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgRGF0ZVV0aWxpdHkpXHJcblx0XHQudmFsdWUoZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZSwgZGVmYXVsdEZvcm1hdHMpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXInO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdjb250ZW50UHJvdmlkZXJGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRzZXRDb250ZW50KGNvbnRlbnQ6IEpRdWVyeSk6IHZvaWQ7XHJcblx0XHRzZXRUcmFuc2NsdWRlQ29udGVudCh0cmFuc2NsdWRlRnVuY3Rpb246IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbik6IHZvaWQ7XHJcblx0XHRnZXRDb250ZW50KHNlbGVjdG9yPzogc3RyaW5nKTogSlF1ZXJ5O1xyXG5cdFx0cmVnaXN0ZXIoYWN0aW9uOiB7KG5ld1RleHQ6IEpRdWVyeSk6IHZvaWR9LCBzZWxlY3Rvcj86IHN0cmluZyk6IG9ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIENvbnRlbnRQcm92aWRlclNlcnZpY2UgaW1wbGVtZW50cyBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRjb25zdHJ1Y3RvcihvYnNlcnZhYmxlRmFjdG9yeTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KSB7XHJcblx0XHRcdHRoaXMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGVGYWN0b3J5LmdldEluc3RhbmNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBvYnNlcnZhYmxlOiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZTtcclxuXHRcdHByaXZhdGUgY29udGVudDogSlF1ZXJ5O1xyXG5cclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZCB7XHJcblx0XHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHRcdHRoaXMub2JzZXJ2YWJsZS5maXJlKCdjb250ZW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50OiB7KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZH0gPSAodHJhbnNjbHVkZUZ1bmN0aW9uOiBuZy5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZCA9PiB7XHJcblx0XHRcdGlmIChfLmlzRnVuY3Rpb24odHJhbnNjbHVkZUZ1bmN0aW9uKSkge1xyXG5cdFx0XHRcdHRyYW5zY2x1ZGVGdW5jdGlvbigoY2xvbmU6IEpRdWVyeSk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRDb250ZW50KGNsb25lKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldENvbnRlbnQobnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3Q29udGVudDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudCAhPSBudWxsKSB7XHJcblx0XHRcdFx0YWN0aW9uKHRoaXMuZ2V0Q29udGVudChzZWxlY3RvcikpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5vYnNlcnZhYmxlLnJlZ2lzdGVyKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH0sICdjb250ZW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnkge1xyXG5cdFx0XHRpZiAoc2VsZWN0b3IgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnQuZmlsdGVyKHNlbGVjdG9yKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0Y29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkuJGluamVjdCA9IFtvYnNlcnZhYmxlLmZhY3RvcnlOYW1lXTtcclxuXHRmdW5jdGlvbiBjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeShvYnNlcnZhYmxlRmFjdG9yeTogb2JzZXJ2YWJsZS5JT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBDb250ZW50UHJvdmlkZXJTZXJ2aWNlKG9ic2VydmFibGVGYWN0b3J5KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtvYnNlcnZhYmxlLm1vZHVsZU5hbWVdKVxyXG5cdFx0LmZhY3Rvcnkoc2VydmljZU5hbWUsIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbnVtYmVyVXRpbGl0eSc7XHJcblxyXG5cdGVudW0gU2lnbiB7XHJcblx0XHRwb3NpdGl2ZSA9IDEsXHJcblx0XHRuZWdhdGl2ZSA9IC0xLFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgc2lnbjogU2lnbiA9IG51bSA+PSAwID8gU2lnbi5wb3NpdGl2ZSA6IFNpZ24ubmVnYXRpdmU7XHJcblx0XHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG59XHJcbiIsIlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemUge1xyXG5cdFx0ZGlzcGxheSgpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBGaWxlU2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVNpemUge1xyXG5cdFx0QllURVNfUEVSX0dCOiBudW1iZXIgPSAxMDczNzQxODI0O1xyXG5cdFx0QllURVNfUEVSX01COiBudW1iZXIgPSAxMDQ4NTc2O1xyXG5cdFx0QllURVNfUEVSX0tCOiBudW1iZXIgPSAxMDI0O1xyXG5cclxuXHRcdGJ5dGVzOiBudW1iZXI7XHJcblxyXG5cdFx0R0I6IG51bWJlcjtcclxuXHRcdGlzR0I6IGJvb2xlYW47XHJcblxyXG5cdFx0TUI6IG51bWJlcjtcclxuXHRcdGlzTUI6IGJvb2xlYW47XHJcblxyXG5cdFx0S0I6IG51bWJlcjtcclxuXHRcdGlzS0I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IobnVtYmVyVXRpbGl0eTogbnVtYmVyLklOdW1iZXJVdGlsaXR5LCBieXRlczogbnVtYmVyKSB7XHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBieXRlcztcclxuXHJcblx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcblx0XHRcdFx0dGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfTUIpIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuXHRcdFx0XHRcdHRoaXMuTUIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLk1CLCAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5pc01CID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0tCKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaXNLQiA9IHRydWU7XHJcblx0XHRcdFx0XHRcdHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5LQiwgMSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNHQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuTUIgKyAnIE1CJztcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyLnNlcnZpY2VOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSk6IElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBzaW1wbGVGaWx0ZXJOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmaWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZhY3RvcnlOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGaWx0ZXIoZmlsZVNpemVGYWN0b3J5OiBJRmlsZVNpemVGYWN0b3J5KTogSUZpbGVTaXplRmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG5cdFx0XHR2YXIgZmlsZVNpemU6IElGaWxlU2l6ZSA9IGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZShieXRlcyk7XHJcblx0XHRcdHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplRmlsdGVyLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtudW1iZXIubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZmlsZVNpemVGYWN0b3J5KVxyXG5cdFx0LmZpbHRlcihzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9hcnJheS9hcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ29iamVjdFV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0XHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZztcclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgT2JqZWN0VXRpbGl0eSBpbXBsZW1lbnRzIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdCBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXkuc2VydmljZU5hbWVdO1xyXG5cdFx0IGNvbnN0cnVjdG9yKHByaXZhdGUgYXJyYXk6IGFycmF5LklBcnJheVV0aWxpdHkpIHtcclxuXHRcdCB9XHJcblxyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAob2JqZWN0ID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzQXJyYXkob2JqZWN0KSkge1xyXG5cdFx0XHRcdHJldHVybiBfLmFueShvYmplY3QpID09PSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5pc05hTihvYmplY3QpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBvYmplY3QgPT09ICcnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzU3RyaW5nKG9iamVjdCkpIHtcclxuXHRcdFx0XHRvYmplY3QgPSAoPHN0cmluZz5vYmplY3QpLnRyaW0oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNOdWxsT3JFbXB0eShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciB0eXBlMTogc3RyaW5nID0gdHlwZW9mIG9iajE7XHJcblx0XHRcdHZhciB0eXBlMjogc3RyaW5nID0gdHlwZW9mIG9iajI7XHJcblxyXG5cdFx0XHRpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlMSAhPT0gdHlwZTIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdC8vaW5pdCBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyBmcm9tIG9iajJcclxuXHRcdFx0XHR2YXIga2V5czI6IHN0cmluZ1tdID0gXy5rZXlzKG9iajIpO1xyXG5cdFx0XHRcdF8uZm9ySW4ob2JqMSwgKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAoXy5oYXMob2JqMiwga2V5KSkge1xyXG5cdFx0XHRcdFx0XHQvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcblx0XHRcdFx0aWYgKF8uYW55KGtleXMyKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0XHRyZXR1cm4gb2JqMSA9PT0gb2JqMjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG5cdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXkubW9kdWxlTmFtZV0pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgT2JqZWN0VXRpbGl0eSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXI7XHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gK3N0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChzdWJzdHJpbmcpIHtcclxuXHRcdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG5cdFx0XHRfLmVhY2gocGFyYW1zLCAocGFyYW06IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcldpdGhDb3VudHMgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHRcdHVwZGF0ZU9wdGlvbkNvdW50czxUSXRlbVR5cGU+KGRhdGE6IFRJdGVtVHlwZVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3N0cmluZy9zdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vZmlsdGVycy9maWx0ZXIudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlciBleHRlbmRzIGZpbHRlci5JRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmcgPSBmaWx0ZXJOYW1lO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgb2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzZWFyY2hPYmplY3Q8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUsIHNlYXJjaDogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KHZhbHVlcywgKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHsgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZGF0YVN0cmluZzogc3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcblxyXG5cdFx0XHRcdGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Quc2VydmljZU5hbWUsIHN0cmluZy5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksXHJcblx0XHRzdHJpbmdVdGlsaXR5OiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdC5tb2R1bGVOYW1lLCBzdHJpbmcubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgSlF1ZXJ5VXRpbGl0eSBpbXBsZW1lbnRzIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHRjb250ZW50QXJlYS5lbXB0eSgpO1xyXG5cdFx0XHRjb250ZW50QXJlYS5hcHBlbmQobmV3Q29udGVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBKUXVlcnlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3Ige1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwyMS51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3BhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWaWV3RGF0YTxUQmVoYXZpb3I+IHtcclxuXHRcdGJlaGF2aW9yOiBUQmVoYXZpb3I7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDaGlsZDxUQmVoYXZpb3I+IHtcclxuXHRcdHZpZXdEYXRhPzogSVZpZXdEYXRhPFRCZWhhdmlvcj47XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElQYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZSB7XHJcblx0XHRnZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yO1xyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxhbnk+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlO1xyXG5cdFx0dHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXVxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdFx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXTtcclxuXHRcdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvciB7XHJcblx0XHRcdHJldHVybiBjaGlsZCAmJiBjaGlsZC52aWV3RGF0YSAhPSBudWxsXHJcblx0XHRcdFx0PyBjaGlsZC52aWV3RGF0YS5iZWhhdmlvclxyXG5cdFx0XHRcdDogbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR0cmlnZ2VyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj5cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGUge1xyXG5cdFx0XHR2YXIgYmVoYXZpb3I6IFRCZWhhdmlvciA9IHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcihjaGlsZCk7XHJcblxyXG5cdFx0XHRpZiAoYmVoYXZpb3IgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBhY3Rpb24oYmVoYXZpb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkTGlzdDogSUNoaWxkPFRCZWhhdmlvcj5bXVxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZVtdIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yczogVEJlaGF2aW9yW10gPSB0aGlzLmdldEFsbENoaWxkQmVoYXZpb3JzKGNoaWxkTGlzdCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gXy5tYXAoYmVoYXZpb3JzLCAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0QWxsQ2hpbGRCZWhhdmlvcnM8VEJlaGF2aW9yPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W10pOiBUQmVoYXZpb3JbXSB7XHJcblx0XHRcdHJldHVybiBfKGNoaWxkTGlzdCkubWFwKChjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3IgPT4geyByZXR1cm4gdGhpcy5nZXRDaGlsZEJlaGF2aW9yPFRCZWhhdmlvcj4oY2hpbGQpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LmZpbHRlcigoYmVoYXZpb3I6IFRCZWhhdmlvcik6IGJvb2xlYW4gPT4geyByZXR1cm4gYmVoYXZpb3IgIT0gbnVsbDsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC52YWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyQ2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPiwgYmVoYXZpb3I6IFRCZWhhdmlvcik6IHZvaWQge1xyXG5cdFx0XHRpZiAoY2hpbGQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNoaWxkLnZpZXdEYXRhID09IG51bGwpIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YSA9IHsgYmVoYXZpb3I6IG51bGwgfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGN1cnJlbnRCZWhhdmlvcjogVEJlaGF2aW9yID0gY2hpbGQudmlld0RhdGEuYmVoYXZpb3I7XHJcblxyXG5cdFx0XHRpZiAoY3VycmVudEJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yID0gPFRCZWhhdmlvcj5fLmV4dGVuZChjdXJyZW50QmVoYXZpb3IsIGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAncHJvbWlzZVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbjtcclxuXHRcdGlzUHJvbWlzZShwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIFByb21pc2VVdGlsaXR5IGltcGxlbWVudHMgSVByb21pc2VVdGlsaXR5IHtcclxuXHRcdGlzUHJvbWlzZShwcm9taXNlOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIF8uaXNPYmplY3QocHJvbWlzZSkgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UudGhlbikgJiYgXy5pc0Z1bmN0aW9uKHByb21pc2UuY2F0Y2gpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgUHJvbWlzZVV0aWxpdHkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhck1vY2tzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Qge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHRjb250cm9sbGVyOiBUQ29udHJvbGxlclR5cGU7XHJcblx0XHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmVSZXN1bHQge1xyXG5cdFx0ZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmU7XHJcblx0XHRzY29wZTogYW5ndWxhci5JU2NvcGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElBbmd1bGFyRml4dHVyZSB7XHJcblx0XHRpbmplY3Q6ICguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKSA9PiBhbnk7XHJcblx0XHRtb2NrOiAobW9ja3M6IGFueSkgPT4gdm9pZDtcclxuXHRcdGNvbnRyb2xsZXI8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBzY29wZT86IGFueSwgbG9jYWxzPzogYW55KTogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPjtcclxuXHRcdGRpcmVjdGl2ZTogKGRvbTogc3RyaW5nKSA9PiBJRGlyZWN0aXZlUmVzdWx0O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQW5ndWxhckZpeHR1cmUgaW1wbGVtZW50cyBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0KC4uLnNlcnZpY2VOYW1lczogc3RyaW5nW10pOiBPYmplY3Qge1xyXG5cdFx0XHQvLyBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIG9mIHRoZSBzZXJ2aWNlcyByZXF1ZXN0ZWRcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBPYmplY3QgPSB7fTtcclxuXHJcblx0XHRcdC8vIGNsb25lIHRoZSBhcnJheSBhbmQgYWRkIGEgZnVuY3Rpb24gdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBvcmlnaW5hbCBhcnJheVxyXG5cdFx0XHQvLyB0aGlzIGF2b2lkcyBpdGVyYXRpbmcgb3ZlciB0aGUgZnVuY3Rpb24gaXRzZWxmXHJcblx0XHRcdHZhciBpbmplY3RQYXJhbWV0ZXJzOiBhbnlbXSA9IF8uY2xvbmUoc2VydmljZU5hbWVzKTtcclxuXHRcdFx0aW5qZWN0UGFyYW1ldGVycy5wdXNoKCguLi5pbmplY3RlZFNlcnZpY2VzOiBhbnlbXSkgPT4ge1xyXG5cdFx0XHRcdC8vIHNob3VsZCBnZXQgY2FsbGVkIHdpdGggdGhlIHNlcnZpY2VzIGluamVjdGVkIGJ5IGFuZ3VsYXJcclxuXHRcdFx0XHQvLyB3ZSdsbCBhZGQgdGhlc2UgdG8gc2VydmljZXMgdXNpbmcgdGhlIHNlcnZpY2VOYW1lIGFzIHRoZSBrZXlcclxuXHRcdFx0XHRfLmVhY2goc2VydmljZU5hbWVzLCAoc2VydmljZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHRzZXJ2aWNlc1tzZXJ2aWNlXSA9IGluamVjdGVkU2VydmljZXNbaW5kZXhdO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGFuZ3VsYXIubW9jay5pbmplY3QoaW5qZWN0UGFyYW1ldGVycyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VydmljZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9jayhtb2NrczogYW55KTogdm9pZCB7XHJcblx0XHRcdGFuZ3VsYXIubW9jay5tb2R1bGUoKCRwcm92aWRlOiBhbmd1bGFyLmF1dG8uSVByb3ZpZGVTZXJ2aWNlKSA9PiB7XHJcblx0XHRcdFx0Xy5lYWNoKG1vY2tzLCAodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRcdCRwcm92aWRlLnZhbHVlKGtleS50b1N0cmluZygpLCB2YWx1ZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRyb2xsZXI8VENvbnRyb2xsZXJUeXBlPihjb250cm9sbGVyTmFtZTogc3RyaW5nLCBzY29wZT86IGFueSwgbG9jYWxzPzogYW55KTogSUNvbnRyb2xsZXJSZXN1bHQ8VENvbnRyb2xsZXJUeXBlPiB7XHJcblx0XHRcdHZhciBzZXJ2aWNlczogYW55ID0gdGhpcy5pbmplY3QoJyRyb290U2NvcGUnLCAnJGNvbnRyb2xsZXInKTtcclxuXHRcdFx0dmFyICRyb290U2NvcGU6IGFuZ3VsYXIuSVNjb3BlID0gc2VydmljZXMuJHJvb3RTY29wZTtcclxuXHRcdFx0dmFyICRjb250cm9sbGVyOiBhbnkgPSBzZXJ2aWNlcy4kY29udHJvbGxlcjtcclxuXHJcblx0XHRcdHNjb3BlID0gXy5leHRlbmQoJHJvb3RTY29wZS4kbmV3KCksIHNjb3BlKTtcclxuXHJcblx0XHRcdGlmIChsb2NhbHMgPT0gbnVsbCkge1xyXG5cdFx0XHRcdGxvY2FscyA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsb2NhbHMuJHNjb3BlID0gc2NvcGU7XHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNjb3BlOiBzY29wZSxcclxuXHRcdFx0XHRjb250cm9sbGVyOiA8VENvbnRyb2xsZXJUeXBlPiRjb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lLCBsb2NhbHMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpcmVjdGl2ZShkb206IHN0cmluZyk6IElEaXJlY3RpdmVSZXN1bHQge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb21waWxlJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29tcGlsZTogYW55ID0gc2VydmljZXMuJGNvbXBpbGU7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCdyZW5vdm9UZW1wbGF0ZXMnKTtcclxuXHJcblx0XHRcdHZhciBjb21wb25lbnQ6IGFueSA9ICRjb21waWxlKGRvbSkoJHJvb3RTY29wZSk7XHJcblx0XHRcdCRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGRpcmVjdGl2ZTogY29tcG9uZW50LFxyXG5cdFx0XHRcdHNjb3BlOiBjb21wb25lbnQuaXNvbGF0ZVNjb3BlKCksXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGFuZ3VsYXJGaXh0dXJlOiBJQW5ndWxhckZpeHR1cmUgPSBuZXcgQW5ndWxhckZpeHR1cmUoKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcbi8vIHVzZXMgdHlwaW5ncy9zaW5vblxyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGVzdCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElNb2NrIHtcclxuXHRcdHNlcnZpY2Uoc2VydmljZT86IGFueSk6IGFueTtcclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0cHJvbWlzZVdpdGhDYWxsYmFjazxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBjYWxsYmFjazogeyguLi5wYXJhbXM6IGFueVtdKTogVERhdGFUeXBlfSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0Zmx1c2g8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElNb2NrUmVxdWVzdDxURGF0YVR5cGU+IHtcclxuXHRcdHByb21pc2U6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT47XHJcblx0XHRkYXRhOiBURGF0YVR5cGU7XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnkge1xyXG5cdFx0XHRpZiAoYW5ndWxhci5pc0RlZmluZWQoc2VydmljZSkgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0c2VydmljZSA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZTxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkYXRhPzogVERhdGFUeXBlLCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCgpOiBhbnkgPT4ge1xyXG5cdFx0XHRcdHZhciBkZWZlcnJlZDogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPiA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuXHRcdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRcdC8vIERlZmF1bHQgc3VjY2Vzc2Z1bCB0byB0cnVlXHJcblx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHN1Y2Nlc3NmdWwpKSB7XHJcblx0XHRcdFx0c3VjY2Vzc2Z1bCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZpY2VbbWV0aG9kTmFtZV0gPSBzaW5vbi5zcHkoKC4uLnBhcmFtczogYW55W10pOiBhbnkgPT4ge1xyXG5cdFx0XHRcdHZhciBkZWZlcnJlZDogSlF1ZXJ5RGVmZXJyZWQ8VERhdGFUeXBlPiA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuXHRcdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0Xy5wdXNoKHtcclxuXHRcdFx0XHRcdHByb21pc2U6IGRlZmVycmVkLFxyXG5cdFx0XHRcdFx0ZGF0YTogY2FsbGJhY2suYXBwbHkodGhpcywgcGFyYW1zKSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3NmdWw6IHN1Y2Nlc3NmdWwsXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBzY29wZT86IG5nLklTY29wZSk6IHZvaWQge1xyXG5cdFx0XHQvLyBTYXZlIGxvY2FsIHJlZmVyZW5jZSB0byB0aGUgcmVxdWVzdCBsaXN0IGFuZCB0aGVuIGNsZWFyXHJcblx0XHRcdHZhciBjdXJyZW50UGVuZGluZ1JlcXVlc3RzOiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPltdID0gc2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF87XHJcblx0XHRcdHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfID0gW107XHJcblxyXG5cdFx0XHQvLyBQcm9jZXNzIHRoZSBzYXZlZCBsaXN0LlxyXG5cdFx0XHQvLyBUaGlzIHdheSBpZiBhbnkgYWRkaXRpb25hbCByZXF1ZXN0cyBhcmUgZ2VuZXJhdGVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlIGN1cnJlbnQgLyBsb2NhbCBsaXN0IFxyXG5cdFx0XHQvLyAgdGhlc2UgcmVxdWVzdHMgd2lsbCBiZSBxdWV1ZWQgdW50aWwgdGhlIG5leHQgY2FsbCB0byBmbHVzaCgpLlxyXG5cdFx0XHRfLmVhY2goY3VycmVudFBlbmRpbmdSZXF1ZXN0cywgKHJlcXVlc3Q6IElNb2NrUmVxdWVzdDxURGF0YVR5cGU+KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0aWYgKHJlcXVlc3Quc3VjY2Vzc2Z1bCkge1xyXG5cdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlc29sdmUocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmVxdWVzdC5wcm9taXNlLnJlamVjdChyZXF1ZXN0LmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc2NvcGUpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0c2NvcGUuJGRpZ2VzdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIG1vY2s6IElNb2NrID0gbmV3IE1vY2soKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbic7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ3ZhbGlkYXRpb25GYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkhhbmRsZXIge1xyXG5cdFx0aXNBY3RpdmU/OiB7KCk6IGJvb2xlYW59IHwgYm9vbGVhbjtcclxuXHRcdHZhbGlkYXRlKCk6IGJvb2xlYW47XHJcblx0XHRzaG93RXJyb3JzKCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0KCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdFx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgdmFsaWRhdGlvbkhhbmRsZXJzOiB7IFtpbmRleDogbnVtYmVyXTogSVZhbGlkYXRpb25IYW5kbGVyIH0gPSB7fTtcclxuXHRcdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRcdFx0Xy5lYWNoKHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzLCAoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0dmFyIGlzQWN0aXZlOiBib29sZWFuID0gKF8uaXNGdW5jdGlvbihoYW5kbGVyLmlzQWN0aXZlKSAmJiAoPHsoKTogYm9vbGVhbn0+aGFuZGxlci5pc0FjdGl2ZSkoKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09IG51bGxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR8fCBoYW5kbGVyLmlzQWN0aXZlID09PSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoaXNBY3RpdmUgJiYgIWhhbmRsZXIudmFsaWRhdGUoKSkge1xyXG5cdFx0XHRcdFx0aXNWYWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0aGFuZGxlci5zaG93RXJyb3JzKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1tjdXJyZW50S2V5XSA9IGhhbmRsZXI7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSVZhbGlkYXRpb25TZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSgpOiBJVmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblNlcnZpY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdFx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0dHJ1bmNhdGUuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eTogX19vYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRcdGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcblxyXG5cdFx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG5cdFx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdFx0b3V0ICs9ICcuLi4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gb3V0O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmJlaGF2aW9ycyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdHN0b3BFdmVudFByb3BvZ2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2lzRW1wdHkvaXNFbXB0eS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHJ1bmNhdGUvdHJ1bmNhdGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0aXNFbXB0eS5tb2R1bGVOYW1lLFxyXG5cdFx0dHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRlbnRQcm92aWRlci9jb250ZW50UHJvdmlkZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS9kYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2pxdWVyeS9qcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRhcnJheS5tb2R1bGVOYW1lLFxyXG5cdFx0YXV0b3NhdmUubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWUsXHJcblx0XHRib29sZWFuLm1vZHVsZU5hbWUsXHJcblx0XHRjb250ZW50UHJvdmlkZXIubW9kdWxlTmFtZSxcclxuXHRcdGRhdGUubW9kdWxlTmFtZSxcclxuXHRcdGpxdWVyeS5tb2R1bGVOYW1lLFxyXG5cdFx0bnVtYmVyLm1vZHVsZU5hbWUsXHJcblx0XHRvYmplY3QubW9kdWxlTmFtZSxcclxuXHRcdG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuXHRcdHBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSxcclxuXHRcdHByb21pc2UubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRcdGJlaGF2aW9ycy5tb2R1bGVOYW1lLFxyXG5cdFx0ZmlsdGVycy5tb2R1bGVOYW1lLFxyXG5cdFx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=