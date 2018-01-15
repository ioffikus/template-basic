import React from 'react';
import { Layout, Button } from 'antd';
import cx from 'classnames';
import Svg from 'src/components/Svg';
import EventHandler from './EventHandler';

interface IProps {
  type: 'categories' | 'filters';
}

interface IState {
  isFixed: boolean;
  isCollapsed: boolean;
}

class SiderMenu extends React.Component<IProps, IState> {
  static __ANT_LAYOUT_SIDER = true;
  trigger: Button;
  state: IState = {
    isFixed: false,
    isCollapsed: true,
  };

  toggleCollapsed = (value: boolean) => {
    this.setState({
      isCollapsed: value,
    });
  };

  toggleFixed = (value: boolean) => {
    this.setState({
      isFixed: value,
    });
  };

  handleScroll = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const limit = 115;
    if (scrolled >= limit) {
      this.toggleFixed(true);
    } else {
      this.toggleFixed(false);
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div
        className={cx('root', {
          fixed: this.state.isFixed,
          collapsed: this.state.isCollapsed,
          [this.props.type]: !!this.props.type,
        })}
      >
        <style jsx>{`
          .root {
            position: relative;
            z-index: 10;
            min-width: 98px;
            background-color: #fff;
          }
          .root :global(.ant-layout-sider-children) {
            box-shadow: none;
          }
          .root :global(.ant-layout-sider) {
            max-height: 100%;
            overflow-x: auto;
          }
          .inner-wrapper {
            position: absolute;
            top: -1px;
            min-height: 100vh;
            height: 100%;
            padding-top: 15px;
            padding-bottom: 40px;
            background-color: #fff;
            border: 1px solid transparent;
            box-shadow: 0 2px 16px 0 rgba(36, 103, 164, 0.18);
            transition: box-shadow 0.2s;
          }
          .categories :global(.inner-wrapper) {
            left: 0;
          }
          .filters :global(.inner-wrapper) {
            right: 0;
          }
          .collapsed :global(.inner-wrapper) {
            box-shadow: none;
            border-color: #e5ecf4;
          }
          .fixed :global(.inner-wrapper) {
            position: fixed;
          }
          .button-wrapper {
            padding-top: 35px;
            text-align: center;
            position: relative;
            z-index: 10;
            opacity: 0;
          }
          .categories :global(.button-wrapper) {
            left: 0;
          }
          .filters :global(.button-wrapper) {
            right: 0;
          }
          .collapsed :global(.button-wrapper) {
            transition: opacity 2s;
            opacity: 1;
          }
          .fixed :global(.button-wrapper) {
            position: fixed;
            top: 0;
            width: 98px;
          }
          .collapsed :global(.app-main-menu .footer) {
            width: 0;
          }
          .collapsed :global(.app-main-menu) {
            max-width: 0;
          }
        `}</style>
        <EventHandler onCollapsed={this.toggleCollapsed}>
          <div className="button-wrapper">
            <Button shape="circle">
              <Svg name={this.props.type === 'categories' ? 'menu' : 'filter'} className="app-icon-svg" />
            </Button>
          </div>
          <div className="inner-wrapper">
            <Layout.Sider trigger={null} collapsedWidth="98" width="260" collapsible collapsed={this.state.isCollapsed}>
              {this.props.children}
            </Layout.Sider>
          </div>
        </EventHandler>
      </div>
    );
  }
}

export default SiderMenu;
