declare module rl.utilities.behaviors.stopEventPropogation {
    var moduleName: string;
    var directiveName: string;
    interface IStopEventPropagationAttrs extends ng.IAttributes {
        rlStopEventPropagation: string;
    }
}
declare module rl.utilities.behaviors {
    var moduleName: string;
}
declare module rl.utilities.services.array {
    var moduleName: string;
    var serviceName: string;
    interface IArrayUtility {
        findIndexOf<TDataType>(array: TDataType[], predicate: {
            (item: TDataType): boolean;
        }): number;
        remove<TDataType>(array: TDataType[], item: {
            (obj: TDataType): boolean;
        }): TDataType;
        remove<TDataType>(array: TDataType[], item: TDataType): TDataType;
        replace<TDataType>(array: TDataType[], oldItem: TDataType, newItem: TDataType): void;
        sum<TDataType>(array: TDataType[], transform: {
            (item: TDataType): number;
        }): number;
        sum(array: number[]): number;
        toDictionary<TDataType>(array: TDataType[], keySelector: {
            (item: TDataType): string;
        }): TDataType[];
        toDictionary<TDataType>(array: TDataType[], keySelector: {
            (item: TDataType): number;
        }): TDataType[];
    }
}
declare module rl.utilities.services.object {
    var moduleName: string;
    var serviceName: string;
    interface IObjectUtility {
        isNullOrEmpty(object: any[]): boolean;
        isNullOrEmpty(object: number): boolean;
        isNullOrEmpty(object: string): boolean;
        isNullOrEmpty(object: any): boolean;
        isNullOrWhitespace(object: any[]): boolean;
        isNullOrWhitespace(object: number): boolean;
        isNullOrWhitespace(object: string): boolean;
        isNullOrWhitespace(object: any): boolean;
        areEqual(obj1: any, obj2: any): boolean;
        toString(object: any): string;
        valueOrDefault(value: any, defaultValue: any): any;
    }
}
declare module rl.utilities.filters.isEmpty {
    var moduleName: string;
    var serviceName: string;
    var filterName: string;
    interface IIsEmptyFilter {
        (input: any, trueWhenEmpty?: boolean): boolean;
    }
}
declare module rl.utilities.filters.truncate {
    var moduleName: string;
    var serviceName: string;
    var filterName: string;
    interface ITruncateFilter {
        (input?: string, truncateTo?: number, includeEllipses?: boolean): string;
        (input?: number, truncateTo?: number, includeEllipses?: boolean): string;
    }
}
declare module rl.utilities.filters {
    var moduleName: string;
}
declare module rl.utilities.services.autosaveAction {
    var moduleName: string;
    var serviceName: string;
    interface IAutosaveActionService {
        trigger(promise: ng.IPromise<any>): void;
        saving: boolean;
        complete: boolean;
        successful: boolean;
    }
}
declare module rl.utilities.services.autosave {
    var moduleName: string;
    var factoryName: string;
    interface IAutosaveService {
        autosave(...data: any[]): boolean;
        contentForm: ng.IFormController;
    }
    interface IAutosaveServiceFactory {
        getInstance(save: {
            (): ng.IPromise<void>;
        }, contentForm?: ng.IFormController, validate?: {
            (): boolean;
        }): IAutosaveService;
    }
}
declare module rl.utilities.services.boolean {
    var moduleName: string;
    var serviceName: string;
    interface IBooleanUtility {
        toBool(object: any): boolean;
    }
}
declare module rl.utilities.services.observable {
    var moduleName: string;
    var factoryName: string;
    interface IWatcher<TReturnType> {
        action: IAction<TReturnType>;
        event?: string;
    }
    interface IAction<TReturnType> {
        (...params: any[]): TReturnType;
    }
    interface IUnregisterFunction {
        (): void;
    }
    interface IObservableService {
        register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
        register(action: IAction<void>, event?: string): IUnregisterFunction;
        fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
        fire(event?: string, ...params: any[]): void;
    }
    class ObservableService implements IObservableService {
        private watchers;
        private nextKey;
        register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
        fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
        private unregister(key);
    }
    interface IObservableServiceFactory {
        getInstance(): IObservableService;
    }
    function observableServiceFactory(): IObservableServiceFactory;
}
declare module rl.utilities.services.contentProvider {
    var moduleName: string;
    var serviceName: string;
    interface IContentProviderService {
        setContent(content: JQuery): void;
        setTranscludeContent(transcludeFunction: angular.ITranscludeFunction): void;
        getContent(selector?: string): JQuery;
        register(action: {
            (newText: JQuery): void;
        }, selector?: string): observable.IUnregisterFunction;
    }
    interface IContentProviderServiceFactory {
        getInstance(): IContentProviderService;
    }
}
declare module rl.utilities.services.time {
    var moduleName: string;
    var serviceName: string;
    interface ITimeUtility {
        millisecondsToSeconds(milliseconds: number): number;
        millisecondsToMinutes(milliseconds: number): number;
        millisecondsToHours(milliseconds: number): number;
        millisecondsToDays(milliseconds: number): number;
    }
    class TimeUtility {
        millisecondsToSeconds(milliseconds: number): number;
        millisecondsToMinutes(milliseconds: number): number;
        millisecondsToHours(milliseconds: number): number;
        millisecondsToDays(milliseconds: number): number;
    }
}
declare module rl.utilities.services.momentWrapper {
    var moduleName: string;
    var serviceName: string;
    function momentWrapper(): void;
}
declare module rl.utilities.types.compareResult {
    var moduleName: string;
    enum CompareResult {
        greater = 1,
        equal = 0,
        less = -1,
    }
    function getCompareResult(num: number): CompareResult;
}
declare module rl.utilities.services.date {
    import compareResult = rl.utilities.types.compareResult;
    interface IMonth {
        name: string;
        days(year?: number): number;
    }
    interface IDateValue {
        years: number;
        months: number;
        days: number;
    }
    interface IDateUtility {
        getFullString(month: number): string;
        getDays(month: number, year?: number): number;
        subtractDates(start: string | Date, end: string | Date, dateFormat?: string): IDateValue;
        subtractDateInDays(start: string | Date, end: string | Date, dateFormat?: string): number;
        compareDates(date1: string | Date, date2: string | Date, dateFormat?: string): compareResult.CompareResult;
        dateInRange(date: string | Date, rangeStart: string | Date, rangeEnd: string | Date): boolean;
        getDate(date: string | Date, dateFormat?: string): Date;
        getNow(): Date;
    }
    class DateUtility {
        private moment;
        private time;
        static $inject: string[];
        constructor(moment: moment.MomentStatic, time: time.ITimeUtility);
        month: IMonth[];
        private baseFormat;
        private isLeapYear(year?);
        getFullString(month: number): string;
        getDays(month: number, year?: number): number;
        subtractDates(start: string | Date, end: string | Date, dateFormat?: string): IDateValue;
        subtractDateInDays(start: string | Date, end: string | Date, dateFormat?: string): number;
        compareDates(date1: string | Date, date2: string | Date, dateFormat?: string): compareResult.CompareResult;
        dateInRange(date: string | Date, rangeStart: string | Date, rangeEnd: string | Date): boolean;
        getDate(date: string | Date, dateFormat?: string): Date;
        getNow(): Date;
    }
}
declare module rl.utilities.services.jquery {
    var moduleName: string;
    var serviceName: string;
    interface IJQueryUtility {
        replaceContent(contentArea: JQuery, newContents: JQuery): void;
    }
}
declare module rl.utilities.services.number {
    var moduleName: string;
    var serviceName: string;
    interface INumberUtility {
        preciseRound(num: number, decimals: number): number;
        integerDivide(dividend: number, divisor: number): number;
    }
}
declare module rl.utilities.services.parentChildBehavior {
    var moduleName: string;
    var serviceName: string;
    interface IViewData<TBehavior> {
        behavior: TBehavior;
    }
    interface IChild<TBehavior> {
        viewData?: IViewData<TBehavior>;
    }
    interface IParentChildBehaviorService {
        getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior;
        triggerChildBehavior<TBehavior, TReturnType>(child: IChild<any>, action: {
            (behavior: TBehavior): TReturnType;
        }): TReturnType;
        triggerAllChildBehaviors<TBehavior, TReturnType>(childList: IChild<TBehavior>[], action: {
            (behavior: TBehavior): TReturnType;
        }): TReturnType[];
        getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[];
        registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void;
    }
    class ParentChildBehaviorService {
        getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior;
        triggerChildBehavior<TBehavior, TReturnType>(child: IChild<TBehavior>, action: {
            (behavior: TBehavior): TReturnType;
        }): TReturnType;
        triggerAllChildBehaviors<TBehavior, TReturnType>(childList: IChild<TBehavior>[], action: {
            (behavior: TBehavior): TReturnType;
        }): TReturnType[];
        getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[];
        registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void;
    }
}
declare module rl.utilities.services.promise {
    var moduleName: string;
    var serviceName: string;
    interface IPromiseUtility {
        isPromise(promise: any): boolean;
        isPromise(promise: ng.IPromise<any>): boolean;
    }
}
declare module rl.utilities.services {
    var moduleName: string;
}
declare module rl.utilities {
    var moduleName: string;
}
declare module rl.utilities.filter {
    var moduleName: string;
    interface IFilterWithCounts extends IFilter {
        updateOptionCounts<TItemType>(data: TItemType[]): void;
    }
    interface IFilter {
        type: string;
        filter<TItemType>(item: TItemType): boolean;
    }
}
declare module rl.utilities.services.breakpoints {
    var lg: string;
    var md: string;
    var sm: string;
    var xs: string;
}
declare module rl.utilities.services.breakpoints {
    var visibleBreakpointsServiceName: string;
    interface IVisibleBreakpointService {
        isVisible(breakpoint: string): boolean;
    }
    class VisibleBreakpointService implements IVisibleBreakpointService {
        isVisible(breakpoint: string): boolean;
    }
}
declare module rl.utilities.services.window {
    var moduleName: string;
    var serviceName: string;
    interface IWindowService {
        resize(callback: {
            (event: JQueryEventObject): any;
        }): void;
    }
}
declare module rl.utilities.services.breakpoints {
    import __window = rl.utilities.services.window;
    import __observable = rl.utilities.services.observable;
    var moduleName: string;
    var serviceName: string;
    interface IBreakpointService {
        currentBreakpoint: string;
        isBreakpoint(breakpoint: string): boolean;
        register(action: {
            (breakpoint: string): void;
        }): __observable.IUnregisterFunction;
    }
    class BreakpointService implements IBreakpointService {
        private visibleBreakpoints;
        static $inject: string[];
        constructor(visibleBreakpoints: IVisibleBreakpointService, resizeDebounceMilliseconds: number, windowService: __window.IWindowService, observableFactory: __observable.IObservableServiceFactory);
        private observable;
        currentBreakpoint: string;
        private getBreakpoint();
        isBreakpoint(breakpoint: string): boolean;
        register(action: {
            (breakpoint: string): void;
        }): __observable.IUnregisterFunction;
        private updateBreakpoint;
    }
}
declare module rl.utilities.services.date {
    var dateTimeFormatServiceName: string;
    interface IDateFormatStrings {
        dateTimeFormat: string;
        dateFormat: string;
        timeFormat: string;
    }
    var defaultFormats: IDateFormatStrings;
}
declare module rl.utilities.services.date {
    var moduleName: string;
    var serviceName: string;
}
declare module rl.utilities.services.fileSize {
    var factoryName: string;
    interface IFileSize {
        display(): string;
    }
    interface IFileSizeFactory {
        getInstance(bytes: number): IFileSize;
    }
    function fileSizeFactory(numberUtility: number.INumberUtility): IFileSizeFactory;
}
declare module rl.utilities.services.fileSize {
    var simpleFilterName: string;
    var filterName: string;
    interface IFileSizeFilter {
        (bytes?: number): string;
    }
    function fileSizeFilter(fileSizeFactory: IFileSizeFactory): IFileSizeFilter;
}
declare module rl.utilities.services.fileSize {
    var moduleName: string;
}
declare module rl.utilities.services.string {
    var moduleName: string;
    var serviceName: string;
    interface IStringUtilityService {
        toNumber(string: string): number;
        contains(str: string, substring?: string): boolean;
        substitute(formatString: string, ...params: string[]): string;
        replaceAll(str: string, patternToFind: string, replacementString: string): string;
    }
    class StringUtilityService implements IStringUtilityService {
        toNumber(string: string): number;
        contains(str: string, substring?: string): boolean;
        substitute(formatString: string, ...params: string[]): string;
        replaceAll(str: string, patternToFind: string, replacementString: string): string;
    }
}
declare module rl.utilities.services.genericSearchFilter {
    var moduleName: string;
    var factoryName: string;
    var filterName: string;
    interface IGenericSearchFilter extends filter.IFilter {
        type: string;
        searchText: string;
        caseSensitive: boolean;
        filter<TItemType>(item: TItemType): boolean;
    }
    class GenericSearchFilter implements IGenericSearchFilter {
        private object;
        private string;
        type: string;
        searchText: string;
        caseSensitive: boolean;
        constructor(object: object.IObjectUtility, string: string.IStringUtilityService);
        filter<TItemType>(item: TItemType): boolean;
        private searchObject<TItemType>(item, search, caseSensitive);
    }
    interface IGenericSearchFilterFactory {
        getInstance(): IGenericSearchFilter;
    }
}
declare module rl.utilities.services.test {
    interface IControllerResult<TControllerType> {
        controller: TControllerType;
        scope: angular.IScope;
    }
    interface IDirectiveResult {
        directive: angular.IDirective;
        scope: angular.IScope;
    }
    interface IAngularFixture {
        inject: (...serviceNames: string[]) => any;
        mock: (mocks: any) => void;
        controller<TControllerType>(controllerName: string, scope?: any, locals?: any): IControllerResult<TControllerType>;
        directive: (dom: string) => IDirectiveResult;
    }
    var angularFixture: IAngularFixture;
}
declare module rl.utilities.services.test {
    interface IMock {
        service(service?: any): any;
        promise<TDataType>(service: any, methodName: string, data?: TDataType, successful?: boolean): void;
        promiseWithCallback<TDataType>(service: any, methodName: string, callback: {
            (...params: any[]): TDataType;
        }, successful?: boolean): void;
        flush<TDataType>(service: any): void;
    }
    var mock: IMock;
}
