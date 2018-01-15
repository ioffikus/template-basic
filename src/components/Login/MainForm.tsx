import React from 'react';
import { Spin, Form, Icon, Input, Button } from 'antd';
import { IObject } from 'src/core/interfaces/IObject';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IOwnProps {
  onSubmit: ({ username, password }: { username: string; password: string }) => void;
  ui: Alicanto.Models.UI;
  isRequesting: boolean;
}

interface IFormProps {
  form: WrappedFormUtils;
}

type IProps = IOwnProps & IFormProps;

interface IState {}

const WrappedMainForm = Form.create<IOwnProps>()(
  class MainForm extends React.Component<IProps, IState> {
    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields(null);
    }

    hasErrors = (fieldsError: IObject<any>) => {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    handleSubmit = (event: React.SyntheticEvent<any>) => {
      event.preventDefault();
      this.props.form.validateFields((error: any, values: any) => {
        if (!error) {
          this.props.onSubmit(values);
        }
      });
    };

    render() {
      const validationUI = this.props.ui.common.forms.validation;
      const loginFormUI = this.props.ui.routes.login.form;
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

      // Only show error after a field is touched.
      const usernameError = isFieldTouched('username') && getFieldError('username');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      return (
        <Spin spinning={this.props.isRequesting}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item validateStatus={usernameError ? 'error' : null} help={usernameError || ''}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: validationUI.notEmpty.i18n.defaultText }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder={loginFormUI.labels.username.i18n.defaultText}
                />,
              )}
            </Form.Item>
            <Form.Item validateStatus={passwordError ? 'error' : null} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: validationUI.notEmpty.i18n.defaultText }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder={loginFormUI.labels.password.i18n.defaultText}
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>
                {loginFormUI.buttons.signIn.i18n.defaultText}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      );
    }
  },
);

export default WrappedMainForm;
