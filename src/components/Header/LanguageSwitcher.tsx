import React from 'react';
import { connect } from 'react-redux';
import { RouterState } from 'connected-react-router';
import { Select } from 'antd';
import queryString from 'query-string';
import Svg from 'src/components/Svg';
import CommonCfg from 'src/configs/common';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  ui: Alicanto.Models.UI;
  currentLocale: string;
  availableLocales: string[];
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState, ownProps: IOwnProps) => ({
  router: state.router,
  ui: state.ui,
  currentLocale: state.locale.current,
  availableLocales: state.locale.availables,
});

const WrappedLanguageSwitcher = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class LanguageSwitcher extends React.Component<IProps, IState> {
    handleSelect = (value: string) => {
      if (process.env.BROWSER) {
        window.document.cookie = `locale=${value};path=/;max-age=${CommonCfg.COOKIE_LOCALE_MAX_AGE}`;
        const query = queryString.parse(this.props.router.location.search);
        if (query.page) {
          delete query.page;
          const location = { ...this.props.router.location, search: queryString.stringify(query) };
          let href = location.pathname;
          if (location.search) {
            href += `?${location.search}`;
          }
          window.location.href = href;
          return;
        }
        window.location.reload(true);
      }
      // TODO ch1886
      // this.props.dispatch(setLocale(value))
    };

    render() {
      const localesUI = this.props.ui.common.locales.items;
      return (
        <div className="root">
          <style jsx>{`
            .root :global(.app-icon-flag-svg) {
              margin-top: 5px;
            }
            .root :global(.ant-select-selection) {
              height: 28px;
              border: 0;
            }
            .root :global(.ant-select-selection__rendered) {
              line-height: 28px;
            }
            .root :global(.ant-select-arrow) {
              display: none;
            }
            .root :global(.ant-select-selection-selected-value) {
              padding-right: 0;
            }
          `}</style>
          <Select value={this.props.currentLocale} onSelect={this.handleSelect}>
            {this.props.availableLocales.map(key => {
              const title = localesUI[key].i18n.defaultText;
              return (
                <Select.Option key={key} title={title}>
                  <Svg name={`flag-${key}`} className="app-icon-flag-svg" />
                </Select.Option>
              );
            })}
          </Select>
        </div>
      );
    }
  },
);

export default WrappedLanguageSwitcher;
