import React from 'react';
import { Spin, Form, Input, Row, Col, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { IUserDeliveryState } from 'src/ducks/userDelivery';

interface IOwnProps {
  ui: Alicanto.Models.UI;
  initialValues: IUserDeliveryState;
  onSubmit: (values: IUserDeliveryState) => void;
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
          this.props.onSubmit(values);
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const inputsUI = this.props.ui.routes.cart.userInfoForm.inputs;
      const validationUI = this.props.ui.common.forms.validation;
      return (
        <div className="root">
          <style jsx>{`
            .root {
              margin-bottom: 16px;
            }
            .root :global(.ant-select-selection__rendered) {
              margin-right: 24px;
              margin-left: 24px;
            }
            .submit-button {
              display: none;
            }
          `}</style>
          <Spin spinning={this.props.isRequesting}>
            <Form onSubmit={this.handleSubmit}>
              <button tabIndex={-1} type="submit" className="submit-button" ref={this.props.submitButtonRef} />
              <Row type="flex" gutter={16}>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator('name', {
                      initialValue: this.props.initialValues.name,
                      rules: [
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(<Input size="large" placeholder={inputsUI.name.i18n.defaultText} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator('surname', {
                      initialValue: this.props.initialValues.surname,
                      rules: [
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(<Input size="large" placeholder={inputsUI.surname.i18n.defaultText} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" gutter={16}>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      initialValue: this.props.initialValues.email,
                      rules: [
                        {
                          type: 'email',
                          message: validationUI.email.i18n.defaultText,
                        },
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(<Input size="large" placeholder={inputsUI.email.i18n.defaultText} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator('phoneNumber', {
                      initialValue: this.props.initialValues.phoneNumber,
                      rules: [
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(
                      <Input
                        addonBefore={getFieldDecorator('phonePrefix', {
                          initialValue: this.props.initialValues.phonePrefix,
                        })(
                          <Select>
                            <Select.Option value="7">+7</Select.Option>
                            <Select.Option value="380">+380</Select.Option>
                            <Select.Option value="375">+375</Select.Option>
                            <Select.Option value="371">+371</Select.Option>
                          </Select>,
                        )}
                        placeholder={inputsUI.phoneNumber.i18n.defaultText}
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" gutter={16}>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator('country', {
                      initialValue: this.props.initialValues.country,
                      rules: [
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(<Input size="large" placeholder={inputsUI.country.i18n.defaultText} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator('stateRegion', {
                      initialValue: this.props.initialValues.stateRegion,
                      rules: [
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(<Input size="large" placeholder={inputsUI.stateRegion.i18n.defaultText} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" gutter={16}>
                <Col span={6}>
                  <Form.Item>
                    {getFieldDecorator('zipCode', {
                      initialValue: this.props.initialValues.zipCode,
                      rules: [
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(<Input size="large" placeholder={inputsUI.zipCode.i18n.defaultText} />)}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item>
                    {getFieldDecorator('address', {
                      initialValue: this.props.initialValues.address,
                      rules: [
                        {
                          required: true,
                          message: validationUI.notEmpty.i18n.defaultText,
                        },
                      ],
                    })(<Input size="large" placeholder={inputsUI.address.i18n.defaultText} />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </div>
      );
    }
  },
);

export default WrappedMainForm;
