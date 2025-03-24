import type {Price} from '../../models/price';
import type PriceListItem from '../types/price-list-litem';

// eslint-disable-next-line arrow-body-style
const transformPriceList = (prices: Price[]): PriceListItem[] => {
	return prices.map(price => ({
		packageId: price.packageId,
		municipality: price.municipality || '',
		priceCents: price.priceCents,
	}));
};

export default transformPriceList;
