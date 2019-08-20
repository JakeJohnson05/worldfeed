/**
 * The is the router for performing all email sending requests
 */
const router = require('express').Router();

/** The transporter for sending all emails */
// const transporter = nodemailer.createTransport({
// 	service: process.env.EMAIL_SERVICE,
// 	auth: {
// 		user: process.env.EMAIL,
// 		pass: process.env.EMAIL_PASSWORD
// 	}
// });

module.exports = router;
