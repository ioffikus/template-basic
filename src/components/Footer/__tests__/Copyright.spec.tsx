import React from 'react';
import { shallow } from 'enzyme';
import { ui } from 'src/store/__mocks__/uiStore';
import Copyright from '../Copyright';

describe(null, () => {
  it('render() correctly', () => {
    const wrapper = shallow(<Copyright ui={ui} />);
    expect(wrapper).toMatchSnapshot();
  });
});
