import {Sequelize} from 'sequelize';

// eslint-disable-next-line n/prefer-global/process
const logging = process.env.LOGGING === 'true';

const sequelizeConnection = new Sequelize({
	logging,
	dialect: 'sqlite',
	storage: './db/sqlite.db',
});

export {sequelizeConnection};
