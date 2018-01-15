import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import uiStateMock from 'src/store/__mocks__/uiStore';
import productStateMock from 'src/store/__mocks__/productStore';
import catalogQueryStateMock from 'src/store/__mocks__/catalogQueryStore';
import categoriesMenuStateMock from 'src/store/__mocks__/categoriesMenuStore';
import { initialState as productInitialState } from 'src/ducks/product';
import { initialState as catalogQueryInitialState } from 'src/ducks/catalogQuery';
import { initialState as categoriesMenuInitialState } from 'src/ducks/categoriesMenu';
import Breadcrumbs from '../Breadcrumbs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(null, () => {
  it('render() with product initialiItems ', () => {
    const store = mockStore({ ui: uiStateMock, product: productInitialState });
    const wrapper = shallow(<Breadcrumbs for="product" />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with product items ', () => {
    const store = mockStore({ ui: uiStateMock, product: productStateMock });
    const wrapper = shallow(<Breadcrumbs for="product" />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with categories initialiItems ', () => {
    const store = mockStore({
      ui: uiStateMock,
      categoriesMenu: categoriesMenuInitialState,
      catalogQuery: catalogQueryInitialState,
    });
    const wrapper = shallow(<Breadcrumbs for="catalog" />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with categories', () => {
    const store = mockStore({
      ui: uiStateMock,
      categoriesMenu: categoriesMenuStateMock,
      catalogQuery: catalogQueryStateMock,
    });
    const wrapper = shallow(<Breadcrumbs for="catalog" />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
