import React from 'react';
import { shallow } from 'enzyme';
import { ui } from 'src/store/__mocks__/uiStore';
import List from '../List';

describe(null, () => {
  it('render() correctly', () => {
    const wrapper = shallow(<List ui={ui} />);
    expect(wrapper).toMatchSnapshot();
  });
});
