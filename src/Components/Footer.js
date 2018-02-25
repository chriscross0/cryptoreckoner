import React from 'react';

const Footer = (props) => {
  return (
    <div className="cr-footer">
	
		<div className="row">
			<div className="col-md-3 cr-footer-col">
				<h5>Crypto Currencies</h5>
				
				<ul>
					<li><a href="https://bitcoin.org" rel="nofollow">Bitcoin</a></li>
					<li><a href="https://www.ethereum.org" rel="nofollow">Ethereum</a></li>
					<li><a href="https://litecoin.com" rel="nofollow">Litecoin</a></li>
					<li><a href="https://ripple.com" rel="nofollow">Ripple</a></li>
					<li><a href="https://www.bitcoincash.org" rel="nofollow">Bitcoin Cash</a></li>
				</ul>
			</div>
			<div className="col-md-3 cr-footer-col">
				<h5>Exchanges</h5>
				
				<ul>
					<li><a href="https://www.binance.com" rel="nofollow">Binance</a></li>
					<li><a href="https://bittrex.com" rel="nofollow">Bittrex</a></li>
					<li><a href="https://www.gdax.com" rel="nofollow">GDAX</a></li>
					<li><a href="https://www.bithumb.com" rel="nofollow">Bithumb</a></li>
					<li><a href="https://www.bitstamp.net" rel="nofollow">Bitstamp</a></li>
				</ul>
			</div>
			<div className="col-md-3 cr-footer-col">
				<h5>Price Charts</h5>
				
				<ul>
					<li><a href="https://coinmarketcap.com/currencies/bitcoin/" rel="nofollow">Bitcoin</a></li>
					<li><a href="https://coinmarketcap.com/currencies/ethereum/" rel="nofollow">Ethereum</a></li>
					<li><a href="https://coinmarketcap.com/currencies/litecoin/" rel="nofollow">Litecoin</a></li>
					<li><a href="https://coinmarketcap.com/currencies/ripple/" rel="nofollow">Ripple</a></li>
					<li><a href="https://coinmarketcap.com/currencies/bitcoin-cash/" rel="nofollow">Bitcoin Cash</a></li>
				</ul>
			</div>
			<div className="col-md-3 cr-footer-col">
				<h5>Learn</h5>
				
				<ul>
					<li><a href="https://en.wikipedia.org/wiki/Cryptocurrency" rel="nofollow">Cryptocurrencies Wikipedia</a></li>
					<li><a href="https://www.investopedia.com/terms/c/cryptocurrency.asp" rel="nofollow">Investopedia</a></li>
					<li><a href="https://www.theguardian.com/technology/cryptocurrencies" rel="nofollow">theguardian.com</a></li>
					<li><a href="#" rel="nofollow">Source Code</a></li>
					<li><a href="https://reactjs.org/" rel="nofollow">React</a></li>
				</ul>
			</div>
		</div>
	
		<p className="pull-right">Price data source: bittrex.com</p>
		<p>CryptoReckoner 2018</p>
    </div>
  )
};

export default Footer;
