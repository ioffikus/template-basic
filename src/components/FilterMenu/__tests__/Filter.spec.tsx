import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { setupDispatch } from 'src/store/dispatch';
import { push } from 'connected-react-router';
import _ from 'lodash';
import filterStateMock from 'src/store/__mocks__/filterStore';
import routerStateMock, {
  stateWithSwitchSearch as routerStateMockWithSwitchSearch,
  stateWithFullFilterSearch as routerStateMockWithFullFilterSearch,
} from 'src/store/__mocks__/routerStore';
import uiStateMock from 'src/store/__mocks__/uiStore';
import catalogQueryStateMock from 'src/store/__mocks__/catalogQueryStore';
import categoriesStateMock from 'src/store/__mocks__/categoriesStore';
import Filter from '../Filter';
import Switch from '../Switch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('connected-react-router', () => {
  return {
    push: jest.fn(() => {
      return { type: 'dummy' };
    }),
  };
});

describe(null, () => {
  const componentMock = filterStateMock.results[1];
  const {
    widget_name: widgetName,
    field_slug: fieldSlug,
    value_type: valueType,
    filter_type: filterType,
  } = componentMock;
  const { filterObj } = catalogQueryStateMock;
  const categoriesResults = categoriesStateMock.results;
  const defaultProps = {
    widgetName,
    filterObj,
    fieldSlug,
    filterType,
    valueType,
    categoriesResults,
    router: routerStateMock,
    ui: uiStateMock,
  };
  beforeEach(() => {
    const store = mockStore(() => {});
    setupDispatch({ store });
  });
  it('render() correct with correct component', () => {
    const wrapper = shallow(<Filter {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with uncorrect component', () => {
    const newProps = { ...defaultProps, widgetName: 'Unknow component' };
    const wrapper = shallow(<Filter {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Widget.onChange() with initialState filters', () => {
    const filterObj = {};
    const newProps = { ...defaultProps, filterObj };
    const wrapper = shallow(<Filter {...newProps} />);
    const dummyWrapper = wrapper.dive();
    const instanceWidget = dummyWrapper
      .find(Switch)
      .dive()
      .instance() as Switch;
    const value = _.get(catalogQueryStateMock.filterObj, 'include_subcategories__eq', false);
    instanceWidget.props.onChange(value, fieldSlug, valueType, filterType);
    expect(push).toBeCalledWith(routerStateMockWithSwitchSearch.location);
  });
  it('Widget.onChange() with all filters', () => {
    const wrapper = shallow(<Filter {...defaultProps} />);
    const dummyWrapper = wrapper.dive();
    const instanceWidget = dummyWrapper
      .find(Switch)
      .dive()
      .instance() as Switch;
    const value = _.get(catalogQueryStateMock.filterObj, 'include_subcategories__eq', false);
    instanceWidget.props.onChange(value, fieldSlug, valueType, filterType);
    expect(push).toBeCalledWith(routerStateMockWithFullFilterSearch.location);
  });
});
