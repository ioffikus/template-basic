import React from 'react';
import { Row, Col } from 'antd';
import dispatch from 'src/store/dispatch';
import { getProduct } from 'src/ducks/product';
import Breadcrumbs from 'src/components/Breadcrumbs';
import ImagePreview from 'src/components/ProductImagePreview';
import SocialLinks from './SocialLinks';
import Description from './Description';
import Details from './Details';

interface IProps {}

interface IState {}

class Product extends React.Component<IProps, IState> {
  static fetchData: Store.IFetchDataFn = abortToken => {
    return dispatch(getProduct(abortToken));
  };

  render() {
    return (
      <div className="root app-container">
        <style jsx>{`
          .root :global(.header) {
            margin-bottom: 55px;
            padding-bottom: 4px;
            border-bottom: 1px solid #e5ecf4;
          }
          .root :global(.content) {
            margin-bottom: 20px;
          }
        `}</style>
        <Row type="flex" justify="space-between" align="bottom" className="header">
          <Col span={20}>
            <Breadcrumbs for="product" />
          </Col>
          <Col span={4}>
            <SocialLinks />
          </Col>
        </Row>
        <Row type="flex" gutter={30}>
          <Col xs={24} sm={24} md={12} className="content">
            <ImagePreview />
          </Col>
          <Col xs={24} sm={24} md={12} className="content">
            <Description />
          </Col>
        </Row>
        <Details />
      </div>
    );
  }
}

export default Product;
