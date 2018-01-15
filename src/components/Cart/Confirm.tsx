import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import _ from 'lodash';
import dispatch from 'src/store/dispatch';
import { IUserDeliveryState } from 'src/ducks/userDelivery';
import { checkoutUserOrder } from 'src/ducks/userOrders';
import CartItems from 'src/components/CartItems';
import Price from 'src/components/Price';

interface IOwnProps {
  prevStep: () => void;
  nextStep: () => void;
}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  userDeliveryValues: IUserDeliveryState;
  totalPrice: number;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  userDeliveryValues: state.userDelivery,
  totalPrice: state.cart.totalPrice,
});

const WrappedConfirm = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Confirm extends React.Component<IProps, IState> {
    handleConfirmClick = () => {
      dispatch(checkoutUserOrder());
    };

    render() {
      const confirmUI = this.props.ui.routes.cart.confirm;
      const orderInfo = [
        {
          title: confirmUI.labels.purchaser.i18n.defaultText,
          value: `${this.props.userDeliveryValues.name} ${this.props.userDeliveryValues.surname}`,
        },
        {
          title: confirmUI.labels.phoneNumber.i18n.defaultText,
          value: `+${this.props.userDeliveryValues.phonePrefix} ${this.props.userDeliveryValues.phoneNumber}`,
        },
        {
          title: confirmUI.labels.email.i18n.defaultText,
          value: this.props.userDeliveryValues.email,
        },
        {
          title: confirmUI.labels.address.i18n.defaultText,
          value: `${this.props.userDeliveryValues.address}, ${this.props.userDeliveryValues.stateRegion}, ${this.props
            .userDeliveryValues.country}, ${this.props.userDeliveryValues.zipCode}`,
        },
      ];
      const buttonsUI = this.props.ui.common.buttons;
      // TODO ch1333
      const currency = _.get(this.props, 'items[0].schema_fields.currency.value', '');
      return (
        <div className="root">
          <style jsx>{`
            .cart-menu-wrapper {
              margin-bottom: 17px;
            }
            .info {
              column-count: 2;
              column-gap: 10px;
            }
            .root :global(.info-wrapper) {
              margin-bottom: 28px;
            }
            .root :global(.item) {
              margin-bottom: 12px;
            }
            .title {
              color: #b2bdcb;
              font-size: 10px;
              font-weight: 500;
            }
            .value {
              font-weight: bold;
            }
          `}</style>
          <div className="cart-menu-wrapper">
            <CartItems cssModificationClass="has-border-bottom" size="large" />
          </div>
          <Row type="flex" justify="space-between" className="info-wrapper">
            <Col span={18}>
              <div className="info">
                {orderInfo.map(item => (
                  <Row key={item.title} type="flex" className="item">
                    <Col span={7}>
                      <div className="title">{item.title}:</div>
                    </Col>
                    <Col span={17}>
                      <div className="value">{item.value}</div>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col span={6}>
              <div className="total">
                {this.props.ui.routes.cart.total.i18n.defaultText}:
                <span className="price-wrapper">
                  <Price price={this.props.totalPrice} currency={currency} />
                </span>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="primary" size="large" ghost onClick={this.props.prevStep}>
                {buttonsUI.prevStep.i18n.defaultText}
              </Button>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={this.props.nextStep}>
                {buttonsUI.confirm.i18n.defaultText}
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
  },
);

export default WrappedConfirm;
