import {sequelizeConnection} from '../../db/config';
import {Package} from '../../models/package';
import PackageService from '../../services/package.service';
import PriceService from '../../services/price.service';

describe('PriceService', () => {
	// Set the db object to a variable which can be accessed throughout the whole test file
	const database = sequelizeConnection;

	// Before any tests run, clear the DB and run migrations with Sequelize sync()
	beforeEach(async () => {
		await database.sync({force: true});
	});

	afterAll(async () => {
		await database.close();
	});

	it('Returns the pricing history for the provided year and package', async () => {
		const basic = await Package.create({name: 'basic', priceCents: 20_00});

		// These should NOT be included
		await Promise.all([
			PackageService.updatePackagePrice(basic, 20_00, 'Göteborg', new Date(2019, 0, 1)),
			PackageService.updatePackagePrice(basic, 30_00, 'Stockholm', new Date(2019, 0, 1)),
		]);

		await Promise.all([
			PackageService.updatePackagePrice(basic, 30_00, 'Göteborg', new Date(2020, 0, 1)),
			PackageService.updatePackagePrice(basic, 40_00, 'Stockholm', new Date(2020, 0, 1)),
			PackageService.updatePackagePrice(basic, 100_00, 'Stockholm', new Date(2020, 0, 2)),
		]);

		const expectedResult = {
			Göteborg: [30_00],
			Stockholm: [40_00, 100_00],
		};

		const result = await PriceService.getPriceHistory(basic, 2020);

		expect(result).toEqual(expectedResult);
	});

	it('Supports filtering on municipality', async () => {
		const basic = await Package.create({name: 'basic', priceCents: 2000});

		await Promise.all([
			PackageService.updatePackagePrice(basic, 20_00, 'Göteborg', new Date(2020, 0, 1)),
			PackageService.updatePackagePrice(basic, 30_00, 'Stockholm', new Date(2020, 0, 1)),
			PackageService.updatePackagePrice(basic, 100_00, 'Stockholm', new Date(2020, 0, 2)),
		]);

		const expectedResult = {
			Stockholm: [30_00, 100_00],
		};

		const result = await PriceService.getPriceHistory(basic, 2020, 'Stockholm');

		expect(result).toEqual(expectedResult);
	});
});
