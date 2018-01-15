import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
});

const WrappedTextContent = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class TextContent extends React.Component<IProps, IState> {
    render() {
      const textUI = this.props.ui.routes.home.textBlock;
      return (
        <div className="root">
          <div className="app-section">
            <h2 className="app-title">{textUI.title.i18n.defaultText}</h2>
            <Row type="flex">
              <Col span={12}>
                <Card title={textUI.subtitle.i18n.defaultText} noHovering={true} bordered={false} className="app-cart">
                  <p className="app-text">{textUI.text.i18n.defaultText}</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title={textUI.subtitle.i18n.defaultText} noHovering={true} bordered={false} className="app-cart">
                  <p className="app-text">{textUI.text.i18n.defaultText}</p>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="app-section">
            <h2 className="app-title">{textUI.title.i18n.defaultText}</h2>
            <Row type="flex">
              <Col span={8}>
                <Card title={textUI.subtitle.i18n.defaultText} noHovering={true} bordered={false} className="app-cart">
                  <p className="app-text">{textUI.text.i18n.defaultText}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={textUI.subtitle.i18n.defaultText}
                  noHovering={true}
                  bordered={false}
                  className="app-cart app-text-center"
                >
                  <p className="app-text">{textUI.text.i18n.defaultText}</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={textUI.subtitle.i18n.defaultText}
                  noHovering={true}
                  bordered={false}
                  className="app-cart app-text-right"
                >
                  <p className="app-text">{textUI.text.i18n.defaultText}</p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  },
);

export default WrappedTextContent;
