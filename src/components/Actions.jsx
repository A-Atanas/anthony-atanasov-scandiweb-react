import React from "react";
import CurrenciesDropdown from "./CurrenciesDropdown";
import MiniCartDropdown from "./MiniCartDropdown";

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
				<MiniCartDropdown 
					bagSize={this.props.bagSize}
					currencies={this.props.currencies}
					currencyIndex={this.props.currencyIndex}
					cart={this.props.cart}
					showingMiniCart={this.props.showingMiniCart}
					toggleMiniCart={this.props.toggleMiniCart}
					clearCart={this.props.clearCart}
					incrementProductQuantity={this.props.incrementProductQuantity}
					decrementProductQuantity={this.props.decrementProductQuantity}
				/>
			</div>
		);
	}
}

export default Actions;
