import axios from 'axios';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import page, { getPageData, initialState } from 'src/ducks/page';
import pageResponse from 'src/core/__mocks__/pageResponse';
import EndpointsConfig from 'src/configs/endpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  page,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  let state: Store.IState;
  let store: MockStore<Store.IState>;
  const params = { slug: 'user' };
  beforeEach(() => {
    state = {
      page: {
        ...initialState,
      },
    };
    store = mockStore(() => state);
  });
  afterEach(() => {
    axiosMock.reset();
  });
  it('getPageData success', () => {
    const expectedActions = [
      { type: 'PAGE__CALL_REQUEST' },
      {
        type: 'PAGE__CALL_SUCCESS',
        payload: pageResponse,
      },
    ];
    axiosMock.onGet(`${EndpointsConfig.PAGES}${params.slug}`).reply(200, pageResponse);
    return store.dispatch(getPageData(params)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.page).toEqual({
        ...initialState,
        ...pageResponse,
      });
    });
  });
  it('getPageData failure', () => {
    const expectedActions = [{ type: 'PAGE__CALL_REQUEST' }, { type: 'PAGE__CALL_FAILURE' }];
    axiosMock.onGet(`${EndpointsConfig.PAGES}${params.slug}`).reply(500);
    return store.dispatch(getPageData(params)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.page).toEqual({
        ...initialState,
        isRequestError: true,
        isRequesting: true,
      });
    });
  });
});
