"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/* jshint node: true, esnext: true */

var webpack = _interopRequire(require("webpack"));

var port = process.env.PORT || 3000;

var devtool = "eval";

var entry = ["webpack-dev-server/client?http://localhost:" + port, "webpack/hot/only-dev-server", "./src/index"];

var output = {
	path: __dirname + "/build/",
	publicPath: "/build/",
	// filename: '[name].js',
	filename: "index.js",
	// devServer ? id : name
	// chunkFilename: ( true ) ? '[id].js' : '[name].js',
	// publicPath: '/_assets/',
	// hot reload:
	sourceMapFilename: "debugging/[file].map" };

var target = "web";

var loaders = [{
	test: /\.jsx?$/,
	loaders: ["react-hot", "babel"],
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

var plugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()];

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
	resolve: resolve,
	plugins: plugins,
	// devServer,

	devtool: "eval",
	// debug: true,
	node: { fs: "empty" } };

// ? idk
// pathinfo: true

// loader: 'style-loader!css-loader!less-loader'

// noParse: /\bdebug\b/,

// alias: {}
