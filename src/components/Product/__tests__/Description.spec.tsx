import React from 'react';
import { shallow } from 'enzyme';
import { Button, Modal } from 'antd';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setupDispatch } from 'src/store/dispatch';
import { addToCart } from 'src/ducks/cart';
import uiStateMock from 'src/store/__mocks__/uiStore';
import productStore from 'src/store/__mocks__/productStore';
import Description from '../Description';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('src/ducks/cart', () => {
  return {
    addToCart: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});
jest.mock('connected-react-router', () => {
  return {
    push: jest.fn(() => {
      return { type: 'dummy' };
    }),
  };
});

describe(null, () => {
  const state: Store.IState = { ui: uiStateMock, product: productStore };
  const store = mockStore(() => state);
  setupDispatch({ store });
  it('handleAddToCart()', () => {
    const wrapper = shallow(<Description />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const buttonInstance = dummyWrapper
      .find(Button)
      .dive()
      .instance() as Button;
    buttonInstance.props.onClick(null);
    expect(addToCart).toBeCalled();
    dummyWrapper.setState({ isVisibleCartModal: true });
    dummyWrapper.update();
    const modalInstance = dummyWrapper
      .find(Modal)
      .dive()
      .instance() as Modal;
    expect(modalInstance.props.visible).toBeTruthy();
  });
  it('handleCartModalCancel()', () => {
    const wrapper = shallow(<Description />, { context: { store } });
    const dummyWrapper = wrapper.dive() as any;
    dummyWrapper.setState({ isVisibleCartModal: true });
    dummyWrapper.update();
    const modalInstanceBeforeUpdate = dummyWrapper
      .find(Modal)
      .dive()
      .instance() as Modal;
    modalInstanceBeforeUpdate.props.onCancel(null);
    dummyWrapper.update();
    const modalInstanceAfterUpdate = dummyWrapper
      .find(Modal)
      .dive()
      .instance() as Modal;
    expect(modalInstanceAfterUpdate.props.visible).toBeFalsy();
  });
});
