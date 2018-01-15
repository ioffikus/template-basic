import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import getCategoriesPath from 'src/helpers/getCategoriesPath';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  categories: Alicanto.Models.Category[];
  selectedId: number;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  openKeys: string[];
  selectedKeys: string[];
}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  categories: state.categoriesMenu.content,
  selectedId: _.get(state.catalogQuery.filterObj, 'categories__in[0]', null),
});

const WrappedCategoriesMenu = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class CategoriesMenu extends React.Component<IProps, IState> {
    static childContextTypes = {
      siderCollapsed: PropTypes.bool,
    };

    getChildContext() {
      return {
        siderCollapsed: false,
      };
    }

    setKeys = (selectedId: number) => {
      const keys: { openKeys: string[]; selectedKeys: string[] } = {
        openKeys: [],
        selectedKeys: [],
      };
      if (!_.isNull(selectedId)) {
        const categoriesPath = getCategoriesPath(this.props.categories, selectedId);
        if (!_.isEmpty(categoriesPath)) {
          keys.openKeys = categoriesPath.map(category => '' + category.id);
          keys.selectedKeys = ['' + keys.openKeys.pop()];
        }
      }
      this.setState({ ...keys });
    };

    componentWillMount() {
      this.setKeys(this.props.selectedId);
    }

    componentWillReceiveProps(nextProps: IProps) {
      if (!_.isEqual(this.props.selectedId, nextProps.selectedId)) {
        this.setKeys(nextProps.selectedId);
      }
    }

    onOpenChange = (openKeys: string[]) => {
      this.setState({ openKeys });
    };

    onSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
      this.setState({ selectedKeys });
    };

    onDeselect = ({ selectedKeys }: { selectedKeys: string[] }) => {
      this.setState({ selectedKeys });
    };

    render() {
      const categoriesMenuUI = this.props.ui.common.categoriesMenu;
      const renderMenuItems = (categories: Alicanto.Models.Category[]): React.ReactNode[] => {
        return categories.map(category => {
          if (!_.isEmpty(category.subcategories)) {
            return (
              <Menu.SubMenu key={category.id} title={category.name}>
                {renderMenuItems(category.subcategories)}
              </Menu.SubMenu>
            );
          }
          return (
            <Menu.Item key={category.id}>
              <Link
                to={{
                  pathname: '/catalog',
                  search: queryString.stringify({
                    filter: JSON.stringify({
                      categories__in: [category.id],
                    }),
                  }),
                }}
              >
                {category.name}
              </Link>
            </Menu.Item>
          );
        });
      };
      return (
        <div className="root app-main-menu">
          <style jsx>{`
            .root {
              padding-left: 16px;
            }
            .root :global(.footer) {
              position: fixed;
              bottom: 20px;
              left: 0;
              width: 260px;
              color: #b2bdcb;
              font-size: 6px;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              transition: 0.2s;
            }
          `}</style>
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            selectedKeys={this.state.selectedKeys}
            onOpenChange={this.onOpenChange}
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}
            inlineIndent={16}
            inlineCollapsed={false}
          >
            {renderMenuItems(this.props.categories)}
          </Menu>
          <div className="footer">{categoriesMenuUI.copyright.text.i18n.defaultText}</div>
        </div>
      );
    }
  },
);

export default WrappedCategoriesMenu;
