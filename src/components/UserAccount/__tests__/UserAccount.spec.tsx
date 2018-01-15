import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { ui } from 'src/store/__mocks__/uiStore';
import UserAccount from '../UserAccount';

const mockStore = configureMockStore([thunk]);

describe(null, () => {
  it('render() correctly', () => {
    const props = {
      ui,
      user: {
        email: 'test@test.com',
        first_name: 'test',
        last_name: 'test2',
      },
      isRequesting: false,
    };
    const store = mockStore(props);
    const wrapper = shallow(<UserAccount />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
