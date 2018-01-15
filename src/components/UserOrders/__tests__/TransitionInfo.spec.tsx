import React from 'react';
import { shallow } from 'enzyme';
import uiStateMock from 'src/store/__mocks__/uiStore';
import TransactionInfo from '../TransactionInfo';

describe(null, () => {
  it('render() correct with status and details', () => {
    const status = 'dymmy status';
    const details = 'dymmy details';
    const wrapper = shallow(<TransactionInfo status={status} details={details} ui={uiStateMock} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with status and empty details', () => {
    const status = 'dymmy status';
    const details = '';
    const wrapper = shallow(<TransactionInfo status={status} details={details} ui={uiStateMock} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with details and empty status', () => {
    const status = '';
    const details = 'dymmy details';
    const wrapper = shallow(<TransactionInfo status={status} details={details} ui={uiStateMock} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with empty status and details', () => {
    const status = '';
    const details = '';
    const wrapper = shallow(<TransactionInfo status={status} details={details} ui={uiStateMock} />);
    expect(wrapper).toMatchSnapshot();
  });
});
