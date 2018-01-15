import React from 'react';
import thunk from 'redux-thunk';
import { Select } from 'antd';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import uiStateMock from 'src/store/__mocks__/uiStore';
import localeStateMock from 'src/store/__mocks__/localeStore';
import LanguageSwitcher from '../LanguageSwitcher';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('src/ducks/locale', () => {
  return {
    setLocale: jest.fn(() => {
      return () => Promise.resolve();
    }),
  };
});

describe(null, () => {
  it('change value', () => {
    const changedValue = 'ru-RU';
    const state: Store.IState = {
      ui: uiStateMock,
      locale: localeStateMock,
      router: {
        location: {
          pathname: '/catalog',
          search: '?page=2', // checked this case
          hash: '',
          key: 'dummy',
        },
        action: 'POP',
      },
    };
    const store = mockStore(() => state);
    const wrapper = shallow(<LanguageSwitcher />, { context: { store } });
    const dummyWrapper = wrapper.dive();
    const selectInstance = dummyWrapper
      .find(Select)
      .dive()
      .instance() as Select;
    selectInstance.props.onSelect(changedValue, {});
    expect(window.document.cookie).toEqual(`locale=${changedValue}`);
    // TODO ch1886
    // const changedValue = 'ru-RU';
    // let state: Store.IState = {
    //   ui: uiStateMock,
    //   locale: localeStateMock,
    //   router: {
    //     location: {
    //       pathname: '/catalog',
    //       search: '?page=2', // checked this case
    //       hash: '',
    //       key: 'dummy',
    //     },
    //     action: null,
    //   },
    // };
    // const store = mockStore(() => state);
    // const wrapper = shallow(<LanguageSwitcher />, { context: { store } });
    // let dummyWrapper = wrapper.dive();
    // const selectInstance = dummyWrapper
    //   .find(Select)
    //   .dive()
    //   .instance() as Select;
    // selectInstance.props.onSelect(changedValue, {});
    // expect(setLocale).toBeCalledWith(changedValue);
    // state = { ...state, locale: { ...state.locale, current: changedValue } };
    // const dummyState = dummyWrapper.update().state(); // get state of component
    // dummyWrapper = wrapper.setContext({ store }).dive();
    // if (dummyState) dummyWrapper.setState(dummyState);
    // expect(
    //   dummyWrapper
    //     .find(Select)
    //     .dive()
    //     .prop('value'),
    // ).toEqual(changedValue);
  });
});
