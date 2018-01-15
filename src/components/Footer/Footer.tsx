import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import List from './List';
import Copyright from './Copyright';
import Contacts from './Contacts';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
});

const WrappedFooter = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Footer extends React.Component<IProps, IState> {
    render() {
      return (
        <div className="root">
          <style jsx>{`
            .content {
              margin-bottom: 10px;
            }
            .footer {
              border-top: 1px solid #ffffff;
              color: #b2bdca;
            }
          `}</style>
          <div className="content">
            <List ui={this.props.ui} />
          </div>
          <div className="footer">
            <div className="app-container">
              <Row type="flex" justify="space-between">
                <Col>
                  <Copyright ui={this.props.ui} />
                </Col>
                <Col>
                  <Contacts ui={this.props.ui} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      );
    }
  },
);

export default WrappedFooter;
