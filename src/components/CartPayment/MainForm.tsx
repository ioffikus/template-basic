import React from 'react';
import { Spin, Row, Col, Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IOwnProps {
  ui: Alicanto.Models.UI;
  onSubmit: (values: any) => void;
  submitButtonRef: (submitButton: HTMLButtonElement) => void;
  isRequesting: boolean;
}

interface IFormProps {
  form: WrappedFormUtils;
}

type IProps = IOwnProps & IFormProps;

interface IState {}

const WrappedMainForm = Form.create<IOwnProps>()(
  class MainForm extends React.Component<IProps, IState> {
    handleSubmit = (event: React.SyntheticEvent<any>) => {
      event.preventDefault();
      this.props.form.validateFieldsAndScroll((error: any, values: any) => {
        if (!error) {
          console.info('Payment done');
          this.props.onSubmit(values);
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const inputsUI = this.props.ui.routes.cart.paymentForm.inputs;
      const validationUI = this.props.ui.common.forms.validation;
      return (
        <div className="root">
          <style jsx>{`
            .cart-info {
              display: flex;
              padding-bottom: 10px;
              margin-bottom: 21px;
            }
            .cart {
              position: relative;
              flex-basis: 50%;
              padding: 32px;
              border-radius: 32px;
              background-color: #ffffff;
            }
            .front {
              transform: translateX(25%);
              z-index: 2;
              box-shadow: 0 2px 16px 0 rgba(36, 103, 164, 0.18);
            }
            .back {
              transform: translateX(-25%);
              z-index: 1;
              display: flex;
              align-items: flex-end;
            }
            .cart-inner {
              width: 100%;
            }
            .root :global(.no-margin-bottom) {
              margin-bottom: 0;
            }
            .label {
              padding-top: 14px;
              color: #a7b4c3;
              font-size: 14px;
              text-transform: uppercase;
            }
            .root :global(.ant-input::placeholder) {
              text-transform: uppercase;
            }
            .submit-button {
              display: none;
            }
          `}</style>
          <Spin spinning={this.props.isRequesting}>
            <Form onSubmit={this.handleSubmit}>
              <button tabIndex={-1} type="submit" className="submit-button" ref={this.props.submitButtonRef} />
              <div className="cart-info">
                <div className="cart front">
                  <Row>
                    <Form.Item>
                      {getFieldDecorator('cartNumber', {
                        rules: [
                          {
                            required: true,
                            message: validationUI.notEmpty.i18n.defaultText,
                          },
                        ],
                      })(<Input size="large" placeholder={inputsUI.cardNumber.i18n.defaultText} />)}
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item>
                      {getFieldDecorator('cardholder', {
                        rules: [
                          {
                            required: true,
                            message: validationUI.cardNumber.i18n.defaultText,
                          },
                        ],
                      })(<Input size="large" placeholder={inputsUI.cardholderName.i18n.defaultText} />)}
                    </Form.Item>
                  </Row>
                  <Row type="flex" justify="end" gutter={16}>
                    <Col>
                      <div className="label">{this.props.ui.routes.cart.paymentForm.label.i18n.defaultText}</div>
                    </Col>
                    <Col span={7}>
                      <Form.Item className="no-margin-bottom">
                        {getFieldDecorator('cartMonth', {
                          rules: [
                            {
                              required: true,
                              message: validationUI.expDate.i18n.defaultText,
                            },
                          ],
                        })(<Input size="large" placeholder={inputsUI.expDatePlaceholderMonth.i18n.defaultText} />)}
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item className="no-margin-bottom">
                        {getFieldDecorator('cartYear', {
                          rules: [
                            {
                              required: true,
                              message: validationUI.expDate.i18n.defaultText,
                            },
                          ],
                        })(<Input size="large" placeholder={inputsUI.expDatePlaceholderYear.i18n.defaultText} />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <div className="cart back">
                  <div className="cart-inner">
                    <Row type="flex" justify="end" gutter={16} align="bottom">
                      <Col span={7}>
                        <Form.Item className="no-margin-bottom">
                          {getFieldDecorator('csv', {
                            rules: [
                              {
                                required: true,
                                message: validationUI.notEmpty.i18n.defaultText,
                              },
                            ],
                          })(<Input size="large" placeholder={inputsUI.securityCode.i18n.defaultText} />)}
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Form>
          </Spin>
        </div>
      );
    }
  },
);

export default WrappedMainForm;
