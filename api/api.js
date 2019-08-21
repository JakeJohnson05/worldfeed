/**
 * The is the main router for all api requests
 * 
 * URIs are relative to '/api' here
 */
const router = require('express').Router();

// set up router to use for sending emails
router.use('/email', require('./email/email'));
// set up router to use for interacting with the user
router.use('/user', require('./user/user'));

module.exports = router;
