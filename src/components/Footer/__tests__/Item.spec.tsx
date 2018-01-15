import React from 'react';
import { shallow } from 'enzyme';
import uiMockStore from 'src/store/__mocks__/uiStore';
import Item from '../Item';

describe(null, () => {
  it('render() correctly', () => {
    const title = uiMockStore.common.footerLinks.items.about.title.i18n.defaultText;
    const linksWithRelativePath = uiMockStore.common.footerLinks.items.about.links;
    const linksWithAbsolutePath = {
      'https://test.com': {
        title: {
          i18n: {
            defaultText: 'Test title',
            description: 'Test title discription',
          },
        },
        text: {
          i18n: {
            defaultText: 'Test text',
            description: 'Test text discription',
          },
        },
      },
    };
    const links = { ...linksWithRelativePath, ...linksWithAbsolutePath };
    const wrapper = shallow(<Item title={title} links={links} />);
    expect(wrapper).toMatchSnapshot();
  });
});
