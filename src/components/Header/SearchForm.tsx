import React from 'react';
import { RouterState, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button } from 'antd';
import cx from 'classnames';
import queryString from 'query-string';
import dispatch from 'src/store/dispatch';
import Svg from 'src/components/Svg';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  search: string;
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  value: string;
  isOpen: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
  search: state.catalogQuery.search,
  ui: state.ui,
});

const WrappedSearchForm = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class SearchForm extends React.Component<IProps, IState> {
    state: IState = {
      value: this.props.search,
      isOpen: false,
    };

    goToSearch = (search: string) => {
      const query = {
        ...queryString.parse(this.props.router.location.search),
        search,
      };
      delete query.page;
      const location = { ...this.props.router.location, search: queryString.stringify(query) };
      dispatch(push(location));
    };

    handleToggle = () => {
      if (this.state.isOpen) {
        this.setState({
          value: '',
          isOpen: false,
        });
        if (this.props.search) {
          this.goToSearch('');
        }
      } else {
        this.setState({
          isOpen: true,
        });
      }
    };

    handleChange = (event: React.SyntheticEvent<{ value: string }>) => {
      const value = event.currentTarget.value;
      this.setState({
        value,
      });
    };

    handlePressEnter = () => {
      const search = this.state.value;
      this.goToSearch(search);
    };

    render() {
      const headerSearchFormUI = this.props.ui.common.headerSearchForm;
      return (
        <div
          className={cx('root', {
            open: this.state.isOpen,
          })}
        >
          <style jsx>{`
            .root {
              display: block;
            }
            .inner {
              position: absolute;
              right: 97px;
              top: 50%;
              left: calc(100% - 146px);
              z-index: 2;
              transform: translateY(-50%);
              transition: 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 2.5s;
              opacity: 0;
              pointer-events: none;
            }
            .open :global(.inner) {
              left: 61px;
              opacity: 1;
              pointer-events: auto;
              transition: 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0s;
            }
            .root :global(.ant-form-item),
            .root :global(.ant-form-item-control-wrapper) {
              width: 100%;
            }
            .root :global(.ant-input) {
              height: 48px;
              padding-bottom: 14px;
              padding-top: 14px;
              padding-left: 0;
              padding-right: 0;
              border-radius: 100px;
              background-color: #e5ecf4;
              color: #b2bdcb;
              border: 0;
              font-size: 12px;
              box-shadow: none;
              transition: none;
            }
            .open :global(.ant-input) {
              padding-left: 50px;
            }
            .root :global(.ant-input::placeholder) {
              opacity: 0;
              transition: none;
            }
            .open :global(.ant-input::placeholder) {
              opacity: 1;
              transition: 0.15s;
            }
            .root :global(.ant-input-prefix) {
              color: #b2bdcb;
            }
            .root :global(.ant-input-prefix) {
              left: 17px;
              margin-top: -1px;
            }
            .root :global(.ant-input-suffix) {
              right: 14px;
              opacity: 0;
              transition: none;
              backface-visibility: hidden;
              -webkit-font-smoothing: antialiased;
            }
            .open :global(.ant-input-suffix) {
              transition: 0.3s;
              opacity: 1;
            }
            .root :global(.icon-search-min-svg) {
              width: 17px;
              height: 17px;
            }
            .open :global(.icon-search-min-svg) {
              width: 19px;
              height: 19px;
            }
            .root :global(.anticon-close) {
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
            }
            .root :global(.icon-search:after) {
              display: none;
            }
            .open :global(.icon-search) {
              opacity: 0;
            }
          `}</style>
          <div className="inner">
            <Form layout="inline">
              <Form.Item>
                <Input
                  placeholder={headerSearchFormUI.placeholder.i18n.defaultText}
                  prefix={<Svg name="search" className="icon-search-min-svg" />}
                  suffix={<Icon type="close" onClick={this.handleToggle} />}
                  value={this.state.value}
                  onChange={this.handleChange}
                  onPressEnter={this.handlePressEnter}
                />
              </Form.Item>
            </Form>
          </div>
          <Button className="icon-search" shape="circle" onClick={this.handleToggle}>
            <Svg name="search" className="app-icon-svg" />
          </Button>
        </div>
      );
    }
  },
);

export default WrappedSearchForm;
