// instead this, we have router in store via connected-react-router
// import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import auth from './auth';
import cart from './cart';
import cartPaidItems from './cartPaidItems';
import catalogQuery from './catalogQuery';
import catalog from './catalog';
import categories from './categories';
import categoriesMenu from './categoriesMenu';
import filter from './filter';
import locale from './locale';
import meta from './meta';
import page from './page';
import product from './product';
import progress from './progress';
import popularItems from './popularItems';
import recommendItems from './recommendItems';
import routes from './routes';
import ui from './ui';
import user from './user';
import userDelivery from './userDelivery';
import userOrders from './userOrders';

export default combineReducers<Store.IState>({
  ui,
  auth,
  user,
  categories,
  categoriesMenu,
  catalogQuery,
  catalog,
  product,
  progress,
  routes,
  meta,
  filter,
  cart,
  cartPaidItems,
  userDelivery,
  userOrders,
  popularItems,
  recommendItems,
  page,
  locale,
});
