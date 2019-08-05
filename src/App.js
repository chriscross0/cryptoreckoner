import React, { Component } from 'react';
import './App.css';

import HoldingList from './Components/HoldingList';
import PriceList from './Components/PriceList';
import Total from './Components/Total';
import AddForm from './Components/AddForm';
import Footer from './Components/Footer';
import Header from './Components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			total : { value : 0, hasTotal : false },
			isLoadingPrices : false,
			prices : [
				{ code : 'BTC', price : 0, low : 0, high : 0, added : false },
				{ code : 'ETH', price : 0, low : 0, high : 0, added : false },
				{ code : 'XRP', price : 0, low : 0, high : 0, added : false },
				{ code : 'LTC', price : 0, low : 0, high : 0, added : false },
				{ code : 'ADA', price : 0, low : 0, high : 0, added : false },
				{ code : 'DASH', price : 0, low : 0, high : 0, added : false },
			],
			holdings : []
		};

		this.setHolding = this.setHolding.bind(this);
		this.addHolding = this.addHolding.bind(this);
		this.removeHolding = this.removeHolding.bind(this);
		this.recalculate = this.recalculate.bind(this);
	}

	componentDidMount(){
		this.loadHoldings();
		this.updatePrices();
		setInterval(() => {
			this.updatePrices();
		}, 30000);
	}

	recalculate(){
		let newTotal = { value : 0, hasTotal : false };

		const getPriceByCode = (code) => {
			return this.state.prices.find((priceObj) => (
				priceObj.code === code
			)).price;
		};

		this.state.holdings.forEach((holding, index) => {
			const price = getPriceByCode(holding.code);
			newTotal.value += (parseFloat(holding.amount) * price);
		});

		if(newTotal.value > 0){
			newTotal.hasTotal = true;
		}

		this.setState({ total : newTotal });
	}

	setHolding(holding){
		this.setState((state) => (
			{
				holdings : state.holdings.map(h => {
					if(h.code === holding.code){
						return {
							...h,
							amount : holding.amount
						}
					}
					return h;
				})
			}
		), () => {
			this.recalculate();
			this.saveHoldings();
		});
	}

	addHolding(holding){
		this.setState((state) => (
			{
				holdings : state.holdings.concat(holding),
				prices : state.prices.map(p => {
					if(p.code === holding.code){
						return {
							...p,
							added : true
						}
					}
					return p;
				})
			}
		), () => {
			this.recalculate();
			this.saveHoldings();
		});
	}

	removeHolding(code){
		this.setState((state) => (
			{
				holdings : state.holdings.filter(obj => {
					return obj.code !== code
				}),
				prices : state.prices.map(p => {
					if(p.code === code){
						return {
							...p,
							added : false
						}
					}
					return p;
				})
			}
		), () => {
			this.recalculate();
			this.saveHoldings();
		});
	}

	updatePrices(){

		this.setState({
			isLoadingPrices : true
		});

		// switched to local prices source after yahoo shut down the api
		//const apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%20%27https%3A%2F%2Fbittrex.com%2Fapi%2Fv1.1%2Fpublic%2Fgetmarketsummaries%27&format=json';
		const apiUrl = '/prices.json';

		fetch(apiUrl).then((response) => {
			if(response.ok) {
				response.json().then((result) => {

					//const marketList = result.query.results.json.result;
					const marketList = result.result;

					const newPrices = [];

					this.state.prices.forEach(priceObj => {

						const marketObj = marketList.find(obj => (
							obj.MarketName === 'USDT-' + priceObj.code
						));

						if(marketObj){
							newPrices.push({
								...priceObj,
								price : (marketObj.Last*1).toFixed(2),
								high : (marketObj.High*1).toFixed(2),
								low : (marketObj.Low*1).toFixed(2)
							});
						} else {
							console.log("Market not found:", priceObj);
						}
					});

					this.setState({
						prices : newPrices,
						isLoadingPrices : false
					}, () => {
						this.recalculate();
					});

				});

			}
		});
	}

	loadHoldings(){
		const holdingsJson = localStorage.getItem('holdings');
		if(holdingsJson !== null){
			let decodedHoldings = JSON.parse(holdingsJson);
			this.setState((state) => (
				{
					holdings : decodedHoldings,
					prices : state.prices.map((priceObj) => {
						let added = decodedHoldings.find((h) => (
							h.code === priceObj.code
						));
						if(added){
							return {
								...priceObj,
								added : true
							}
						}
						return priceObj;
					})
				}
			), this.recalculate);
		}
	}
	saveHoldings(){
		localStorage.setItem('holdings', JSON.stringify(this.state.holdings));
	}

	render(){
		return (
		  <div className="App">
			<header className="App-header">
	      <div className="container">
					<Header />
				</div>
			</header>

			  <section className="">
				  <div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="cr-panel cr-panel-big cr-panel-holdings">
								<HoldingList holdings={this.state.holdings} setHolding={this.setHolding} removeHolding={this.removeHolding} />
							</div>
						</div>
						<div className="col-md-6">
							<div className="cr-panel cr-panel-big">
								<PriceList prices={this.state.prices} isLoadingPrices={this.state.isLoadingPrices} />
							</div>
						</div>
					</div>
				  </div>
			  </section>

			  <section className="cr-filled">
				  <div className="container">
					<div className="row">
						<div className="col-xs-12">
							<Total total={this.state.total} />
						</div>
					</div>
				  </div>
			  </section>

			  <section className="">
				  <div className="container">
					<div className="row">
						<div className="col-xs-12">
							<div className="cr-panel">

								<h2>Add Currency</h2>

								<AddForm addHolding={this.addHolding} prices={this.state.prices} />
							</div>
						</div>
					</div>
				  </div>
			  </section>

			  <footer>
				<div className="container">
					<Footer />
				</div>
			  </footer>

		  </div>
		);
	}
}

export default App;
