import { Store } from 'redux';
import _ from 'lodash';
import { showError } from 'src/store/common';

let store: Store<Store.IState>;

export const setupDispatch = (config: { store: Store<Store.IState> }) => {
  store = config.store;
};

const dispatch = (action: any) => {
  if (_.isFunction(action)) {
    return store.dispatch(action).catch((error: any) => {
      if (!_.isNull(error)) {
        showError(error);
      }
      return Promise.reject(error);
    });
  }
  return store.dispatch(action);
};

export default dispatch;
