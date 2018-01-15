import React from 'react';
import { connect } from 'react-redux';
import { Spin, Button } from 'antd';
import _ from 'lodash';
import dispatch from 'src/store/dispatch';
import { getCartPaidItems } from 'src/ducks/cartPaidItems';
import CartPaidItems from './CartPaidItems';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  items: Alicanto.Models.CatalogItem[];
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
  items: state.cartPaidItems.results,
  isRequesting: state.cartPaidItems.isRequesting,
  hasNextPage: !!state.cartPaidItems.next,
});

const WrappedUserPurchases = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class UserPurchases extends React.Component<IProps, IState> {
    state: IState = {
      isMounted: false,
      page: 1,
    };

    handleShowMore = () => {
      this.setState((prevState, props) => {
        const page = prevState.page + 1;
        setTimeout(() => dispatch(getCartPaidItems('' + page)));
        return {
          page,
        };
      });
    };

    componentDidMount() {
      dispatch(getCartPaidItems(' ' + this.state.page));
      this.setState({ isMounted: true });
    }

    render() {
      const userPurchasesUI = this.props.ui.routes.user.purchases;
      const commonUI = this.props.ui.common;
      return (
        <div className="root">
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
            .footer {
              padding-top: 15px;
              text-align: center;
            }
          `}</style>
          {this.state.isMounted &&
            (_.isEmpty(this.props.items) ? (
              !this.props.isRequesting && (
                <div className="app-text-empty">{userPurchasesUI.emptyStatus.i18n.defaultText}</div>
              )
            ) : (
              <CartPaidItems ui={this.props.ui} items={this.props.items} />
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

export default WrappedUserPurchases;
