import { RouteConfig } from 'react-router-config';
import AppLayout from 'src/components/AppLayout';
import CatalogLayout from 'src/components/CatalogLayout';
import HomeLayout from 'src/components/HomeLayout';
import Cart from 'src/components/Cart';
import Login from 'src/components/Login';
import NotFound, { RedirectTo404 } from 'src/components/NotFound';
import Page from 'src/components/Page';
import Product from 'src/components/Product';
import User from 'src/components/User';

const routes: RouteConfig[] = [
  {
    path: '/404',
    component: NotFound,
  },
  {
    component: AppLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomeLayout,
      },
      {
        path: '/catalog*', // FIXED: use `*`, matchRoutes for SSR does not work with /catalog?search=xxx, only with /catalog/?search=xxx
        component: CatalogLayout,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/product/:uid',
        component: Product,
      },
      {
        path: '/cart',
        component: Cart,
      },
      {
        path: '/pages/:slug',
        component: Page,
      },
      {
        path: '/user',
        exact: true,
        component: User,
      },
      {
        path: '/user/:key',
        component: User,
      },
      {
        path: '*',
        component: RedirectTo404,
      },
    ],
  },
];

export default routes;
