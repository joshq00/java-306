// homework
// Build a simple app that does the following:
// Tell the user which store they are attached to
// Show the barcode once scanned
// Create content that is only visible for a specific LDAP Group

// http://www.homedepot.com/s/${upc}
// https://content-qa.homedepot.com/MobileFramework/firstphone/1.0/firstphoneapi.js
// http://devtools.homedepot.com/ChromeExtensions/
// https://webapps-qa.homedepot.com/MobileFrameworkEx/fpExample.html

import cheerio from 'cheerio';
import rp from 'request-promise';
// import rp from 'reqwest';

export function getProduct ( upc ) {
    let response = rp( `http://www.homedepot.com/s/${upc}` ).then( res => cheerio.load( res ) );
    // let title = response.then( $ => $('.product_title').first().text() );
    // let img = response.then( $ => $( 'meta[property="og:image"]' ).attr( 'content' ) );
    // response.then( $ => global.$ = $ )
    // img.then( console.log );

    let props = response.then( $ => {
        return $( 'meta[property^=og]' ).map( ( i, el ) => {
            let $el = cheerio( el );
            return {
                field: $el.attr( 'property' ).replace( 'og:', '' ),
                value: $el.attr( 'content' )
            };
        } ).toArray();
    });
    return props;
}
