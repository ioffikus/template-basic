import React from 'react';
import { Slider } from 'antd';
import { SliderValue } from 'antd/lib/slider';
import _ from 'lodash';

const marks = {
  0: '0',
  250: '250',
  500: '500',
  750: '750',
  1000: '1000',
};

interface IProps {
  value: SliderValue;
  fieldSlug: string;
  valueType: string;
  filterType: string;
  onChange: (value: SliderValue, fieldSlug: string, valueType: string, filterType: string) => void;
}

interface IState {
  value: SliderValue;
}

class RangeSlider extends React.PureComponent<IProps, IState> {
  state: IState = {
    value: this.props.value,
  };
  readonly defaultValue: SliderValue = [0, 100];

  componentWillReceiveProps(nextProps: IProps) {
    if (_.isEmpty(nextProps.value)) {
      this.setState({ value: this.defaultValue });
    }
  }

  handleChange = (value: SliderValue) => {
    this.setState({ value });
  };

  releaseHandler = (value: SliderValue) => {
    this.props.onChange(value, this.props.fieldSlug, this.props.valueType, this.props.filterType);
  };

  render() {
    return (
      <div className="root">
        <Slider
          marks={marks}
          step={50}
          defaultValue={this.defaultValue}
          value={this.state.value}
          range
          max={1000}
          onChange={this.handleChange}
          onAfterChange={this.releaseHandler}
        />
      </div>
    );
  }
}

export default RangeSlider;
