import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { setupDispatch } from 'src/store/dispatch';
import configureMockStore from 'redux-mock-store';
import DevTools from '../DevTools';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(null, () => {
  it('render() correct', () => {
    const store = mockStore({});
    setupDispatch({ store });
    const wrapper = shallow(
      <Provider store={store}>
        <DevTools />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
