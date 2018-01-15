import React from 'react';
import { shallow } from 'enzyme';
import { Radio } from 'antd';
import uiStateMock from 'src/store/__mocks__/uiStore';
import filterStateMock from 'src/store/__mocks__/filterStore';
import categoriesStateMock from 'src/store/__mocks__/categoriesStore';
import List from '../List';

describe(null, () => {
  it('render() correct with initialState', () => {
    const listMock = filterStateMock.results[2];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = listMock;
    const categoriesResults: Alicanto.Models.Category[] = [];
    const value: number[] = null;
    const onChange = jest.fn();
    const wrapper = shallow(
      <List
        ui={uiStateMock}
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        categoriesResults={categoriesResults}
        onChange={onChange}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with categories', () => {
    const listMock = filterStateMock.results[2];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = listMock;
    const categoriesResults = categoriesStateMock.results;
    const value: number[] = null;
    const onChange = jest.fn();
    const wrapper = shallow(
      <List
        ui={uiStateMock}
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        categoriesResults={categoriesResults}
        onChange={onChange}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render() with selected value is different from default', () => {
    const listMock = filterStateMock.results[2];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = listMock;
    const categoriesResults = categoriesStateMock.results;
    const value = [categoriesResults[0].id];
    const onChange = jest.fn();
    const wrapper = shallow(
      <List
        ui={uiStateMock}
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        categoriesResults={categoriesResults}
        onChange={onChange}
      />,
    );
    const radioGroupInstance = wrapper
      .find(Radio.Group)
      .dive()
      .instance() as Radio;
    expect(radioGroupInstance.props.value).toEqual(value[0]);
    expect(wrapper).toMatchSnapshot();
  });
  it('List.onChange()', () => {
    const listMock = filterStateMock.results[2];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = listMock;
    const categoriesResults = categoriesStateMock.results;
    const value = [categoriesResults[0].id];
    const newValue = categoriesResults[1].id;
    const onChange = jest.fn();
    const wrapper = shallow(
      <List
        ui={uiStateMock}
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        categoriesResults={categoriesResults}
        onChange={onChange}
      />,
    );
    const radioGroupInstance = wrapper
      .find(Radio.Group)
      .dive()
      .instance() as Radio;
    radioGroupInstance.props.onChange({ target: { value: newValue } } as any);
    expect(onChange).toBeCalledWith([newValue], fieldSlug, valueType, filterType);
  });
});
