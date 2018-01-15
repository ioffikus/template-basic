import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Spin } from 'antd';
import routes from 'src/routes';
import { initialState as metaInitialState } from 'src/ducks/meta';
import AppLayout from '../AppLayout';
import { Frame as DevToolsFrame } from 'src/components/DevTools';

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

describe(null, () => {
  it('render()', () => {
    const store = mockStore({ progress: { isLoading: false }, meta: metaInitialState });
    const route = routes[1];
    const wrapper = shallow(<AppLayout route={route} />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with NODE_ENV=development', () => {
    process.env.NODE_ENV_FAKE = 'development';
    const store = mockStore({ progress: { isLoading: false }, meta: metaInitialState });
    const route = routes[1];
    const wrapper = shallow(<AppLayout route={route} />, { context: { store } });
    const devToolsFrame = wrapper.dive().find(DevToolsFrame);
    expect(devToolsFrame).toHaveLength(1);
    delete process.env.NODE_ENV_FAKE;
  });
  it('show spin', () => {
    const store = mockStore({ progress: { isLoading: true }, meta: metaInitialState });
    const route = routes[1];
    const wrapper = shallow(<AppLayout route={route} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const spinInstance = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstance.props.spinning).toBeTruthy();
  });
  it('hide spin', () => {
    const store = mockStore({ progress: { isLoading: false }, meta: metaInitialState });
    const route = routes[1];
    const wrapper = shallow(<AppLayout route={route} />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const spinInstance = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstance.props.spinning).toBeFalsy();
  });
});
