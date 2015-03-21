/* jshint node: true, esnext: true */
import webpack from 'webpack';

let entry = {
	index: './src/index',
	// vendor: [ 'react', 'flux' ]
};

let output = {
	path: __dirname + '/build/',
	publicPath: '/build/',
	filename: '[name].js'
	// devServer ? id : name
	// chunkFilename: ( true ) ? '[id].js' : '[name].js',
	// publicPath: '/_assets/',
	// hot reload:
	// sourceMapFilename: 'debugging/[file].map',
	// ? idk
	// pathinfo: true
};

let externals = {
	react: 'React'
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
} ];

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
	// alias: {
	// 	'react': 'react/dist/react.min.js'
	// }
};


let plugins = [
	// new webpack.optimize.CommonsChunkPlugin(
	// 	"vendor", // chunkName
	// 	"vendor.bundle.js" // file
	// )

	// new webpack.optimize.UglifyJsPlugin()
];

export default {
	target,
	module: { loaders },
	entry,
	output,
	externals,
	resolve,
	plugins,
	// node: { fs: 'empty' },
};
