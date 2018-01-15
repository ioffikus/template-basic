import { connectRouter, routerMiddleware } from 'connected-react-router';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterProps } from 'react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { types } from 'redux-act';
import H from 'history';
import _ from 'lodash';
import DevTools from 'src/components/DevTools';
import ConfigHelper from 'src/helpers/configHelper';
import rootReducer from 'src/ducks';
import { IXShopHeaders } from 'src/core/interfaces/IXShopHeaders';
import getBrowserHistory from 'src/store/getBrowserHistory';
import { setupDispatch } from 'src/store/dispatch';

interface IConfigureStore {
  (initialState: Store.IState, SSRParams?: { location: string; xShopHeaders: IXShopHeaders }): Store<Store.IState>;
}

const configureStore: IConfigureStore = (initialState = {}, SSRParams) => {
  let history: H.History;
  let middlewares;

  if (process.env.BROWSER) {
    history = getBrowserHistory();
    middlewares = [routerMiddleware(history)];
    middlewares.push(thunk);
  } else {
    const staticRouter: React.Component<StaticRouterProps> = new StaticRouter();
    const location = _.get(SSRParams, 'location', '');
    staticRouter.props = { location, context: {}, basename: '' };
    history = _.get(staticRouter.render(), 'props.history');
    middlewares = [routerMiddleware(history)];
    const xShopHeaders = _.get(SSRParams, 'xShopHeaders');
    middlewares.push(thunk.withExtraArgument(xShopHeaders));
  }

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    ConfigHelper.isDev() && process.env.BROWSER
      ? compose(applyMiddleware(...middlewares), DevTools.instrument())
      : compose(applyMiddleware(...middlewares)),
  );

  if (ConfigHelper.isDev() && module.hot) {
    module.hot.accept('src/ducks', () => {
      types.clear();
      const nextRootReducer = require('src/ducks/index').default;
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }

  setupDispatch({ store });

  return store;
};

export default configureStore;
