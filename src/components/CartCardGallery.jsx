import React from 'react';

class CartCardGallery extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentImageIndex: 0
		}
	}

	render() {
		return (
			<div className="cartCardGallery">
				<img
					src={this.props.images[this.state.currentImageIndex]}
					alt={this.state.currentImageIndex} />
				<div
					className="slideshowArrow slideLeft"
					onClick={() => this.setState({
						currentImageIndex: this.state.currentImageIndex === 0
							? this.props.images.length - 1
							: this.state.currentImageIndex - 1
					})}
				>
					&#10094;
				</div>
				<div
					className="slideshowArrow slideRight"
					onClick={() => this.setState({
						currentImageIndex: this.state.currentImageIndex === this.props.images.length - 1
							? 0
							: this.state.currentImageIndex + 1
					})}
				>
					&#10095;
				</div>
			</div>
		)
	}
}

export default CartCardGallery;