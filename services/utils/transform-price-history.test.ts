import type {Price} from '../../models/price';
import transformPriceHistory from './transform-price-history';

test('Transforms price history', () => {
	const prices = [
		{municipality: 'Stockholm', priceCents: 100_00},
		{municipality: 'Stockholm', priceCents: 120_00},
		{municipality: 'Göteborg', priceCents: 110_00},
	] as Price[];
	const expectedResult = {
		Stockholm: [100_00, 120_00],
		Göteborg: [110_00],
	};

	const result = transformPriceHistory(prices);

	expect(result).toEqual(expectedResult);
});
