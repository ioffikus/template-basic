import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import dispatch from 'src/store/dispatch';
import { IUserDeliveryState, set } from 'src/ducks/userDelivery';
import MainForm from './MainForm';

interface IOwnProps {
  prevStep: () => void;
  nextStep: () => void;
}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  initialValues: IUserDeliveryState;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isRequesting: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
  initialValues: state.userDelivery,
});

const WrappedDelivery = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Delivery extends React.Component<IProps, IState> {
    timerId: number;
    submitButton: HTMLButtonElement;

    state: IState = {
      isRequesting: false, // TODO ch1421
    };

    submitButtonRef = (submitButton: HTMLButtonElement) => {
      this.submitButton = submitButton;
    };

    handleNextClick = () => {
      this.submitButton.click();
    };

    handleSubmit = (values: IUserDeliveryState) => {
      // TODO ch1421
      this.setState({
        isRequesting: true,
      });
      if (process.env.BROWSER) {
        this.timerId = window.setTimeout(() => {
          this.setState({
            isRequesting: false,
          });
          dispatch(set(values));
          this.props.nextStep();
        }, 2000);
      }
    };

    componentWillUnmount() {
      if (process.env.BROWSER && this.timerId) {
        window.clearTimeout(this.timerId);
      }
    }

    render() {
      const buttonsUI = this.props.ui.common.buttons;
      return (
        <div>
          <MainForm
            onSubmit={this.handleSubmit}
            ui={this.props.ui}
            submitButtonRef={this.submitButtonRef}
            initialValues={this.props.initialValues}
            isRequesting={this.state.isRequesting}
          />
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="primary" size="large" ghost onClick={this.props.prevStep}>
                {buttonsUI.prevStep.i18n.defaultText}
              </Button>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={this.handleNextClick}>
                {buttonsUI.nextStep.i18n.defaultText}
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
  },
);

export default WrappedDelivery;
