import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import cx from 'classnames';
import _ from 'lodash';
import Price from 'src/components/Price';
import CartProductImage from 'src/components/CartProductImage';
import Name from './Name';
import Amount from './Amount';
import Delete from './Delete';

interface IRecord {
  pictureUrl: string;
  nameFields: {
    name: string;
    shortDescription: string;
  };
  uid: string;
  key: string;
  count: number;
  cost: {
    currency: string;
    price: number;
  };
}

interface IOwnProps {
  mayDeleteItems?: boolean;
  mayChangeAmountItems?: boolean;
  footer?: React.ReactNode;
  cssModificationClass?: string;
  size?: 'large';
}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  items: Alicanto.Models.CatalogItem[];
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  items: state.cart.items,
});

const WrappedCartItems = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class CartItems extends React.Component<IProps, IState> {
    getDataSource = (): IRecord[] => {
      return this.props.items.map(item => {
        const uid = item.item;
        const count = _.get(item, 'count', 0);
        const schemaFields = item.schema_fields;
        const pictureUrl = _.get(schemaFields, 'picture_url.value', '');
        const name = _.get(schemaFields, 'name.value', '');
        const shortDescription = _.get(schemaFields, 'short_description.value', '');
        const currency = _.get(schemaFields, 'currency.value', '');
        const price = _.get(schemaFields, 'price.value', 0);
        return {
          pictureUrl,
          count,
          uid,
          cost: { price, currency },
          nameFields: { shortDescription, name },
          key: uid,
        };
      });
    };

    render() {
      const { mayChangeAmountItems, mayDeleteItems, cssModificationClass, size, items, footer } = this.props;
      const cartUI = this.props.ui.routes.cart;
      const columns = [
        {
          key: 'image',
          className: 'image-col',
          render: (text: string, record: IRecord) => {
            const { pictureUrl, nameFields: { name } } = record;
            return <CartProductImage pictureUrl={pictureUrl} imageAlt={name} />;
          },
        },
        {
          key: 'name',
          className: 'name-col',
          render: (text: string, record: IRecord) => {
            const { uid, nameFields: { name, shortDescription } } = record;
            return <Name uid={uid} name={name} shortDescription={shortDescription} />;
          },
        },
        {
          key: 'count',
          className: 'count-col',
          render: (text: string, record: IRecord) => {
            const { uid, count } = record;
            return <Amount mayChangeAmountItems={mayChangeAmountItems} uid={uid} count={count} />;
          },
        },
        {
          key: 'cost',
          className: 'cost-col',
          render: (text: string, record: IRecord) => {
            const { price, currency } = record.cost;
            return <Price price={price} currency={currency} />;
          },
        },
        {
          key: 'delete',
          className: 'delete-col',
          render: (text: string, record: IRecord) => {
            const { uid } = record;
            return <Delete mayDeleteItems={mayDeleteItems} uid={uid} />;
          },
        },
      ];
      return (
        <div
          className={cx('root', {
            [cssModificationClass]: !!cssModificationClass,
            large: size === 'large',
          })}
        >
          <style jsx>{`
            .root {
              width: 540px;
              max-width: 100%;
              font-size: 14px;
              font-weight: bold;
              padding: 15px 0;
            }
            .large {
              width: 100%;
              padding-bottom: 0;
            }
            .root :global(.list) {
              margin-bottom: 16px;
            }
            .root :global(.name-col) {
              width: 100%;
              max-width: 0;
            }
            .root :global(.image-col) {
              padding-left: 0;
            }
            .root :global(.delete-col) {
              padding-right: 0;
            }
            .root :global(.cost-col) {
              text-align: right;
              white-space: nowrap;
            }
            .large :global(.cost-col) {
              padding-left: 30px;
            }
            .root :global(.ant-row-flex:not(:last-of-type)) {
              margin-bottom: 9px;
              padding-bottom: 8px;
            }
            .root :global(.button-wrapper) {
              text-align: right;
            }
            .root :global(.button) {
              min-width: 192px;
              letter-spacing: 2px;
              text-transform: uppercase;
              font-weight: 500;
              font-size: 11px;
              line-height: 32px;
              text-decoration: none;
            }
            .root :global(.button + .button) {
              margin-left: 12px;
            }
            .has-border-bottom {
              border-bottom: 2px solid #e5ecf4;
            }
            .has-border-bottom :global(.ant-table-tbody > tr:not(:last-of-type) > td) {
              border-bottom: 1px solid #e5ecf4;
            }
            .root :global(.ant-table-tbody > tr > td) {
              padding-top: 9px;
              padding-bottom: 9px;
              border: 0;
            }
            .root :global(.ant-table-tbody > tr:hover > td) {
              background: transparent;
            }
          `}</style>
          {_.isEmpty(items) ? (
            <div className="app-text-empty">{cartUI.emptyStatus.i18n.defaultText}</div>
          ) : (
            <div className="inner">
              <div className="list">
                <Table columns={columns} dataSource={this.getDataSource()} pagination={false} showHeader={false} />
              </div>
              {footer && <div className="button-wrapper">{footer}</div>}
            </div>
          )}
        </div>
      );
    }
  },
);

export default WrappedCartItems;
