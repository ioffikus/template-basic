import axios from 'axios';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import user, { getUser, putUser, initialState } from 'src/ducks/user';
import userResponse from 'src/core/__mocks__/userResponse';
import EndpointsConfig from 'src/configs/endpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  user,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  let state: Store.IState;
  let store: MockStore<Store.IState>;
  beforeEach(() => {
    state = {
      user: {
        ...initialState,
      },
    };
    store = mockStore(() => state);
  });
  afterEach(() => {
    axiosMock.reset();
  });
  it('getUser success', () => {
    const expectedActions = [
      { type: 'USER__CALL_REQUEST' },
      {
        type: 'USER__CALL_SUCCESS',
        payload: userResponse,
      },
    ];
    axiosMock.onGet(EndpointsConfig.USER).reply(200, userResponse);
    return store.dispatch(getUser()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.user).toEqual({
        ...initialState,
        ...userResponse,
      });
    });
  });
  it('getUser failure', () => {
    const expectedActions = [{ type: 'USER__CALL_REQUEST' }, { type: 'USER__CALL_FAILURE' }];
    axiosMock.onGet(EndpointsConfig.USER).reply(500);
    return store.dispatch(getUser()).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.user).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
  it('putUser success', () => {
    const userResponseNew = { ...userResponse, email: 'test@gmail.com' };
    const expectedActions = [
      { type: 'USER__CALL_REQUEST' },
      {
        type: 'USER__CALL_SUCCESS',
        payload: userResponseNew,
      },
    ];
    state = {
      user: {
        ...initialState,
        ...userResponse,
      },
    };
    axiosMock.onPut(EndpointsConfig.USER).reply(200, userResponseNew);
    const cb = jest.fn();
    return store.dispatch(putUser(userResponseNew, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.user).toEqual({
        ...initialState,
        ...userResponseNew,
      });
    });
  });
  it('putUser failure', () => {
    const userResponseNew = { ...userResponse, email: 'test@gmail.com' };
    const expectedActions = [{ type: 'USER__CALL_REQUEST' }, { type: 'USER__CALL_FAILURE' }];
    state = {
      user: {
        ...initialState,
        ...userResponse,
      },
    };
    axiosMock.onPut(EndpointsConfig.USER).reply(500);
    const cb = jest.fn();
    return store.dispatch(putUser(userResponseNew, cb)).catch(() => {
      expect(cb).not.toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.user).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
