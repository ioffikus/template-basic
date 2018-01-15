import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import _ from 'lodash';
import Price from 'src/components/Price';
import CartProductImage from 'src/components/CartProductImage';

interface IRecord {
  key: number;
  pictureUrl: string;
  name: string;
  count: number;
  price: number;
  currency: string;
  uid: string;
}

interface IProps {
  ui: Alicanto.Models.UI;
  items: Alicanto.Models.CatalogItem[];
}

interface IState {}

class CartItems extends React.Component<IProps, IState> {
  getDataSource = (): IRecord[] => {
    return this.props.items.map(item => {
      const key = item.id;
      const uid = item.uid;
      const schemaFields = item.schema_fields;
      const pictureUrl = _.get(schemaFields, 'picture_url.value', '');
      const name = _.get(schemaFields, 'name.value', '');
      const count = _.get(item, 'count', 0);
      const currency = _.get(schemaFields, 'currency.value', '');
      const price = _.get(schemaFields, 'price.value', 0);
      return { key, pictureUrl, name, count, price, currency, uid };
    });
  };

  render() {
    const commonUI = this.props.ui.common;
    const columns = [
      {
        title: commonUI.tables.cells.image.i18n.defaultText,
        key: 'image',
        render: (text: string, record: IRecord) => {
          return <CartProductImage pictureUrl={record.pictureUrl} imageAlt={record.name} />;
        },
      },
      {
        title: commonUI.tables.cells.name.i18n.defaultText,
        key: 'name',
        render: (text: string, record: IRecord) => {
          return <Link to={`/product/${record.uid}`}>{record.name}</Link>;
        },
      },
      { title: commonUI.tables.cells.count.i18n.defaultText, dataIndex: 'count' },
      {
        title: commonUI.tables.cells.price.i18n.defaultText,
        dataIndex: 'price',
        render: (text: string, record: IRecord) => {
          const { price, currency } = record;
          return <Price price={price} currency={currency} />;
        },
      },
    ];

    return (
      <div className="root">
        <style jsx>{`
          .root :global(.ant-table-row:last-child td) {
            border: 0;
          }
        `}</style>
        <Table columns={columns} dataSource={this.getDataSource()} pagination={false} />
      </div>
    );
  }
}

export default CartItems;
