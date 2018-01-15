import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import meta, { setMeta, initialState } from 'src/ducks/meta';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  meta,
});

describe('actions', () => {
  it('setMeta', () => {
    const title = 'dummy title';
    const description = 'dummy description';
    const keywords = 'dummy keywords';
    const expectedActions = [{ type: 'META__SET_META', payload: { title, description, keywords } }];
    let state: Store.IState = {
      meta: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    store.dispatch(setMeta({ title, description, keywords }));
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(state.meta).toEqual({
      ...initialState,
      title,
      description,
      keywords,
    });
  });
});
