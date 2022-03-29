import React from 'react';
import classNames from 'classnames';
import DropdownArrow from "../assets/chevron-down-solid.svg";
import CurrenciesMenu from "./CurrenciesMenu.jsx";

class CurrenciesDropdown extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showingCurrenciesMenu: false,
		};

		this.wrapperRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	toggleCurrenciesMenu = () => {
		this.setState({
			showingCurrenciesMenu: !this.state.showingCurrenciesMenu,
		});
	};

	handleClickOutside(event) {
		if (this.wrapperRef
			&& this.state.showingCurrenciesMenu
			&& !this.wrapperRef.current.contains(event.target)) {
			this.toggleCurrenciesMenu();
		}
	}

	render() {
		return (
			<div ref={this.wrapperRef} className="currenciesDropdown">
				<button className="dropdownButton" onClick={this.toggleCurrenciesMenu}>
					{this.props.currencies?.[this.props.currencyIndex]?.symbol}
					<img
						src={DropdownArrow}
						alt="dropdown arrow"
						className={classNames("dropdownArrow", {
							"dropdownArrowActive": this.state.showingCurrenciesMenu,
						})} />
				</button>
				{this.state.showingCurrenciesMenu ? (
					<CurrenciesMenu
						currencies={this.props.currencies}
						chooseCurrency={this.props.chooseCurrency}
						toggleCurrenciesMenu={this.toggleCurrenciesMenu}
					/>
				) : null}
			</div>
		)
	}
}

export default CurrenciesDropdown;