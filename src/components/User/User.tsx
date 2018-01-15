import React from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { RouterState, push } from 'connected-react-router';
import _ from 'lodash';
import { Tabs } from 'antd';
import { IObject } from 'src/core/interfaces/IObject';
import dispatch from 'src/store/dispatch';
import Orders from 'src/components/UserOrders';
import Account from 'src/components/UserAccount';
import Purchases from 'src/components/UserPurchases';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  activeKey: string;
}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
  ui: state.ui,
});

const WrappedUser = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class User extends React.Component<IProps, IState> {
    readonly defaultKey = 'account';

    readonly tabs: IObject<React.StatelessComponent> = {
      account: () => <Account />,
      purchases: () => <Purchases />,
      orders: () => <Orders />,
    };

    readonly tabKeys = Object.keys(this.tabs);

    state: IState = {
      activeKey: this.defaultKey,
    };

    setActiveKey = (pathname: string) => {
      const match = matchPath(pathname, { path: '/user/:key' });
      if (!_.isNull(match)) {
        const key = _.get(match.params, 'key', null);
        const activeKey = this.tabKeys.indexOf(key) === -1 ? this.defaultKey : key;
        this.setState({
          activeKey,
        });
      }
    };

    handleChange = (activeKey: string) => {
      dispatch(push(`/user/${activeKey}`));
    };

    componentWillMount() {
      this.setActiveKey(this.props.router.location.pathname);
    }

    componentWillReceiveProps(nextProps: IProps) {
      if (this.props.router.location.pathname !== nextProps.router.location.pathname) {
        this.setActiveKey(nextProps.router.location.pathname);
      }
    }

    render() {
      const userUI = this.props.ui.routes.user;
      return (
        <div className="root app-container">
          <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
            {this.tabKeys.map(key => {
              const title = _.get(userUI, `${key}.title.i18n.defaultText`, '');
              const Tab = this.tabs[key];
              return (
                <Tabs.TabPane key={key} tab={title}>
                  <Tab />
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      );
    }
  },
);

export default WrappedUser;
