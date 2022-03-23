import React from "react";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
	render() {
		return (
			<nav className="categoriesLinks">
				{this.props.categories.map((category) => (
					<Link className="link" style={{ padding: "0.5em" }} key={category.name} to={`/categories/${category.name}/`}>
						{category.name}
					</Link>
				))}
			</nav>
		);
	}
}

export default Navigation;
