import React from 'react';
import { Row, Col } from 'antd';
import Breadcrumbs from 'src/components/Breadcrumbs';
import SearchFrom from './SearchForm';
import ProductItems from './ProductItems';

class Catalog extends React.Component<{}, {}> {
  render() {
    return (
      <div className="root app-container">
        <style jsx>{`
          .root :global(.header) {
            margin-bottom: 30px;
          }
        `}</style>
        <Row type="flex" justify="space-between" className="header">
          <Col span={23}>
            <Breadcrumbs for="catalog" />
          </Col>
          <Col span={1}>
            <SearchFrom />
          </Col>
        </Row>
        <ProductItems />
      </div>
    );
  }
}

export default Catalog;
