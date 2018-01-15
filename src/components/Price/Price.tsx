import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { IObject } from 'src/core/interfaces/IObject';

interface IOwnProps {
  price: number;
  currency: string;
}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  locale: string;
  currencies: IObject<string>;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  locale: state.locale.current,
  currencies: state.locale.currencies,
});

const WrappedPrice = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Price extends React.Component<IProps, IState> {
    getFormattedPrice = () => {
      const { price, locale, currency, currencies } = this.props;
      const currencyISO4217 = Object.keys(currencies).find(key => currencies[key] === currency);
      if (!currencyISO4217) {
        const formattedNumber = price.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return currency === '$'
          ? [`${currency} ${formattedNumber}`, '', currency, formattedNumber]
          : [`${formattedNumber} ${currency}`, formattedNumber, currency, ''];
      }
      const result = price
        .toLocaleString(locale, {
          currency: currencyISO4217,
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace(/\u00a0/g, ' '); // removed &nbsp;
      const regex = new RegExp(`(.*)(\\${currency})(.*)`);
      const matches = result.match(regex);
      if (matches) {
        return matches;
      }
      return result;
    };

    render() {
      const formattedPrice = this.getFormattedPrice();
      return (
        <span className="root">
          <style jsx>{`
            .currency {
              color: #b2bdcb;
              font-size: 0.8em;
            }
          `}</style>
          {_.isArray(formattedPrice) ? (
            <span>
              {formattedPrice[1]}
              <span className="currency">{formattedPrice[2]}</span>
              {formattedPrice[3]}
            </span>
          ) : (
            <span>{formattedPrice}</span>
          )}
        </span>
      );
    }
  },
);

export default WrappedPrice;
