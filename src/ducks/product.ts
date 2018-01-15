import { createAction, createReducer } from 'redux-act';
import { AxiosResponse } from 'axios';
import { matchPath } from 'react-router';
import _ from 'lodash';
import { GET } from 'src/core/API';
import EndpointsConfig from 'src/configs/endpoints';
import { setMeta } from 'src/ducks/meta';

export const REDUCER = 'PRODUCTS';
const NS = `${REDUCER}__`;

export interface IProductState extends Alicanto.API.GET_CATALOG_UID_RESPONSE, Store.IReduxCommonState {}

export const initialState: IProductState = {
  uid: null,
  id: null,
  is_unlimited: null,
  schema_fields: {},
  categories: null,
  modifications: null,
  pictures: null,
  isRequesting: false,
  isRequestError: false,
};

const reducer = createReducer<IProductState>({}, initialState);

const callSuccess = createAction<Alicanto.API.GET_CATALOG_UID_RESPONSE>(`${NS}CALL_SUCCESS`);
reducer.on(callSuccess, (state, { id, uid, schema_fields, categories, modifications, pictures, is_unlimited }) => ({
  ...state,
  uid,
  id: _.isNil(id) ? null : id,
  is_unlimited: _.isNil(is_unlimited) ? null : is_unlimited,
  schema_fields: { ...schema_fields },
  categories: _.isNil(categories) ? null : [...categories],
  modifications: _.isNil(modifications) ? null : [...modifications],
  pictures: _.isNil(pictures) ? null : [...pictures],
  isRequesting: false,
  isRequestError: false,
}));

const callFailure = createAction(`${NS}CALL_FAILURE`);
reducer.on(callFailure, state => ({
  ...state,
  uid: null,
  id: null,
  is_unlimited: null,
  schema_fields: {},
  categories: null,
  modifications: null,
  pictures: null,
  isRequestError: true,
}));

const callRequest = createAction(`${NS}CALL_REQUEST`);
reducer.on(callRequest, state => ({
  ...state,
  isRequesting: true,
}));

export const getProduct = (abortToken: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest());
    const router = getState().router;
    const match = matchPath(router.location.pathname, { path: '/product/:uid' });
    const uid = _.get(match, 'params.uid', null);
    GET(
      {
        url: `${EndpointsConfig.PRODUCT}${uid}`,
      },
      xShopHeaders,
      abortToken,
    )
      .then((resp: AxiosResponse) => {
        const data = resp.data as Alicanto.API.GET_CATALOG_UID_RESPONSE;
        dispatch(callSuccess(data));
        resolve();
      })
      .catch(error => {
        dispatch(callFailure());
        reject(error);
      });
  }).then(() => {
    const schemaFields = getState().product.schema_fields;
    const name = _.get(schemaFields, 'name.value', '');
    const description = _.get(schemaFields, 'description.value', '');
    dispatch(setMeta({ description, title: name, keywords: `${name} ${description}` }));
  });
};

export default reducer;
