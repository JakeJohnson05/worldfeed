const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('@database');
/** Operators for sequelize querys */
const Op = require('sequelize').Op;
/** Module for hashed passwords */
const bcrypt = require('bcrypt');

/** The strategy used to login users */
const localStrategy = new LocalStrategy((usernameOrEmail, password, done) => {
	// find a user by either their username or email
	User.findOne({
		where: {
			[Op.or]: [
				{ username: usernameOrEmail },
				{ email: usernameOrEmail }
			]
		}
	}).then(user => {
		// if no email or username matches
		if (!user) return done(null, false, 'Incorrect Username or Email');

		// if there is a User, check the password
		return bcrypt.compare(password, user.password)
			.then(passMatch => {
				// if the passwords do not match
				if (!passMatch) return done(null, false, 'Incorrect Password');
				// if passwords match
				return done(null, user)
			}).catch(err => done(err))
	}).catch(err => done(err))
});

passport.serializeUser((user, done) => {
	done(null, user.id)
});
passport.deserializeUser((id, done) => {
	User.findByPk(id)
		.then(user => done(null, user))
		.catch(err => done(err))
})

module.exports = { localStrategy, passport }
