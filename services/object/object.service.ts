// uses typings/angularjs
// uses typings/lodash

/// <reference path='../array/array.service.ts' />

module rl.utilities.services.object {
	'use strict';

	export var moduleName: string = 'rl.utilities.services.object';
	export var serviceName: string = 'objectUtility';

	export interface IObjectUtility {
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

	class ObjectUtility implements IObjectUtility {
		 static $inject: string[] = [array.serviceName];
		 constructor(private array: array.IArrayUtility) {
		 }

		isNullOrEmpty(object: any): boolean {
			if (object == null) {
				return true;
			} else if (_.isArray(object)) {
				return _.any(object) === false;
			} else if (_.isNumber(object)) {
				return _.isNaN(object);
			} else {
				return object === '';
			}
		}

		isNullOrWhitespace(object: any): boolean {
			if (_.isString(object)) {
				object = (<string>object).trim();
			}

			return this.isNullOrEmpty(object);
		}

		areEqual(obj1: any, obj2: any): boolean {
			var type1: string = typeof obj1;
			var type2: string = typeof obj2;

			if (obj1 == null && obj2 == null) {
				return true;
			} else if (obj1 == null || obj2 == null) {
				return false;
			}

			if (type1 !== type2) {
				return false;
			} else if (obj1 instanceof Array) {
				if (obj1.length !== obj2.length) {
					return false;
				}

				for (var i: number = 0; i < obj1.length; i++) {
					if (this.areEqual(obj1[i], obj2[i]) === false) {
						return false;
					}
				}
			} else if (type1 === 'object') {
				//init an object with the keys from obj2
				var keys2: string[] = _.keys(obj2);
				_.forIn(obj1, (value: any, key: string): boolean => {
					if (_.has(obj2, key)) {
						//compare value against the value with the same key in obj2, then remove the key
						if (this.areEqual(value, obj2[key]) === false) {
							return false;
						} else {
							this.array.remove(keys2, key);
						}
					} else {
						return false;
					}
				});
				//if there are still keys left in keys2, we know they are not equal (obj2 has more properties)
				if (_.any(keys2)) {
					return false;
				}
			} else {
				//if types are primitive, do a simple comparison
				return obj1 === obj2;
			}

			return true;
		}

		toString(object: any): string {
			return object + '';
		}

		valueOrDefault(value: any, defaultValue: any): any {
			if (value != null) {
				return value;
			} else {
				return defaultValue;
			}
		}
	}

	angular.module(moduleName, [array.moduleName])
		.service(serviceName, ObjectUtility);
}
