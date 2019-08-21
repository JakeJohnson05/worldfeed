const express = require('express');

/**
 * server.js is the entry point to the program. It creates
 * an express server which serves an angular application, interacts with
 * the database, and acts as an api for the angular application.
 */
const app = express();

// configure environment vars
require('dotenv').config();

// imports
const path = require('path');
const http = require('http');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// express-session is used to establish a session with a user, using cookies
// const session = require('express-session');
// require connect-session-sequelize which will let us store the session information in the database
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

///////////////////////////////////////////////////////////////////////

// connect to the database and require the instance and models here
// NOTE: make sure nothing that requires the database happens before the database is initialized
// const { sequelize } = require('./database');
// require the passport.js local strategy and passport instance we set up in local-strategy.js
// const { localStrategy, passport } = require('./server/authentication/local-strategy');

// require our api router here
const api = require('./api/api');

///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Middleware
//
// parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// set up express-session middleware
//
// create a session store for the express-session in our sequelize orm (MySQL)
// var sessionStore = new SequelizeStore({ db: sequelize });
// //session options
// const sess = {
// 	secret: "bblv3ow0kjbnanmmlx39nab0lcv2",
// 	store: sessionStore,
// 	resave: false,
// 	saveUninitialized: false,
// 	proxy: true,
// 	cookie: { secure: false }
// }
// use express-session to establish sessions with users, using cookies
// app.use(session(sess));
// create the tables for the session
// sessionStore.sync();

// set up flash middleware for flashing messages
app.use(flash());
// protect against dangerous web vulnerabilities by setting HTTP headers
app.use(helmet());

// implement our passport.js local strategy for authentication
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(localStrategy); 

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//Routes

// point static image requests to the image directory
// use this if we use assessment thumbnails
// app.use('/image', express.static(path.join(__dirname, 'image/')));

//point static path to dist
app.use(express.static(path.join(__dirname, 'dist/worldfeed')));

//set our api router
app.use('/api', api);

//NOTE: this must be defined after all other routes are defined
//catch all other routes and return the index html file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/worldfeed/index.html'));
});
////////////////////////////////////////////////////////////////////////

/** get a port from environment and store in express */
const port = process.env.PORT || '3000';
app.set('port', port);

/** Use http for the server */
const server = http.createServer(app);

//if running in production, listen on the hostname, instead of localhost
// if (process.env.DEV !== 'true') server.listen(port, hostname, () => console.log(`API running on https://${hostname}:${port}`));
server.listen(port, () => console.log(`API running on localhost:${port}`));
