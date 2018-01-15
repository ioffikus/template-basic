import React from 'react';
import { Switch as AntdSwitch } from 'antd';

interface IProps {
  value: boolean;
  fieldSlug: string;
  valueType: string;
  filterType: string;
  onChange: (value: boolean, fieldSlug: string, valueType: string, filterType: string) => void;
}

interface IState {}

class Switch extends React.PureComponent<IProps, IState> {
  handleChange = () => {
    this.props.onChange(!this.props.value, this.props.fieldSlug, this.props.valueType, this.props.filterType);
  };

  render() {
    return (
      <div className="root">
        <AntdSwitch checked={!!this.props.value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Switch;
