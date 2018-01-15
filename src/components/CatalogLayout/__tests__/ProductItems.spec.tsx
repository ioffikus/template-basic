import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { setupDispatch } from 'src/store/dispatch';
import uiStateMock from 'src/store/__mocks__/uiStore';
import routerStateMock from 'src/store/__mocks__/routerStore';
import catalogStateMock from 'src/store/__mocks__/catalogStore';
import ProductItems from '../ProductItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(null, () => {
  it('render() correct', () => {
    const store = mockStore({ ui: uiStateMock, router: routerStateMock, catalog: catalogStateMock });
    setupDispatch({ store });
    const wrapper = shallow(<ProductItems />, { context: { store } });
    expect(wrapper).toMatchSnapshot();
  });
});
