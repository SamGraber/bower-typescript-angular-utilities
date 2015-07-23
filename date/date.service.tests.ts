/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

/// <reference path='date.service.ts' />
/// <reference path='../test/angularFixture.ts' />

describe('dateUtility', () => {
	var dateUtility: rl.utilities.date.IDateUtility;

	beforeEach(() => {
		angular.mock.module(rl.utilities.date.moduleName);

		var services: any = rl.utilities.test.angularFixture.inject(rl.utilities.date.serviceName);
		dateUtility = services[rl.utilities.date.serviceName];
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
});
