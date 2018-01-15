import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import normalizePictures from 'src/helpers/normalizePictures';
import Cropper from './Cropper';
import Slider from './Slider';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  uid: string;
  pictures: Alicanto.Models.Picture[];
  isRequesting: boolean;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isMounted: boolean;
}

const mapStateToProps = (state: Store.IState, ownProps: IOwnProps) => ({
  ui: state.ui,
  uid: state.product.uid,
  pictures: normalizePictures(state.product.pictures),
  isRequesting: state.product.isRequesting,
});

const WrappedProductImagePreview = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class ProductImagePreview extends React.Component<IProps, IState> {
    state: IState = {
      isMounted: false,
    };

    componentDidMount() {
      this.setState({ isMounted: true });
    }

    render() {
      const commonUI = this.props.ui.common;
      const isCropper = this.props.ui.routes.productCard.previewImages.cropper.settings.isVisible;
      const isSlider = this.props.ui.routes.productCard.previewImages.slider.settings.isVisible;
      return (
        <div className="root">
          <style jsx>{`
            .root {
              position: relative;
            }
            .root :global(img) {
              max-width: 100%;
              max-height: 100%;
            }
            .no-image,
            .root :global(.item) {
              min-height: 295px;
            }
            .root :global(.swiper-pagination) {
              position: static;
              padding-top: 16px;
              margin: 0 -8px;
              vertical-align: top;
              text-align: left;
            }
            .root :global(.swiper-pagination-bullet) {
              height: 79px;
              min-width: 48px;
              width: auto;
              margin: 0 8px 15px;
              background: none;
              opacity: 1;
              border-radius: 0;
              border: 1px solid rgba(6, 47, 73, 0.1);
            }
            .root :global(.swiper-pagination-bullet-active) {
              border-color: #ff0757;
            }
            .root :global(.swiper-pagination-bullet img) {
              height: 100%;
            }
            .no-image {
              border: 1px solid rgba(6, 47, 73, 0.1);
              margin-bottom: 16px;
              background-color: #fff;
              width: 100%;
              padding: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}</style>
          {this.state.isMounted &&
            (!_.isEmpty(this.props.pictures)
              ? !this.props.isRequesting &&
                ((isCropper && <Cropper uid={this.props.uid} pictures={this.props.pictures} />) ||
                  (isSlider && <Slider pictures={this.props.pictures} />))
              : !this.props.isRequesting && (
                  <div className="app-no-image no-image">{commonUI.noImage.title.i18n.defaultText}</div>
                ))}
        </div>
      );
    }
  },
);

export default WrappedProductImagePreview;
