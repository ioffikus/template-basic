import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import { BusinessLogicError } from 'src/store/common';
import { safelyParseJSON } from 'src/helpers/safelyParseJSON';
import { IObject } from 'src/core/interfaces/IObject';
import { GET, POST, PUT, DELETE } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';

export const REDUCER = 'CART';
const NS = `${REDUCER}__`;

export interface ICartState extends Store.IReduxCommonState {
  id: number;
  items: Alicanto.Models.CatalogItem[];
  itemsCount: number;
  totalPrice: number;
}

export const initialState: ICartState = {
  id: null,
  items: [],
  itemsCount: 0,
  totalPrice: 0,
  isRequestError: false,
  isRequesting: false,
};

const reducer = createReducer<ICartState>({}, initialState);

const addProductToCart = createAction<Alicanto.Models.CatalogItem>(`${NS}ADD_PRODUCT_TO_CART`);
reducer.on(addProductToCart, (state, product) => ({
  ...state,
  items: [
    ...state.items,
    {
      ...product,
    },
  ],
  itemsCount: state.itemsCount + 1,
  totalPrice: (state.totalPrice * 100 + product.schema_fields.price.value * 100) / 100,
}));

const deleteProductFromCart = createAction<number>(`${NS}DELETE_PRODUCT_FROM_CART`);
reducer.on(deleteProductFromCart, (state, index) => ({
  ...state,
  items: state.items.filter((_, i) => i !== index),
  itemsCount: state.itemsCount - state.items[index].count,
  totalPrice: (state.totalPrice * 100 - state.items[index].schema_fields.price.value * 100) / 100,
}));

const increaseProductQuantity = createAction<number>(`${NS}INCREASE_PRODUCT_QUANTITY`);
reducer.on(increaseProductQuantity, (state, index) => ({
  ...state,
  items: state.items
    .slice(0, index)
    .concat([
      {
        ...state.items[index],
        count: state.items[index].count + 1,
      },
    ])
    .concat(state.items.slice(index + 1)),
  itemsCount: state.itemsCount + 1,
  totalPrice: (state.totalPrice * 100 + state.items[index].schema_fields.price.value * 100) / 100,
}));

const decreaseProductQuantity = createAction<number>(`${NS}DECREASE_PRODUCT_QUANTITY`);
reducer.on(decreaseProductQuantity, (state, index) => ({
  ...state,
  items: state.items
    .slice(0, index)
    .concat([
      {
        ...state.items[index],
        count: state.items[index].count - 1,
      },
    ])
    .concat(state.items.slice(index + 1)),
  itemsCount: state.itemsCount - 1,
  totalPrice: (state.totalPrice * 100 - state.items[index].schema_fields.price.value * 100) / 100,
}));

const blockItemIncrease = createAction<number>(`${NS}BLOCK_ITEM_INCREASE`);
reducer.on(blockItemIncrease, (state, index) => ({
  ...state,
  items: state.items
    .slice(0, index)
    .concat([
      {
        ...state.items[index],
        blockedIncreasing: true,
      },
    ])
    .concat(state.items.slice(index + 1)),
}));

const putProductsInStore = createAction<Alicanto.Models.CatalogItem[]>(`${NS}PUT_PRODUCTS_IN_STORE`);
reducer.on(putProductsInStore, (state, items) => ({
  ...state,
  items: [...items],
}));

const putCartInStore = createAction<{ id: number; itemsCount: number; totalPrice: number }>(`${NS}PUT_CART_IN_STORE`);
reducer.on(putCartInStore, (state, { id, itemsCount, totalPrice }) => ({
  ...state,
  id,
  itemsCount,
  totalPrice,
}));

const callFailure = createAction(`${NS}CALL_FAILURE`);
reducer.on(callFailure, state => ({
  ...state,
  isRequestError: true,
  isRequesting: false,
}));

const callSuccess = createAction(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, state => ({
  ...state,
  isRequestError: false,
  isRequesting: false,
}));

const callRequest = createAction(`${NS}CALL_REQUEST`);
reducer.on(callRequest, state => ({
  ...state,
  isRequestError: false,
  isRequesting: true,
}));

