/**
 * The is the router for performing all email sending requests
 */
const router = require('express').Router();

/** The transporter for sending all emails */
const transporter = require('nodemailer').createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

module.exports = router;
