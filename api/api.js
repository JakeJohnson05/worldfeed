/**
 * The is the main router for all api requests
 */
const router = require('express').Router();

// set up router to use for sending emails
router.use('/email', require('./email/email.js'));

module.exports = router;
