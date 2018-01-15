import React from 'react';
import { shallow } from 'enzyme';
import { Form, Input, Button, Spin } from 'antd';
import uiStateMock from 'src/store/__mocks__/uiStore';
import MainForm from '../MainForm';

describe(null, () => {
  console.warn = jest.fn();
  it('render()', () => {
    const dummyWrapper = shallow(<MainForm onSubmit={() => {}} ui={uiStateMock} isRequesting={false} />).dive();
    expect(dummyWrapper.dive()).toMatchSnapshot();
  });
  it('componentDidMount() should be call props.form.validateFields(null)', () => {
    const form = {
      validateFields: jest.fn(),
      getFieldDecorator: () => jest.fn(),
      getFieldsError: () => ({}),
      getFieldError: jest.fn(),
      isFieldTouched: jest.fn(),
    };
    const wrapper = shallow(<MainForm onSubmit={() => {}} ui={uiStateMock} isRequesting={false} />);
    const props = wrapper.props();
    wrapper.setProps({ ...props, form });
    wrapper.dive().dive(); // double dive() if wrapped with Form.create
    expect(form.validateFields).toBeCalledWith(null);
  });
  it('Form.onSubmit() without values', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<MainForm onSubmit={onSubmit} ui={uiStateMock} isRequesting={false} />);
    const dummyWrapper = wrapper.dive().dive(); // double dive() if wrapped with Form.create
    const formInstance = dummyWrapper
      .find(Form)
      .dive()
      .instance() as Form;
    const submitEvent = {
      preventDefault: jest.fn(),
    };
    formInstance.props.onSubmit(submitEvent as any);
    expect(submitEvent.preventDefault).toBeCalled();
    expect(onSubmit).not.toBeCalled();
  });
  it('Form.onSubmit() with values', () => {
    const values = { username: 'dummy username', password: 'dummy password' };
    const onSubmit = jest.fn();
    const wrapper = shallow(<MainForm onSubmit={onSubmit} ui={uiStateMock} isRequesting={false} />);
    const dummyWrapper = wrapper.dive().dive(); // double dive() if wrapped with Form.create
    const usernameInstance = dummyWrapper
      .find('Input#username')
      .dive()
      .instance() as Input;
    usernameInstance.props.onChange({ target: { value: values.username } } as any);
    const passwordInstance = dummyWrapper
      .find('Input#password')
      .dive()
      .instance() as Input;
    passwordInstance.props.onChange({ target: { value: values.password } } as any);
    const formInstance = dummyWrapper
      .find(Form)
      .dive()
      .instance() as Form;
    const submitEvent = {
      preventDefault: jest.fn(),
    };
    formInstance.props.onSubmit(submitEvent as any);
    expect(submitEvent.preventDefault).toBeCalled();
    expect(onSubmit).toBeCalledWith(values);
  });
  it('Button.disabled when Form has error', () => {
    const onSubmit = jest.fn();
    const form = {
      validateFields: jest.fn(),
      getFieldDecorator: () => jest.fn(),
      getFieldsError: () => ({ username: {} }),
      getFieldError: jest.fn(),
      isFieldTouched: jest.fn(),
    };
    const wrapper = shallow(<MainForm onSubmit={onSubmit} ui={uiStateMock} isRequesting={false} />);
    const props = wrapper.props();
    wrapper.setProps({ ...props, form });
    const dummyWrapper = wrapper.dive().dive(); // double dive() if wrapped with Form.create
    const button = dummyWrapper.find(Button);
    const buttonInstance = button.dive().instance() as Button;
    expect(buttonInstance.props.disabled).toBeTruthy();
    button.simulate('click'); // used simulate, because Button doesn't has onClick and buttonInstance doesn't has onClick method too
    expect(onSubmit).not.toBeCalled();
  });
  it('Spin.spinning when isRequesting', () => {
    const wrapper = shallow(<MainForm onSubmit={() => {}} ui={uiStateMock} isRequesting={true} />);
    const dummyWrapper = wrapper.dive().dive(); // double dive() if wrapped with Form.create
    const spinInstance = dummyWrapper
      .find(Spin)
      .dive()
      .instance() as Spin;
    expect(spinInstance.props.spinning).toBeTruthy();
  });
});
