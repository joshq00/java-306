import React from 'react';
import SkuList from './sku-list';
import AppHeader from './app-header';
const App = React.createClass({
	render () {
		return (
		<div>
		<AppHeader />

		<main>
			<SkuList />
		</main>

		</div>
		);
	}
});

export default App;