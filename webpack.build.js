"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/* jshint node: true, esnext: true */

var webpack = _interopRequire(require("webpack"));

var port = process.env.PORT || 3000;

var devtool = "eval";

var entry = ["./src/index"];

var output = {
	path: __dirname + "/build/",
	publicPath: "/build/",
	// filename: '[name].js',
	filename: "index.js" };

var target = "web";

var loaders = [{
	test: /\.jsx?$/,
	loaders: ["babel"],
	exclude: /node_modules/
}, {
	test: /\.json$/,
	loader: "json"
}, {
	test: /\.less$/,
	loaders: ["style", "css", "less"] }];
var _module = {
	loaders: loaders };

var resolveLoader = {
	root: __dirname + "/node_modules",
	alias: {}
};

var externals = {
	react: "React"
};

var resolve = {
	root: __dirname + "/src",
	modulesDirectories: ["web_modules", "node_modules"],
	extensions: ["", ".web.js", ".js", ".jsx"] };

var devServer = {
	stats: {
		exclude: [/node_modules/]
	}
};

module.exports = {
	module: { loaders: loaders },
	port: port,
	// devtool,
	entry: entry,
	output: output,
	// target,
	// resolveLoader,
	// externals,
	resolve: resolve };

// devServer ? id : name
// chunkFilename: ( true ) ? '[id].js' : '[name].js',
// publicPath: '/_assets/',
// hot reload:
// sourceMapFilename: 'debugging/[file].map',
// ? idk
// pathinfo: true

// loader: 'style-loader!css-loader!less-loader'

// noParse: /\bdebug\b/,

// alias: {}

// plugins,
// devServer,

// devtool: 'eval',
// debug: true,
// node: { fs: 'empty' },
