import React from 'react';
import AppHeader from './app-header';
import userStore from './user-store';

function makeGlobalFn ( callback ) {
	let fnname = Math.random().toString( 36 ).replace( /[^a-z]+/g, '' );
	/* jshint ignore:start */
	eval( `window.${fnname} = function ${fnname} () {
		callback.apply( this, arguments );
	}` );
	/* jshint ignore:end */
	// console.log( fnname );
	return global[ fnname ];
}

export default class App extends React.Component {
	constructor ( props ) {
		super( props );
		this.state = {
			storeNumber: null,
			barcodes: [],
			user: userStore.get(),
			deviceData: mobileFramework.getDeviceData()
		};
	}

	componentDidMount () {
		mobileFramework.registerStoreCallback( this.storeChanged.bind( this ) );

		// listen for barcode scan
		mobileFramework.registerScanCallback( makeGlobalFn( this.scanned.bind( this ) ) );
	}

	storeChanged ( storeNumber ) {
		this.setState({ storeNumber });
	}

	scanned ( barcode ) {
		let { barcodes } = this.state;
		barcodes.push( barcode );
		this.setState({ barcodes });
	}

	render () {
		let { barcodes, user } = this.state;
		let lastBarcode = barcodes[ barcodes.length - 1 ];

		return (
		<div>
		<AppHeader store={this.state.storeNumber}/>

		<main>
			<p>Welcome, { user.firstName }</p>
			<p>Store: {this.state.storeNumber}</p>
			<p>Barcode: {lastBarcode}</p>
			<hr />
			<AdminSection user={ user } />
		</main>

		</div>
		);
	}
}
const AdminSection = React.createClass({
	propTypes: {
		user: React.PropTypes.object.isRequired
	},
	render () {
		let { user } = this.props;
		let extra = `You are not in the 'Administrator' LDAP group.`;

		if ( user.isAdmin() ) {
			extra = `Congrats, you're an admin!`;
		}

		return (
		<div>
			<h4>Admin Area</h4>
			<p>{ extra }</p>
		</div>
		);
	}
});
