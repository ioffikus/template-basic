import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import nanoid from 'nanoid';
import routes from 'src/routes';
import { abortTokenPool } from 'src/core/API';
import { setupDispatch } from 'src/store/dispatch';
import { initialState as progressInitialState, showProgress, hideProgress } from 'src/ducks/progress';
import routerStateMock from 'src/store/__mocks__/routerStore';
import PendingNavDataLoader from '../PendingNavDataLoader';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('src/helpers/configHelper', () => {
  return {
    isDev: jest.fn(() => {
      return process.env.NODE_ENV_FAKE === 'development';
    }),
    getEnvConstants: jest.fn(() => {
      return {};
    }),
    getEnv: jest.fn(() => {
      return process.env.NODE_ENV_FAKE;
    }),
  };
});
jest.mock('src/ducks/progress', () => {
  return {
    showProgress: jest.fn(() => {
      return () => Promise.resolve();
    }),
    hideProgress: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  process.env.NODE_ENV_FAKE = 'development';
  it('render()', () => {
    const store = mockStore({ router: routerStateMock, progress: progressInitialState });
    setupDispatch({ store });
    const wrapper = shallow(<PendingNavDataLoader routes={routes} />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('shouldComponentUpdate() with (& without) isPreviousLocation', () => {
    const store = mockStore({ router: routerStateMock, progress: progressInitialState });
    setupDispatch({ store });
    const wrapper = shallow(<PendingNavDataLoader routes={routes} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const dummyInstance = dummyWrapper.instance();
    expect(dummyInstance.shouldComponentUpdate({}, { isPreviousLocation: true }, {})).toBeFalsy();
    expect(dummyInstance.shouldComponentUpdate({}, { isPreviousLocation: false }, {})).toBeTruthy();
  });
  it('getAllFetchData() must return at least one promise in array', () => {
    const store = mockStore({ router: routerStateMock, progress: progressInitialState });
    setupDispatch({ store });
    const wrapper = shallow(<PendingNavDataLoader routes={routes} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const dummyInstance = dummyWrapper.instance() as any;
    dummyInstance.pendingAbortToken = nanoid();
    const promises = dummyInstance.getAllFetchData('/');
    expect(promises[0]).toEqual(Promise.resolve(promises[0]));
  });
  it('run() when currentAbortToken in abortTokenPool', () => {
    const store = mockStore({ router: routerStateMock, progress: progressInitialState });
    setupDispatch({ store });
    const wrapper = shallow(<PendingNavDataLoader routes={routes} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const dummyInstance = dummyWrapper.instance() as any;
    const promisesMock = [Promise.resolve()];
    const currentAbortToken = nanoid();
    abortTokenPool[currentAbortToken] = true;
    return dummyInstance.run(promisesMock, currentAbortToken).then(() => {
      expect(showProgress).toBeCalled();
      expect(abortTokenPool[currentAbortToken]).toBeUndefined();
    });
  });
  it('run() when currentAbortToken == pendingAbortToken', () => {
    const store = mockStore({ router: routerStateMock, progress: progressInitialState });
    setupDispatch({ store });
    const wrapper = shallow(<PendingNavDataLoader routes={routes} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const dummyInstance = dummyWrapper.instance() as any;
    dummyInstance.setState({ isPreviousLocation: true });
    const promisesMock = [Promise.resolve()];
    const currentAbortToken = nanoid();
    dummyInstance.pendingAbortToken = currentAbortToken;
    return dummyInstance.run(promisesMock, currentAbortToken).then(() => {
      expect(showProgress).toBeCalled();
      expect(hideProgress).toBeCalled();
      expect(dummyInstance.pendingAbortToken).toBeNull();
      expect(dummyInstance.state).toEqual({ isPreviousLocation: false });
    });
  });
  it('change location with pendingAbortToken', () => {
    const store = mockStore({ router: routerStateMock, progress: progressInitialState });
    setupDispatch({ store });
    const wrapper = shallow(<PendingNavDataLoader routes={routes} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const dummyInstance = dummyWrapper.instance() as any;
    const pendingAbortToken = nanoid();
    dummyInstance.pendingAbortToken = pendingAbortToken;
    dummyWrapper.setProps({ router: { ...routerStateMock, location: { pathname: '/404' } } });
    expect(abortTokenPool[pendingAbortToken]).toBeTruthy();
    delete abortTokenPool[pendingAbortToken];
  });
  it('change location without pendingAbortToken', () => {
    const store = mockStore({ router: routerStateMock, progress: progressInitialState });
    setupDispatch({ store });
    const wrapper = shallow(<PendingNavDataLoader routes={routes} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const dummyInstance = dummyWrapper.instance();
    dummyWrapper.setProps({ router: { ...routerStateMock, location: { pathname: '/404' } } });
    expect(dummyInstance.state).toEqual({ isPreviousLocation: true });
  });
  delete process.env.NODE_ENV_FAKE;
});
