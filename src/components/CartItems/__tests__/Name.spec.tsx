import React from 'react';
import { shallow } from 'enzyme';
import Name from '../Name';

describe(null, () => {
  it('render() correct', () => {
    const uid = 'dummy uid';
    const shortDescription = 'dummy shot discription';
    const name = 'dummy name';
    const wrapper = shallow(<Name uid={uid} shortDescription={shortDescription} name={name} />);
    expect(wrapper).toMatchSnapshot();
  });
});
