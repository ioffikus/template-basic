import React from 'react';
import { RouterState } from 'connected-react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ProductItems from 'src/components/ProductItems';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  ui: Alicanto.Models.UI;
  isRequesting: boolean;
  items: Alicanto.Models.CatalogItem[];
  hasNextPage: boolean;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
  ui: state.ui,
  isRequesting: state.popularItems.isRequesting,
  items: state.popularItems.content as Alicanto.Models.CatalogItem[],
  hasNextPage: false,
});

const WrappedPopularItems = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class PopularItems extends React.Component<IProps, IState> {
    render() {
      const popularBlockUI = this.props.ui.routes.home.popularBlock;
      return (
        <div className="root">
          <style jsx>{`
            .header {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .root :global(.link) {
              margin-bottom: 30px;
              font-size: 16px;
              font-weight: 500;
              color: #062f49;
            }
          `}</style>
          <div className="header">
            <h2 className="app-title">{popularBlockUI.title.i18n.defaultText}</h2>
            <Link to="/catalog" className="link">
              {popularBlockUI.viewAll.i18n.defaultText} <Icon type="right" />
            </Link>
          </div>
          <ProductItems {...this.props} />
        </div>
      );
    }
  },
);

export default WrappedPopularItems;
