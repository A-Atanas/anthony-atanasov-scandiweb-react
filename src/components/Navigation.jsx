import React from "react";
import { NavLink } from "react-router-dom";

class Navigation extends React.Component {
	render() {
		return (
			<nav className="categoriesLinks">
				{this.props.categories.map((category) => (
					<NavLink
						to={`/categories/${category.name}/`}
						className="link"
						activeClassName="activeLink"
						key={category.name}
					>
						{category.name.toUpperCase()}
					</NavLink>
				))}
			</nav>
		);
	}
}

export default Navigation;
