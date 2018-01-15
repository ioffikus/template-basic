import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import moment from 'moment-timezone';
import { Spin, Button } from 'antd';
import { setupDispatch } from 'src/store/dispatch';
import uiStateMock from 'src/store/__mocks__/uiStore';
import localeStateMock from 'src/store/__mocks__/localeStore';
import userOrdersStateMock, { initialState as userOrdersInitialState } from 'src/store/__mocks__/userOrdersStore';
import { getUserOrders } from 'src/ducks/userOrders';
import UserOrders from '../UserOrders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('src/ducks/userOrders', () => {
  return {
    getUserOrders: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  beforeEach(() => {
    moment.tz.setDefault('Europe/Moscow');
  });
  afterEach(() => {
    moment.tz.setDefault(null);
  });
  it('render() with props.items', () => {
    const store = mockStore({
      ui: uiStateMock,
      locale: localeStateMock,
      userOrders: userOrdersStateMock,
    });
    setupDispatch({ store });
    const wrapper = shallow(<UserOrders />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() without props.items', () => {
    const store = mockStore({
      ui: uiStateMock,
      locale: localeStateMock,
      userOrders: userOrdersInitialState,
    });
    setupDispatch({ store });
    const wrapper = shallow(<UserOrders />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('componentDidMount()', () => {
    const page = '1';
    const store = mockStore({
      ui: uiStateMock,
      locale: localeStateMock,
      userOrders: userOrdersStateMock,
    });
    setupDispatch({ store });
    expect(getUserOrders).toBeCalledWith(page);
  });
  it('Show Spin', () => {
    const store = mockStore({
      ui: uiStateMock,
      locale: localeStateMock,
      userOrders: { ...userOrdersStateMock, isRequesting: true },
    });
    setupDispatch({ store });
    const wrapper = shallow(<UserOrders />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const spinWrapper = dummyWrapper.find(Spin);
    const spinInspance = spinWrapper.dive().instance() as Spin;
    expect(spinWrapper).toHaveLength(1);
    expect(spinInspance.props.spinning).toBeTruthy();
  });
  it('Has "Show more" button ', () => {
    const store = mockStore({
      ui: uiStateMock,
      locale: localeStateMock,
      userOrders: { ...userOrdersStateMock, next: 'dummy' },
    });
    setupDispatch({ store });
    const wrapper = shallow(<UserOrders />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const buttonWrapper = dummyWrapper.find(Button);
    expect(buttonWrapper).toHaveLength(1);
  });
  it('Click on the "Show more" button ', () => {
    jest.useFakeTimers();
    const page = '2';
    const store = mockStore({
      ui: uiStateMock,
      locale: localeStateMock,
      userOrders: { ...userOrdersStateMock, next: 'dummy' },
    });
    setupDispatch({ store });
    const wrapper = shallow(<UserOrders />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const buttonWrapper = dummyWrapper.find(Button);
    const buttonInstance = buttonWrapper.dive().instance() as Button;
    buttonInstance.props.onClick(null);
    jest.runAllTimers();
    expect(getUserOrders).toBeCalledWith(page);
    jest.clearAllTimers();
    jest.useRealTimers();
  });
});
