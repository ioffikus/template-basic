import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Do not use <Link to="url"/> or dispatch(push("url")) on this page (only <a href="url"> available)

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
});

const WrappedNotFound = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class NotFound extends React.Component<IProps, IState> {
    render() {
      const notFoundUI = this.props.ui.routes.notFound;
      return (
        <div>
          <Route
            render={({ staticContext }) => {
              // we have to check if staticContext exists
              // because it will be undefined if rendered through a BrowserRouter
              if (staticContext) {
                staticContext.status = 404;
              }
              return null;
            }}
          />
          <div>
            <h1>{notFoundUI.title.i18n.defaultText}</h1>
          </div>
          <p>
            {notFoundUI.text.i18n.defaultText}
            <br />
            <br />
            {`${notFoundUI.return.i18n.defaultText} `}
            <a href="/">{notFoundUI.link.i18n.defaultText}</a>.
          </p>
        </div>
      );
    }
  },
);

export default WrappedNotFound;
