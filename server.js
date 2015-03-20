/* jshint devel: true, node: true, strict: false */
var express = require( 'express' );
var app = express();

app.set( 'port', ( process.env.PORT || 5000 ) );
app.use( '/', express.static( __dirname, {
	extensions: [ 'htm', 'html' ]
} ) );
app.use( '/assets', express.static( __dirname + '/assets' ) );
app.use( '/build', express.static( __dirname + '/build' ) );

app.listen( app.get( 'port' ), function () {
	console.log( 'Node app is running at localhost:' + app.get( 'port' ) );
} );