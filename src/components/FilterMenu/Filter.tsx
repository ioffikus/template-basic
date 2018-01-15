import React from 'react';
import { RouterState, push } from 'connected-react-router';
import queryString from 'query-string';
import _ from 'lodash';
import { IObject } from 'src/core/interfaces/IObject';
import dispatch from 'src/store/dispatch';
import List from './List';
import BoolNull from './BoolNull';
import RangeSlider from './RangeSlider';
import Switch from './Switch';

interface IWidgetProps {
  ui: Alicanto.Models.UI;
  value: any;
  fieldSlug: string;
  filterType: string;
  valueType: string;
  categoriesResults: Alicanto.Models.Category[];
  onChange: (value: any, fieldSlug: string, valueType: string, filterType: string) => void;
}

export const widgets: IObject<React.StatelessComponent<IWidgetProps>> = {
  RangeSlider: props => <RangeSlider {...props} />,
  List: props => <List {...props} />,
  BoolNull: props => <BoolNull {...props} />,
  Switch: props => <Switch {...props} />,
};

interface IProps {
  widgetName: string;
  router: RouterState;
  ui: Alicanto.Models.UI;
  filterObj: IObject<Alicanto.API.CatalogFilter>;
  fieldSlug: string;
  filterType: string;
  valueType: string;
  categoriesResults: Alicanto.Models.Category[];
}

interface IState {}

class Filter extends React.Component<IProps, IState> {
  handleChange = (value: any, fieldSlug: string) => {
    const filterObj = { ...this.props.filterObj };
    filterObj[fieldSlug] = value;
    const query = { ...queryString.parse(this.props.router.location.search), filter: JSON.stringify(filterObj) };
    delete query.page;
    const location = { ...this.props.router.location, search: queryString.stringify(query) };
    dispatch(push(location));
  };

  render() {
    const Widget = _.get(widgets, this.props.widgetName, null);
    const { ui, filterType, valueType, filterObj, fieldSlug, categoriesResults } = this.props;
    return (
      !_.isNull(Widget) && (
        <Widget
          ui={ui}
          filterType={filterType}
          valueType={valueType}
          fieldSlug={fieldSlug}
          categoriesResults={categoriesResults}
          value={filterObj[fieldSlug]}
          onChange={this.handleChange}
        />
      )
    );
  }
}

export default Filter;
