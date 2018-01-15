import React from 'react';
import { Row, Col } from 'antd';
import Item from './Item';

interface IProps {
  ui: Alicanto.Models.UI;
}

interface IState {}

class List extends React.Component<IProps, IState> {
  render() {
    const items = this.props.ui.common.footerLinks.items;
    return (
      <div className="root app-container">
        <style jsx>{`
          .root :global(.item) {
            flex: 1;
          }
        `}</style>
        <Row type="flex">
          {Object.keys(items).map(key => {
            const item = items[key];
            return (
              <Col className="item" key={key}>
                <Item links={item.links} title={item.title.i18n.defaultText} />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default List;
