import { ICartState } from 'src/ducks/cart';

const cartItems = [
  {
    id: 37,
    item: '92c0d3cfa48940568421',
    uid: '92c0d3cfa48940568421',
    modified: '2017-12-05T09:21:57.905911Z',
    count: 1,
    in_stock: true,
    is_deleted: false,
    schema_fields: {
      short_description: { type: 'text', value: 'ePub version of Star', label: 'Краткое описание' },
      picture_url: { type: 'string', value: '', label: 'Картинка' },
      currency: { type: 'string', value: '€', label: 'Валюта' },
      price: { type: 'decimal', value: 0, label: 'Цена' },
      name: { type: 'string', value: 'Starship Troopers. ePub. Free!', label: 'Имя' },
      author: { type: 'string', in_list: true, value: 'Robert A. Heinlein', label: 'Author' },
    },
  },
  {
    id: 36,
    item: 'ba1d54813e9b410aa1ea',
    uid: 'ba1d54813e9b410aa1ea',
    modified: '2017-12-05T09:21:57.894769Z',
    count: 1,
    in_stock: true,
    is_deleted: false,
    schema_fields: {
      short_description: { type: 'text', value: 'ePub version of Star', label: 'Краткое описание' },
      picture_url: { type: 'string', value: '', label: 'Картинка' },
      currency: { type: 'string', value: '€', label: 'Валюта' },
      price: { type: 'decimal', value: 14, label: 'Цена' },
      name: { type: 'string', value: 'Starship Troopers. ePub ru', label: 'Имя' },
      author: { type: 'string', in_list: true, value: 'Robert A. Heinlein', label: 'Author' },
    },
  },
  {
    id: 35,
    item: 'd6186dc8f72f4c9b932f',
    uid: 'd6186dc8f72f4c9b932f',
    modified: '2017-12-05T09:21:57.882487Z',
    count: 1,
    in_stock: true,
    is_deleted: false,
    schema_fields: {
      short_description: { type: 'text', value: 'PDF version of Stars', label: 'Краткое описание' },
      picture_url: { type: 'string', value: '', label: 'Картинка' },
      currency: { type: 'string', value: '€', label: 'Валюта' },
      price: { type: 'decimal', value: 11, label: 'Цена' },
      name: { type: 'string', value: 'Starship Troopers. PDF ru', label: 'Имя' },
      author: { type: 'string', in_list: true, value: 'Robert A. Heinlein', label: 'Author' },
    },
  },
];

const state: ICartState = {
  id: 9,
  items: cartItems,
  itemsCount: 3,
  totalPrice: 25,
  isRequestError: false,
  isRequesting: false,
};

export default state;
