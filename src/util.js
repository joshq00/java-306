// import http from 'http';
// import fs from 'fs';

export function getJson ( url ) {
	// return new Promise( function ( resolve, reject ) {
	// 	resolve( fs.readFileSync( url, { encoding: 'utf8' } ) );
	// } )
	// .then( JSON.parse );

	return new Promise( ( resolve, reject ) => {
// console.log( 'get it?' );
		// http.get( url, resolve )
		// 	.on( 'error', reject )
		// 	.then( a => {
		// 		debugger;
		// 	});
// console.log( 'got it?' );
		let req = new XMLHttpRequest();
		console.log( `get ${url}`, req );
		req.open( 'GET', url );
		req.onload = () => {
			// console.log( req );
			resolve( req.response );
		};
		req.onerror = reject;
		req.send();
	} )
// .then( x => { console.log( 'got it.' ); return x; } )
	// .then( res => res.response )
	.then( JSON.parse, e => {
		console.error( e );
		// process.exit();
	} );
}
