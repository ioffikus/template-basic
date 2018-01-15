import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { setupDispatch } from 'src/store/dispatch';
import { loginUser } from 'src/ducks/auth';
import uiStateMock from 'src/store/__mocks__/uiStore';
import authStateMock from 'src/store/__mocks__/authStore';
import Login from '../Login';
import MainForm from '../MainForm';

const mockStore = configureMockStore([thunk]);

jest.mock('src/ducks/auth', () => {
  return {
    getAuthLink: jest.fn(() => {
      return () => Promise.resolve();
    }),
    loginUser: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});
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
  it('render() correctly witch auth and not development environment', () => {
    const state = { ui: uiStateMock, auth: authStateMock };
    const store = mockStore(state);
    setupDispatch({ store });
    const wrapper = shallow(<Login />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() correctly development environment', () => {
    process.env.NODE_ENV_FAKE = 'development';
    const state = { ui: uiStateMock, auth: authStateMock };
    const store = mockStore(state);
    setupDispatch({ store });
    const wrapper = shallow(<Login />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
    delete process.env.NODE_ENV_FAKE;
  });
  it('Form.onSubmit() with development environment', () => {
    process.env.NODE_ENV_FAKE = 'development';
    const data = {
      username: 'username',
      password: 'password',
    };
    const state = { ui: uiStateMock, auth: authStateMock };
    const store = mockStore(state);
    setupDispatch({ store });
    const wrapper = shallow(<Login />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const formInstance = dummyWrapper
      .find(MainForm)
      .dive()
      .instance() as any;
    formInstance.props.onSubmit(data);
    expect(loginUser).toBeCalledWith(data.username, data.password);
    delete process.env.NODE_ENV_FAKE;
  });
});
