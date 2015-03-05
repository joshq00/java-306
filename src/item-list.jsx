import React from 'react';
import itemStore from './item-store';
import action from './item-action';
import actions from './item-action-types';

/**
 * Check if a touch is within
 * the bounds of a dom node
 *
 * @param  {Touch} touch
 * @param  {HTMLElement} domNode - the container node
 * @return {boolean} is the touch within the bounds?
 */
function within ( touch, domNode ) {
	let coords = domNode.getClientRects()[ 0 ];
	let { top, bottom, left, right } = coords;
	let { clientX: x, clientY: y } = touch;

	switch ( true ) {
	case x == null:
	case y == null:
	case x < left:
	case x > right:
	case y < top:
	case y > bottom:
		return false;
	default:
		return true;
	}
}

let ListItem = React.createClass({
	getDefaultProps () {
		return {
			// how far must they move
			minOffset: 50,
			// how long do they have (ms)
			maxDelay: 500
		};
	},
	getInitialState () {
		return {
			touch: undefined,
			left: 0
		};
	},

	componentDidMount () {
		document.addEventListener( 'touchstart', this._onDocumentTouch );
	},
	componentWillUnmount () {
		document.removeEventListener( 'touchstart', this._onDocumentTouch );
	},

	/**
	 * Listen to document touch so that
	 * if a touch happens outside of this node
	 * we can cancel any touch state
	 */
	_onDocumentTouch ( e ) {
		let target = e.target;
		let domNode = this.getDOMNode();
		while ( target != null && target !== domNode ) {
			target = target.parentNode;
		}
		if ( domNode !== target ) {
			this._clearTouch();
		}
	},

	/**
	 * Clear the stored touch
	 */
	_clearTouch () {
		this.setState( this.getInitialState() );
	},

	/**
	 * Store a touch
	 * at `this.state.touch`
	 *
	 * @param {Touch}
	 */
	_storeTouch ({ identifier, clientX, clientY }) {
		let touch = {
			identifier,
			clientX,
			clientY
		};
		this.setState({ touch });
	},

	/**
	 * Handle a touchStart
	 *
	 * @param  {TouchEvent}
	 */
	_onTouchStart ({ touches, targetTouches }) {
		clearTimeout( this.state ? this.state.clear : null );
		if ( touches.length > 1 ) {
			// swipe only happens
			// when there's one finger!
			this._clearTouch();
			return;
		}

		// hold onto that target touch
		this._storeTouch( targetTouches[ 0 ] );

		// ...for a little bit
		this.setState({
			clear: setTimeout( () => this._clearTouch(), this.props.maxDelay )
		});
	},

	_onTouchMove ({ touches, changedTouches }) {
		let touch = changedTouches[ 0 ];
		// are there multiple touches?
		let multiple = ( touches.length > 1 );
		// is the first touch in bounds?
		let inBounds = within( touch, this.getDOMNode() );
		if ( multiple || !inBounds || !this.state.touch ) {
			this._clearTouch();
			return;
		}
		// this.setState({ left: touch.clientX - this.state.touch.clientX });
	},

	/**
	 * Handle a touchEnd
	 *
	 * @param  {TouchEvent}
	 */
	_onTouchEnd ({ touches, changedTouches }) {
		clearTimeout( this.state ? this.state.clear : null );
		let { touch } = this.state;
		let changedTouch = changedTouches[ 0 ];

		switch ( true ) {
		// no original
		case touch == null:
		// there's another finger
		case touches.length:
		// it's a different touch
		case changedTouch.identifier !== touch.identifier:
		// it's not in our coords
		case !within( changedTouch, this.getDOMNode() ):
			// do nothing
			return;
		}
		this._clearTouch();

		let { clientX: startX, clientY: startY } = touch;
		let { clientX: endX,   clientY: endY   } = changedTouch;

		let xdiff = endX - startX;
		// console.log( xdiff < 0 ? 'L' : 'R' );
		let ydiff = endY - startY;
		// console.log( ydiff < 0 ? 'U' : 'D' );

		if ( Math.abs( xdiff ) < this.props.minOffset ) {
			// swipe was too small
			return;
		}

		if ( xdiff < 0 ) {
			// swiped left
			// show modifiers!
			this.setState({
				// TODO: figure out how to do this without
				// fixed offset
				left: -50
			});
		}
	},

	_delete () {
		action.fire( actions.REMOVE, this.props.item );
	},

	render () {
		let divStyle = {
			left: ~~this.state.left
		};
		let deleteButton = <button
			className='delete'
			onClick={this._delete}>Delete</button>

		return (
			<div
				style={divStyle}
				onTouchStart={this._onTouchStart}
				onTouchMove={this._onTouchMove}
				onTouchEnd={this._onTouchEnd}
				className='listItem'>

				<span className='title'>
					{this.props.item.title}
				</span>

				<span className='detail'>
					{this.props.item.detail}
				</span>

				{deleteButton}
			</div>
		);
	}
});

function getItemState () {
	return {
		items: itemStore.getAll()
	};
}
export default React.createClass({
	getInitialState () {
		return getItemState();
	},
	componentDidMount () {
		itemStore.on( this._onChange );
	},
	componentWillUnmount () {
		itemStore.off( this._onChange );
	},
	_onChange () {
		this.setState( getItemState() );
	},
	render() {
		let items = this.state.items.map( item =>
			<ListItem key={item.id} item={item} />
		);

		return (
			<div className='list'>
				{items}
			</div>
		);
	}
});
