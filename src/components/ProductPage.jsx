import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import classNames from "classnames";
import { getProduct } from "../api/api";

class ProductPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			product: {},
			displayedImageIndex: 0,
			chosenAttributes: {}
		}
	}

	fetchProduct = async () => {
		getProduct(this.props.match.params.productId).then(({ product }) => {
			const attributes = Object.fromEntries(product.attributes.map((attribute) => [attribute.name, 0]));
			this.setState({ product, chosenAttributes: attributes });
		});
	}

	// Instead of simple useEffect hook
	componentDidMount() {
		this.fetchProduct();
	}
	componentDidUpdate(previousProps) {
		if (previousProps.match.params.productId !== this.props.match.params.productId) {
			this.fetchProduct();
		}
	}

	render() {
		console.log(this.props, this.state)
		const product = this.state.product;
		return (
			<div className="productPage">
				<div className="productGallery">
					<div className="slides">
						{product.gallery?.map((imageURL, index) => (
							<img
								key={index}
								src={imageURL}
								alt={index}
								onClick={() => this.setState({ displayedImageIndex: index })} />
						))}
					</div>
					<img src={product.gallery?.[this.state.displayedImageIndex]} alt={this.state.displayedImageIndex} />
				</div>
				<div className="productInfo">
					<h2>{product.brand}</h2>
					<h3>{product.name}</h3>
					<div>
						{product.attributes?.map((attribute) => (
							<div key={attribute.id}>
								<h2>{attribute.name}</h2>
								<div className="attributesContainer">
									{attribute.items?.map((item, index) => (
										<div
											key={item.id}
											className={classNames("attributeItem", {
												"selectedAttribute": this.state.chosenAttributes[attribute.name] === index,
											})}
											onClick={() => this.setState({
												chosenAttributes: {
													...this.state.chosenAttributes,
													[attribute.name]: index
												}
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
					<div>
						<h2>Price:</h2>
						<h2>{product.prices?.[this.props.currencyIndex].currency} {product.prices?.[this.props.currencyIndex].amount}</h2>
					</div>
					{ReactHtmlParser(product.description)}
				</div>
			</div>
		);
	}
}

export default ProductPage;