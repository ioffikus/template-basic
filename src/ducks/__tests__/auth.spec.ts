import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import auth, { getAuthLink, initialState, loginUser, logoutUser } from 'src/ducks/auth';
import EndpointsConfig from 'src/configs/endpoints';
import authResponse from 'src/core/__mocks__/authResponse';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  auth,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  const username = authResponse.data.username;
  const password = authResponse.data.password;
  afterEach(() => {
    axiosMock.reset();
  });
  it('getAuthLink success', () => {
    const expectedActions = [
      { type: 'AUTH__AUTH_LINK_REQUEST' },
      {
        type: 'AUTH__AUTH_LINK_SUCCESS',
        payload: { url: authResponse.url, data: authResponse.data },
      },
    ];
    let state: Store.IState = {
      auth: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.AUTH.AUTH_LINK).reply(200, authResponse);
    return store.dispatch(getAuthLink()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.auth).toEqual({
        ...initialState,
        url: authResponse.url,
        data: authResponse.data,
      });
    });
  });
  it('getAuthLink failure', () => {
    const expectedActions = [{ type: 'AUTH__AUTH_LINK_REQUEST' }, { type: 'AUTH__AUTH_LINK_FAILURE' }];
    let state: Store.IState = {
      auth: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.AUTH.AUTH_LINK).reply(500);
    return store.dispatch(getAuthLink()).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.auth).toEqual({
        ...initialState,
      });
    });
  });
  it('loginUser success', () => {
    const expectedActions = [
      { type: 'AUTH__LOGIN_USER_REQUEST' },
      { type: 'AUTH__LOGIN_USER_SUCCESS' },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/'] },
      },
    ];
    let state: Store.IState = {
      auth: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onPost(EndpointsConfig.AUTH.LOGIN).reply(200);
    return store.dispatch(loginUser(username, password)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.auth).toEqual({
        ...initialState,
        isAuthenticated: true,
      });
    });
  });
  it('loginUser failure', () => {
    const expectedActions = [{ type: 'AUTH__LOGIN_USER_REQUEST' }, { type: 'AUTH__LOGIN_USER_FAILURE' }];
    let state: Store.IState = {
      auth: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onPost(EndpointsConfig.AUTH.LOGOUT).reply(500);
    return store.dispatch(loginUser(username, password)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.auth).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
  it('logoutUser success', () => {
    const expectedActions = [
      { type: 'AUTH__LOGIN_USER_REQUEST' },
      { type: 'AUTH__LOGIN_USER_SUCCESS' },
      { type: 'AUTH__RESET' },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/'] },
      },
    ];
    let state: Store.IState = {
      auth: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.AUTH.LOGOUT).reply(200);
    const cb = jest.fn();
    return store.dispatch(logoutUser(cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.auth).toEqual({
        ...initialState,
      });
    });
  });
  it('logoutUser failure', () => {
    const expectedActions = [{ type: 'AUTH__LOGIN_USER_REQUEST' }, { type: 'AUTH__LOGIN_USER_FAILURE' }];
    let state: Store.IState = {
      auth: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.AUTH.LOGOUT).reply(500);
    const cb = jest.fn();
    return store.dispatch(logoutUser(cb)).catch(() => {
      expect(cb).not.toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.auth).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
