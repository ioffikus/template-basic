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
      const catalogSearchFormUI = this.props.ui.common.catalogSearchForm;
      return (
        <div
          className={cx('root', {
            open: this.state.isOpen,
          })}
        >
          <style jsx>{`
            .root {
              display: flex;
              align-items: center;
              position: relative;
              margin-left: auto;
              width: 32px;
              height: 32px;
            }
            .inner {
              position: absolute;
              right: 0;
              top: 50%;
              z-index: 2;
              transform: translateY(-50%);
              transition: width 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 2.5s;
              opacity: 0;
              width: 32px;
              margin-right: 2px;
              pointer-events: none;
            }
            .open :global(.inner) {
              opacity: 1;
              width: 440px;
              pointer-events: auto;
              transition: width 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0s;
            }
            .root :global(.ant-form-item),
            .root :global(.ant-form-item-control-wrapper) {
              width: 100%;
              margin-right: 0;
            }
            .root :global(.ant-input) {
              height: 32px;
              padding-left: 0;
              padding-right: 0;
              border-radius: 100px;
              background-color: #e5ecf4;
              color: #b2bdcb;
              border: 0;
              box-shadow: none;
              font-size: 12px;
              transition: none;
            }
            .open :global(.ant-input) {
              padding-left: 16px;
              padding-right: 0;
            }
            .root :global(.ant-input::placeholder) {
              opacity: 0;
              transition: none;
            }
            .open :global(.ant-input::placeholder) {
              opacity: 1;
              transition: 0.15s;
            }
            .root :global(.ant-input-suffix) {
              color: #113851;
            }
            .root :global(.ant-input-suffix) {
              right: 11px;
              opacity: 0;
              backface-visibility: hidden;
              -webkit-font-smoothing: antialiased;
            }
            .open :global(.ant-input-suffix) {
              opacity: 1;
              transition: 0.3s;
            }
            .root :global(.anticon-search) {
              font-size: 16px;
            }
            .root :global(.anticon-close) {
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              backface-visibility: hidden;
              -webkit-font-smoothing: antialiased;
            }
            .root :global(.icon-search) {
              background: transparent;
            }
            .root :global(.icon-search:after) {
              display: none;
            }
            .root :global(.icon-svg) {
              width: 16px;
              height: 16px;
            }
          `}</style>
          <div className="inner">
            <Form layout="inline">
              <Form.Item>
                <Input
                  placeholder={catalogSearchFormUI.placeholder.i18n.defaultText}
                  suffix={<Icon type="close" onClick={this.handleToggle} />}
                  value={this.state.value}
                  onChange={this.handleChange}
                  onPressEnter={this.handlePressEnter}
                />
              </Form.Item>
            </Form>
          </div>
          <Button className="icon-search" shape="circle" onClick={this.handleToggle}>
            <Svg name="search" className="icon-svg" />
          </Button>
        </div>
      );
    }
  },
);

export default WrappedSearchForm;
