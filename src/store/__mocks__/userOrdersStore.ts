import { IUserOrdersState } from 'src/ducks/userOrders';

export const initialState: IUserOrdersState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  currentPaymentId: null,
  isRequestError: false,
  isRequesting: false,
};

const userOrderItems = [
  {
    id: 26,
    cart: {
      id: 33,
      total: 0.02,
      modified: '2017-12-15T11:23:29.178841Z',
      items: [
        {
          id: 83,
          uid: '3cf12d0021c3438c9d43',
          modified: '2017-12-15T11:23:43.370090Z',
          count: 2,
          in_stock: true,
          is_deleted: false,
          schema_fields: {
            description: {
              value:
                'The New York Times bestselling series that inspired the international hit video game: The Witcher.\n\nGeralt is a witcher, a man whose magic powers, enhanced by long training and a mysterious elixir, have made him a brilliant fighter and a merciless assassin. Yet he is no ordinary murderer: his targets are the multifarious monsters and vile fiends that ravage the land and attack the innocent. \n\nThis is a collection of short stories, following the adventures of the hit collection THE LAST WISH. Join Geralt as he battles monsters, demons and prejudices alike...\n\nWitcher collections\nThe Last Wish\nSword of Destiny\n\nWitcher novels\nBlood of Elves \nThe Time of Contempt\nBaptism of Fire\nThe Tower of Swallows\nLady of the Lake\n\nThe Malady and Other Stories: An Andrzej Sapkowski Sampler (e-only)\n\n\nTranslated from original Polish by David French',
              type: 'text',
              label: 'Описание',
            },
            name: { value: 'Sword of Destiny (The Witcher)', type: 'string', label: 'Имя' },
            price: { value: 0.01, type: 'decimal', label: 'Цена' },
            currency: { value: '$', type: 'string', label: 'Валюта' },
            short_description: {
              value:
                'The New York Times bestselling series that inspired the international hit video game: The Witcher.\n\n',
              type: 'text',
              label: 'Краткое описание',
            },
            picture_url: {
              value:
                'http://localhost:8000/media/item_pictures/2017-12-14T140837.2674370000dc74b408d40b4b7783ee3232c6554960.jpg',
              type: 'string',
              label: 'Картинка',
            },
          },
        },
      ],
      items_count: 2,
    },
    status: 'подтвержден',
    transaction_status: '',
    transaction_details: '',
    is_paid: false,
    created: '2017-12-15T11:28:46.314808Z',
    modified: '2017-12-15T11:28:46.351196Z',
  },
  {
    id: 25,
    cart: {
      id: 32,
      total: 0,
      modified: '2017-12-15T10:13:36.737706Z',
      items: [
        {
          id: 82,
          uid: '5929a9e26a654ff785f5',
          modified: '2017-12-15T11:23:21.985610Z',
          count: 1,
          in_stock: true,
          is_deleted: false,
          schema_fields: {
            description: {
              value: `The New York Times bestselling series that inspired the international hit video game: The Witcher.\n\nFor over a century, humans, dwarves, gnomes, and elves have lived together in relative peace. But times have changed, the uneasy peace is over, and now the races are fighting once again. The only good elf, it seems, is a dead elf.\n\nGeralt of Rivia, the cunning assassin known as The Witcher, has been waiting for the birth of a prophesied child. This child has the power to change the world - for good, or for evil.\n\nAs the threat of war hangs over the land and the child is hunted for her extraordinary powers, it will become Geralt's responsibility to protect them all - and the Witcher never accepts defeat.\n\nBlood of Elves is the first full-length Witcher novel, and the perfect follow up if you've read The Last Wish collection.\n\n\nWitcher novels\nBlood of Elves \nThe Time of Contempt\nBaptism of Fire\nThe Tower of Swallows\nLady of the Lake\n\nWitcher collections\nThe Last Wish\nSword of Destiny\n\nThe Malady and Other Stories: An Andrzej Sapkowski Sampler (e-only)\n\n\nTranslated from original Polish by Danusia Stok`,
              type: 'text',
              label: 'Описание',
            },
            name: { value: 'Blood of Elves (The Witcher)', type: 'string', label: 'Имя' },
            price: { value: 0, type: 'decimal', label: 'Цена' },
            short_description: {
              value:
                'The New York Times bestselling series that inspired the international hit video game: The Witcher.\n\n',
              type: 'text',
              label: 'Краткое описание',
            },
            currency: { value: '€', type: 'string', label: 'Валюта' },
            picture_url: {
              value:
                'http://localhost:8000/media/item_pictures/2017-12-14T140838.10681000001414d5bc0446468394bf70a70a0ed503.jpg',
              type: 'string',
              label: 'Картинка',
            },
          },
        },
      ],
      items_count: 1,
    },
    status: 'оплачен',
    transaction_status: '',
    transaction_details: '',
    is_paid: true,
    created: '2017-12-15T11:23:29.132620Z',
    modified: '2017-12-15T11:23:29.234609Z',
  },
];

const state: IUserOrdersState = {
  count: 2,
  next: null,
  previous: null,
  results: userOrderItems,
  currentPaymentId: null,
  isRequestError: false,
  isRequesting: false,
};

export default state;
