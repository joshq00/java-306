import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.dev.es6';
import express from 'express';

// console.log( config.loaders[0].loaders );
// process.exit(0);

let app = new WebpackDevServer( webpack( config ), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
});

app.use( '/', express.static( 'public' ) );
app.use( '/', express.static( '.' ) );
// app.use( '/build', express.static( 'build' ) );
app.use( '/assets', express.static( 'assets' ) );
app.use( '/node_modules', express.static( 'node_modules' ) );

app.listen( config.port, function ( err, result ) {
	if ( err ) {
		console.log( err );
	}

	console.log( 'Listening at localhost:' + config.port );
});