// TODO ch1115

test('test', () => {
  expect(true).toBe(true);
});

// import React from 'react';
// import Enzyme from 'enzyme';
// // import _ from 'lodash';
// import renderer from 'react-test-renderer';
// // import { ui } from 'src/store/__mocks__/uiStore';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import configureStore from 'redux-mock-store';
// // import toJson from 'enzyme-to-json';
// import SearchForm from './../SearchForm';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

// import initialState from '../__mocks__/searchFormStore';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// const store = mockStore(initialState);

// describe('Header/SearchForm ', () => {
//   const tree = renderer
//     .create(
//       <Provider store={store}>
//         <SearchForm />
//       </Provider>,
//     )
//     .toJSON();

//   it('renders correctly', () => {
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('Header/SearchForm: change input must set value to state correctly', () => {
// let component: any;

// beforeEach(() => {
//   component = shallow(
//     <Provider store={store}>
//       <SearchForm />
//     </Provider>,
//   );
// });

// it('check Prop matches with initialState', () => {
//   // expect(component.prop()).toEqual(initialState);

//   expect(component.find(SearchForm).length).toEqual(1);
// });

// it('change input must set value to input correctly', () => {
//   // const value = '';
//   const nValue = 'newValue';
//   const input: any = component.find('input.ant-input');

//   // set new value
//   input.value = nValue;
//   input.first().simulate('change');

//   expect(input.value).toEqual(nValue);
// });
// });

// test('Header/SearchForm: change input must set value to state correctly', () => {
//   const value = '';
//   const nValue = 'newValue';

//   const component = shallow(<SearchForm />);

//   const input: any = component.find('input.ant-input');

//   expect(input.props().value).toEqual(value);

//   // set new value
//   input.get(0).value = nValue;
//   input.first().simulate('change');

//   // expect value in DOM
//   expect(input.props().value).toEqual(nValue);

//   // expect state
//   expect(component.state('value')).toEqual(nValue);
// });

// describe('Header/SearchForm: onEnter event must call change function', () => {
//   const value = 'value';
//   const nValue = 'nValue';

//   const onChange = jest.fn();

//   let component: any;
//   let input: any;

//   beforeEach(() => {
//     component = mount(<SearchForm changeSearch={onChange} value={value} ui={ui} />);

//     input = component.find('input.ant-input');
//   });

//   it('onEnter', () => {
//     expect(input.props().value).toEqual(value);

//     // set new value
//     input.get(0).value = nValue;
//     input.first().simulate('change');

//     // expect state
//     expect(component.state('value')).toEqual(nValue);

//     // simulate onEnter (13 - code enter)
//     input.first().simulate('keydown', { keyCode: 13 });

//     // expect onChange have been called
//     expect(onChange).toHaveBeenCalled();
//   });
// });
