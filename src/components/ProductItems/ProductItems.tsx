import React from 'react';
import { RouterState, push } from 'connected-react-router';
import { Row, Col, Button, Spin, Modal } from 'antd';
import _ from 'lodash';
import queryString from 'query-string';
import dispatch from 'src/store/dispatch';
import { addToCart } from 'src/ducks/cart';
import CartItems from 'src/components/CartItems';
import GoToCart from 'src/components/GoToCart';
import Item from './Item';

interface IProps {
  router: RouterState;
  ui: Alicanto.Models.UI;
  isRequesting: boolean;
  items: Alicanto.Models.CatalogItem[];
  hasNextPage: boolean;
}

interface IState {
  isVisibleCartModal: boolean;
}

class ProductItems extends React.Component<IProps, IState> {
  state: IState = {
    isVisibleCartModal: false,
  };

  handleCartModalCancel = () => {
    this.setState({
      isVisibleCartModal: false,
    });
  };

  handleAddToCart = (item: Alicanto.Models.CatalogItem) => () => {
    dispatch(
      addToCart(item, () => {
        this.setState({
          isVisibleCartModal: true,
        });
      }),
    );
  };

  handleShowMore = () => {
    const query = queryString.parse(this.props.router.location.search);
    query.page = parseInt(_.get(query, 'page', '1'), 10) + 1;
    const location = { ...this.props.router.location, search: queryString.stringify(query) };
    dispatch(push(location));
  };

  render() {
    const commonUI = this.props.ui.common;
    return (
      <div className="root">
        <style jsx>{`
          .root {
            padding-bottom: 16px;
          }
          .root :global(.footer) {
            padding: 0 8px;
            text-align: center;
          }
        `}</style>
        <Row type="flex" justify="start">
          {this.props.items.map((item: Alicanto.Models.CatalogItem) => (
            <Col key={item.uid} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Item ui={this.props.ui} item={item} handleAddToCart={this.handleAddToCart(item)} />
            </Col>
          ))}
        </Row>
        <Row type="flex" justify="center" align="middle" className="footer">
          <Col span={24}>
            {this.props.isRequesting ? (
              <Spin />
            ) : (
              this.props.hasNextPage && (
                <Button onClick={this.handleShowMore} size="large" className="app-show-more-button">
                  {commonUI.buttons.showMore.i18n.defaultText}
                </Button>
              )
            )}
          </Col>
        </Row>
        <Modal visible={this.state.isVisibleCartModal} onCancel={this.handleCartModalCancel} footer={false} width={540}>
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
}

export default ProductItems;
