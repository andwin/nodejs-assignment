import type PriceListItem from '../types/price-list-litem';

// eslint-disable-next-line arrow-body-style
const sortPriceList = (priceList: PriceListItem[]): PriceListItem[] => {
	return priceList.sort((a, b) => {
		if (a.packageId !== b.packageId) {
			return a.packageId - b.packageId;
		}

		return a.municipality.localeCompare(b.municipality);
	});
};

export default sortPriceList;
