import React, { Component } from 'react';

class AddForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			amount : '',
			currency : ''
		};
		
		this.amountChange = this.amountChange.bind(this);
		this.submit = this.submit.bind(this);
		this.currencyChange = this.currencyChange.bind(this);
	}
	
	submit(e){
		e.preventDefault();
		this.props.addHolding({ code : this.state.currency, amount : this.state.amount });
		this.setState({
			amount : '',
			currency : ''
		});
	}
	
	amountChange(e) {
		this.setState({ amount: e.target.value });
	}
	
	currencyChange(e) {
		this.setState({ currency: e.target.value });
	}

	render() {
		
		const allAdded = this.props.prices.filter((priceObj) => (!priceObj.added)).length === 0;
		
		if(allAdded){
			return <p>You've added all of the available currencies. </p>;
		}
		
		return (
			<form className="cr-addform" onSubmit={this.submit}>
				<div className="row">
					<div className="col-md-10">
						<div className="form-group">
							<div className="row">
								<div className="col-xs-6">
									<label className="form-label">Select Currency</label>
									<select className="form-control" value={this.state.currency} onChange={this.currencyChange} required>
										<option value="">Select Currency</option>
										{this.props.prices.filter((priceObj) => (!priceObj.added)).map((priceObj) => (
										<option key={priceObj.code} value={priceObj.code}>{priceObj.code}</option>
										))}
									</select>
								</div>
								<div className="col-xs-6">
									<label className="form-label">Amount</label>
									<input type="number" className="form-control" value={this.state.amount} onChange={this.amountChange} required />
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-2">
						<div className="form-group cr-addform-buttons">
							<div className="row">
								<div className="col-xs-12">
									<button type="submit" className="form-control btn btn-primary">Add</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		)
	}
};

export default AddForm;
