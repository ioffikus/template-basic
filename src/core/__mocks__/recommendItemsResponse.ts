const recommendItemsResponse = {
  slug: 'recommend_items',
  type: 'items',
  content: [
    {
      uid: '0256e890ee384c4ab463',
      balance: 1,
      schema_fields: {
        isbn: { value: '978-1539996842', in_list: false, label: 'ISBN', type: 'string' },
        name: { type: 'string', label: 'Name', value: 'The war of the worlds. ePub' },
        author: { value: 'H.G. Wells', in_list: true, label: 'Author', type: 'string' },
        ebook_type: { value: 'ePub', in_list: false, label: 'eBook type', type: 'string' },
        picture_url: { type: 'string', label: 'Picture', value: '' },
        in_stock: { type: 'boolean', label: 'In stock', value: true },
        currency: { type: 'string', label: 'Currency', value: '€' },
        description: { type: 'text', label: 'Description', value: 'ePub version of The war of the worlds' },
        price: { type: 'decimal', label: 'Price', value: 4 },
      },
      pictures: [] as {},
      is_unlimited: false,
      was_acquired_before: false,
      is_bundle: false,
      bundle_content: [] as any[],
    },
    {
      uid: '29319e7d6654431687f9',
      balance: 0,
      schema_fields: {
        isbn: { value: '978-1539996842', in_list: false, label: 'ISBN', type: 'string' },
        name: { type: 'string', label: 'Name', value: 'The war of the worlds. ePub. Free!' },
        author: { value: 'H.G. Wells', in_list: true, label: 'Author', type: 'string' },
        ebook_type: { value: 'ePub', in_list: false, label: 'eBook type', type: 'string' },
        picture_url: { type: 'string', label: 'Picture', value: '' },
        in_stock: { type: 'boolean', label: 'In stock', value: true },
        currency: { type: 'string', label: 'Currency', value: '€' },
        description: { type: 'text', label: 'Description', value: 'ePub version of The war of the worlds' },
        price: { type: 'decimal', label: 'Price', value: 0 },
      },
      pictures: [] as {},
      is_unlimited: true,
      was_acquired_before: false,
      is_bundle: false,
      bundle_content: [] as any[],
    },
  ],
};

export default recommendItemsResponse;
