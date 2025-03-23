import {Op} from 'sequelize';
import type {Package} from '../models/package';
import {Price} from '../models/price';
import transformPriceHistory from './utils/transform-price-history';

const priceService = {
	async getPriceHistory(pack: Package, year: number, municipality?: string) {
		const beginningOfYear = new Date(year, 0, 1);
		const endOfYear = new Date(year + 1, 0, 1);

		const where: Record<string, any> = {
			packageId: pack.id,
			priceDate: {
				[Op.gte]: beginningOfYear,
				[Op.lt]: endOfYear,
			},
		};

		if (municipality) {
			where.municipality = municipality;
		}

		const foundPrices = await Price.findAll({
			where,
			order: [['priceDate', 'ASC']],
		});

		const transformedPrices = transformPriceHistory(foundPrices);

		return transformedPrices;
	},
};

export default priceService;
