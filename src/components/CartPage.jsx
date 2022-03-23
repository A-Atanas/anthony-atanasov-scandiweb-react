import React from 'react';
import classNames from "classnames";
import {Link} from "react-router-dom";
import CartCardGallery from "./CartCardGallery";

class CartPage extends React.Component {

	render() {
		return (
			<div>
				<h1>Cart</h1>
				{this.props.cart.length > 0 ? this.props.cart.map((product, index) => {
					const productAttributesKey = Object.values(product.chosenAttributes)
						.map((attribute) => `${attribute}-`)
						.join("")
					return (
						<div key={`${product.id}-${productAttributesKey}`} className="cartCard">
							<div>
								<Link className="link" to={`categories/${product.category}/products/${product.id}`}>
									<h1>{product.brand}</h1>
									<h2>{product.name}</h2>
								</Link>
								<h2>{product.prices?.[this.props.currencyIndex].currency}{" "}
									{product.prices?.[this.props.currencyIndex].amount}</h2>
								<div>
									{product.attributes?.map((attribute) => (
										<div key={attribute.id}>
											<h2>{attribute.name}</h2>
											<div className="attributesContainer">
												{attribute.items?.map((item, index) => (
													<div
														key={item.id}
														className={classNames("attributeItem", {
															"selectedAttribute": product.chosenAttributes[attribute.name] === index,
														})}
													>
														<div
															// I tried to apply style via data-attributes, but those don't work for color values
															style={attribute.type === "swatch" ? { backgroundColor: item.value } : null}
															className={classNames({
																"swatchContainer": attribute.type === "swatch"
															})}>
															{attribute.type !== "swatch" ? item.value : null}
														</div>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
							<div>
								<button onClick={() => this.props.incrementProductQuantity(index)}>+</button>
								<h2>{product.quantity}</h2>
								<button onClick={() => this.props.decrementProductQuantity(index)}>-</button>
							</div>
							<div>
								<CartCardGallery images={product.gallery} />
							</div>
						</div>
					)
				}) : (
					<h2>Oh, it looks like there are no products in the cart. Go shop for them or something...</h2>
				)}
			</div>
		)
	}
}

export default CartPage;