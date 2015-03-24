import React from 'react';
import skuStore from './sku-store';

const SkuList = React.createClass({
	getInitialState () {
		return {
			skus: skuStore.getAll()
		};
	},
	componentDidMount () {
		skuStore.on( this._skusChanged );
	},
	componentWillUpdate ( nextProps, nextState ) {
		skuStore.off( this._skusChanged );
	},
	_skusChanged () {
		this.setState( this.getInitialState() );
	},
	render () {
		let skus = this.state.skus.map( sku =>
			<Sku key={sku.sku} sku={sku} />
		);

		return (
		<div className='sku-list'>
			{skus}
		</div>
		);
	}
});
export default SkuList;

const Sku = React.createClass({
	getDefaultProps () {
		return {
			fields: [{
				name: 'sku',
				title: 'SKU'
			}, {
				name: 'upc',
				title: 'UPC'
			}]
		};
	},
	render () {
		let { sku } = this.props;

		let meta = this.props.fields.map( field => [
			<dt>{ field.title }</dt>,
			<dd>{ sku[ field.name ] }</dd>
		]);

		let imgURL = `assets/${sku.imageS}`;
		let img2x = imgURL.replace( /(?=\.)/, '-2x' );
		return (
		<div className='sku'>
			<div className='photo'>
				<img src={imgURL}
					srcSet={`${img2x} 2x`}
					/>
			</div>

			<h4 className='title'>{sku.descr}</h4>

			<div className='actions'>
				<input />
				<button>Remove</button>
			</div>

			<dl className='retail'>
				<dt>Price</dt>
				<dd><span className='price'>${ sku.price.toFixed( 2 ) }</span> / ea</dd>
				<dt>In Stock</dt>
				<dd>{ sku.onhand }</dd>
			</dl>

			<dl className='meta'>{ meta }</dl>


			<span className='dept'>{ sku.dept_txt }</span>

		</div>
		);
	}
});
