import {type Request, type Response} from 'express';
import PriceService from '../services/price.service';

const priceController = {
	async list(_: Request, response: Response) {
		const packages = await PriceService.getPriceList();

		response.send({packages});
	},
};

export default priceController;
