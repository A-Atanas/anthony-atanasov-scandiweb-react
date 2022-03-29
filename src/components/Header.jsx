import React from "react";
import Actions from "./Actions";
import Navigation from "./Navigation";
import logo from "../assets/logo.svg";

class Header extends React.Component {
	render() {
		return (
			<header>
				<Navigation categories={this.props.categories} />
				<div className="logo">
					<img src={logo} alt="Company logotype"/>
				</div>
				<Actions
					currencies={this.props.currencies}
					currencyIndex={this.props.currencyIndex}
					chooseCurrency={this.props.chooseCurrency}
					showingMiniCart={this.props.showingMiniCart}
					toggleMiniCart={this.props.toggleMiniCart}
					bagSize={this.props.bagSize}
				/>
			</header>
		);
	}
}

export default Header;
