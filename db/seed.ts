import {Package} from '../models/package';
import {Price} from '../models/price';

export const seedDatabase = async () => {
	await Package.destroy({truncate: true});

	await Package.bulkCreate([
		{name: 'basic', priceCents: 20_000},
		{name: 'plus', priceCents: 59_900},
		{name: 'premium', priceCents: 111_100},
	], {validate: true});

	const basic = (await Package.findOne({where: {name: 'basic'}}))!;
	const plus = (await Package.findOne({where: {name: 'plus'}}))!;
	const premium = (await Package.findOne({where: {name: 'premium'}}))!;

	await Price.bulkCreate([
		{
			priceCents: 5000, packageId: basic.id, municipality: 'Göteborg', priceDate: new Date('2020-01-01'),
		},
		{
			priceCents: 10_000, packageId: basic.id, municipality: 'Stockholm', priceDate: new Date('2020-01-01'),
		},
	], {validate: true});

	await Price.bulkCreate([
		{
			priceCents: 19_990, packageId: plus.id, municipality: 'Göteborg', priceDate: new Date('2020-01-01'),
		},
		{
			priceCents: 29_900, packageId: plus.id, municipality: 'Stockholm', priceDate: new Date('2020-01-01'),
		},
		{
			priceCents: 39_900, packageId: plus.id, municipality: 'Stockholm', priceDate: new Date('2020-01-02'),
		},
	], {validate: true});

	await Price.bulkCreate([
		{
			priceCents: 55_000, packageId: premium.id, municipality: 'Göteborg', priceDate: new Date('2020-01-01'),
		},
		{
			priceCents: 66_600, packageId: premium.id, municipality: 'Stockholm', priceDate: new Date('2020-01-01'),
		},
		{
			priceCents: 77_700, packageId: premium.id, municipality: 'Stockholm', priceDate: new Date('2020-01-02'),
		},
		{
			priceCents: 88_800, packageId: premium.id, municipality: 'Stockholm', priceDate: new Date('2020-01-03'),
		},
	], {validate: true});
};
