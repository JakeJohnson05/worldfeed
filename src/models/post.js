/**
 * This module exports a constructor for a sequelize model Post
 *
 * This model contains the constructor for Posts
 *
 * @param sequelize - the reference to our sequelize instance
 * @param type - the Sequelize class so that we can use the static types it contains
 */
module.exports = (sequelize, type) => sequelize.define('post', {
	/** the primary key */
	id: {
		type: type.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: type.STRING(50),
		allowNull: false
	},
	/** The body of the post */
	text: {
		type: type.STRING(255),
		allowNull: false
	}
})
