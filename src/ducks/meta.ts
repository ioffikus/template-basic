import { createAction, createReducer } from 'redux-act';
import { matchPath } from 'react-router';
import _ from 'lodash';

export const REDUCER = 'META';
const NS = `${REDUCER}__`;

export interface IMetaState extends Alicanto.Models.Meta {}

export const initialState: IMetaState = {
  title: 'title',
  description: 'description',
  keywords: 'keywords',
};

const reducer = createReducer<IMetaState>({}, initialState);

const reset = createAction(`${NS}RESET`);
reducer.on(reset, state => ({
  ...initialState,
}));

export const setMeta = createAction<Alicanto.Models.Meta>(`${NS}SET_META`);
reducer.on(setMeta, (state, { title, description, keywords }) => ({
  ...state,
  title,
  description,
  keywords,
}));

const getMetaByPath = (pathname: string, routes: Alicanto.Models.Routes) => {
  let result: Alicanto.Models.Meta = null;
  Object.keys(routes).find(key => {
    const route = routes[key];
    if (route.meta) {
      const match = matchPath(pathname, { path: key, exact: true });
      if (!_.isNull(match)) {
        result = route.meta;
        return true;
      }
    }
    if (route.routes) {
      const children = getMetaByPath(pathname, route.routes);
      if (children) {
        result = children;
        return true;
      }
    }
  });
  return result;
};

export const getMeta = (abortToken: string): Store.IReduxThunkCb => (dispatch, getState, xShopHeaders) => {
  return new Promise((resolve, reject) => {
    const router = getState().router;
    const routes = getState().routes;
    const meta = getMetaByPath(router.location.pathname, routes);
    if (meta && meta.isLoadable) {
      // WIP for use EndpointsConfig.SEO
      // dispatch(callRequest());
      // GET(
      //   {
      //     url: `${EndpointsConfig.SEO}?path=${router.location.pathname}`,
      //   },
      //   xShopHeaders,
      //   abortToken,
      // )
      //   .then((resp: AxiosResponse) => {
      //     const data = resp.data as Alicanto.API.GET_SEO_DATA_RESPONSE;
      //     dispatch(setMeta(data));
      //     dispatch(callSuccess());
      //     resolve();
      //   })
      //   .catch(error => {
      //     console.log('error:', error);
      //     dispatch(callFailure());
      //     reject(error);
      //   });
      resolve();
      return;
    }
    if (meta && !meta.isLoadable) {
      dispatch(setMeta(meta as Alicanto.Models.Meta));
      resolve();
      return;
    }
    dispatch(reset());
    resolve();
  });
};

export default reducer;
