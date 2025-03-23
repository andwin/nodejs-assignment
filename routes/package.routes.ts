import * as express from 'express';
import packageController from '../controllers/package.controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', packageController.getAll);

export default router;
