import {sequelizeConnection} from '../db/config';
import {Package} from '../models/package';
import {Price} from '../models/price';

const packageService = {
	async getAll() {
		return Package.findAll({
			include: [
				{model: Price, as: 'prices'},
			],
		});
	},
	async updatePackagePrice(pack: Package, newPriceCents: number, municipality?: string, priceDate?: Date) {
		try {
			const newPackage = await sequelizeConnection.transaction(async t => {
				await Price.create({
					packageId: pack.id,
					priceCents: newPriceCents,
					municipality,
					priceDate,
				}, {transaction: t});

				pack.priceCents = newPriceCents;

				return pack.save({transaction: t});
			});

			return newPackage;
		} catch {
			throw new Error('Error handling the transaction');
		}
	},
	async priceFor(pack: Package, municipality: string) {
		const foundPrice = await Price.findOne({
			where: {packageId: pack.id, municipality},
			order: [['createdAt', 'DESC']],
		});

		if (!foundPrice) {
			return null;
		}

		return foundPrice.priceCents;
	},
};

export default packageService;
