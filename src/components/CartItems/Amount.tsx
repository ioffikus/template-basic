import React from 'react';
import { connect } from 'react-redux';
import { InputNumber, Spin } from 'antd';
import dispatch from 'src/store/dispatch';
import { increaseQuantity, decreaseQuantity } from 'src/ducks/cart';

interface IOwnProps {
  mayChangeAmountItems: boolean;
  uid: string;
  count: number;
  pendingShowSpinning?: number;
  pendingHideSpinning?: number;
}

interface IConnectedState {}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isSpinning: boolean;
}

const mapStateToProps = (state: Store.IState) => ({});

const WrappedAmount = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Amount extends React.Component<IProps, IState> {
    static defaultProps = {
      pendingShowSpinning: 400,
      pendingHideSpinning: 300,
    };

    spinningTimeoutId: number;

    state: IState = {
      isSpinning: false,
    };

    showSpinning = () => {
      if (!!this.spinningTimeoutId) {
        window.clearTimeout(this.spinningTimeoutId);
        this.spinningTimeoutId = null;
      }
      this.spinningTimeoutId = window.setTimeout(() => {
        this.setState({ isSpinning: true });
      }, this.props.pendingShowSpinning);
    };

    hideSpinning = () => {
      if (!!this.spinningTimeoutId) {
        window.clearTimeout(this.spinningTimeoutId);
        this.spinningTimeoutId = null;
      }
      if (this.state.isSpinning) {
        this.spinningTimeoutId = window.setTimeout(() => {
          this.setState({ isSpinning: false });
        }, this.props.pendingHideSpinning);
      }
    };

    handleChangeAmount = (value: number) => {
      if (process.env.BROWSER) {
        const { uid, count } = this.props;
        this.showSpinning();
        if (count < value) {
          dispatch(
            increaseQuantity(uid, () => {
              this.hideSpinning();
            }),
          );
        } else {
          dispatch(
            decreaseQuantity(uid, () => {
              this.hideSpinning();
            }),
          );
        }
      }
    };

    componentWillUnmount() {
      if (process.env.BROWSER) {
        if (!!this.spinningTimeoutId) {
          window.clearTimeout(this.spinningTimeoutId);
        }
      }
    }

    render() {
      const { mayChangeAmountItems, count } = this.props;
      return (
        <div className="root">
          <style jsx>{`
            .root {
              display: inline-block;
              vertical-align: top;
            }
            .root :global(.ant-input-number) {
              border: 0;
              display: flex;
              justify-content: center;
              background: transparent;
              color: #062f49;
            }
            .root :global(.ant-input-number:hover) {
              border-color: transparent;
            }
            .root :global(.ant-input-number-focused) {
              box-shadow: none;
              border-color: transparent;
            }
            .root :global(.ant-input-number-handler-wrap) {
              border: 0;
              opacity: 1;
              width: 100%;
              display: flex;
              flex-direction: row-reverse;
              background: transparent;
            }
            .root :global(.ant-input-number-input-wrap) {
              position: relative;
              z-index: 3;
              width: 32px;
              height: 32px;
            }
            .root :global(.ant-input-number-handler) {
              width: 50%;
              height: 100%;
              border: 0;
              top: 0;
              bottom: 0;
              background: transparent;
            }
            .root :global(.ant-input-number-handler:hover) {
              height: 100% !important;
            }
            .root :global(.ant-input-number-handler-down-inner) {
              right: auto;
              left: 4px;
            }
            .root :global(.ant-input-number-input) {
              background-color: #e5ecf4;
              border-radius: 8px;
              color: inherit;
              text-align: right;
              font-weight: bold;
            }
          `}</style>
          {mayChangeAmountItems ? (
            <Spin spinning={this.state.isSpinning}>
              <InputNumber min={1} value={count} onChange={this.handleChangeAmount} />
            </Spin>
          ) : (
            count
          )}
        </div>
      );
    }
  },
);

export default WrappedAmount;
