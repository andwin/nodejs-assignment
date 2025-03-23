import type {Price} from '../../models/price';

type PriceHistory = Record<string, number[]>;

const transformPriceHistory = (prices: Price[]): PriceHistory => {
	const result: PriceHistory = {};

	for (const price of prices) {
		if (price.municipality) {
			result[price.municipality] ??= [];
			result[price.municipality].push(price.priceCents);
		}
	}

	return result;
};

export default transformPriceHistory;
