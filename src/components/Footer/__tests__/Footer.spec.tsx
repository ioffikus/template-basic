import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import uiStateMock from 'src/store/__mocks__/uiStore';
import Footer from '../Footer';

const mockStore = configureMockStore([thunk]);

describe(null, () => {
  it('render() correctly', () => {
    const store = mockStore({ ui: uiStateMock });
    const wrapper = shallow(<Footer />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
