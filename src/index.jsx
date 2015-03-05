import React from 'react';
import ItemList from './item-list.jsx';

React.initializeTouchEvents( true );
React.render(
	<ItemList />,
	document.querySelector( '#item-list' )
);
