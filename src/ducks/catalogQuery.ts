import { createAction, createReducer } from 'redux-act';
import queryString from 'query-string';
import _ from 'lodash';
import { safelyParseJSON } from 'src/helpers/safelyParseJSON';
import { IObject } from 'src/core/interfaces/IObject';

export const REDUCER = 'CATALOG_QUERY';
const NS = `${REDUCER}__`;

export interface ICatalogQueryState {
  search: string;
  page: string;
  pageSize: string;
  ordering: string;
  filterObj: IObject<Alicanto.API.CatalogFilter>;
}

export const initialState: ICatalogQueryState = {
  search: '',
  page: '1',
  pageSize: '12',
  ordering: '',
  filterObj: {},
};

const reducer = createReducer<ICatalogQueryState>({}, initialState);

const set = createAction<ICatalogQueryState>(`${NS}SET`);
reducer.on(set, (state, { search, page, pageSize, ordering, filterObj }) => ({
  ...state,
  search,
  page,
  pageSize,
  ordering,
  filterObj: { ...filterObj },
}));

export const getCatalogQuery = (): Store.IReduxThunkCb => (dispatch, getState) => {
  const router = getState().router;
  const query = queryString.parse(router.location.search);
  const search = _.get(query, 'search', initialState.search);
  const page = _.get(query, 'page', initialState.page);
  const pageSize = _.get(query, 'page_size', initialState.pageSize);
  const ordering = _.get(query, 'ordering', initialState.ordering);
  const filterStr = _.get(query, 'filter', null);
  const filterObj = safelyParseJSON(filterStr) || {};
  dispatch(set({ search, page, pageSize, ordering, filterObj }));
  return Promise.resolve();
};

export default reducer;
