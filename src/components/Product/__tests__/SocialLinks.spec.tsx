import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import uiStore from 'src/store/__mocks__/uiStore';
import SocialLinks from '../SocialLinks';

const mockStore = configureMockStore([thunk]);

describe(null, () => {
  it('render() correctly', () => {
    const store = mockStore({
      ui: uiStore,
    });
    const wrapper = shallow(<SocialLinks />, { context: { store } }).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
