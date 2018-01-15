import { ICategoriesState } from 'src/ducks/categories';

const state: ICategoriesState = {
  count: 4,
  next: null,
  previous: null,
  results: [
    { id: 23, uid: 'ea5df20e3931427cb99c', name: 'Adventure novel', subcategories: [] },
    { id: 29, uid: 'd885180b23f244a69a89', name: 'Biography', subcategories: [] },
    {
      id: 35,
      uid: '92119eb7735b4264941e',
      name: 'books',
      subcategories: [
        { id: 37, uid: '85c83507b7934ccd9cfc', name: 'eBooks' },
        { id: 36, uid: '12cf4bd873914a148136', name: 'Paperback' },
      ],
    },
    {
      id: 37,
      uid: '85c83507b7934ccd9cfc',
      name: 'eBooks',
      subcategories: [
        { id: 39, uid: '28d264eb09e042aeaabc', name: 'ePub' },
        { id: 40, uid: '3a09f44a3ef9452eb066', name: 'Kindle' },
        { id: 38, uid: 'd534af54d2c549fe950d', name: 'PDF' },
      ],
    },
  ],
  isRequesting: false,
  isRequestError: false,
};

export default state;
