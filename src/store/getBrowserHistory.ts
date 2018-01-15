import H, { createBrowserHistory } from 'history';
import _ from 'lodash';

let history: H.History = null;

const getBrowserHistory = () => {
  if (_.isNull(history)) {
    history = createBrowserHistory();
  }
  return history;
};

export default getBrowserHistory;
