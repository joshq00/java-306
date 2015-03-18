import React from 'react';

const AppHeader = React.createClass({
	render () {
		return (
		<header>
			<span className='logo'>
				<img src='assets/images/THD_Logo.png' />
			</span>
			<div className='info'>
				<h1>Simple sales order</h1>
				<p className='tagline'>Sucks for mobile...</p>
			</div>
			<div className='user'>
				<ul>
					<li>Homer D. Poe</li>
					<li><a href='#'>Logout</a></li>
				</ul>
				<span className='location'>Store #121</span>
			</div>

			<button className='menu'></button>
		</header>
		);
	}

});
export default AppHeader;
