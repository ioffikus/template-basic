import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import routerStateMock from 'src/store/__mocks__/routerStore';
import uiStateMock from 'src/store/__mocks__/uiStore';
import { initialState as catalogQueryInitialStateMock } from 'src/ducks/catalogQuery';
import { initialState as filterInitialStateMock } from 'src/ducks/filter';
import { initialState as categoriesInitialStateMock } from 'src/ducks/categories';
import catalogQueryStateMock from 'src/store/__mocks__/catalogQueryStore';
import filterStateMock from 'src/store/__mocks__/filterStore';
import categoriesStateMock from 'src/store/__mocks__/categoriesStore';
import FilterMenu from '../FilterMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(null, () => {
  it('render() correctly with initialSates', () => {
    const state: Store.IState = {
      router: routerStateMock,
      ui: uiStateMock,
      catalogQuery: catalogQueryInitialStateMock,
      filter: filterInitialStateMock,
      categories: categoriesInitialStateMock,
    };
    const store = mockStore(() => state);
    const wrapper = shallow(<FilterMenu />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() correctly with state is difference from the initialSates', () => {
    const state: Store.IState = {
      router: routerStateMock,
      ui: uiStateMock,
      catalogQuery: catalogQueryStateMock,
      filter: filterStateMock,
      categories: categoriesStateMock,
    };
    const store = mockStore(() => state);
    const wrapper = shallow(<FilterMenu />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
