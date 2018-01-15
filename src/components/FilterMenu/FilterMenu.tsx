import React from 'react';
import { connect } from 'react-redux';
import { RouterState } from 'connected-react-router';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { IObject } from 'src/core/interfaces/IObject';
import Ordering from './Ordering';
import Filter, { widgets } from './Filter';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  ui: Alicanto.Models.UI;
  filterObj: IObject<Alicanto.API.CatalogFilter>;
  filterResults: Alicanto.Models.Filter[];
  categoriesResults: Alicanto.Models.Category[];
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
  ui: state.ui,
  filterObj: state.catalogQuery.filterObj,
  filterResults: state.filter.results,
  categoriesResults: state.categories.results,
});

const WrappedFilterMenu = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class FilterMenu extends React.Component<IProps, IState> {
    static childContextTypes = {
      siderCollapsed: PropTypes.bool,
    };

    getChildContext() {
      return {
        siderCollapsed: false,
      };
    }

    render() {
      const commonUI = this.props.ui.common;
      const defaultOpenKeys = ['ordering'];
      this.props.filterResults.forEach(
        item => item.field_slug !== 'categories__in' && defaultOpenKeys.push(item.field_slug),
      );
      return (
        <div className="root app-main-menu">
          <style jsx>{`
            .root :global(.ant-menu-submenu-title) {
              padding-right: 20px;
              margin-left: 18px;
            }
            .root :global(.ant-menu-submenu-title:after) {
              right: auto !important;
              left: 1px;
            }
          `}</style>
          <div className="inner">
            <Menu mode="inline" defaultOpenKeys={defaultOpenKeys}>
              <Menu.SubMenu title={commonUI.filters.ordering.title.i18n.defaultText} key="ordering">
                <Menu.Item>
                  <Ordering />
                </Menu.Item>
              </Menu.SubMenu>
              {this.props.filterResults.map(({ widget_name, field_slug, filter_type, value_type, label }) => {
                if (Object.keys(widgets).indexOf(widget_name) !== -1) {
                  return (
                    <Menu.SubMenu title={label} key={field_slug}>
                      <Menu.Item>
                        <Filter
                          widgetName={widget_name}
                          router={this.props.router}
                          filterObj={this.props.filterObj}
                          ui={this.props.ui}
                          fieldSlug={field_slug}
                          filterType={filter_type}
                          valueType={value_type}
                          categoriesResults={field_slug === 'categories__in' && this.props.categoriesResults}
                        />
                      </Menu.Item>
                    </Menu.SubMenu>
                  );
                }
              })}
            </Menu>
          </div>
        </div>
      );
    }
  },
);

export default WrappedFilterMenu;
