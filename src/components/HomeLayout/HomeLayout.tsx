import React from 'react';
import { Layout } from 'antd';
import dispatch from 'src/store/dispatch';
import { getCategoriesMenu } from 'src/ducks/categoriesMenu';
import { getPopularItems } from 'src/ducks/popularItems';
import SiderMenu from 'src/components/SiderMenu';
import CategoriesMenu from 'src/components/CategoriesMenu';
import Home from './Home';

interface IProps {}

class HomeLayout extends React.Component<IProps, {}> {
  static fetchData: Store.IFetchDataFn = abortToken => {
    return Promise.all([dispatch(getCategoriesMenu(abortToken)), dispatch(getPopularItems(abortToken))]);
  };
  render() {
    return (
      <Layout>
        <SiderMenu type="categories">
          <CategoriesMenu />
        </SiderMenu>
        <Layout.Content>
          <Home />
        </Layout.Content>
      </Layout>
    );
  }
}

export default HomeLayout;
