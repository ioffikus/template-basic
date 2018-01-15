import { IProductState } from 'src/ducks/product';

const state: IProductState = {
  id: null,
  uid: '7c7f40f7412c4a3f8571',
  schema_fields: {
    description: {
      label: 'Описание',
      type: 'text',
      value: 'PDF version of Starship Troopers ru',
    },
    shop_url: {
      label: 'Current Shop URL',
      type: 'url',
      value: 'template-basic.agg.loc',
      in_list: false,
    },
    author: {
      label: 'Автор',
      type: 'string',
      value: 'Robert A. Heinlein',
      in_list: true,
    },
    price: {
      label: 'Цена',
      type: 'decimal',
      value: 18,
    },
    name: {
      label: 'Имя',
      type: 'string',
      value: 'Starship Troopers. PDF ru',
    },
    picture_url: {
      label: 'Картинка',
      type: 'string',
      value: '',
    },
    currency: {
      label: 'Валюта',
      type: 'string',
      value: '€',
    },
    isbn: {
      label: 'ISBN',
      type: 'string',
      value: '978-0441783588',
      in_list: false,
    },
    in_stock: {
      label: 'В продаже',
      type: 'boolean',
      value: true,
    },
    ebook_type: {
      label: 'Тип eBook',
      type: 'string',
      value: 'PDF',
      in_list: false,
    },
  },
  categories: [
    {
      id: 115,
      uid: '7911d4c525c74c889309',
      name: 'books',
      subcategories: [
        {
          id: 116,
          uid: 'da26e5a32a12405f456',
          name: 'Books',
        },
      ],
    },
    {
      id: 117,
      uid: 'da26e5a32a12405a9a54',
      name: 'eBooks',
    },
    {
      id: 118,
      uid: 'c55784279bc64422aeaf',
      name: 'PDF',
    },
    {
      id: 81,
      uid: '13be1baa4e084ebfa207',
      name: 'Speculative fiction',
    },
    {
      id: 82,
      uid: '00643bfe21a148b485ca',
      name: 'Science fiction',
    },
  ],
  modifications: [
    {
      uid: '58738032e7e0461ca6bb',
      schema_fields: {
        description: {
          label: 'Описание',
          type: 'text',
          value: 'ePub version of Starship Troopers ru',
        },
        picture_url: {
          label: 'Картинка',
          type: 'string',
          value: 'http://localhost:8000/media/item_pictures/5dfa12910c67429db0c9.png',
        },
        name: {
          label: 'Имя',
          type: 'string',
          value: 'Starship Troopers. ePub ru',
        },
        price: {
          label: 'Цена',
          type: 'decimal',
          value: 12,
        },
        currency: {
          label: 'Валюта',
          type: 'string',
          value: '€',
        },
        short_description: {
          label: 'Краткое описание',
          type: 'text',
          value: 'ePub version of Starship Troopers ru',
        },
      },
    },
    {
      uid: 'c1b2170baf484f548362',
      schema_fields: {
        description: {
          label: 'Описание',
          type: 'text',
          value: 'Kindle version of Starship Troopers ru',
        },
        picture_url: {
          label: 'Картинка',
          type: 'string',
          value: '',
        },
        name: {
          label: 'Имя',
          type: 'string',
          value: 'Starship Troopers. Kindle ru',
        },
        price: {
          label: 'Цена',
          type: 'decimal',
          value: 9,
        },
        currency: {
          label: 'Валюта',
          type: 'string',
          value: '€',
        },
        short_description: {
          label: 'Краткое описание',
          type: 'text',
          value: 'Kindle version of Starship Troopers ru',
        },
      },
    },
    {
      uid: '5a8343812fd1403aa95f',
      schema_fields: {
        description: {
          label: 'Описание',
          type: 'text',
          value: 'ePub version of Starship Troopers',
        },
        picture_url: {
          label: 'Картинка',
          type: 'string',
          value: '',
        },
        name: {
          label: 'Имя',
          type: 'string',
          value: 'Starship Troopers. ePub. Free!',
        },
        price: {
          label: 'Цена',
          type: 'decimal',
          value: 0,
        },
        currency: {
          label: 'Валюта',
          type: 'string',
          value: '€',
        },
        short_description: {
          label: 'Краткое описание',
          type: 'text',
          value: 'ePub version of Starship Troopers',
        },
      },
    },
    {
      uid: '717b27127f7449dd9631',
      schema_fields: {
        description: {
          label: 'Описание',
          type: 'text',
          value: 'PDF version of Starship Troopers',
        },
        picture_url: {
          label: 'Картинка',
          type: 'string',
          value: '',
        },
        name: {
          label: 'Имя',
          type: 'string',
          value: 'Starship Troopers. PDF. Free!',
        },
        price: {
          label: 'Цена',
          type: 'decimal',
          value: 0,
        },
        currency: {
          label: 'Валюта',
          type: 'string',
          value: '€',
        },
        short_description: {
          label: 'Краткое описание',
          type: 'text',
          value: 'PDF version of Starship Troopers',
        },
      },
    },
    {
      uid: '73f09f43bfde4b669c96',
      schema_fields: {
        description: {
          label: 'Описание',
          type: 'text',
          value: 'Kindle version of Starship Troopers',
        },
        picture_url: {
          label: 'Картинка',
          type: 'string',
          value: '',
        },
        name: {
          label: 'Имя',
          type: 'string',
          value: 'Starship Troopers. Kindle. Free!',
        },
        price: {
          label: 'Цена',
          type: 'decimal',
          value: 0,
        },
        currency: {
          label: 'Валюта',
          type: 'string',
          value: '€',
        },
        short_description: {
          label: 'Краткое описание',
          type: 'text',
          value: 'Kindle version of Starship Troopers',
        },
      },
    },
  ],
  isRequesting: false,
  isRequestError: false,
  is_unlimited: false,
  balance: 1,
  pictures: [] as any,
  was_acquired_before: false,
  is_bundle: false,
  bundle_content: [] as any,
};

export default state;
