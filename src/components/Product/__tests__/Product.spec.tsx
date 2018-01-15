import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import nanoid from 'nanoid';
import { setupDispatch } from 'src/store/dispatch';
import { getProduct } from 'src/ducks/product';
import Product from '../Product';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('src/ducks/product', () => {
  return {
    getProduct: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  it('fetchData()', () => {
    const store = mockStore({});
    setupDispatch({ store });
    const abortToken = nanoid();
    return Product.fetchData(abortToken).then(() => {
      expect(getProduct).toBeCalledWith(abortToken);
    });
  });
  it('render()', () => {
    const store = mockStore({});
    setupDispatch({ store });
    const wrapper = shallow(<Product />, { context: { store } });
    expect(wrapper).toMatchSnapshot();
  });
});
