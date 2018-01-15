import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import nanoid from 'nanoid';
import { setupDispatch } from 'src/store/dispatch';
import { getCatalogQuery } from 'src/ducks/catalogQuery';
import { getCategoriesMenu } from 'src/ducks/categoriesMenu';
import { getCatalog } from 'src/ducks/catalog';
import { getCategories } from 'src/ducks/categories';
import { getFilter } from 'src/ducks/filter';
import CatalogLayout from '../CatalogLayout';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('src/ducks/catalogQuery', () => {
  return {
    getCatalogQuery: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});
jest.mock('src/ducks/categoriesMenu', () => {
  return {
    getCategoriesMenu: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});
jest.mock('src/ducks/catalog', () => {
  return {
    getCatalog: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});
jest.mock('src/ducks/categories', () => {
  return {
    getCategories: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});
jest.mock('src/ducks/filter', () => {
  return {
    getFilter: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  it('fetchData()', () => {
    const store = mockStore({});
    setupDispatch({ store });
    const abortToken = nanoid();
    return CatalogLayout.fetchData(abortToken).then(data => {
      expect(getCatalogQuery).toBeCalled();
      expect(getCategoriesMenu).toBeCalledWith(abortToken);
      expect(getCatalog).toBeCalledWith(abortToken);
      expect(getCategories).toBeCalledWith(abortToken);
      expect(getFilter).toBeCalledWith(abortToken);
    });
  });
  it('render()', () => {
    const store = mockStore({});
    const wrapper = shallow(<CatalogLayout />, { context: { store } });
    expect(wrapper).toMatchSnapshot();
  });
});
