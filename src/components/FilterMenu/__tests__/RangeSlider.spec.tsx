import React from 'react';
import { shallow } from 'enzyme';
import { Slider } from 'antd';
import filterStateMock from 'src/store/__mocks__/filterStore';
import RangeSlider from '../RangeSlider';

describe(null, () => {
  it('render() correct with initialState', () => {
    const rangeSliderMock = filterStateMock.results[0];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = rangeSliderMock;
    const value: [number, number] = null;
    const onChange = jest.fn();
    const wrapper = shallow(
      <RangeSlider
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        onChange={onChange}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with value is different from initial', () => {
    const rangeSliderMock = filterStateMock.results[0];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = rangeSliderMock;
    const value: [number, number] = [50, 100];
    const onChange = jest.fn();
    const wrapper = shallow(
      <RangeSlider
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        onChange={onChange}
      />,
    );
    const sliderInstance = wrapper
      .find(Slider)
      .dive()
      .instance() as Slider;
    expect(sliderInstance.props.value).toEqual(value);
    expect(wrapper).toMatchSnapshot();
  });
  it('this.props.onChange()', () => {
    const rangeSliderMock = filterStateMock.results[0];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = rangeSliderMock;
    const value: [number, number] = null;
    const newValue: [number, number] = [150, 600];
    const onChange = jest.fn();
    const wrapper = shallow(
      <RangeSlider
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        onChange={onChange}
      />,
    );
    const sliderInstance = wrapper
      .find(Slider)
      .dive()
      .instance() as Slider;
    sliderInstance.props.onAfterChange(newValue);
    expect(onChange).toBeCalledWith(newValue, fieldSlug, valueType, filterType);
  });
  it('Slider.onChange()', () => {
    const rangeSliderMock = filterStateMock.results[0];
    const { field_slug: fieldSlug, value_type: valueType, filter_type: filterType } = rangeSliderMock;
    const value: [number, number] = null;
    const newValue: [number, number] = [150, 600];
    const onChange = jest.fn();
    const wrapper = shallow(
      <RangeSlider
        value={value}
        fieldSlug={fieldSlug}
        valueType={valueType}
        filterType={filterType}
        onChange={onChange}
      />,
    );
    const sliderInstanceAfter = wrapper
      .find(Slider)
      .dive()
      .instance() as Slider;
    sliderInstanceAfter.props.onChange(newValue);
    wrapper.update();
    const sliderInstanceBefore = wrapper
      .find(Slider)
      .dive()
      .instance() as Slider;
    expect(sliderInstanceBefore.props.value).toEqual(newValue);
  });
});
