import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import nanoid from 'nanoid';
import { Route } from 'react-router';
import { RouterState } from 'connected-react-router';
import { RouteConfig, matchRoutes, renderRoutes } from 'react-router-config';
import dispatch from 'src/store/dispatch';
import { showProgress, hideProgress } from 'src/ducks/progress';
import { abortTokenPool } from 'src/core/API';
import { logException } from 'src/helpers/sentryClient';
import ConfigHelper from 'src/helpers/configHelper';

interface IOwnProps {
  routes: RouteConfig[];
}

interface IConnectedState {
  router: RouterState;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isPreviousLocation: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
});

const WrappedPendingNavDataLoader = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class PendingNavDataLoader extends React.Component<IProps, IState> {
    pendingAbortToken: string = null;

    state: IState = {
      isPreviousLocation: false,
    };

    renderRoute = () => {
      return renderRoutes(this.props.routes);
    };

    run = (promises: Promise<any>[], currentAbortToken: string) => {
      dispatch(showProgress());
      return Promise.all(promises)
        .catch(error => {
          if (_.isNull(error)) {
            return;
          }
          if (ConfigHelper.isDev()) {
            console.error(error);
          } else {
            logException(error);
          }
        })
        .then(() => {
          if (abortTokenPool[currentAbortToken]) {
            delete abortTokenPool[currentAbortToken];
          } else if (currentAbortToken === this.pendingAbortToken) {
            dispatch(hideProgress());
            this.pendingAbortToken = null;
            // clear previousLocation so the next screen renders
            this.setState({
              isPreviousLocation: false,
            });
          }
        });
    };

    getAllFetchData = (locationPathname: string) => {
      const { routes } = this.props;
      const branch = matchRoutes(routes, locationPathname);
      return branch.map(({ route }) => {
        const fetchData: Store.IFetchDataFn = _.get(route, 'component.fetchData', null);
        return _.isNull(fetchData) ? Promise.resolve() : fetchData(this.pendingAbortToken);
      });
    };

    componentWillReceiveProps(nextProps: IProps) {
      if (nextProps.router.location !== this.props.router.location) {
        if (_.isNull(this.pendingAbortToken)) {
          // save the location so we can render the old screen
          this.setState({
            isPreviousLocation: true,
          });
        } else {
          // some more changes for location
          abortTokenPool[this.pendingAbortToken] = true;
        }
        this.pendingAbortToken = nanoid();
        // load data while the old screen remains
        const promises = this.getAllFetchData(nextProps.router.location.pathname);
        this.run(promises, this.pendingAbortToken);
      }
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
      if (nextState.isPreviousLocation) {
        return false;
      }
      return true;
    }

    render() {
      const location = { ...this.props.router.location, state: {} };
      return <Route location={location} render={this.renderRoute} />;
    }
  },
);

export default WrappedPendingNavDataLoader;
