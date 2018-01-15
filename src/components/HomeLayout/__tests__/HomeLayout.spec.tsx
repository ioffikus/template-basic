import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import nanoid from 'nanoid';
import { setupDispatch } from 'src/store/dispatch';
import { getCategoriesMenu } from 'src/ducks/categoriesMenu';
import { getPopularItems } from 'src/ducks/popularItems';
import HomeLayout from '../HomeLayout';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('src/ducks/categoriesMenu', () => {
  return {
    getCategoriesMenu: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});
jest.mock('src/ducks/popularItems', () => {
  return {
    getPopularItems: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  it('fetchData()', () => {
    const store = mockStore({});
    setupDispatch({ store });
    const abortToken = nanoid();
    return HomeLayout.fetchData(abortToken).then(data => {
      expect(getCategoriesMenu).toBeCalledWith(abortToken);
      expect(getPopularItems).toBeCalledWith(abortToken);
    });
  });
  it('render()', () => {
    const store = mockStore({});
    const wrapper = shallow(<HomeLayout />, { context: { store } });
    expect(wrapper).toMatchSnapshot();
  });
});
