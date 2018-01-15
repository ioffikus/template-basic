import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import queryString from 'query-string';
import getCategoriesPath from 'src/helpers/getCategoriesPath';

interface IOwnProps {
  for: 'product' | 'catalog';
}

interface IConnectedState {
  categoriesPath: Alicanto.Models.Category[];
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState, ownProps: IOwnProps) => ({
  categoriesPath:
    (ownProps.for === 'product' && state.product.categories) ||
    (ownProps.for === 'catalog' &&
      getCategoriesPath(
        state.categoriesMenu.content,
        _.get(state.catalogQuery.filterObj, 'categories__in[0]', null),
      )) ||
    [],
});

const WrappedBreadcrumbs = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Breadcrumbs extends React.Component<IProps, IState> {
    render() {
      const openCategories = [...this.props.categoriesPath];
      const selectedCategory = openCategories.pop();
      if (!selectedCategory) {
        return null;
      }
      return (
        <div className="root">
          <style jsx>{`
            .root :global(.ant-breadcrumb a) {
              color: #b2bdcb;
              font-size: 14px;
              letter-spacing: 2px;
              font-weight: bold;
            }
            .root :global(.ant-breadcrumb-separator) {
              margin: 0 14px;
            }
            .root :global(.ant-breadcrumb > span:last-child) {
              color: #062f49;
              font-size: 2em;
              font-weight: bold;
            }
          `}</style>
          <Breadcrumb separator=" ">
            {openCategories.map(category => (
              <Breadcrumb.Item key={category.id}>
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
              </Breadcrumb.Item>
            ))}
            <Breadcrumb.Item key={selectedCategory.id}>{selectedCategory.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      );
    }
  },
);

export default WrappedBreadcrumbs;
