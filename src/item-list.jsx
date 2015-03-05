import React from 'react';
import itemStore from './item-store';
import action from './item-action';

/**
 * Check if a touch is within
 * the bounds of a rect
 *
 * @param  {ClientRects} coords - the boundaries
 * @param  {Touch} touch
 * @return {boolean} is the touch within the bounds?
 */
function within ( coords, touch ) {
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
			maxDelay: 300
		};
	},

	/**
	 * Clear the stored touch
	 */
	_clearTouch () {
		if ( arguments.length ) console.log( 'clearing' );
		this.setState({
			touch: undefined
		});
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
	_touchStart ({ touches, targetTouches }) {
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

	/**
	 * Handle a touchEnd
	 *
	 * @param  {TouchEvent}
	 */
	_touchEnd ({ touches, changedTouches }) {
		clearTimeout( this.state ? this.state.clear : null );
		let rects = this.getDOMNode().getClientRects()[ 0 ];
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
		case !within( rects, changedTouch ):
			// clear the stored touch
			this._clearTouch();
			// and do nothing
			return;
		}

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
			// show delete!
			console.log( 'delete' );
		}
	},

	render() {
		return (
			<div
				onTouchStart={this._touchStart}
				onTouchEnd={this._touchEnd}
				className='listItem'>

				<span className='title'>
					{this.props.item.title}
				</span>

				<span className='detail'>
					{this.props.item.detail}
				</span>

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
