import './dom';
import React from 'react';
import { addons } from 'react/addons';
import SkuList from './sku-list';
import store from './sku-store';

let { TestUtils } = addons;

let cmp = TestUtils.renderIntoDocument( <SkuList /> );
// let cmp = React.render( <SkuList />, document );
// cmp.setState({
// 	skus: [
// 		{
// 			"sku": "1000524245",
// 			"descr": "1\" COMPACT SDS ROTARY HAMMER",
// 			"uom": "EA",
// 			"onhand": 2,
// 			"imageS": "images/skus/1000524245.jpg",
// 			"status": "C",
// 			"status_txt": "Clearance",
// 			"dept": "0025",
// 			"dept_txt": "25 HARDWARE",
// 			"price": 369,
// 			"upc": "045242025299"
// 		},
// 	]
// });

store.on( () => {
	console.log( cmp.state );
	console.log( store.getAll() );

	// let { document, window, navigator } = global;
	console.log( cmp.getDOMNode().innerHTML );
	console.log( TestUtils.isElement( cmp ) );
});

// setTimeout( () => console.log( React.renderToStaticMarkup( cmp ) ), 500 );