var CMDLINE_OPTIONS = {
	forceSyncDB: false,
	verboseBuilds: false,
};

// process command line arguments
process.argv.forEach(val => {
	// force sync the database
	if (val == '-fsync') CMDLINE_OPTIONS.forceSyncDB = true;
	// tell modules to output verbose logging
	if (val == '-verbose') CMDLINE_OPTIONS.verboseBuilds = true;
});

module.exports = CMDLINE_OPTIONS;
