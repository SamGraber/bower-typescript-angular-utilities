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
                        services.window.alert(message);
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
                                _this.notification.error(handler.errorMessage);
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
                validationServiceFactory.$inject = ['notification'];
                function validationServiceFactory(notification) {
                    'use strict';
                    return {
                        getInstance: function () {
                            return new ValidationService(notification);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FycmF5L2FycmF5LnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMiLCJmaWx0ZXJzL2lzRW1wdHkvaXNFbXB0eS50cyIsInNlcnZpY2VzL2F1dG9zYXZlQWN0aW9uL2F1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9hdXRvc2F2ZS9hdXRvc2F2ZS5zZXJ2aWNlLnRzIiwiZmlsdGVycy90cnVuY2F0ZS90cnVuY2F0ZS50cyIsInNlcnZpY2VzL2Jvb2xlYW4vYm9vbGVhbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMudHMiLCJzZXJ2aWNlcy9icmVha3BvaW50cy92aXNpYmxlQnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzIiwic2VydmljZXMvYnJlYWtwb2ludHMvYnJlYWtwb2ludHMuc2VydmljZS50cyIsInNlcnZpY2VzL2NvbnRlbnRQcm92aWRlci9jb250ZW50UHJvdmlkZXIuc2VydmljZS50cyIsInNlcnZpY2VzL3RpbWUvdGltZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvbW9tZW50L21vbWVudC5tb2R1bGUudHMiLCJ0eXBlcy9jb21wYXJlUmVzdWx0LnRzIiwic2VydmljZXMvZGF0ZS9kYXRlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9kYXRlL2RhdGVUaW1lRm9ybWF0U3RyaW5ncy50cyIsInNlcnZpY2VzL2RhdGUvZGF0ZS5tb2R1bGUudHMiLCJzZXJ2aWNlcy9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5zZXJ2aWNlLnRzIiwic2VydmljZXMvZmlsZVNpemUvZmlsZVNpemVGaWx0ZXIudHMiLCJzZXJ2aWNlcy9maWxlU2l6ZS9maWxlU2l6ZS5tb2R1bGUudHMiLCJzZXJ2aWNlcy9zdHJpbmcvc3RyaW5nLnNlcnZpY2UudHMiLCJmaWx0ZXJzL2ZpbHRlci50cyIsInNlcnZpY2VzL2dlbmVyaWNTZWFyY2hGaWx0ZXIvZ2VuZXJpY1NlYXJjaEZpbHRlci5zZXJ2aWNlLnRzIiwic2VydmljZXMvanF1ZXJ5L2pxdWVyeS5zZXJ2aWNlLnRzIiwic2VydmljZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIiwic2VydmljZXMvbm90aWZpY2F0aW9uL2Jhc2VOb3RpZmllci50cyIsInNlcnZpY2VzL3BhcmVudENoaWxkQmVoYXZpb3IvcGFyZW50Q2hpbGRCZWhhdmlvci5zZXJ2aWNlLnRzIiwic2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMiLCJzZXJ2aWNlcy90ZXN0L2FuZ3VsYXJGaXh0dXJlLnRzIiwic2VydmljZXMvdGVzdC9tb2NrLnRzIiwic2VydmljZXMvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiLCJiZWhhdmlvcnMvc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMiLCJiZWhhdmlvcnMvYmVoYXZpb3JzLm1vZHVsZS50cyIsImZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMiLCJzZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUudHMiLCJ1dGlsaXRpZXMudHMiXSwibmFtZXMiOlsicmwiLCJybC51dGlsaXRpZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuZmluZEluZGV4T2YiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkuQXJyYXlVdGlsaXR5LnJlbW92ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkucmVwbGFjZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hcnJheS5BcnJheVV0aWxpdHkuc3VtIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5LkFycmF5VXRpbGl0eS50b0RpY3Rpb25hcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmlzTnVsbE9yRW1wdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0Lk9iamVjdFV0aWxpdHkuaXNOdWxsT3JXaGl0ZXNwYWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LmFyZUVxdWFsIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LnRvU3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdC5PYmplY3RVdGlsaXR5LnZhbHVlT3JEZWZhdWx0IiwicmwudXRpbGl0aWVzLmZpbHRlcnMiLCJybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IiwicmwudXRpbGl0aWVzLmZpbHRlcnMuaXNFbXB0eS5pc0VtcHR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlQWN0aW9uLkF1dG9zYXZlQWN0aW9uU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnNhdmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbi5BdXRvc2F2ZUFjdGlvblNlcnZpY2UuY29tcGxldGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnN1Y2Nlc3NmdWwiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24uQXV0b3NhdmVBY3Rpb25TZXJ2aWNlLnRyaWdnZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLkF1dG9zYXZlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5BdXRvc2F2ZVNlcnZpY2UubnVsbEZvcm0iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUuQXV0b3NhdmVTZXJ2aWNlLm51bGxGb3JtLiRzZXRQcmlzdGluZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZS5hdXRvc2F2ZVNlcnZpY2VGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmF1dG9zYXZlLmF1dG9zYXZlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSIsInJsLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlLnRydW5jYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4iLCJybC51dGlsaXRpZXMuc2VydmljZXMuYm9vbGVhbi5Cb29sZWFuVXRpbGl0eSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuLkJvb2xlYW5VdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJvb2xlYW4uQm9vbGVhblV0aWxpdHkudG9Cb29sIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLlZpc2libGVCcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5WaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuYnJlYWtwb2ludHMuVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlLmlzVmlzaWJsZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5PYnNlcnZhYmxlU2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnJlZ2lzdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm9ic2VydmFibGUuT2JzZXJ2YWJsZVNlcnZpY2UuZmlyZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYnNlcnZhYmxlLk9ic2VydmFibGVTZXJ2aWNlLnVucmVnaXN0ZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZS5vYnNlcnZhYmxlU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdy5XaW5kb3dTZXJ2aWNlLnJlc2l6ZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5nZXRCcmVha3BvaW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzLkJyZWFrcG9pbnRTZXJ2aWNlLmlzQnJlYWtwb2ludCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cy5CcmVha3BvaW50U2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuY29udGVudFByb3ZpZGVyLkNvbnRlbnRQcm92aWRlclNlcnZpY2Uuc2V0Q29udGVudCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuQ29udGVudFByb3ZpZGVyU2VydmljZS5nZXRDb250ZW50IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlci5jb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIuY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkuZ2V0SW5zdGFuY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50aW1lLlRpbWVVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb1NlY29uZHMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb01pbnV0ZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGltZS5UaW1lVXRpbGl0eS5taWxsaXNlY29uZHNUb0hvdXJzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRpbWUuVGltZVV0aWxpdHkubWlsbGlzZWNvbmRzVG9EYXlzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm1vbWVudFdyYXBwZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlci5tb21lbnRXcmFwcGVyIiwicmwudXRpbGl0aWVzLnR5cGVzIiwicmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQiLCJybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0IiwicmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQuZ2V0Q29tcGFyZVJlc3VsdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmlzTGVhcFllYXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXRGdWxsU3RyaW5nIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUuRGF0ZVV0aWxpdHkuZ2V0RGF5cyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LnN1YnRyYWN0RGF0ZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5zdWJ0cmFjdERhdGVJbkRheXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5jb21wYXJlRGF0ZXMiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5kYXRlSW5SYW5nZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlLkRhdGVVdGlsaXR5LmdldERhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZGF0ZS5EYXRlVXRpbGl0eS5nZXROb3ciLCJybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5TaWduIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlci5OdW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5udW1iZXIuTnVtYmVyVXRpbGl0eS5pbnRlZ2VyRGl2aWRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLkZpbGVTaXplU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5GaWxlU2l6ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuRmlsZVNpemVTZXJ2aWNlLmRpc3BsYXkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUuZmlsZVNpemVGYWN0b3J5IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplLmZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZS5maWxlU2l6ZUZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcuU3RyaW5nVXRpbGl0eVNlcnZpY2UudG9OdW1iZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMuc3RyaW5nLlN0cmluZ1V0aWxpdHlTZXJ2aWNlLmNvbnRhaW5zIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5zdWJzdGl0dXRlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZy5TdHJpbmdVdGlsaXR5U2VydmljZS5yZXBsYWNlQWxsIiwicmwudXRpbGl0aWVzLmZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuR2VuZXJpY1NlYXJjaEZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5HZW5lcmljU2VhcmNoRmlsdGVyLmZpbHRlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5nZW5lcmljU2VhcmNoRmlsdGVyLkdlbmVyaWNTZWFyY2hGaWx0ZXIuc2VhcmNoT2JqZWN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIuZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuZ2VuZXJpY1NlYXJjaEZpbHRlci5nZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMuanF1ZXJ5LkpRdWVyeVV0aWxpdHkucmVwbGFjZUNvbnRlbnQiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5Ob3RpZmljYXRpb25TZXJ2aWNlLmluZm8iLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLk5vdGlmaWNhdGlvblNlcnZpY2Uud2FybmluZyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5lcnJvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uTm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbi5CYXNlTm90aWZpZXIuaW5mbyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLndhcm5pbmciLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5lcnJvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ub3RpZmljYXRpb24uQmFzZU5vdGlmaWVyLnN1Y2Nlc3MiLCJybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uLkJhc2VOb3RpZmllci5ub3RpZnkiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UuY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRDaGlsZEJlaGF2aW9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3IuUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2UudHJpZ2dlckNoaWxkQmVoYXZpb3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS50cmlnZ2VyQWxsQ2hpbGRCZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuc2VydmljZXMucGFyZW50Q2hpbGRCZWhhdmlvci5QYXJlbnRDaGlsZEJlaGF2aW9yU2VydmljZS5nZXRBbGxDaGlsZEJlaGF2aW9ycyIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yLlBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlLnJlZ2lzdGVyQ2hpbGRCZWhhdmlvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnByb21pc2UuUHJvbWlzZVV0aWxpdHkiLCJybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZS5Qcm9taXNlVXRpbGl0eS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wcm9taXNlLlByb21pc2VVdGlsaXR5LmlzUHJvbWlzZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb25zdHJ1Y3RvciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLmluamVjdCIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0LkFuZ3VsYXJGaXh0dXJlLm1vY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Bbmd1bGFyRml4dHVyZS5jb250cm9sbGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuQW5ndWxhckZpeHR1cmUuZGlyZWN0aXZlIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3QuTW9jayIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0Lk1vY2suY29uc3RydWN0b3IiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnNlcnZpY2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2UiLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLnByb21pc2VXaXRoQ2FsbGJhY2siLCJybC51dGlsaXRpZXMuc2VydmljZXMudGVzdC5Nb2NrLmZsdXNoIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24iLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLlZhbGlkYXRpb25TZXJ2aWNlLmNvbnN0cnVjdG9yIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGUiLCJybC51dGlsaXRpZXMuc2VydmljZXMudmFsaWRhdGlvbi5WYWxpZGF0aW9uU2VydmljZS5yZWdpc3RlclZhbGlkYXRpb25IYW5kbGVyIiwicmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24uVmFsaWRhdGlvblNlcnZpY2UudW5yZWdpc3RlciIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSIsInJsLnV0aWxpdGllcy5zZXJ2aWNlcy52YWxpZGF0aW9uLnZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeS5nZXRJbnN0YW5jZSIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMiLCJybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uIiwicmwudXRpbGl0aWVzLmJlaGF2aW9ycy5zdG9wRXZlbnRQcm9wb2dhdGlvbi5zdG9wRXZlbnRQcm9wYWdhdGlvbiIsInJsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24uc3RvcEV2ZW50UHJvcGFnYXRpb24ubGluayJdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUV0QixJQUFPLEVBQUUsQ0E2RVI7QUE3RUQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFNBQVNBLENBNkVsQkE7SUE3RVNBLFdBQUFBLFNBQVNBO1FBQUNDLElBQUFBLFFBQVFBLENBNkUzQkE7UUE3RW1CQSxXQUFBQSxRQUFRQTtZQUFDQyxJQUFBQSxLQUFLQSxDQTZFakNBO1lBN0U0QkEsV0FBQUEsT0FBS0EsRUFBQ0EsQ0FBQ0E7Z0JBQ25DQyxZQUFZQSxDQUFDQTtnQkFFRkEsa0JBQVVBLEdBQVdBLDZCQUE2QkEsQ0FBQ0E7Z0JBQ25EQSxtQkFBV0EsR0FBV0EsY0FBY0EsQ0FBQ0E7Z0JBYWhEQTtvQkFBQUM7b0JBd0RBQyxDQUFDQTtvQkF2REFELGtDQUFXQSxHQUFYQSxVQUF1QkEsS0FB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QUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNyREEsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNyREEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNuREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNwREEsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUNwREEsRUFBRUEsSUFBSUEsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN0REEsRUFBRUEsSUFBSUEsRUFBRUEsV0FBV0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN6REEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN2REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBOzRCQUN4REEsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBZ0JBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBO3lCQUN4REEsQ0FBQ0E7b0JBQ0hBLENBQUNBO29CQUtPRCxnQ0FBVUEsR0FBbEJBLFVBQW1CQSxJQUFhQTt3QkFDL0JFLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO29CQUMvQ0EsQ0FBQ0E7b0JBRURGLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFhQTt3QkFDMUJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLElBQUlBLENBQUNBO29CQUMvQkEsQ0FBQ0E7b0JBRURILDZCQUFPQSxHQUFQQSxVQUFRQSxLQUFhQSxFQUFFQSxJQUFhQTt3QkFDbkNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNyQ0EsQ0FBQ0E7b0JBRURKLG1DQUFhQSxHQUFiQSxVQUFjQSxLQUFvQkEsRUFBRUEsR0FBa0JBLEVBQUVBLFVBQW1CQTt3QkFDMUVLLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQ2JBLENBQUNBO3dCQUVEQSxJQUFJQSxTQUFTQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFDdERBLElBQUlBLE9BQU9BLEdBQVNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO3dCQUVsREEsSUFBSUEsTUFBTUEsR0FBb0JBLEVBQUVBLENBQUNBO3dCQUNqQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7d0JBQ3REQSxNQUFNQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTt3QkFDL0RBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO3dCQUUxREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxNQUFNQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDbkJBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLFNBQVNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLENBQUNBO3dCQUM1RUEsQ0FBQ0E7d0JBRURBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUN2QkEsTUFBTUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ2xCQSxNQUFNQSxDQUFDQSxNQUFNQSxJQUFJQSxFQUFFQSxDQUFDQTt3QkFDckJBLENBQUNBO3dCQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDZkEsQ0FBQ0E7b0JBRURMLHdDQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFvQkEsRUFBRUEsR0FBa0JBLEVBQUVBLFVBQW1CQTt3QkFDL0VNLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7d0JBQ2JBLENBQUNBO3dC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WUFDcEJBLGlCQUFPQSxDQUFDQSxVQUFVQTtZQUNsQkEsa0JBQVFBLENBQUNBLFVBQVVBO1NBQ25CQSxDQUFDQSxDQUFDQTtJQUNKQSxDQUFDQSxFQVJTRCxTQUFTQSxHQUFUQSxZQUFTQSxLQUFUQSxZQUFTQSxRQVFsQkE7QUFBREEsQ0FBQ0EsRUFSTSxFQUFFLEtBQUYsRUFBRSxRQVFSIiwiZmlsZSI6InV0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXJyYXkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmFycmF5JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYXJyYXlVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQXJyYXlVdGlsaXR5IHtcclxuXHRcdGZpbmRJbmRleE9mPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBwcmVkaWNhdGU6IHsgKGl0ZW06IFREYXRhVHlwZSk6IGJvb2xlYW4gfSk6IG51bWJlcjtcclxuXHRcdHJlbW92ZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgaXRlbTogeyAob2JqOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBURGF0YVR5cGU7XHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSk6IFREYXRhVHlwZTtcclxuXHRcdHJlcGxhY2U8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIG9sZEl0ZW06IFREYXRhVHlwZSwgbmV3SXRlbTogVERhdGFUeXBlKTogdm9pZDtcclxuXHRcdHN1bTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgdHJhbnNmb3JtOiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlcjtcclxuXHRcdHN1bShhcnJheTogbnVtYmVyW10pOiBudW1iZXI7XHJcblx0XHR0b0RpY3Rpb25hcnk8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGtleVNlbGVjdG9yOiB7KGl0ZW06IFREYXRhVHlwZSk6IHN0cmluZ30pOiBURGF0YVR5cGVbXTtcclxuXHRcdHRvRGljdGlvbmFyeTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwga2V5U2VsZWN0b3I6IHsoaXRlbTogVERhdGFUeXBlKTogbnVtYmVyfSk6IFREYXRhVHlwZVtdO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXJyYXlVdGlsaXR5IGltcGxlbWVudHMgSUFycmF5VXRpbGl0eSB7XHJcblx0XHRmaW5kSW5kZXhPZjxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgcHJlZGljYXRlOiB7IChpdGVtOiBURGF0YVR5cGUpOiBib29sZWFuIH0pOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgdGFyZ2V0SW5kZXg6IG51bWJlcjtcclxuXHJcblx0XHRcdF8uZWFjaChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHRcdGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcclxuXHRcdFx0XHRcdHRhcmdldEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXRJbmRleCAhPSBudWxsID8gdGFyZ2V0SW5kZXggOiAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmU8VERhdGFUeXBlPihhcnJheTogVERhdGFUeXBlW10sIGl0ZW06IFREYXRhVHlwZSB8IHsgKG9iajogVERhdGFUeXBlKTogYm9vbGVhbiB9KTogVERhdGFUeXBlIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXI7XHJcblxyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0pKSB7XHJcblx0XHRcdFx0aW5kZXggPSB0aGlzLmZpbmRJbmRleE9mKGFycmF5LCA8eyhvYmo6IFREYXRhVHlwZSk6IGJvb2xlYW59Pml0ZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGluZGV4ID0gXy5pbmRleE9mKGFycmF5LCA8VERhdGFUeXBlPml0ZW0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZTxURGF0YVR5cGU+KGFycmF5OiBURGF0YVR5cGVbXSwgb2xkSXRlbTogVERhdGFUeXBlLCBuZXdJdGVtOiBURGF0YVR5cGUpOiB2b2lkIHtcclxuXHRcdFx0dmFyIGluZGV4OiBudW1iZXIgPSBfLmluZGV4T2YoYXJyYXksIG9sZEl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG5ld0l0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c3VtPFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCB0cmFuc2Zvcm0/OiB7IChpdGVtOiBURGF0YVR5cGUpOiBudW1iZXIgfSk6IG51bWJlciB7XHJcblx0XHRcdHZhciBsaXN0OiBudW1iZXJbXTtcclxuXHJcblx0XHRcdGlmICh0cmFuc2Zvcm0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdGxpc3QgPSBfLm1hcChhcnJheSwgKGl0ZW06IFREYXRhVHlwZSk6IG51bWJlciA9PiB7IHJldHVybiB0cmFuc2Zvcm0oaXRlbSk7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxpc3QgPSA8YW55W10+YXJyYXk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShsaXN0LCAoc3VtOiBudW1iZXIsIG51bTogbnVtYmVyKTogbnVtYmVyID0+IHsgcmV0dXJuIHN1bSArIG51bTsgfSwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9EaWN0aW9uYXJ5PFREYXRhVHlwZT4oYXJyYXk6IFREYXRhVHlwZVtdLCBrZXlTZWxlY3RvcjogeyAoaXRlbTogVERhdGFUeXBlKTogc3RyaW5nIHwgbnVtYmVyIH0pOiBURGF0YVR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfLnJlZHVjZShhcnJheSwgKGRpY3Rpb25hcnk6IFREYXRhVHlwZVtdLCBpdGVtOiBURGF0YVR5cGUpOiBURGF0YVR5cGVbXSA9PiB7XHJcblx0XHRcdFx0ZGljdGlvbmFyeVs8YW55PmtleVNlbGVjdG9yKGl0ZW0pXSA9IGl0ZW07XHJcblx0XHRcdFx0cmV0dXJuIGRpY3Rpb25hcnk7XHJcblx0XHRcdH0sIFtdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEFycmF5VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9hcnJheS9hcnJheS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLm9iamVjdCc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ29iamVjdFV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPckVtcHR5KG9iamVjdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yRW1wdHkob2JqZWN0OiBzdHJpbmcpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRpc051bGxPcldoaXRlc3BhY2Uob2JqZWN0OiBudW1iZXIpOiBib29sZWFuO1xyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdGlzTnVsbE9yV2hpdGVzcGFjZShvYmplY3Q6IGFueSk6IGJvb2xlYW47XHJcblx0XHRhcmVFcXVhbChvYmoxOiBhbnksIG9iajI6IGFueSk6IGJvb2xlYW47XHJcblx0XHR0b1N0cmluZyhvYmplY3Q6IGFueSk6IHN0cmluZztcclxuXHRcdHZhbHVlT3JEZWZhdWx0KHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KTogYW55O1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgT2JqZWN0VXRpbGl0eSBpbXBsZW1lbnRzIElPYmplY3RVdGlsaXR5IHtcclxuXHRcdCBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbYXJyYXkuc2VydmljZU5hbWVdO1xyXG5cdFx0IGNvbnN0cnVjdG9yKHByaXZhdGUgYXJyYXk6IGFycmF5LklBcnJheVV0aWxpdHkpIHtcclxuXHRcdCB9XHJcblxyXG5cdFx0aXNOdWxsT3JFbXB0eShvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAob2JqZWN0ID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzQXJyYXkob2JqZWN0KSkge1xyXG5cdFx0XHRcdHJldHVybiBfLmFueShvYmplY3QpID09PSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5pc05hTihvYmplY3QpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBvYmplY3QgPT09ICcnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aXNOdWxsT3JXaGl0ZXNwYWNlKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzU3RyaW5nKG9iamVjdCkpIHtcclxuXHRcdFx0XHRvYmplY3QgPSAoPHN0cmluZz5vYmplY3QpLnRyaW0oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNOdWxsT3JFbXB0eShvYmplY3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFyZUVxdWFsKG9iajE6IGFueSwgb2JqMjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciB0eXBlMTogc3RyaW5nID0gdHlwZW9mIG9iajE7XHJcblx0XHRcdHZhciB0eXBlMjogc3RyaW5nID0gdHlwZW9mIG9iajI7XHJcblxyXG5cdFx0XHRpZiAob2JqMSA9PSBudWxsICYmIG9iajIgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9iajEgPT0gbnVsbCB8fCBvYmoyID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlMSAhPT0gdHlwZTIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmFyZUVxdWFsKG9iajFbaV0sIG9iajJbaV0pID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUxID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdC8vaW5pdCBhbiBvYmplY3Qgd2l0aCB0aGUga2V5cyBmcm9tIG9iajJcclxuXHRcdFx0XHR2YXIga2V5czI6IHN0cmluZ1tdID0gXy5rZXlzKG9iajIpO1xyXG5cdFx0XHRcdF8uZm9ySW4ob2JqMSwgKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAoXy5oYXMob2JqMiwga2V5KSkge1xyXG5cdFx0XHRcdFx0XHQvL2NvbXBhcmUgdmFsdWUgYWdhaW5zdCB0aGUgdmFsdWUgd2l0aCB0aGUgc2FtZSBrZXkgaW4gb2JqMiwgdGhlbiByZW1vdmUgdGhlIGtleVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hcmVFcXVhbCh2YWx1ZSwgb2JqMltrZXldKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hcnJheS5yZW1vdmUoa2V5czIsIGtleSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvL2lmIHRoZXJlIGFyZSBzdGlsbCBrZXlzIGxlZnQgaW4ga2V5czIsIHdlIGtub3cgdGhleSBhcmUgbm90IGVxdWFsIChvYmoyIGhhcyBtb3JlIHByb3BlcnRpZXMpXHJcblx0XHRcdFx0aWYgKF8uYW55KGtleXMyKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL2lmIHR5cGVzIGFyZSBwcmltaXRpdmUsIGRvIGEgc2ltcGxlIGNvbXBhcmlzb25cclxuXHRcdFx0XHRyZXR1cm4gb2JqMSA9PT0gb2JqMjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9TdHJpbmcob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gb2JqZWN0ICsgJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsdWVPckRlZmF1bHQodmFsdWU6IGFueSwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG5cdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbYXJyYXkubW9kdWxlTmFtZV0pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgT2JqZWN0VXRpbGl0eSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy5pc0VtcHR5IHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGltcG9ydCBfX29iamVjdCA9IHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5vYmplY3Q7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzLmlzRW1wdHknO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdpc0VtcHR5JztcclxuXHRleHBvcnQgdmFyIGZpbHRlck5hbWU6IHN0cmluZyA9IHNlcnZpY2VOYW1lICsgJ0ZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0KGlucHV0OiBhbnksIHRydWVXaGVuRW1wdHk/OiBib29sZWFuKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gaXNFbXB0eShvYmplY3Q6IF9fb2JqZWN0LklPYmplY3RVdGlsaXR5KTogSUlzRW1wdHlGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dDogYW55LCB0cnVlV2hlbkVtcHR5PzogYm9vbGVhbik6IGJvb2xlYW4gPT4ge1xyXG5cdFx0XHR2YXIgaXNFbXB0eTogYm9vbGVhbiA9IG9iamVjdC5pc051bGxPckVtcHR5KGlucHV0KTtcclxuXHJcblx0XHRcdGlmICh0cnVlV2hlbkVtcHR5ID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19vYmplY3QubW9kdWxlTmFtZV0pXHJcblx0XHQuZmlsdGVyKHNlcnZpY2VOYW1lLCBpc0VtcHR5KTtcclxufVxyXG4iLCJcclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZUFjdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb24nO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdhdXRvc2F2ZUFjdGlvbic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHR0cmlnZ2VyKHByb21pc2U6IG5nLklQcm9taXNlPGFueT4pOiB2b2lkO1xyXG5cdFx0c2F2aW5nOiBib29sZWFuO1xyXG5cdFx0Y29tcGxldGU6IGJvb2xlYW47XHJcblx0XHRzdWNjZXNzZnVsOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlQWN0aW9uU2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyR0aW1lb3V0J107XHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlICR0aW1lb3V0OiBuZy5JVGltZW91dFNlcnZpY2UpIHt9XHJcblxyXG5cdFx0cHJpdmF0ZSBjb21wbGV0ZU1lc3NhZ2VEdXJhdGlvbjogbnVtYmVyID0gMTAwMDtcclxuXHJcblx0XHRwcml2YXRlIF9zYXZpbmc6IGJvb2xlYW47XHJcblx0XHRwcml2YXRlIF9jb21wbGV0ZTogYm9vbGVhbjtcclxuXHRcdHByaXZhdGUgX3N1Y2Nlc3NmdWw6IGJvb2xlYW47XHJcblxyXG5cdFx0Z2V0IHNhdmluZygpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3NhdmluZztcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgY29tcGxldGUoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jb21wbGV0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgc3VjY2Vzc2Z1bCgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N1Y2Nlc3NmdWw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlcihwcm9taXNlOiBuZy5JUHJvbWlzZTxhbnk+KTogYW55IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2UudGhlbih0aGlzLmF1dG9zYXZlU3VjY2Vzc2Z1bClcclxuXHRcdFx0XHRcdFx0LmNhdGNoKHRoaXMuYXV0b3NhdmVGYWlsZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgYXV0b3NhdmVTdWNjZXNzZnVsOiB7IChkYXRhOiBhbnkpOiBhbnkgfSA9IChkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlQXV0b3NhdmUoZGF0YSwgdHJ1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBhdXRvc2F2ZUZhaWxlZDogeyAoZGF0YTogYW55KTogYW55IH0gPSAoZGF0YTogYW55KTogYW55ID0+IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZUF1dG9zYXZlKGRhdGEsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHJlc29sdmVBdXRvc2F2ZTogeyAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55IH0gPSAoZGF0YTogYW55LCBzdWNjZXNzOiBib29sZWFuKTogYW55ID0+IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX2NvbXBsZXRlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5fc3VjY2Vzc2Z1bCA9IHN1Y2Nlc3M7XHJcblxyXG5cdFx0XHR0aGlzLiR0aW1lb3V0KCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHR0aGlzLl9jb21wbGV0ZSA9IGZhbHNlO1xyXG5cdFx0XHR9LCB0aGlzLmNvbXBsZXRlTWVzc2FnZUR1cmF0aW9uKTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgQXV0b3NhdmVBY3Rpb25TZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IF9fYXV0b3NhdmVBY3Rpb24gPSBybC51dGlsaXRpZXMuc2VydmljZXMuYXV0b3NhdmVBY3Rpb247XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5hdXRvc2F2ZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ2F1dG9zYXZlRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRhdXRvc2F2ZSguLi5kYXRhOiBhbnlbXSk6IGJvb2xlYW47XHJcblx0XHRjb250ZW50Rm9ybTogbmcuSUZvcm1Db250cm9sbGVyO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQXV0b3NhdmVTZXJ2aWNlIGltcGxlbWVudHMgSUF1dG9zYXZlU2VydmljZSB7XHJcblx0XHRwcml2YXRlIGhhc1ZhbGlkYXRvcjogYm9vbGVhbjtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dG9zYXZlU2VydmljZTogX19hdXRvc2F2ZUFjdGlvbi5JQXV0b3NhdmVBY3Rpb25TZXJ2aWNlXHJcblx0XHRcdFx0LCBwcml2YXRlIHNhdmU6IHsoLi4uZGF0YTogYW55W10pOiBuZy5JUHJvbWlzZTx2b2lkPn1cclxuXHRcdFx0XHQsIHB1YmxpYyBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlclxyXG5cdFx0XHRcdCwgcHJpdmF0ZSB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pIHtcclxuXHRcdFx0dGhpcy5oYXNWYWxpZGF0b3IgPSB2YWxpZGF0ZSAhPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuY29udGVudEZvcm0gPSB0aGlzLm51bGxGb3JtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhdXRvc2F2ZTogeyAoLi4uZGF0YTogYW55W10pOiBib29sZWFuIH0gPSAoLi4uZGF0YTogYW55W10pOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuY29udGVudEZvcm0uJHByaXN0aW5lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmhhc1ZhbGlkYXRvcikge1xyXG5cdFx0XHRcdHZhbGlkID0gdGhpcy52YWxpZGF0ZSgpO1xyXG5cdFx0XHRcdGlmICh2YWxpZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmFsaWQpIHtcclxuXHRcdFx0XHR0aGlzLmF1dG9zYXZlU2VydmljZS50cmlnZ2VyKHRoaXMuc2F2ZSguLi5kYXRhKS50aGVuKCgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbnRlbnRGb3JtICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZW50Rm9ybS4kc2V0UHJpc3RpbmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBudWxsRm9ybSgpOiBuZy5JRm9ybUNvbnRyb2xsZXIge1xyXG5cdFx0XHRyZXR1cm4gPGFueT57XHJcblx0XHRcdFx0JHByaXN0aW5lOiBmYWxzZSxcclxuXHRcdFx0XHQkc2V0UHJpc3RpbmUoKTogdm9pZCB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUF1dG9zYXZlU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2Uoc2F2ZTogeygpOiBuZy5JUHJvbWlzZTx2b2lkPn0sIGNvbnRlbnRGb3JtPzogbmcuSUZvcm1Db250cm9sbGVyLCB2YWxpZGF0ZT86IHsoKTogYm9vbGVhbn0pOiBJQXV0b3NhdmVTZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0YXV0b3NhdmVTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW19fYXV0b3NhdmVBY3Rpb24uc2VydmljZU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGF1dG9zYXZlU2VydmljZUZhY3RvcnkoYXV0b3NhdmVTZXJ2aWNlOiBfX2F1dG9zYXZlQWN0aW9uLklBdXRvc2F2ZUFjdGlvblNlcnZpY2UpOiBJQXV0b3NhdmVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZShzYXZlOiB7ICgpOiBuZy5JUHJvbWlzZTx2b2lkPiB9LCBjb250ZW50Rm9ybT86IG5nLklGb3JtQ29udHJvbGxlciwgdmFsaWRhdGU/OiB7ICgpOiBib29sZWFuIH0pOiBJQXV0b3NhdmVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEF1dG9zYXZlU2VydmljZShhdXRvc2F2ZVNlcnZpY2UsIHNhdmUsIGNvbnRlbnRGb3JtLCB2YWxpZGF0ZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbX19hdXRvc2F2ZUFjdGlvbi5tb2R1bGVOYW1lXSlcclxuXHRcdC5mYWN0b3J5KGZhY3RvcnlOYW1lLCBhdXRvc2F2ZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIEZvcm1hdHMgYW5kIG9wdGlvbmFsbHkgdHJ1bmNhdGVzIGFuZCBlbGxpcHNpbW9ncmlmaWVzIGEgc3RyaW5nIGZvciBkaXNwbGF5IGluIGEgY2FyZCBoZWFkZXJcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL3NlcnZpY2VzL29iamVjdC9vYmplY3Quc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuZmlsdGVycy50cnVuY2F0ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX19vYmplY3QgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JqZWN0O1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5maWx0ZXJzLnRydW5jYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAndHJ1bmNhdGUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2VydmljZU5hbWUgKyAnRmlsdGVyJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0KGlucHV0Pzogc3RyaW5nLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdFx0KGlucHV0PzogbnVtYmVyLCB0cnVuY2F0ZVRvPzogbnVtYmVyLCBpbmNsdWRlRWxsaXBzZXM/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0dHJ1bmNhdGUuJGluamVjdCA9IFtfX29iamVjdC5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gdHJ1bmNhdGUob2JqZWN0VXRpbGl0eTogX19vYmplY3QuSU9iamVjdFV0aWxpdHkpOiBJVHJ1bmNhdGVGaWx0ZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIChpbnB1dD86IGFueSwgdHJ1bmNhdGVUbz86IG51bWJlciwgaW5jbHVkZUVsbGlwc2VzPzogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcblx0XHRcdGluY2x1ZGVFbGxpcHNlcyA9IGluY2x1ZGVFbGxpcHNlcyA9PSBudWxsID8gZmFsc2UgOiBpbmNsdWRlRWxsaXBzZXM7XHJcblxyXG5cdFx0XHR2YXIgb3V0OiBzdHJpbmcgPSBvYmplY3RVdGlsaXR5LmlzTnVsbE9yV2hpdGVzcGFjZShpbnB1dCkgPyAnJyA6IGlucHV0LnRvU3RyaW5nKCk7XHJcblx0XHRcdGlmIChvdXQubGVuZ3RoKSB7XHJcblx0XHRcdFx0aWYgKHRydW5jYXRlVG8gIT0gbnVsbCAmJiBvdXQubGVuZ3RoID4gdHJ1bmNhdGVUbykge1xyXG5cdFx0XHRcdFx0b3V0ID0gb3V0LnN1YnN0cmluZygwLCB0cnVuY2F0ZVRvKTtcclxuXHRcdFx0XHRcdGlmIChpbmNsdWRlRWxsaXBzZXMpIHtcclxuXHRcdFx0XHRcdFx0b3V0ICs9ICcuLi4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gb3V0O1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX29iamVjdC5tb2R1bGVOYW1lXSlcclxuXHRcdC5maWx0ZXIoc2VydmljZU5hbWUsIHRydW5jYXRlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5ib29sZWFuJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYm9vbGVhblV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCb29sZWFuVXRpbGl0eSB7XHJcblx0XHR0b0Jvb2wob2JqZWN0OiBhbnkpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQm9vbGVhblV0aWxpdHkgaW1wbGVtZW50cyBJQm9vbGVhblV0aWxpdHkge1xyXG5cdFx0dG9Cb29sKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiAhIW9iamVjdDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIEJvb2xlYW5VdGlsaXR5KTtcclxufVxyXG4iLCJtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbGc6IHN0cmluZyA9ICdsZyc7XHJcblx0ZXhwb3J0IHZhciBtZDogc3RyaW5nID0gJ21kJztcclxuXHRleHBvcnQgdmFyIHNtOiBzdHJpbmcgPSAnc20nO1xyXG5cdGV4cG9ydCB2YXIgeHM6IHN0cmluZyA9ICd4cyc7XHJcbn1cclxuIiwiLypcclxuICogSW1wbGVtZW50YXRpb24gYWxzbyByZXF1aXJlcyB0aGUgZm9sbG93aW5nIGVsZW1lbnRzIHRvIGJlIGluc2VydGVkIG9uIHRoZSBwYWdlOlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UteHMgdmlzaWJsZS14c1wiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2Utc20gdmlzaWJsZS1zbVwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbWQgdmlzaWJsZS1tZFwiPjwvZGl2PlxyXG4gKiAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbGcgdmlzaWJsZS1sZ1wiPjwvZGl2PlxyXG4gKi9cclxuXHJcbiBtb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWU6IHN0cmluZyA9ICd2aXNpYmxlQnJlYWtwb2ludCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZpc2libGVCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRpc1Zpc2libGUoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBWaXNpYmxlQnJlYWtwb2ludFNlcnZpY2UgaW1wbGVtZW50cyBJVmlzaWJsZUJyZWFrcG9pbnRTZXJ2aWNlIHtcclxuXHRcdGlzVmlzaWJsZShicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0Ly8ganF1ZXJ5IGdldHMgdGhlIGJyZWFrcG9pbnQgdHJpZ2dlciBkaXJlY3RpdmVzIGxpc3RlZCBhYm92ZSBvbiBsaW5lIDNcclxuXHRcdFx0cmV0dXJuICQoJy5kZXZpY2UtJyArIGJyZWFrcG9pbnQpLmlzKCc6dmlzaWJsZScpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZSc7XHJcblx0ZXhwb3J0IHZhciBmYWN0b3J5TmFtZTogc3RyaW5nID0gJ29ic2VydmFibGVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJV2F0Y2hlcjxUUmV0dXJuVHlwZT4ge1xyXG5cdFx0YWN0aW9uOiBJQWN0aW9uPFRSZXR1cm5UeXBlPjtcclxuXHRcdGV2ZW50Pzogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uPFRSZXR1cm5UeXBlPiB7XHJcblx0XHQoLi4ucGFyYW1zOiBhbnlbXSk6IFRSZXR1cm5UeXBlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVW5yZWdpc3RlckZ1bmN0aW9uIHtcclxuXHRcdCgpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogSUFjdGlvbjx2b2lkPiwgZXZlbnQ/OiBzdHJpbmcpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdFx0ZmlyZTxUUmV0dXJuVHlwZT4oZXZlbnQ/OiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBUUmV0dXJuVHlwZVtdO1xyXG5cdFx0ZmlyZShldmVudD86IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNlcnZpY2UgaW1wbGVtZW50cyBJT2JzZXJ2YWJsZVNlcnZpY2Uge1xyXG5cdFx0cHJpdmF0ZSB3YXRjaGVyczogSVdhdGNoZXI8YW55PltdID0gW107XHJcblx0XHRwcml2YXRlIG5leHRLZXk6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0cmVnaXN0ZXI8VFJldHVyblR5cGU+KGFjdGlvbjogSUFjdGlvbjxUUmV0dXJuVHlwZT4sIGV2ZW50Pzogc3RyaW5nKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdGlmICghXy5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3I6IHdhdGNoZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2N1cnJlbnRLZXldID0ge1xyXG5cdFx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0dGhpcy51bnJlZ2lzdGVyKGN1cnJlbnRLZXkpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZpcmU8VFJldHVyblR5cGU+KGV2ZW50Pzogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHJldHVybiBfKHRoaXMud2F0Y2hlcnMpLmZpbHRlcigod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHdhdGNoZXIgIT0gbnVsbCAmJiB3YXRjaGVyLmV2ZW50ID09PSBldmVudDtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm1hcCgod2F0Y2hlcjogSVdhdGNoZXI8VFJldHVyblR5cGU+KTogVFJldHVyblR5cGUgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB3YXRjaGVyLmFjdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xyXG5cdFx0XHR9KS52YWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdW5yZWdpc3RlcihrZXk6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0XHR0aGlzLndhdGNoZXJzW2tleV0gPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElPYnNlcnZhYmxlU2VydmljZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlU2VydmljZUZhY3RvcnkoKTogSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSU9ic2VydmFibGVTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE9ic2VydmFibGVTZXJ2aWNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgb2JzZXJ2YWJsZVNlcnZpY2VGYWN0b3J5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLndpbmRvdyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93JztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnd2luZG93Q29udHJvbCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdpbmRvd1NlcnZpY2Uge1xyXG5cdFx0cmVzaXplKGNhbGxiYWNrOiB7IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiBhbnkgfSk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBXaW5kb3dTZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgd2luZG93Q29udHJvbDogSlF1ZXJ5ID0gJCh3aW5kb3cpO1xyXG5cclxuXHRcdHJlc2l6ZShjYWxsYmFjazogeyAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogYW55IH0pOiB2b2lkIHtcclxuXHRcdFx0dGhpcy53aW5kb3dDb250cm9sLnJlc2l6ZShjYWxsYmFjayk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBXaW5kb3dTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYnJlYWtwb2ludHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3Zpc2libGVCcmVha3BvaW50cy5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYnNlcnZhYmxlL29ic2VydmFibGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vd2luZG93L3dpbmRvdy5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5icmVha3BvaW50cyB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRpbXBvcnQgX193aW5kb3cgPSBybC51dGlsaXRpZXMuc2VydmljZXMud2luZG93O1xyXG5cdGltcG9ydCBfX29ic2VydmFibGUgPSBybC51dGlsaXRpZXMuc2VydmljZXMub2JzZXJ2YWJsZTtcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmJyZWFrcG9pbnRzJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnYnJlYWtwb2ludHMnO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRjdXJyZW50QnJlYWtwb2ludDogc3RyaW5nO1xyXG5cdFx0aXNCcmVha3BvaW50KGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW47XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZH0pOiBfX29ic2VydmFibGUuSVVucmVnaXN0ZXJGdW5jdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBCcmVha3BvaW50U2VydmljZSBpbXBsZW1lbnRzIElCcmVha3BvaW50U2VydmljZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbdmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsICdyZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcycsIF9fd2luZG93LnNlcnZpY2VOYW1lLCBfX29ic2VydmFibGUuZmFjdG9yeU5hbWVdXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIHZpc2libGVCcmVha3BvaW50czogSVZpc2libGVCcmVha3BvaW50U2VydmljZVxyXG5cdFx0XHRcdCwgcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHM6IG51bWJlclxyXG5cdFx0XHRcdCwgd2luZG93U2VydmljZTogX193aW5kb3cuSVdpbmRvd1NlcnZpY2VcclxuXHRcdFx0XHQsIG9ic2VydmFibGVGYWN0b3J5OiBfX29ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlRmFjdG9yeSkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gdGhpcy5nZXRCcmVha3BvaW50KCk7XHJcblxyXG5cdFx0XHR0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdFx0dmFyIGVmZmljaWVudFJlc2l6ZTogeygpOiB2b2lkfSA9IF8uZGVib3VuY2UodGhpcy51cGRhdGVCcmVha3BvaW50LCByZXNpemVEZWJvdW5jZU1pbGxpc2Vjb25kcywge1xyXG5cdFx0XHRcdGxlYWRpbmc6IHRydWUsXHJcblx0XHRcdFx0dHJhaWxpbmc6IHRydWUsXHJcblx0XHRcdFx0bWF4V2FpdDogcmVzaXplRGVib3VuY2VNaWxsaXNlY29uZHMsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR3aW5kb3dTZXJ2aWNlLnJlc2l6ZShlZmZpY2llbnRSZXNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgb2JzZXJ2YWJsZTogX19vYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZTtcclxuXHRcdGN1cnJlbnRCcmVha3BvaW50OiBzdHJpbmc7XHJcblxyXG5cdFx0cHJpdmF0ZSBnZXRCcmVha3BvaW50KCk6IHN0cmluZyB7XHJcblx0XHRcdGlmICh0aGlzLnZpc2libGVCcmVha3BvaW50cy5pc1Zpc2libGUobGcpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGxnO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMudmlzaWJsZUJyZWFrcG9pbnRzLmlzVmlzaWJsZShtZCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbWQ7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy52aXNpYmxlQnJlYWtwb2ludHMuaXNWaXNpYmxlKHNtKSkge1xyXG5cdFx0XHRcdHJldHVybiBzbTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4geHM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpc0JyZWFrcG9pbnQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnRCcmVha3BvaW50ID09PSBicmVha3BvaW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyAoYnJlYWtwb2ludDogc3RyaW5nKTogdm9pZCB9KTogX19vYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vYnNlcnZhYmxlLnJlZ2lzdGVyKGFjdGlvbiwgJ3dpbmRvdy5icmVha3BvaW50Q2hhbmdlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgdXBkYXRlQnJlYWtwb2ludDogeygpOiB2b2lkfSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0dmFyIG5ld0JyZWFrUG9pbnQ6IHN0cmluZyA9IHRoaXMuZ2V0QnJlYWtwb2ludCgpO1xyXG5cclxuXHRcdFx0aWYgKG5ld0JyZWFrUG9pbnQgIT09IHRoaXMuY3VycmVudEJyZWFrcG9pbnQpIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gbmV3QnJlYWtQb2ludDtcclxuXHRcdFx0XHR0aGlzLm9ic2VydmFibGUuZmlyZSgnd2luZG93LmJyZWFrcG9pbnRDaGFuZ2VkJywgdGhpcy5jdXJyZW50QnJlYWtwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtfX3dpbmRvdy5tb2R1bGVOYW1lLCBfX29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuY29uc3RhbnQoJ3Jlc2l6ZURlYm91bmNlTWlsbGlzZWNvbmRzJywgNTAwKVxyXG5cdFx0LnNlcnZpY2UodmlzaWJsZUJyZWFrcG9pbnRzU2VydmljZU5hbWUsIFZpc2libGVCcmVha3BvaW50U2VydmljZSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBCcmVha3BvaW50U2VydmljZSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvanF1ZXJ5XHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5jb250ZW50UHJvdmlkZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmNvbnRlbnRQcm92aWRlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2NvbnRlbnRQcm92aWRlckZhY3RvcnknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdHNldENvbnRlbnQoY29udGVudDogSlF1ZXJ5KTogdm9pZDtcclxuXHRcdHNldFRyYW5zY2x1ZGVDb250ZW50KHRyYW5zY2x1ZGVGdW5jdGlvbjogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdGdldENvbnRlbnQoc2VsZWN0b3I/OiBzdHJpbmcpOiBKUXVlcnk7XHJcblx0XHRyZWdpc3RlcihhY3Rpb246IHsobmV3VGV4dDogSlF1ZXJ5KTogdm9pZH0sIHNlbGVjdG9yPzogc3RyaW5nKTogb2JzZXJ2YWJsZS5JVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgQ29udGVudFByb3ZpZGVyU2VydmljZSBpbXBsZW1lbnRzIElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdGNvbnN0cnVjdG9yKG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpIHtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG9ic2VydmFibGU6IG9ic2VydmFibGUuSU9ic2VydmFibGVTZXJ2aWNlO1xyXG5cdFx0cHJpdmF0ZSBjb250ZW50OiBKUXVlcnk7XHJcblxyXG5cdFx0c2V0Q29udGVudChjb250ZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdFx0dGhpcy5vYnNlcnZhYmxlLmZpcmUoJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VHJhbnNjbHVkZUNvbnRlbnQ6IHsodHJhbnNjbHVkZUZ1bmN0aW9uOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkfSA9ICh0cmFuc2NsdWRlRnVuY3Rpb246IG5nLklUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkID0+IHtcclxuXHRcdFx0aWYgKF8uaXNGdW5jdGlvbih0cmFuc2NsdWRlRnVuY3Rpb24pKSB7XHJcblx0XHRcdFx0dHJhbnNjbHVkZUZ1bmN0aW9uKChjbG9uZTogSlF1ZXJ5KTogdm9pZCA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNldENvbnRlbnQoY2xvbmUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0Q29udGVudChudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyKGFjdGlvbjogeyhuZXdDb250ZW50OiBKUXVlcnkpOiB2b2lkfSwgc2VsZWN0b3I/OiBzdHJpbmcpOiBvYnNlcnZhYmxlLklVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0XHRpZiAodGhpcy5jb250ZW50ICE9IG51bGwpIHtcclxuXHRcdFx0XHRhY3Rpb24odGhpcy5nZXRDb250ZW50KHNlbGVjdG9yKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmFibGUucmVnaXN0ZXIoKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGFjdGlvbih0aGlzLmdldENvbnRlbnQoc2VsZWN0b3IpKTtcclxuXHRcdFx0fSwgJ2NvbnRlbnRDaGFuZ2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q29udGVudChzZWxlY3Rvcj86IHN0cmluZyk6IEpRdWVyeSB7XHJcblx0XHRcdGlmIChzZWxlY3RvciAhPSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29udGVudC5maWx0ZXIoc2VsZWN0b3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSUNvbnRlbnRQcm92aWRlclNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRjb250ZW50UHJvdmlkZXJTZXJ2aWNlRmFjdG9yeS4kaW5qZWN0ID0gW29ic2VydmFibGUuZmFjdG9yeU5hbWVdO1xyXG5cdGZ1bmN0aW9uIGNvbnRlbnRQcm92aWRlclNlcnZpY2VGYWN0b3J5KG9ic2VydmFibGVGYWN0b3J5OiBvYnNlcnZhYmxlLklPYnNlcnZhYmxlU2VydmljZUZhY3RvcnkpOiBJQ29udGVudFByb3ZpZGVyU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEluc3RhbmNlKCk6IElDb250ZW50UHJvdmlkZXJTZXJ2aWNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbnRlbnRQcm92aWRlclNlcnZpY2Uob2JzZXJ2YWJsZUZhY3RvcnkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29ic2VydmFibGUubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgY29udGVudFByb3ZpZGVyU2VydmljZUZhY3RvcnkpO1xyXG59XHJcbiIsIm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMudGltZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMudGltZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3RpbWVVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVGltZVV0aWxpdHkge1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9TZWNvbmRzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9NaW51dGVzKG1pbGxpc2Vjb25kczogbnVtYmVyKTogbnVtYmVyO1xyXG5cdFx0bWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUaW1lVXRpbGl0eSB7XHJcblx0XHRtaWxsaXNlY29uZHNUb1NlY29uZHMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRtaWxsaXNlY29uZHNUb01pbnV0ZXMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvU2Vjb25kcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvSG91cnMobWlsbGlzZWNvbmRzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1pbGxpc2Vjb25kc1RvTWludXRlcyhtaWxsaXNlY29uZHMpIC8gNjApO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1pbGxpc2Vjb25kc1RvRGF5cyhtaWxsaXNlY29uZHM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMubWlsbGlzZWNvbmRzVG9Ib3VycyhtaWxsaXNlY29uZHMpIC8gMjQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuc2VydmljZShzZXJ2aWNlTmFtZSwgVGltZVV0aWxpdHkpO1xyXG59XHJcbiIsIlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5tb21lbnRXcmFwcGVyIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubW9tZW50V3JhcHBlcic7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ21vbWVudFdyYXBwZXInO1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbW9tZW50V3JhcHBlcigpOiB2b2lkIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHQvLyBVc2luZyBgYW55YCBpbnN0ZWFkIG9mIE1vbWVudFN0YXRpYyBiZWNhdXNlXHJcblx0XHQvLyAgY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgZG9lc24ndCBhcHBlYXIgdG8gYmVcclxuXHRcdC8vICBkZWZpbmVkIGluIE1vbWVudFN0YXRpYy4uLiA6LShcclxuXHRcdHZhciBtb21lbnRXcmFwcGVyOiBhbnkgPSBtb21lbnQ7IC8vIG1vbWVudCBtdXN0IGFscmVhZHkgYmUgbG9hZGVkXHJcblxyXG5cdFx0Ly8gU2V0IGRlZmF1bHQgbWV0aG9kIGZvciBoYW5kbGluZyBub24tSVNPIGRhdGUgY29udmVyc2lvbnMuXHJcblx0XHQvLyBTZWUgNC8yOCBjb21tZW50IGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3XHJcblx0XHQvLyBUaGlzIGFsc28gcHJldmVudHMgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cclxuXHRcdG1vbWVudFdyYXBwZXIuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSAoY29uZmlnOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdFx0Y29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pKTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1vbWVudFdyYXBwZXI7XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHQuZmFjdG9yeShzZXJ2aWNlTmFtZSwgbW9tZW50V3JhcHBlcik7XHJcblxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnR5cGVzLmNvbXBhcmVSZXN1bHQnO1xyXG5cclxuXHRleHBvcnQgZW51bSBDb21wYXJlUmVzdWx0IHtcclxuXHRcdGdyZWF0ZXIgPSAxLFxyXG5cdFx0ZXF1YWwgPSAwLFxyXG5cdFx0bGVzcyA9IC0xLFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBhcmVSZXN1bHQobnVtOiBudW1iZXIpOiBDb21wYXJlUmVzdWx0IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdGlmIChudW0gPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZXF1YWw7XHJcblx0XHR9IGVsc2UgaWYgKG51bSA+IDApIHtcclxuXHRcdFx0cmV0dXJuIENvbXBhcmVSZXN1bHQuZ3JlYXRlcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBDb21wYXJlUmVzdWx0Lmxlc3M7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdGltZS90aW1lLnNlcnZpY2UudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9tZW50L21vbWVudC5tb2R1bGUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwZXMvY29tcGFyZVJlc3VsdC50c1wiIC8+XHJcblxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0aW1wb3J0IGNvbXBhcmVSZXN1bHQgPSBybC51dGlsaXRpZXMudHlwZXMuY29tcGFyZVJlc3VsdDtcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9udGgge1xyXG5cdFx0bmFtZTogc3RyaW5nO1xyXG5cdFx0ZGF5cyh5ZWFyPzogbnVtYmVyKTogbnVtYmVyO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGF0ZVZhbHVlIHtcclxuXHRcdHllYXJzOiBudW1iZXI7XHJcblx0XHRtb250aHM6IG51bWJlcjtcclxuXHRcdGRheXM6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVVdGlsaXR5IHtcclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZztcclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlcjtcclxuXHRcdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWU7XHJcblx0XHRzdWJ0cmFjdERhdGVJbkRheXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IG51bWJlcjtcclxuXHRcdGNvbXBhcmVEYXRlcyhkYXRlMTogc3RyaW5nIHwgRGF0ZSwgZGF0ZTI6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQ7XHJcblx0XHRkYXRlSW5SYW5nZShkYXRlOiBzdHJpbmcgfCBEYXRlLCByYW5nZVN0YXJ0OiBzdHJpbmcgfCBEYXRlLCByYW5nZUVuZDogc3RyaW5nIHwgRGF0ZSk6IGJvb2xlYW47XHJcblx0XHRnZXREYXRlKGRhdGU6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBEYXRlO1xyXG5cdFx0Z2V0Tm93KCk6IERhdGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgRGF0ZVV0aWxpdHkge1xyXG5cdFx0c3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gW21vbWVudFdyYXBwZXIuc2VydmljZU5hbWUsIHRpbWUuc2VydmljZU5hbWVdO1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBtb21lbnQ6IG1vbWVudC5Nb21lbnRTdGF0aWMsIHByaXZhdGUgdGltZTogdGltZS5JVGltZVV0aWxpdHkpIHtcclxuXHRcdFx0dGhpcy5tb250aCA9IFtcclxuXHRcdFx0XHR7IG5hbWU6ICdKYW51YXJ5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0ZlYnJ1YXJ5JywgZGF5czogKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7IHJldHVybiB0aGlzLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4OyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWFyY2gnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnQXByaWwnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTWF5JywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMTsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0p1bmUnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnSnVseScsIGRheXM6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMzE7IH0gfSxcclxuXHRcdFx0XHR7IG5hbWU6ICdBdWd1c3QnLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnU2VwdGVtYmVyJywgZGF5czogKCk6IG51bWJlciA9PiB7IHJldHVybiAzMDsgfSB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ09jdG9iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnTm92ZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMwOyB9IH0sXHJcblx0XHRcdFx0eyBuYW1lOiAnRGVjZW1iZXInLCBkYXlzOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDMxOyB9IH0sXHJcblx0XHRcdF07XHJcblx0XHR9XHJcblxyXG5cdFx0bW9udGg6IElNb250aFtdO1xyXG5cdFx0cHJpdmF0ZSBiYXNlRm9ybWF0OiBzdHJpbmcgPSAnTU0tREQtWVlZWSc7XHJcblxyXG5cdFx0cHJpdmF0ZSBpc0xlYXBZZWFyKHllYXI/OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKHllYXIsIDEsIDI5KS5nZXRNb250aCgpID09PSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEZ1bGxTdHJpbmcobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5uYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldERheXMobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vbnRoW21vbnRoXS5kYXlzKHllYXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnRyYWN0RGF0ZXMoc3RhcnQ6IHN0cmluZyB8IERhdGUsIGVuZDogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IElEYXRlVmFsdWUge1xyXG5cdFx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRcdHZhciByZXN1bHQ6IElEYXRlVmFsdWUgPSA8YW55Pnt9O1xyXG5cdFx0XHRyZXN1bHQuZGF5cyA9IGVuZERhdGUuZ2V0RGF0ZSgpIC0gc3RhcnREYXRlLmdldERhdGUoKTtcclxuXHRcdFx0cmVzdWx0LnllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRcdHJlc3VsdC5tb250aHMgPSBlbmREYXRlLmdldE1vbnRoKCkgLSBzdGFydERhdGUuZ2V0TW9udGgoKTtcclxuXHJcblx0XHRcdGlmIChyZXN1bHQuZGF5cyA8IDApIHtcclxuXHRcdFx0XHRyZXN1bHQubW9udGhzIC09IDE7XHJcblx0XHRcdFx0cmVzdWx0LmRheXMgKz0gdGhpcy5nZXREYXlzKHN0YXJ0RGF0ZS5nZXRNb250aCgpLCBzdGFydERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyZXN1bHQubW9udGhzIDwgMCkge1xyXG5cdFx0XHRcdHJlc3VsdC55ZWFycyAtPSAxO1xyXG5cdFx0XHRcdHJlc3VsdC5tb250aHMgKz0gMTI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VidHJhY3REYXRlSW5EYXlzKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUsIGRhdGVGb3JtYXQ/OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRpZiAoc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3RhcnREYXRlOiBEYXRlID0gdGhpcy5nZXREYXRlKHN0YXJ0LCBkYXRlRm9ybWF0KTtcclxuXHRcdFx0dmFyIGVuZERhdGU6IERhdGUgPSB0aGlzLmdldERhdGUoZW5kLCBkYXRlRm9ybWF0KTtcclxuXHJcblx0XHRcdHZhciBtaWxsaXNlY29uZHM6IG51bWJlciA9IGVuZERhdGUuZ2V0VGltZSgpIC0gc3RhcnREYXRlLmdldFRpbWUoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnRpbWUubWlsbGlzZWNvbmRzVG9EYXlzKG1pbGxpc2Vjb25kcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29tcGFyZURhdGVzKGRhdGUxOiBzdHJpbmcgfCBEYXRlLCBkYXRlMjogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IGNvbXBhcmVSZXN1bHQuQ29tcGFyZVJlc3VsdCB7XHJcblx0XHRcdC8vIHN1YnRyYWN0RGF0ZUluRGF5cyBzdWJ0cmFjdHMgdGhlIGZpc3QgZnJvbSB0aGUgc2Vjb25kLCBhc3N1bWluZyBzdGFydCBhbmQgZW5kIGRhdGVzXHJcblx0XHRcdHZhciBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnN1YnRyYWN0RGF0ZUluRGF5cyhkYXRlMiwgZGF0ZTEsIGRhdGVGb3JtYXQpO1xyXG5cdFx0XHRyZXR1cm4gY29tcGFyZVJlc3VsdC5nZXRDb21wYXJlUmVzdWx0KGRpZmZlcmVuY2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRhdGVJblJhbmdlKGRhdGU6IHN0cmluZyB8IERhdGUsIHJhbmdlU3RhcnQ6IHN0cmluZyB8IERhdGUsIHJhbmdlRW5kOiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLmNvbXBhcmVEYXRlcyhkYXRlLCByYW5nZVN0YXJ0KSA9PT0gY29tcGFyZVJlc3VsdC5Db21wYXJlUmVzdWx0Lmxlc3MpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jb21wYXJlRGF0ZXMoZGF0ZSwgcmFuZ2VFbmQpID09PSBjb21wYXJlUmVzdWx0LkNvbXBhcmVSZXN1bHQuZ3JlYXRlcikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldERhdGUoZGF0ZTogc3RyaW5nIHwgRGF0ZSwgZGF0ZUZvcm1hdD86IHN0cmluZyk6IERhdGUge1xyXG5cdFx0XHR2YXIgZm9ybWF0OiBzdHJpbmcgPSBkYXRlRm9ybWF0ICE9IG51bGwgPyBkYXRlRm9ybWF0IDogdGhpcy5iYXNlRm9ybWF0O1xyXG5cclxuXHRcdFx0aWYgKF8uaXNEYXRlKGRhdGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDxEYXRlPmRhdGU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubW9tZW50KDxzdHJpbmc+ZGF0ZSwgZm9ybWF0KS50b0RhdGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdldE5vdygpOiBEYXRlIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgZGF0ZVRpbWVGb3JtYXRTZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2RhdGVUaW1lRm9ybWF0U3RyaW5ncyc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSURhdGVGb3JtYXRTdHJpbmdzIHtcclxuXHRcdGRhdGVUaW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0XHRkYXRlRm9ybWF0OiBzdHJpbmc7XHJcblx0XHR0aW1lRm9ybWF0OiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIGRlZmF1bHRGb3JtYXRzOiBJRGF0ZUZvcm1hdFN0cmluZ3MgPSB7XHJcblx0XHRkYXRlVGltZUZvcm1hdDogJ00vRC9ZWVlZIGg6bW0gQScsXHJcblx0XHRkYXRlRm9ybWF0OiAnTS9EL1lZWVknLFxyXG5cdFx0dGltZUZvcm1hdDogJ2g6bW1BJyxcclxuXHR9O1xyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J2RhdGUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZVRpbWVGb3JtYXRTdHJpbmdzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi90aW1lL3RpbWUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vbW9tZW50L21vbWVudC5tb2R1bGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmRhdGUge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5zZXJ2aWNlcy5kYXRlJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnZGF0ZVV0aWxpdHknO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbbW9tZW50V3JhcHBlci5tb2R1bGVOYW1lLCB0aW1lLm1vZHVsZU5hbWVdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIERhdGVVdGlsaXR5KVxyXG5cdFx0LnZhbHVlKGRhdGVUaW1lRm9ybWF0U2VydmljZU5hbWUsIGRlZmF1bHRGb3JtYXRzKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm51bWJlciB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubnVtYmVyJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbnVtYmVyVXRpbGl0eSc7XHJcblxyXG5cdGVudW0gU2lnbiB7XHJcblx0XHRwb3NpdGl2ZSA9IDEsXHJcblx0XHRuZWdhdGl2ZSA9IC0xLFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXI7XHJcblx0XHRpbnRlZ2VyRGl2aWRlKGRpdmlkZW5kOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlcik6IG51bWJlcjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE51bWJlclV0aWxpdHkgaW1wbGVtZW50cyBJTnVtYmVyVXRpbGl0eSB7XHJcblx0XHRwcmVjaXNlUm91bmQobnVtOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHR2YXIgc2lnbjogU2lnbiA9IG51bSA+PSAwID8gU2lnbi5wb3NpdGl2ZSA6IFNpZ24ubmVnYXRpdmU7XHJcblx0XHRcdHJldHVybiAoTWF0aC5yb3VuZCgobnVtICogTWF0aC5wb3coMTAsIGRlY2ltYWxzKSkgKyAoPG51bWJlcj5zaWduICogMC4wMDEpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFscykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGludGVnZXJEaXZpZGUoZGl2aWRlbmQ6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIE51bWJlclV0aWxpdHkpO1xyXG59XHJcbiIsIlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmZpbGVTaXplIHtcclxuXHRleHBvcnQgdmFyIGZhY3RvcnlOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemVGYWN0b3J5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRmlsZVNpemUge1xyXG5cdFx0ZGlzcGxheSgpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBGaWxlU2l6ZVNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVNpemUge1xyXG5cdFx0QllURVNfUEVSX0dCOiBudW1iZXIgPSAxMDczNzQxODI0O1xyXG5cdFx0QllURVNfUEVSX01COiBudW1iZXIgPSAxMDQ4NTc2O1xyXG5cdFx0QllURVNfUEVSX0tCOiBudW1iZXIgPSAxMDI0O1xyXG5cclxuXHRcdGJ5dGVzOiBudW1iZXI7XHJcblxyXG5cdFx0R0I6IG51bWJlcjtcclxuXHRcdGlzR0I6IGJvb2xlYW47XHJcblxyXG5cdFx0TUI6IG51bWJlcjtcclxuXHRcdGlzTUI6IGJvb2xlYW47XHJcblxyXG5cdFx0S0I6IG51bWJlcjtcclxuXHRcdGlzS0I6IGJvb2xlYW47XHJcblxyXG5cdFx0Y29uc3RydWN0b3IobnVtYmVyVXRpbGl0eTogbnVtYmVyLklOdW1iZXJVdGlsaXR5LCBieXRlczogbnVtYmVyKSB7XHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBieXRlcztcclxuXHJcblx0XHRcdGlmIChieXRlcyA+PSB0aGlzLkJZVEVTX1BFUl9HQikge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5HQiA9IGJ5dGVzIC8gdGhpcy5CWVRFU19QRVJfR0I7XHJcblx0XHRcdFx0dGhpcy5HQiA9IG51bWJlclV0aWxpdHkucHJlY2lzZVJvdW5kKHRoaXMuR0IsIDEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaXNHQiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoYnl0ZXMgPj0gdGhpcy5CWVRFU19QRVJfTUIpIHtcclxuXHRcdFx0XHRcdHRoaXMuaXNNQiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLk1CID0gYnl0ZXMgLyB0aGlzLkJZVEVTX1BFUl9NQjtcclxuXHRcdFx0XHRcdHRoaXMuTUIgPSBudW1iZXJVdGlsaXR5LnByZWNpc2VSb3VuZCh0aGlzLk1CLCAxKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5pc01CID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJ5dGVzID49IHRoaXMuQllURVNfUEVSX0tCKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaXNLQiA9IHRydWU7XHJcblx0XHRcdFx0XHRcdHRoaXMuS0IgPSBieXRlcyAvIHRoaXMuQllURVNfUEVSX0tCO1xyXG5cdFx0XHRcdFx0XHR0aGlzLktCID0gbnVtYmVyVXRpbGl0eS5wcmVjaXNlUm91bmQodGhpcy5LQiwgMSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzS0IgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYnl0ZXMgPSBNYXRoLnJvdW5kKHRoaXMuYnl0ZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpc3BsYXkoKTogc3RyaW5nIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNHQikge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLkdCICsgJyBHQic7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5pc01CKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuTUIgKyAnIE1CJztcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmlzS0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5LQiArICcgS0InO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmJ5dGVzICsgJyBieXRlcyc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbGVTaXplRmFjdG9yeSB7XHJcblx0XHRnZXRJbnN0YW5jZShieXRlczogbnVtYmVyKTogSUZpbGVTaXplO1xyXG5cdH1cclxuXHJcblx0ZmlsZVNpemVGYWN0b3J5LiRpbmplY3QgPSBbbnVtYmVyLnNlcnZpY2VOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGYWN0b3J5KG51bWJlclV0aWxpdHk6IG51bWJlci5JTnVtYmVyVXRpbGl0eSk6IElGaWxlU2l6ZUZhY3Rvcnkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoYnl0ZXM6IG51bWJlcik6IElGaWxlU2l6ZSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBGaWxlU2l6ZVNlcnZpY2UobnVtYmVyVXRpbGl0eSwgYnl0ZXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLy8gRm9ybWF0cyBhbmQgb3B0aW9uYWxseSB0cnVuY2F0ZXMgYW5kIGVsbGlwc2ltb2dyaWZpZXMgYSBzdHJpbmcgZm9yIGRpc3BsYXkgaW4gYSBjYXJkIGhlYWRlclxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZmlsZVNpemUuc2VydmljZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMuZmlsZVNpemUge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBzaW1wbGVGaWx0ZXJOYW1lOiBzdHJpbmcgPSAnZmlsZVNpemUnO1xyXG5cdGV4cG9ydCB2YXIgZmlsdGVyTmFtZTogc3RyaW5nID0gc2ltcGxlRmlsdGVyTmFtZSArICdGaWx0ZXInO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElGaWxlU2l6ZUZpbHRlciB7XHJcblx0XHQoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRmaWxlU2l6ZUZpbHRlci4kaW5qZWN0ID0gW2ZhY3RvcnlOYW1lXTtcclxuXHRleHBvcnQgZnVuY3Rpb24gZmlsZVNpemVGaWx0ZXIoZmlsZVNpemVGYWN0b3J5OiBJRmlsZVNpemVGYWN0b3J5KTogSUZpbGVTaXplRmlsdGVyIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdHJldHVybiAoYnl0ZXM/OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG5cdFx0XHR2YXIgZmlsZVNpemU6IElGaWxlU2l6ZSA9IGZpbGVTaXplRmFjdG9yeS5nZXRJbnN0YW5jZShieXRlcyk7XHJcblx0XHRcdHJldHVybiBmaWxlU2l6ZS5kaXNwbGF5KCk7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9udW1iZXIvbnVtYmVyLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbGVTaXplRmlsdGVyLnRzJyAvPlxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybDIxLnV0aWxpdGllcy5zZXJ2aWNlcy5maWxlU2l6ZSc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtudW1iZXIubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZmlsZVNpemVGYWN0b3J5KVxyXG5cdFx0LmZpbHRlcihzaW1wbGVGaWx0ZXJOYW1lLCBmaWxlU2l6ZUZpbHRlcik7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5zdHJpbmcge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnN0cmluZyc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3N0cmluZ1V0aWxpdHlTZXJ2aWNlJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXI7XHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbjtcclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmc7XHJcblx0XHRyZXBsYWNlQWxsKHN0cjogc3RyaW5nLCBwYXR0ZXJuVG9GaW5kOiBzdHJpbmcsIHJlcGxhY2VtZW50U3RyaW5nOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgU3RyaW5nVXRpbGl0eVNlcnZpY2UgaW1wbGVtZW50cyBJU3RyaW5nVXRpbGl0eVNlcnZpY2Uge1xyXG5cdFx0dG9OdW1iZXIoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gK3N0cmluZztcclxuXHRcdH1cclxuXHJcblx0XHRjb250YWlucyhzdHI6IHN0cmluZywgc3Vic3RyaW5nPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChzdWJzdHJpbmcpIHtcclxuXHRcdFx0XHRyZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1YnN0aXR1dGUoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIC4uLnBhcmFtczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG5cdFx0XHRfLmVhY2gocGFyYW1zLCAocGFyYW06IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGZvcm1hdFN0cmluZyA9IHRoaXMucmVwbGFjZUFsbChmb3JtYXRTdHJpbmcsICdcXFxceycgKyBpbmRleCArICdcXFxcfScsIHBhcmFtKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZUFsbChzdHI6IHN0cmluZywgcGF0dGVyblRvRmluZDogc3RyaW5nLCByZXBsYWNlbWVudFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocGF0dGVyblRvRmluZCwgJ2dpJyksIHJlcGxhY2VtZW50U3RyaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBTdHJpbmdVdGlsaXR5U2VydmljZSk7XHJcbn1cclxuIiwibW9kdWxlIHJsLnV0aWxpdGllcy5maWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmZpbHRlcic7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlcldpdGhDb3VudHMgZXh0ZW5kcyBJRmlsdGVyIHtcclxuXHRcdHVwZGF0ZU9wdGlvbkNvdW50czxUSXRlbVR5cGU+KGRhdGE6IFRJdGVtVHlwZVtdKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmc7XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9vYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3N0cmluZy9zdHJpbmcuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vZmlsdGVycy9maWx0ZXIudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmdlbmVyaWNTZWFyY2hGaWx0ZXInO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICdnZW5lcmljU2VhcmNoRmlsdGVyRmFjdG9yeSc7XHJcblx0ZXhwb3J0IHZhciBmaWx0ZXJOYW1lOiBzdHJpbmcgPSAnc2VhcmNoJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJR2VuZXJpY1NlYXJjaEZpbHRlciBleHRlbmRzIGZpbHRlci5JRmlsdGVyIHtcclxuXHRcdHR5cGU6IHN0cmluZztcclxuXHRcdHNlYXJjaFRleHQ6IHN0cmluZztcclxuXHRcdGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XHJcblx0XHRmaWx0ZXI8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUpOiBib29sZWFuO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBJR2VuZXJpY1NlYXJjaEZpbHRlciB7XHJcblx0XHR0eXBlOiBzdHJpbmcgPSBmaWx0ZXJOYW1lO1xyXG5cdFx0c2VhcmNoVGV4dDogc3RyaW5nO1xyXG5cdFx0Y2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgb2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksIHByaXZhdGUgc3RyaW5nOiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKSB7fVxyXG5cclxuXHRcdGZpbHRlcjxUSXRlbVR5cGU+KGl0ZW06IFRJdGVtVHlwZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5vYmplY3QuaXNOdWxsT3JFbXB0eSh0aGlzLnNlYXJjaFRleHQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnNlYXJjaE9iamVjdChpdGVtLCB0aGlzLnNlYXJjaFRleHQsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzZWFyY2hPYmplY3Q8VEl0ZW1UeXBlPihpdGVtOiBUSXRlbVR5cGUsIHNlYXJjaDogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChfLmlzT2JqZWN0KGl0ZW0pKSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlczogYW55ID0gXy52YWx1ZXMoaXRlbSk7XHJcblx0XHRcdFx0cmV0dXJuIF8uYW55KHZhbHVlcywgKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHsgcmV0dXJuIHRoaXMuc2VhcmNoT2JqZWN0KHZhbHVlLCBzZWFyY2gsIGNhc2VTZW5zaXRpdmUpOyB9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZGF0YVN0cmluZzogc3RyaW5nID0gdGhpcy5vYmplY3QudG9TdHJpbmcoaXRlbSk7XHJcblxyXG5cdFx0XHRcdGlmICghY2FzZVNlbnNpdGl2ZSkge1xyXG5cdFx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHRkYXRhU3RyaW5nID0gZGF0YVN0cmluZy50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3RyaW5nLmNvbnRhaW5zKGRhdGFTdHJpbmcsIHNlYXJjaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHRcdGdldEluc3RhbmNlKCk6IElHZW5lcmljU2VhcmNoRmlsdGVyO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkuJGluamVjdCA9IFtvYmplY3Quc2VydmljZU5hbWUsIHN0cmluZy5zZXJ2aWNlTmFtZV07XHJcblx0ZnVuY3Rpb24gZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3Rvcnkob2JqZWN0OiBvYmplY3QuSU9iamVjdFV0aWxpdHksXHJcblx0XHRzdHJpbmdVdGlsaXR5OiBzdHJpbmcuSVN0cmluZ1V0aWxpdHlTZXJ2aWNlKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXJGYWN0b3J5IHtcclxuXHJcblx0XHQndXNlIHN0cmljdCc7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0SW5zdGFuY2UoKTogSUdlbmVyaWNTZWFyY2hGaWx0ZXIge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgR2VuZXJpY1NlYXJjaEZpbHRlcihvYmplY3QsIHN0cmluZ1V0aWxpdHkpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW29iamVjdC5tb2R1bGVOYW1lLCBzdHJpbmcubW9kdWxlTmFtZV0pXHJcblx0XHQuZmFjdG9yeShmYWN0b3J5TmFtZSwgZ2VuZXJpY1NlYXJjaEZpbHRlckZhY3RvcnkpO1xyXG59XHJcbiIsIi8vIHVzZXMgdHlwaW5ncy9hbmd1bGFyanNcclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5qcXVlcnkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLmpxdWVyeSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ2pxdWVyeVV0aWxpdHknO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnRzOiBKUXVlcnkpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0Y2xhc3MgSlF1ZXJ5VXRpbGl0eSBpbXBsZW1lbnRzIElKUXVlcnlVdGlsaXR5IHtcclxuXHRcdHJlcGxhY2VDb250ZW50KGNvbnRlbnRBcmVhOiBKUXVlcnksIG5ld0NvbnRlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG5cdFx0XHRjb250ZW50QXJlYS5lbXB0eSgpO1xyXG5cdFx0XHRjb250ZW50QXJlYS5hcHBlbmQobmV3Q29udGVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuXHRcdC5zZXJ2aWNlKHNlcnZpY2VOYW1lLCBKUXVlcnlVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMubm90aWZpY2F0aW9uJztcclxuXHRleHBvcnQgdmFyIHNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnbm90aWZpY2F0aW9uJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpZXIge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0aW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0d2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHRcdHN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSU5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmllcjogSU5vdGlmaWVyKSB7fVxyXG5cclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuaW5mbyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHR3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmaWVyLndhcm5pbmcobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZpZXIuZXJyb3IobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0dGhpcy5ub3RpZmllci5zdWNjZXNzKG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgbmcuSVNlcnZpY2VQcm92aWRlciB7XHJcblx0XHRzZXROb3RpZmllcihub3RpZmllcjogSU5vdGlmaWVyKTogdm9pZDtcclxuXHRcdCRnZXQoKTogSU5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbm90aWZpY2F0aW9uU2VydmljZVByb3ZpZGVyKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlUHJvdmlkZXIge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5vdGlmaWVyOiBuZXcgQmFzZU5vdGlmaWVyKCksXHJcblx0XHRcdHNldE5vdGlmaWVyOiAobm90aWZpZXI6IElOb3RpZmllcik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuXHRcdFx0fSxcclxuXHRcdFx0JGdldDogKCk6IElOb3RpZmljYXRpb25TZXJ2aWNlID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IE5vdGlmaWNhdGlvblNlcnZpY2UodGhpcy5ub3RpZmllcik7XHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQucHJvdmlkZXIoc2VydmljZU5hbWUsIG5vdGlmaWNhdGlvblNlcnZpY2VQcm92aWRlcik7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLm5vdGlmaWNhdGlvbiB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQmFzZU5vdGlmaWVyIGltcGxlbWVudHMgSU5vdGlmaWVyIHtcclxuXHRcdGluZm8obWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRcdHRoaXMubm90aWZ5KG1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLm5vdGlmeShtZXNzYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0d2luZG93LmFsZXJ0KG1lc3NhZ2UpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy5wYXJlbnRDaGlsZEJlaGF2aW9yIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsMjEudXRpbGl0aWVzLnNlcnZpY2VzLnBhcmVudENoaWxkQmVoYXZpb3InO1xyXG5cdGV4cG9ydCB2YXIgc2VydmljZU5hbWU6IHN0cmluZyA9ICdwYXJlbnRDaGlsZEJlaGF2aW9yJztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVmlld0RhdGE8VEJlaGF2aW9yPiB7XHJcblx0XHRiZWhhdmlvcjogVEJlaGF2aW9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQ2hpbGQ8VEJlaGF2aW9yPiB7XHJcblx0XHR2aWV3RGF0YT86IElWaWV3RGF0YTxUQmVoYXZpb3I+O1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUGFyZW50Q2hpbGRCZWhhdmlvclNlcnZpY2Uge1xyXG5cdFx0Z2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkOiBJQ2hpbGQ8VEJlaGF2aW9yPik6IFRCZWhhdmlvcjtcclxuXHRcdHRyaWdnZXJDaGlsZEJlaGF2aW9yPFRCZWhhdmlvciwgVFJldHVyblR5cGU+KGNoaWxkOiBJQ2hpbGQ8YW55PlxyXG5cdFx0XHQsIGFjdGlvbjogeyAoYmVoYXZpb3I6IFRCZWhhdmlvcik6IFRSZXR1cm5UeXBlIH0pOiBUUmV0dXJuVHlwZTtcclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXTtcclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW107XHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlIHtcclxuXHRcdGdldENoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4pOiBUQmVoYXZpb3Ige1xyXG5cdFx0XHRyZXR1cm4gY2hpbGQgJiYgY2hpbGQudmlld0RhdGEgIT0gbnVsbFxyXG5cdFx0XHRcdD8gY2hpbGQudmlld0RhdGEuYmVoYXZpb3JcclxuXHRcdFx0XHQ6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yLCBUUmV0dXJuVHlwZT4oY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+XHJcblx0XHRcdCwgYWN0aW9uOiB7IChiZWhhdmlvcjogVEJlaGF2aW9yKTogVFJldHVyblR5cGUgfSk6IFRSZXR1cm5UeXBlIHtcclxuXHRcdFx0dmFyIGJlaGF2aW9yOiBUQmVoYXZpb3IgPSB0aGlzLmdldENoaWxkQmVoYXZpb3IoY2hpbGQpO1xyXG5cclxuXHRcdFx0aWYgKGJlaGF2aW9yID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYWN0aW9uKGJlaGF2aW9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRyaWdnZXJBbGxDaGlsZEJlaGF2aW9yczxUQmVoYXZpb3IsIFRSZXR1cm5UeXBlPihjaGlsZExpc3Q6IElDaGlsZDxUQmVoYXZpb3I+W11cclxuXHRcdFx0LCBhY3Rpb246IHsgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSB9KTogVFJldHVyblR5cGVbXSB7XHJcblx0XHRcdHZhciBiZWhhdmlvcnM6IFRCZWhhdmlvcltdID0gdGhpcy5nZXRBbGxDaGlsZEJlaGF2aW9ycyhjaGlsZExpc3QpO1xyXG5cclxuXHRcdFx0cmV0dXJuIF8ubWFwKGJlaGF2aW9ycywgKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBUUmV0dXJuVHlwZSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbihiZWhhdmlvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldEFsbENoaWxkQmVoYXZpb3JzPFRCZWhhdmlvcj4oY2hpbGRMaXN0OiBJQ2hpbGQ8VEJlaGF2aW9yPltdKTogVEJlaGF2aW9yW10ge1xyXG5cdFx0XHRyZXR1cm4gXyhjaGlsZExpc3QpLm1hcCgoY2hpbGQ6IElDaGlsZDxUQmVoYXZpb3I+KTogVEJlaGF2aW9yID0+IHsgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCZWhhdmlvcjxUQmVoYXZpb3I+KGNoaWxkKTsgfSlcclxuXHRcdFx0XHRcdFx0XHRcdC5maWx0ZXIoKGJlaGF2aW9yOiBUQmVoYXZpb3IpOiBib29sZWFuID0+IHsgcmV0dXJuIGJlaGF2aW9yICE9IG51bGw7IH0pXHJcblx0XHRcdFx0XHRcdFx0XHQudmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZWdpc3RlckNoaWxkQmVoYXZpb3I8VEJlaGF2aW9yPihjaGlsZDogSUNoaWxkPFRCZWhhdmlvcj4sIGJlaGF2aW9yOiBUQmVoYXZpb3IpOiB2b2lkIHtcclxuXHRcdFx0aWYgKGNoaWxkID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGlsZC52aWV3RGF0YSA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEgPSB7IGJlaGF2aW9yOiBudWxsIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjdXJyZW50QmVoYXZpb3I6IFRCZWhhdmlvciA9IGNoaWxkLnZpZXdEYXRhLmJlaGF2aW9yO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRCZWhhdmlvciA9PSBudWxsKSB7XHJcblx0XHRcdFx0Y2hpbGQudmlld0RhdGEuYmVoYXZpb3IgPSBiZWhhdmlvcjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZC52aWV3RGF0YS5iZWhhdmlvciA9IDxUQmVoYXZpb3I+Xy5leHRlbmQoY3VycmVudEJlaGF2aW9yLCBiZWhhdmlvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFBhcmVudENoaWxkQmVoYXZpb3JTZXJ2aWNlKTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMucHJvbWlzZSc7XHJcblx0ZXhwb3J0IHZhciBzZXJ2aWNlTmFtZTogc3RyaW5nID0gJ3Byb21pc2VVdGlsaXR5JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVV0aWxpdHkge1xyXG5cdFx0aXNQcm9taXNlKHByb21pc2U6IGFueSk6IGJvb2xlYW47XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogbmcuSVByb21pc2U8YW55Pik6IGJvb2xlYW47XHJcblx0fVxyXG5cclxuXHRjbGFzcyBQcm9taXNlVXRpbGl0eSBpbXBsZW1lbnRzIElQcm9taXNlVXRpbGl0eSB7XHJcblx0XHRpc1Byb21pc2UocHJvbWlzZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBfLmlzT2JqZWN0KHByb21pc2UpICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLnRoZW4pICYmIF8uaXNGdW5jdGlvbihwcm9taXNlLmNhdGNoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LnNlcnZpY2Uoc2VydmljZU5hbWUsIFByb21pc2VVdGlsaXR5KTtcclxufVxyXG4iLCIvLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcbi8vIHVzZXMgdHlwaW5ncy9sb2Rhc2hcclxuLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJNb2Nrc1xyXG5cclxubW9kdWxlIHJsLnV0aWxpdGllcy5zZXJ2aWNlcy50ZXN0IHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0Y29udHJvbGxlcjogVENvbnRyb2xsZXJUeXBlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdGRpcmVjdGl2ZTogYW5ndWxhci5JRGlyZWN0aXZlO1xyXG5cdFx0c2NvcGU6IGFuZ3VsYXIuSVNjb3BlO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJQW5ndWxhckZpeHR1cmUge1xyXG5cdFx0aW5qZWN0OiAoLi4uc2VydmljZU5hbWVzOiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFx0bW9jazogKG1vY2tzOiBhbnkpID0+IHZvaWQ7XHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT47XHJcblx0XHRkaXJlY3RpdmU6IChkb206IHN0cmluZykgPT4gSURpcmVjdGl2ZVJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGNsYXNzIEFuZ3VsYXJGaXh0dXJlIGltcGxlbWVudHMgSUFuZ3VsYXJGaXh0dXJlIHtcclxuXHRcdGluamVjdCguLi5zZXJ2aWNlTmFtZXM6IHN0cmluZ1tdKTogT2JqZWN0IHtcclxuXHRcdFx0Ly8gb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBvZiB0aGUgc2VydmljZXMgcmVxdWVzdGVkXHJcblx0XHRcdHZhciBzZXJ2aWNlczogT2JqZWN0ID0ge307XHJcblxyXG5cdFx0XHQvLyBjbG9uZSB0aGUgYXJyYXkgYW5kIGFkZCBhIGZ1bmN0aW9uIHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgb3JpZ2luYWwgYXJyYXlcclxuXHRcdFx0Ly8gdGhpcyBhdm9pZHMgaXRlcmF0aW5nIG92ZXIgdGhlIGZ1bmN0aW9uIGl0c2VsZlxyXG5cdFx0XHR2YXIgaW5qZWN0UGFyYW1ldGVyczogYW55W10gPSBfLmNsb25lKHNlcnZpY2VOYW1lcyk7XHJcblx0XHRcdGluamVjdFBhcmFtZXRlcnMucHVzaCgoLi4uaW5qZWN0ZWRTZXJ2aWNlczogYW55W10pID0+IHtcclxuXHRcdFx0XHQvLyBzaG91bGQgZ2V0IGNhbGxlZCB3aXRoIHRoZSBzZXJ2aWNlcyBpbmplY3RlZCBieSBhbmd1bGFyXHJcblx0XHRcdFx0Ly8gd2UnbGwgYWRkIHRoZXNlIHRvIHNlcnZpY2VzIHVzaW5nIHRoZSBzZXJ2aWNlTmFtZSBhcyB0aGUga2V5XHJcblx0XHRcdFx0Xy5lYWNoKHNlcnZpY2VOYW1lcywgKHNlcnZpY2U6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdFx0c2VydmljZXNbc2VydmljZV0gPSBpbmplY3RlZFNlcnZpY2VzW2luZGV4XTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhbmd1bGFyLm1vY2suaW5qZWN0KGluamVjdFBhcmFtZXRlcnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vY2sobW9ja3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRhbmd1bGFyLm1vY2subW9kdWxlKCgkcHJvdmlkZTogYW5ndWxhci5hdXRvLklQcm92aWRlU2VydmljZSkgPT4ge1xyXG5cdFx0XHRcdF8uZWFjaChtb2NrcywgKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0XHQkcHJvdmlkZS52YWx1ZShrZXkudG9TdHJpbmcoKSwgdmFsdWUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250cm9sbGVyPFRDb250cm9sbGVyVHlwZT4oY29udHJvbGxlck5hbWU6IHN0cmluZywgc2NvcGU/OiBhbnksIGxvY2Fscz86IGFueSk6IElDb250cm9sbGVyUmVzdWx0PFRDb250cm9sbGVyVHlwZT4ge1xyXG5cdFx0XHR2YXIgc2VydmljZXM6IGFueSA9IHRoaXMuaW5qZWN0KCckcm9vdFNjb3BlJywgJyRjb250cm9sbGVyJyk7XHJcblx0XHRcdHZhciAkcm9vdFNjb3BlOiBhbmd1bGFyLklTY29wZSA9IHNlcnZpY2VzLiRyb290U2NvcGU7XHJcblx0XHRcdHZhciAkY29udHJvbGxlcjogYW55ID0gc2VydmljZXMuJGNvbnRyb2xsZXI7XHJcblxyXG5cdFx0XHRzY29wZSA9IF8uZXh0ZW5kKCRyb290U2NvcGUuJG5ldygpLCBzY29wZSk7XHJcblxyXG5cdFx0XHRpZiAobG9jYWxzID09IG51bGwpIHtcclxuXHRcdFx0XHRsb2NhbHMgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bG9jYWxzLiRzY29wZSA9IHNjb3BlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzY29wZTogc2NvcGUsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogPFRDb250cm9sbGVyVHlwZT4kY29udHJvbGxlcihjb250cm9sbGVyTmFtZSwgbG9jYWxzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRkaXJlY3RpdmUoZG9tOiBzdHJpbmcpOiBJRGlyZWN0aXZlUmVzdWx0IHtcclxuXHRcdFx0dmFyIHNlcnZpY2VzOiBhbnkgPSB0aGlzLmluamVjdCgnJHJvb3RTY29wZScsICckY29tcGlsZScpO1xyXG5cdFx0XHR2YXIgJHJvb3RTY29wZTogYW5ndWxhci5JU2NvcGUgPSBzZXJ2aWNlcy4kcm9vdFNjb3BlO1xyXG5cdFx0XHR2YXIgJGNvbXBpbGU6IGFueSA9IHNlcnZpY2VzLiRjb21waWxlO1xyXG5cclxuXHRcdFx0YW5ndWxhci5tb2NrLm1vZHVsZSgncmVub3ZvVGVtcGxhdGVzJyk7XHJcblxyXG5cdFx0XHR2YXIgY29tcG9uZW50OiBhbnkgPSAkY29tcGlsZShkb20pKCRyb290U2NvcGUpO1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRkaXJlY3RpdmU6IGNvbXBvbmVudCxcclxuXHRcdFx0XHRzY29wZTogY29tcG9uZW50Lmlzb2xhdGVTY29wZSgpLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBhbmd1bGFyRml4dHVyZTogSUFuZ3VsYXJGaXh0dXJlID0gbmV3IEFuZ3VsYXJGaXh0dXJlKCk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2xvZGFzaFxyXG4vLyB1c2VzIHR5cGluZ3Mvc2lub25cclxuLy8gdXNlcyB0eXBpbmdzL2pxdWVyeVxyXG4vLyB1c2VzIHR5cGluZ3MvYW5ndWxhcmpzXHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnRlc3Qge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJTW9jayB7XHJcblx0XHRzZXJ2aWNlKHNlcnZpY2U/OiBhbnkpOiBhbnk7XHJcblx0XHRwcm9taXNlPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRhdGE/OiBURGF0YVR5cGUsIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdHByb21pc2VXaXRoQ2FsbGJhY2s8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IHsoLi4ucGFyYW1zOiBhbnlbXSk6IFREYXRhVHlwZX0sIHN1Y2Nlc3NmdWw/OiBib29sZWFuKTogdm9pZDtcclxuXHRcdGZsdXNoPFREYXRhVHlwZT4oc2VydmljZTogYW55KTogdm9pZDtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPiB7XHJcblx0XHRwcm9taXNlOiBKUXVlcnlEZWZlcnJlZDxURGF0YVR5cGU+O1xyXG5cdFx0ZGF0YTogVERhdGFUeXBlO1xyXG5cdFx0c3VjY2Vzc2Z1bDogYm9vbGVhbjtcclxuXHR9XHJcblxyXG5cdGNsYXNzIE1vY2sge1xyXG5cdFx0c2VydmljZShzZXJ2aWNlPzogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNlcnZpY2UpID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHNlcnZpY2UgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8gPSBbXTtcclxuXHJcblx0XHRcdHJldHVybiBzZXJ2aWNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2U8VERhdGFUeXBlPihzZXJ2aWNlOiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgZGF0YT86IFREYXRhVHlwZSwgc3VjY2Vzc2Z1bD86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdFx0Ly8gRGVmYXVsdCBzdWNjZXNzZnVsIHRvIHRydWVcclxuXHRcdFx0aWYgKF8uaXNVbmRlZmluZWQoc3VjY2Vzc2Z1bCkpIHtcclxuXHRcdFx0XHRzdWNjZXNzZnVsID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VydmljZVttZXRob2ROYW1lXSA9IHNpbm9uLnNweSgoKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlV2l0aENhbGxiYWNrPFREYXRhVHlwZT4oc2VydmljZTogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiB7KC4uLnBhcmFtczogYW55W10pOiBURGF0YVR5cGV9LCBzdWNjZXNzZnVsPzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0XHQvLyBEZWZhdWx0IHN1Y2Nlc3NmdWwgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAoXy5pc1VuZGVmaW5lZChzdWNjZXNzZnVsKSkge1xyXG5cdFx0XHRcdHN1Y2Nlc3NmdWwgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2aWNlW21ldGhvZE5hbWVdID0gc2lub24uc3B5KCguLi5wYXJhbXM6IGFueVtdKTogYW55ID0+IHtcclxuXHRcdFx0XHR2YXIgZGVmZXJyZWQ6IEpRdWVyeURlZmVycmVkPFREYXRhVHlwZT4gPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblx0XHRcdFx0c2VydmljZS5fbW9ja19yZXF1ZXN0TGlzdF8ucHVzaCh7XHJcblx0XHRcdFx0XHRwcm9taXNlOiBkZWZlcnJlZCxcclxuXHRcdFx0XHRcdGRhdGE6IGNhbGxiYWNrLmFwcGx5KHRoaXMsIHBhcmFtcyksXHJcblx0XHRcdFx0XHRzdWNjZXNzZnVsOiBzdWNjZXNzZnVsLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmbHVzaDxURGF0YVR5cGU+KHNlcnZpY2U6IGFueSwgc2NvcGU/OiBuZy5JU2NvcGUpOiB2b2lkIHtcclxuXHRcdFx0Ly8gU2F2ZSBsb2NhbCByZWZlcmVuY2UgdG8gdGhlIHJlcXVlc3QgbGlzdCBhbmQgdGhlbiBjbGVhclxyXG5cdFx0XHR2YXIgY3VycmVudFBlbmRpbmdSZXF1ZXN0czogSU1vY2tSZXF1ZXN0PFREYXRhVHlwZT5bXSA9IHNlcnZpY2UuX21vY2tfcmVxdWVzdExpc3RfO1xyXG5cdFx0XHRzZXJ2aWNlLl9tb2NrX3JlcXVlc3RMaXN0XyA9IFtdO1xyXG5cclxuXHRcdFx0Ly8gUHJvY2VzcyB0aGUgc2F2ZWQgbGlzdC5cclxuXHRcdFx0Ly8gVGhpcyB3YXkgaWYgYW55IGFkZGl0aW9uYWwgcmVxdWVzdHMgYXJlIGdlbmVyYXRlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSBjdXJyZW50IC8gbG9jYWwgbGlzdCBcclxuXHRcdFx0Ly8gIHRoZXNlIHJlcXVlc3RzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZSBuZXh0IGNhbGwgdG8gZmx1c2goKS5cclxuXHRcdFx0Xy5lYWNoKGN1cnJlbnRQZW5kaW5nUmVxdWVzdHMsIChyZXF1ZXN0OiBJTW9ja1JlcXVlc3Q8VERhdGFUeXBlPik6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGlmIChyZXF1ZXN0LnN1Y2Nlc3NmdWwpIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QuZGF0YSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlcXVlc3QucHJvbWlzZS5yZWplY3QocmVxdWVzdC5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChfLmlzVW5kZWZpbmVkKHNjb3BlKSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdHNjb3BlLiRkaWdlc3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IHZhciBtb2NrOiBJTW9jayA9IG5ldyBNb2NrKCk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJqc1xyXG4vLyB1c2VzIHR5cGluZ3MvbG9kYXNoXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24ge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLnNlcnZpY2VzLnZhbGlkYXRpb24nO1xyXG5cdGV4cG9ydCB2YXIgZmFjdG9yeU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uRmFjdG9yeSc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25IYW5kbGVyIHtcclxuXHRcdGlzQWN0aXZlPzogeygpOiBib29sZWFufSB8IGJvb2xlYW47XHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdFx0ZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElVbnJlZ2lzdGVyRnVuY3Rpb24ge1xyXG5cdFx0KCk6IHZvaWQ7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZSB7XHJcblx0XHR2YWxpZGF0ZSgpOiBib29sZWFuO1xyXG5cdFx0cmVnaXN0ZXJWYWxpZGF0aW9uSGFuZGxlcihoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBJVW5yZWdpc3RlckZ1bmN0aW9uO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSVZhbGlkYXRpb25TZXJ2aWNlIHtcclxuXHRcdHByaXZhdGUgdmFsaWRhdGlvbkhhbmRsZXJzOiB7IFtpbmRleDogbnVtYmVyXTogSVZhbGlkYXRpb25IYW5kbGVyIH0gPSB7fTtcclxuXHRcdHByaXZhdGUgbmV4dEtleTogbnVtYmVyID0gMDtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbjogc2VydmljZXMubm90aWZpY2F0aW9uLklOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuXHRcdHZhbGlkYXRlKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0XHRfLmVhY2godGhpcy52YWxpZGF0aW9uSGFuZGxlcnMsIChoYW5kbGVyOiBJVmFsaWRhdGlvbkhhbmRsZXIpOiBib29sZWFuID0+IHtcclxuXHRcdFx0XHR2YXIgaXNBY3RpdmU6IGJvb2xlYW4gPSAoXy5pc0Z1bmN0aW9uKGhhbmRsZXIuaXNBY3RpdmUpICYmICg8eygpOiBib29sZWFufT5oYW5kbGVyLmlzQWN0aXZlKSgpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHx8IGhhbmRsZXIuaXNBY3RpdmUgPT0gbnVsbFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHx8IGhhbmRsZXIuaXNBY3RpdmUgPT09IHRydWU7XHJcblxyXG5cdFx0XHRcdGlmIChpc0FjdGl2ZSAmJiAhaGFuZGxlci52YWxpZGF0ZSgpKSB7XHJcblx0XHRcdFx0XHRpc1ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbi5lcnJvcihoYW5kbGVyLmVycm9yTWVzc2FnZSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlZ2lzdGVyVmFsaWRhdGlvbkhhbmRsZXIoaGFuZGxlcjogSVZhbGlkYXRpb25IYW5kbGVyKTogSVVucmVnaXN0ZXJGdW5jdGlvbiB7XHJcblx0XHRcdHZhciBjdXJyZW50S2V5OiBudW1iZXIgPSB0aGlzLm5leHRLZXk7XHJcblx0XHRcdHRoaXMubmV4dEtleSsrO1xyXG5cdFx0XHR0aGlzLnZhbGlkYXRpb25IYW5kbGVyc1tjdXJyZW50S2V5XSA9IGhhbmRsZXI7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdHRoaXMudW5yZWdpc3RlcihjdXJyZW50S2V5KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHVucmVnaXN0ZXIoa2V5OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMudmFsaWRhdGlvbkhhbmRsZXJzW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uU2VydmljZUZhY3Rvcnkge1xyXG5cdFx0Z2V0SW5zdGFuY2UoKTogSVZhbGlkYXRpb25TZXJ2aWNlO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5LiRpbmplY3QgPSBbJ25vdGlmaWNhdGlvbiddO1xyXG5cdGV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0aW9uU2VydmljZUZhY3Rvcnkobm90aWZpY2F0aW9uOiBzZXJ2aWNlcy5ub3RpZmljYXRpb24uSU5vdGlmaWNhdGlvblNlcnZpY2UpOiBJVmFsaWRhdGlvblNlcnZpY2VGYWN0b3J5IHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRnZXRJbnN0YW5jZSgpOiBJVmFsaWRhdGlvblNlcnZpY2Uge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblNlcnZpY2Uobm90aWZpY2F0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG5cdFx0LmZhY3RvcnkoZmFjdG9yeU5hbWUsIHZhbGlkYXRpb25TZXJ2aWNlRmFjdG9yeSk7XHJcbn1cclxuIiwiLy8gdXNlcyB0eXBpbmdzL2FuZ3VsYXJcclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMuYmVoYXZpb3JzLnN0b3BFdmVudFByb3BvZ2F0aW9uIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5iZWhhdmlvcnMuc3RvcEV2ZW50UHJvcG9nYXRpb24nO1xyXG5cdGV4cG9ydCB2YXIgZGlyZWN0aXZlTmFtZTogc3RyaW5nID0gJ3JsU3RvcEV2ZW50UHJvcGFnYXRpb24nO1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElTdG9wRXZlbnRQcm9wYWdhdGlvbkF0dHJzIGV4dGVuZHMgbmcuSUF0dHJpYnV0ZXMge1xyXG5cdFx0cmxTdG9wRXZlbnRQcm9wYWdhdGlvbjogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oKTogbmcuSURpcmVjdGl2ZSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogJ0EnLFxyXG5cdFx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGVcclxuXHRcdFx0XHQsIGVsZW1lbnQ6IG5nLklBdWdtZW50ZWRKUXVlcnlcclxuXHRcdFx0XHQsIGF0dHJzOiBJU3RvcEV2ZW50UHJvcGFnYXRpb25BdHRycyk6IHZvaWQge1xyXG5cdFx0XHRcdGVsZW1lbnQub24oYXR0cnMucmxTdG9wRXZlbnRQcm9wYWdhdGlvbiwgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pXHJcblx0XHQuZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIHN0b3BFdmVudFByb3BhZ2F0aW9uKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nc3RvcEV2ZW50UHJvcGFnYXRpb24vc3RvcEV2ZW50UHJvcGFnYXRpb24udHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmJlaGF2aW9ycyB7XHJcblx0ZXhwb3J0IHZhciBtb2R1bGVOYW1lOiBzdHJpbmcgPSAncmwudXRpbGl0aWVzLmJlaGF2aW9ycyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtcclxuXHRcdHN0b3BFdmVudFByb3BvZ2F0aW9uLm1vZHVsZU5hbWUsXHJcblx0XSk7XHJcbn1cclxuIiwiLy8gdXNlcyBhbmd1bGFyanNcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2lzRW1wdHkvaXNFbXB0eS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHJ1bmNhdGUvdHJ1bmNhdGUudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLmZpbHRlcnMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcy5maWx0ZXJzJztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW1xyXG5cdFx0aXNFbXB0eS5tb2R1bGVOYW1lLFxyXG5cdFx0dHJ1bmNhdGUubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXJyYXkvYXJyYXkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmUvYXV0b3NhdmUuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYXV0b3NhdmVBY3Rpb24vYXV0b3NhdmVBY3Rpb24uc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYm9vbGVhbi9ib29sZWFuLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2NvbnRlbnRQcm92aWRlci9jb250ZW50UHJvdmlkZXIuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nZGF0ZS9kYXRlLnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2pxdWVyeS9qcXVlcnkuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nbnVtYmVyL251bWJlci5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdvYmplY3Qvb2JqZWN0LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J29ic2VydmFibGUvb2JzZXJ2YWJsZS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdwYXJlbnRDaGlsZEJlaGF2aW9yL3BhcmVudENoaWxkQmVoYXZpb3Iuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncHJvbWlzZS9wcm9taXNlLnNlcnZpY2UudHMnIC8+XHJcblxyXG5tb2R1bGUgcmwudXRpbGl0aWVzLnNlcnZpY2VzIHtcclxuXHRleHBvcnQgdmFyIG1vZHVsZU5hbWU6IHN0cmluZyA9ICdybC51dGlsaXRpZXMuc2VydmljZXMnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXHJcblx0XHRhcnJheS5tb2R1bGVOYW1lLFxyXG5cdFx0YXV0b3NhdmUubW9kdWxlTmFtZSxcclxuXHRcdGF1dG9zYXZlQWN0aW9uLm1vZHVsZU5hbWUsXHJcblx0XHRib29sZWFuLm1vZHVsZU5hbWUsXHJcblx0XHRjb250ZW50UHJvdmlkZXIubW9kdWxlTmFtZSxcclxuXHRcdGRhdGUubW9kdWxlTmFtZSxcclxuXHRcdGpxdWVyeS5tb2R1bGVOYW1lLFxyXG5cdFx0bnVtYmVyLm1vZHVsZU5hbWUsXHJcblx0XHRvYmplY3QubW9kdWxlTmFtZSxcclxuXHRcdG9ic2VydmFibGUubW9kdWxlTmFtZSxcclxuXHRcdHBhcmVudENoaWxkQmVoYXZpb3IubW9kdWxlTmFtZSxcclxuXHRcdHByb21pc2UubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iLCIvLyB1c2VzIGFuZ3VsYXJqc1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nYmVoYXZpb3JzL2JlaGF2aW9ycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J2ZpbHRlcnMvZmlsdGVycy5tb2R1bGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS50cycgLz5cclxuXHJcbm1vZHVsZSBybC51dGlsaXRpZXMge1xyXG5cdGV4cG9ydCB2YXIgbW9kdWxlTmFtZTogc3RyaW5nID0gJ3JsLnV0aWxpdGllcyc7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtcclxuXHRcdGJlaGF2aW9ycy5tb2R1bGVOYW1lLFxyXG5cdFx0ZmlsdGVycy5tb2R1bGVOYW1lLFxyXG5cdFx0c2VydmljZXMubW9kdWxlTmFtZSxcclxuXHRdKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=