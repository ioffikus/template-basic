import React from 'react';
import { shallow } from 'enzyme';
import uiStateMock from 'src/store/__mocks__/uiStore';
import userOrdersStateMock from 'src/store/__mocks__/userOrdersStore';
import CartItems from '../CartItems';

describe(null, () => {
  it('render() with items', () => {
    const items = userOrdersStateMock.results[0].cart.items;
    const wrapper = shallow(<CartItems ui={uiStateMock} items={items} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render() without items', () => {
    const items: Alicanto.Models.CatalogItem[] = [];
    const wrapper = shallow(<CartItems ui={uiStateMock} items={items} />);
    expect(wrapper).toMatchSnapshot();
  });
});
