import React from "react";
import Actions from "./Actions";
import Navigation from "./Navigation";
import logo from "../assets/logo.svg";

class Header extends React.Component {
	render() {
		return (
			<header>
				<Navigation categories={this.props.categories} />
				<img src={logo} alt="Company logotype" />
				<Actions
					currencies={this.props.currencies}
					currencyIndex={this.props.currencyIndex}
					chooseCurrency={this.props.chooseCurrency}
					toggleMiniCart={this.props.toggleMiniCart}
				/>
			</header>
		);
	}
}

export default Header;
