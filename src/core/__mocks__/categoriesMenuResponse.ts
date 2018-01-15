const categoriesMenuResponse = {
  slug: 'categories_menu',
  type: 'categories',
  content: [
    {
      id: 2,
      uid: '3e6736da4e2c46c48c0c',
      name: 'Science fiction',
      subcategories: [
        {
          id: 3,
          uid: 'fdd18449106641f2a236',
          name: 'Alien invasion',
        },
        {
          id: 5,
          uid: '4c7ed4040e0a4df3986b',
          name: 'Cyberpunk derivatives',
          subcategories: [
            {
              id: 1,
              uid: '5e6736da4e2c46c48c0c',
              name: 'Level 3',
            },
          ],
        },
      ],
    },
    {
      id: 6,
      uid: 'cee8c7fc0ea74215a3bb',
      name: 'Cyberpunk',
      subcategories: [] as {},
    },
  ],
};

export default categoriesMenuResponse;
