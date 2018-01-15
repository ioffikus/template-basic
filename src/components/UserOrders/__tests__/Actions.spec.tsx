import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Button } from 'antd';
import { setupDispatch } from 'src/store/dispatch';
import uiStateMock from 'src/store/__mocks__/uiStore';
import userOrdersStateMock, { initialState as userOrdersInitialState } from 'src/store/__mocks__/userOrdersStore';
import { payAnOrder } from 'src/ducks/userOrders';
import Actions from '../Actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('src/ducks/userOrders', () => {
  return {
    payAnOrder: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  it('render() with isPaid as true', () => {
    const isPaid = true;
    const id = 123;
    const store = mockStore({
      ui: uiStateMock,
      userOrders: userOrdersStateMock,
    });
    const wrapper = shallow(<Actions isPaid={isPaid} id={id} />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with isPaid as false', () => {
    const isPaid = false;
    const id = 123;
    const store = mockStore({
      ui: uiStateMock,
      userOrders: userOrdersInitialState,
    });
    const wrapper = shallow(<Actions isPaid={isPaid} id={id} />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('Button.onClick()', () => {
    const isPaid = false;
    const id = 123;
    const store = mockStore({
      ui: uiStateMock,
      userOrders: userOrdersStateMock,
    });
    setupDispatch({ store });
    const wrapper = shallow(<Actions isPaid={isPaid} id={id} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const buttonInstance = dummyWrapper
      .find(Button)
      .dive()
      .instance() as Button;
    buttonInstance.props.onClick(null);
    expect(payAnOrder).toBeCalledWith(id);
  });
  it('Button.loading', () => {
    const isPaid = false;
    const id = 123;
    const currentPaymentId = id;
    const store = mockStore({
      ui: uiStateMock,
      userOrders: { ...userOrdersStateMock, currentPaymentId },
    });
    setupDispatch({ store });
    const wrapper = shallow(<Actions isPaid={isPaid} id={id} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const buttonInstance = dummyWrapper
      .find(Button)
      .dive()
      .instance() as Button;
    expect(buttonInstance.props.loading).toBeTruthy();
  });
});
