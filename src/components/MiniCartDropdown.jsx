import React from "react";
import EmptyCart from "../assets/empty-cart.svg";
import CartPage from "./CartPage";

class MiniCartDropdown extends React.Component {


	constructor(props) {
		super(props);

		this.wrapperRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}


	handleClickOutside(event) {
		if (this.wrapperRef
			&& this.props.showingMiniCart
			&& !this.wrapperRef.current.contains(event.target)) {
			this.props.toggleMiniCart();
		}
	}

	render() {
		return (
			<div ref={this.wrapperRef}>
				<div className="cartIcon" onClick={() => this.props.toggleMiniCart()}>
					<img src={EmptyCart} alt="Empty cart" />
					{this.props.bagSize ? <p>{this.props.bagSize}</p> : null}
				</div>
				{this.props.showingMiniCart ?
					<CartPage
						currencyIndex={this.props.currencyIndex}
						cart={this.props.cart}
						incrementProductQuantity={(index) => this.props.incrementProductQuantity(index)}
						decrementProductQuantity={(index) => this.props.decrementProductQuantity(index)}
						isMiniCart={true}
						currencySymbol={this.props.currencies?.[this.props.currencyIndex]?.symbol}
						toggleMiniCart={this.props.toggleMiniCart}
						clearCart={this.props.clearCart}
					/> : null}
			</div>
		)
	}
}

export default MiniCartDropdown;