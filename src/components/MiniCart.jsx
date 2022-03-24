import React from "react";
import CartPage from "./CartPage";

class MiniCart extends React.Component {
	render() {
		return (
			<CartPage
				currencyIndex={this.props.currencyIndex}
				cart={this.props.cart}
				incrementProductQuantity={(index) => this.props.incrementProductQuantity(index)}
				decrementProductQuantity={(index) => this.props.decrementProductQuantity(index)}
				isMiniCart={true}
				currencySymbol={this.props.currencySymbol}
				toggleMiniCart={this.props.toggleMiniCart}
				clearCart={this.props.clearCart}
			/>
		)
	}
}

export default MiniCart; 