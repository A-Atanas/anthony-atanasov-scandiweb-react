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
			currencyDisplayed: 0, // index of the array above
			categories: [],
			cart: [],
		};
	}

	componentDidMount() {
		getCategoriesAndCurrencies().then(({ categories, currencies }) => {
			this.setState({ categories, currencies });
		});
	}

	chooseCurrency = (currencyIndex) => {
		this.setState({ currencyDisplayed: currencyIndex });
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

		this.setState(productAlreadyInCart
			? {
				cart: this.state.cart.map(
					(product) =>
						product.id === productDataForCart.id && _.isEqual(product.chosenAttributes, chosenAttributes)
							? { ...product, quantity: product.quantity + 1 }
							: product
				)
			} : {
				cart: [...this.state.cart, { ...productDataForCart, chosenAttributes }]
			}
		)
	}

	incrementProductQuantity = (productIndex) => {
		this.setState({
			cart: this.state.cart.map(
				(product, index) =>
					productIndex === index
						? { ...product, quantity: product.quantity + 1 }
						: product
			)
		})
	}

	decrementProductQuantity = (productIndex) => {
		const cartCopy = [...this.state.cart];
		if (cartCopy[productIndex].quantity === 1) {
			cartCopy.splice(productIndex, 1);
		} else {
			cartCopy[productIndex].quantity--;
		}
		this.setState({ cart: cartCopy });
	}

	render() {
		return (
			<div className="app">
				<Header
					categories={this.state.categories}
					currencies={this.state.currencies}
					currencyDisplayed={this.state.currencyDisplayed}
					chooseCurrency={(index) => this.chooseCurrency(index)}
				/>
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
								currencyIndex={this.state.currencyDisplayed}
							/>
						)}
					/>
					<Route
						exact
						path="/categories/:category/products/:productId"
						render={(componentProps) => (
							<ProductPage
								{...componentProps}
								currencyIndex={this.state.currencyDisplayed}
								addToCart={(product) => this.addToCart(product)}
							/>)}
					/>
					<Route exact path="/cart" render={(componentProps) => (
						<CartPage
							{...componentProps}
							currencyIndex={this.state.currencyDisplayed}
							cart={this.state.cart}
							incrementProductQuantity={(index) => this.incrementProductQuantity(index)}
							decrementProductQuantity={(index) => this.decrementProductQuantity(index)}
						/>)} />
					<Route path="*" component={PageNotFound} />
				</Switch>
			</div>
		);
	}
}

export default App;
