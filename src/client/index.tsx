import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from 'src/store/configureStore';
import routes from 'src/routes';
import PendingNavDataLoader from 'src/components/PendingNavDataLoader';
import getBrowserHistory from 'src/store/getBrowserHistory';
import './theme.less';

const store = configureStore(window.REDUX_INITIAL_STATE);

const history = getBrowserHistory();

const AppRouter = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PendingNavDataLoader routes={routes} />
      </ConnectedRouter>
    </Provider>
  );
};

render(<AppRouter />, document.querySelector('#react-view'));
