import React from 'react';
import { shallow } from 'enzyme';
import CartProductImage from '../CartProductImage';

describe(null, () => {
  it('render() with image', () => {
    const pictureUrl = 'dummy picture url';
    const imageAlt = 'dummy image name';
    const wrapper = shallow(<CartProductImage pictureUrl={pictureUrl} imageAlt={imageAlt} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render() without image', () => {
    const pictureUrl = '';
    const wrapper = shallow(<CartProductImage pictureUrl={pictureUrl} />);
    expect(wrapper).toMatchSnapshot();
  });
});
