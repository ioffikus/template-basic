import configureMockStore, { MockStore } from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userDelivery, { set, reset, initialState } from 'src/ducks/userDelivery';
import userDeliveryResponse from 'src/core/__mocks__/userDeliveryResponse';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  userDelivery,
});

describe('actions', () => {
  let state: Store.IState;
  let store: MockStore<Store.IState>;
  beforeEach(() => {
    state = {
      userDelivery: {
        ...initialState,
      },
    };
    store = mockStore(() => state);
  });
  it('set', () => {
    const expectedActions = [{ type: 'USER_DELIVERY__SET', payload: userDeliveryResponse }];
    store.dispatch(set(userDeliveryResponse));
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(state.userDelivery).toEqual({
      ...userDeliveryResponse,
    });
  });
  it('reset', () => {
    const expectedActions = [{ type: 'USER_DELIVERY__RESET' }];
    state = {
      userDelivery: {
        ...userDeliveryResponse,
      },
    };
    store.dispatch(reset());
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(state.userDelivery).toEqual({
      ...initialState,
    });
  });
});
