/** Using Sequelize as the ORM to interact with the database */
const Sequelize = require('sequelize');

/** options from the command line */
const CMDLINE_OPTIONS = require('./cmdline-options.js');

/** The connection instance to the database */
// if in dev, use local creds and local db
// else, use the clearDB url
const sequelize = process.env.DEV ? new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
	host: 'localhost',
	dialect: 'mysql',
	logging: CMDLINE_OPTIONS.verboseBuilds || false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}) : new Sequelize(process.env.CLEARDB_DATABASE_URL);

// test the connection
sequelize.authenticate()
	.then(() => console.log('Connection established to the database'))
	.catch(err => console.error('Unable to connect to the database: ', err));

// construct each of the models here from the @models constructors
const User = require('@models/user')(sequelize, Sequelize);
const Post = require('@models/post')(sequelize, Sequelize);

// define associations

/** Each post belongs to a User and a User has many posts */
User.hasMany(Post, { onDelete: 'cascade' });
Post.belongsTo(User, { onDelete: 'cascade' });

// sync the tables
//	(force sync the database if the -fsync tag is present in the command line arguments)
sequelize.sync({ force: CMDLINE_OPTIONS.forceSyncDB })
	.then(() => {
		console.log(CMDLINE_OPTIONS.forceSyncDB ? 'Database successfully force-synced!' : 'Database successfully synced!');

		// if !admin create the base admin
		// require('@prod-modules/base_admin')({ verbose: CMDLINE_OPTIONS.verboseBuilds });
	}).catch(err => console.error('Database failed to sync: ', err));


module.exports = {
	/** export the sequelize instance */
	sequelize,
	/** export the generated models */
	User,
	Post
}
