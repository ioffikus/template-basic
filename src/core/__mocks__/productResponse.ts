const productResponse = {
  uid: '1925cba433ad44299fdb',
  balance: 0,
  schema_fields: {
    ISBN: { value: '978-0553579901', in_list: false, label: 'ISBN', type: 'string' },
    maxKeys: { value: 4, in_list: false, label: 'maxKeys', type: 'integer' },
    'publishing-date': { value: '2000', in_list: false, label: 'Publishing date', type: 'string' },
    'country-of-publication': { value: '', in_list: false, label: 'Country of Publication', type: 'string' },
    Publisher: { value: 'Bantam', in_list: false, label: 'Publisher', type: 'string' },
    currency: { value: '€', label: 'Валюта', type: 'string' },
    picture_url: {
      value:
        'https://d29vc6x3bmmp7p.cloudfront.net/item_pictures/2017-09-14T194901.55022700002b7db5e1dc434111ac8de14df22fd54c.jpg',
      in_list: false,
      label: 'Picture',
      type: 'string',
    },
    name: { value: 'A Clash of Kings (A Song of Ice and Fire, Book 2)', label: 'Имя', type: 'string' },
    Language: { value: 'English', in_list: false, label: 'Language', type: 'string' },
    licensePeriod: { value: 100, in_list: false, label: 'licensePeriod', type: 'integer' },
    Authors: { value: 'George R. R. Martin', in_list: false, label: 'Authors', type: 'string' },
    in_stock: { value: true, label: 'В продаже', type: 'boolean' },
    'number-of-pages': { value: '1040', in_list: false, label: 'Number of pages', type: 'string' },
    description: {
      value:
        'A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns. Six factions struggle for control of a divided land and the Iron Throne of the Seven Kingdoms, preparing to stake their claims through tempest, turmoil, and war. It is a tale in which brother plots against brother and the dead rise to walk in the night. Here a princess masquerades as an orphan boy; a knight of the mind prepares a poison for a treacherous sorceress; and wild men descend from the Mountains of the Moon to ravage the countryside. Against a backdrop of incest and fratricide, alchemy and murder, victory may go to the men and women possessed of the coldest steel...and the coldest hearts. For when kings clash, the whole land trembles',
      label: 'Описание',
      type: 'text',
    },
    price: { value: 0, label: 'Цена', type: 'decimal' },
  },
  categories: [{ id: 1, uid: '684fc8a84d4b47c7a17c', name: 'Test Category 1' }],
  modifications: [] as any[],
  pictures: [
    {
      id: 2,
      url:
        'https://d29vc6x3bmmp7p.cloudfront.net/item_pictures/2017-09-14T194902.7885710000f3c51d3688db48e48b14316d50674d52.jpg',
      is_main: false,
      width: 550,
      height: 880,
      alt: '',
    },
    {
      id: 1,
      url:
        'https://d29vc6x3bmmp7p.cloudfront.net/item_pictures/2017-09-14T194901.55022700002b7db5e1dc434111ac8de14df22fd54c.jpg',
      is_main: true,
      width: 925,
      height: 1507,
      alt: '',
    },
  ],
  is_unlimited: true,
  was_acquired_before: false,
  is_bundle: false,
  bundle_content: [] as any[],
};

export default productResponse;
