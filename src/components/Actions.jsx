import React from "react";
import EmptyCart from "../assets/empty-cart.svg";
import CurrenciesDropdown from "./CurrenciesDropdown";

class Actions extends React.Component {

	render() {
		return (
			<div className="actions">
				<CurrenciesDropdown 
					currencies={this.props.currencies}
					toggleCurrenciesMenu={this.toggleCurrenciesMenu}
					chooseCurrency={this.props.chooseCurrency}
					currencyIndex={this.props.currencyIndex}
				/>
				<div className="cartIcon" onClick={() => this.props.toggleMiniCart()}>
					<img src={EmptyCart} alt="Empty cart" />
					{this.props.bagSize ? <p>{this.props.bagSize}</p> : null}
				</div>
			</div>
		);
	}
}

export default Actions;
