test('test', () => {
  expect(true).toBe(true);
});

// WIP

// import React from 'react';
// import renderer from 'react-test-renderer';
// import axios from 'axios';
// import AxiosMockAdapter from 'axios-mock-adapter';

// import SvgSprite, { svgSpriteSrc } from './../Sprite';

// const mock = new AxiosMockAdapter(axios);

// test('Svg_Sprite renders correctly', () => {
//   beforeEach(() => {
//     mock.reset();
//   });

//   mock.onGet(svgSpriteSrc).reply(200, '<svg></svg>');

//   const tree = renderer.create(<SvgSprite />);

//   expect(tree.toJSON()).toMatchSnapshot();
// });
