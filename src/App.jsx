import "./css/App.css";
import React from "react";
import Header from "./components/Header";
import CategoryPage from "./components/CategoryPage";
import PageNotFound from "./components/PageNotFound";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import { getCategoriesAndCurrencies } from "./api/api";
import { Switch, Route, Redirect } from "react-router-dom";
import _ from "lodash";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currencies: [],
			currencyIndex: 0, // index of the array above
			categories: [],
			cart: [],
			showingMiniCart: false,
		};
	}

	componentDidMount() {
		if (localStorage.getItem("currencyIndex") !== null) {
			this.setState({
				currencyIndex: localStorage.getItem("currencyIndex"),
			});
		}
		if (localStorage.getItem("cart") !== null) {
			this.setState({
				cart: JSON.parse(localStorage.getItem("cart")),
			});
		}
		getCategoriesAndCurrencies().then(({ categories, currencies }) => {
			this.setState({ categories, currencies });
		});
	}

	chooseCurrency = (currencyIndex) => {
		this.setState({ currencyIndex: currencyIndex });
		localStorage.setItem("currencyIndex", currencyIndex);
	};

	addToCart = ({ product, chosenAttributes }) => {
		const productDataForCart = {
			id: product.id,
			name: product.name,
			brand: product.brand,
			prices: product.prices,
			attributes: product.attributes,
			gallery: product.gallery,
			category: product.category,
			quantity: 1,
		};
		const productAlreadyInCart = ~this.state.cart.findIndex(
			(productToFind) => productToFind.id === productDataForCart.id
				&& _.isEqual(productToFind.chosenAttributes, chosenAttributes)
		);

		let newCart = [...this.state.cart];
		if (productAlreadyInCart) {
			newCart = this.state.cart.map((productInCart) => {
				if (productInCart.id === productDataForCart.id
					&& _.isEqual(productInCart.chosenAttributes, chosenAttributes)) {
					productInCart.quantity++;
				}
				return productInCart;
			});
		} else {
			newCart.push({ ...productDataForCart, chosenAttributes });
		}
		localStorage.setItem("cart", JSON.stringify(newCart))
		this.setState({ cart: newCart });
	}

	incrementProductQuantity = (productIndex) => {
		let newCart = this.state.cart.map(
			(product, index) =>
				productIndex === index
					? { ...product, quantity: product.quantity + 1 }
					: product
		);
		localStorage.setItem("cart", JSON.stringify(newCart));
		this.setState({ cart: newCart });
	}

	decrementProductQuantity = (productIndex) => {
		const newCart = [...this.state.cart];
		if (newCart[productIndex].quantity === 1) {
			newCart.splice(productIndex, 1);
		} else {
			newCart[productIndex].quantity--;
		}
		localStorage.setItem("cart", JSON.stringify(newCart));
		this.setState({ cart: newCart });
	}

	clearCart = () => {
		localStorage.removeItem("cart");
		this.setState({ cart: [] })
	}

	toggleMiniCart = () => {
		this.setState({ showingMiniCart: !this.state.showingMiniCart });
	}

	render() {
		return (
			<div className="app">
				<div className="headerContainer">
					<Header
						categories={this.state.categories}
						currencies={this.state.currencies}
						currencyIndex={this.state.currencyIndex}
						chooseCurrency={(index) => this.chooseCurrency(index)}
						bagSize={this.state.cart.reduce((acc, product) => acc + product.quantity, 0)}
						cart={this.state.cart}
						toggleMiniCart={this.toggleMiniCart}
						showingMiniCart={this.state.showingMiniCart}
						clearCart={this.clearCart}
						incrementProductQuantity={(index) => this.incrementProductQuantity(index)}
						decrementProductQuantity={(index) => this.decrementProductQuantity(index)}
					/>
				</div>
				<Switch>
					<Route exact path="/">
						<Redirect to="/categories/all/" />
					</Route>
					<Route
						exact
						path="/categories/:category/"
						render={(componentProps) => (
							<CategoryPage
								{...componentProps}
								currencyIndex={this.state.currencyIndex}
								addToCart={(product) => this.addToCart(product)}
							/>
						)}
					/>
					<Route
						exact
						path="/categories/:category/products/:productId"
						render={(componentProps) => (
							<ProductPage
								{...componentProps}
								currencyIndex={this.state.currencyIndex}
								addToCart={(product) => this.addToCart(product)}
							/>)}
					/>
					<Route exact path="/cart" render={(componentProps) => (
						<CartPage
							{...componentProps}
							currencyIndex={this.state.currencyIndex}
							cart={this.state.cart}
							incrementProductQuantity={(index) => this.incrementProductQuantity(index)}
							decrementProductQuantity={(index) => this.decrementProductQuantity(index)}
							isMiniCart={false}
							currencySymbol={this.state.currencies?.[this.state.currencyIndex]?.symbol}
						/>)} />
					<Route path="*" component={PageNotFound} />
				</Switch>
				{this.state.showingMiniCart ? <div id="miniCartOverlay"></div> : null}
			</div>
		);
	}
}

export default App;
