import {type Request, type Response} from 'express';
import PackageService from '../services/package.service';

const packageController = {
	async getAll(_: Request, response: Response) {
		const packages = await PackageService.getAll();

		response.send({packages});
	},
};

export default packageController;
