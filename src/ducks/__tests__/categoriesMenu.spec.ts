import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import categoriesMenu, { getCategoriesMenu, initialState } from 'src/ducks/categoriesMenu';
import categoriesMenuResponse from 'src/core/__mocks__/categoriesMenuResponse';
import EndpointsConfig from 'src/configs/endpoints';
import nanoid from 'nanoid';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  categoriesMenu,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  const abortToken = nanoid();
  afterEach(() => {
    axiosMock.reset();
  });
  it('getCategoriesMenu success', () => {
    const expectedActions = [
      { type: 'CATEGORIES_MENU__CALL_REQUEST' },
      {
        type: 'CATEGORIES_MENU__CALL_SUCCESS',
        payload: categoriesMenuResponse,
      },
    ];
    let state: Store.IState = {
      categoriesMenu: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CATEGORIES_MENU).reply(200, categoriesMenuResponse);
    return store.dispatch(getCategoriesMenu(abortToken)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.categoriesMenu).toEqual({
        ...initialState,
        ...categoriesMenuResponse,
      });
    });
  });
  it('getCategoriesMenu failure', () => {
    const expectedActions = [{ type: 'CATEGORIES_MENU__CALL_REQUEST' }, { type: 'CATEGORIES_MENU__CALL_FAILURE' }];
    let state: Store.IState = {
      categoriesMenu: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CATEGORIES_MENU).reply(500);
    return store.dispatch(getCategoriesMenu(abortToken)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.categoriesMenu).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
