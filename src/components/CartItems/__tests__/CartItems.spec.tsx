import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import uiStateMock from 'src/store/__mocks__/uiStore';
import cartStateMock from 'src/store/__mocks__/cartStore';
import { initialState as cartInitialState } from 'src/ducks/cart';
import CartItems from '../CartItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(null, () => {
  it('render() with items', () => {
    const store = mockStore({ ui: uiStateMock, cart: cartStateMock });
    const wrapper = shallow(<CartItems />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() without items', () => {
    const store = mockStore({ ui: uiStateMock, cart: cartInitialState });
    const wrapper = shallow(<CartItems />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