export const getCartFromLocalStorage = (): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  if (process.env.BROWSER) {
    const s = window.localStorage.getItem('cart');
    if (s) {
      const localStorageCartState: ICartState = safelyParseJSON(s);
      if (!_.isNull(localStorageCartState)) {
        const { id, itemsCount, totalPrice, items } = localStorageCartState;
        dispatch(putCartInStore({ id, itemsCount, totalPrice }));
        dispatch(putProductsInStore(items));
      }
    }
  }
  return Promise.resolve();
};

const setCartInLocalStorage = (cartState: ICartState) => {
  if (process.env.BROWSER) {
    const { items, itemsCount, totalPrice, id } = cartState;
    window.localStorage.setItem('cart', JSON.stringify({ items, itemsCount, totalPrice, id }));
  }
};

const removeCartFromLocalStorage = () => {
  if (process.env.BROWSER) {
    window.localStorage.removeItem('cart');
  }
};

const getProducts = (): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: `${EndpointsConfig.CART_CURRENT_ITEMS}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const { results } = resp.data as Alicanto.API.GET_CART_CURRENT_ITEMS_RESPONSE;
        dispatch(putProductsInStore(results));
        dispatch(callSuccess());
        resolve();
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

const getCart = (): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    GET(
      {
        url: `${EndpointsConfig.CART_CURRENT}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const { items_count, total, id } = resp.data as Alicanto.API.GET_CART_CURRENT_RESPONSE;
        dispatch(putCartInStore({ id, itemsCount: items_count, totalPrice: parseFloat(total) }));
        dispatch(callSuccess());
        if (!items_count) {
          dispatch(deleteCart());
          resolve();
          return;
        }
        return dispatch(getProducts()).then(() => {
          setCartInLocalStorage(getState().cart);
          resolve();
        });
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

/**
 * If unauthenticated user've added some products, then
 * after login we put items on server,
 * firstly check if there are repeated items
 * in local storage and server. After that update cart info
 */
