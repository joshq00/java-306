/* jshint devel: true, node: true, strict: false */
var express = require( 'express' );
var app = express();

app.set( 'port', ( process.env.PORT || 3000 ) );

app.use( '/', express.static( 'public' ) );
app.use( '/build', express.static( 'build' ) );
app.use( '/assets', express.static( 'assets' ) );
app.use( '/node_modules', express.static( 'node_modules' ) );

app.listen( app.get( 'port' ), function () {
	console.log( 'Node app is running at localhost:' + app.get( 'port' ) );
} );