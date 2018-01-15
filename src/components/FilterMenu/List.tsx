import React from 'react';
import { Radio } from 'antd';
import _ from 'lodash';

interface IProps {
  ui: Alicanto.Models.UI;
  value: number[];
  fieldSlug: string;
  filterType: string;
  valueType: string;
  categoriesResults: Alicanto.Models.Category[];
  onChange: (value: number[], fieldSlug: string, valueType: string, filterType: string) => void;
}

interface IState {
  value: number;
}

class List extends React.PureComponent<IProps, IState> {
  readonly defauldValue = 'all';

  handleChange = (event: React.SyntheticEvent<any>) => {
    const value: 'all' | number = _.get(event.target, 'value', 'all');
    const nValue = value !== 'all' ? [value] : null;
    this.props.onChange(nValue, this.props.fieldSlug, this.props.valueType, this.props.filterType);
  };

  render() {
    const commonUI = this.props.ui.common;
    let value: string | number = this.defauldValue;
    if (!_.isNil(this.props.value)) {
      value = this.props.value[0];
    }

    return (
      <div className="root">
        <style jsx>{`
          .root :global(.filters) {
            max-width: 100%;
          }
          .root :global(.filters .ant-radio-button-wrapper) {
            display: flex;
            align-items: center;
            line-height: 1.5;
            height: auto;
            min-height: 20px;
            white-space: normal;
            padding-top: 4px;
            padding-bottom: 4px;
          }
          .root :global(.filters .ant-radio-button-wrapper + .ant-radio-button-wrapper) {
            margin-top: 10px;
          }
        `}</style>
        <Radio.Group onChange={this.handleChange} value={value} className="filters">
          <Radio.Button value={this.defauldValue}>
            {commonUI.filters.categories.items.allCategories.i18n.defaultText}
          </Radio.Button>
          {this.props.categoriesResults.map((item: Alicanto.Models.Category) => (
            <Radio.Button key={item.id} value={item.id}>
              {item.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    );
  }
}

export default List;
