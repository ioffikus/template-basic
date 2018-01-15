import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table, Spin, Button } from 'antd';
import moment from 'moment';
import dispatch from 'src/store/dispatch';
import { getUserOrders } from 'src/ducks/userOrders';
import CartItems from './CartItems';
import Status from './Status';
import Actions from './Actions';
import Price from 'src/components/Price';

interface IRecord {
  key: number;
  id: number;
  status: string;
  date: string;
  itemsCount: number;
  total: number;
  currency: string;
  isPaid: boolean;
  cart: Alicanto.Models.Cart;
  transactionDetails: string;
  transactionStatus: string;
}

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  locale: string;
  items: Alicanto.Models.Order[];
  isRequesting: boolean;
  hasNextPage: boolean;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isMounted: boolean;
  page: number;
}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  locale: state.locale.current,
  items: state.userOrders.results,
  isRequesting: state.userOrders.isRequesting,
  hasNextPage: !!state.userOrders.next,
});

const WrappedOrders = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Orders extends React.Component<IProps, IState> {
    rootRef: HTMLElement;

    state: IState = {
      isMounted: false,
      page: 1,
    };

    setRootRef = (element: HTMLElement) => (this.rootRef = element);

    getRootRef = () => {
      return this.rootRef;
    };

    getDataSource = (): IRecord[] => {
      return this.props.items.map(item => {
        const key = item.id;
        const id = item.id;
        const cart = item.cart;
        const date = moment(cart.modified)
          .locale(this.props.locale)
          .format('lll');
        const itemsCount = cart.items_count;
        const total = cart.total;
        // TODO ch1333
        const currency = _.get(item, 'cart.items[0].schema_fields.currency.value', '');
        const status = item.status;
        const isPaid = item.is_paid;
        const transactionDetails = item.transaction_details;
        const transactionStatus = item.transaction_status;

        return {
          key,
          id,
          itemsCount,
          total,
          currency,
          status,
          date,
          isPaid,
          cart,
          transactionDetails,
          transactionStatus,
        };
      });
    };

    renderCartItems = (record: IRecord) => {
      const items = record.cart.items;
      return <CartItems ui={this.props.ui} items={items} />;
    };

    handleShowMore = () => {
      this.setState((prevState, props) => {
        const page = prevState.page + 1;
        setTimeout(() => dispatch(getUserOrders('' + page)));
        return {
          page,
        };
      });
    };

    componentDidMount() {
      dispatch(getUserOrders('' + this.state.page));
      this.setState({ isMounted: true });
    }

    render() {
      const userOrdersUI = this.props.ui.routes.user.orders;
      const commonUI = this.props.ui.common;
      const columns = [
        {
          title: commonUI.tables.cells.status.i18n.defaultText,
          key: 'status',
          render: (text: string, record: IRecord) => {
            const { status, transactionDetails, transactionStatus } = record;
            return (
              <Status
                ui={this.props.ui}
                status={status}
                transactionDetails={transactionDetails}
                transactionStatus={transactionStatus}
                getRootRef={this.getRootRef}
              />
            );
          },
        },
        { title: commonUI.tables.cells.date.i18n.defaultText, dataIndex: 'date' },
        { title: commonUI.tables.cells.itemsCount.i18n.defaultText, dataIndex: 'itemsCount' },
        {
          title: commonUI.tables.cells.total.i18n.defaultText,
          key: 'total',
          render: (text: string, record: IRecord) => {
            const { currency, total } = record;
            return <Price price={total} currency={currency} />;
          },
        },
        {
          title: commonUI.tables.cells.actions.i18n.defaultText,
          key: 'actions',
          render: (text: string, record: IRecord) => {
            const { isPaid, id } = record;
            return <Actions isPaid={isPaid} id={id} />;
          },
        },
      ];
      const defaultExpandedRowKeys = this.props.items.length ? [this.props.items[0].id] : [];
      return (
        <div className="root" ref={this.setRootRef}>
          <style jsx>{`
            .root {
              font-size: 14px;
              font-weight: bold;
              padding-bottom: 15px;
            }
            .root :global(.ant-table-thead > tr > th) {
              color: #062f49;
              font-weight: 500;
              text-transform: uppercase;
              background: transparent;
            }
            .root :global(.main-table) {
              background: #fff;
              margin-bottom: 16px;
            }
            .footer {
              text-align: center;
            }
            .root :global(.status-popover) {
              max-width: 400px;
            }
            .root :global(.status-popover .ant-popover-arrow) {
              display: block;
            }
          `}</style>
          {this.state.isMounted &&
            (_.isEmpty(this.props.items) ? (
              !this.props.isRequesting && (
                <div className="app-text-empty text-empty">{userOrdersUI.emptyStatus.i18n.defaultText}</div>
              )
            ) : (
              <Table
                className="main-table"
                columns={columns}
                dataSource={this.getDataSource()}
                pagination={false}
                expandedRowRender={this.renderCartItems}
                defaultExpandedRowKeys={defaultExpandedRowKeys}
              />
            ))}
          <div className="footer">
            {this.props.isRequesting ? (
              <Spin />
            ) : (
              this.props.hasNextPage && (
                <Button onClick={this.handleShowMore} size="large" className="app-show-more-button">
                  {commonUI.buttons.showMore.i18n.defaultText}
                </Button>
              )
            )}
          </div>
        </div>
      );
    }
  },
);

export default WrappedOrders;
