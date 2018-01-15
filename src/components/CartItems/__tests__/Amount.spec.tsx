import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { InputNumber, Spin } from 'antd';
import configureMockStore from 'redux-mock-store';
import _ from 'lodash';
import { setupDispatch } from 'src/store/dispatch';
import { increaseQuantity, decreaseQuantity } from 'src/ducks/cart';
import { pendingAPI } from '../__mocks__/consts';
import Amount from '../Amount';

let increaseQuantityCb: () => void;
let decreaseQuantityCb: () => void;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('src/ducks/cart', () => {
  const { pendingAPI } = require('../__mocks__/consts');
  return {
    increaseQuantity: jest.fn((_, cb) => {
      increaseQuantityCb = cb;
      return () =>
        new Promise(resolve => {
          setTimeout(() => {
            cb();
            resolve();
          }, pendingAPI);
        });
    }),
    decreaseQuantity: jest.fn((_, cb) => {
      decreaseQuantityCb = cb;
      return () =>
        new Promise(resolve => {
          setTimeout(() => {
            cb();
            resolve();
          }, pendingAPI);
        });
    }),
  };
});

describe(null, () => {
  it('render() with mayChangeAmountItems as true', () => {
    const mayChangeAmountItems = true;
    const uid = 'dummy';
    const count = 123;
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(<Amount mayChangeAmountItems={mayChangeAmountItems} uid={uid} count={count} />, {
      context: { store },
    });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with mayChangeAmountItems as false', () => {
    const mayChangeAmountItems = false;
    const uid = 'dummy';
    const count = 123;
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(<Amount mayChangeAmountItems={mayChangeAmountItems} uid={uid} count={count} />, {
      context: { store },
    });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('InputNumber.onChange() with increaseQuantity()', () => {
    const mayChangeAmountItems = true;
    const uid = 'dummy';
    const count = 1;
    const value = 2;
    expect(count).toBeLessThan(value);
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(<Amount mayChangeAmountItems={mayChangeAmountItems} uid={uid} count={count} />, {
      context: { store },
    });
    const dummyWrapper = wrapper.dive();
    const inputNumberInstance = dummyWrapper
      .find(InputNumber)
      .dive()
      .instance() as InputNumber;
    inputNumberInstance.props.onChange(value);
    expect(increaseQuantity).toBeCalledWith(uid, increaseQuantityCb);
  });
  it('InputNumber.onChange() with decreaseQuantity()', () => {
    const mayChangeAmountItems = true;
    const uid = 'dummy';
    const count = 2;
    const value = 2;
    expect(count).toBeGreaterThanOrEqual(value);
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(<Amount mayChangeAmountItems={mayChangeAmountItems} uid={uid} count={count} />, {
      context: { store },
    });
    const dummyWrapper = wrapper.dive();
    const inputNumberInstance = dummyWrapper
      .find(InputNumber)
      .dive()
      .instance() as InputNumber;
    inputNumberInstance.props.onChange(value);
    expect(decreaseQuantity).toBeCalledWith(uid, decreaseQuantityCb);
  });
  it('InputNumber.onChange() with pendingAPI < pendingShowSpinning (dont show Spin)', () => {
    jest.useFakeTimers();
    const pendingShowSpinning = pendingAPI + 200;
    const mayChangeAmountItems = true;
    const uid = 'dummy';
    const count = _.random(1, 2);
    const value = _.random(1, 2);
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(
      <Amount
        pendingShowSpinning={pendingShowSpinning}
        mayChangeAmountItems={mayChangeAmountItems}
        uid={uid}
        count={count}
      />,
      {
        context: { store },
      },
    );
    const dummyWrapper = wrapper.dive();
    const inputNumberInstance = dummyWrapper
      .find(InputNumber)
      .dive()
      .instance() as InputNumber;
    inputNumberInstance.props.onChange(value);
    jest.runTimersToTime(pendingShowSpinning + 100); // + 100 for timer overlap
    dummyWrapper.update();
    const spinInstanceWrapperBefore = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstanceWrapperBefore.props.spinning).toBeFalsy();
    jest.runTimersToTime(pendingAPI + 100); // + 100 for timer overlap
    dummyWrapper.update();
    const spinInstanceWrapperAfter = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstanceWrapperAfter.props.spinning).toBeFalsy();
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('InputNumber.onChange() without pendingAPI < pendingShowSpinning (show Spin)', () => {
    jest.useFakeTimers();
    const pendingShowSpinning = pendingAPI - 200;
    const mayChangeAmountItems = true;
    const uid = 'dummy';
    const count = _.random(1, 2);
    const value = _.random(1, 2);
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(
      <Amount
        pendingShowSpinning={pendingShowSpinning}
        mayChangeAmountItems={mayChangeAmountItems}
        uid={uid}
        count={count}
      />,
      {
        context: { store },
      },
    );
    const dummyWrapper = wrapper.dive();
    const inputNumberInstance = dummyWrapper
      .find(InputNumber)
      .dive()
      .instance() as InputNumber;
    inputNumberInstance.props.onChange(value);
    jest.runTimersToTime(pendingShowSpinning + 100); // + 100 for timer overlap
    dummyWrapper.update();
    const spinInstanceWrapperBefore = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstanceWrapperBefore.props.spinning).toBeTruthy();
    jest.runTimersToTime(pendingAPI + 100); // + 100 for timer overlap
    dummyWrapper.update();
    const spinInstanceWrapperAfter = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstanceWrapperAfter.props.spinning).toBeFalsy();
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('InputNumber.onChange() with double click before show Spin', () => {
    jest.useFakeTimers();
    const timerOverlapOne = -200;
    const timerOverlapTwo = -200;
    const timerOverlapThree = 100;
    const pendingShowSpinning = pendingAPI / 3;
    expect(pendingShowSpinning * 3 + timerOverlapTwo + timerOverlapTwo + timerOverlapThree).toBeLessThan(pendingAPI);
    const mayChangeAmountItems = true;
    const uid = 'dummy';
    const count = _.random(1, 2);
    const value = _.random(1, 2);
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(
      <Amount
        pendingShowSpinning={pendingShowSpinning}
        mayChangeAmountItems={mayChangeAmountItems}
        uid={uid}
        count={count}
      />,
      {
        context: { store },
      },
    );
    const dummyWrapper = wrapper.dive();
    const inputNumberInstance = dummyWrapper
      .find(InputNumber)
      .dive()
      .instance() as InputNumber;
    inputNumberInstance.props.onChange(value);
    jest.runTimersToTime(pendingShowSpinning + timerOverlapOne); // - 200 for timer overlap
    dummyWrapper.update();
    const spinInstanceWrapperBeforeOne = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstanceWrapperBeforeOne.props.spinning).toBeFalsy();
    inputNumberInstance.props.onChange(value);
    jest.runTimersToTime(pendingShowSpinning + timerOverlapTwo); // - 200 for timer overlap
    dummyWrapper.update();
    const spinInstanceWrapperBeforeTwo = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstanceWrapperBeforeTwo.props.spinning).toBeFalsy();
    inputNumberInstance.props.onChange(value);
    jest.runTimersToTime(pendingShowSpinning + timerOverlapThree); // + 100 for timer overlap
    dummyWrapper.update();
    const spinInstanceWrapperAfter = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstanceWrapperAfter.props.spinning).toBeTruthy();
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('componentWillUnmount() with two calls of clearTimeout()', () => {
    jest.useFakeTimers();
    const pendingShowSpinning = pendingAPI - 200;
    const mayChangeAmountItems = true;
    const uid = 'dummy';
    const count = _.random(1, 2);
    const value = _.random(1, 2);
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(
      <Amount
        pendingShowSpinning={pendingShowSpinning}
        mayChangeAmountItems={mayChangeAmountItems}
        uid={uid}
        count={count}
      />,
      {
        context: { store },
      },
    );
    const dummyWrapper = wrapper.dive();
    const inputNumberInstance = dummyWrapper
      .find(InputNumber)
      .dive()
      .instance() as InputNumber;
    inputNumberInstance.props.onChange(value);
    jest.runTimersToTime(pendingAPI + 100); // + 100 for timer overlap
    dummyWrapper.unmount();
    const clearTimeoutMock = _.get(window.clearTimeout, 'mock', null);
    expect(clearTimeoutMock.calls.length).toBe(2);
    jest.clearAllTimers();
    jest.useRealTimers();
  });
});
