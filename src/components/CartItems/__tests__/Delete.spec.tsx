import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { Button } from 'antd';
import configureMockStore from 'redux-mock-store';
import { setupDispatch } from 'src/store/dispatch';
import { deleteFromCart } from 'src/ducks/cart';
import Delete from '../Delete';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('src/ducks/cart', () => {
  return {
    deleteFromCart: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  it('render() with mayDeleteItems as true', () => {
    const mayDeleteItems = true;
    const uid = 'dummy';
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(<Delete mayDeleteItems={mayDeleteItems} uid={uid} />, {
      context: { store },
    });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('render() with mayDeleteItems as false', () => {
    const mayDeleteItems = false;
    const uid = 'dummy';
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(<Delete mayDeleteItems={mayDeleteItems} uid={uid} />, {
      context: { store },
    });
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('Button.onClick() to Button', () => {
    const mayDeleteItems = true;
    const uid = 'dummy';
    const store = mockStore();
    setupDispatch({ store });
    const wrapper = shallow(<Delete mayDeleteItems={mayDeleteItems} uid={uid} />, {
      context: { store },
    });
    const dummyWrapper = wrapper.dive();
    const buttonInstance = dummyWrapper
      .find(Button)
      .dive()
      .instance() as Button;
    buttonInstance.props.onClick(null);
    expect(deleteFromCart).toBeCalledWith(uid);
  });
});
