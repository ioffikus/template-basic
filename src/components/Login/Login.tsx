import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ConfigHelper from 'src/helpers/configHelper';
import dispatch from 'src/store/dispatch';
import { getAuthLink, loginUser } from 'src/ducks/auth';
import MainForm from './MainForm';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  url: string;
  data: object;
  isRequesting: boolean;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  url: state.auth.url,
  data: state.auth.data,
  isRequesting: state.auth.isRequesting,
});

const WrappedLogin = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Login extends React.Component<IProps, IState> {
    componentDidMount() {
      if (!ConfigHelper.isDev()) dispatch(getAuthLink());
    }

    handleSubmit = ({ username, password }: { username: string; password: string }) => {
      dispatch(loginUser(username, password));
    };

    render() {
      const loginUI = this.props.ui.routes.login;
      return (
        <div className="root app-container">
          <style jsx>{`
            .login-link-container {
              display: flex;
              justify-content: center;
            }
          `}</style>
          {ConfigHelper.isDev() && (
            <MainForm onSubmit={this.handleSubmit} ui={this.props.ui} isRequesting={this.props.isRequesting} />
          )}
          {!_.isNull(this.props.url) && (
            <div className="login-link-container">
              <a href={this.props.url + JSON.stringify(this.props.data)}>
                {loginUI.form.buttons.signIn.i18n.defaultText} / {loginUI.form.buttons.registration.i18n.defaultText}
              </a>
            </div>
          )}
        </div>
      );
    }
  },
);

export default WrappedLogin;
