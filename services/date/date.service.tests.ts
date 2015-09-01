/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='date.module.ts' />
/// <reference path='date.service.ts' />
/// <reference path="../../types/compareResult.ts" />
/// <reference path='../test/angularFixture.ts' />

module rl.utilities.services.date {
	'use strict';

	import compareResult = rl.utilities.types.compareResult;

	describe('dateUtility', () => {
		var dateUtility: date.IDateUtility;

		beforeEach(() => {
			angular.mock.module(date.moduleName);

			var services: any = test.angularFixture.inject(date.serviceName);
			dateUtility = services[date.serviceName];
		});

		describe('getFullString', (): void => {
			it('should get the month name', (): void => {
				expect(dateUtility.getFullString(0)).to.equal('January');
				expect(dateUtility.getFullString(1)).to.equal('February');
				expect(dateUtility.getFullString(2)).to.equal('March');
				expect(dateUtility.getFullString(3)).to.equal('April');
				expect(dateUtility.getFullString(4)).to.equal('May');
				expect(dateUtility.getFullString(5)).to.equal('June');
				expect(dateUtility.getFullString(6)).to.equal('July');
				expect(dateUtility.getFullString(7)).to.equal('August');
				expect(dateUtility.getFullString(8)).to.equal('September');
				expect(dateUtility.getFullString(9)).to.equal('October');
				expect(dateUtility.getFullString(10)).to.equal('November');
				expect(dateUtility.getFullString(11)).to.equal('December');
			});
		});

		describe('getDays', (): void => {
			it('should get the number of days in the month', (): void => {
				expect(dateUtility.getDays(0)).to.equal(31);
				expect(dateUtility.getDays(2)).to.equal(31);
				expect(dateUtility.getDays(3)).to.equal(30);
				expect(dateUtility.getDays(4)).to.equal(31);
				expect(dateUtility.getDays(5)).to.equal(30);
				expect(dateUtility.getDays(6)).to.equal(31);
				expect(dateUtility.getDays(7)).to.equal(31);
				expect(dateUtility.getDays(8)).to.equal(30);
				expect(dateUtility.getDays(9)).to.equal(31);
				expect(dateUtility.getDays(10)).to.equal(30);
				expect(dateUtility.getDays(11)).to.equal(31);
			});

			it('should account for leap years', (): void => {
				expect(dateUtility.getDays(1, 2015)).to.equal(28);
				expect(dateUtility.getDays(1, 2016)).to.equal(29);
			});
		});

		describe('getDate', (): void => {
			it('should handle dates in string or date format, defaulting to MM-DD-YYYY format', (): void => {
				var dateString: string = '1/1/2014';
				var date: Date = new Date(dateString);
				expect(dateUtility.getDate(date).getDate()).to.equal(date.getDate());
				expect(dateUtility.getDate(dateString).getDate()).to.equal(date.getDate());
			});

			it('should handle dates in a user-defined format', (): void => {
				var dateString: string = '2014-1-1T12:00:00';
				var date: Date = new Date('1/1/2014');
				expect(dateUtility.getDate(dateString, 'YYYY-MM-DDTHH:mm:ss').getDate()).to.equal(date.getDate());
			});
		});

		describe('subtractDates', (): void => {
			it('should get 0 years, months , and days when subtracting ths same date from itself', (): void => {
				var startDate: string = '9/10/2014';
				var endDate: string = '9/10/2014';

				var result: date.IDateValue = dateUtility.subtractDates(startDate, endDate);

				expect(result.years).to.equal(0);
				expect(result.months).to.equal(0);
				expect(result.days).to.equal(0);
			});

			it('should get 3/3/3 when subtracting 6/6/2006 from 9/9/2009', (): void => {
				var startDate: string = '6/6/2006';
				var endDate: string = '9/9/2009';

				var result: date.IDateValue = dateUtility.subtractDates(startDate, endDate);

				expect(result.years).to.equal(3);
				expect(result.months).to.equal(3);
				expect(result.days).to.equal(3);
			});

			it('should get 11/30/21 when subtracting 1/1/1999 from 12/31/2020', (): void => {
				var startDate: string = '1/1/1999';
				var endDate: string = '12/31/2020';

				var result: date.IDateValue = dateUtility.subtractDates(startDate, endDate);

				expect(result.years).to.equal(21);
				expect(result.months).to.equal(11);
				expect(result.days).to.equal(30);
			});

			it('should take leap year into account and return 28 days when subtracting 2/3/2016 from 3/2/2016', (): void => {
				// 2016 is a leap year
				var startDate: string = '2/3/2016';
				var endDate: string = '3/2/2016';

				var result: date.IDateValue = dateUtility.subtractDates(startDate, endDate);

				expect(result.years).to.equal(0);
				expect(result.months).to.equal(0);
				expect(result.days).to.equal(28);
			});

			it('should properly handle when day and month of start date are higher than day and month of end date', (): void => {
				var startDate: string = '12/31/2000';
				var endDate: string = '1/1/2001';

				var result: date.IDateValue = dateUtility.subtractDates(startDate, endDate);

				expect(result.years).to.equal(0);
				expect(result.months).to.equal(0);
				expect(result.days).to.equal(1);
			});

			it('should recognize when days are just under a year apart', (): void => {
				var startDate: string = '9/12/2000';
				var endDate: string = '9/10/2001';

				var result: date.IDateValue = dateUtility.subtractDates(startDate, endDate);

				expect(result.years).to.equal(0);
				expect(result.months).to.equal(11);
				expect(result.days).to.equal(28);
			});
		});

		describe('subtractDatesInDays', (): void => {
			it('should get 0 days when subtracting the same date from itself', (): void => {
				var startDate: string = '9/10/2014';
				var endDate: string = '9/10/2014';

				expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(0);
			});

			it('should get 92 when subtracting 6/9/2009 from 9/9/2009', (): void => {
				var startDate: string = '6/9/2009';
				var endDate: string = '9/9/2009';

				// 30 + (2 x 31) = 92
				expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(92);
			});

			it('should take leap yer into account and return 28 days when subtracting 2/3/2016 from 3/2/2016', (): void => {
				// 2016 is a leap year
				var startDate: string = '2/3/2016';
				var endDate: string = '3/2/2016';

				expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(28);
			});

			it('should properly handle when day and month of start date are higher than day and month of end date', (): void => {
				var startDate: string = '12/31/2000';
				var endDate: string = '1/1/2001';

				expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(1);
			});

			it('should handle dates that are just under a year apart', (): void => {
				var startDate: string = '9/12/2000';
				var endDate: string = '9/10/2001';

				expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(363);
			});

			it('should return a negative value if the first date is after the second', (): void => {
				var startDate: string = '9/10/2015';
				var endDate: string = '9/10/2014';

				expect(dateUtility.subtractDateInDays(startDate, endDate)).to.equal(-365);
			});
		});

		describe('compareDates', (): void => {
			it('should return less if the first date is before the second', (): void => {
				var date: string = '9/10/2000';
				var laterDate: string = '9/10/2001';

				expect(dateUtility.compareDates(date, laterDate)).to.equal(compareResult.CompareResult.less);
			});

			it('should return equal if the dates are the same', (): void => {
				var date: string = '9/10/2000';
				var equalDate: string = '9/10/2000';

				expect(dateUtility.compareDates(date, equalDate)).to.equal(compareResult.CompareResult.equal);
			});

			it('should return greater if the first date if after the second', (): void => {
				var date: string = '9/10/2000';
				var earlierDate: string = '9/10/1999';

				expect(dateUtility.compareDates(date, earlierDate)).to.equal(compareResult.CompareResult.greater);
			});
		});

		describe('dateInRange', (): void => {
			it('should return false if the date is before the beginning of the range', (): void => {
				expect(dateUtility.dateInRange('1/1/2014', '1/1/2015', '1/1/2018')).to.be.false;
				expect(dateUtility.dateInRange('12/31/2014', '1/1/2015', '1/1/2018')).to.be.false;
			});

			it('should return false if the date is after the end of the range', (): void => {
				expect(dateUtility.dateInRange('1/1/2019', '1/1/2015', '1/1/2018')).to.be.false;
				expect(dateUtility.dateInRange('1/2/2018', '1/1/2015', '1/1/2018')).to.be.false;
			});

			it('should return true if the date is within the range', (): void => {
				expect(dateUtility.dateInRange('1/1/2015', '1/1/2015', '1/1/2018')).to.be.true;
				expect(dateUtility.dateInRange('1/1/2016', '1/1/2015', '1/1/2018')).to.be.true;
				expect(dateUtility.dateInRange('1/1/2017', '1/1/2015', '1/1/2018')).to.be.true;
				expect(dateUtility.dateInRange('1/1/2018', '1/1/2015', '1/1/2018')).to.be.true;
			});
		});
	});
}
