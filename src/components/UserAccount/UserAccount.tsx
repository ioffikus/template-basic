import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import dispatch from 'src/store/dispatch';
import { putUser } from 'src/ducks/user';
import MainForm from './MainForm';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  user: Alicanto.Models.User;
  isRequesting: boolean;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  user: state.user,
  isRequesting: state.user.isRequesting,
});

const WrappedUserAccount = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class UserAccount extends React.Component<IProps, IState> {
    handleSubmit = (user: Alicanto.Models.User, cb: () => void) => {
      dispatch(putUser(user, cb));
    };

    render() {
      return (
        <div className="root">
          <style jsx>{`
            .spin-wrapper {
              text-align: center;
            }
          `}</style>
          {this.props.user.email ? (
            <MainForm
              ui={this.props.ui}
              user={this.props.user}
              onSubmit={this.handleSubmit}
              isRequesting={this.props.isRequesting}
            />
          ) : (
            this.props.isRequesting && (
              <div className="spin-wrapper">
                <Spin />
              </div>
            )
          )}
        </div>
      );
    }
  },
);

export default WrappedUserAccount;