const putCart = (data: Alicanto.API.PUT_CART_CURRENT_BODY): Store.IReduxThunkCb => (
  dispatch,
  getState,
  xShopHeaders,
) => {
  return new Promise((resolve, reject) => {
    PUT(
      {
        data,
        url: `${EndpointsConfig.CART_CURRENT}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        dispatch(callSuccess());
        return dispatch(getCart()).then(resolve);
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

const findUnicItems = (itemsInStore: Alicanto.Models.CatalogItem[], itemsInCart: Alicanto.Models.CatalogItem[]) => {
  const cartIds: IObject<Alicanto.Models.CatalogItem> = {};
  itemsInCart.forEach((item: Alicanto.Models.CatalogItem) => {
    cartIds[item.item] = item;
  });
  return itemsInStore.filter(item => !(item.item in cartIds));
};

export const postLocalStorageCart = (): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    const items = getState().cart.items;
    if (_.isEmpty(items)) {
      dispatch(getCart()).then(resolve, reject);
      return;
    }
    dispatch(callRequest());
    GET(
      {
        url: `${EndpointsConfig.CART_CURRENT_ITEMS}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const { results } = resp.data as Alicanto.API.GET_CART_CURRENT_ITEMS_RESPONSE;
        const itemsInCart = results;
        const unicItemsInStore = findUnicItems(items, itemsInCart);
        const data: Alicanto.API.PUT_CART_CURRENT_BODY = {
          items: [],
        };
        if (!_.isEmpty(unicItemsInStore)) {
          unicItemsInStore.forEach(item => {
            data.items.push({
              count: item.count,
              item: item.item,
            });
          });
          return dispatch(putCart(data)).then(resolve);
        }
        dispatch(callSuccess());
        return dispatch(getCart()).then(resolve);
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  });
};

/**
 * Dispatch action after click on 'add to card' button:
 * first click will add item in the cart
 * user can press the button multiple times and this action will increase product quantity
 * @param product
 */
export const addToCart = (product: Alicanto.Models.CatalogItem, cb: () => void): Store.IReduxThunkCb => (
  dispatch,
  getState,
  xShopHeaders,
) => {
  return new Promise((resolve, reject) => {
    const productBalance = product.balance;
    const productIsUnlimited = product.is_unlimited;
    const productUid = product.uid;
    const items = getState().cart.items;
    const itemIndex = items.findIndex(element => element.item === productUid);
    const errorMsg = getState().ui.routes.cart.errors.moreThanInBalance.i18n.defaultText;
    const isAuthenticated = getState().auth.isAuthenticated;
    if (isAuthenticated) {
      dispatch(callRequest());
      if (itemIndex !== -1) {
        const item = items[itemIndex];
        if (productBalance < item.count + 1 && !productIsUnlimited) {
          dispatch(callFailure());
          const error = new BusinessLogicError(errorMsg);
          reject(error);
          return;
        }
        const data: Alicanto.API.PUT_CART_CURRENT_ITEMS_ID_BODY = {
          count: item.count + 1,
          item: productUid,
        };
        PUT(
          {
            data,
            url: `${EndpointsConfig.CART_CURRENT_ITEMS}${item.id}`,
          },
          xShopHeaders,
        )
          .then((resp: AxiosResponse) => {
            dispatch(increaseProductQuantity(itemIndex));
            setCartInLocalStorage(getState().cart);
            dispatch(callSuccess());
            resolve();
          })
          .catch(error => {
            dispatch(callFailure());
            reject(error);
          });
        return;
      }
      const data: Alicanto.API.POST_CART_CURRENT_ITEMS_BODY = {
        count: 1,
        item: productUid,
      };
      POST(
        {
          data,
          url: `${EndpointsConfig.CART_CURRENT_ITEMS}`,
        },
        xShopHeaders,
      )
        .then((resp: AxiosResponse) => {
          const data = resp.data as Alicanto.API.POST_CART_CURRENT_ITEMS_RESPONSE;
          dispatch(addProductToCart(data));
          if (cb) {
            cb();
          }
          setCartInLocalStorage(getState().cart);
          dispatch(callSuccess());
          resolve();
        })
        .catch(error => {
          dispatch(callFailure());
          reject(error);
        });
      return;
    }
    // user isn't authenticated
    if (itemIndex !== -1) {
      dispatch(callRequest());
      GET(
        {
          url: `${EndpointsConfig.PRODUCT}${product.uid}`,
        },
        xShopHeaders,
      )
        .then((resp: AxiosResponse) => {
          const data = resp.data as Alicanto.API.GET_CATALOG_UID_RESPONSE;
          const item = items[itemIndex];
          if (item.count + 1 < data.balance || data.is_unlimited) {
            dispatch(increaseProductQuantity(itemIndex));
            if (cb) {
              cb();
            }
            setCartInLocalStorage(getState().cart);
            dispatch(callSuccess());
            resolve();
            return;
          }
          const error = new BusinessLogicError(errorMsg);
          return Promise.reject(error);
        })
        .catch(error => {
          dispatch(callFailure());
          reject(error);
        });
      return;
    }
    const newProduct = { ...product };
    newProduct.count = 1;
    newProduct.item = product.uid;
    delete newProduct.uid;
    dispatch(addProductToCart(newProduct));
    if (cb) {
      cb();
    }
    setCartInLocalStorage(getState().cart);
    resolve();
  });
};

export const deleteFromCart = (productUid: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    const items = getState().cart.items;
    const itemIndex = items.findIndex(element => element.item === productUid);
    const item = items[itemIndex];
    const isAuthenticated = getState().auth.isAuthenticated;
    if (isAuthenticated) {
      dispatch(callRequest());
      DELETE(
        {
          url: `${EndpointsConfig.CART_CURRENT_ITEMS}${item.id}`,
        },
        xShopHeaders,
      )
        .then((resp: AxiosResponse) => {
          dispatch(deleteProductFromCart(itemIndex));
          if (getState().cart.itemsCount === 0) {
            dispatch(deleteCart());
          } else {
            setCartInLocalStorage(getState().cart);
          }
          dispatch(callSuccess());
          resolve();
        })
        .catch(error => {
          dispatch(callFailure());
          reject(error);
        });
      return;
    }
    // user isn't authenticated
    dispatch(deleteProductFromCart(itemIndex));
    if (getState().cart.itemsCount === 0) {
      dispatch(deleteCart());
    } else {
      setCartInLocalStorage(getState().cart);
    }
    resolve();
  });
};

