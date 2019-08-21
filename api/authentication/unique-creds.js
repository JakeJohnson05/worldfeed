// require the sequelize instance and user credentials model so that we can query existing credentials
const { sequelize, User } = require('@database');
/** Sequelize operators for querying */
const Op = sequelize.Op;

/**
 * this is a custom validator function to be used in the express-validator middleware.
 * 
 * it checks the UserCredentials table for any usernames that match the requested
 * username and email (case-insensitive, using toLowerCase), and if there are any, it
 * throws an Error telling the validator that this custom function did not
 * pass the validation.
 */
module.exports = usernameEmail => {
	if (!usernameEmail) throw new Error('Username or Email required');
	User.count({
		where: {
			[Op.or]: [{
				'username': sequelize.where(
					sequelize.fn('lower', sequelize.col('username')),
					usernameEmail.toLowerCase()
				)
			}, {
				'email': sequelize.where(
					sequelize.fn('lower', sequelize.col('email')),
					usernameEmail.toLowerCase()
				)
			}]
		}
		//if there are any entries with the same username, throw an error to the validator
	}).then(users => { if (users > 0) throw new Error('Username or Email is already taken') })
	.catch(err => { throw new Error('Problem checking if the username or email is unique') })
}
