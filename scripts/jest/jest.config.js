"use strict";

module.exports = {
	//   haste: {
	//     hasteImplModulePath: require.resolve('./noHaste.js')
	//   },
	// Only include files directly in __tests__, not in nested folders.
	testRegex: "/__tests__/[^/]*(\\.js|\\.coffee|[^d]\\.ts)$",
	moduleFileExtensions: ["js", "json", "node", "coffee", "ts"],
	rootDir: process.cwd(),
	roots: ["<rootDir>"],
	collectCoverageFrom: ["/**/*.js"],
	timers: "fake"
};
