import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import _ from 'lodash';
import dispatch from 'src/store/dispatch';
import { checkoutUserOrder } from 'src/ducks/userOrders';
import CartItems from 'src/components/CartItems';
import Price from 'src/components/Price';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  items: Alicanto.Models.CatalogItem[];
  totalPrice: number;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isMounted: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  items: state.cart.items,
  totalPrice: state.cart.totalPrice,
});

const WrappedCart = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Cart extends React.Component<IProps, IState> {
    state: IState = {
      isMounted: false,
    };

    handleCheckout = () => {
      dispatch(checkoutUserOrder());
    };

    componentDidMount() {
      this.setState({ isMounted: true });
    }

    render() {
      // TODO ch1333
      const currency: string = _.get(this.props, 'items[0].schema_fields.currency.value', '');
      const cartUI = this.props.ui.routes.cart;
      return (
        <div className="root app-container">
          <style jsx>{`
            .root {
              padding-bottom: 30px;
            }
            .root :global(.total) {
              text-align: right;
              font-size: 10px;
              color: #b2bdcb;
            }
            .root :global(.price-wrapper) {
              margin-left: 5px;
              color: #062f49;
              font-size: 18px;
              font-weight: bold;
            }
            .cart-menu-wrapper {
              margin-bottom: 25px;
            }
            .button-wrapper {
              text-align: right;
            }
            .total {
              margin-bottom: 30px;
            }
          `}</style>
          {this.state.isMounted &&
            (_.isEmpty(this.props.items) ? (
              <h2 className="app-text-empty">{cartUI.emptyStatus.i18n.defaultText}</h2>
            ) : (
              <div>
                <div className="cart-menu-wrapper">
                  <CartItems
                    cssModificationClass="has-border-bottom"
                    mayDeleteItems={true}
                    mayChangeAmountItems={true}
                    size="large"
                  />
                </div>
                <Row type="flex" justify="end" align="middle">
                  <Col span={23} pull={1}>
                    <div className="total">
                      {this.props.ui.routes.cart.total.i18n.defaultText}:
                      <span className="price-wrapper">
                        <Price price={this.props.totalPrice} currency={currency} />
                      </span>
                    </div>
                  </Col>
                </Row>
                <div className="button-wrapper">
                  <Button type="primary" size="large" onClick={this.handleCheckout}>
                    {cartUI.checkout.i18n.defaultText}
                  </Button>
                </div>
              </div>
            ))}
        </div>
      );
    }
  },
);

export default WrappedCart;
