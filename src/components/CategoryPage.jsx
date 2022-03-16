import React from "react";
import PageNotFound from "./PageNotFound";
import { getCategoryProducts } from "../api/api";
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
			// console.log(products);
			this.setState({ products });
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
					{this.state.products.map(({ id, name, gallery, prices, inStock }) => (
						<Link
							key={id}
							to={`products/${id}`}
							className={`productLink ${!inStock ? "outOfStock" : ""}`}
						>
							<div className="productCard">
								<div className="productImageContainer">
									<img src={gallery[0]} alt={id} />
									{!inStock ? (
										<p className="outOfStockText">OUT OF STOCK</p>
									) : null}
								</div>
								<p>{name}</p>
								<p>
									{prices[this.props.currencyIndex].currency}{" "}
									{prices[this.props.currencyIndex].amount}
								</p>
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
