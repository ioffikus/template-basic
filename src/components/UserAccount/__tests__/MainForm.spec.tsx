import React from 'react';
import { shallow } from 'enzyme';
import { Button, Form } from 'antd';
import { ui } from 'src/store/__mocks__/uiStore';
import MainForm from '../MainForm';

describe(null, () => {
  const fakeEvent = {
    preventDefault: jest.fn(),
  };
  const props = {
    ui,
    onSubmit: jest.fn(),
    user: {
      email: 'test@test.com',
      first_name: 'Ivan',
      last_name: 'Ivanov',
    },
    isRequesting: false,
  };

  it('render() correctly', () => {
    const wrapper = shallow(<MainForm {...props} />);
    const dummyWrapper = wrapper.dive().dive();
    expect(dummyWrapper).toMatchSnapshot();
  });

  it('render spin while requesting', () => {
    const wrapper = shallow(<MainForm {...props} isRequesting={true} />);
    const dummyWrapper = wrapper.dive().dive();
    expect(dummyWrapper).toMatchSnapshot();
  });

  it('form edit mode', () => {
    const wrapper = shallow(<MainForm {...props} />);
    const dummyWrapper = wrapper.dive().dive();
    const buttonInstance = dummyWrapper
      .find(Button)
      .dive()
      .instance() as Button;
    buttonInstance.props.onClick(null);
    expect(dummyWrapper).toMatchSnapshot();
  });

  it('Form.onSubmit()', () => {
    const wrapper = shallow(<MainForm {...props} />);
    const dummyWrapper = wrapper.dive().dive();
    dummyWrapper.setState({ isEditMode: true });
    dummyWrapper.update();
    const formInstance = dummyWrapper
      .find(Form)
      .dive()
      .instance() as Form;
    formInstance.props.onSubmit(fakeEvent as any);
    expect(props.onSubmit).toBeCalled();
  });

  it('form submit button', () => {
    const wrapper = shallow(<MainForm {...props} />);
    const dummyWrapper = wrapper.dive().dive();
    dummyWrapper.setState({ isEditMode: true });
    dummyWrapper.update();
    const saveButtonInstance = dummyWrapper
      .find('.button-save')
      .dive()
      .instance() as Button;
    saveButtonInstance.handleClick(fakeEvent as any);
    expect(props.onSubmit).toBeCalled();
  });
});
