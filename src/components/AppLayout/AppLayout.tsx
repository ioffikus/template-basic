import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Layout, Spin } from 'antd';
import { RouteConfig, renderRoutes } from 'react-router-config';
import dispatch from 'src/store/dispatch';
import { getMeta } from 'src/ducks/meta';
import ConfigHelper from 'src/helpers/configHelper';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { Frame as DevToolsFrame } from 'src/components/DevTools';
import Sprite from 'src/components/Svg/Sprite';

interface IOwnProps {
  route: RouteConfig;
}

interface IConnectedState {
  title: string;
  description: string;
  keywords: string;
  isLoading: boolean;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  title: state.meta.title,
  description: state.meta.description,
  keywords: state.meta.keywords,
  isLoading: state.progress.isLoading,
});

const WrappedAppLayout = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class AppLayout extends React.Component<IProps, IState> {
    static fetchData: Store.IFetchDataFn = abortToken => {
      return dispatch(getMeta(abortToken));
    };

    render() {
      const { route: { routes }, title, description, keywords, isLoading } = this.props;
      return (
        <div className="root">
          <style jsx global>{`
            body {
              background-color: white;
              font-family: 'Ubuntu', sans-serif;
            }
            * {
              min-height: 0;
              min-width: 0;
            }
            .app-icon-svg {
              fill: currentColor;
              width: 19px;
              height: 19px;
              pointer-events: none;
            }
            .ant-popover-arrow {
              display: none;
            }
            .app-main-menu {
              max-width: 100%;
              overflow: hidden;
              font-weight: bold;
              letter-spacing: 2px;
              text-transform: uppercase;
              transition: max-width 0.2s;
            }
            .app-main-menu .ant-menu-inline {
              border: 0;
            }
            .app-main-menu .ant-menu-item,
            .app-main-menu .ant-menu-inline .ant-menu-submenu-title,
            .app-main-menu .ant-menu-sub.ant-menu-inline > .ant-menu-item,
            .app-main-menu .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
              height: auto;
              line-height: 1;
              padding: 19px 38px;
            }
            .app-main-menu .ant-menu-sub.ant-menu-inline > .ant-menu-item,
            .app-main-menu .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
              font-size: 9px;
            }
            .app-main-menu .ant-menu-submenu-title:after {
              right: 23px;
              margin-top: 18px;
            }
            .app-main-menu .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
              background-color: transparent;
            }
            .app-main-menu .ant-menu-item-selected:after {
              display: none;
            }
            .app-main-menu .ant-menu-submenu-selected .ant-menu-submenu-title {
              color: #ff0959;
            }
            .app-icon-flag-svg {
              width: 16px;
              height: 16px;
            }
            .ant-modal-body {
              padding: 9px 16px 0;
            }
            .ant-modal-content {
              box-shadow: 0 2px 16px 0 rgba(6, 47, 73, 0.5);
            }
            .ant-modal-close {
              display: none;
            }
            .ant-btn {
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .ant-btn-lg {
              font-size: 11px;
            }
            .ant-tabs-nav .ant-tabs-tab {
              margin-right: 0;
              text-transform: uppercase;
              letter-spacing: 2px;
              font-weight: bold;
              padding-bottom: 13px;
            }
            .ant-select {
              color: #a7b4c3;
            }
            .ant-select-arrow {
              color: #062f49;
            }
            .app-no-image {
              font-size: 16px;
              line-height: 1.375;
              font-weight: bold;
              text-align: center;
              color: #b2bdcb;
              -webkit-font-smoothing: antialiased;
              backface-visibility: hidden;
            }
            .ant-dropdown-menu-item {
              font-size: 14px;
              padding: 10px 20px;
            }
            .ant-badge-count {
              font-family: inherit;
            }
            .ant-btn:hover,
            .ant-btn:focus {
              border-color: transparent;
            }
            .app-text-empty {
              color: #b2bdcb;
              text-align: center;
            }
            .ant-form-item-control {
              padding-left: 2px;
              padding-right: 2px;
            }
            .swiper-button-prev,
            .swiper-button-next {
              height: 45px;
              width: 45px;
              z-index: 2;
              top: 50%;
              background: none;
            }
            .swiper-button-prev {
              left: 10%;
              transform: rotate(-45deg);
            }
            .swiper-button-next {
              right: 10%;
              transform: rotate(135deg);
            }
            .swiper-button-prev::after,
            .swiper-button-prev::before,
            .swiper-button-next::after,
            .swiper-button-next::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              border-width: 7px;
              border-color: #e9ecf1;
              border-radius: 8px;
            }
            .swiper-button-prev::after,
            .swiper-button-next::after {
              border-left-style: solid;
              height: 100%;
            }
            .swiper-button-prev::before,
            .swiper-button-next::before {
              width: 100%;
              border-top-style: solid;
            }
            .app-text-right {
              text-align: right;
            }
            .app-text-center {
              text-align: center;
            }
            .app-section {
              margin-bottom: 24px;
            }
            .app-title {
              margin-bottom: 30px;
              font-size: 24px;
              font-weight: 500;
              letter-spacing: 2px;
              color: #062f49;
              line-height: 19px;
              text-transform: uppercase;
            }
            .app-cart {
              background: transparent;
            }
            .app-cart .ant-card-head {
              height: auto;
              line-height: 1.3;
              border-bottom: 0;
              background: transparent;
            }
            .app-cart .ant-card-head-title {
              font-size: 24px;
              line-height: 1.16;
              color: inherit;
              float: none;
            }
            .app-cart .ant-card-body {
              padding-top: 15px;
            }
            .app-text {
              line-height: 1.7;
            }
            .app-container {
              margin: 0 auto;
              max-width: 900px;
              width: 100%;
              padding: 25px 20px 0;
            }
            .app-image-blur {
              position: absolute;
              top: 50%;
              left: 50%;
              z-index: 1;
              transform: translate(-50%, -50%);
              min-width: 100%;
              min-height: 100%;
              max-height: 100%;
              max-width: 100%;
              filter: blur(20px);
              opacity: 0.9;
              backface-visibility: hidden;
            }
            .app-show-more-button {
              width: 100%;
              display: block;
              font-weight: bold;
            }
            .swiper-slide-duplicate .ant-spin-spinning,
            .swiper-slide-duplicate .ant-spin-blur::after {
              opacity: 0;
            }
            .swiper-slide-duplicate .ant-spin-blur {
              opacity: 1;
              filter: blur(0);
            }
            .layout-spin > .ant-spin-blur {
              overflow: inherit;
            }
          `}</style>
          <style jsx>{`
            .root :global(.layout) {
              height: 100%;
              min-height: 100vh;
              overflow: hidden;
            }
            .root :global(.ant-layout-header) {
              position: relative;
              z-index: 12;
              border-bottom: 1px solid #e5ecf4;
              height: 115px;
              line-height: 1;
            }
            .root :global(.layout .ant-layout-content) {
              display: flex;
            }
            .root :global(.layout-spin),
            .root :global(.layout-spin > .ant-spin-container) {
              flex: auto;
              display: flex;
            }
            .root :global(.layout-spin .ant-spin-blur .ant-spin-spinning),
            .root :global(.layout-spin .ant-spin-blur .ant-spin-blur::after) {
              opacity: 0;
            }
            .root :global(.layout-spin .ant-spin-blur .ant-spin-blur) {
              opacity: 1;
              filter: blur(0);
            }
          `}</style>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
          </Helmet>
          <Layout className="layout">
            <Layout.Header>
              <Header />
            </Layout.Header>
            <Layout.Content>
              <Spin spinning={isLoading} size="large" wrapperClassName="layout-spin">
                {renderRoutes(routes)}
              </Spin>
            </Layout.Content>
            <Layout.Footer>
              <Footer />
            </Layout.Footer>
          </Layout>
          {ConfigHelper.isDev() && <DevToolsFrame />}
          <Sprite />
        </div>
      );
    }
  },
);

export default WrappedAppLayout;
