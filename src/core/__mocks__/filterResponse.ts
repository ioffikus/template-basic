const results = [
  {
    label: 'Prices',
    field_slug: 'price__range',
    widget_name: 'RangeSlider',
    filter_type: 'range',
    value_type: 'decimal',
  },
  {
    label: 'Include subcategories',
    field_slug: 'include_subcategories__eq',
    widget_name: 'Switch',
    filter_type: 'eq',
    value_type: 'boolean',
  },
  {
    label: 'In Stock',
    field_slug: 'in_stock__eq',
    widget_name: 'BoolNull',
    filter_type: 'eq',
    value_type: 'boolean',
  },
  {
    label: 'Categories',
    field_slug: 'categories__in',
    widget_name: 'List',
    filter_type: 'in',
    value_type: 'integer',
  },
];

const count = 4;

const filterResponse = {
  count,
  results,
  next: null as string,
  previous: null as string,
};

export default filterResponse;
