/**
 * This module exports a constructor for a sequelize model User
 *
 * This model represents basic personal information about a user.
 * (things like name, profession, etc.)
 *
 * @param sequelize - the reference to our sequelize instance
 * @param type - the Sequelize class so that we can use the static types it contains
 */
module.exports = (sequelize, type) => {
	return sequelize.define('user', {
		/** the primary key id */
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		/** first name of the user */
		firstName: {
			type: type.STRING(50),
			field: 'first_name'
		},
		/** last name of the user */
		lastName: {
			type: type.STRING(50),
			field: 'last_name'
		}
	})
}
