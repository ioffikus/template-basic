import React from 'react';
import { Spin, Form, Col, Row, Input, Button } from 'antd';
import cx from 'classnames';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IOwnProps {
  ui: Alicanto.Models.UI;
  user: Alicanto.Models.User;
  onSubmit: (user: Alicanto.Models.User, cb: () => void) => void;
  isRequesting: boolean;
}

interface IFormProps {
  form: WrappedFormUtils;
}

type IProps = IOwnProps & IFormProps;

interface IState {
  isEditMode: boolean;
}

const WrappedMainForm = Form.create<IOwnProps>()(
  class MainForm extends React.Component<IProps, IState> {
    state: IState = {
      isEditMode: false,
    };

    toggleEditMode = () => {
      this.setState((prevState, props) => {
        return {
          isEditMode: !prevState.isEditMode,
        };
      });
    };

    handleSubmit = (event: React.SyntheticEvent<any>) => {
      event.preventDefault();
      this.props.form.validateFieldsAndScroll((error: any, values: any) => {
        if (!error) {
          const { firstName, lastName } = values;
          const user = {
            email: this.props.user.email,
            first_name: firstName,
            last_name: lastName,
          };
          this.props.onSubmit(user, () => {
            this.setState({
              isEditMode: false,
            });
          });
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const userAccountUI = this.props.ui.routes.user.account;
      const validationUI = this.props.ui.common.forms.validation;
      const { email, first_name: firstName, last_name: lastName } = this.props.user;
      const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
      };
      return (
        <div
          className={cx('root', {
            'edit-mode': this.state.isEditMode,
          })}
        >
          <style jsx>{`
            .root :global(.ant-form-item-label) {
              text-align: left;
              font-size: 11px;
              text-transform: uppercase;
            }
            .root :global(label) {
              color: #a7b4c3;
            }
            .root :global(.ant-form-item-required:before),
            .root :global(.ant-input),
            .edit-mode :global(.ant-form-text:not(.text-email)) {
              display: none;
            }
            .edit-mode :global(.ant-input) {
              display: block;
            }
            .button-wrapper {
              text-align: right;
            }
            .root :global(.button-save) {
              display: block;
              width: 100%;
            }
          `}</style>
          <Row type="flex" gutter={16} align="middle" className="item">
            <Col span={11}>
              <Spin spinning={this.props.isRequesting}>
                <Form onSubmit={this.handleSubmit}>
                  <div className="button-wrapper">
                    <Button type="primary" icon="edit" onClick={this.toggleEditMode}>
                      {userAccountUI.button.i18n.defaultText}
                    </Button>
                  </div>
                  <Form.Item {...formItemLayout} colon={false} label={userAccountUI.form.labels.email.i18n.defaultText}>
                    <span className="ant-form-text text-email">{email}</span>
                  </Form.Item>
                  <Form.Item {...formItemLayout} colon={false} label={userAccountUI.form.labels.name.i18n.defaultText}>
                    {getFieldDecorator('firstName', {
                      rules: [{ required: true, message: validationUI.notEmpty.i18n.defaultText }],
                      initialValue: firstName,
                    })(<Input />)}
                    <span className="ant-form-text">{firstName}</span>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    colon={false}
                    label={userAccountUI.form.labels.surname.i18n.defaultText}
                  >
                    {getFieldDecorator('lastName', {
                      rules: [{ required: true, message: validationUI.notEmpty.i18n.defaultText }],
                      initialValue: lastName,
                    })(<Input />)}
                    <span className="ant-form-text">{lastName}</span>
                  </Form.Item>
                  {this.state.isEditMode && (
                    <Form.Item>
                      <Button type="primary" icon="save" size="large" className="button-save" htmlType="submit">
                        {userAccountUI.form.submit.i18n.defaultText}
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </Spin>
            </Col>
          </Row>
        </div>
      );
    }
  },
);

export default WrappedMainForm;
