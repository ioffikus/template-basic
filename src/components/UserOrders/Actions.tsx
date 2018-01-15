import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import dispatch from 'src/store/dispatch';
import { payAnOrder } from 'src/ducks/userOrders';

interface IOwnProps {
  isPaid: boolean;
  id: number;
}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  currentPaymentId: number;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  currentPaymentId: state.userOrders.currentPaymentId,
});

const WrappedActions = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Actions extends React.Component<IProps, IState> {
    handleClick = () => {
      const { id } = this.props;
      dispatch(payAnOrder(id));
    };

    render() {
      const { isPaid, id, currentPaymentId, ui } = this.props;
      const buttonUI = ui.routes.user.orders.button.i18n.defaultText;
      return (
        <div className="root">
          {!isPaid && (
            <Button
              type="primary"
              size="small"
              onClick={this.handleClick}
              key="button"
              loading={currentPaymentId === id}
            >
              {buttonUI}
            </Button>
          )}
        </div>
      );
    }
  },
);

export default WrappedActions;
