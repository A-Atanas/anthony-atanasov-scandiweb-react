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
					currencyDisplayed={this.props.currencyDisplayed}
					chooseCurrency={this.props.chooseCurrency}
				/>
			</header>
		);
	}
}

export default Header;
