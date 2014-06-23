var fs = require('fs');
var join = require('path').join;

exports.useragent = require('./agent.json');

// map lookup for sources with aliases
// source[name] = js string
var source = exports.source = {};
exports.aliases = {};

var sourceFolder = join(__dirname, 'source');

fs.readdirSync(sourceFolder).forEach(function (path) {

	var config = require(join(sourceFolder, path, 'config.json'));
	source[path] = {
		file: fs.readFileSync(join(sourceFolder, path, 'polyfill.js'), 'utf8'),
		config: config
	};

	// Cache alias names for fast lookup
	for (var alias in config.aliases) {
		if (exports.aliases[config.aliases[alias]]) {
			exports.aliases[config.aliases[alias]].push(path);
		} else {
			exports.aliases[config.aliases[alias]] = [ path ];
		}
	}
});