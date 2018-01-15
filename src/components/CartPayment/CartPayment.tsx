import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import MainForm from './MainForm';

interface IOwnProps {
  prevStep: () => void;
}

interface IConnectedState {
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isRequesting: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
});

const WrappedPayment = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Payment extends React.Component<IProps, IState> {
    submitButton: HTMLButtonElement;

    state: IState = {
      isRequesting: false, // TODO ch1421
    };

    submitButtonRef = (submitButton: HTMLButtonElement) => {
      this.submitButton = submitButton;
    };

    handlePayClick = () => {
      this.submitButton.click();
    };

    handleSubmit = (values: any) => {
      // TODO use values [ch1421]
      this.setState({
        isRequesting: true,
      });
      setTimeout(() => {
        this.setState({
          isRequesting: false,
        });
      }, 2000);
    };

    render() {
      const buttonsUI = this.props.ui.common.buttons;
      return (
        <div>
          <MainForm
            onSubmit={this.handleSubmit}
            ui={this.props.ui}
            submitButtonRef={this.submitButtonRef}
            isRequesting={this.state.isRequesting}
          />
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="primary" size="large" ghost onClick={this.props.prevStep}>
                {buttonsUI.prevStep.i18n.defaultText}
              </Button>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={this.handlePayClick}>
                {buttonsUI.pay.i18n.defaultText}
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
  },
);

export default WrappedPayment;
