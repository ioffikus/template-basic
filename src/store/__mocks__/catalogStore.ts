import { ICatalogState } from 'src/ducks/catalog';

const state: ICatalogState = {
  count: 18,
  next: 'http://api.agg.loc:8000/v1/shop/catalog/?page=2&page_size=12',
  previous: null,
  isRequesting: false,
  isRequestError: false,
  results: [
    {
      uid: 'fd8290bb18b94d4f92bd',
      schema_fields: {
        description: {
          value: `The Dursleys were so mean that hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike.\n\nAnd strike it does. For in Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockheart, a spirit named Moaning Myrtle who haunts the girls' bathroom, and the unwanted attentions of Ron Weasley's younger sister, Ginny.\n\nBut each of these seem minor annoyances when the real trouble begins, and someone--or something--starts turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possibly be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects...Harry Potter himself?`,
          type: 'text',
          label: 'Description',
        },
        name: { value: 'Harry Potter And The Chamber Of Secrets', type: 'string', label: 'Name' },
        price: { value: 0, type: 'decimal', label: 'Price' },
        currency: { value: '€', type: 'string', label: 'Currency' },
        short_description: {
          value: 'The Dursleys were so mean that hideous that summer that all Harry Potter wanted was to get back to t',
          type: 'text',
          label: 'Short description',
        },
        picture_url: {
          value:
            'http://localhost:8000/media/item_pictures/2017-12-14T140830.6043220000a070b944029443f28dfc0fe9288b9490.jpg',
          type: 'string',
          label: 'Picture',
        },
      },
      was_acquired_before: false,
      is_bundle: false,
    },
    {
      uid: 'a3a4c9eb7a514e53b065',
      schema_fields: {
        description: { value: `test item's attrubite`, type: 'text', label: 'Description' },
        name: { value: 'Test Attribute', type: 'string', label: 'Name' },
        price: { value: 0, type: 'decimal', label: 'Price' },
        currency: { value: '€', type: 'string', label: 'Currency' },
        short_description: { value: `test item's attrubite`, type: 'text', label: 'Short description' },
        picture_url: {
          value:
            'http://localhost:8000/media/item_pictures/2017-12-14T140831.29435000007c7dddcbc4ac4874b239e7ffcdb5b3e8.jpg',
          type: 'string',
          label: 'Picture',
        },
      },
      was_acquired_before: false,
      is_bundle: false,
    },
  ],
};

export default state;
