import React from 'react';
import { shallow } from 'enzyme';
import Frame from '../Frame';

describe(null, () => {
  it('render() correct', () => {
    const wrapper = shallow(<Frame />);
    expect(wrapper).toMatchSnapshot();
  });
});
