/**
 * This module exports a constructor for a sequelize model User
 *
 * This model represents basic personal information about a user.
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
		type: type.STRING(50),
		allowNull: false
	},
	lastName: {
		type: type.STRING(50),
		allowNull: false
	},
	username: {
		type: type.STRING(50),
		allowNull: false
	},
	email: {
		type: type.STRING(255),
		allowNull: false
	},
	password: {
		type: type.STRING,
		allowNull: false
	},
	/** If the User's email is verified */
	verified: {
		type: type.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	/** Whether or not the User should recieve notifications */
	notifications: {
		type: type.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
})
