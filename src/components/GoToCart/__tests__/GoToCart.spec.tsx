import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'antd';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { push } from 'connected-react-router';
import { setupDispatch } from 'src/store/dispatch';
import uiStateMock from 'src/store/__mocks__/uiStore';
import GoToCart from '../GoToCart';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('connected-react-router', () => {
  return {
    push: jest.fn(() => {
      return { type: 'dummy' };
    }),
  };
});

describe(null, () => {
  it('Button.onClick()', () => {
    const state: Store.IState = { ui: uiStateMock };
    const store = mockStore(() => state);
    setupDispatch({ store });
    const wrapper = shallow(<GoToCart>{'dummy'}</GoToCart>, { context: { store } });
    const instance = wrapper
      .find(Button)
      .dive()
      .instance() as any;
    instance.props.onClick();
    expect(push).toBeCalled();
  });
});
