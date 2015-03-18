export function trigger ( el, type, data ) {
	let event;
	if ( document.createEvent ) {
		// try {
		// 	// event = document.createEvent( 'HTMLEvents' );
		// 	event = document.createEvent( 'UIEvent' );
		// } catch ( e ) {
		event = document.createEvent( 'Event' );
		// }
		event.initEvent( type, true, true );
	} else if ( document.createEventObject ) { // IE < 9
		event = document.createEventObject();
		event.eventType = type;
	}
	event.data = data;

	if ( el.dispatchEvent ) {
		el.dispatchEvent( event );
	} else if ( el.fireEvent && htmlEvents[ 'on' + type ] ) { // IE < 9
		el.fireEvent( 'on' + event.eventType, event ); // can trigger only real event (e.g. 'click')
	} else if ( el[ type ] ) {
		el[ type ]();
	} else if ( el[ 'on' + type ] ) {
		el[ 'on' + type ]();
	}
}

export function on ( el, type, handler ) {
	if ( el.addEventListener ) {
		el.addEventListener( type, handler, false );
	} else if ( el.attachEvent && htmlEvents[ 'on' + type ] ) { // IE < 9
		el.attachEvent( 'on' + type, handler );
	} else {
		el[ 'on' + type ] = handler;
	}
}

export function off ( el, type, handler ) {
	if ( el.removeventListener ) {
		el.removeEventListener( type, handler, false );
	} else if ( el.detachEvent && htmlEvents[ 'on' + type ] ) { // IE < 9
		el.detachEvent( 'on' + type, handler );
	} else {
		el[ 'on' + type ] = null;
	}
}
