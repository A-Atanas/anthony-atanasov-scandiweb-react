import React from 'react';
import classNames from "classnames";
import { Link } from "react-router-dom";
import CartCardGallery from "./CartCardGallery";

class CartPage extends React.Component {

	render() {
		const isMiniCart = this.props.isMiniCart;
		return (
			<div className={classNames("cart", { "miniCart": this.props.isMiniCart })}>
				{
					isMiniCart
						? <div className="miniCartInfo"><p><b className="defaultFontText">My Bag,</b> {this.props.cart.reduce((acc, product) => acc += product.quantity, 0)} items</p></div>
						: <h1 className="pageName">CART</h1>
				}
				{this.props.cart.length > 0 ? (
					<div>
						{this.props.cart.map((product, index) => {
							const productAttributesKey = Object.values(product.chosenAttributes)
								.map((attribute) => `${attribute}-`)
								.join("")
							return (
								<div key={`${product.id}-${productAttributesKey}`} className="cartCard">
									<div className="cartCardProductInfo">
										<Link
											className="link"
											to={`/categories/${product.category}/products/${product.id}`}
											onClick={() => this.props.toggleMiniCart()}
										>
											{isMiniCart
												? <h2 className="productName">{product.brand}</h2>
												: <h1>{product.brand}</h1>
											}
											<h2 className="productName">{product.name}</h2>
										</Link>
										<h2 className="productPrice">{product.prices?.[this.props.currencyIndex].currency}{" "}
											{product.prices?.[this.props.currencyIndex].amount}</h2>
										<>
											{product.attributes?.map((attribute) => (
												<div key={attribute.id} className="cartProductAttributes">
													{!isMiniCart ? <h2>{attribute.name}</h2> : null}
													<div className="attributeContainer">
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
										</>
									</div>
									<div className="cartCardActions">
										<div className="itemQuantityChanger">
											<button className="itemQuantityChangeButton" onClick={() => this.props.incrementProductQuantity(index)}>+</button>
											<h2>{product.quantity}</h2>
											<button className="itemQuantityChangeButton" onClick={() => this.props.decrementProductQuantity(index)}>-</button>
										</div>
										<CartCardGallery images={product.gallery} />
									</div>
								</div>
							)
						})}
						{isMiniCart
							? <div className="totalCost">
								<h2 className="defaultFontText">Total: </h2>
								<h2>
									{this.props.currencySymbol} {
										this.props.cart.reduce(
											(acc, product) => acc += +product.prices?.[this.props.currencyIndex].amount * product.quantity, 0
										).toFixed(2)
									}
								</h2>
							</div>
							: null}
					</div>)
					: (
						<h2>Oh, it looks like there are no products in the cart. Go shop for them or something...</h2>
					)}
				{isMiniCart
					? (
						<div className="miniCartActionButtons">
							<button className="cartButton viewBagButton" onClick={() => this.props.toggleMiniCart()}>
								<Link className="link" to="/cart">
									VIEW BAG
								</Link>
							</button>
							<button className="cartButton checkOutButton" onClick={() => { this.props.toggleMiniCart(); this.props.clearCart(); }}>
								<Link className="link" to="/">
									CHECK OUT
								</Link>
							</button>
						</div>
					)
					: null}
			</div>
		)
	}
}

export default CartPage;