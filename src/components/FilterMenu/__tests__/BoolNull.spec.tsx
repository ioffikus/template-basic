import React from 'react';
import { shallow } from 'enzyme';
import { Radio } from 'antd';
import uiStateMock from 'src/store/__mocks__/uiStore';
import filterStateMock from 'src/store/__mocks__/filterStore';
import BoolNull from '../BoolNull';

describe(null, () => {
  it('render() correct with initialState', () => {
    const boolNullMock = filterStateMock.results[2];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = boolNullMock;
    const value: boolean = null;
    const onChange = jest.fn();
    const wrapper = shallow(
      <BoolNull
        ui={uiStateMock}
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        onChange={onChange}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with value=true', () => {
    const boolNullMock = filterStateMock.results[2];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = boolNullMock;
    const value = true;
    const onChange = jest.fn();
    const wrapper = shallow(
      <BoolNull
        ui={uiStateMock}
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        onChange={onChange}
      />,
    );
    const radioGroupInstance = wrapper
      .find(Radio.Group)
      .dive()
      .instance() as Radio;
    expect(radioGroupInstance.props.value).toEqual('' + value);
    expect(wrapper).toMatchSnapshot();
  });
  it('BoolNull.onChange()', () => {
    const boolNullMock = filterStateMock.results[2];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = boolNullMock;
    const value: boolean = null;
    const newValue = true;
    const onChange = jest.fn();
    const wrapper = shallow(
      <BoolNull
        ui={uiStateMock}
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        onChange={onChange}
      />,
    );
    const radioGroupInstance = wrapper
      .find(Radio.Group)
      .dive()
      .instance() as Radio;
    radioGroupInstance.props.onChange({ target: { value: newValue } } as any);
    expect(onChange).toBeCalledWith(newValue, fieldSlug, valueType, filterType);
  });
});
