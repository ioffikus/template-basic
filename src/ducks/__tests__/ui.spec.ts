import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import ui, { initialState, setUI } from 'src/ducks/ui';
import { ui as uiMock } from 'src/store/__mocks__/uiStore';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  ui,
});

describe('actions', () => {
  it('setUI', () => {
    const expectedActions = [{ type: 'UI__SET_SUCCESS', payload: uiMock }];
    let state: Store.IState = {
      ui: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    store.dispatch(setUI(uiMock));
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(state.ui).toEqual({
      ...initialState,
      ...uiMock,
    });
  });
});
