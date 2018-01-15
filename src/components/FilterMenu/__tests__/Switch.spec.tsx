import React from 'react';
import { shallow } from 'enzyme';
import { Switch as AntdSwitch } from 'antd';
import filterStateMock from 'src/store/__mocks__/filterStore';
import Switch from '../Switch';

describe(null, () => {
  it('render() correct with initialState', () => {
    const switchMock = filterStateMock.results[1];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = switchMock;
    const value: boolean = null;
    const onChange = jest.fn();
    const wrapper = shallow(
      <Switch value={value} fieldSlug={fieldSlug} valueType={valueType} filterType={filterType} onChange={onChange} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with value=true', () => {
    const switchMock = filterStateMock.results[1];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = switchMock;
    const value = true;
    const onChange = jest.fn();
    const wrapper = shallow(
      <Switch value={value} fieldSlug={fieldSlug} valueType={valueType} filterType={filterType} onChange={onChange} />,
    );
    const switchInstance = wrapper
      .find(AntdSwitch)
      .dive()
      .instance() as AntdSwitch;
    expect(switchInstance.props.checked).toEqual(value);
    expect(wrapper).toMatchSnapshot();
  });
  it('AntdSwitch.onChange()', () => {
    const switchMock = filterStateMock.results[1];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = switchMock;
    const value: boolean = null;
    const newValue = true;
    const onChange = jest.fn();
    const wrapper = shallow(
      <Switch value={value} fieldSlug={fieldSlug} valueType={valueType} filterType={filterType} onChange={onChange} />,
    );
    const switchInstance = wrapper
      .find(AntdSwitch)
      .dive()
      .instance() as AntdSwitch;
    switchInstance.props.onChange({ target: { value: newValue } } as any);
    expect(onChange).toBeCalledWith(newValue, fieldSlug, valueType, filterType);
  });
});