export const increaseQuantity = (productUid: string, cb: () => void): Store.IReduxThunkCb => (
  dispatch,
  getState,
  xShopHeaders,
) => {
  return new Promise((resolve, reject) => {
    const items = getState().cart.items;
    const itemIndex = items.findIndex(element => element.item === productUid);
    if (itemIndex === -1) {
      resolve();
      return;
    }
    const item = items[itemIndex];
    const isAuthenticated = getState().auth.isAuthenticated;
    dispatch(callRequest());
    if (isAuthenticated) {
      const data: Alicanto.API.PUT_CART_CURRENT_ITEMS_ID_BODY = {
        count: item.count + 1,
        item: productUid,
      };
      PUT(
        {
          data,
          url: `${EndpointsConfig.CART_CURRENT_ITEMS}${item.id}`,
        },
        xShopHeaders,
      )
        .then((resp: AxiosResponse) => {
          dispatch(increaseProductQuantity(itemIndex));
          setCartInLocalStorage(getState().cart);
          dispatch(callSuccess());
          resolve();
        })
        .catch(error => {
          dispatch(blockItemIncrease(itemIndex));
          dispatch(callFailure());
          reject(error);
        });
      return;
    }
    // user isn't authenticated
    GET(
      {
        url: `${EndpointsConfig.PRODUCT}${productUid}`,
      },
      xShopHeaders,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_CATALOG_UID_RESPONSE;
        if (item.count + 1 < data.balance || data.is_unlimited) {
          dispatch(increaseProductQuantity(itemIndex));
          setCartInLocalStorage(getState().cart);
          dispatch(callSuccess());
          resolve();
          return;
        }
        const errorMsg = getState().ui.routes.cart.errors.moreThanInBalance.i18n.defaultText;
        return Promise.reject(new BusinessLogicError(errorMsg));
      })
      .catch(error => {
        dispatch(blockItemIncrease(itemIndex));
        dispatch(callFailure());
        reject(error);
      });
  })
    .then(() => {
      if (cb) {
        cb();
      }
    })
    .catch(error => {
      if (cb) {
        cb();
      }
      return Promise.reject(error);
    });
};

export const decreaseQuantity = (productUid: string, cb: () => void): Store.IReduxThunkCb => (
  dispatch,
  getState,
  xShopHeaders,
) => {
  return new Promise((resolve, reject) => {
    const items = getState().cart.items;
    const itemIndex = items.findIndex(element => element.item === productUid);
    if (itemIndex === -1) {
      resolve();
      return;
    }
    const item = items[itemIndex];
    const isAuthenticated = getState().auth.isAuthenticated;
    if (isAuthenticated) {
      dispatch(callRequest());
      const data: Alicanto.API.PUT_CART_CURRENT_ITEMS_ID_BODY = {
        count: item.count - 1,
        item: productUid,
      };
      PUT(
        {
          data,
          url: `${EndpointsConfig.CART_CURRENT_ITEMS}${item.id}`,
        },
        xShopHeaders,
      )
        .then((resp: AxiosResponse) => {
          dispatch(decreaseProductQuantity(itemIndex));
          setCartInLocalStorage(getState().cart);
          dispatch(callSuccess());
          resolve();
        })
        .catch(error => {
          dispatch(callFailure());
          reject(error);
        });
      return;
    }
    // user isn't authenticated
    if (item.count > 1) {
      dispatch(decreaseProductQuantity(itemIndex));
      setCartInLocalStorage(getState().cart);
      resolve();
      return;
    }
    const errorMsg = getState().ui.routes.cart.errors.fewerThanOne.i18n.defaultText;
    const error = new BusinessLogicError(errorMsg);
    reject(error);
  })
    .then(() => {
      if (cb) {
        cb();
      }
    })
    .catch(error => {
      if (cb) {
        cb();
      }
      return Promise.reject(error);
    });
};

export const deleteCart = createAction(`${NS}RESET`);
reducer.on(deleteCart, state => {
  removeCartFromLocalStorage();
  return {
    ...state,
    itemsCount: 0,
    totalPrice: 0,
    items: [],
  };
});

export default reducer;
