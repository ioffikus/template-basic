import React from 'react';
import _ from 'lodash';
import { Radio } from 'antd';

interface IProps {
  ui: Alicanto.Models.UI;
  value: boolean;
  fieldSlug: string;
  valueType: string;
  filterType: string;
  onChange: (value: boolean, fieldSlug: string, valueType: string, filterType: string) => void;
}

interface IState {}

class BoolNull extends React.PureComponent<IProps, IState> {
  handleChange = (event: React.SyntheticEvent<any>) => {
    const value = JSON.parse(_.get(event.target, 'value'));
    this.props.onChange(value, this.props.fieldSlug, this.props.valueType, this.props.filterType);
  };

  render() {
    const stateUI = this.props.ui.common.filters.inStock.state;
    const value = _.get(this.props, 'value', null);
    return (
      <div className="root">
        <Radio.Group value={'' + value} size="large" onChange={this.handleChange}>
          <Radio.Button value="true">{stateUI.trueState.i18n.defaultText}</Radio.Button>
          <Radio.Button value="false">{stateUI.falseState.i18n.defaultText}</Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}

export default BoolNull;
