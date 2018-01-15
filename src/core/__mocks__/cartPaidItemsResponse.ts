const cartPaidItemsResponse = {
  count: 1,
  next: null as string,
  previous: null as string,
  results: [
    {
      id: 27,
      item: '74212e0f54674aed8964',
      uid: '74212e0f54674aed8964',
      modified: '2017-10-12T09:43:31.442202Z',
      count: 1,
      in_stock: true,
      is_deleted: false,
      schema_fields: {
        name: { type: 'string', label: 'Name', value: 'bla eng bla' },
        short_description: { type: 'text', label: 'Short description', value: 'english bla bla' },
        price: { type: 'decimal', label: 'Price', value: 0 },
        currency: { type: 'string', label: 'Currency', value: '€' },
        picture_url: {
          type: 'string',
          label: 'Picture',
          value:
            'https://d29vc6x3bmmp7p.cloudfront.net/item_pictures/2017-06-05T072530.24449100008df588254089446ab7a52213a70be4c2.jpg',
        },
      },
      aggregion_catalog_item_url: 'agg://collection/58c6ac00a4c8da4900e9024f/bundle',
    },
    {
      id: 108,
      item: 'a9e71d42bab344c9ba1b',
      uid: 'a9e71d42bab344c9ba1b',
      modified: '2017-11-01T10:17:58.183903Z',
      count: 1,
      in_stock: true,
      is_deleted: false,
      schema_fields: {
        name: { type: 'string', value: 'Eng The Last Wish: Introducing (The Witcher)', label: 'Name' },
        short_description: { type: 'text', value: 'Eng description', label: 'Short description' },
        picture_url: {
          type: 'string',
          value:
            'https://d29vc6x3bmmp7p.cloudfront.net/item_pictures/2017-06-05T072535.7689600000119452d41e8941ee85510e6517050b31.jpg',
          label: 'Picture',
        },
        currency: { type: 'string', value: '€', label: 'Currency' },
        price: { type: 'decimal', value: 0, label: 'Price' },
      },
      aggregion_catalog_item_url: 'agg://collection/58d41d54a3fab345003aee61/bundle',
    },
  ],
};

export default cartPaidItemsResponse;
