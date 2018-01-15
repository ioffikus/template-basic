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
  shortDescription: string;
  count: number;
  currency: string;
  price: number;
  uid: string;
}

interface IProps {
  ui: Alicanto.Models.UI;
  items: Alicanto.Models.CatalogItem[];
}

interface IState {}

class CartPaidItems extends React.Component<IProps, IState> {
  getDataSource = (): IRecord[] => {
    return this.props.items.map(item => {
      const key = item.id;
      const uid = item.uid;
      const count = _.get(item, 'count', 0);
      const schemaFields = item.schema_fields;
      const pictureUrl = _.get(schemaFields, 'picture_url.value', '');
      const name = _.get(schemaFields, 'name.value', '');
      const shortDescription = _.get(schemaFields, 'short_description.value', '');
      const currency = _.get(schemaFields, 'currency.value', '');
      const price = _.get(schemaFields, 'price.value', 0);
      return {
        key,
        pictureUrl,
        name,
        shortDescription,
        count,
        price,
        currency,
        uid,
      };
    });
  };

  render() {
    const commonUI = this.props.ui.common;
    const columns = [
      {
        title: commonUI.tables.cells.image.i18n.defaultText,
        key: 'image',
        className: 'image-col',
        render: (text: string, record: IRecord) => {
          return <CartProductImage pictureUrl={record.pictureUrl} imageAlt={record.name} />;
        },
      },
      {
        title: commonUI.tables.cells.name.i18n.defaultText,
        key: 'name',
        className: 'name-col',
        render: (text: string, record: IRecord) => {
          const { uid, shortDescription, name } = record;
          return (
            <div className="disc">
              <Link to={`/product/${uid}`} className="name" title={shortDescription}>
                {name}
              </Link>
              <div className="code"># {uid}</div>
            </div>
          );
        },
      },
      {
        title: commonUI.tables.cells.count.i18n.defaultText,
        key: 'count',
        className: 'count-col',
        render: (text: string, record: IRecord) => {
          const count = record.count;
          return <div>{count}</div>;
        },
      },
      {
        title: commonUI.tables.cells.price.i18n.defaultText,
        key: 'price',
        className: 'price-col',
        render: (text: string, record: IRecord) => {
          const { currency, price } = record;
          return <Price price={price} currency={currency} />;
        },
      },
    ];

    return (
      <div className="root">
        <style jsx>{`
          .root :global(.image-col) {
            width: 66px;
          }
          .root :global(.price-col) {
            text-align: right;
            padding-right: 20px;
          }
          .root :global(.count-col) {
            padding-right: 20px;
            text-align: right;
          }
          .root :global(.ant-table-thead > tr > th) {
            color: #062f49;
            font-weight: 500;
            text-transform: uppercase;
            background: transparent;
            border-bottom: 1px solid #b2bdcb;
          }
          .root :global(.name) {
            color: #062f49;
          }
          .root :global(.code) {
            color: #b2bdcb;
          }
        `}</style>
        <Table columns={columns} dataSource={this.getDataSource()} pagination={false} />
      </div>
    );
  }
}

export default CartPaidItems;
