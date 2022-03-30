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
					<div className="mainImage">
						<img src={product.gallery?.[this.state.displayedImageIndex]} alt={this.state.displayedImageIndex} />
					</div>
				</div>
				<div className="productInfo">
					<div className="productNameAndBrand">
						<h2 className="productBrand">{product.brand}</h2>
						<h2 className="productName">{product.name}</h2>
					</div>
					<div className="allAttributes">
						{product.attributes?.map((attribute) => (
							<div key={attribute.id}>
								<b>{attribute.name.toUpperCase()}:</b>
								<div className="attributeContainer">
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
						<h3 className="defaultFontText">PRICE:</h3>
						<h2>{product.prices?.[this.props.currencyIndex].currency}{" "}
							{product.prices?.[this.props.currencyIndex].amount}</h2>
					</div>
					<button
						onClick={
							() => product.inStock
								? this.props.addToCart({
									product,
									chosenAttributes: {
										...this.state.chosenAttributes
									}
								})
								: false
						}
						className={classNames("addToCartButton", { outOfStockButton: !product.inStock })}
					>{product.inStock ? "ADD TO CART" : "OUT OF STOCK"}</button>
					<div className="defaultFontText">
						{ReactHtmlParser(product.description)}
					</div>
				</div>
			</div>
		);
	}
}

export default ProductPage;