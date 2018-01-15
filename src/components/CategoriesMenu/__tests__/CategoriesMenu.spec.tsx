import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { setupDispatch } from 'src/store/dispatch';
import uiStateMock from 'src/store/__mocks__/uiStore';
import categoriesMenuStateMock from 'src/store/__mocks__/categoriesMenuStore';
import catalogQueryStateMock from 'src/store/__mocks__/catalogQueryStore';
import CategoriesMenu from '../CategoriesMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(null, () => {
  it('render() correct', () => {
    const store = mockStore({
      ui: uiStateMock,
      categoriesMenu: categoriesMenuStateMock,
      catalogQuery: catalogQueryStateMock,
    });
    setupDispatch({ store });
    const wrapper = shallow(<CategoriesMenu />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
