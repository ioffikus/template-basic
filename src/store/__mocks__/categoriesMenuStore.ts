import { ICategoriesMenuState } from 'src/ducks/categoriesMenu';

const state: ICategoriesMenuState = {
  slug: 'categories_menu',
  type: 'categories',
  content: [
    { id: 23, uid: 'ea5df20e3931427cb99c', name: 'Adventure novel', subcategories: [] },
    {
      id: 35,
      uid: '92119eb7735b4264941e',
      name: 'books',
      subcategories: [
        { id: 37, uid: '85c83507b7934ccd9cfc', name: 'eBooks' },
        { id: 36, uid: '12cf4bd873914a148136', name: 'Paperback' },
      ],
    },
    { id: 24, uid: '067cb0091f334853adec', name: 'Brit lit', subcategories: [] },
    { id: 26, uid: '068060f026d846ea9a17', name: 'Literary fiction', subcategories: [] },
  ],
  isRequesting: false,
  isRequestError: false,
};

export default state;
