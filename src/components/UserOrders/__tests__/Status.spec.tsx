import React from 'react';
import { shallow } from 'enzyme';
import uiStateMock from 'src/store/__mocks__/uiStore';
import Status from '../Status';

describe(null, () => {
  it('render() correct', () => {
    const status = 'dymmy status';
    const transactionDetails = 'dymmy transactionDetails';
    const transactionStatus = 'dymmy transactionStatus';
    const getRootRef = jest.fn();
    const wrapper = shallow(
      <Status
        status={status}
        transactionDetails={transactionDetails}
        transactionStatus={transactionStatus}
        getRootRef={getRootRef}
        ui={uiStateMock}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
  it('render() without status', () => {
    const status = 'dymmy status';
    const transactionDetails = '';
    const transactionStatus = '';
    const getRootRef = jest.fn();
    const wrapper = shallow(
      <Status
        status={status}
        transactionDetails={transactionDetails}
        transactionStatus={transactionStatus}
        getRootRef={getRootRef}
        ui={uiStateMock}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
