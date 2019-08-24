/**
 * The is the router for performing actions for a user
 * 
 * all URIs are relative to '/user' here
 */
const router = require('express').Router();

// require the passport instance from the local-strategy module here
const { passport } = require('../authentication/local-strategy');
// bcrypt module will be used for hashing passwords
const bcrypt = require('bcrypt');
/** this determines the cost of generating a bcrypt hash (set appropriately so as to make brute-force-esque attacks obsolete) */
const saltRounds = Number.parseInt(process.env.SALT_ROUNDS);
//import express-validator
const { check, validationResult } = require('express-validator');
/** custom validator checking to check if the username and or email are unique */
const uniqueUsernameEmail = require('../authentication/unique-creds');
/** middleware for ensuring a user is logged in */
const ensureLoggedIn = require('../authentication/ensure-logged-in');
// import models from the database
const { User } = require('@database');

router.get('/info', ensureLoggedIn('/login'), (req, res) => {
	User.findByPk(req.user.id)
		.then(user => user ? res.status(200).json(user) : res.status(404).json('No User found'))
		.catch(err => res.status(500).json(err));
})

/**
 * this is the user log in endpoint.
 * it takes a username and password and checks them against the user credentials table in the database.
 * the response consists of the username, user id, authentication token, and other user information
 */
router.post('/login',
	//passport's authenticate middleware will send a 401 response if the user does not pass authentication
	passport.authenticate('local', { failureFlash: true }),
	(req, res) => res.status(200).json({ success: true, redirectTo: '' })
)

/**
 * This is the register new user endpoint.
 * It takes a username, password, first name, and last name,
 * and if the username does not already exist in the database,
 * it creates database entries for this user
 */
router.post('/register', [
	//validate the input with express-validator
	check('username')
		.exists().withMessage('Required')
		.isLength({ min: 8 }).withMessage('Enter at least 8 characters')
		.isLength({ max: 50 }).withMessage('Enter no more than 50 characters')
		.custom(uniqueUsernameEmail),
	check('password')
		.exists().withMessage('Required')
		.isLength({ min: 10 }).withMessage('Must be at least 10 characters'),
	check('email')
		.exists().withMessage('Required')
		.isEmail().withMessage('Enter a valid email address')
		.isLength({ max: 254 }).withMessage('Enter no more than 254 characters')
		.custom(uniqueUsernameEmail),
	check('firstName')
		.exists().withMessage('Required')
		.isLength({ max: 50 }).withMessage('Enter no more than 50 characters'),
	check('lastName')
		.exists().withMessage('Required')
		.isLength({ max: 50 }).withMessage('Enter no more than 50 characters'),
], (req, res) => {

	//collect validation errors (if there are any) from the validationResult function
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

	//since there were no validation errors,
	//hash the password, then create some new user credentials, along with a new associated user
	bcrypt.hash(req.body.password, saltRounds)
		.then(hash => {
			if (hash.length > 255) return res.status(422).json({
				errors: [{
					location: "body",
					param: "password",
					msg: "Hash Error: Please try a different password"
				}]
			})

			// create the User from body form
			return User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				email: req.body.email,
				password: hash
			})
		}).then(user => {
			// log in the newly created user
			req.login(user, (err) => { if (err) throw Error(err) });

			return res.status(201).json(user);
		})
})

/**
 * Check if the the User is authenticated and logged in
 *
 * return 200 if true
 * return 401 if false
 */
router.get('/isauth', (req, res) => {
	if (req.user) res.status(200).json({ auth: true });
	else res.status(401).json({ auth: false });
})

/**
 * Logs a User out with passport
 */
router.get('/logout', (req, res) => {
	req.logout();
	res.status(200).json({ auth: false });
})

module.exports = router;
