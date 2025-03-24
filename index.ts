import express from 'express';
import packagesRoutes from './routes/package.routes';
import pricesRoutes from './routes/price.routes';
import {sequelizeConnection} from './db/config';
import {seedDatabase} from './db/seed';

const port = 3000;
export const app = express();

app.listen(port, () => {
	console.log(`Hemnet application running on port ${port}!`);
});
app.use(express.json());

//  Initialize database //
// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
sequelizeConnection.sync({force: true}).then(async () => {
	console.log('DB running');

	await seedDatabase();
});

app.use('/api/packages', packagesRoutes);
app.use('/api/prices', pricesRoutes);
