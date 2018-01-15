import { ICatalogQueryState } from 'src/ducks/catalogQuery';

const state: ICatalogQueryState = {
  search: '',
  filterObj: {
    categories__in: [37],
    include_subcategories__eq: true,
    in_stock__eq: true,
    price__range: [100, 250],
  } as {},
  page: '1',
  pageSize: '12',
  ordering: '',
};

export default state;
