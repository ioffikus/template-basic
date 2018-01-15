import React from 'react';
import { shallow } from 'enzyme';
import Catalog from '../Catalog';

describe(null, () => {
  it('render()', () => {
    const wrapper = shallow(<Catalog />);
    expect(wrapper).toMatchSnapshot();
  });
});
