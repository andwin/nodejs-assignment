import {Op} from 'sequelize';
import type {Package} from '../models/package';
import {Price} from '../models/price';
import transformPriceHistory from './utils/transform-price-history';

const priceService = {
	async getPriceHistory(pack: Package, year: number) {
		const beginningOfYear = new Date(year, 0, 1);
		const endOfYear = new Date(year + 1, 0, 1);

		const foundPrices = await Price.findAll({
			where: {
				packageId: pack.id,
				priceDate: {
					[Op.gte]: beginningOfYear,
					[Op.lt]: endOfYear,
				},
			},
		});

		const transformedPrices = transformPriceHistory(foundPrices);

		return transformedPrices;
	},
};

export default priceService;
