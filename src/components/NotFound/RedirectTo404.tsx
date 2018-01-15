import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps {}

interface IState {}

class RedirectTo404 extends React.Component<IProps, IState> {
  render() {
    return (
      <Route
        render={({ staticContext }) => {
          // we have to check if staticContext exists
          // because it will be undefined if rendered through a BrowserRouter
          if (staticContext) {
            staticContext.status = 302;
            staticContext.url = '/404';
            return null;
          }
          return <Redirect to="/404" />;
        }}
      />
    );
  }
}

export default RedirectTo404;
