import _ from 'lodash';

const getCategoriesPath = (categories: Alicanto.Models.Category[], selectedId: number) => {
  let result: Alicanto.Models.Category[] = [];
  if (!_.isNull(selectedId)) {
    categories.find(category => {
      if (_.isEmpty(category.subcategories)) {
        if (category.id === selectedId) {
          result = [category];
          return true;
        }
      } else {
        const children = getCategoriesPath(category.subcategories, selectedId);
        if (!_.isEmpty(children)) {
          result = [category, ...children];
          return true;
        }
      }
      return false;
    });
  }
  return result;
};

export default getCategoriesPath;
