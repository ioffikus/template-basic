import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import locale, { setLocale, setAvailableLocales, initialState } from 'src/ducks/locale';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  locale,
});

describe('actions', () => {
  it('setAvailableLocales', () => {
    const availables = ['en-US', 'ru-RU'];
    const expectedActions = [{ type: 'LOCALE__SET_AVAILABLES', payload: availables }];
    let state: Store.IState = {
      locale: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    store.dispatch(setAvailableLocales(availables));
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(state.locale).toEqual({
      ...initialState,
      availables,
    });
  });
  it('setLocale', () => {
    const current = 'en-US';
    const expectedActions = [{ type: 'LOCALE__SET_LOCALE', payload: current }];
    let state: Store.IState = {
      locale: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    store.dispatch(setLocale(current));
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(state.locale).toEqual({
      ...initialState,
      current,
    });
    // TODO ch1886
    // expect(window.document.cookie).toEqual(`locale=${current}`);
  });
});
