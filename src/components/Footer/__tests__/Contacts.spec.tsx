import React from 'react';
import { shallow } from 'enzyme';
import ui from 'src/store/__mocks__/uiStore';
import Contacts from '../Contacts';

describe(null, () => {
  it('render() correctly', () => {
    const wrapper = shallow(<Contacts ui={ui} />);
    expect(wrapper).toMatchSnapshot();
  });
});
