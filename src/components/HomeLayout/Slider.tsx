import React from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import Swiper from 'react-id-swiper';
import PreloadingImage from 'src/components/PreloadingImage';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  isMounted: boolean;
}

const mapStateToProps = (state: Store.IState) => ({
  ui: state.ui,
});

const WrappedSlider = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Slider extends React.Component<IProps, IState> {
    state: IState = {
      isMounted: false,
    };

    swiperSettings = {
      slidesPerView: 1,
      loopAdditionalSlides: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev ',
      },
    };

    componentDidMount() {
      this.setState({
        isMounted: true,
      });
    }

    render() {
      const items = this.props.ui.routes.home.slider.items;
      return (
        <div className="root">
          <style jsx>{`
            .root {
              min-height: 512px;
              background-color: rgba(0, 0, 0, 0.2);
            }
            .root :global(.item) {
              min-height: 512px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              color: #ffffff;
              font-size: 48px;
              text-shadow: 0 0 4px 0 rgba(1, 2, 20, 0.78);
              font-weight: 500;
              line-height: 1.25;
            }
            .root :global(.image-spinner) {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              z-index: 1;
            }
            .root :global(.image-spinner .ant-spin-blur:after) {
              background: #000;
            }
            .root :global(.image) {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
            .inner {
              position: relative;
              z-index: 2;
              flex-basis: 920px;
              max-width: 920px;
              padding: 0 10px;
            }
            .root :global(.ant-tag) {
              margin-bottom: 30px;
              height: auto;
              font-size: 24px;
              font-weight: bold;
              text-transform: uppercase;
              cursor: default;
              background: transparent;
              border-color: #fff;
              color: inherit;
              line-height: 1.25;
            }
            .title {
              font-size: 48px;
              color: inherit;
              line-height: 1.25;
            }
            .text {
              margin-bottom: 40px;
              text-transform: uppercase;
            }
          `}</style>
          {this.state.isMounted && (
            <Swiper {...this.swiperSettings}>
              {Object.keys(items).map(key => {
                const item = items[key];
                const image = item.image.settings.link;
                const title = item.header.i18n.defaultText;
                const isTitle = item.header.settings.isVisible;
                const text = item.text.i18n.defaultText;
                const isText = item.text.settings.isVisible;
                const price = item.price.i18n.defaultText;
                const isPrice = item.price.settings.isVisible;
                const tag = item.tag.i18n.defaultText;
                const isTag = item.tag.settings.isVisible;
                return (
                  <div key={key} className="item">
                    <PreloadingImage src={image} imageClass="image" wrapperClass="image-spinner" />
                    <div className="inner">
                      {isTag && <Tag>{tag}</Tag>}
                      {isTitle && <h1 className="title">{title}</h1>}
                      {isText && <p className="text">{text}</p>}
                      {isPrice && <div className="price">{price}</div>}
                    </div>
                  </div>
                );
              })}
            </Swiper>
          )}
        </div>
      );
    }
  },
);

export default WrappedSlider;
