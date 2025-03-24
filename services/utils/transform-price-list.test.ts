import type {Price} from '../../models/price';
import transformPriceList from './transform-price-list';

test('transformPriceList should transform prices to array of PriceListItem', () => {
	const prices = [
		{
			id: 1, packageId: 1, municipality: 'Stockholm', priceCents: 100_00, createdAt: new Date(),
		},
		{
			id: 2, packageId: 1, municipality: 'Stockholm', priceCents: 120_00, createdAt: new Date(),
		},
		{
			id: 3, packageId: 2, municipality: 'Göteborg', priceCents: 110_00, createdAt: new Date(),
		},
	] as Price[];
	const expectedResult = [
		{packageId: 1, municipality: 'Stockholm', priceCents: 100_00},
		{packageId: 1, municipality: 'Stockholm', priceCents: 120_00},
		{packageId: 2, municipality: 'Göteborg', priceCents: 110_00},
	];

	const result = transformPriceList(prices);

	expect(result).toEqual(expectedResult);
});
