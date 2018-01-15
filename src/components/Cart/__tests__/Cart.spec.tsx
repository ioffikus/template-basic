import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { Button } from 'antd';
import configureMockStore from 'redux-mock-store';
import { setupDispatch } from 'src/store/dispatch';
import { checkoutUserOrder } from 'src/ducks/userOrders';
import uiStateMock from 'src/store/__mocks__/uiStore';
import cartStateMock from 'src/store/__mocks__/cartStore';
import { initialState as cartInitialState } from 'src/ducks/cart';
import Cart from '../Cart';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('src/ducks/userOrders', () => {
  return {
    checkoutUserOrder: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  it('render() with empty items', () => {
    const store = mockStore({ ui: uiStateMock, cart: cartInitialState });
    const wrapper = shallow(<Cart />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with items', () => {
    const store = mockStore({ ui: uiStateMock, cart: cartStateMock });
    const wrapper = shallow(<Cart />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('Button.onClick() to Button', () => {
    const store = mockStore({ ui: uiStateMock, cart: cartStateMock });
    setupDispatch({ store });
    const wrapper = shallow(<Cart />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const buttonInstance = dummyWrapper
      .find(Button)
      .dive()
      .instance() as Button;
    buttonInstance.props.onClick(null);
    expect(checkoutUserOrder).toBeCalled();
  });
});
