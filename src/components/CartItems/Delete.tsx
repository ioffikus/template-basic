import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import dispatch from 'src/store/dispatch';
import { deleteFromCart } from 'src/ducks/cart';
import Svg from 'src/components/Svg';

interface IOwnProps {
  mayDeleteItems: boolean;
  uid: string;
}

interface IConnectedState {}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({});

const WrappedDelete = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Delete extends React.Component<IProps, IState> {
    handleDelete = (uid: string) => () => {
      dispatch(deleteFromCart(uid));
    };

    render() {
      const { mayDeleteItems, uid } = this.props;
      return (
        <div className="root">
          <style jsx>{`
            .root {
              text-align: right;
            }
            .root :global(.button-delete) {
              background: transparent;
              color: #b2bdcb;
            }
            .root :global(.icon-svg-trash) {
              height: 15px;
              width: 14px;
            }
          `}</style>
          {mayDeleteItems ? (
            <Button shape="circle" onClick={this.handleDelete(uid)} className="button-delete">
              <Svg name="trash" className="icon-svg-trash" />
            </Button>
          ) : (
            <span />
          )}
        </div>
      );
    }
  },
);

export default WrappedDelete;
