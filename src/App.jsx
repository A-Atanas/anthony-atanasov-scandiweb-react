import "./css/App.css";
import React from "react";
import Header from "./components/Header";
import CategoryPage from "./components/CategoryPage";
import PageNotFound from "./components/PageNotFound";
import ProductPage from "./components/ProductPage";
import { getCategoriesAndCurrencies } from "./api/api";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currencies: [],
			currencyDisplayed: 0, // index of the array above
			categories: [],
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
							/>)}
					/>
					<Route path="*" component={PageNotFound} />
				</Switch>
			</div>
		);
	}
}

export default App;
