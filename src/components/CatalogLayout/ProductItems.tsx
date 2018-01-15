import { RouterState } from 'connected-react-router';
import { connect } from 'react-redux';
import ProductItems from 'src/components/ProductItems';

interface IOwnProps {}

interface IConnectedState {
  router: RouterState;
  ui: Alicanto.Models.UI;
  isRequesting: boolean;
  items: Alicanto.Models.CatalogItem[];
  hasNextPage: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  router: state.router,
  ui: state.ui,
  isRequesting: state.catalog.isRequesting,
  items: state.catalog.results,
  hasNextPage: !!state.catalog.next,
});

const WrappedProductItems = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(ProductItems);

export default WrappedProductItems;
