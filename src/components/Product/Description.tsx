import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import _ from 'lodash';
import dispatch from 'src/store/dispatch';
import { IProductState } from 'src/ducks/product';
import { addToCart } from 'src/ducks/cart';
import CartItems from 'src/components/CartItems';
import Price from 'src/components/Price';
import GoToCart from 'src/components/GoToCart';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  product: IProductState;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isVisibleCartModal: boolean;
}

const mapStateToProps = (state: Store.IState, ownProps: IOwnProps) => ({
  ui: state.ui,
  product: state.product,
});

const WrappedDescription = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Description extends React.Component<IProps, IState> {
    state: IState = {
      isVisibleCartModal: false,
    };

    handleAddToCart = () => {
      dispatch(
        addToCart(this.props.product, () => {
          this.setState({
            isVisibleCartModal: true,
          });
        }),
      );
    };

    handleCartModalCancel = () => {
      this.setState({
        isVisibleCartModal: false,
      });
    };

    render() {
      const schemaFields = this.props.product.schema_fields;
      // const isNewItem = false; // TODO: API & design is not released yet [ch1801]
      // const isSale = false; // TODO: API & design is not released yet [ch1801]
      const name = _.get(schemaFields, 'name.value', '');
      const description = _.get(schemaFields, 'description.value', '');
      const currency: string = _.get(schemaFields, 'currency.value', '');
      const price = _.get(schemaFields, 'price.value', 0);
      // const oldPrice = 0; // TODO: API & design is not released yet [ch1801]
      // const isShowTags = isNewItem || isSale; [ch1803]
      const productCardUI = this.props.ui.routes.productCard;
      const commonUI = this.props.ui.common;
      return (
        <div className="root">
          <style jsx>{`
            .root {
              font-size: 14px;
            }
            .name {
              font-size: 24px;
              line-height: 1.17;
              margin-bottom: 15px;
              color: inherit;
            }
            .description {
              line-height: 1.7;
            }
            .root :global(.text + .text) {
              margin-top: 15px;
            }
            .content {
              margin-bottom: 17px;
            }
            .buttons-wrapper {
              display: flex;
              justify-content: space-between;
            }
            .root :global(.select-size) {
              // width: 100%;
              font-size: inherit;
              color: #a7b4c3;
              margin-right: 10px;
            }
            .root :global(.ant-select-lg .ant-select-selection--single) {
              height: 40px;
              background-color: #e5ecf4;
              border-radius: 8px;
              border: 0;
            }
            .root :global(.ant-select-lg .ant-select-selection__rendered) {
              line-height: 40px;
              margin-left: 25px;
              margin-right: 15px;
            }
            .root :global(.button-price) {
              height: 40px;
              font-weight: 500;
              letter-spacing: 2px;
              border-radius: 8px;
              padding: 0 35px;
            }
            .root :global(.button-price .currency) {
              color: inherit;
              font-size: inherit;
            }
          `}</style>
          <div className="content">
            <h1 className="name">{name}</h1>
            <p className="description">{description}</p>
          </div>
          <div className="buttons-wrapper">
            {/* TODO [ch1167] */}
            {/* <Select defaultValue="Size" size="large" className="select-size">
              <Select.Option value="5.5">5.5</Select.Option>
              <Select.Option value="6">6</Select.Option>
              <Select.Option value="6.5">6.5</Select.Option>
              <Select.Option value="7">7</Select.Option>
              <Select.Option value="7.5">7.5</Select.Option>
              <Select.Option value="8">8</Select.Option>
              <Select.Option value="8.5">8.5</Select.Option>
              <Select.Option value="9">9</Select.Option>
              <Select.Option value="9.5">9.5</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="10.5">10.5</Select.Option>
              <Select.Option value="11">11</Select.Option>
            </Select> */}
            <Button type="primary" size="large" className="button-price" onClick={this.handleAddToCart}>
              {productCardUI.button.i18n.defaultText} &nbsp;
              <Price price={price} currency={currency} />
            </Button>
          </div>
          <Modal
            visible={this.state.isVisibleCartModal}
            onCancel={this.handleCartModalCancel}
            footer={false}
            width={540}
          >
            <CartItems
              mayChangeAmountItems={true}
              footer={[
                <Button
                  key="continueShopping"
                  className="button"
                  type="primary"
                  size="large"
                  onClick={this.handleCartModalCancel}
                >
                  {commonUI.buttons.continueShopping.i18n.defaultText}
                </Button>,
                <GoToCart key="goToCart">{commonUI.buttons.goToCart.i18n.defaultText}</GoToCart>,
              ]}
            />
          </Modal>
        </div>
      );
    }
  },
);

export default WrappedDescription;
