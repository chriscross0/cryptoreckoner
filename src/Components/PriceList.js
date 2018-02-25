import React, { Component } from 'react';
import spinnerImage from '../Spinner.svg';

class PriceList extends Component {
  constructor(props) {
    super(props);
	this.handleChange = this.handleChange.bind(this);
  }

	handleChange(event){
		this.props.setHolding({ code : event.target.name, amount : event.target.value });
	}

  render() {

	const hasPrices = this.props.prices.length > 0;
	let pricesHeader = null;

	if(hasPrices){
		pricesHeader = (
			<div className="row hidden-xs cr-holding-header">
				<div className="col-xs-3">
					Currency
				</div>
				<div className="col-xs-3">
					Price
				</div>
				<div className="col-xs-3">
					High
				</div>
				<div className="col-xs-3">
					Low
				</div>
			</div>
		);
	}

	let priceListDisplay = this.props.prices.map(priceObj => (
		<div key={priceObj.code} className="cr-price">
			<div className="row">
				<div className="col-xs-3">{priceObj.code}</div>
				<div className="col-xs-3">{priceObj.price}</div>
				<div className="col-xs-3">{priceObj.high}</div>
				<div className="col-xs-3">{priceObj.low}</div>
			</div>
		</div>
	));

	if(this.props.prices.length === 0){
		priceListDisplay = <p>There are no prices currently avaulable.</p>;
	}

	if(this.props.isLoadingPrices){
		priceListDisplay = null;
	}

    return (
		<div className="cr-pricelist">
			<h2>Price List</h2>

			{pricesHeader}
			{this.props.isLoadingPrices ? <img className="cr-spinner" src={spinnerImage} alt="Loading" /> : null}
			{priceListDisplay}


		</div>
    );
  }
}

export default PriceList;
