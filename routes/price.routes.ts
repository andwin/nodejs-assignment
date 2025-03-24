import * as express from 'express';
import priceController from '../controllers/price.controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', priceController.list);

export default router;
