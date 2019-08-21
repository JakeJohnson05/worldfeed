/**
 * this is express middleware that determines whether the user
 * has established a passport session with the server, and provides
 * redirectTo and returnTo urls for the Angular client if the user
 * has not logged in yet.
 *
 * @param {string} redirectToUrl		The Angular route to redirect the client to, if the user is not logged in
 * @param {string} [redirectToUrl]	Where to take the user back to 
 */
module.exports = (redirectToUrl, returnToUrl = null) => (req, res, next) => {
	if (!req.isAuthenticated()) {
		if (!returnToUrl) returnToUrl = req.originalUrl || req.url;
		// if not authenticated, return status 401 with redirectTo and returnTo urls
		return res.status(401).json({
			redirectTo: redirectToUrl,
			returnTo: returnToUrl
		})
	} else {
		// if user is authenticated. Move to next function
		next();
	}
}
