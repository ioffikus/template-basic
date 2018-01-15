import React from 'react';

interface IProps {
  ui: Alicanto.Models.UI;
  details: string;
  status: string;
}

interface IState {}

class TransactionInfo extends React.Component<IProps, IState> {
  render() {
    const transactionUI = this.props.ui.routes.user.orders.transaction;
    const { details, status } = this.props;
    return (
      <div className="root">
        <style jsx>{`
          .root {
            font-size: 10px;
            font-weight: 500;
          }
          .name {
            margin-right: 10px;
            color: #b2bdcb;
            font-size: 9px;
          }
        `}</style>
        {status && (
          <div>
            <span className="name">{transactionUI.status.i18n.defaultText} : </span>
            <span>{status}</span>
          </div>
        )}
        {details && (
          <div>
            <span className="name">{transactionUI.details.i18n.defaultText} : </span>
            <span>{details}</span>
          </div>
        )}
      </div>
    );
  }
}

export default TransactionInfo;
