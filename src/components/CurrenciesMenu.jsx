import React from 'react';

class CurrenciesMenu extends React.Component {

	render() {
		return (
			<div className="currenciesMenu">
				{this.props.currencies.map((currency, index) => (
					<button
						key={currency.label}
						onClick={() => {
							this.props.chooseCurrency(index);
							this.props.toggleCurrenciesMenu();
						}}
					>
						{currency.symbol} {currency.label}
					</button>
				))}
			</div>
		)
	}
}

export default CurrenciesMenu;