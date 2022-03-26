import React from "react";
import PageNotFound from "./PageNotFound";
import EmptyCart from "../assets/empty-cart.svg";
import { getCategoryProducts, getProduct } from "../api/api";
import { Link } from "react-router-dom";

class CategoryPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
		};
	}

	async fetchCategory() {
		getCategoryProducts(this.props.match.params.category).then(({ category: { products } }) => {
			this.setState({ products });
		});
	}

	async quicklyAddToCart(event, productID) {
		event.preventDefault();
		getProduct(productID).then(({ product }) => {
			const defaultAttributes = Object.fromEntries(product.attributes.map((attribute) => [attribute.name, 0]));
			this.props.addToCart({ product, chosenAttributes: defaultAttributes });
		});
	}

	// Instead of simple useEffect hook
	componentDidMount() {
		this.fetchCategory();
	}
	componentDidUpdate(previousProps) {
		if (previousProps.match.params.category !== this.props.match.params.category) {
			this.fetchCategory();
		}
	}

	render() {
		return this.state.products !== null && this.state.products.length > 0 ? (
			<>
				<h1>{this.props.match.params.category}</h1>
				<div className="products">
					{this.state.products.map((product) => (
						<Link
							key={product.id}
							to={`products/${product.id}`}
							className={`link productLink ${!product.inStock ? "outOfStock" : ""}`}
						>
							<div className="productCard">
								<div className="productImageContainer">
									<img src={product.gallery[0]} alt={product.id} className="productImage" />
									{!product.inStock ? (
										<p className="outOfStockText">OUT OF STOCK</p>
									) : null}
									<button className="quickAddToCartButton" onClick={(event) => this.quicklyAddToCart(event, product.id)}>
										<img src={EmptyCart} alt="Empty cart" className="buyInOneClickIcon" />
									</button>
								</div>
								<div>
									<p>{product.name}</p>
									<p>
										{product.prices[this.props.currencyIndex].currency}{" "}
										{product.prices[this.props.currencyIndex].amount}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</>
		) : (
			<PageNotFound />
		);
	}
}

export default CategoryPage;
