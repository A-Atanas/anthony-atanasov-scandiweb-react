import React from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty-cart.svg";

class Actions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showingCurrenciesMenu: false,
		};
	}

	toggleCurrenciesMenu = () => {
		this.setState({
			showingCurrenciesMenu: !this.state.showingCurrenciesMenu,
		});
	};

	render() {
		return (
			<div>
				<div className="currencies-dropdown">
					<button className="dropdown-button" onClick={this.toggleCurrenciesMenu}>
						{this.props.currencies?.[this.props.currencyDisplayed]?.symbol}
					</button>
					{this.state.showingCurrenciesMenu ? (
						<div>
							{this.props.currencies.map((currency, index) => (
								<button
									key={currency.label}
									onClick={() => {
										this.props.chooseCurrency(index);
										this.toggleCurrenciesMenu();
									}}
								>
									{currency.symbol} {currency.label}
								</button>
							))}
						</div>
					) : null}
				</div>
				<Link to="/cart">
					<img src={EmptyCart} alt="Empty cart" />
				</Link>
			</div>
		);
	}
}

export default Actions;
