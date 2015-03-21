#!/bin/env node

var webpack = require( 'webpack' );
var port = process.env.PORT || 3000;

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:' + port,
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	output: {
		path: __dirname + '/build/',
		filename: 'index.js',
		publicPath: '/build/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: [ '', '.js', '.jsx', '.json' ],
		alias: {
			'assets': '../assets',
			'./assets': '../assets'
		},
		fallback: [
			'./'
		]
	},
	module: {
		loaders: [
			{ test: /\.json$/, loaders: [ 'json' ], exclude: /node_modules/ },
			{ test: /\.less$/, loaders: [ 'style', 'css', 'less' ], exclude: /node_modules/ },
			{ test: /\.jsx?$/, loaders: [ 'react-hot', 'babel' ], exclude: /node_modules/ }
		]
	}
};
