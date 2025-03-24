import sortPriceList from './sort-price-list';

describe('sortPriceList', () => {
	it('should sort a list of price items by packageId and municipality', () => {
		const priceList = [
			{packageId: 1, municipality: 'A', priceCents: 100},
			{packageId: 2, municipality: 'B', priceCents: 200},
			{packageId: 2, municipality: 'A', priceCents: 300},
			{packageId: 1, municipality: 'B', priceCents: 400},
		];

		const sortedPriceList = sortPriceList(priceList);

		expect(sortedPriceList).toEqual([
			{packageId: 1, municipality: 'A', priceCents: 100},
			{packageId: 1, municipality: 'B', priceCents: 400},
			{packageId: 2, municipality: 'A', priceCents: 300},
			{packageId: 2, municipality: 'B', priceCents: 200},
		]);
	});
});
