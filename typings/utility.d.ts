/// <reference path="typings/chai/chai.d.ts" />
/// <reference path="typings/mocha/mocha.d.ts" />
/// <reference path="typings/angularMocks.d.ts" />
/// <reference path="typings/chaiAssertions.d.ts" />
/// <reference path="typings/sinon/sinon.d.ts" />
declare module rl.utilities.array {
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
declare module rl.utilities.observable {
    var moduleName: string;
    var serviceName: string;
    interface IWatcher {
        action(...params: any[]): void;
        event?: string;
    }
    interface IRegisterFunction {
        (action: {
            (...params: any[]): void;
        }, event?: string): IUnregisterFunction;
    }
    interface IUnregisterFunction {
        (): void;
    }
    interface IObservableService {
        register: IRegisterFunction;
        fire(event?: string, ...params: any[]): void;
    }
    interface IObservableServiceFactory {
        getInstance(): IObservableService;
    }
}
declare module rl.utilities.contentProvider {
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
declare module rl.utilities.date {
    var moduleName: string;
    var serviceName: string;
    interface IMonth {
        name: string;
        days(year?: number): number;
    }
    interface IDateUtility {
        getFullString(month: number): string;
        getDays(month: number, year?: number): number;
    }
}
declare module rl.utilities.jquery {
    var moduleName: string;
    var serviceName: string;
    interface IJQueryUtility {
        replaceContent(contentArea: JQuery, newContents: JQuery): void;
    }
}
declare module rl.utilities.number {
    var moduleName: string;
    var serviceName: string;
    interface INumberUtility {
        preciseRound(num: number, decimals: number): number;
    }
}
declare module rl.utilities.object {
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
    }
}
declare module rl.utilities.parentChildBehavior {
    var moduleName: string;
    var serviceName: string;
    interface IViewData<TBehavior> {
        behavior: TBehavior;
    }
    interface IChild<TBehavior> {
        viewData: IViewData<TBehavior>;
    }
    interface IParentChildBehaviorService {
        getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior;
        getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[];
        registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void;
    }
}
declare module rl.utilities.promise {
    var moduleName: string;
    var serviceName: string;
    interface IPromiseUtility {
        isPromise(promise: any): boolean;
        isPromise(promise: ng.IPromise<any>): boolean;
    }
}
declare module rl.utilities.truncate {
    var moduleName: string;
    var serviceName: string;
    var filterName: string;
    interface ITruncateFilter {
        (input?: string, truncateTo?: number, includeEllipses?: boolean): string;
        (input?: number, truncateTo?: number, includeEllipses?: boolean): string;
    }
}
declare module rl.utilities {
    var moduleName: string;
}
declare module rl.utilities.test {
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
interface ITestObj {
    prop: number;
}
interface IKeyObj {
    key: number;
}
interface ITestBehavior {
    action: Function;
}
declare module rl.utilities.test {
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
