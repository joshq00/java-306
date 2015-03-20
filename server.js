var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var config = require( './webpack.build' );

new WebpackDevServer( webpack( config ), {
	publicPath: config.output.publicPath,
	historyApiFallback: true
})
.listen( config.port, function ( err, result ) {
	if ( err ) {
		console.log( err );
	}

	console.log( 'Listening at localhost:' + config.port );
});
