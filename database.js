/** Using Sequelize as the ORM to interact with the database */
const Sequelize = require('sequelize');

// if in dev, use local creds and local db
// else, use the clearDB url
/** The connection instance to the database */
const sequelize = process.env.DEV ? new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
	logging: true,
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

	
//require all of the constructors for the db models
// const UserModel = require('@model-constructors/user');


//construct the models here, then define associations
// const User = UserModel(sequelize, Sequelize);

//define associations
//	set a custom foreign key in order to adhere to snake case style (avoid case-sensitivity
//	conflicts if the database ever has to be moved)

/**
 * UserCredentials belongsTo User because we want to find a User from their UserCredentials
 * (the foreignKey in this case exists in the UserCredentials table)
 */
// User.hasOne(UserCredentials, { onDelete: 'cascade', foreignKey: 'user_id' });
// UserCredentials.belongsTo(User, { onDelete: 'cascade', foreignKey: 'user_id' });

// sync the tables
//	(force sync the database if the --fsync tag is present in the command line arguments)
// sequelize.sync({ force: COMMAND_LINE_OPTIONS.forceSyncDatabase })
// 	.then(() => {
// 		console.log(COMMAND_LINE_OPTIONS.forceSyncDatabase ? 'The database has been successfully force-synced!' : 'The database has been successfully synced!');
// 		// if !admin create the base admin
// 		require('@prod-modules/base_admin')({ verbose: COMMAND_LINE_OPTIONS.verboseBuilds });

// 		if (COMMAND_LINE_OPTIONS.buildBaseModule) require('@prod-modules/base_build')({ verbose: COMMAND_LINE_OPTIONS.verboseBuilds });
// 		if (COMMAND_LINE_OPTIONS.buildCllaExt) require('@prod-modules/new_clla_build')({ verbose: COMMAND_LINE_OPTIONS.verboseBuilds, makeMigrations: COMMAND_LINE_OPTIONS.makeMigrations });
// 		if (COMMAND_LINE_OPTIONS.userCategoryMigration) require('@prod-modules/user_category_migration')({ makeMigrations: true });
// 		if (COMMAND_LINE_OPTIONS.createShortAssessments) require('@prod-modules/short_assessments_ext')({ verbose: COMMAND_LINE_OPTIONS.verboseBuilds });

// 		if (COMMAND_LINE_OPTIONS.createTest15Dimes) require('@tests/create_test_15_dimensions')({ verbose: COMMAND_LINE_OPTIONS.verboseBuilds, createUser: true });
// 		if (COMMAND_LINE_OPTIONS.createTestFiles) require('@tests/create_test_files')({ verbose: COMMAND_LINE_OPTIONS.verboseBuilds });
// 		if (COMMAND_LINE_OPTIONS.createTest15DimesNoUser && !COMMAND_LINE_OPTIONS.createTest15Dimes) require('@tests/create_test_15_dimensions')({ verbose: COMMAND_LINE_OPTIONS.verboseBuilds, createUser: false });
	// });


module.exports = {
	/** export the sequelize instance */
	sequelize,
	/** export the generated models */
	// User,
}
