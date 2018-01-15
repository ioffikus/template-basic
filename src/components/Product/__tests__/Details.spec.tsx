import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Tabs } from 'antd';
import uiStore from 'src/store/__mocks__/uiStore';
import productStore from 'src/store/__mocks__/productStore';
import { initialState as productInitialState } from 'src/ducks/product';
import Details from '../Details';

const mockStore = configureMockStore([thunk]);

describe(null, () => {
  it('render() with initialState', () => {
    const store = mockStore({
      ui: uiStore,
      product: productInitialState,
    });
    const wrapper = shallow(<Details />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('render() with product', () => {
    const store = mockStore({
      ui: uiStore,
      product: productStore,
    });
    const wrapper = shallow(<Details />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('change active tab', () => {
    const store = mockStore({
      ui: uiStore,
      product: productStore,
    });
    const wrapper = shallow(<Details />, { context: { store } }).dive();
    expect(wrapper).toMatchSnapshot();
    const tabsInstance = wrapper
      .find(Tabs)
      .dive()
      .instance() as Tabs;
    tabsInstance.props.onChange('modifications');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
