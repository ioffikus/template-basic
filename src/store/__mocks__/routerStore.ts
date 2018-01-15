import { RouterState } from 'connected-react-router';

export const stateWithFullFilterSearch: RouterState = {
  location: {
    pathname: '/',
    search:
      'filter=%7B%22categories__in%22%3A%5B37%5D%2C%22include_subcategories__eq%22%3Atrue%2C%22in_stock__eq%22%3Atrue%2C%22price__range%22%3A%5B100%2C250%5D%7D',
    hash: '',
    key: 'dummy',
  },
  action: 'POP',
};

export const stateWithSwitchSearch: RouterState = {
  location: {
    pathname: '/',
    search: 'filter=%7B%22include_subcategories__eq%22%3Atrue%7D',
    hash: '',
    key: 'dummy',
  },
  action: 'POP',
};

const state: RouterState = {
  location: {
    pathname: '/',
    search: '',
    hash: '',
    key: 'dummy',
  },
  action: 'POP',
};

export default state;
