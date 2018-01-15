import React from 'react';
import { Popover } from 'antd';
import TransactionInfo from './TransactionInfo';

interface IProps {
  status: string;
  transactionDetails: string;
  transactionStatus: string;
  ui: Alicanto.Models.UI;
  getRootRef: () => HTMLElement;
}

interface IState {}

class Status extends React.Component<IProps, IState> {
  render() {
    const { status, transactionDetails, transactionStatus, getRootRef, ui } = this.props;
    const isTransaction = transactionDetails || transactionStatus;
    return (
      <div className="root">
        <style jsx>{`
          .root :global(.icon) {
            width: 17px;
            height: 17px;
            text-align: center;
            margin: 0 10px;
            display: inline-block;
            font-size: 0.8em;
            font-weight: bold;
            background-color: #e5ecf4;
            border-radius: 50%;
            cursor: pointer;
          }
        `}</style>
        {`Status: ${status}`}
        {isTransaction && (
          <Popover
            overlayClassName="status-popover"
            getPopupContainer={getRootRef}
            content={<TransactionInfo ui={ui} details={transactionDetails} status={transactionStatus} />}
          >
            <span className="icon">i</span>
          </Popover>
        )}
      </div>
    );
  }
}

export default Status;
