test('test', () => {
  expect(true).toBe(true);
});

// WIP

// import React from 'react';
// import { Provider } from 'react-redux';
// import renderer from 'react-test-renderer';

// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

// import Progress from './../Progress';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// const store = mockStore({
//   progress: {
//     isLoading: false,
//     fillLoad: false,
//   },
//   someStoreObject: {
//     isRequesting: false,
//   },
// });

// test('Progress without loading renders correctly', () => {
//   const tree = renderer
//     .create(
//       <Provider store={store}>
//         <Progress />
//       </Provider>,
//     )
//     .toJSON();

//   expect(tree).toMatchSnapshot();
// });

// // loading starts
// const store2 = mockStore({
//   progress: {
//     isLoading: true,
//     fillLoad: false,
//   },
//   someStoreObject: {
//     isRequesting: false,
//   },
// });

// test('Progress when loading starts renders correctly', () => {
//   const tree = renderer
//     .create(
//       <Provider store={store2}>
//         <Progress />
//       </Provider>,
//     )
//     .toJSON();

//   expect(tree).toMatchSnapshot();
// });

// // fill progress
// const store3 = mockStore({
//   progress: {
//     isLoading: true,
//     fillLoad: true,
//   },
//   someStoreObject: {
//     isRequesting: false,
//   },
// });

// test('Progress after the end of loading renders correctly', () => {
//   const tree = renderer
//     .create(
//       <Provider store={store3}>
//         <Progress />
//       </Provider>,
//     )
//     .toJSON();

//   expect(tree).toMatchSnapshot();
// });
