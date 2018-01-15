import React from 'react';
import { connect } from 'react-redux';
import { RouterState, push } from 'connected-react-router';
import { Button, Icon } from 'antd';
import _ from 'lodash';
import queryString from 'query-string';
import { IObject } from 'src/core/interfaces/IObject';
import dispatch from 'src/store/dispatch';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  ui: Alicanto.Models.UI;
  ordering: string;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
  ui: state.ui,
  ordering: state.catalogQuery.ordering,
});

const WrappedOrdering = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Ordering extends React.Component<IProps, IState> {
    readonly itemsUI = this.props.ui.common.filters.ordering.items;
    orderFields: IObject<string> = {
      id: this.itemsUI.orderingById.i18n.defaultText,
      price: this.itemsUI.orderingByPrice.i18n.defaultText,
      name: this.itemsUI.orderingByName.i18n.defaultText,
    };

    changeOrder = (orderField: string) => () => {
      let ordering;
      if (this.props.ordering.indexOf(orderField) !== -1) {
        ordering = _.startsWith(this.props.ordering, '-') ? null : `-${orderField}`;
      } else {
        ordering = orderField;
      }
      const query = { ...queryString.parse(this.props.router.location.search), ordering };
      delete query.page;
      if (_.isNull(ordering)) {
        delete query.ordering;
      }
      const location = { ...this.props.router.location, search: queryString.stringify(query) };
      dispatch(push(location));
    };

    getButtonIcon = (buttonName: string) => {
      if (this.props.ordering.indexOf(buttonName) !== -1) {
        return _.startsWith(this.props.ordering, '-') ? <Icon type="caret-up" /> : <Icon type="caret-down" />;
      }
    };

    getButtonClassName = (buttonName: string) => {
      if (this.props.ordering.indexOf(buttonName) !== -1) {
        return 'active';
      }
    };

    render() {
      return (
        <div className="root">
          <style jsx>{`
            .root :global(.ant-btn) {
              display: block;
              font-size: inherit;
              text-transform: uppercase;
              text-align: left;
              color: #062f49;
              border: 1px solid #d9d9d9;
              width: 100%;
              letter-spacing: 2px;
            }
            .root :global(.ant-btn:after) {
              display: none;
            }
            .root :global(.ant-btn + .ant-btn) {
              margin-top: 10px;
            }
            .root :global(.ant-btn.active) {
              color: inherit;
              border-color: currentColor;
            }
          `}</style>
          {Object.keys(this.orderFields).map((key: string) => (
            <Button onClick={this.changeOrder(key)} className={this.getButtonClassName(key)} key={key}>
              {this.orderFields[key]} {this.getButtonIcon(key)}
            </Button>
          ))}
        </div>
      );
    }
  },
);

export default WrappedOrdering;
