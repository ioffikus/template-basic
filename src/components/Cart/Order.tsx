import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import _ from 'lodash';
import CartItems from 'src/components/CartItems';
import Price from 'src/components/Price';

interface IOwnProps {
  nextStep: () => void;
}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  totalPrice: number;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  totalPrice: state.cart.totalPrice,
});

const WrappedOrder = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Order extends React.Component<IProps, IState> {
    render() {
      // TODO ch1333
      const currency: string = _.get(this.props, 'items[0].schema_fields.currency.value', '');
      const buttonsUI = this.props.ui.common.buttons;
      return (
        <div className="root">
          <style jsx>{`
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
            <Button type="primary" size="large" onClick={this.props.nextStep}>
              {buttonsUI.nextStep.i18n.defaultText}
            </Button>
          </div>
        </div>
      );
    }
  },
);

export default WrappedOrder;
