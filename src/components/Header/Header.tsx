import React from 'react';
import { connect } from 'react-redux';
import { RouterState } from 'connected-react-router';
import { matchPath } from 'react-router';
import _ from 'lodash';
import cx from 'classnames';
import { Menu, Button, Avatar, Dropdown, Popover, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { IObject } from 'src/core/interfaces/IObject';
import dispatch from 'src/store/dispatch';
import { logoutUser } from 'src/ducks/auth';
import { getUser } from 'src/ducks/user';
import { deleteCart, getCartFromLocalStorage, postLocalStorageCart } from 'src/ducks/cart';
import Svg from 'src/components/Svg';
import CartItems from 'src/components/CartItems';
import GoToCart from 'src/components/GoToCart';
import LanguageSwitcher from './LanguageSwitcher';
import SearchForm from './SearchForm';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  ui: Alicanto.Models.UI;
  isAuthenticated: boolean;
  cartItemsCount: number;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isVisibleCart: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
  ui: state.ui,
  isAuthenticated: state.auth.isAuthenticated,
  cartItemsCount: state.cart.itemsCount,
});

const WrappedHeader = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Header extends React.Component<IProps, IState> {
    state: IState = {
      isVisibleCart: false,
    };

    handleProfileMenu = ({ key }: { key: string }) => {
      const cases: IObject<() => void> = {
        logout: () => {
          const cb = () => {
            dispatch(deleteCart());
          };
          dispatch(logoutUser(cb));
        },
      };
      const currentCase = cases[key];
      if (currentCase) {
        currentCase();
      }
    };

    handleVisibleCart = (visible: boolean) => {
      const match = matchPath(this.props.router.location.pathname, { path: '/cart' });

      if (_.isNull(match)) {
        this.setState({ isVisibleCart: visible });
      }
    };

    readonly triggerDropdownMode: ('click')[] = ['click'];

    componentDidMount() {
      dispatch(getCartFromLocalStorage());
      if (this.props.isAuthenticated) {
        dispatch(getUser());
        dispatch(postLocalStorageCart());
      }
    }

    componentWillReceiveProps(nextProps: IProps) {
      if (nextProps.router.location.pathname === '/cart') {
        this.setState({ isVisibleCart: false });
      }
      if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
        if (nextProps.isAuthenticated) {
          dispatch(getUser());
          dispatch(postLocalStorageCart());
        } else {
          dispatch(getCartFromLocalStorage());
        }
      }
    }

    render() {
      const commonUI = this.props.ui.common;
      return (
        <div className="root">
          <style jsx>{`
            .root {
              position: relative;
              z-index: 10;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 33px 0;
            }
            .root :global(.ant-menu) {
              text-transform: uppercase;
              font-weight: bold;
              border-bottom: 0;
              font-size: 11px;
              letter-spacing: 2px;
            }
            .root :global(.ant-menu-item) {
              border-bottom: 0;
              padding-left: 25px;
              padding-right: 25px;
            }
            .root :global(.logo) {
              display: flex;
              align-items: center;
              color: inherit;
              font-size: 14px;
            }
            .logo-icon {
              min-width: 48px;
              max-width: 48px;
              height: 48px;
              border-radius: 6px;
              border: 2px solid red;
              margin-right: 17px;
            }
            .logo-name {
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .root :global(.anticon) {
              font-size: 23px;
              vertical-align: middle;
            }
            .root :global(.ant-avatar) {
              cursor: pointer;
            }
            .root :global(.login) {
              color: currentColor;
              width: 32px;
              height: 30px;
              display: flex;
              padding-top: 3px;
            }
            .root :global(.button-active) {
              color: #ff0959;
              border: 0;
            }
            .right {
              display: flex;
              align-items: center;
            }
            .right-item {
              margin-left: 19px;
              min-width: 32px;
            }
          `}</style>
          <div className="left">
            <Link to="/" className="logo">
              <div className="logo-icon" />
              <div className="logo-name">{commonUI.headerLogo.title.i18n.defaultText}</div>
            </Link>
          </div>
          <div className="center">
            <Menu theme="light" mode="horizontal">
              <Menu.Item key="1">
                <Link to="/catalog">{commonUI.generalLinks.catalog.i18n.defaultText}</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/pages/delivery">{commonUI.generalLinks.delivery.i18n.defaultText}</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/pages/about">{commonUI.generalLinks.about.i18n.defaultText}</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="right">
            <div className="right-item">
              <LanguageSwitcher />
            </div>

            <div className="right-item">
              <SearchForm />
            </div>

            <div className="right-item">
              <Popover
                placement="bottomRight"
                visible={this.state.isVisibleCart}
                onVisibleChange={this.handleVisibleCart}
                content={
                  <CartItems
                    mayChangeAmountItems={true}
                    mayDeleteItems={true}
                    footer={[<GoToCart key="goToCart">{commonUI.buttons.goToCart.i18n.defaultText}</GoToCart>]}
                  />
                }
                trigger="click"
              >
                <Badge count={this.props.cartItemsCount}>
                  <Button
                    shape="circle"
                    className={cx('root', {
                      'button-active': this.state.isVisibleCart,
                    })}
                  >
                    <Svg name="cart" className="app-icon-svg" />
                  </Button>
                </Badge>
              </Popover>
            </div>
            <div className="right-item">
              {this.props.isAuthenticated ? (
                <Dropdown
                  overlay={
                    <Menu onClick={this.handleProfileMenu}>
                      <Menu.Item key="account">
                        <Link to="/user/account">{commonUI.generalLinks.account.i18n.defaultText}</Link>
                      </Menu.Item>
                      <Menu.Item key="purchases">
                        <Link to="/user/purchases">{commonUI.generalLinks.purchases.i18n.defaultText}</Link>
                      </Menu.Item>
                      <Menu.Item key="orders">
                        <Link to="/user/orders">{commonUI.generalLinks.orders.i18n.defaultText}</Link>
                      </Menu.Item>
                      <Menu.Item key="logout">{commonUI.generalLinks.logout.i18n.defaultText}</Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                  trigger={this.triggerDropdownMode}
                >
                  <Avatar>A</Avatar>
                </Dropdown>
              ) : (
                <Link to="/login" className="login">
                  <Svg name="login" className="app-icon-svg" />
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }
  },
);

export default WrappedHeader;
