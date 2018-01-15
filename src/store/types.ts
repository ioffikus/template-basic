import { RouterState } from 'connected-react-router';
import { IAuthState } from 'src/ducks/auth';
import { ICartState } from 'src/ducks/cart';
import { ICardPaidItemsState } from 'src/ducks/cartPaidItems';
import { ICatalogQueryState } from 'src/ducks/catalogQuery';
import { ICatalogState } from 'src/ducks/catalog';
import { ICategoriesState } from 'src/ducks/categories';
import { ICategoriesMenuState } from 'src/ducks/categoriesMenu';
import { IFilterState } from 'src/ducks/filter';
import { ILocaleState } from 'src/ducks/locale';
import { IRoutesState } from 'src/ducks/routes';
import { IMetaState } from 'src/ducks/meta';
import { IPageState } from 'src/ducks/page';
import { IProductState } from 'src/ducks/product';
import { IProgressState } from 'src/ducks/progress';
import { IRecommendItemsState } from 'src/ducks/recommendItems';
import { IPopularItemsState } from 'src/ducks/popularItems';
import { IUIState } from 'src/ducks/ui';
import { IUserState } from 'src/ducks/user';
import { IUserDeliveryState } from 'src/ducks/userDelivery';
import { IUserOrdersState } from 'src/ducks/userOrders';
import { Dispatch } from 'redux';
import { IXShopHeaders } from 'src/core/interfaces/IXShopHeaders';

export interface IState {
  router?: RouterState;
  ui?: IUIState;
  auth?: IAuthState;
  user?: IUserState;
  categories?: ICategoriesState;
  categoriesMenu?: ICategoriesMenuState;
  catalogQuery?: ICatalogQueryState;
  catalog?: ICatalogState;
  product?: IProductState;
  progress?: IProgressState;
  routes?: IRoutesState;
  meta?: IMetaState;
  filter?: IFilterState;
  cart?: ICartState;
  cartPaidItems?: ICardPaidItemsState;
  userDelivery?: IUserDeliveryState;
  userOrders?: IUserOrdersState;
  recommendItems?: IRecommendItemsState;
  popularItems?: IPopularItemsState;
  page?: IPageState;
  locale?: ILocaleState;
}

export interface IReduxCommonState {
  isRequestError: boolean;
  isRequesting: boolean;
}

export interface IFetchDataFn {
  (abortToken?: string): Promise<any>;
}

export interface IReduxThunkCb {
  (dispatch: Dispatch<Store.IState>, getState: () => Store.IState, xShopHeaders?: IXShopHeaders): Promise<any>;
}
