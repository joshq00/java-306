if ( typeof document !== 'undefined' ) {
	return;
}

import jsdom from 'jsdom';

let dom = jsdom.jsdom('<html><body></body><html>');
global.document = dom;
global.window = dom.defaultView;
global.navigator = {
	userAgent: 'node.js'
};

export default dom;