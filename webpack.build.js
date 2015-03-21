"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/* jshint node: true, esnext: true */

var webpack = _interopRequire(require("webpack"));

var entry = {
	index: "./src/index" };

var output = {
	path: __dirname + "/build/",
	publicPath: "/build/",
	filename: "[name].js"
	// devServer ? id : name
	// chunkFilename: ( true ) ? '[id].js' : '[name].js',
	// publicPath: '/_assets/',
	// hot reload:
	// sourceMapFilename: 'debugging/[file].map',
	// ? idk
	// pathinfo: true
};

var externals = {
	react: "React"
};

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

var resolve = {
	root: __dirname + "/src",
	modulesDirectories: ["web_modules", "node_modules"],
	extensions: ["", ".web.js", ".js", ".jsx"] };

var plugins = [];

module.exports = {
	target: target,
	module: { loaders: loaders },
	entry: entry,
	output: output,
	externals: externals,
	resolve: resolve,
	plugins: plugins };

// vendor: [ 'react', 'flux' ]

// alias: {
// 	'react': 'react/dist/react.min.js'
// }

// new webpack.optimize.CommonsChunkPlugin(
// 	"vendor", // chunkName
// 	"vendor.bundle.js" // file
// )

// new webpack.optimize.UglifyJsPlugin()

// node: { fs: 'empty' },
