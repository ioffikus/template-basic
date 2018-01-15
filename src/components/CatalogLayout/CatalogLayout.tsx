import React from 'react';
import { Layout } from 'antd';
import dispatch from 'src/store/dispatch';
import { getCatalogQuery } from 'src/ducks/catalogQuery';
import { getCategoriesMenu } from 'src/ducks/categoriesMenu';
import { getCatalog } from 'src/ducks/catalog';
import { getCategories } from 'src/ducks/categories';
import { getFilter } from 'src/ducks/filter';
import SiderMenu from 'src/components/SiderMenu';
import CategoriesMenu from 'src/components/CategoriesMenu';
import FilterMenu from 'src/components/FilterMenu';
import Catalog from './Catalog';

class CatalogLayout extends React.Component<{}, {}> {
  static fetchData: Store.IFetchDataFn = abortToken => {
    return dispatch(getCatalogQuery()).then(() => {
      return Promise.all([
        dispatch(getCategoriesMenu(abortToken)),
        dispatch(getCatalog(abortToken)),
        dispatch(getCategories(abortToken)),
        dispatch(getFilter(abortToken)),
      ]);
    });
  };

  render() {
    return (
      <Layout>
        <SiderMenu type="categories">
          <CategoriesMenu />
        </SiderMenu>
        <Layout.Content>
          <Catalog />
        </Layout.Content>
        <SiderMenu type="filters">
          <FilterMenu />
        </SiderMenu>
      </Layout>
    );
  }
}

export default CatalogLayout;
