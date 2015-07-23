/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

/// <reference path='parentChildBehavior.service.ts' />
/// <reference path='../test/angularFixture.ts' />

interface ITestBehavior {
	action: Function;
}

describe('parentChildBehavior', () => {
	var parentChildBehavior: rl.utilities.parentChildBehavior.IParentChildBehaviorService;

	beforeEach(() => {
		angular.mock.module(rl.utilities.parentChildBehavior.moduleName);

		var services: any = rl.utilities.test.angularFixture.inject(rl.utilities.parentChildBehavior.serviceName);
		parentChildBehavior = services[rl.utilities.parentChildBehavior.serviceName];
	});

	describe('register', (): void => {
		it('should register a child behavior by putting it on the view data of the child', (): void => {
			var child: rl.utilities.parentChildBehavior.IChild<ITestBehavior> = { viewData: null };
			var behavior: ITestBehavior = { action: (): number => { return 3; } };

			parentChildBehavior.registerChildBehavior(child, behavior);

			expect(child.viewData.behavior).to.equal(behavior);
		});

		it('should use the existing viewData object if one exists', (): void => {
			var childWithViewData: rl.utilities.parentChildBehavior.IChild<ITestBehavior> = <any>{ viewData: { randomValue: 5 } };
			var behavior: ITestBehavior = { action: (): number => { return 5; } };

			parentChildBehavior.registerChildBehavior(childWithViewData, behavior);

			expect(childWithViewData.viewData.behavior).to.equal(behavior);
			expect((<any>childWithViewData.viewData).randomValue).to.equal(5);
		});

		it('should not register child behavior if child object is null', (): void => {
			var behavior: ITestBehavior = { action: (): number => { return 3; } };
			var child: rl.utilities.parentChildBehavior.IChild<ITestBehavior> = null;
			parentChildBehavior.registerChildBehavior(child, behavior);
			expect(parentChildBehavior.getChildBehavior(child)).to.be.null;
		});
	});

	describe('getChildBehavior', (): void => {
		it('should get the behavior of an individual child', (): void => {
			var behavior1: ITestBehavior = { action: (): number => { return 3; } };
			var child: rl.utilities.parentChildBehavior.IChild<ITestBehavior> = { viewData: { behavior: behavior1 } };

			expect(parentChildBehavior.getChildBehavior(child)).to.equal(behavior1);
		});

		it('should get existing behaviors for a list of children', (): void => {
			var behavior1: ITestBehavior = { action: (): number => { return 3; } };
			var behavior2: ITestBehavior = { action: (): number => { return 7; } };
			var childList: rl.utilities.parentChildBehavior.IChild<ITestBehavior>[] = [
				{ viewData: { behavior: behavior1 } },
				{ viewData: { behavior: null } },
				{ viewData: { behavior: behavior2 } },
			];

			var behaviors: ITestBehavior[] = parentChildBehavior.getAllChildBehaviors(childList);

			expect(behaviors.length).to.equal(2);
			expect(behaviors[0]).to.equal(behavior1);
			expect(behaviors[1]).to.equal(behavior2);
		});
	});
});
