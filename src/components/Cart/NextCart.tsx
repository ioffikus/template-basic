import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import _ from 'lodash';
import { IObject } from 'src/core/interfaces/IObject';
import Delivery from 'src/components/CartDelivery';
import Payment from 'src/components/CartPayment';
import Order from './Order';
import Confirm from './Confirm';

// WIP: It is future version of Cart

interface ITabProps {
  prevStep: () => void;
  nextStep: () => void;
}

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  items: Alicanto.Models.CatalogItem[];
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  activeKey: string;
  isMounted: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  items: state.cart.items,
});

const WrappedCart = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Cart extends React.Component<IProps, IState> {
    readonly defaultKey = 'order';

    readonly tabs: IObject<React.StatelessComponent<ITabProps>> = {
      order: props => <Order {...props} />,
      delivery: props => <Delivery {...props} />,
      confirm: props => <Confirm {...props} />,
      payment: props => <Payment {...props} />,
    };

    readonly tabKeys = Object.keys(this.tabs);

    state: IState = {
      activeKey: this.defaultKey,
      isMounted: false,
    };

    nextStep = (key: string) => () => {
      const index = this.tabKeys.indexOf(key);
      this.setState({ activeKey: this.tabKeys[index + 1] });
    };

    prevStep = (key: string) => () => {
      const index = this.tabKeys.indexOf(key);
      this.setState({ activeKey: this.tabKeys[index - 1] });
    };

    onTabClick = (activeKey: string) => {
      this.setState({ activeKey });
    };

    componentDidMount() {
      this.setState({ isMounted: true });
    }

    render() {
      const cartUI = this.props.ui.routes.cart;
      return (
        <div className="root app-container">
          <style jsx>{`
            .root {
              padding-bottom: 30px;
            }
            .root :global(.ant-tabs-bar) {
              margin-bottom: 29px;
            }
            .root :global(.total) {
              text-align: right;
              font-size: 10px;
              color: #b2bdcb;
            }
            .root :global(.price-wrapper) {
              margin-left: 5px;
              color: #062f49;
              font-size: 18px;
              font-weight: bold;
            }
          `}</style>
          {this.state.isMounted &&
            (_.isEmpty(this.props.items) ? (
              <h2 className="app-text-empty">{cartUI.emptyStatus.i18n.defaultText}</h2>
            ) : (
              <Tabs activeKey={this.state.activeKey} onTabClick={this.onTabClick}>
                {this.tabKeys.map(key => {
                  const title = _.get(cartUI.tabs, `${key}.i18n.defaultText`, '');
                  const Tab = this.tabs[key];
                  return (
                    <Tabs.TabPane
                      key={key}
                      tab={title}
                      disabled={this.tabKeys.indexOf(key) >= this.tabKeys.indexOf(this.state.activeKey)}
                    >
                      <Tab prevStep={this.prevStep(key)} nextStep={this.nextStep(key)} />
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            ))}
        </div>
      );
    }
  },
);

export default WrappedCart;
