/* jshint node: true, esnext: true */
import webpack from 'webpack';

let port = process.env.PORT || 5000;

let devtool = 'eval';

let entry = [
	'./src/index',
];

let output = {
	path: __dirname + '/build/',
	publicPath: '/build/',
	// filename: '[name].js',
	filename: 'index.js',
	// devServer ? id : name
	// chunkFilename: ( true ) ? '[id].js' : '[name].js',
	// publicPath: '/_assets/',
	// hot reload:
	// sourceMapFilename: 'debugging/[file].map',
	// ? idk
	// pathinfo: true
};


let target = 'web';


let loaders = [ {
	test: /\.jsx?$/,
	loaders: [
		'babel'
	],
	exclude: /node_modules/
}, {
	test: /\.json$/,
	loader: 'json'
}, {
	test: /\.less$/,
	loaders: [ 'style', 'css', 'less' ],
	// loader: 'style-loader!css-loader!less-loader'
} ];
let module = {
	loaders,
	// noParse: /\bdebug\b/,
};


let resolveLoader = {
	root: __dirname + '/node_modules',
	alias: {}
};


let externals = {
	'react': 'React'
};


let resolve = {
	root: __dirname + '/src',
	modulesDirectories: [
		'web_modules',
		'node_modules'
	],
	extensions: [
		'',
		'.web.js',
		'.js',
		'.jsx'
	],
	// alias: {}
};


let devServer = {
	stats: {
		exclude: [
			/node_modules/
		]
	}
};

let plugins = [
	new webpack.optimize.UglifyJsPlugin()
];

export default {
	module: { loaders },
	port,
	// devtool,
	entry,
	output,
	// target,
	// resolveLoader,
	// externals,
	resolve,
	plugins,
	// devServer,

	// devtool: 'eval',
	// debug: true,
	// node: { fs: 'empty' },
};
