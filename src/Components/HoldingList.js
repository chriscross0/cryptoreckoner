import React, { Component } from 'react';

class HoldingList extends Component {
  constructor(props) {
    super(props);
	this.handleChange = this.handleChange.bind(this);
	this.removeHolding = this.removeHolding.bind(this);
  }
	
	handleChange(event){
		this.props.setHolding({ code : event.target.name, amount : event.target.value });
	}
	removeHolding(event){
		this.props.removeHolding( event.target.getAttribute('data-code') );
	}
	
  render() {
	
	const hasHoldings = this.props.holdings.length > 0;
	let holdingsHeader = null;
	
	if(hasHoldings){
		holdingsHeader = (
			<div className="row hidden-xs cr-holding-header">
				<div className="col-md-4">
					Currency
				</div>
				<div className="col-md-4">
					Amount
				</div>
			</div>
		);
	}
	
    return (
		<div className="cr-holdings">
		
			<h2>My Holdings</h2>
			
			{(!hasHoldings) ? <p>You have no holdings stored. Add some!</p> : null}
			
			{holdingsHeader}			
		
			{this.props.holdings.map(holding => (
				<div key={holding.code} className="row cr-holding">
					<div className="col-md-4 cr-holding-currency">
						{holding.code} 
					</div>
					<div className="col-md-5">
						<input className="form-control" name={holding.code} type="number" value={holding.amount} onChange={this.handleChange} />
					</div>
					<div className="col-md-3">
						<button className="btn btn-danger cr-remove" data-code={holding.code} onClick={this.removeHolding}>Remove</button>
					</div>
				</div>
			))}
		</div>
    );
  }
}

export default HoldingList;
