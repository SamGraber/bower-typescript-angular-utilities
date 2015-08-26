/// <reference path="../time/time.service.ts" />
/// <reference path="../moment/moment.module.ts" />
/// <reference path="../../types/compareResult.ts" />

// uses typings/angularjs

module rl.utilities.services.date {
	'use strict';

	import compareResult = rl.utilities.types.compareResult;

	export interface IMonth {
		name: string;
		days(year?: number): number;
	}

	export interface IDateValue {
		years: number;
		months: number;
		days: number;
	}

	export interface IDateUtility {
		getFullString(month: number): string;
		getDays(month: number, year?: number): number;
		subtractDates(start: string | Date, end: string | Date, dateFormat?: string): IDateValue;
		subtractDateInDays(start: string | Date, end: string | Date, dateFormat?: string): number;
		compareDates(date1: string | Date, date2: string | Date, dateFormat?: string): compareResult.CompareResult;
		dateInRange(date: string | Date, rangeStart: string | Date, rangeEnd: string | Date): boolean;
		getDate(date: string | Date, dateFormat?: string): Date;
		getNow(): Date;
	}

	export class DateUtility {
		static $inject: string[] = [momentWrapper.serviceName, time.serviceName];
		constructor(private moment: moment.MomentStatic, private time: time.ITimeUtility) {

			this.month = [
				{ name: 'January', days: (): number => { return 31; } },
				{ name: 'February', days: (year: number): number => { return this.isLeapYear(year) ? 29 : 28; } },
				{ name: 'March', days: (): number => { return 31; } },
				{ name: 'April', days: (): number => { return 30; } },
				{ name: 'May', days: (): number => { return 31; } },
				{ name: 'June', days: (): number => { return 30; } },
				{ name: 'July', days: (): number => { return 31; } },
				{ name: 'August', days: (): number => { return 31; } },
				{ name: 'September', days: (): number => { return 30; } },
				{ name: 'October', days: (): number => { return 31; } },
				{ name: 'November', days: (): number => { return 30; } },
				{ name: 'December', days: (): number => { return 31; } },
			];
		}

		month: IMonth[];
		private baseFormat: string = 'MM-DD-YYYY';

		private isLeapYear(year?: number): boolean {
			return new Date(year, 1, 29).getMonth() === 1;
		}

		getFullString(month: number): string {
			return this.month[month].name;
		}

		getDays(month: number, year?: number): number {
			return this.month[month].days(year);
		}

		subtractDates(start: string | Date, end: string | Date, dateFormat?: string): IDateValue {
			if (start == null || end == null) {
				return null;
			}

			var startDate: Date = this.getDate(start, dateFormat);
			var endDate: Date = this.getDate(end, dateFormat);

			var result: IDateValue = <any>{};
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
		}

		subtractDateInDays(start: string | Date, end: string | Date, dateFormat?: string): number {
			if (start == null || end == null) {
				return null;
			}

			var startDate: Date = this.getDate(start, dateFormat);
			var endDate: Date = this.getDate(end, dateFormat);

			var milliseconds: number = endDate.getTime() - startDate.getTime();

			return this.time.millisecondsToDays(milliseconds);
		}

		compareDates(date1: string | Date, date2: string | Date, dateFormat?: string): compareResult.CompareResult {
			// subtractDateInDays subtracts the fist from the second, assuming start and end dates
			var difference: number = this.subtractDateInDays(date2, date1, dateFormat);
			return compareResult.getCompareResult(difference);
		}

		dateInRange(date: string | Date, rangeStart: string | Date, rangeEnd: string | Date): boolean {
			if (this.compareDates(date, rangeStart) === compareResult.CompareResult.less) {
				return false;
			} else if (this.compareDates(date, rangeEnd) === compareResult.CompareResult.greater) {
				return false;
			} else {
				return true;
			}
		}

		getDate(date: string | Date, dateFormat?: string): Date {
			var format: string = dateFormat != null ? dateFormat : this.baseFormat;

			if (_.isDate(date)) {
				return <Date>date;
			} else {
				return this.moment(<string>date, format).toDate();
			}
		}

		getNow(): Date {
			return new Date();
		}
	}
}
