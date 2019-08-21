/**
 * This module exports a constructor for a sequelize model User
 *
 * This model represents basic personal information about a user.
 * (things like name, profession, etc.)
 *
 * @param sequelize - the reference to our sequelize instance
 * @param type - the Sequelize class so that we can use the static types it contains
 */
module.exports = (sequelize, type) => sequelize.define('user', {
	/** the primary key */
	id: {
		type: type.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	firstName: {
		type: type.STRING(50)
	},
	lastName: {
		type: type.STRING(50)
	},
	email: {
		type: type.STRING(255),
	},
	password: {
		type: type.STRING
	}
})
